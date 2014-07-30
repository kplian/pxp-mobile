/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.interino.Interino', {
    extend: 'Ext.Container',
    xtype: 'interino',
    requires: [
        'pxp.view.interino.InterinoList',
        'pxp.view.interino.InterinoTbar',
        'pxp.view.interino.InterinoForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
	           
	           {
	                xtype: 'interinolist',
	                flex:1
	           },
	           {
	            	xtype: 'interinoform',
	            	flex:1,
	                hidden:true
	           }
          ]
    }
});
