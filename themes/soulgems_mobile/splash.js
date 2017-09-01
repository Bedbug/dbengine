Splash = {
    create: function(context) {
        
        bedbugGameCore.ambianceKey = "music_main_loop";
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
        
        var splashBg = context.game.add.sprite(context.game.width / 2, (context.game.height / 2) , "assets");
        splashBg.frameName = "fths-panel.png";
        splashBg.anchor.setTo(.5);
       
       
    //   var title_text = context.game.add.bitmapText((context.game.width / 2)-20, (context.game.height / 2) -50, "pointsfont",bedbugGameCore.getLocalizedText("MSG_MAX_WIN"), 110);
    //   var title_text = context.game.add.bitmapText((context.game.width / 2), (context.game.height / 2) -250, "pointfonts","MSG_MAX_WIN", 60);
    //     title_text.align = "center";
    //     title_text.anchor.setTo(0.5, 0.5);
       
       
        var style = {
            font: "bold 30px ArialRound",
            fill: "#fff",
            align: "center",
            wordWrap: true,
            wordWrapWidth: "400"
        }
        
        var wildSprite = context.game.add.sprite(400, 230, "assets", "wild-norm.png");
        wildSprite.anchor.setTo(.5);
        // bedbugGameCore.getLocalizedText('txt_paytable_page_01_info_01')
        var wildInfo_text = context.game.add.bitmapText( wildSprite.x, 380, "contrail_small", bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_01'), 30);
        wildInfo_text.anchor.setTo(.5, .5);
        wildInfo_text.align = "center";
        wildInfo_text.maxWidth = 400;
        wildInfo_text.lineSpacing = 100;
        //context.wildInfo_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        //context.wildInfo_text.resolution = 2;

        // var scatterHelpText = bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02") ;
        // scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04") + "\n\n";
        var wildSprite2 = context.game.add.sprite(1020, 320, "assets2", "wilds_stacked.png");
        wildSprite2.scale.setTo(1.15);
        wildSprite2.anchor.setTo(.5);
        
        var wildInfo_text2 = context.game.add.bitmapText(780, 320, "contrail_small", bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_02'), 30);
        wildInfo_text2.anchor.setTo(.5, .5);
        wildInfo_text2.align = "center";
        wildInfo_text2.maxWidth = 300;
       
       
       
       
       
       
       
       
        context.continue_button = context.game.add.button( context.game.width/2 , 550, 'assets', context.nextState, context, 'generic-button-over.png', 'generic-button-active.png', 'generic-button-pressed.png', 'generic-button-active.png');
        context.continue_button.anchor.setTo(0.5, 0.5);
        context.continue_button.scale.setTo(1, 1);
        
        context.continue_text = context.game.add.bitmapText(context.game.width/2 , 553, "contrail_small", bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), 30);
        
        // context.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.continue_text.anchor.setTo(0.5, 0.5);
        // context.continue_text.resolution = 2;
        //context.continue_button.addChild(context.continue_text);
    }
}
