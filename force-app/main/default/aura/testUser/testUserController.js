({
    init: function(component, event, helper) {
        // 取引先の初期値取得
        // Account ID
        // 
        var querystring = event.getParam("id");
            console.log("querystring >>"+querystring);

        var accountId = component.get("v.recordId");

        helper.getAccountInfo(component, event, accountId ,function(data) {
            component.set("v.account", data.getReturnValue());
            console.log("account.Name >>"+component.get("v.account.Name"));
        });
        // 取引先責任者の初期値取得
        // helper.getContactInfo(component, event);
        // 
        console.log("accountId >> " + accountId);
  　}
})