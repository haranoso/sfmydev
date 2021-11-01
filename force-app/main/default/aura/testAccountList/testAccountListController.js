({
    init: function(component, event, helper) {
        console.log("ctrl:init");
        // 取引先の初期値取得
        // Account ID
        helper.getAccounts(component, event,function(data) {
            component.set("v.accounts", data.getReturnValue());
        });
  　},

    showContacts : function(component, event, helper){
        var accountId = event.target.parentNode.id;
        console.log("ctrl:"+accountId);
		component.set("v.accountID",accountId);
        var appEvent = $A.get("e.c:testAccountsEvent");
        appEvent.setParams({ "accountID" : accountId });
        appEvent.fire();
    },
    catchSomething : function(component, event, helper) {
        var accountId = event.getParam("accountID");
        
        console.log("catch:accountId:"+accountId);
        console.log("catch:v.accountID:"+component.get("v.accountID"));
    }

})