/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.vobowf.VoBoWfList', {
    extend: 'Ext.Container',
    xtype : 'vobowflist',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.VoBoWf'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: []
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.VoBoWf');
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
						   "<td colspan=2 style='float: left;' width='100%'> <b>{desc_tipo_proceso}</b> ({usr_reg})</td>"+
						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>#Tramite: {nro_tramite}</b></td>"+
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Estado: {nombre_tipo_estado} ({usu_reg_ew})</td>"+
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'><p>Resp: {nombre_depto} {desc_funcionario1}  </p></td>"+
						  "</tr></table></div>"
     
	   	
	   }]);
	   
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		
       }});
       //me.callParent(arguments)
    	  
    }
    
});
