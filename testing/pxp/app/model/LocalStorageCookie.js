Ext.define('pxp.model.LocalStorageCookie', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],

    config:{
      	  fields: ['id','key', 'value'],
	      proxy: {
	        type: 'localstorage',
	        id: 'com.domain.cookies'
	      }
      	
      }

});