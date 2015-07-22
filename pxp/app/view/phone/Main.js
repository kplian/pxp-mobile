Ext.define("pxp.view.phone.Main", {
    extend: "Ext.Container",
    requires: [
        "Ext.TitleBar",
        "pxp.view.MainMenu"
        
    ],
    alias: "widget.main",
    config: {
    	style: 'background-color: #ddf',
    	ui: 'dark',
        layout: {
            //type:"fit"
             type: 'card'
        },
        items: [
            {
				xtype : 'navigation',
				width: '100%'												
			}
			

        ]
    },
    initialize: function(){
    	Ext.Viewport.setMenu(this.createMenu(),{
            side: 'left',
            cover: false
        });
    },
   createMenu: function(){
       var menu = Ext.create('pxp.view.MainMenu', {width: 250});
       return menu;
   }
});