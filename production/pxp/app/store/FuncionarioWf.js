Ext.define('pxp.store.FuncionarioWf', {
    extend: 'Ext.data.Store',    
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter',
       'pxp.model.FuncionarioWf'
    ],    
    config: {
	    autoLoad: false,
	    simpleSortMode: true,
	    remoteFilter: true,
	    pageSize: 20,
	    model: 'pxp.model.FuncionarioWf' ,
	    successProperty: 'success'	    
	 },
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        url: pxp.apiRest._url('workflow/TipoEstado/listarFuncionarioWf'),
	        reader : {
		        type : 'json',
		        rootProperty : 'datos',
		        totalProperty: 'total'
		    }
	    });
    } 

});

