/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.vobofondo.VoBoFondo', {
    extend: 'Ext.Container',
    xtype: 'vobofondo',
    requires: [
        'pxp.view.vobofondo.VoBoFondoList',
        'pxp.view.vobofondo.VoBoFondoTbar',
        'pxp.view.vobofondo.VoBoFondoList',
        'pxp.view.vobofondo.FormFondoEstAnt',
        'pxp.view.vobofondo.FormFondoEstSig'
        
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
	           {
	                xtype: 'vobofondolist',
	                flex:1
	           }
	      ]
    }
});