public class FileUploadController2 {
    public String message{get;set;}
    public Account account{get;set;}
    public List<Attachment> attachments{get;set;}
 
    public FileUploadController2() {
        this.message = '';
        attachments = new List<Attachment>();
        this.account = [SELECT Id, Name FROM Account WHERE Name = '株式会社JJJ'];
        for (Integer i = 0; i < 20; i++) {
            this.attachments.add(new Attachment());
        }
    }
    
    public PageReference upload(){
        this.message = '正常に終了しました。';
        List<Attachment> files = new List<Attachment>();
        for (Attachment at : attachments) {
            if (String.isNotEmpty(at.Name)){
                at.ParentId = this.account.Id;
                files.add(at);
            }
        }
        
        if(files.size() == 0) {
            this.message = '対象ファイルを入力してください。';
            return null;
        }
        
        try{
            insert files;
        }
        catch(Exception e){
            this.message = e.getMessage();
        }

        this.attachments.clear();
        for (Integer i = 0; i < 20; i++) {
            this.attachments.add(new Attachment());
        }
        
        return null;
    }
}