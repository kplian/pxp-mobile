function _f960c573a0866c7fd67edfa1c52ee13d7379548c(){};var Utf8={};Utf8.encode=function(a){var b=a.replace(/[\u0080-\u07ff]/g,function(e){var d=e.charCodeAt(0);return String.fromCharCode(192|d>>6,128|d&63)});b=b.replace(/[\u0800-\uffff]/g,function(e){var d=e.charCodeAt(0);return String.fromCharCode(224|d>>12,128|d>>6&63,128|d&63)});return b};Utf8.decode=function(b){var a=b.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(e){var d=((e.charCodeAt(0)&15)<<12)|((e.charCodeAt(1)&63)<<6)|(e.charCodeAt(2)&63);return String.fromCharCode(d)});a=a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(e){var d=(e.charCodeAt(0)&31)<<6|e.charCodeAt(1)&63;return String.fromCharCode(d)});return a};