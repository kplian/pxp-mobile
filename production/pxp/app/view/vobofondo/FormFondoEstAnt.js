Ext.define('pxp.view.vobofondo.FormFondoEstAnt', {
    extend: 'Ext.Container',
    xtype: 'formfondoestant', //formulario estado anterior
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "up" } ,
    	id_cuenta_doc:undefined,
    	ui: 'detail',
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
                     text: 'Cancelar',
                     align: 'left',
                     listeners: {
			                tap: function (searchField) {
			                    searchField.up('formfondoestant').onCancel();
			                 },
			                 scope: this
			             
                     }
                   },
                   {   
                   	   xtype: 'title',
                       title: 'Rechazar ...',
                       flex:1
                   },
                   { 
                   	 xtype: 'button',
                   	 itemId: 'backDone',
                   	 text: 'Guardar',
                   	 align: 'right',
                   	 listeners: {
			                tap: function (searchField) {
			                    searchField.up('formfondoestant').onDone();
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
        //me.callParent();
        me.destroy();
    },
    
    initialize: function(){
       var me = this;
       me.add([
           {
                xtype: 'formpanel',
                padding :'5 5 5 5',
                flex:1,
                items:[
                      { xtype: 'textareafield',
			            label: 'Obser.',
			            maxRows: 16,
			            name: 'obs',
			            value:'Rechazado'
			        }]
           
           }]);
	   
	    me.callParent(arguments)
    	
    },
    
    
    onDone:function(){
    	 var me = this;
    	 me.fireEvent('onBackStateDone',me,'rechazar');
    	
    },
    onCancel:function(){
    	this.hide();
    }
  
});
