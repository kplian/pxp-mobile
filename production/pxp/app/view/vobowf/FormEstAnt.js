Ext.define('pxp.view.vobowf.FormEstAnt', {
    extend: 'Ext.Container',
    xtype: 'formestant', //formulario estado anterior
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "up" } ,
    	id_proceso_wf:undefined,
    	id_estado_wf:undefined,
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
			                    searchField.up('formestant').onCancel();
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
			                    searchField.up('formestant').onDone();
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
        console.log('destroy..................')
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
    	 console.log('Me...',me)
    	 console.log('formestant',me.up('formestant'))
    	 me.fireEvent('onBackStateDone',me);
    	
    },
    onCancel:function(){
    	this.hide();
    }
  
});
