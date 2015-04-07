Ext.define('pxp.view.component.FuncionarioWf', {
    extend: 'Ext.Container',
    xtype: 'funcionariowfcmp',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.FuncionarioWf'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "up" } ,
    	valueField:'desc_funcionario',
    	idField:'id_funcionario',
        ui: 'detail',
        cmpText: undefined,
        cmpHidden: undefined,
        id_tipo_estado: undefined,
        
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
			                    searchField.up('funcionariowfcmp').onCancel();
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
			                    searchField.up('funcionariowfcmp').onActiveFilter(searchField.getValue());
			                 },
			                clearicontap:function(searchField){
			                	searchField.up('funcionariowfcmp').onClearFilter()
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
       me.store = Ext.create('pxp.store.FuncionarioWf');	
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
            itemTpl:'<p>{desc_funcionario}</p>',
            masked: { xtype: 'loadmask', message: 'loading' },
           	listeners: {
	                itemsingletap: function (searchField, index, target, record, e, eOpts) {
	                    searchField.up('funcionariowfcmp').onTap(record);
	                 },
	                scope: me
	        }

        }]);
	   
	    me.callParent(arguments)
    	
    },
    onTap:function(record){
    	var me = this;
    	if(record){
    	   me.getCmpText().setValue(record.data['desc_funcionario']);
    	   me.getCmpHidden().setValue(record.data['id_funcionario']);
    	   me.hide();
    	   me.fireEvent('done', me, record.data['desc_funcionario'], record.data['id_funcionario']);
    	}
    	
    },
    onActiveFilter:function(value){
    	var me = this,
    	    store = me.down('list').getStore();
    	    
    	    console.log('store ...  ',store)
    	   var extra = store.getProxy().getExtraParams();
    	
    	me.mask(); 
    	
    	store.getProxy().setExtraParams(Ext.apply(extra, {
    		     "par_filtro": "fun.desc_funcionario1",
			     "query": value
			}));
			
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    		
    	}});
    },
    onClearFilter:function(value){
    	var me = this,
    	    store = me.down('list').getStore();
    	    extra = store.getProxy().getExtraParams();
    	    
    	delete extra.par_filtro;
    	delete extra.query;
    	
    	me.mask();
    	store.getProxy().setExtraParams(extra);
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    	}});
    },
    idColumn:'id_funcionario',
    displayColumn:'desc_funcionario',
    
    onCancel:function(){
    	this.hide();
    }
  
});
