Ext.define('pxp.view.component.EstadoWf', {
    extend: 'Ext.Container',
    xtype: 'estadowfcmp',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.EstadoWf'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "up" } ,
    	valueField:'nombre',
    	idField:'id_tipo_estado',
        ui: 'detail',
        cmpText: undefined,
        cmpHidden: undefined,
        estados: undefined,
        baseCls: Ext.baseCSSPrefix + 'sheet',
        modal: true,
        centered : true,
        hideOnMaskTap : true,
        
        width: Ext.os.is.Phone?'100%':450,
        top: '40%',
        bottom: 5,
        right:  Ext.os.is.Phone?0:5,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

       items: [
            {
                xtype: 'toolbar',
                itemId:'pickupstoolbar2',
                docked: 'top',
                layout:'hbox',
                items: [
                   { 
                   	 xtype: 'button',
                     text: 'Cancel',
                     align: 'left',
                     listeners: {
			                tap: function (searchField) {
			                    searchField.up('estadowfcmp').onCancel();
			                 },
			                 scope: this
			             
                     }
                   },
                   { 
                   	  xtype: 'searchfield', 
                   	  flex: 1 ,
                   	  itemId:'searchfComponent' ,
                   	  listeners: {
			                action: function (searchField) {
			                    searchField.up('estadowfcmp').onActiveFilter(searchField.getValue());
			                 },
			                clearicontap:function(searchField){
			                	searchField.up('estadowfcmp').onClearFilter()
			                },
			                scope: this
			            }
                   	  
                   	}
                ]
            }
         
        ]
    },

    hide: function(animation) {
        var me = this;

        //we fire this event so the controller can deselect all items immediately.
        me.fireEvent('hideanimationstart', me);

        //show the mask again
        me.callParent();
    },
    
    initialize: function(){
       var me = this;
       me.store = Ext.create('pxp.store.EstadoWf');	
       me.add([
         {
            xtype: 'list',
            flex: 1,
            plugins: [
                    {
                        xclass: 'Ext.plugin.ListPaging',
                        autoPaging: true,
                        noMoreRecordsText: 'No More Records'
                    },
                    { xclass: 'Ext.plugin.PullRefresh' }
                ],
            store: me.store,
            itemTpl:'<p><b>{nombre_estado}</b></p><p> Código: {codigo_estado}</p>',
            masked: { xtype: 'loadmask', message: 'loading' },
            listeners: {
	                itemsingletap: function (searchField, index, target, record, e, eOpts) {
	                    searchField.up('estadowfcmp').onTap(record);
	                 },
	                scope: me
	        }

        }]);
	   
	    
    	me.callParent(arguments)
    	
    },
    onActiveFilter:function(value){
    	var me = this,
    	    store = me.down('list').getStore();
    	    
    	me.mask(); 
    	store.getProxy().setExtraParams({
    		     "par_filtro": "tipes.nombre_estado#tipes.codigo",
			     "query":value
			});
			
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    		
    	}});
    },
    onClearFilter:function(value){
    	var me = this;
	    me.mask(); 
    	var store = me.down('list').getStore();
    	store.getProxy().setExtraParams({});
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    	}});
    },
    idColumn:'id_tipo_estado',
    displayColumn:'nombre_estado',
    onTap:function(record){
    	var me = this;
    	if(record){
    	   me.getCmpText().setValue(record.data['nombre_estado']);
    	   me.getCmpHidden().setValue(record.data['id_tipo_estado']);
    	   me.hide();
    	   me.fireEvent('done', me, record.data['nombre_estado'], record.data['id_tipo_estado'], record);
    	}
    	
    },
    onCancel:function(){
    	this.hide();
    }
  
});
