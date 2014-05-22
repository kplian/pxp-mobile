Ext.define('PXP.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
    	models: [
            'PXP.model.UserInterface'
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
        
        alert(password)
        var pass =md5(password);
        var _prefix = this.uniqid('pxp');
        console.log(_prefix)
        var _pass =  Base64.encode(mcrypt.Encrypt(_prefix + '$$' +pass,undefined,pass,'rijndael-256','ecb'));

        Ext.Ajax.request({
            url: '../pxp/lib/rest/seguridad/Auten/verificarCredenciales',
            method: 'post',
            params: {
                usuario: username,
                contrasena: _pass
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    me.signInSuccess(); 
                    
                    PXP.app.cookie.set('register_key',register_key);
                    
                    
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
        
        //mainMenuView = this.getMainMenuView();
        
        loginView.setMasked(false);

        //load menu
        if(!this.mainMenu){
	        if(Ext.os.is.Phone){
	        	this.mainMenu = Ext.create ('PXP.view.phone.Main');
	        } 
	        else{
	        	this.mainMenu = Ext.create ('PXP.view.tablet.Main');
	        }
	    }
        Ext.Viewport.animateActiveItem(this.mainMenu, this.getSlideLeftTransition());
        
        //Ext.getStore('UserInterface').getProxy().setExtraParams({id_user:'test'});
        //Ext.getStore('UserInterface').load();
        
        
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
	},
	
	uniqid: function (prefix, more_entropy) {
	  //  discuss at: http://phpjs.org/functions/uniqid/
	  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  //  revised by: Kankrelune (http://www.webfaktory.info/)
	  //        note: Uses an internal counter (in php_js global) to avoid collision
	  //        test: skip
	  //   example 1: uniqid();
	  //   returns 1: 'a30285b160c14'
	  //   example 2: uniqid('foo');
	  //   returns 2: 'fooa30285b1cd361'
	  //   example 3: uniqid('bar', true);
	  //   returns 3: 'bara20285b23dfd1.31879087'
	
	  if (typeof prefix === 'undefined') {
	    prefix = '';
	  }
	
	  var retId;
	  var formatSeed = function(seed, reqWidth) {
	    seed = parseInt(seed, 10)
	      .toString(16); // to hex str
	    if (reqWidth < seed.length) { // so long we split
	      return seed.slice(seed.length - reqWidth);
	    }
	    if (reqWidth > seed.length) { // so short we pad
	      return Array(1 + (reqWidth - seed.length))
	        .join('0') + seed;
	    }
	    return seed;
	  };
	
	  // BEGIN REDUNDANT
	  if (!this.php_js) {
	    this.php_js = {};
	  }
	  // END REDUNDANT
	  if (!this.php_js.uniqidSeed) { // init seed with big random int
	    this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
	  }
	  this.php_js.uniqidSeed++;
	
	  retId = prefix; // start with prefix, add current milliseconds hex string
	  retId += formatSeed(parseInt(new Date()
	    .getTime() / 1000, 10), 8);
	  retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
	  if (more_entropy) {
	    // for more entropy we add a float lower to 10
	    retId += (Math.random() * 10)
	      .toFixed(8)
	      .toString();
	  }
	
	  return retId;
	}
    
    
});