<?php
include 'PxpRestClient.php';
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
session_start();
session_set_cookie_params (0,'/', '' ,false ,false);
include 'config.php';
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim(array(
    'log.level' => \Slim\Log::EMERGENCY,
    'debug' => false
));
$app->response->headers->set('Content-Type', 'application/json');
$headers = $app->request->headers;
header('Access-Control-Allow-Origin: ' . $headers['Origin']);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: pxp-user, content-type, Php-Auth-User, Php-Auth-Pw');
header('Access-Control-Allow-Credentials: true');	
header('Access-Control-Max-Age: 1728000');

 // get route

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

$app->get(
	 
    '/:sistema/:clase_control/:metodo',
    function ($sistema,$clase_control,$metodo) use ($app) {
    	$headers = $app->request->headers;	
		$cookies = $app->request->cookies;
		
		//var_dump($app->request->cookies);
    	if ( isset($cookies['PHPSESSID'])) {
			 if(isset($_SESSION["_SESION_REST"])){
			     $resp = $_SESSION["_SESION_REST"]->doGet("$sistema/$clase_control/$metodo" ,$_GET );
                 echo $resp;
                 exit;            
			 }
             else{
                 //error por no mandar credenciales en los headers
                 echo "{success:false,                
                        mensaje_tec:'El objeto se encuentra inactivo',
                        mensaje:'El objeto se encuentra inactivo'}";    
                    exit;
                 
             }
              
           } 
        else {
			//error por no mandar credenciales en los headers
            echo "{success:false,                
                mensaje_tec:'No tiene una sesion activa',
                mensaje:'No tiene una sesion activa'}";    
            exit;
		}
    }
); 

$app->post(
	 
    '/seguridad/Auten/verificarCredenciales',
    function () use ($app) {    	
    	$headers = $app->request->headers;
		if (isset($headers['Php-Auth-User'])) {
    		    						
    		$_SESSION["_SESION_REST"] = PxpRestClient::connect($_SESSION["_HOST"],$_SESSION["_URL_BASE"]);
    		$_SESSION["_SESION_REST"]->addHeader("Php-Auth-User: ".$headers['Php-Auth-User']);
    		$_SESSION["_SESION_REST"]->addHeader("Pxp-user: ".$headers['Pxp-user']);
    		//echo "xxxx";
    		$resp = $_SESSION["_SESION_REST"]->doPost('seguridad/Auten/verificarCredenciales',array("_dc"=>'1406749352192'));
            session_regenerate_id();
            echo $resp;    
            exit;
            		
		} else {
		    //error por no mandar credenciales en los headers
		    echo "{success:false,                
                mensaje_tec:'error por no mandar credenciales en los headers',
                mensaje:'error por no mandar credenciales en los headers'}";    
            exit;
		}
		
		
		
				
    }
); 


$app->post(
     
    '/seguridad/Auten/cerrarSesion',
    function () use ($app) {        
        $headers = $app->request->headers;
        if (isset($headers['Php-Auth-User'])) {
                                        
            $resp = $_SESSION["_SESION_REST"]->doGet("/seguridad/Auten/cerrarSesion" ,$_GET );
            session_unset();
            session_destroy(); // destruyo la sesion 
            header("Location: /"); 
            echo "{success:true}";
            exit;
                    
        } else {
            //error por no mandar credenciales en los headers
            echo "{success:false,                
                mensaje_tec:'error all cerrar la sesion',
                mensaje:'error all cerrar la sesion'}";    
            exit;
        }
    }
); 

$app->post(
	 
    '/:sistema/:clase_control/:metodo',
    function ($sistema,$clase_control,$metodo) use ($app) {    		
    	$headers = $app->request->headers;	
		$cookies = $app->request->cookies;
		//var_dump($app->request->cookies);
        if ( isset($cookies['PHPSESSID']) && isset($_SESSION["_SESION_REST"])) {
            
              $resp = $_SESSION["_SESION_REST"]->doPost("$sistema/$clase_control/$metodo" ,$_POST );
              echo $resp;
              exit;
           } 
        else {
            //error por no mandar credenciales en los headers
            echo "{success:false,                
                mensaje_tec:'error por no mandar credenciales en los headers',
                mensaje:'error por no mandar credenciales en los headers'}";    
            exit;
        }
    }
); 

$app->options('/:sistema/:clase_control/:metodo', function ($sistema,$clase_control,$metodo) use ($app) {
	$headers = $app->request->headers;
	
    header('Access-Control-Allow-Origin: ' . $headers['Origin']);
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	header('Access-Control-Allow-Headers: pxp-user, content-type, Php-Auth-User, Php-Auth-Pw');
	header('Access-Control-Allow-Credentials: true');	
	header('Access-Control-Max-Age: 1728000');

});

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();