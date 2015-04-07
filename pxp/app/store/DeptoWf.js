Ext.define('pxp.store.DeptoWf', {
    extend: 'Ext.data.Store',    
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter',
       'pxp.model.DeptoWf'
    ],    
    config: {
	    autoLoad: false,
	    simpleSortMode: true,
	    remoteFilter: true,
	    pageSize: 20,
	    model: 'pxp.model.DeptoWf' ,
	    successProperty: 'success'	    
	 },
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        url: pxp.apiRest._url('workflow/TipoEstado/listarDeptoWf'),
	        reader : {
		        type : 'json',
		        rootProperty : 'datos',
		        totalProperty: 'total'
		    }
	    });
    } 

});