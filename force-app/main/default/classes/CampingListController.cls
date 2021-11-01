public class CampingListController {

    @auraEnabled
    Public static list<Camping_Item__c> getItems(){
        
        return [select Name, Quantity__c, Price__c, Packed__c from Camping_Item__c];
        
    }
    
    @auraEnabled
    Public static Camping_Item__c saveItem (Camping_Item__c Camping){
        
        upsert Camping;
        return Camping;
        
    }
}