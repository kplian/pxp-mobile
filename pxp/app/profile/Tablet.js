Ext.define('pxp.profile.Tablet', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['pxp.view.Phone.Main'],
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

