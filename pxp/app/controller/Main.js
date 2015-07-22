/**
 * @class PXP.controller.Main
 * @extends Ext.app.Controller
 *
  */
Ext.define('pxp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
        	nav: 'mainmenuview',
        	navTest: '#maincontainerid',
        	mainView: 'main',
        	navigation: 'navigation'
        },

        control: {
            sourceButton: {
                tap: 'onSourceTap'
            },
            nav: {
                //itemtap: 'onNavTap',
                onOpenHandler: 'onOpenHandler'
               
            }
            
            
        },

        routes: {
            'demo/:id': 'showViewById',
            'menu/:id': 'showMenuById'
        },

        /**
         * @cfg {Ext.data.Model} currentDemo The Demo that is currently loaded. This is set whenever showViewById
         * is called and used by functions like onSourceTap to fetch the source code for the current demo.
         */
        currentDemo: undefined
    },
    
    onOpenHandler: function(DataView,index,target,record,e,eOpts)//nestedList, list, index) 
    {
    	this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: 'menu/' + record.get('id_gui')
        }));
        //set title bar
        this.getNavigation().down('#mainTitleBar').setTitle(record.data.desc_mobile);
        
        
    },
    
    
    

    /**
     * Finds a given view by ID and shows it. End-point of the "demo/:id" route
     */
    showViewById: function (id) {
    	
    	alert('showMenuById')
        
        
    },

    /**
     * Shows the source code for the {@link #currentDemo} in an overlay
     */
    onSourceTap: function () {
    	alert('overlay')
        var overlay = this.getSourceOverlay(),
            demo = this.getCurrentDemo();

        if (!overlay.getParent()) {
            Ext.Viewport.add(overlay);
        }

        overlay.show();

        overlay.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        if (demo) {
            Ext.Ajax.request({
                url: 'app/view/' + (demo.get('view') || demo.get('text')) + '.js',

                callback: function (request, success, response) {
                    overlay.setHtml(response.responseText);

                    setTimeout(function() {
                        overlay.unmask();
                    }, 500);
                }
            });
        }
    },

    /**
     * @private
     * In the kitchen sink we have a large number of dynamic views. If we were to keep all of them rendered
     * we'd risk causing the browser to run out of memory, especially on older devices. If we destroy them as
     * soon as we're done with them, the app can appear sluggish. Instead, we keep a small number of rendered
     * views in a viewCache so that we can easily reuse recently used views while destroying those we haven't
     * used in a while.
     * @param {String} name The full class name of the view to create (e.g. "Kitchensink.view.Forms")
     * @return {Ext.Component} The component, which may be from the cache
     */
    createView: function (item) {
        var name = this.getViewName(item),
            cache = this.getViewCache(),
            ln = cache.length,
            limit = item.get('limit') || 20,
            view, i = 0, j, oldView;

        for (; i < ln; i++) {
            if (cache[i].viewName === name) {
                return cache[i];
            }
        }

        if (ln >= limit) {
            for (i = 0, j = 0; i < ln; i++) {
                oldView = cache[i];
                if (!oldView.isPainted()) {
                    oldView.destroy();
                } else {
                    cache[j++] = oldView;
                }
            }
            cache.length = j;
        }

        view = Ext.create(name);
        view.viewName = name;
        cache.push(view);
        this.setViewCache(cache);

        return view;
    },

    /**
     * @private
     * Returns the full class name of the view to construct for a given Demo
     * @param {Kitchensink.model.Demo} item The demo
     * @return {String} The full class name of the view
     */
    getViewName: function (item) {
    	 var name = item.get('codigo_mobile'),
            ns = pxp.app.name+'.view.';
       console.log(ns + name)
       return ns + name;
        
    },

    /**
     * we iterate over all of the floating sheet components and make sure they're hidden when we
     * navigate to a new view. This stops things like Picker overlays staying visible when you hit
     * the browser's back button
     */
    hideSheets: function () {
        Ext.Viewport.hideMenu('left');
    },
    
    //exttras..........
    showMenuById: function(id){
    	var nav  = this.getNav(),
            store = pxp.app.storeMenu,
            item;
            if(store){
            	item = store.getById(id);
            }
            
       if (item) {
            this.showView(item);
            this.hideSheets();
        }
    	
    	
    },
    
   showView: function(item) {
   	    var nav  = this.getNav(),
            view = this.createView(item),
            main = this.getNavTest(),
            newAnim;
        
        main.setActiveItem(view);
        nav.getActiveItem().select(item);
        
        
    }
   
});
