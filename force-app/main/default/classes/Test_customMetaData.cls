@isTest
public class Test_customMetaData {
    @isTest static void myTest01() {
        Test.startTest();
 
        
        Metadata.CustomMetadata testMeta = new Metadata.CustomMetadata();
        testMeta.fullName = 'loglist.testrecord2';
        testMeta.label = 'テスト2_L';
        
        Metadata.CustomMetadataValue customField1 = new Metadata.CustomMetadataValue();
    	customField1.field = 'Field1__c';
    	customField1.value = '２';
	    testMeta.values.add(customField1);

        Metadata.CustomMetadataValue customField2 = new Metadata.CustomMetadataValue();
    	customField2.field = 'Field2__c';
    	customField2.value = 'てすと！！！';
	    testMeta.values.add(customField2);

        Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();
    	mdContainer.addMetadata(testMeta);
        
        CustomMetadataCallback callback = new CustomMetadataCallback();
   
		Id jobId = Metadata.Operations.enqueueDeployment(mdContainer, callback);	        
        
        Test.stopTest();
    }
}