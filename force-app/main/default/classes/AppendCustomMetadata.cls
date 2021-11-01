public class AppendCustomMetadata {
    static public void append() {
        Metadata.CustomMetadata testMeta = new Metadata.CustomMetadata();
        testMeta.fullName = 'loglist.testrecord';
        testMeta.label = 'テスト1_L';
        
        Metadata.CustomMetadataValue customField1 = new Metadata.CustomMetadataValue();
    	customField1.field = 'Field1__c';
    	customField1.value = '１';
	    testMeta.values.add(customField1);

        Metadata.CustomMetadataValue customField2 = new Metadata.CustomMetadataValue();
    	customField2.field = 'Field2__c';
    	customField2.value = 'てすと！！';
	    testMeta.values.add(customField2);

        Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();
    	mdContainer.addMetadata(testMeta);
        
        CustomMetadataCallback callback = new CustomMetadataCallback();
   
		Id jobId = Metadata.Operations.enqueueDeployment(mdContainer, callback);	        
        
    }
}