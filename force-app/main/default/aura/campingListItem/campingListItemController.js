({
    packItem : function(component, event, helper) {
        var btnClicked = event.getSource();         // the button
        btnClicked.set("v.disabled",true);
        
        var item = component.get("v.item");
        if (item != null){
            item.Packed__c = true;
	        component.set("v.item",item);
        }
    }
})