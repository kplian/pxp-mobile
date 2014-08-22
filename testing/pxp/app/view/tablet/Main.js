Ext.define("pxp.view.tablet.Main", {
    extend: "Ext.Container",
    requires: [
        "Ext.TitleBar",
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Label'
    ],
    alias: "widget.main",
    config: {
    	style: 'background-color: #ddf',
    	ui: 'dark',
        layout: {
            type:"hbox"
        },
        items: [
             {
                xtype: 'toolbar',
                docked: 'top',
                title: 'App',
                items: [
                    {
                	xtype: 'button',
                    text: 'Log Off',
                    itemId: 'logOffButton',
                    align: 'right',
                    listeners: {
                    	'tap':function(){
					         this.up('main').fireEvent('onSignOffCommand');
					    }
			                 
					}
				  }
                ]
            },
            {
                xtype: 'mainmenuview',
                flex: 1
            },
            {
                xtype: "container",
                itemId:'maincontainerid',
                flex: 3,
                layout: {
		            type: 'card',
		            animation: {
		                type: 'slide',
		                direction: 'left',
		                duration: 250
		            }
		        },
                items: []
                
            }               
        ]
    }
});