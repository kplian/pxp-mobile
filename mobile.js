//@require @packageOverrides
Ext.Loader.setConfig({
    paths: {
        'Ext.ux': 'ux'
    }
});

Ext.application({
    name: 'PXP',
    appFolder: 'app',

    requires: [
        'Ext.MessageBox',
        'Ext.data.proxy.LocalStorage',
        'Ext.util.LocalStorageCookie'
    ],
    profiles: ['Phone','Tablet'],
    views: [
        'Login',
        'MainMenu'
    ],
    controllers : [
        'Login',
        'Main'
    ],
    showMask:function(){
    	Ext.Viewport.setMasked({xtype:'loadmask',message:'loading'});
    },
    hideMask:function(){
       Ext.Viewport.setMasked(false);
    },
    
    launch: function () {
    	PXP.app = this;
    	// Initialize
        PXP.app.cookie = new Ext.util.LocalStorageCookie();
        
        Ext.get('loading').destroy();
        Ext.Viewport.add([
            { xtype: 'loginview' }
        ]);
         
        
    }
});

