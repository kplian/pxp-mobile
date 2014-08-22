Ext.define('pxp.model.Cargo', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_cargo',
	    fields: [ 
	        'acefalo',
			'codigo',
			'codigo_tipo_contrato',
			'estado_reg',
			'fecha_fin',
			'fecha_ini',
			'fecha_mod',
			'fecha_reg',
			'id_cargo',
			'id_escala_salarial',
			'id_lugar',
			'id_oficina',
			'id_temporal_cargo',
			'id_tipo_contrato',
			'id_uo',
			'id_usuario_mod',
			'id_usuario_reg',
			'identificador',
			'nombre',
			'nombre_escala',
			'nombre_oficina',
			'nombre_tipo_contrato',
			'usr_mod',
			'usr_reg'
			]
		}
});