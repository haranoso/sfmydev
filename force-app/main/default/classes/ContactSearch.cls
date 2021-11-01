public class ContactSearch {
    public static List<Contact> searchForContacts(String lastname , String postalCode ){
		List<Contact> contacts = [SELECT ID , Name FROM Contact 
                   WHERE (LastName =:lastname AND MailingPostalCode=:postalCode)];
        
        return contacts;
    }
}