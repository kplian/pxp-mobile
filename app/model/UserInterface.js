Ext.define('PXP.model.UserInterface', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields:['code',
			    'name',
			    'description',
			    'icon_cls',
			    'handler',
			    'in_menu',
			    'order_menu',
			    'id',
			    'type',
			    'level',
			    'name',
			    'leaf']
      }
      
      
      	
    
});
