/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.vobowf.VoBoWf', {
    extend: 'Ext.Container',
    xtype: 'vobowf',
    requires: [
        'pxp.view.vobowf.VoBoWfList',
        'pxp.view.vobowf.VoBoDetail',
        'pxp.view.vobowf.VoBoWfTbar',
        'pxp.view.vobowf.VoBoWfList',
        'pxp.view.vobowf.FormEstAnt',
        'pxp.view.vobowf.FormEstSig'
        
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
	           {
	                xtype: 'vobowflist',
	                flex:1
	           },
	           {
	            	xtype: 'vobowfdetail',
	            	flex:1,
	                hidden:true
	           }
	          
          ]
    }
});