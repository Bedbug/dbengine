bedbugGameCore.Menu = function(game) {}

bedbugGameCore.Menu.prototype = {

    preload: function() {
        if (bedbugGameCore.isDesktop())
            UnifiedPanel.setUnifiedPanelVisibility('block');
    },
    goFullscreen: function() {
        if (!this.game.scale.isFullScreen) {
            // console.log("Go FullScreen");
            this.game.scale.startFullScreen(true);
            // this.game.scale.setUserScale(window.screen.height / context.game.height, window.screen.height / this.game.height);
        }
    },
    create: function() {
        // First create the audio listeners for the rest of the game
        Sounds.create(this);
        
        // Notify Lobby that game has loaded
        if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_DISPLAY_INTRO);

        // console.log("Now is loaded");

        // check if 'Dont show is checked'
        Splash.create(this);

        if (!this.game.device.desktop && this.game.device.requestFullscreen != '') {
            // console.log("StartFullScreen Listener");
            this.game.scale.startFullScreen(true);
            this.game.input.onTap.add(this.goFullscreen, this);
        }
        
    
        // this.game.scale.compatibility.supportsFullScreen = true;
        // this.game.input.onDown.add(this.goFullscreen, this);
        
        // Now we can pause the game freely if there is a change in focus/blur
        bedbugGameCore.shouldPause = true;
        
        if(!bedbugGameCore.hasFocus || !document.hasFocus())
        this.game.paused = true;
        
        return;


        //     this.game.stage.backgroundColor = "#000";
        //   if(bedbugGameCore.theme == "midnight") {
        //         var splash = this.game.add.sprite(0, 0, "screens");
        //         splash.frameName = "First_Time_Help_Screen.png";

        //         this.continue_button = this.game.add.button( this.game.width/2 , 600, 'assets', nextState, this, 'Continue_over.png', 'Continue_active.png', 'Continue_pressed.png');
        //         this.continue_button.anchor.setTo(0.5, 0.5);
        //         this.continue_button.scale.setTo(1.5, 1.5);
        //      }else {
        //          this.game.add.sprite(0, 0, "splash");
        //     //   var splash = this.game.add.sprite(0, 0, "extras2", "Splash.png");
        //     //   splash.scale.setTo(1.35, 1.35);

        //      }

        //  var style = {
        //   font: "bold 30px ArialRound",
        //   fill: "#fff",
        //   align: "center"
        // }

        // Thunderstorm Fre Spins Title
        // this.thunderSpin_title = this.game.add.text( 850, 170, bedbugGameCore.getLocalizedText('thunder_title'), style);
        // this.thunderSpin_title.anchor.setTo(0.5, 0);
        // this.thunderSpin_title.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // this.thunderSpin_title.resolution = 2;

        // this.thunderSpin_text = this.game.add.text( 850, 250, bedbugGameCore.getLocalizedText('freespins_intro'), {font: "20px ArialRound", fill: "#ffffff", align:"center", wordWrap: true, wordWrapWidth: 700});
        // this.thunderSpin_text.anchor.setTo(0.5, 0);
        // this.thunderSpin_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // this.thunderSpin_text.resolution = 2;

        //  var options = {
        //         checkBoxLine: 2,
        //         checkBoxSize:30,
        //         // color: 0x000000,
        //         // dotColor: 0x000000,
        //         fill: "#fff",
        //         font: "18px Arial",
        //         wordWrapWidth: 320
        //     };

        // Convert to bool
        // var startingValue;
        // if(localStorage.getItem("showAgain") == "true")
        //     startingValue = true
        // else 
        //     startingValue = false

        //  if(!this.game.device.desktop) {
        //   this.showagain_checkbox = new CheckΒox(510, 650, this.game, bedbugGameCore.getLocalizedText("show_again"), null, startingValue, options, function(o, e) {
        //         localStorage.setItem('showAgain',  o);

        //     });
        //  }else{
        //     this.showagain_checkbox = new CheckΒox(510, 670, this.game, bedbugGameCore.getLocalizedText("show_again"), null, startingValue, options, function(o, e) {
        //         localStorage.setItem('showAgain',  o);

        //     });

        // }

        // if(bedbugGameCore.theme == "tesla") {
        //     console.log("Theme is Tesla");
        //     this.continue_button = this.game.add.button(this.game.width/2 , 620, 'mobile', nextState, this, 'button_Pressed.png', 'button_Pressed.png', 'button_Active.png');
        //     this.continue_button.anchor.setTo(0.5, 0.5);
        //     this.continue_button.scale.setTo(1, 1);

        //     this.continue_text = this.game.add.text( 0, 3, "continue", {font: "20px Arial", fill: "#ffffff", fontWeight: "bold"});
        //     this.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        //     this.continue_text.anchor.setTo(0.5, 0.5);
        //     this.continue_text.resolution = 2;
        //     this.continue_button.addChild(this.continue_text);
        //   }


        if (!this.game.device.desktop)
            this.game.input.onDown.add(gofull, this);


        // this.game.state.start('menu');
    },
    nextState: function() {
        this.game.state.start('play');
    },
    update: function() {

    },

};


function gofull() {

    // if (bedbugGameCore.game.scale.isFullScreen)
    // {
    //     bedbugGameCore.game.scale.stopFullScreen();
    // }
    // else
    // {
    //     bedbugGameCore.game.scale.startFullScreen(false);
    // }

}
