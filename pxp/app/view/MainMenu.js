/**
 * @author RAC
 * @date:  25/03/2014
 * Description: Menu Container
 */
Ext.define('pxp.view.MainMenu', {
    extend: 'Ext.Menu',
    requires: ['Ext.TitleBar','Ext.dataview.List'],
    alias: 'widget.mainmenuview',
    config: {
    	itemId:'mainmenuviewid',
    	modal : false,
        layout: {
           type: 'fit'
        },
        width: 250,
        
       
        items: [
        {
		  	xtype: 'list',
		  	layout: {
              type: 'fit'
            },
		  	flex: 1,
            //set the itemtpl to show the fields for the store
            itemTpl: '<div><strong>{desc_mobile}</strong></div>',
            listeners: {
        	  'itemsingletap':function(DataView,index,target,record,e,eOpts){
        	  	  this.up('mainmenuview').fireEvent('onOpenHandler',DataView,index,target,record,e,eOpts);
        	  }
                 
            }
        }]
    }

});