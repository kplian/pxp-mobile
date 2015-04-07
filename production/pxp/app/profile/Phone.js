Ext.define('pxp.profile.Phone', {
    extend: 'Ext.app.Profile',
    config: {
        views: [ 
           'pxp.view.phone.Main',
           'pxp.view.phone.Navigation']
    },
    isActive: function(){
        return Ext.os.is.Phone;
    }

});