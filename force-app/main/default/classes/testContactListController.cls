public class testContactListController {
    
    @AuraEnabled
    public static List<Contact> getContacts(String accountID) {
        return [select id,Name,Email,title from Contact where AccountId = :accountID Order by Id ASC];
    }
}