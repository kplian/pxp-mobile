/**
 * @author RAC
 * @date:  25/03/2014
 * Description: Login for Mobile
 */
Ext.define('pxp.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
   
    requires: [ 'Ext.form.FieldSet', 
			    'Ext.form.Password', 
			    'Ext.Label', 
			    'Ext.Img', 
			    'Ext.util.DelayedTask'],
    config: {
        title: 'Login',
        itemId:'loginviewid',
        //style: 'background-color:#FFFFFF',
        //ui: 'whait',
        enableSubmissionForm:false,
        items: [
            {
                xtype: 'image',
                src: 'resources/img/logo.png',
                style: 'width:150px;height:81px;margin:auto' 
            },
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
            {
                xtype: 'fieldset',
                title: 'Login',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        id:'userNameTextField',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                    },
                    {
		                    xtype: 'checkboxfield',
		                    hideEmptyLabel: false,
		                    label: 'Keep me logged in',
		                    checked: true,
		                    name: 'remember',
		                    itemId: 'remember'
		             }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log In'
            }
         ],
         
        listeners: [
        	 {
	            delegate: '#logInButton',
	            event: 'tap',
	            fn: 'onLogInButtonTap'
			 }
		]
    },
    
    
    onLogInButtonTap: function () {
        var me = this,
	        usernameField = me.down('#userNameTextField'),
	        passwordField = me.down('#passwordTextField'),
	        rememberField = me.down('#remember'), 
	       
	        label = me.down('#signInFailedLabel'),
	        username = usernameField.getValue(),
	        password = passwordField.getValue(),
	        remember = rememberField.isChecked();
        
        
        label.hide();
        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next  .
        var task = Ext.create('Ext.util.DelayedTask', function () {
           label.setHtml('');
           me.fireEvent('signInCommand', me, username, password, remember);
           
        });
        task.delay(500);
    },
   
    
    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    },
    
    initialize: function() {
    	var me = this;
    	
    	setTimeout(function(){
    		var username = pxp.app.cookie.get('username'),
    		    password = pxp.app.cookie.get('password'),
    		    remember = pxp.app.cookie.get('remember');
	        
	        
	        pxp.app.checkMenu = true;
	        
	        usernameField = me.down('#userNameTextField');
	        passwordField = me.down('#passwordTextField');
	        rememberField = me.down('#remember');
	        
	        label = me.down('#signInFailedLabel');
	        
	        if(passwordField){
	            passwordField.setValue(password);
	        }
	        
	        if(usernameField){
	            usernameField.setValue(username);
	        }
	        
	        if(rememberField){
	        	if(remember){
		        	rememberField.check();
		        }	
		        else{
		        	rememberField.uncheck();
		        }   
	        } 
	        
	        me.onLogInButtonTap();       

       }, 300);
       
       me.callParent(arguments);    	
    }
    
});