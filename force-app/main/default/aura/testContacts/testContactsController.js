({
    onAccountChange: function(component, event, helper) {
        console.log("onAccountChange:"+component.get("v.accountID"));
        // 取引先責任者の初期値取得
        helper.getContacts(component, event,component.get("v.accountID") ,function(data) {
            component.set("v.contacts", data.getReturnValue());
        });
  　}
    
})