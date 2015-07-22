/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.vobowfwzd.VoBoWfWzd', {
    extend: 'Ext.Container',
    xtype: 'vobowfwzd',
    requires: [
        'pxp.view.vobowfwzd.VoBoWfListWzd',
        'pxp.view.vobowfwzd.VoBoDetailWzd',
        'pxp.view.vobowfwzd.VoBoWfTbarWzd',
        'pxp.view.vobowfwzd.VoBoWfListWzd',
        'pxp.view.vobowfwzd.FormEstAntWzd',
        'pxp.view.vobowfwzd.FormEstSigWzd',       
        'pxp.view.component.DeptoWf',
        'pxp.view.component.EstadoWf',
        'pxp.view.component.FuncionarioWf'

        
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        scrollable:false,
        items: [
	           {
	                xtype: 'vobowflistwzd',
	                flex:1
	           },
	           {
	            	xtype: 'vobowfdetailwzd',
	            	flex:1,
	                hidden:true
	           },
	           {
	            	xtype: 'formestsigwzd',
	            	flex:1,
	                hidden:true
	           }
	          
          ]
    }
});