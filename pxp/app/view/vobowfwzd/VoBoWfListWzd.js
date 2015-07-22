/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.vobowfwzd.VoBoWfListWzd', {
    extend: 'Ext.Container',
    xtype : 'vobowflistwzd',
    requires: [
        'pxp.view.vobowfwzd.VoBoWfTbarWzd',
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
	           	 xtype : 'vobowftbarwzd',
	             docked: 'top'
	           },
	            {
                  xtype: 'audio',
                  hidden: true,
                  docked: 'bottom',
                  url: 'resources/sound/Alert.mp3'
                }
	           
	           
	           ]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.VoBoWf');
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
						  '<tpl switch="revisado_asistente">',
					            '<tpl  case="si">',
					               "<img src = 'resources/img/ball_green.png' align='center' width='12' height='12'/>",
						 
					            '<tpl default>',
					               "<img src = 'resources/img/ball_white.png' align='center' width='12' height='12'/>",
					            
					      '</tpl>', 
						  
						  '<tpl switch="codigo_subsistema">',
					            '<tpl  case="TES">',
					               "<font color='red'>&nbsp;&nbsp;{nombre_subsistema} &nbsp;&nbsp;</font>",
						 
					            '<tpl default>',
					               "<font color='green'>&nbsp;&nbsp;{nombre_subsistema}</font>",
					            
					      '</tpl>', 
					        
					      "</b></td>",
						  "</tr>",
						   	  
						  "<tr>",
						   "<td colspan=2 style='float: left;' width='100%'> <b>{desc_tipo_proceso}</b> ({usr_reg})</td>",
						   
						  "</tr>",
						  "<tr>",
						    "<td colspan=2 style='float: left;' width='100%'>#Tramite: {nro_tramite}</b></td>",
						  "</tr>",
						  "<tr>",
						    "<td colspan=2 style='float: left;' width='100%'>Estado: {nombre_tipo_estado} ({usu_reg_ew}) , revisiones ({contador_estados})</td>",
						  "</tr>",
						  "<tr>",
						    "<td colspan=2 style='float: left;' width='100%'><p>Resp: {nombre_depto} {desc_funcionario1}  </p></td>",
						  "</tr></table>",
						  "</div>")
     
	   	
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
