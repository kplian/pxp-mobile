<?php 
session_start();
session_set_cookie_params (0,'/', '' ,true ,true);
if ($_SERVER['SERVER_PORT']!='443') { 
    // Fuerza SSL en esta página 
    header("Location:https://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']); 
}
?><!DOCTYPE HTML>
<html manifest="" lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>pxp</title>
    <style type="text/css">
         /**
         * Example of an initial loading indicator.
         * It is recommended to keep this as minimal as possible to provide instant feedback
         * while other resources are still being loaded for the first time
         */
        html, body {
            height: 100%;
            background-color: #1985D0
        }

        #appLoadingIndicator {
            position: absolute;
            top: 50%;
            margin-top: -15px;
            text-align: center;
            width: 100%;
            height: 30px;
            -webkit-animation-name: appLoadingIndicator;
            -webkit-animation-duration: 0.5s;
            -webkit-animation-iteration-count: infinite;
            -webkit-animation-direction: linear;
        }

        #appLoadingIndicator > * {
            background-color: #FFFFFF;
            display: inline-block;
            height: 30px;
            -webkit-border-radius: 15px;
            margin: 0 5px;
            width: 30px;
            opacity: 0.8;
        }

        @-webkit-keyframes appLoadingIndicator{
            0% {
                opacity: 0.8
            }
            50% {
                opacity: 0
            }
            100% {
                opacity: 0.8
            }
        }
    </style>
    <!-- The line below must be kept intact for Sencha Command to build your application -->
    <script type="text/javascript">(function(e){var c=e.document.head||e.document.getElementsByTagName("head")[0],b=e.Ext;if(typeof b=="undefined"){e.Ext=b={}}function d(f){document.write(f)}function a(f,g){var h=document.createElement("meta");h.setAttribute("name",f);h.setAttribute("content",g);c.appendChild(h)}b.blink=function(q){var k=q.js||[],o=q.css||[],m,n,p,h,l,g;if(navigator.userAgent.match(/IEMobile\/10\.0/)){var j=document.createElement("style");j.appendChild(document.createTextNode("@media screen and (orientation: portrait) {@-ms-viewport {width: 320px !important;}}@media screen and (orientation: landscape) {@-ms-viewport {width: 560px !important;}}"));document.getElementsByTagName("head")[0].appendChild(j)}a("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");a("apple-mobile-web-app-capable","yes");a("apple-touch-fullscreen","yes");b.microloaded=true;var f=window.Ext.filterPlatform=function(u){var D=false,s=navigator.userAgent,w,A;u=[].concat(u);function z(E){var i=/Mobile(\/|\s)/.test(E);return/(iPhone|iPod)/.test(E)||(!/(Silk)/.test(E)&&(/(Android)/.test(E)&&(/(Android 2)/.test(E)||i)))||(/(BlackBerry|BB)/.test(E)&&i)||/(Windows Phone)/.test(E)}function y(i){return !z(i)&&(/iPad/.test(i)||/Android|Silk/.test(i)||/(RIM Tablet OS)/.test(i)||(/MSIE 10/.test(i)&&/; Touch/.test(i)))}var r=window.location.search.substr(1),t=r.split("&"),v={},B,x;for(x=0;x<t.length;x++){var C=t[x].split("=");v[C[0]]=C[1]}B=v.platform;if(B){return u.indexOf(B)!=-1}for(w=0,A=u.length;w<A;w++){switch(u[w]){case"phone":D=z(s);break;case"tablet":D=y(s);break;case"desktop":D=!z(s)&&!y(s);break;case"ios":D=/(iPad|iPhone|iPod)/.test(s);break;case"android":D=/(Android|Silk)/.test(s);break;case"blackberry":D=/(BlackBerry|BB)/.test(s);break;case"safari":D=/Safari/.test(s)&&!(/(BlackBerry|BB)/.test(s));break;case"chrome":D=/Chrome/.test(s);break;case"ie10":D=/MSIE 10/.test(s);break;case"windows":D=/MSIE 10/.test(s)||/Trident/.test(s);break;case"tizen":D=/Tizen/.test(s);break;case"firefox":D=/Firefox/.test(s)}if(D){return true}}return false};for(m=0,n=o.length;m<n;m++){p=o[m];if(typeof p!="string"){h=p.platform;g=p.exclude;l=p.theme;p=p.path}if(h){if(!f(h)||f(g)){continue}if(!b.theme){b.theme={}}if(!b.theme.name){b.theme.name=l||"Default"}}d('<link rel="stylesheet" href="'+p+'">')}for(m=0,n=k.length;m<n;m++){p=k[m];if(typeof p!="string"){h=p.platform;g=p.exclude;p=p.path}if(h){if(!f(h)||f(g)){continue}}d('<script src="'+p+'"><\/script>')}}})(this);Ext.blink({id:"30068a0f-9c09-43a3-873e-dba37e0be18d",js:[{path:"resources/js/base64.js",update:"full"},{path:"resources/js/Serpent.js",update:"full"},{path:"resources/js/rijndael.js",update:"full"},{path:"resources/js/mcrypt.js",update:"full"},{path:"resources/js/utf8.js",update:"full"},{path:"resources/js/md5.js",update:"full"},{path:"app.js",update:"delta"}],css:[{path:"resources/css/app.css",update:"delta"},{path:"resources/css/slidenav.css",update:"full"}]});</script>
</head>
<body>
    <div id="appLoadingIndicator">
        <div></div>
        <div></div>
        <div></div>
    </div>
</body>
</html>
