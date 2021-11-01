public class testAccountListController {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [select id,Name,AccountNumber from Account Order by AccountNumber ASC];
    }
}