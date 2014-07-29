Ext.define('pxp.model.FuncionarioCargo', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_cargo',
	    fields: [ 
		        'ci',
				'codigo',
				'desc_funcionario1',
				'desc_funcionario2',
				'descripcion_cargo',
				'email_empresa',
				'estado_reg_asi',
				'estado_reg_fun',
				'fecha_asignacion',
				'fecha_finalizacion',
				'id_cargo',
				'id_funcionario',
				'id_uo',
				'id_uo_funcionario',
				'nombre_cargo',
				'num_doc',
				'cargo_codigo'
			]
		}
});

