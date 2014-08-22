/**
 * @class kiva.views.LoanFilter
 * @extends Ext.form.Panel
 *
 * This form enables the user to filter the types of Loans visible to those that they are interested in.
 *
 * We add a custom event called 'filter' to this class, and fire it whenever the user changes any of the
 * fields. The loans controller listens for this event and filters the Ext.data.Store that contains the
 * Loans based on the values selected (see the onFilter method in app/controllers/loans.js).
 *
 */
Ext.define('pxp.view.interino.InterinoForm', {
    extend: 'Ext.form.Panel',
    xtype: 'interinoform',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.view.component.FuncionarioCargo'
    ],
    
    config: {
    	ui: 'light',
    	showAnimation: { type: "slide", direction: "down" } ,
        items: [
            {
                xtype: 'toolbar',
                ui: 'light',
                docked: 'top',
                items: [
                   {
                        xtype: 'button',
                        ui: 'back ',
                        //iconCls: 'arrow_left',
                        text:'Listado',
                        itemId: 'interinoback'
                   },
                    {
                       xtype: 'title',
                       title: 'Nuevo Suplente'
                    },
                    { xtype: 'spacer' },
                    {
                        xtype: 'button',
                        iconMask: true,
                        iconCls: 'add',
                        itemId: 'interinosave'
                    }
                ]
            },
           
           {
           	xtype: 'fieldset',
           	flex: 1,
           	layout: {
	            type: 'vbox'
	        },
            items:[
		            {
			           	xtype: 'fieldset',
			           	margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: Ext.os.is.Phone?'vbox':'hbox',
				            align: 'stretch'
				        },
				        items:[
					        {
		                        xtype: 'datepickerfield',
		                        itemId: 'fecha_ini',
		                        name:'fecha_ini',
		                        labelWidth:100,
		                       
		                        width:Ext.os.is.Phone?undefined:'150',
		                        label: 'Fecha Inicial',
		                        //cls: 'my-component',
                                value: new Date()
		                    },
			                {
		                        xtype: 'datepickerfield',
		                        itemId: 'fecha_fin',
		                        name:'fecha_fin',
		                        width:Ext.os.is.Phone?undefined:'150',
		                        labelWidth:Ext.os.is.Phone?100:undefined,
		                        label: 'hasta',
		                        value: new Date()
		                    }
		                 ]
		             },
		            {
			           	xtype: 'fieldset',
			           	 margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: 'hbox',
				            align: 'stretch'
				        },
				        items:[
				             {
				                xtype: 'hiddenfield',
				                itemId:'hiddenCargo'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Cargo suplente',
				                flex: Ext.os.is.Phone?1:undefined,
				                //flex: 1,
				                itemId:'textCargo',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'cargobutton',
				                iconCls: 'ico-customers-small'
				             }
				         ]
				     }
                 ]
           	
           }
        ],
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    }   
});
