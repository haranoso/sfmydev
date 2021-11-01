public class NewCaseListController{
    
    public List<Case> getNewCases() {
    
        List<Case> results = Database.query(
            'SELECT id , CaseNumber ' +
            'FROM Case ' +
            'WHERE Status = \'New\''
        );
        return results;
    }
}