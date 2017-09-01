Splash = {
    create: function(context) {
        
        bedbugGameCore.ambianceKey = "music_main_loop";
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
         
        context.game.add.sprite(0, 0, "splash");
        
        //LOGO
        var LogoAnim = context.game.add.sprite((context.game.width / 2), 0, "logoloop");
        LogoAnim.animations.add("logoloop");
        LogoAnim.anchor.setTo(0.5, 0);
        var animationName = "Logo-Loop_";
        //  //console.log(animationName);
        LogoAnim.animations.add("logo", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 4), 30, true);
        LogoAnim.animations.play("logo");
        
        var style = {
            font: "bold 30px ArialRound",
            fill: "#fff",
            align: "center"
        }
        // bedbugGameCore.getLocalizedText('txt_paytable_page_01_info_01')
        context.wildInfo_text = context.game.add.text(460, 190, bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_01'), {
            font: "16px ArialRound",
            fill: "#ffffff",
            align: "left",
            wordWrap: true,
            wordWrapWidth: 250
        });
        context.wildInfo_text.anchor.setTo(0, 0);
        context.wildInfo_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.wildInfo_text.resolution = 2;

        // var scatterHelpText = bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02") + "\n";
        // scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_03") + "\n";
        // scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04") + "\n\n";
        
        context.scatterInfo_text_01 = context.game.add.text(810, 390, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02"), {
            font: "16px ArialRound",
            fill: "#ffffff",
            align: "right",
            wordWrap: true,
            wordWrapWidth: 350
        });
        context.scatterInfo_text_01.anchor.setTo(1, .5);
        context.scatterInfo_text_01.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.scatterInfo_text_01.resolution = 2;
        
        context.scatterInfo_text_02 = context.game.add.text(810, 440, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_03"), {
            font: "16px ArialRound",
            fill: "#ffffff",
            align: "right",
            wordWrap: true,
            wordWrapWidth: 350
        });
        context.scatterInfo_text_02.anchor.setTo(1, .5);
        context.scatterInfo_text_02.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.scatterInfo_text_02.resolution = 2;
        
        
        context.scatterInfo_text_03 = context.game.add.text(810, 480, bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04"), {
            font: "16px ArialRound",
            fill: "#ffffff",
            align: "right",
            wordWrap: true,
            wordWrapWidth: 350
        });
        context.scatterInfo_text_03.anchor.setTo(1, .5);
        context.scatterInfo_text_03.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.scatterInfo_text_03.resolution = 2;
        
        //  context.scatterInfo_text_01 = context.game.add.text(550, 430, bedbugGameCore.getLocalizedText('txt_paytable_page_02_info_02'), {
        //     font: "18px ArialRound",
        //     fill: "#ffffff",
        //     align: "right",
        //     wordWrap: true,
        //     wordWrapWidth: 400
        // });
        // context.scatterInfo_text_01.anchor.setTo(0, 0);
        // context.scatterInfo_text_01.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // context.scatterInfo_text_01.resolution = 2;

        var options = {
            checkBoxLine: 2,
            checkBoxSize: 30,
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            font: "18px Arial",
            wordWrapWidth: 320
        };

        context.continue_button = context.game.add.button(context.game.width / 2, 640, 'mobile', context.nextState, context, 'button_Pressed.png', 'button_Pressed.png', 'button_Active.png');
        context.continue_button.anchor.setTo(0.5, 0.5);
        context.continue_button.scale.setTo(1, 1);

        context.continue_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        context.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.continue_text.anchor.setTo(0.5, 0.5);
        context.continue_text.resolution = 2;
        context.continue_button.addChild(context.continue_text);

    }
}
