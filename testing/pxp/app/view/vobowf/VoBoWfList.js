/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.vobowf.VoBoWfList', {
    extend: 'Ext.Container',
    xtype : 'vobowflist',
    requires: [
        'pxp.view.vobowf.VoBoWfTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.store.VoBoWf'
    ],

    config: {
    	pivote:'',
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
	           	 xtype : 'vobowftbar',
	             docked: 'top'
	           },
	            {
                  xtype: 'audio',
                  hidden: true,
                  url: 'resources/sound/Alert.mp3'
                }
	           
	           
	           ]
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
		    	itemTpl: new Ext.XTemplate("<div><table width='100%'>",
		    	          "<tr>",
						  "<td colspan=2 style='float: left;' width='100%'><b>",
						  
						  
						  '<tpl switch="codigo_subsistema">',
					            '<tpl  case="TES">',
					               "<font color='red'>{nombre_subsistema}</font>",
					            '<tpl default>',
					               "<font color='green'>{nombre_subsistema}</font>",
					            
					      '</tpl>', 
					        
					      "</b></td>",
						  "</tr>",
						   	  
						  "<tr>",
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
						  "</tr></table></div>")
     
	   	
	   }]);
	   
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		me.fireEvent('checkMessages');
    		
       }});
      
      
    	  
    },
    getFormattedDate:function() {
        var date = new Date();
        var str = date.getDate()+"/"+ (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return str;
   }
    
});
