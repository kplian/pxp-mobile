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
            'pxp.model.VoBoWf'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            vobowflist: 'vobowflist',
            vobowfdetail:'vobowfdetail',
            formestant:'formestant',
            formestsig:'formestsig',
            vobowftbar:'vobowftbar'
        },

        control: {
            'vobowflist list': {
               // select: 'onListTap',
                itemtap: 'onListTap'
            },
            'vobowflist': {
               'checkMessages': 'checkMessages'
            },
            'vobowfdetail #voboback':{
            	tap:'onBackVoBo'
            	
            },
            'vobowfdetail #backstate':{
            	tap:'onBackState'
            	
            },
            'vobowfdetail #nextstate':{
            	tap:'onNextState'
            	
            },
            'formestant':{
            	'onBackStateDone':'onBackStateDone'
            },
            'vobowftbar #refreshvobo':{
            	tap:'onVoBoRefresh'
            },
            'formestsig':{
            	'onNextStateDone':'onNextStateDone'
            }
        } 
    },
    
    
    
   launch:function(){
	   	Ext.define("Obs", { extend: "Ext.data.Model", 
	                         config:{
	                           fields: [
				                {name: 'obs',     type: 'string'}
				               ],
				                validations: [
				                {type: 'presence', name: 'obs',message:"Indique una Observacion"}
				                ]
				              }
				            });
   }, 
   
   checkMessages:function(){
   	    var me = this,
   	        meparams;
   	        if(me.getVobowflist){
   	        	
   	        	meparams = {'fecha_pivote':me.getVobowflist().getPivote()}
   	            console.log('params.....',meparams,me)
   	        }
   	        
   	    Ext.Ajax.request({
		        //headers: pxp.apiRest.genHeaders(),
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('workflow/ProcesoWf/chequeaEstadosMobile'),
		        params: meparams,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		           var Response = Ext.JSON.decode(resp.responseText);
		           console.log('...  ',Response);
		           
		           if(!Response.ROOT.error){
		           	  setTimeout((function(){me.checkMessages()}), _CONFIG._time_period);
		              console.log('fecha_pivote',Response.ROOT.datos.fecha_pivote)
		              me.getVobowflist().setPivote(Response.ROOT.datos.fecha_pivote);
		              
		           	  if(Response.ROOT.datos.total_registros > 0){
		           	      me.getVobowflist().down('list').getStore().load();
		           	      me.getVobowflist().down('audio').toggle();

                        audio.toggle();
		           	  }
		           	}
		            else{
		           	   Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
		            }
           
		         },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
                    
                }
        });
   	
   	
   },
   
   onVoBoRefresh:function(){
   	   var me = this;
   	   me.getVobowflist().down('list').getStore().load();
   	
   },
    
   onBackState:function(){
   	
   	    var me = this;
    	
    	me.formEstAnt = Ext.create('pxp.view.vobowf.FormEstAnt',{
			id_proceso_wf: me.getVobowfdetail().getId_proceso_wf(),
 	        id_estado_wf: me.getVobowfdetail().getId_estado_wf()
		});
	   
	    Ext.Viewport.add(me.formEstAnt);
    	
    	me.formEstAnt.show();
    	
   }, 
   
   onNextState:function(){
   	
   	    var me = this;
    	
    	me.formEstAnt = Ext.create('pxp.view.vobowf.FormEstSig',{
			id_proceso_wf: me.getVobowfdetail().getId_proceso_wf(),
 	        id_estado_wf: me.getVobowfdetail().getId_estado_wf()
		});
	   
	    Ext.Viewport.add(me.formEstAnt);
    	
    	me.formEstAnt.show();
    	
   },
    
   onListTap:function(lista, index, target, record, e, eOpts){
   	
   	   console.log('...  ',record)
   	
   	    if(!record){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	pxp.app.showMask();
    	
    	var me = this,
    	    params = {
                id_estado_wf:  record.data.id_estado_wf
              
              };
   	
   	
     	me.getVobowflist().hide();
     	me.getVobowfdetail().show();
     	me.getVobowfdetail().setId_proceso_wf(record.data.id_proceso_wf);
     	me.getVobowfdetail().setId_estado_wf(record.data.id_estado_wf);
     	
     	//load paltilla evaluada
     	pxp.app.showMask();
    	
    	Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('workflow/ProcesoWf/evaluaPlantillaEstado'),
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
   },
   //retrocede estado de work flow
   onBackStateDone:function(formBackState){
   	   
   	   console.log('onBackStateDone',formBackState)
   	   
   	   var values = formBackState.down('formpanel').getValues(),
   	       model = Ext.ModelMgr.create(values,'Obs'),
   	       errors = model.validate(),message="";
       
		 if(errors.isValid()){
		   	
		   	  
		    	var me = this,
		    	    params = {
		                id_proceso_wf: formBackState.getId_proceso_wf(),
		                id_estado_wf: formBackState.getId_estado_wf(),
		                operacion:"cambiar",
		                obs:values.obs,
		                mobile:'si'
		            };
		            
		           
		              
		            
		   	    pxp.app.showMask();
		    	Ext.Ajax.request({
				        withCredentials: true,
	                    useDefaultXhrHeader: false,
	                    url: pxp.apiRest._url('workflow/ProcesoWf/anteriorEstadoProcesoWf '),
				        params: params,
				        method: 'POST',
				        scope: me,
				        success: function(resp){
				           var Response = Ext.JSON.decode(resp.responseText);
				           pxp.app.hideMask();
				           if(!Response.ROOT.error){
				           	  me.getVobowflist().show();
     	                      me.getVobowfdetail().hide();
     	                      me.getVobowflist().down('list').getStore().load();
     	                      formBackState.hide();
     	                      
				           }
				           else{
				           	  Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
				           }
				           
				           
				           
				        },
				        failure:function(resp){
		                    var Response = Ext.JSON.decode(resp.responseText);
		                    pxp.app.hideMask();
		                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
		                    
		                }
		        });
     	
     	}
     	else {
                    Ext.each(errors.items,function(rec,i){
                       console.log('rec ..',rec,i)
                        message += rec._message+"<br>";
                    });
                    
                    
                    Ext.Msg.alert("Validate", message, function(){});
                    return false;
             }
   	
   },
   
   onNextStateDone:function(formNextState){
   	   
   	   console.log('onNextStateDone',formNextState)
   	   
   	   var values = formNextState.down('formpanel').getValues(),
   	       model = Ext.ModelMgr.create(values,'Obs'),
   	       errors = model.validate(),message="";
       
		 if(errors.isValid()){
		   	
		   	  
		    	var me = this,
		    	    params = {
		                id_proceso_wf: formNextState.getId_proceso_wf(),
		                id_estado_wf: formNextState.getId_estado_wf(),
		                operacion:"cambiar",
		                obs:values.obs,
		                mobile:'si'
		            };
		            
		            
		   	    pxp.app.showMask();
		    	Ext.Ajax.request({
				        
				        withCredentials: true,
	                    useDefaultXhrHeader: false,
			            url: pxp.apiRest._url('workflow/ProcesoWf/siguienteEstadoProcesoWfMobile '),
				        params: params,
				        method: 'POST',
				        scope: me,
				        success: function(resp){
				           var Response = Ext.JSON.decode(resp.responseText);
				           pxp.app.hideMask();
				           if(!Response.ROOT.error){
				           	  me.getVobowflist().show();
     	                      me.getVobowfdetail().hide();
     	                      me.getVobowflist().down('list').getStore().load();
     	                      formNextState.hide();
     	                      
				           }
				           else{
				           	  Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
				           }
				           
				           
				           
				        },
				        failure:function(resp){
		                    var Response = Ext.JSON.decode(resp.responseText);
		                    pxp.app.hideMask();
		                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
		                    
		                }
		        });
     	
     	}
     	else {
                    Ext.each(errors.items,function(rec,i){
                       console.log('rec ..',rec,i)
                        message += rec._message+"<br>";
                    });
                    
                    
                    Ext.Msg.alert("Validate", message, function(){});
                    return false;
             }
   	
   }
   
   
});
