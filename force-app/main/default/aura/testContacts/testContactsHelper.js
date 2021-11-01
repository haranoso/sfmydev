({
    getContacts : function(component, event,accountID,funcCtrl) {
        
        console.log("getContacts:"+accountID);
        
        // Apex
        var action = component.get("c.getContacts");
        action.setParams({"accountID":accountID});
        action.setCallback(this, funcCtrl);
        $A.enqueueAction(action);
    }
})