Ext.define('pxp.controller.Login', {
    extend: 'Ext.app.Controller',
   
    config: {
    	
    	models: [
            'pxp.model.UserInterface'
        ],
        stores: [
            'pxp.store.UserInterface'
        ],
    	
        refs: {
            loginView: 'loginview',
            mainView: 'main',
            navigationView : 'navigation',
            mainMenuView:'mainmenuview', 
			navBtn : 'button[name="nav_btn"]'
            
          
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand',
                reguestKey: 'onReguestKey'
            },
            
            mainView:{
            	 onSignOffCommand: 'onSignOffCommand'
            },
            navBtn : {
				
				tap : 'toggleNav'
		   
		    },
		    mainMenuView : {
						onOpenHandler : function(list, index, target, record){
							this.toggleNav();
						}
		    }
			
		   
   
        }
    },

    // Session token

    sessionToken: null,

    // Transitions
    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    onSignInCommand: function (view, username, password,remember) {

        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });
         
         pxp.apiRest.setCredentialsPxp(username,md5(password))
         var headers = pxp.apiRest.genHeaders()
         var pass = pxp.apiRest._pass
         console.log(headers);
         
         //Ext.Ajax.setUseDefaultXhrHeader(false); 
         //Ext.Ajax.setDefaultPostHeader(headers);
          
         
         //Ext.data.JsonP.request({
         Ext.Ajax.request({
         	scope:this,  
            url: pxp.apiRest._url('seguridad/Auten/verificarCredenciales'),
            headers:headers,
            withCredentials: true,     
            useDefaultXhrHeader:false,
            //defaultHeaders:headers,
            method: 'post',
            params: {
                usuario: username,
                contrasena: pass
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    me.signInSuccess(); 
                    
                    //pxp.app.cookie.set('register_key',register_key);
                    if(remember){
                    	pxp.app.cookie.set('username',username);
                        pxp.app.cookie.set('password',password);
                        pxp.app.cookie.set('remember',true);
                    }else{
                    	pxp.app.cookie.set('username','');
                        pxp.app.cookie.set('password','');
                        pxp.app.cookie.set('remember',false);
                        
                        view.down('#userNameTextField').setValue('');
                        view.down('#passwordTextField').setValue('');
                     
                    }
                    
                    console.log('fin logincommand')
                    
                    
                } else {
                    me.signInFailure(loginResponse.message);
                    if(loginResponse.key){
                        view.down('#register_key').show();
                    }
                    
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            }
        });
    },

    signInSuccess: function () {
        console.log('signInSuccess');
        var loginView = this.getLoginView();
        loginView.setMasked(false);
        var headers = pxp.apiRest.genHeaders();
        console.log('headers',headers)
        
        pxp.app.storeMenu = Ext.create('pxp.store.UserInterface',{
	        	            
	        	           proxy: {
					          type: 'rest',
					          autoLoad: true,
	                          simpleSortMode: true,
					          url:pxp.apiRest._url('seguridad/Gui/listarMenuMobile'),
					          reader : {
						        type : 'json',
						        rootProperty : 'datos'
						         }
					       }
	        	           
	        	           
	        	       }); //store of menu
       

        //load menu
        if(!this.mainMenu){
	        this.mainMenu = Ext.create ('pxp.view.phone.Main');
	        
	    }
	    pxp.app.storeMenu.load()
	    
	    var mainMenuView = this.getMainMenuView();
        mainMenuView.down('list').setStore(pxp.app.storeMenu);
        Ext.Viewport.animateActiveItem(this.mainMenu, this.getSlideLeftTransition());
        
        
        
    },
    
    signInFailure: function (message) {
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    
    onSignOffCommand: function () {

        var me = this;
        Ext.Ajax.request({
            url: pxp.apiRest._url('seguridad/Auten/cerrarSesion'),
            withCredentials: true,
	        useDefaultXhrHeader: false,
            method: 'post',
            params: {
                sessionToken: me.sessionToken
            },
            success: function (response) {
            	 pxp.app.cookie.set('username','');
                 pxp.app.cookie.set('password','');
                 pxp.app.cookie.set('remember',false);
            	 location.reload();
               
            },
            failure: function (response) {

               Ext.Msg.alert('Info...', 'Error al cerrar sesion', Ext.emptyFn);
            }
        });

        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
    },   
    /**
	 * Toggle the slide navogation view
	 */
	toggleNav : function(){
		var me = this;
		if(me.getNavigationView()){
			mainEl = me.getNavigationView().element;
			if (mainEl.hasCls('out')) {  
				mainEl.removeCls('out').addCls('in'); 
				me.getNavigationView().setMasked(false);
			} else {
				mainEl.removeCls('in').addCls('out');  
				me.getNavigationView().setMasked(true);
			}
		}
	}
  
});