public class AccountHandler {
    public static Account insertNewAccount(String name ){
        try{
            System.debug('test');
            if(String.isEmpty(name) != true ){
                Account acct = new Account(Name=name);
	            insert acct;
    	        return acct;
            }
            else{
                return null;
            }
        }
        catch(DmlException e){
            return null;
        }
    }
}