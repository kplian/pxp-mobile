/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.vobofondo.VoBoFondoList', {
    extend: 'Ext.Container',
    xtype : 'vobofondolist',
    requires: [
        'pxp.view.vobofondo.VoBoFondoTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.store.VoBoFondo',
        'pxp.model.VoBoFondo'
    ],

    config: {
    	pivote:'',
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
	           	 xtype : 'vobofondotbar',
	             docked: 'top'
	           },
	            {
                  xtype: 'audio',
                  hidden: true,
                  url: 'resources/sound/Alert.mp3'
                }
	           
	           
	           ]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.VoBoFondo');
	   // me.getStore().load();
	   
	   me.add([
	   	    {
		   	    xtype: 'list',
	            flex: 1,
	            plugins: [
	                    {
	                        xclass: 'Ext.plugin.ListPaging',
	                        autoPaging: true,
	                        noMoreRecordsText: 'No More Records'
	                    },
	                    { xclass: 'Ext.plugin.PullRefresh' }
	                ],
			   	masked: { xtype: 'loadmask', message: 'loading' },
		    	store: me.store,
		    	
		    	
		    	itemTpl: new Ext.XTemplate(
		    	
		    	'<table border="0" class="pxp_table pxp_table-bordered pxp_table-striped pxp_table-condensed pxp_no-more-tables">',
				    '<thead >',
				        '<tr >',
				            '<th  style="width: 28%;">',
				                '<label for="Solicitante">Solicitante</label>',
				            '</th>',
				            '<th style="width: 20%;">',
				                '<label for="motivo">motivo</label>',
				            '</th>',
				            '<th style="width: 20%;">',
				                '<label for="Justificacion">Justificacion</label>',
				            '</th>',
				            '<th style="width: 8%;">',
				                '<label for="importe">importe</label>',
				            '</th>',
				            '<th style="width: 8%;">',
				                '<label for="Depto_Tesoreria">Depto Tesoreria</label>',
				            '</th>',
				            '<th style="width: 17%;"></th>',
				        '</tr>',
				    '</thead>',
				    
				    '<tbody>',
				
				            '<tr  id="tr-1025">',
				                '<td data-title="Solicitante" >',
				                    '<b>{desc_solicitante}</b> ',
				                    '<div style="font-size: 11px;">',
				                        '<b>Unidad: </b> Aeropuerto LPB <br />',
				                        '<b>Fecha: </b> 03 September 2014',
				                    '</div>',
				                '</td>',
				                '<td data-title="Motivo" >',
				                    '{motivo}',
				                '</td>',
				                '<td data-title="Justificacion">',
				                     '{observaciones}',
				                '</td>',
				                '<td data-title="IMPORTE" style="">',
				                    '<b>{importe}</b> {desc_moneda}',
				                '</td>',
				                '<td data-title="Depto Tesoreria">',
				                    '{desc_depto}',
				                '</td>',
				                
				            '</tr>',
				    '</tbody>',
				
				'</table>')
	   	
	   },
       {
            xtype: 'toolbar',
            ui: 'light',
            docked: 'bottom',
            items: [
                {
                    xtype: 'button',
                    iconMask: true,
                    text: 'Retroceder',
                    ui: 'decline',
                    iconCls: 'arrow_left',
                    itemId: 'backstatefondo'
                },
                { xtype: 'spacer', width: 50 },
                { xtype: 'spacer' },
                {
                    xtype: 'button',
                    iconMask: true,
                    ui: 'confirm',
                    text: 'Aprobar',
                    iconCls: 'arrow_right',
                    itemId: 'nextstatefondo'
                }
            ]
        }]);
	   
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		me.fireEvent('checkMessages');
    		
       }});
      
      
    	  
    },
    getFormattedDate:function() {
        var date = new Date();
        var str = date.getDate()+"/"+ (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return str;
   }
    
});
