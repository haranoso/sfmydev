({
    doInit: function(cmp) {
       console.log("load");
       var i = 0;
       var rcvStatus = 200;
       var rcvArray = [200,503];
        
       var allOff = function(){
           cmp.set("v.leftBoxStatus","off");
           cmp.set("v.centerBoxStatus","off");
           cmp.set("v.rightBoxStatus","off"); 
       }

	    allOff();       



 /*     setInterval(function(){
          cmp.set("v.status",i++);
           //debug 
          var a = Math.floor( Math.random() * 2 );
          rcvStatus = rcvArray[a];
          //debug
           
          // ソケット接続、接続成功の場合
          if (true){
　　           // 受信したらデータを解析　２００OKなら生きている
　　           // ２００OK以外なら死んでいる
　　           // 応答時間もできればもらう。
　　           // 10秒以上かかって２００OKとかなら黄色信号
              if (rcvStatus !== 200) {
                 cmp.set("v.status","死んでいる。");
                   cmp.set("v.leftBoxStatus","off");
                   cmp.set("v.centerBoxStatus","off");
                   cmp.set("v.rightBoxStatus","on");
                   console.log("dead");
              }
              else{
                  cmp.set("v.status","生きている。");
                  cmp.set("v.leftBoxStatus","on");
                  cmp.set("v.centerBoxStatus","off");
                  cmp.set("v.rightBoxStatus","off");
                  console.log("alive");
              }
           }
           // 接続失敗した場合
           else{
               // リトライ？
               allOff();
           }
        }, 10000);*/
    },

    loaded: function(){
        console.log('testttt');
        const options = {
            transports: ['websocket', 'polling'],
            secure: true
        };

        var socket = io.connect("wss://firstapp-haranoso-20171215.herokuapp.com/", options);

        socket.on('status', function (msg) {
            console.log(msg);
        });
    }
})