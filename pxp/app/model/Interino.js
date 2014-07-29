Ext.define('pxp.model.Interino', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Model'
    ],
    config: {
    	idProperty :'id_interinato',
	    fields: [	    
			    'desc_funcionario_suplente',
		        'desc_funcionario_titular',
				'descripcion',
				'estado_reg',
				'fecha_fin',
				'fecha_ini',
				'fecha_mod',
				'fecha_reg',
				'id_cargo_suplente',
				'id_cargo_titular',
				'id_interinato',
				'id_usuario_ai',
				'id_usuario_mod',
				'id_usuario_reg',
				'nombre_suplente',
				'nombre_titular',
				'usr_mod',
				'usr_reg'
			]
     }  
});


