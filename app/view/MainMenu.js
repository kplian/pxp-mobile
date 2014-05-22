/**
 * @author RAC
 * @date:  25/03/2014
 * Description: Menu Container
 */
Ext.define('PXP.view.MainMenu', {
   extend: 'Ext.Panel',
    requires: ['Ext.TitleBar','Ext.dataview.List'],
    alias: 'widget.mainmenuview',
    config: {
    	itemId:'mainmenuviewid',
        layout: {
           type: 'fit'
        },
       
        items: [
        {
		  	xtype: 'list',
            //set the itemtpl to show the fields for the store
            itemTpl: '<div><strong>{name}</strong></div>',
            store: 'UserInterface', //store of menu
            listeners: {
        	  'itemsingletap':function(DataView,index,target,record,e,eOpts){
        	  	  this.up('mainmenuview').fireEvent('onOpenHandler',DataView,index,target,record,e,eOpts);
        	  }
                 
            },
            
						  	
				  	
		}],
    }

});