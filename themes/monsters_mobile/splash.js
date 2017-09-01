Splash = {
    create: function(context) {
        
        bedbugGameCore.ambianceKey = "music_main_loop";
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
        
        var splash = context.game.add.sprite(0, 0, "screensmb");
        splash.frameName = "BG.jpg";
        splash.smoothed = false;
        var fts = context.game.add.sprite(context.game.width / 2, context.game.height / 2 + 15, "screensmb", "Help_plate.png") 
        fts.anchor.setTo(.5);
        fts.angle = 90;
        fts.smoothed = false;
        
        var style1 = {
            font: "45px ParkLaneNF",
            fill: "#fff",
            align: "center",
        }
      
        var style = {
            font: "40px ParkLane",
            fill: "#fff",
            align: "center",
        }
        
        var styleSmall = {
            font: "30px ParkLane",
            fill: "#fff",
            align: "left",
            
        }
        
        var BetLevels = bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLevels;
        
        var MaxBetLevel = parseInt(BetLevels[BetLevels.length-1]);
        
        // var title_text = context.game.add.text((context.game.width / 2) , 580, bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), style);
        var title_text = context.game.add.text((context.game.width / 2), (context.game.height / 2) -230, bedbugGameCore.getLocalizedText("MSG_MAX_WIN").replace("$(1)", bedbugGameCore.numberWithSpaces((5600 * MaxBetLevel))), style1);
        title_text.align = "center";
        title_text.anchor.setTo(0.5, 0.5);
       
       
        // bedbugGameCore.getLocalizedText('txt_paytable_page_01_info_01')
        var wildSprite = context.game.add.sprite(300, 280, "assets", "Wild_Normal.png");
        wildSprite.anchor.setTo(.5);
        wildSprite.scale.setTo(1.2);
        wildSprite.smoothed = false;
        var wildanim = wildSprite.animations.add("wild", Phaser.Animation.generateFrameNames("Wild_win", 0, 59, '.png', 4), 24, true);
        wildanim.play();
        
        var wildInfo_text = context.game.add.text(430, 240,  bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_01'), styleSmall);
        wildInfo_text.anchor.setTo(0, 0);
        wildInfo_text.align = "left";
        wildInfo_text.wordWrap = true;
        wildInfo_text.wordWrapWidth = "500";
        //context.wildInfo_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        //context.wildInfo_text.resolution = 2;
        
        var scatterSprite = context.game.add.sprite(1000, 430, "assets", "Scatter_Normal.png");
        scatterSprite.anchor.setTo(.5);
        scatterSprite.scale.setTo(1.2);
        scatterSprite.smoothed = false;
        var scatterHelpText = bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02") + "\n";
        scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_03") + "\n\n";
        // scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04") + "\n\n";
        scatterHelpText.wordWrapWidth = "300";
        
        var scatterInfo_text_01 = context.game.add.text(880, 380, scatterHelpText, styleSmall);
        scatterInfo_text_01.anchor.setTo(1, 0);
        scatterInfo_text_01.align = "right";
        scatterInfo_text_01.wordWrapWidth = "300";
        scatterInfo_text_01.linespacing = 20;
       
       
       
       
       
       
       
       
        context.continue_button = context.game.add.button( context.game.width/2 , 580, 'assets', context.nextState, context, 'Continue BTN_Over.png', 'Continue BTN_Normal.png', 'Continue BTN_Select.png', 'Continue BTN_Normal.png');
        context.continue_button.anchor.setTo(0.5, 0.5);
        context.continue_button.scale.setTo(1, 1);
        context.continue_button.smoothed = false;
        // context.continue_text = context.game.add.bitmapText(context.game.width/2 , 580, "font_small", bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), 30);
        context.continue_text= context.game.add.text((context.game.width / 2) , 580, bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), style1);
        context.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.continue_text.anchor.setTo(0.5, 0.5);
        context.continue_text.resolution = 2;
        //context.continue_button.addChild(context.continue_text);
    }
}
