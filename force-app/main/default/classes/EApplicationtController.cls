public with sharing class EApplicationtController {

    public String radio{get;set;}
    
  public EApplicationtController(ApexPages.StandardController stdController) {
    sObject sObj = stdController.getRecord();
    System.debug(sObj.Id);
    Id myId = sObj.Id;
    NB_EApplication__c obj = Database.query('SELECT ID,radio__c , NB_AppDocNo__c from NB_EApplication__c where Id = :myId LIMIT 1');
    System.debug(obj);

    radio = obj.radio__c;
  }
  public List<SelectOption> getSelectOptions(){
 
    List<SelectOption> options;
     
    // 選択リストを作成する
    options = new List<SelectOption>();
 
        options.add(new SelectOption('1', '１：あり'));
        options.add(new SelectOption('2', '２：なし'));
        options.add(new SelectOption('3', '３：あり'));
        options.add(new SelectOption('4', '４：あり'));
        options.add(new SelectOption('5', '５：なし'));
        options.add(new SelectOption('6', '６：なし'));
        options.add(new SelectOption('7', '７：あり'));
       System.debug(options);
    return options;
  }
}