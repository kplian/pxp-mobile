Ext.define('pxp.view.vobowf.FormEstSig', {
    extend: 'Ext.Container',
    xtype: 'formestsig', //formulario estado anterior
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
			                    searchField.up('formestsig').onCancel();
			                 },
			                 scope: this
			             
                     }
                   },
                   {   xtype: 'title',
                       title: 'Aprobar ...',
                       flex:1
                   },
                   { 
                   	 xtype: 'button',
                   	 itemId: 'backDone',
                   	 text: 'Guardar',
                   	 align: 'right',
                   	 listeners: {
			                tap: function (searchField) {
			                    searchField.up('formestsig').onDone();
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

        //we fire this event for hide interface, after that we destroy the interface.
        me.fireEvent('hideanimationstart', me);
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
	                    {   xtype: 'textareafield',
				            label: 'Obser.',
				            maxRows: 16,
				            name: 'obs',
				            value:'Aprobado'
				        }]
           
           }]);
	   
	    me.callParent(arguments)
    	
    },
    
    
    onDone:function(){
    	 var me = this;
    	 me.fireEvent('onNextStateDone',me);
    	
    },
    onCancel:function(){
    	this.hide();
    }
  
});
