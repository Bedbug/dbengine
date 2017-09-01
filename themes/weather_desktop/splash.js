Splash = {
    create: function(context) {
        
        Theme.values.currentWeather = "wind";
         bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
        
        context.game.stage.backgroundColor = "#000";
        if (context.game.device.desktop) {
            context.game.add.sprite(0, 0, "splash");
        }
        else {
            var splash = context.game.add.sprite(0, 0, "extras2", "Splash.png");
            splash.scale.setTo(1.35, 1.35);

        }

        var style = {
            font: "bold 30px ArialRound",
            fill: "#fff",
            align: "center"
        }

        // Thunderstorm Fre Spins Title
        
        context.thunderSpin_title = context.game.add.text(850, 170, bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_01'), style);
        context.thunderSpin_title.anchor.setTo(0.5, 0);
        context.thunderSpin_title.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.thunderSpin_title.resolution = 2;
        
        var thunderHelpText = bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02") + "\n\n";
        thunderHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04") + "\n\n";
        thunderHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_05") + "\n\n";
        thunderHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_06") + "\n";
        // thunderHelpText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_06") + "\n";
        // thunderHelpText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_07") + "\n";
        // thunderHelpText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_08") + "\n";
        // thunderHelpText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_09") + "\n";
        // thunderHelpText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_10") + "\n\n";
        // thunderHelpText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_11") + "\n";
        
        context.thunderSpin_text = context.game.add.text(850, 250, thunderHelpText, {
            font: "20px ArialRound",
            fill: "#ffffff",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 700
        });
        context.thunderSpin_text.anchor.setTo(0.5, 0);
        context.thunderSpin_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.thunderSpin_text.resolution = 2;

        

        var options = {
            checkBoxLine: 2,
            checkBoxSize: 30,
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            font: "18px Arial",
            wordWrapWidth: 320
        };

        // Convert to bool
        // var startingValue;
        // if(localStorage.getItem("showAgain") == "true")
        //     startingValue = true
        // else 
        //     startingValue = false

        //  if(!this.game.device.desktop) {
        //   this.showagain_checkbox = new CheckΒox(510, 640, this.game, bedbugGameCore.getLocalizedText("show_again"), null, startingValue, options, function(o, e) {
        //         localStorage.setItem('showAgain',  o);

        //     });
        //  }else{
        //     this.showagain_checkbox = new CheckΒox(510, 630, this.game, bedbugGameCore.getLocalizedText("show_again"), null, startingValue, options, function(o, e) {
        //         localStorage.setItem('showAgain',  o);

        //     });

        // }

        if (!context.game.device.desktop) {
            context.continue_button = context.game.add.button(context.game.width / 2 - 30, 580, 'gui', context.nextState, context, 'max_over.png', 'max_active.png', 'max_pressed.png');
            context.continue_button.anchor.setTo(0.5, 0.5);
            context.continue_button.scale.setTo(1.5, 1.5);
        }

        if (context.game.device.desktop) {
            context.continue_button = context.game.add.button(context.game.width / 2 - 30, 580, 'gui', context.nextState, context, 'wide_over.png', 'wide__active.png', 'wide_pressed.png');
            context.continue_button.anchor.setTo(0.5, 0.5);
            context.continue_button.scale.setTo(1.5, 1.5);
        }

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
