Ext.define('PXP.profile.Phone', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['Main',
        'Navigation'],
        //controllers: ['Main']
    },
    isActive: function(){
        return Ext.os.is.Phone;
    }

});
