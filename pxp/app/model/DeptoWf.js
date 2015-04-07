Ext.define('pxp.model.DeptoWf', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_depto',
	    fields: ['id_depto','nombre_depto','subsistema','codigo','nombre_corto_depto','prioridad']
       }
});