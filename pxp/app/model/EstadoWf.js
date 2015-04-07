Ext.define('pxp.model.EstadoWf', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_tipo_estado',
	    fields: [ 'id_tipo_estado',
	              'codigo_estado',
	              'nombre_estado',
	              'alerta',
	              'disparador',
	              'inicio',
	              'pedir_obs',
	              'tipo_asignacion',
	              'depto_asignacion']
       }
});