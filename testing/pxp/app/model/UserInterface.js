Ext.define('pxp.model.UserInterface', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],

    config: {
    	'idProperty':'id_gui',
        'fields':[
			        'id_gui',
			        'codigo_gui',
			        'nombre',
			        'codigo_mobile',
			        'desc_mobile']
      } 
});