Ext.define('pxp.view.phone.Navigation', {
				extend: 'Ext.Panel',
				alias: "widget.navigation",
				config: {
						tabBarPosition : 'bottom',
						layout:'fit',
						//flex:3,
		                items : [{
								title : 'Home',
								iconCls : 'home',
								xtype:  "container",
		                        itemId: 'maincontainerid',
								layout: {
						            type: 'card',
						            animation: {
						                type: 'slide',
						                direction: 'right',
						                duration: 250
						            }
						       },
								
								styleHtmlContent : true,
								items : [{
										xtype : 'titlebar',
										itemId: 'mainTitleBar',
										title : '',
										docked : 'top',
										items :[
										{
											align : 'left',
											name : 'nav_btn',
											itemId: 'menubutton',
											iconCls : 'list',
											ui : 'plain',
							                handler: function(){
							                	if(Ext.Viewport.getMenus().left.isHidden()){
							                        Ext.Viewport.showMenu('left');
							                    }
							                    else{   
							                    	Ext.Viewport.hideMenu('left');
							                   }
							                }
										},
										
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
										 }]
								}]
						}
					]
		}
});
