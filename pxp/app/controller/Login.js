Ext.define('pxp.controller.Login', {
    extend: 'Ext.app.Controller',
   
    config: {
    	
    	
    	models: [
            'pxp.model.UserInterface'
        ],
        stores: [
            'UserInterface'
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

    onSignInCommand: function (view, username, password) {

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
         Ext.Ajax.request({
            //Ext.data.JsonP.request({
            url: pxp.apiRest._url('pxp/lib/rest/seguridad/Auten/verificarCredenciales'),
            headers: headers,
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
        var loginView = this.getLoginView();
        
        //var mainMenuView = this.getMainMenuView();
        
        loginView.setMasked(false);

        //load menu
        if(!this.mainMenu){
	        if(Ext.os.is.Phone){
	        	this.mainMenu = Ext.create ('pxp.view.phone.Main');
	        } 
	        else{
	        	this.mainMenu = Ext.create ('pxp.view.tablet.Main');
	        }
	    }
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
            url: 'api/logout/',
            method: 'post',
            params: {
                sessionToken: me.sessionToken
            },
            success: function (response) {

                // TODO: You need to handle this condition.
            },
            failure: function (response) {

                // TODO: You need to handle this condition.
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