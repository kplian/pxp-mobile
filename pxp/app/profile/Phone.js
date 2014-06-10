Ext.define('pxp.profile.Phone', {
    extend: 'Ext.app.Profile',
    config: {
        views: [ 
           'pxp.view.Phone.Main',
           'Navigation'],
        //controllers: ['Main']
    },
    isActive: function(){
        return Ext.os.is.Phone;
    }

});
