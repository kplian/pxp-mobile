Ext.define('pxp.view.vobowfwzd.FormEstSigWzd', {
    extend: 'Ext.Container',
    xtype: 'formestsigwzd', //formulario estado anterior
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "left" } ,
    	ui: 'light',
    	id_proceso_wf:undefined,
    	id_estado_wf:undefined,
    	estados: undefined,
    	hideOnMaskTap : true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },

       items: [
            {
                xtype: 'toolbar',
                itemId:'pickupstoolbar2',
                docked: 'top',
                ui: 'light',
                layout:'hbox',
                items: [
                   { 
                   	 xtype: 'button',
                     text: 'Cancelar',
                     align: 'left',
                     listeners: {
			                tap: function (searchField) {
			                    searchField.up('formestsigwzd').onCancel();
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
			                    searchField.up('formestsigwzd').onDone();
			                 },
			                scope: this
			            }
                   	 
                   	 
                   }
                ]
           },
           {
                xtype: 'formpanel',
                padding :'5 5 5 5',
                flex:1,
                items:[
	                    
				        {
				           	xtype: 'fieldset',
				           	itemId:'estado_fieldset',
				           	margin:'5 5 5 5',
				           	layout: {
					            type: 'hbox',
					            align: 'stretch'
					        },
					        items:[
					             {
					                xtype: 'hiddenfield',
					                itemId:'id_tipo_estado',
					                name: 'id_tipo_estado'
					             },
					             {
					                xtype: 'textfield',
					                labelWidth:100,
					                label: 'Est. sig',
					                flex: Ext.os.is.Phone?1:undefined,
					                //flex: 1,
					                itemId:'nombre_estado',
					                name: 'nombre_estado', 
					                readOnly:true
					                
					             },
					             {
					                xtype: 'button',
					                itemId:'estadowfbutton',
					                iconCls: 'ico-customers-small'
					             }
					         ]
				        },
				        {
				           	xtype: 'fieldset',
				           	itemId:'funcionario_fieldset',
				           	margin:'5 5 5 5',
				           	layout: {
					            type: 'hbox',
					            align: 'stretch'
					        },
					        items:[
					             {
					                xtype: 'hiddenfield',
					                itemId:'id_funcionario',
					                name: 'id_funcionario'
					             },
					             {
					                xtype: 'textfield',
					                labelWidth:100,
					                label: 'Funcionario',
					                flex: Ext.os.is.Phone?1:undefined,
					                //flex: 1,
					                itemId:'desc_funcionario',
					                name: 'desc_funcionario', 
					                readOnly:true
					                
					             },
					             {
					                xtype: 'button',
					                itemId:'funcionariowfbutton',
					                iconCls: 'ico-customers-small'
					             }
					         ]
				        },
				        {
				           	xtype: 'fieldset',
				           	itemId: 'depto_fieldset',
				           	margin:'5 5 5 5',
				           	layout: {
					            type: 'hbox',
					            align: 'stretch'
					        },
					        items:[
					             {
					                xtype: 'hiddenfield',
					                itemId:'id_depto',
					                name: 'id_depto'
					             },
					             {
					                xtype: 'textfield',
					                labelWidth:100,
					                label: 'Depto',
					                flex: Ext.os.is.Phone?1:undefined,
					                //flex: 1,
					                itemId:'desc_depto',
					                name: 'desc_depto', 
					                readOnly:true
					                
					             },
					             {
					                xtype: 'button',
					                itemId:'deptowfbutton',
					                iconCls: 'ico-customers-small'
					             }
					         ]
				        },
				        {   xtype: 'textareafield',
				            label: 'Prov.',
				            maxRows: 8,
				            name: 'obs',
				            value:'Aprobado'
				        }]
           
           }
         
        ]
    },
    /*
    hide: function(animation) {
        var me = this;

        //we fire this event for hide interface, after that we destroy the interface.
        me.fireEvent('hideanimationstart', me);
        //me.destroy();
    },*/
    
    
    onDone:function(){
    	 this.fireEvent('onNextStateDone',this);
    	
    },
    onCancel:function(){
    	this.fireEvent('hideform', this);
    }
  
});
