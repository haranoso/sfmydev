({
    getAccountInfo : function(component, event,accountId,funcCtrl) {
        // Apex
        var action = component.get("c.getAccount");
        action.setParams({
            "accountId": accountId
        });
        action.setCallback(this, funcCtrl);
        $A.enqueueAction(action);
    }
})