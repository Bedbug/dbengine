Splash = {
    create: function(context) {
        
        bedbugGameCore.ambianceKey = "music_main_loop";
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
        
        var splash = context.game.add.sprite(0, 0, "screens");
        splash.frameName = "fths-panel.png";
       
       
     var titleText = context.game.add.text( 240, 255, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_01"), {
            'font': ' 28px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "120"
        });
        titleText.anchor.setTo(0.5, 0.5);
        
        
       var wildText = context.game.add.text( 560, 255, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02"), {
            'font': ' 30px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "400"
        });
       wildText.anchor.setTo(0.5, 0.5);
       
       var scatterText = context.game.add.text( 570, 446, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_03"), {
            'font': '30px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "400"
        });
        scatterText.anchor.setTo(0.5, 0.5);
       
       var extraText = context.game.add.text( 880, 240, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04"), {
            'font': '30px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "390"
        });
        extraText.anchor.setTo(0.5, 0.5);
       
       
       
       
       
       
       
       
        context.continue_button = context.game.add.button( context.game.width/2 , 613, 'assets', context.nextState, context, 'generic-message-panel-button-over.png', 'generic-message-panel-button-active.png', 'generic-message-panel-button-pressed.png', 'generic-message-panel-active.png');
        context.continue_button.anchor.setTo(0.5, 0.5);
        context.continue_button.scale.setTo(1, 1);
        
        context.continue_text = context.game.add.bitmapText(context.game.width/2 , 613, "font_small", bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), 30);
        
        // context.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.continue_text.anchor.setTo(0.5, 0.5);
        // context.continue_text.resolution = 2;
        //context.continue_button.addChild(context.continue_text);
    }
}
