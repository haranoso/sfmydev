public class ContactAndLeadSearch {
    public static List<List<sObject>> searchContactsAndLeads(String name){
        List<List<sObject>> searchList = [FIND :name IN ALL FIELDS 
                   RETURNING Contact(LastName),Lead(LastName)];
        return searchList;
    }
}