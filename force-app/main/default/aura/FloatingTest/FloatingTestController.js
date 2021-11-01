({
    init : function() {
      console.log(" 画面サイズの横幅 ");
      console.log($('.panelSlide'));
        $('.fullscreen').css('width',window.screen.width+'px');
        $('.fullscreen').css('height',window.screen.height+'px');
    }
})