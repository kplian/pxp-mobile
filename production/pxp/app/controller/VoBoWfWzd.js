/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.VoBoWfWzd', {
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
            vobowflistwzd: 'vobowflistwzd',
            vobowfdetailwzd: 'vobowfdetailwzd',
            formestantwzd: 'formestantwzd',
            formestsigwzd: 'formestsigwzd',
            vobowftbarwzd: 'vobowftbarwzd',
            estadowfcmp: 'estadowfcmp'
        },

        control: {
            'vobowflistwzd list': {
               // select: 'onListTap',
                itemtap: 'onListTap'
            },
            'vobowflistwzd': {
               'checkMessages': 'checkMessages'
            },
            'vobowfdetailwzd #voboback':{
            	tap:'onBackVoBo'
            	
            },
            'vobowfdetailwzd #backstate':{
            	tap:'onBackState'
            	
            },
            'vobowfdetailwzd #nextstate':{
            	tap:'onNextState'
            	
            },
            'formestantwzd':{
            	'onBackStateDone':'onBackStateDone'
            },
            'vobowftbarwzd #refreshvobo':{
            	tap:'onVoBoRefresh'
            },
            'formestsigwzd':{
            	'onNextStateDone':'onNextStateDone',
            	'hideform':  'onHideFormWzd'
            },
            'formestsigwzd #estadowfbutton':{
            	'tap':'onTapEstadoWf'
            },
            'formestsigwzd #funcionariowfbutton':{
            	'tap':'onTapFuncionarioWf'
            },
            'formestsigwzd #deptowfbutton':{
            	'tap':'onTapDeptoWf'
            },
            'estadowfcmp': {
            	'done': 'onEstadoWfDone'
            }
        } 
    },
    
    onTapEstadoWf: function(){
    	var me = this,
    	    store = me.estadowfcmp.down('list').getStore();
    	
    	store.getProxy().setExtraParams({'estados': me.getFormestsigwzd().getEstados()});
    	store.load({start: 0,limit: 20,page: 1});
    	me.estadowfcmp.show();
    	
    },
     
   onTapFuncionarioWf:function(){
    	var me = this,
    	    store = me.funcionariowfcmp.down('list').getStore();
    	
    	console.log('formulario', me.Formestsigwzd.down('#id_tipo_estado'))
    	console.log('..........', me.Formestsigwzd.down('#id_tipo_estado').getValue())
    	store.getProxy().setExtraParams({'id_estado_wf': me.Formestsigwzd.getId_estado_wf(),
					    	             'id_tipo_estado': me.Formestsigwzd.down('#id_tipo_estado').getValue(),
					    	             'fecha': (new Date()).toJSON()});
								
    	store.load({start: 0, limit: 20, page: 1});
    	me.funcionariowfcmp.show();
    	
    },
    
    onTapDeptoWf:function(){
    	var me = this,
    	    store = me.deptowfcmp.down('list').getStore();
    	
    	store.getProxy().setExtraParams({'id_estado_wf': me.Formestsigwzd.getId_estado_wf(),
					    	             'id_tipo_estado': me.Formestsigwzd.down('#id_tipo_estado').getValue(),
					    	             'fecha': (new Date()).toJSON()});
								
    	store.load({start: 0, limit: 20, page: 1});
    	me.deptowfcmp.show();
    	
    },
    
    onEstadoWfDone: function(obj,value,id){
    	
    	var me = this;
    	me.funcionariowfcmp.getCmpText().reset();
	    me.funcionariowfcmp.getCmpHidden().reset();
    },
   launch:function(){
	   	Ext.define("Obs", { extend: "Ext.data.Model", 
	                         config:{
	                           fields: [
				                 {name: 'obs',     type: 'string'},
				                 {name: 'id_estado_wf', type: 'integer'},
				                 {name: 'id_proceso_wf', type: 'integer'},
				                 {name: 'id_tipo_estado', type: 'integer'},
				                 {name: 'id_funcionario', type: 'integer'},
				                 {name: 'id_depto', type: 'integer'},
				                 {name: 'obs',     type: 'string'}
				               ],
				                validations: [
				                  {type: 'presence', name: 'obs',message:"Indique una Observacion"},
				                  {type: 'presence', name: 'id_tipo_estado',message:"Indique el estado siguiente"}
				                ]
				              }
				            });
   }, 
   
   checkMessages:function(){
   	    var me = this,
   	        meparams;
   	        if(me.getVobowflistwzd){
   	        	
   	        	meparams = {'fecha_pivote':me.getVobowflistwzd().getPivote()}
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
		           
		           if(!Response.ROOT.error){
		           	  
		           	  setTimeout((function(){me.checkMessages()}), _CONFIG._time_period);
		              me.getVobowflistwzd().setPivote(Response.ROOT.datos.fecha_pivote);
		              
		           	  if(Response.ROOT.datos.total_registros > 0){
		           	      me.getVobowflistwzd().down('list').getStore().load();
		           	      me.getVobowflistwzd().down('audio').toggle();

                        //audio.toggle();
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
   	   me.getVobowflistwzd().down('list').getStore().load();
   	
   },
    
   onBackState:function(){
   	
   	    var me = this;
    	
    	me.formEstAnt = Ext.create('pxp.view.vobowfwzd.FormEstAntWzd',{
			id_proceso_wf: me.getVobowfdetailwzd().getId_proceso_wf(),
 	        id_estado_wf: me.getVobowfdetailwzd().getId_estado_wf()
		});
	   
	    Ext.Viewport.add(me.formEstAnt);
    	
    	me.formEstAnt.show();
    	
   }, 
   
   onNextState:function(){
   	    
   	  
   	    //load next state
   	    var me = this, 
   	        params = {
                id_proceso_wf:  me.getVobowfdetailwzd().getId_proceso_wf(),
               
                operacion: 'verificar'
              };
        
        //load paltilla evaluada
     	pxp.app.showMask();      
   	    Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('workflow/ProcesoWf/verficarSigEstProcesoWf'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		             var Response = Ext.JSON.decode(resp.responseText);
		             pxp.app.hideMask();
		             
		              //resetea campos del wiard
		              me.Formestsigwzd = me.getFormestsigwzd();
		              me.Formestsigwzd.down('#id_tipo_estado').reset();
		              me.Formestsigwzd.down('#nombre_estado').reset();
		              me.Formestsigwzd.down('#id_funcionario').reset();
		              me.Formestsigwzd.down('#desc_funcionario').reset();
		              me.Formestsigwzd.down('#id_depto').reset();
		              me.Formestsigwzd.down('#desc_depto').reset();
   	    
		           
		             if(!me.estadowfcmp){
    		
				    		
				    	    me.estadowfcmp = Ext.create('pxp.view.component.EstadoWf',{
					    	   	'cmpHidden': me.Formestsigwzd.down('#id_tipo_estado'),
					    	   	'cmpText': me.Formestsigwzd.down('#nombre_estado'),
					    	   	'displayColumn': 'nombre_estado',
					    	   	'idColumn': 'id_estado_wf'
				    	   });
				    	   
				    	   me.estadowfcmp.hide();
				    	   Ext.Viewport.add(me.estadowfcmp);
			    	 }
			    	 
			    	  
			    	  //define que estado se filtran ...
			    	 
			    	  me.Formestsigwzd.setEstados(Response.ROOT.datos.estados);
			    	  me.Formestsigwzd.setId_estado_wf(me.getVobowfdetailwzd().getId_estado_wf());
			    	  me.Formestsigwzd.setId_proceso_wf(me.getVobowfdetailwzd().getId_proceso_wf());
			    	   
			    	 
			    	 //si tiene un solo estado cargamos el combo con este valor
			    	 if(Response.ROOT.datos.id_tipo_estado > 0){
			    	 		console.log('solo tiene un estado destino');
			    	 		
			    	 		var store = me.estadowfcmp.down('list').getStore();
    	    
					    	pxp.app.showMask(); 
					    	store.getProxy().setExtraParams({'estados': me.Formestsigwzd.getEstados()});
								
					    	store.load({
					    		start: 0,
					    		limit: 20,
					    		page: 1,
					    		callback:function(rec){
					    			console.log('respuesta funcionarios ...',rec)
						    		pxp.app.hideMask();
						    		me.Formestsigwzd.down('#nombre_estado').setValue(rec[0].data.nombre_estado);
	    	   						me.Formestsigwzd.down('#id_tipo_estado').setValue(rec[0].data.id_tipo_estado);
					    		
					    	}});
			    	 	
			    	 }
		            
		            
		              //funcionario wf
		              if(!me.funcionariowfcmp){
    		
			    		
			    		
			    	    me.funcionariowfcmp = Ext.create('pxp.view.component.FuncionarioWf',{
				    	   	'cmpHidden': me.Formestsigwzd.down('#id_funcionario'),
				    	   	'cmpText': me.Formestsigwzd.down('#desc_funcionario'),
				    	   	'displayColumn':'desc_funcionario',
				    	   	'idColumn':'id_funcionario'
			    	   });
			    	   
			    	   me.funcionariowfcmp.hide();
			    	   Ext.Viewport.add(me.funcionariowfcmp);
			    	}
			    	//depto wf
			    	
			    	console.log('ROOOOOT >>>>>>>>' , Response.ROOT.datos)
			    	//si tiene un solo estado cargamos el combo con este valor
			    	 if(Response.ROOT.datos.num_funcionarios > 0){
			    	 	    me.Formestsigwzd.down('#funcionario_fieldset').show();
			    	 		var storefun = me.funcionariowfcmp.down('list').getStore();
    	    
					    	pxp.app.showMask(); 
					    	storefun.getProxy().setExtraParams({'id_estado_wf': me.Formestsigwzd.getId_estado_wf(),
					    	                                 'id_tipo_estado': Response.ROOT.datos.id_tipo_estado,
					    	                                 'fecha': (new Date()).toJSON()});
								
					    	storefun.load({
					    		start:0,
					    		limit:20,
					    		page:1,
					    		callback:function(rec){
						    		pxp.app.hideMask();
						    		me.funcionariowfcmp.getCmpText().setValue(rec[0].data.desc_funcionario);
	    	   						me.funcionariowfcmp.getCmpHidden().setValue(rec[0].data.id_funcionario);
					    		
					    	}});
			    	 	
			    	 }
			    	 else{
			    	 	 me.Formestsigwzd.down('#funcionario_fieldset').hide();
			    	 }
			    	 
			    	 //define depto wf
			    	 if(!me.deptowfcmp){
    		
			    		
			    		
			    	    me.deptowfcmp = Ext.create('pxp.view.component.DeptoWf',{
				    	   	'cmpHidden': me.Formestsigwzd.down('#id_depto'),
				    	   	'cmpText': me.Formestsigwzd.down('#desc_depto'),
				    	   	'displayColumn':'nombre_depto',
				    	   	'idColumn':'id_depto'
			    	   });
			    	   
			    	   me.deptowfcmp.hide();
			    	   Ext.Viewport.add(me.deptowfcmp);
			    	}
			    	//depto wf
			    	
			    	console.log('ROOOOOT >>>>>>>>' , Response.ROOT.datos)
			    	//si tiene un solo estado cargamos el combo con este valor
			    	 if(Response.ROOT.datos.num_deptos > 0){
			    	 	    me.Formestsigwzd.down('#depto_fieldset').show();
			    	 		var storedep = me.deptowfcmp.down('list').getStore();
    	    
					    	pxp.app.showMask(); 
					    	storedep.getProxy().setExtraParams({'id_estado_wf': me.Formestsigwzd.getId_estado_wf(),
					    	                                    'id_tipo_estado': Response.ROOT.datos.id_tipo_estado,
					    	                                    'fecha': (new Date()).toJSON()});
								
					    	storedep.load({
					    		start: 0,
					    		limit: 20,
					    		page: 1,
					    		callback:function(rec){
						    		pxp.app.hideMask();
						    		me.deptowfcmp.getCmpText().setValue(rec[0].data.nombre_depto);
	    	   						me.deptowfcmp.getCmpHidden().setValue(rec[0].data.id_depto);
					    		
					    	}});
			    	 	
			    	 }
			    	 else{
			    	 	 me.Formestsigwzd.down('#depto_fieldset').hide();
			    	 }
		            
		             me.getVobowfdetailwzd().hide();
     	             me.Formestsigwzd.show();
     	            

		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
                    
                }
        });
   	    
   	    
   	    
   	    /*
   	    var me = this;
    	
    	me.formEstSig = Ext.create('pxp.view.vobowfwzd.FormEstSigWzd',{
			id_proceso_wf: me.getVobowfdetailwzd().getId_proceso_wf(),
 	        id_estado_wf: me.getVobowfdetailwzd().getId_estado_wf()
		});
	   
	    Ext.Viewport.add(me.formEstSig);
    	
    	me.formEstSig.show();*/
    	
   },
    
   onListTap:function(lista, index, target, record, e, eOpts){
   	
   	     if(!record){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	pxp.app.showMask();
    	
    	var me = this,
    	    params = {
                id_estado_wf:  record.data.id_estado_wf
              
              };
   	
   	
     	me.getVobowflistwzd().hide();
     	me.getVobowfdetailwzd().show();
     	me.getVobowfdetailwzd().setId_proceso_wf(record.data.id_proceso_wf);
     	me.getVobowfdetailwzd().setId_estado_wf(record.data.id_estado_wf);
     	
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
		           me.getVobowfdetailwzd().down('#detailvobo').setHtml(Response.ROOT.datos.plantilla_correo)
		            
		           
		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
                    
                }
        });
     	
     	
   	
   },
   
   onBackVoBo:function(){
   	  	this.getVobowflistwzd().show();
     	this.getVobowfdetailwzd().hide();
   },
   
   onHideFormWzd: function(){
   	    this.getFormestsigwzd().hide();
   	    this.getVobowfdetailwzd().show();
   },
   
   
   //retrocede estado de work flow
   onBackStateDone:function(formBackState){
   	   
   	   var values = formBackState.down('formpanel').getValues(),
   	       model = Ext.ModelMgr.create(values,'Obs'),
   	       errors = model.validate(),message="";
       
		 if(errors.isValid()){
		   	
		   	  
		    	var me = this,
		    	    params = {
		                id_proceso_wf: formBackState.getId_proceso_wf(),
		                id_estado_wf: formBackState.getId_estado_wf(),
		                operacion: "cambiar",
		                obs: values.obs,
		                mobile: 'si'
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
				           	  me.getVobowflistwzd().show();
     	                      me.getVobowfdetailwzd().hide();
     	                      me.getVobowflistwzd().down('list').getStore().load();
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
                        message += rec._message+"<br>";
                    });
                    
                    
                    Ext.Msg.alert("Validate", message, function(){});
                    return false;
             }
   	
   },
   
   onNextStateDone:function(formNextState){
   	   var me = this,
   	       values = formNextState.down('formpanel').getValues(),
   	       model = Ext.ModelMgr.create(values,'Obs'),
   	       errors = model.validate(),message="";
         
         
         
		 if(errors.isValid()){
		   	
		   	  var params = {
		                id_proceso_wf_act: formNextState.getId_proceso_wf(),
		                id_estado_wf_act: formNextState.getId_estado_wf(),
		                id_tipo_estado: values.id_tipo_estado,
		                id_funcionario_wf: values.id_funcionario,
		                id_depto_wf: values.id_depto,
		                json_procesos:'[]', 
		                obs: values.obs,
		                mobile: 'si'
		            };
		            
		        pxp.app.showMask();
		    	Ext.Ajax.request({
				        
				        withCredentials: true,
	                    useDefaultXhrHeader: false,
			            url: pxp.apiRest._url('workflow/ProcesoWf/siguienteEstadoProcesoWf'),
			            params: params,
				        method: 'POST',
				        scope: me,
				        success: function(resp){
				           var Response = Ext.JSON.decode(resp.responseText);
				           pxp.app.hideMask();
				           if(!Response.ROOT.error){
				           	  me.getVobowflistwzd().show();
     	                      me.getVobowfdetailwzd().hide();
     	                      me.getVobowflistwzd().down('list').getStore().load();
     	                      formNextState.hide();
     	                      
				           }
				           else{
				           	  Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
				           }
				        },
				        failure:function(resp){
		                    pxp.app.hideMask();
		                    var Response = Ext.JSON.decode(resp.responseText);
		                    
		                    Ext.Msg.alert('Info...', Response.ROOT.detalle.mensaje, Ext.emptyFn);
		                    
		                }
		        });
     	
     	}
     	else {
                    Ext.each(errors.items,function(rec,i){
                        message += rec._message+"<br>";
                    });
                    
                    Ext.Msg.alert("Validate", message, function(){});
                    return false;
             }
   	
   }
   
   
});
