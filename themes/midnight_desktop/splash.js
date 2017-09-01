Splash = {
    create: function(context) {
        
        bedbugGameCore.ambianceKey = "music_main_loop";
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
        
        var splash = context.game.add.sprite(0, 0, "screens");
        splash.frameName = "First_Time_Help_Screen.png";
       splash.smoothed = false;
       
       var BetLevels = bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLevels;
        
        var MaxBetLevel = parseInt(BetLevels[BetLevels.length-1]);
        
        var pointsStyle = {
            font: " 50px Contrail",
            fill: "#d9d13f",
            align: "center",
            stroke : '#8a4207',
            strokeThickness : 6,
            wordWrap: true,
            wordWrapWidth: "800"
        }
    //   var title_text = context.game.add.bitmapText((context.game.width / 2)-20, (context.game.height / 2) -50, "pointsfont",bedbugGameCore.getLocalizedText("MSG_MAX_WIN"), 110);
       var title_text = context.game.add.text((context.game.width / 2)+ 30, (context.game.height / 2) -250, bedbugGameCore.getLocalizedText("MSG_MAX_WIN").replace("$(1)", bedbugGameCore.numberWithSpaces((5600 * MaxBetLevel))), pointsStyle);
        title_text.resolution = 2;
        title_text.anchor.setTo(0.5, 0.5);
       
       var TextStyle = {
            font: " 22px Contrail",
            fill: "#fff",
            align: "left",
            stroke : '#000',
            strokeThickness : 4,
            wordWrap: true,
            wordWrapWidth: "400"
        }
        
        var style = {
            font: "bold 30px ArialRound",
            fill: "#fff",
            align: "center",
            wordWrap: true,
            wordWrapWidth: "400"
        }
        // bedbugGameCore.getLocalizedText('txt_paytable_page_01_info_01')
        var wildInfo_text = context.game.add.text(450, 220, bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_01'), TextStyle);
        wildInfo_text.anchor.setTo(0, 0);
        
        //context.wildInfo_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        wildInfo_text.resolution = 2;

        var scatterHelpText = bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02") + "\n";
        scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_03") + "\n\n";
        // scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04") + "\n\n";
        
        var scatterInfo_text_01 = context.game.add.text(700, 380,  scatterHelpText, TextStyle);
        scatterInfo_text_01.anchor.setTo(0, 0);
        scatterInfo_text_01.resolution = 2;
       
       
       
       
       
       
       
       
        context.continue_button = context.game.add.button( context.game.width/2 , 600, 'assets', context.nextState, context, 'advanced_options_over.png', 'advanced_options_active.png', 'advanced_options_pressed.png', 'advanced_options_active.png');
        context.continue_button.anchor.setTo(0.5, 0.5);
        context.continue_button.scale.setTo(1.5, 1.5);
        
        context.continue_text = context.game.add.text(context.game.width/2 , 605,  bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), TextStyle);
        
        // context.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.continue_text.anchor.setTo(0.5, 0.5);
        context.continue_text.resolution = 2;
        //context.continue_button.addChild(context.continue_text);
    }
}
