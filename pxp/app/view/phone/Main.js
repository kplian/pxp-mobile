Ext.define("pxp.view.phone.Main", {
    extend: "Ext.Container",
    requires: [
        "Ext.TitleBar"
        
    ],
    alias: "widget.main",
    config: {
    	style: 'background-color: #ddf',
    	ui: 'dark',
        layout: {
            type:"fit"
        },
        items: [
            {
				xtype : 'navigation',
				cls: 'slide',
				// Needed to fit the whole content
				width: '100%'												
			}, {
				xtype : 'mainmenuview',
				width : 250,
				style: 'background-color: #ddf;',
                ui: 'light'
			} 

        ]
    }
});