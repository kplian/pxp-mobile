/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.application({
    name: 'pxp',
    requires: [
        'Ext.MessageBox',
        'pxp.lib.LocalStorageCookie',
        'Ext.data.JsonP',
        'pxp.lib.ApiRestClient',
        'Ext.direct.*',
        'Ext.List',
        'Ext.Audio',
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.data.proxy.Rest'
    ],
      
    profiles: ['Phone','Tablet'],

    views: [
        'MainMenu',
        'Login',
        'interino.Interino',
        'vobowf.VoBoWf' 
        
    ],
    
    controllers : [
        'Login',
        'Main',
        'Interino',
        'VoBoWf',
        'VoBoFondo'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.png',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
    	//aPI REST CONFIG
        pxp.apiRest = Ext.create('pxp.lib.ApiRestClient',_CONFIG); 
        
    	
    	pxp.app = this;
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        pxp.app.cookie = new pxp.lib.LocalStorageCookie();
        
        // Initialize the main view
        Ext.Viewport.add(Ext.create('pxp.view.Login'));
        
        
    },
    
    showMask:function(){
    	Ext.Viewport.setMasked({xtype:'loadmask',message:'loading'});
    },
    hideMask:function(){
       Ext.Viewport.setMasked(false);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});