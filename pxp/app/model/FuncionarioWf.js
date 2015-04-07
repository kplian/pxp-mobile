Ext.define('pxp.model.FuncionarioWf', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_funcionario',
	    fields: ['id_funcionario','desc_funcionario','prioridad']
       }
});