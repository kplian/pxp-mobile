Ext.define('pxp.profile.Tablet', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['pxp.view.tablet.Main']
    },
    isActive: function(){
        return Ext.os.is.Tablet;
    }

});

