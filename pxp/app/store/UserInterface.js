Ext.define('pxp.store.UserInterface', {
    extend: 'Ext.data.Store',
    
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter'
    ],
    
    config: {
	    autoLoad: false,
	    model: 'pxp.model.UserInterface',
	    successProperty: 'success',
        proxy: {
	        type: 'ajax',
	        url: '/api/session/get/menu/mobile/',
	        reader : {
		        type : 'json',
		        rootProperty : 'data'
		    }
	    }
	  }
});

