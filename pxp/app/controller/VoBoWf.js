/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.VoBoWf', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        
        models: [
            'pxp.model.VoBoWf',
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            vobowflist: 'vobowflist',
            vobowfdetail:'vobowfdetail'
        },

        control: {
            'vobowflist list': {
                select: 'onListTap',
                tap: 'onListTap'
            },
            'vobowfdetail #voboback':{
            	tap:'onBackVoBo'
            	
            }
            
          
         } 
    },
    
   onListTap:function(){
   	
   	    var seltected = this.getVobowflist().down('list').getSelection();
    	
    	if(seltected.length == 0){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	pxp.app.showMask();
    	
    	var me = this,
    	    params = {
                id_estado_wf:  seltected[0].data.id_estado_wf
              
              };
   	
   	
     	me.getVobowflist().hide();
     	me.getVobowfdetail().show();
     	//load paltilla evaluada
     	pxp.app.showMask();
    	
    	Ext.Ajax.request({
		        
		        headers: pxp.apiRest.genHeaders(),
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('pxp/lib/rest/workflow/ProcesoWf/evaluaPlantillaEstado'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		           var Response = Ext.JSON.decode(resp.responseText);
		           pxp.app.hideMask();
		           //Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
		           console.log(Response)
		           me.getVobowfdetail().down('#detailvobo').setHtml(Response.ROOT.datos.plantilla_correo)
		            
		           
		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
                    
                }
        });
     	
     	
   	
   },
   
   onBackVoBo:function(){
   	  	this.getVobowflist().show();
     	this.getVobowfdetail().hide();
   }
});
