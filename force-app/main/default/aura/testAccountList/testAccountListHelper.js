({
    getAccounts : function(component, event,funcCtrl) {
        // Apex
        var action = component.get("c.getAccounts");
        action.setCallback(this, funcCtrl);
        $A.enqueueAction(action);
    }

})