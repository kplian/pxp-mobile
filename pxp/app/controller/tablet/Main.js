/**
 * @class PXP.controller.tablet.Main
 * @extends PXP.controller.Main
 *
 * This is the Main controller subclass for the 'tablet' profile. Almost all of the functionality is implemented in the
 * superclass, here we just define showView, which is the function that is called whenever any view is navigated to via
 * the navigation NestedList or a url change.
 */
Ext.define('pxp.controller.tablet.Main', {
    extend: 'pxp.controller.Main',
     config: {
        

        control: {
            nav: {
                back: 'onBackTap'
            }
        }
    },
    
    
   /* onOpenHandler: function(DataView,index,target,record,e,eOpts)//nestedList, list, index) 
    {
    	alert('onOpenHandler')
    	
       
       this.redirectTo(record);
        
    },*/

    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavTap: function(nestedList, list, index) {
    	alert('onNavTap')
        var record = list.getStore().getAt(index);

        if (record.isLeaf()) {
            this.redirectTo(record);
        }
    },

    /**
     * For a given Demo model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'demo/:id', so is called automatically whenever the user navigates back or forward between demos.
     * @param {Kitchensink.model.Demo} item The Demo model instance for which we want to show a view
     */
    showView: function(item) {
    	alert('tablet ..')
        var nav  = this.getNav(),
            view = this.createView(item),
            main = this.getMain(),
            anim = item.get('animation'),
            layout  = main.getLayout(),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }

        nav.setDetailContainer(main);
        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);
        nav.getActiveItem().select(item);

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim);
            }, this, { single: true });
        }

        this.getToolbar().setTitle(item.get('text'));
        this.getSourceButton().setHidden(false);

    },

    showMenuById: Ext.emptyFn
});