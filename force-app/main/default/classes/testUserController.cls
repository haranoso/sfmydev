public class testUserController {
    @AuraEnabled
    public static Account getAccount(String accountId) {
        List<Account> accountList = [select id,Name,AccountNumber from Account where id = :accountId];
        if ( accountList.size() > 0 ){
            return accountList.get(0);
        }
        return null;
    }
}