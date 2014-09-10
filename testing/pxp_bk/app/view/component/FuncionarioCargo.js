Ext.define('pxp.view.component.FuncionarioCargo', {
    extend: 'Ext.Container',
    xtype: 'funcionariocargocomp',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.FuncionarioCargos'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "up" } ,
    	idColumn:'id_cargo',
        displayColumn:'descripcion_cargo',
        ui: 'detail',
        cmpTextCargo:undefined,
        cmpHiddenCargo:undefined,
        baseParams:{},
        
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
			                    searchField.up('funcionariocargocomp').onCancel();
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
			                    searchField.up('funcionariocargocomp').onActiveFilter(searchField.getValue());
			                 },
			                clearicontap:function(searchField){
			                	searchField.up('funcionariocargocomp').onClearFilter()
			                },
			                scope: this
			            }
                   	  
                   	},
                   { 
                   	 xtype: 'button',
                   	 text: 'Done',
                   	 align: 'right',
                   	 listeners: {
			                tap: function (searchField) {
			                    searchField.up('funcionariocargocomp').onDone();
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
       me.store = Ext.create('pxp.store.FuncionarioCargos');	
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
            itemTpl:'<p>{descripcion_cargo}</p> <p>{desc_funcionario1}</p>Item: {cargo_codigo}',
            masked: { xtype: 'loadmask', message: 'loading' }

        }]);
	   
    	me.callParent(arguments)
    	
    },
    onActiveFilter:function(value){
    	var me = this,
    	    store = me.down('list').getStore();
    	store.getProxy().setExtraParams(Ext.apply({
    		     "par_filtro":"descripcion_cargo#desc_funcionario1#desc_funcionario2",
			     "query":value
			},me.getBaseParams()));
			
		store.load({
    		start:0,
    		limit:20,
    		page:1
    	  });
    },
    onClearFilter:function(value){
    	var me = this,
    	    store = me.down('list').getStore();
    	
    	store.getProxy().setExtraParams(Ext.apply({},me.getBaseParams()));
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    },
    
    onDone:function(){
    	var me = this,
    	    rec = me.down('list').getSelection();
    	
    	console.log('DONE',  me.getDisplayColumn())
    	
    	if(rec[0]){
    	   me.getCmpTextCargo().setValue(rec[0].data[me.getDisplayColumn()]);
    	   me.getCmpHiddenCargo().setValue(rec[0].data[me.getIdColumn()]);
    	   me.hide()
    	}
    	
    },
    onCancel:function(){
    	this.hide();
    }
  
});
