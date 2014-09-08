/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.VoBoFondo', {
    extend: 'Ext.app.Controller',
    config: {
    	profile: Ext.os.deviceType.toLowerCase(),
        models: [
            'pxp.model.VoBoFondo'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            vobofondolist: 'vobofondolist',
            formfondoestant:'formfondoestant',
            formfondoestsig:'formfondoestsig',
            vobowfondobar:'vobofondotbar'
        },

        control: {
            'vobofondolist list': {
               // select: 'onListTap',
               // itemtap: 'onListTap'
            },
            'vobofondolist': {
               'checkMessages': 'checkMessages'
            },
            
            'vobofondolist #backstatefondo':{
            	tap:'onBackState'
            	
            },
            'vobofondolist #nextstatefondo':{
            	tap:'onNextState'
            	
            },
            'formfondoestant':{
            	'onBackStateDone':'onChangeStateDone'
            },
            'vobofondotbar #refreshvobo':{
            	tap:'onVoBoRefresh'
            },
            'formfondoestsig':{
            	'onNextStateDone':'onChangeStateDone'
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
   	        meparams = {start:0,limit:1};
   	        
   	    Ext.Ajax.request({
		        //headers: pxp.apiRest.genHeaders(),
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('tesoreria/CuentaDocumentadaEndesis/contarFondoAvance'),
		        params: meparams,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		              
		              var Response = Ext.JSON.decode(resp.responseText);
		              console.log('...  ',Response);
		              setTimeout((function(){me.checkMessages()}), _CONFIG._time_period);
		              var totalCount = me.getVobofondolist().down('list').getStore().getTotalCount();
		              console.log('...  ',Response.total,totalCount);
		              if(Response.total > totalCount){
		           	      me.getVobofondolist().down('list').getStore().load();
		           	      me.getVobofondolist().down('audio').toggle();
                          audio.toggle();
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
   	   me.getVobofondolist().down('list').getStore().load();
   	
   },
    
   onBackState:function(){
   	
   	    var me = this,
   	        seltected = this.getVobofondolist().down('list').getSelection();
    	
    	if(seltected.length == 0){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	me.formEstAnt = Ext.create('pxp.view.vobofondo.FormFondoEstAnt',{
			id_cuenta_doc: seltected[0].data.id_cuenta_doc
		});
	   
	    Ext.Viewport.add(me.formEstAnt);
    	me.formEstAnt.show();
    	
   }, 
   
   onNextState:function(){
   	
   	    var me = this,
   	        seltected = this.getVobofondolist().down('list').getSelection();
   	    
   	    
   	   if(seltected.length == 0){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	me.formEst = Ext.create('pxp.view.vobofondo.FormFondoEstSig',{
			id_cuenta_doc: seltected[0].data.id_cuenta_doc
		});
	   
	    Ext.Viewport.add(me.formEst);
    	
    	me.formEst.show();
    	
   },
    
 
   
   onChangeStateDone:function(formNextState,accion){
   	   
   	   var values = formNextState.down('formpanel').getValues(),
   	       model = Ext.ModelMgr.create(values,'Obs'),
   	       errors = model.validate(),message="";
       
		 if(errors.isValid()){
		   	
		   	  
		    	var me = this,
		    	    params = {
		                id_cuenta_documentada: formNextState.getId_cuenta_doc(),
		                accion:accion,
		                mensaje:values.obs
		            };
		            
		            
		   	    pxp.app.showMask();
		    	Ext.Ajax.request({
				        
				        withCredentials: true,
	                    useDefaultXhrHeader: false,
			            url: pxp.apiRest._url('tesoreria/CuentaDocumentadaEndesis/aprobarFondoAvanceCorreo '),
				        params: params,
				        method: 'POST',
				        scope: me,
				        success: function(resp){
				           var Response = Ext.JSON.decode(resp.responseText);
				           pxp.app.hideMask();
				           me.getVobofondolist().down('list').getStore().load();
     	                   formNextState.hide();
     	                   
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
   	
   }
   
   
});
