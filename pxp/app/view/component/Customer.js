Ext.define('emsysMobile.view.component.Customer', {
    extend: 'Ext.Container',
    xtype: 'customercomp',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'emsysMobile.store.Customers'
    ],

    config: {
    	
    	//store:'Customers',
    	valueField:'name',
    	idField:'id',
        ui: 'detail',
        cmpHiddenCustomer:undefined,
        cmpTextCustomer:undefined,
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
			                    searchField.up('customercomp').onCancel();
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
			                    searchField.up('customercomp').onActiveFilter(searchField.getValue());
			                 },
			                clearicontap:function(searchField){
			                	console.log("clearicontap");
			                	searchField.up('customercomp').onClearFilter()
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
			                    searchField.up('customercomp').onDone();
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
	       me.store = Ext.create('emsysMobile.store.Customers')	
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
	            itemTpl:'{name}',
	            masked: { xtype: 'loadmask', message: 'loading' }
	
	        }]);
	   
	    
		     me.mask(); 
	    	 me.store.load({callback:function(){
	    	 me.unmask();
    		
    	}});
    	me.callParent(arguments)
    	
    },
    onActiveFilter:function(value){
    	var me = this;
	    me.mask(); 
    	var store = me.down('list').getStore();
    	store.getProxy().setExtraParams({
			     'query':value
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
    	store.getProxy().setExtraParams({
			     'query':''
			});
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    	}});
    },
    idColumn:'id',
    displayColumn:'name',
    onDone:function(){
    	var me = this,
    	    rec = me.down('list').getSelection();
    	if(rec[0]){
    	   me.getCmpTextCustomer().setValue(rec[0].data['name']);
    	   me.getCmpHiddenCustomer().setValue(rec[0].data[me.idColumn])
    	   me.hide()
    	}
    },
    onCancel:function(){
    	this.hide();
    }
  
});
