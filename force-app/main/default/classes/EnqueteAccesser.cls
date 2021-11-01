@RestResource(urlMapping='/Enquete/*')
global with sharing class EnqueteAccesser{

    @HttpGet
    global static sObject doGet(){
        RestRequest req = RestContext.request;
        String ContactName = req.params.get('name');
        ContactName = '%' + ContactName + '%';
        try {
            Contact acc = [SELECT Id, Name, Email, Account.Name FROM Contact WHERE Name LIKE :ContactName LIMIT 1];
            return acc;
        } catch (exception e) {
            return null;
        }
    
    }
    
    
    @HttpPost
    global static void doPost(){
    }
}