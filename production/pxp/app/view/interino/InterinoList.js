/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.interino.InterinoList', {
    extend: 'Ext.Container',
    xtype : 'interinolist',
    requires: [
        'pxp.view.interino.InterinoTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.Interinos'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
	           	 xtype : 'interinotbar',
	             docked: 'top'
	           }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Interinos');
	   // me.getStore().load();
	   
	   me.add([
	   	    {
		   	    xtype: 'list',
	            flex: 1,
	            plugins: [
	                    {
	                        xclass: 'Ext.plugin.ListPaging',
	                        autoPaging: true,
	                        noMoreRecordsText: 'No More Records'
	                    },
	                    { xclass: 'Ext.plugin.PullRefresh' }
	                ],
			   	masked: { xtype: 'loadmask', message: 'loading' },
		    	store: me.store,
		    	itemTpl: "<div><table width='100%'>"+
						  "<tr>"+
						   "<td colspan=2 style='float: left;' width='100%'> {desc_funcionario_suplente}</td>"+
						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Cargo: {nombre_suplente}</td>"+
						   
						  "</tr>"+
						  "<tr>"+
						    "<td style='float: left;' width='50%'><b>Fecha Ini: {fecha_ini}</b></td>"+
						    "<td style='float: left;' width='50%'><b>Fecha Fin: {fecha_fin}</b></td>"+
						   
						  
						  "</tr></table></div>"
     
	   	
	   }]);
	   
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		
       }});
       //me.callParent(arguments)
    	  
    }
    
});
