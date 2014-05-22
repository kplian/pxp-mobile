Ext.define('PXP.profile.Tablet', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['Main'],
        //controllers: ['Main']
    },
    isActive: function(){
        return Ext.os.is.Tablet;
    },
    /*launch: function(){
        var mainView = Ext.create('emsysMobile.view.tablet.MainView');
        Ext.Viewport.add(mainView);
    }*/

});

