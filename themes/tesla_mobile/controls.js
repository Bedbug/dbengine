Controls = {
    create: function(context) {

        this.controlsGroup = context.game.add.group();

        this.buttonArray = [];
        this.buttonsOffArray = [];


        this.home_button = context.game.add.button(20, 20, 'mobile', bedbugGameCore.GO_HOME, bedbugGameCore, 'Home_Pressed.png', 'Home_Pressed.png', 'Home_Active.png');
        this.controlsGroup.addChild(this.home_button);
        this.buttonArray.push(this.home_button);

        this.homeOff_button = context.game.add.button(20, 20, 'mobile');
        this.homeOff_button.frameName = "Home_inActive.png";
        this.controlsGroup.addChild(this.homeOff_button);
        this.buttonsOffArray.push(this.homeOff_button);

        // // SETTINGS BUTTON
        this.settings_button = context.game.add.button(1180, 20, 'mobile', this.openOptionsPanel, this, 'Options_Pressed.png', 'Options_Pressed.png', 'Options_Active.png');
        this.controlsGroup.addChild(this.settings_button);
        this.buttonArray.push(this.settings_button);

        this.settingsOff_button = context.game.add.button(1180, 20, 'mobile');
        this.settingsOff_button.frameName = "Options_inActive.png";
        this.controlsGroup.addChild(this.settingsOff_button);
        this.buttonsOffArray.push(this.settingsOff_button);

        this.paytable_button = context.game.add.button(210, 683, 'mobile', context.showPayTable, context, 'button_Pressed.png', 'button_Pressed.png', 'button_Active.png');
        this.paytable_button.anchor.setTo(0.5, 0.5);
        this.paytable_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.paytable_text.anchor.setTo(0.5, 0.5);
        this.paytable_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.paytable_button.addChild(this.paytable_text);
        this.buttonArray.push(this.paytable_button);

        this.paytableOff_button = context.game.add.button(210, 683, 'mobile');
        this.paytableOff_button.frameName = "button_inActive.png";
        this.paytableOff_button.anchor.setTo(0.5, 0.5);
        this.paytableOff_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.paytableOff_text.anchor.setTo(0.5, 0.5);
        this.paytableOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.paytableOff_button.addChild(this.paytableOff_text);
        this.buttonsOffArray.push(this.paytableOff_button);

        // COINS
        this.coinsTextBox = context.game.add.sprite(465, 683, "mobile");
        this.coinsTextBox.anchor.setTo(0.5, 0.5);
        this.coinsTextBox.frameName = "Text_Box.png";

        //this.coins_label.anchor.setTo(0.5, 0.5);
        this.coins_heading = context.game.add.text(465, 685, bedbugGameCore.getLocalizedText("TXT_COINS_LABEL") + ":", {
            font: "bold 20px Arial",
            fill: "#EAEAEA",
            fontWeight: "bold"
        });
        this.coins_heading.anchor.setTo(0.5, 0.5);
        this.coins_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        //this.coins_heading.cacheAsBitmap = true;
        //coins_heading.anchor.setTo(0.5, 0);

        // this.coins_label = new CustomLabel(context.game, "500000", (coins_heading.x+coins_heading.width)+45, 683, 170, 50, true, {
        //     font: "bold 20px Arial"
        // });
        // this.coins_label.setLabel( Math.round(bedbugGameCore.coins));

        // SET BET BUTTON
        this.set_bet_button = context.game.add.button(719, 683, 'mobile', this.openBetPanel, this, 'button_Pressed.png', 'button_Pressed.png', 'button_Active.png');
        this.set_bet_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.set_bet_button);

        this.set_betOff_button = context.game.add.button(719, 683, 'mobile');
        this.set_betOff_button.frameName = 'button_inActive.png';
        this.set_betOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.set_betOff_button);

        //Bet Coins
        this.bet_Label = context.game.add.text(719, 685, bedbugGameCore.getLocalizedText("TXT_BET_LABEL"), {
            font: "bold 20px Arial",
            fill: "#fff",
            fontWeight: "bold"
        });
        this.bet_Label.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.bet_Label.anchor.setTo(0.5, 0.5);


        this.controlsGroup.addChild(this.paytable_button);


        this.autoplay_button = context.game.add.button(973, 683, 'mobile', this.openAutoplayPanel, this, 'button_Pressed.png', 'button_Pressed.png', 'button_Active.png');
        this.autoplay_button.anchor.setTo(0.5, 0.5);
        this.autoplay_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.autoplay_text.anchor.setTo(0.5, 0.5);
        //this.autoplay_text.scale.setTo(0.9, 0.9);
        this.autoplay_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_button.addChild(this.autoplay_text);
        this.buttonArray.push(this.set_bet_button);

        this.autoplayOff_button = context.game.add.button(973, 683, 'mobile');
        this.autoplayOff_button.frameName = "button_inActive.png";
        this.autoplayOff_button.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.autoplayOff_text.anchor.setTo(0.5, 0.5);
        //this.autoplay_text.scale.setTo(0.9, 0.9);
        this.autoplayOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplayOff_button.addChild(this.autoplayOff_text);
        this.buttonsOffArray.push(this.autoplayOff_button);

        this.autoplay_stop_button = context.game.add.button(973, 683, 'mobile', context.controls_stop_auto, context, 'button_Pressed.png', 'button_Pressed.png', 'button_Active.png');
        //this.autoplay_stop_button = context.game.add.button(bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.grid.columns * (bedbugGameCore.game_specs.reels.spacing.x + bedbugGameCore.game_specs.slots.width)) + 50, 310, 'gui', context.controls_stop_auto, context, 'max_pressed_vertical.png', 'max_active_vertical.png', 'max_pressed_vertical.png');
        this.autoplay_stop_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text = context.game.add.text(-20, 3, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.autoplay_stop_text.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text.scale.setTo(1.0, 1.0);
        this.autoplay_stop_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_stop_button.addChild(this.autoplay_stop_text);


        this.autoplay_stop_button.visible = false;

        this.autoplay_count = context.game.add.text(this.autoplay_button.x, this.autoplay_button.y, " ", {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.autoplay_count.anchor.setTo(0.5, 0.5);
        this.autoplay_count.resolution = 2;
        this.autoplay_count.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // Close this, no visible use
        this.autoplay_count.alpha = 0;
        this.autoplay_count.visible = false;


        this.controlsGroup.addChild(this.autoplay_button);
        this.controlsGroup.addChild(this.autoplayOff_button);
        this.controlsGroup.addChild(this.autoplay_stop_button);
        this.controlsGroup.addChild(this.autoplay_count);

        var AnchorLeft = bedbugGameCore.game_specs.grid.x;

        // BALANCE LABEL
        // this.balance_label = new CustomLabel(context.game, "", AnchorLeft + (270 / 2), 100, 270, 50, true, {
        //     font: "bold 30px Arial"
        // });
        this.balance_label_heading = context.game.add.text(550, 17, bedbugGameCore.getLocalizedText("TXT_BALANCE_LABEL"), {
            font: "17px Arial",
            fill: "#EAEAEA"
        });
        this.balance_label_heading.anchor.setTo(0.5, 0);
        this.balance_label_heading.resolution = 2;
        this.balance_label_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        //this.balance_label_heading.cacheAsBitmap = true;
        this.updateUserBalance();

        // Bet
        this.bet_heading = context.game.add.text(720, 17, bedbugGameCore.getLocalizedText("TXT_BET_LABEL"), {
            font: "17px Arial",
            fill: "#EAEAEA"

        });
        this.bet_heading.anchor.setTo(0.5, 0);
        this.bet_heading.resolution = 2;
        this.bet_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // WIN LABEL
        // this.win_label = new CustomLabel(context.game, "", 623, 100, 200, 50, true, {
        //     font: "bold 30px Arial"
        // });

        this.win_label_heading = context.game.add.text(860, 17, bedbugGameCore.getLocalizedText("TXT_WIN_LABEL"), {
            font: "17px Arial",
            fill: "#EAEAEA",
        });
        this.win_label_heading.anchor.setTo(0.5, 0);
        this.win_label_heading.resolution = 2;
        this.win_label_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        //this.win_label_heading.cacheAsBitmap = true;
        this.updateUserWin();

        this.game_time = context.game.add.text(1070, 17, "", {
            font: "17px Arial",
            fill: "#EAEAEA",
        });
        this.game_time.anchor.setTo(0.5, 0);
        this.game_time.resolution = 2;
        this.game_time.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

        //this.updateTotalBet();





        this.controlsGroup.addChild(this.set_bet_button);
        // PLAY BUTTON


        this.play_button = context.game.add.button(1180, 635, 'mobile', context.play_spin, context, 'Spin_Pressed.png', 'Spin_Pressed.png', 'Spin_Active.png');
        this.play_button.anchor.setTo(.5, .5);
        this.buttonArray.push(this.play_button);

        this.playOff_button = context.game.add.button(1180, 635, 'mobile');
        this.playOff_button.frameName = "Spin_inActive.png";
        this.playOff_button.anchor.setTo(.5, .5);
        this.playOff_button.alpha = 0.4;
        this.buttonsOffArray.push(this.playOff_button);

        // -- COUNTPLAY STATE
        this.countButtonGroup = context.game.add.group();
        this.countButtonGroup.x = 1180;
        this.countButtonGroup.y = 635;


        this.countplay_button_stop = context.game.add.button(0, 0, 'mobile', context.play_spin, context, 'Spin_Pressed.png', 'Spin_Pressed.png', 'Spin_Active.png');
        this.countplay_button_stop.anchor.setTo(.5, .5);
        this.countplay_button_stop.alpha = 0.5;

        // Stop Button Extra Area
        this.stop_input = context.game.add.graphics(0, 0);
        this.stop_input.anchor.setTo(1, 1);
        this.stop_input.beginFill(0x000000, 0.1);
        this.stop_input.drawRect(-1050, -600, 1000, 600);
        this.stop_input.endFill();

        this.stop_input.inputEnabled = true;
        this.stop_input.events.onInputUp.add(context.stop_spin, context);

        this.countplay_button_stop.addChild(this.stop_input);
        // stop_input.events.onInputUp.add(function(pointer) {  
        //     //this is the test, contains test for a point belonging to a rect definition    
        //     var inside = stop_input.contains(pointer.x,pointer.y)    
        //     //do whatever with the result    
        //     console.log('pointer is inside region top left quarter', inside)
        // },this);


        this.play_text = context.game.add.text(0, -35, '', {
            font: "bold 25px Arial",
            fill: "#fff"
        });
        this.play_text.anchor.setTo(0.5, 1);

        this.play_count = context.game.add.text(-150, 50, '', {
            font: "bold 20px Arial",
            fill: "#fff"
        });
        // this.play_count.resolution = 2;
        this.play_count.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.play_count.anchor.setTo(0.5, 0.5);

        this.countButtonGroup.add(this.countplay_button_stop);
        // this.countButtonGroup.add(countplay_button_stop);
        this.countButtonGroup.add(this.play_text);
        this.countButtonGroup.add(this.play_count);

        this.countButtonGroup.visible = false;

        // Close All Off Buttons
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = false;
        }

        this.controlsGroup.addChild(this.play_button);
        this.controlsGroup.addChild(this.playOff_button);
        this.controlsGroup.addChild(this.countButtonGroup);

        this.createBetPanel(context);

        this.createAutoplayPanel(context);

        this.createOptions(context);

        this.createResponsibleOptions(context);

        bedbugEventsSystem.addListener('ON_CONTROL_PANEL_UPDATE', this.update);

        bedbugEventsSystem.addListener('ON_RESULT_RECEIVED', this.enableStop);

        this.update();
    },

    showStopPlay: function() {
        this.play_button.visible = false;
        this.countButtonGroup.visible = true;

        // Close Stop Play Input
        this.countplay_button_stop.alpha = 0.0;
        this.countplay_button_stop.inputEnabled = false;
    },

    showPlay: function() {
        this.play_button.visible = true;
        this.countButtonGroup.visible = false;

    },

    setCount: function(count) {
        if (count == 0)
            this.play_count.visible = false;
        else
            this.play_count.visible = true;

        this.play_count.setText(count);
    },

    setCountText: function(text) {
        this.play_text.setText(text);
    },
    enableStop: function() {
        if (bedbugGameCore.settings.fast_spins) return;
        setTimeout(function() {
            // console.log("Result received: Enabling STOP button");
            Controls.enableBtn(Controls.countplay_button_stop);
        }, 100);

    },
    disableStop: function() {
        Controls.countplay_button_stop.inputEnabled = false;
        Controls.countplay_button_stop.alpha = 0;
    },
    enableBtn: function(button) {
        // console.log("HIDE CONTROLS!!");
        button.alpha = 0.5;
        button.inputEnabled = true;
    },
    update: function() {
        Controls.autoplay_stepper.setLabel(bedbugGameCore.autoplay_count);
        Controls.autoplay_count.setText(bedbugGameCore.autoplay_count);

        Controls.coin_value_stepper.setLabel(bedbugGameCore.addZeroes(bedbugGameCore.coin_value), bedbugGameCore.coin_value_current == 0, bedbugGameCore.coin_value_current == bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues.length - 1);

        // Controls.coins_label.setLabel(bedbugGameCore.numberWithSpaces(Math.round(bedbugGameCore.coins)));
        Controls.coins_heading.setText(bedbugGameCore.getLocalizedText("TXT_COINS_LABEL") + ": " + bedbugGameCore.numberWithSpaces(Math.round(bedbugGameCore.coins)));

        Controls.bet_stepper.setLabel(bedbugGameCore.bet_level, bedbugGameCore.bet_level == bedbugGameCore.bet_levels[0], bedbugGameCore.bet_level == bedbugGameCore.bet_levels[bedbugGameCore.bet_levels.length - 1]);
        // Controls.bet_level_label.setLabel(bedbugGameCore.bet_level);

        // Request to change bet coins to bet cash on Mobile UI Bet Button
        Controls.updateBetButtonLabel();
        // Controls.bet_label.setLabel(bedbugGameCore.bet_coins);

        // Time Update
        Controls.game_time.setText(Controls.getCurrentTime());
        Controls.updateUserBalance();
        Controls.updateUserWin();
        Controls.updateTotalBet();
    },
    getCurrentTime: function() {
        var currentdate = new Date();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes();
        return time;
    },

    createResponsibleOptions: function(context) {

        if (!bedbugGameCore.configuration.server_settings.responsible)
            return;

        var width = 500;
        var height = 490;

        this.responsibleOptions_panel = this.createPopupBG(context.game, width, height, true);

        var heading = new CustomLabel(context.game, bedbugGameCore.getLocalizedText("responsible_options"), width / 2, 45, 400, 50, true, {
            "bgColor": 0x000000,
            "backgroundAlpha": 1,
            font: "bold 25px Arial"
        });


        var time_per_session = new Stepper(context.game, bedbugGameCore.getLocalizedText("time_per_session"), bedbugGameCore.time_per_session, bedbugGameCore.decrTimePerSession, bedbugGameCore.incrTimePerSession, width / 2, 190, 40, 100, true, {
                font: "bold 35px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#fff",
                    font: "bold 25px Arial",
                },
                stepperBgAlpha: 1,
                stepperBgColor: 0x555555,
                backgroundAlpha: 0
            },
            true, "mobile", "TextBox2.png", "arrow"
        );

        var reality_check = new Stepper(context.game, bedbugGameCore.getLocalizedText("reality_message_interval"), bedbugGameCore.reality_message_interval, bedbugGameCore.decrRealityInterval, bedbugGameCore.incrRealityInterval, width / 2, 400, 200, 100, true, {
                font: "bold 35px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#fff",
                    font: "bold 25px Arial",
                    wordWrap: true,
                    wordWrapWidth: 300
                },
                stepperBgAlpha: 1,
                stepperBgColor: 0x555555,
                backgroundAlpha: 0
            },
            true, "mobile", "TextBox2.png", "arrow"
        );

        this.responsibleOptions_panel.add(time_per_session);
        this.responsibleOptions_panel.add(reality_check);
        this.responsibleOptions_panel.add(heading);


        this.responsibleOptions_panel.visible = false;
    },

    createOptions: function(context) {

        var width = 500;
        var height = 470;

        var sROptions = _.find(bedbugGameCore.configuration.server_settings.Game.Settings, {
            SettingName: "ResponsibleGaming"
        }).SettingValue;


        var optionsStyle = {
            bgColor: "#afa5a5",
            fill: bedbugGameCore.game_specs.messages.style.normal.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.normal.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.normal.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.normal.lineColor,
            shadow: bedbugGameCore.game_specs.messages.style.normal.shadow,
            bevel: bedbugGameCore.game_specs.messages.style.normal.bevel,
            alpha: 1.0,
            isGradient: false,
            rampColor1: bedbugGameCore.game_specs.messages.style.normal.rampColor1,
            rampColor2: bedbugGameCore.game_specs.messages.style.normal.rampColor2
        };

        // OPTIONS BG
        this.options_panel = this.createPopupBG(context.game, width, height, true, optionsStyle);
        this.options_panel.x += 10;
        this.options_panel.y -= 70;

        this.options_panel_bg = bedbugGameCore.game.add.sprite(-280, 0, "mobile", "Board.png");
        this.options_panel_bg.anchor.setTo(0, 0);
        this.options_panel.add(this.options_panel_bg);

        // OPTIONS TITLE
        this.optionsTitle = context.game.add.text(230, 35, bedbugGameCore.getLocalizedText("TXT_TITLE_OPTIONS"), {
            font: "35px Arial",
            fill: "#ffffff"
        });
        this.optionsTitle.anchor.setTo(.5, .5);
        this.optionsTitle.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.options_panel.add(this.optionsTitle);

        // OPTIONS GROUPS
        this.gameplayOptions = context.game.add.group();
        this.soundOptions = context.game.add.group();
        this.responsibleOptions = context.game.add.group();
        this.rulesOptions = context.game.add.group();

        this.options_panel.add(this.gameplayOptions);
        this.options_panel.add(this.soundOptions);
        this.options_panel.add(this.responsibleOptions);
        this.options_panel.add(this.rulesOptions);


        // OPTION TABS
        // Gameplay // button_gameplay_active_no_rp
        if (sROptions == 1)
            this.gameplayTab = context.game.add.button(-138, 93.5, 'mobile', openGameplay, this, 'button_gameplay_pressed.png', 'button_gameplay_pressed.png', 'button_gameplay_active.png');
        else
            this.gameplayTab = context.game.add.button(-98, 93.5, 'mobile', openGameplay, this, 'button_gameplay_pressed_no_rp.png', 'button_gameplay_pressed_no_rp.png', 'button_gameplay_active_no_rp.png');

        this.gameplayTab.anchor.setTo(0.5, 0.5);
        this.gameplayTab_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_GAMEPLAY_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.gameplayTab_text.anchor.setTo(.5, .5);
        this.gameplayTab_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.gameplayTab.addChild(this.gameplayTab_text);
        // ADD ANY WIN TO PANEL GROUP

        if (sROptions == 1)
            this.gameplayTab_inActive = context.game.add.button(-138, 93.5, 'mobile', openGameplay, this, 'button_gameplay_inactive.png', 'button_gameplay_inactive.png', 'button_gameplay_inactive.png');
        else
            this.gameplayTab_inActive = context.game.add.button(-98, 93.5, 'mobile', openGameplay, this, 'button_gameplay_inactive_no_rp.png', 'button_gameplay_inactive_no_rp.png', 'button_gameplay_inactive_no_rp.png');

        //this.gameplayTab_inActive.frameName = "button_gameplay_inactive.png";
        this.gameplayTab_inActive.anchor.setTo(0.5, 0.5);
        this.gameplayTab_inActive_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_GAMEPLAY_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.gameplayTab_inActive_text.anchor.setTo(.5, .5);
        this.gameplayTab_inActive_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.gameplayTab_inActive.addChild(this.gameplayTab_inActive_text);
        // ADD ANY WIN TO PANEL GROUP
        this.options_panel.add(this.gameplayTab_inActive);
        this.options_panel.add(this.gameplayTab);
        // this.gameplayTab_inActive.visible = false;

        // Sound
        if (sROptions == 1)
            this.soundTab = context.game.add.button(46, 93.5, 'mobile', openSound, this, 'button_sound_pressed.png', 'button_sound_pressed.png', 'button_sound_active.png');
        else
            this.soundTab = context.game.add.button(200, 93.5, 'mobile', openSound, this, 'button_gameplay_pressed_no_rp.png', 'button_gameplay_pressed_no_rp.png', 'button_gameplay_active_no_rp.png');

        this.soundTab.anchor.setTo(0.5, 0.5);
        this.soundTab_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_SOUND_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.soundTab_text.anchor.setTo(.5, .5);
        this.soundTab_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.soundTab.addChild(this.soundTab_text);
        // ADD ANY WIN TO PANEL GROUP

        if (sROptions == 1)
            this.soundTab_inActive = context.game.add.button(46, 93.5, 'mobile', openSound, this, 'button_sound_inactive.png', 'button_sound_inactive.png', 'button_sound_inactive.png');
        else
            this.soundTab_inActive = context.game.add.button(200, 93.5, 'mobile', openSound, this, 'button_gameplay_inactive_no_rp.png', 'button_gameplay_inactive_no_rp.png', 'button_gameplay_inactive_no_rp.png');

        // this.soundTab_inActive.frameName = "button_sound_inactive.png";
        this.soundTab_inActive.anchor.setTo(0.5, 0.5);
        this.soundTab_inActive_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_SOUND_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.soundTab_inActive_text.anchor.setTo(.5, .5);
        this.soundTab_inActive_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.soundTab_inActive.addChild(this.soundTab_inActive_text);
        // ADD ANY WIN TO PANEL GROUP
        this.options_panel.add(this.soundTab_inActive);
        this.options_panel.add(this.soundTab);
        // this.soundTab_inActive.visible = false;

        // Responsible Options
        if (sROptions == 1) {
            this.responsibleTab = context.game.add.button(324, 93.5, 'mobile', openResponsible, this, 'button_responsible_pressed.png', 'button_responsible_pressed.png', 'button_responsible_active.png');
            this.responsibleTab.anchor.setTo(0.5, 0.5);
            this.responsibleTab_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_RGO_LABEL"), {
                font: "30px Arial",
                fill: "#ffffff"
            });
            this.responsibleTab_text.anchor.setTo(.5, .5);
            this.responsibleTab_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
            // ADD TEXT AS CHILD
            this.responsibleTab.addChild(this.responsibleTab_text);
            // ADD ANY WIN TO PANEL GROUP


            this.responsibleTab_inActive = context.game.add.button(324, 93.5, 'mobile', openResponsible, this, 'button_responsible_inactive.png', 'button_responsible_inactive.png', 'button_responsible_inactive.png');
            // this.responsibleTab_inActive.frameName = "button_responsible_inactive.png";
            this.responsibleTab_inActive.anchor.setTo(0.5, 0.5);
            this.responsibleTab_inActive_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_RGO_LABEL"), {
                font: "30px Arial",
                fill: "#ffffff"
            });
            this.responsibleTab_inActive_text.anchor.setTo(.5, .5);
            this.responsibleTab_inActive_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
            // ADD TEXT AS CHILD
            this.responsibleTab_inActive.addChild(this.responsibleTab_inActive_text);
            // ADD ANY WIN TO PANEL GROUP
            this.options_panel.add(this.responsibleTab_inActive);
            this.options_panel.add(this.responsibleTab);
            // this.responsibleTab_inActive.visible = false;
        }

        // Rules
        if (sROptions == 1)
            this.rulesTab = context.game.add.button(596, 93.5, 'mobile', openRules, this, 'button_rules_pressed.png', 'button_rules_pressed.png', 'button_rules_active.png');
        else
            this.rulesTab = context.game.add.button(498, 93.5, 'mobile', openRules, this, 'button_gameplay_pressed_no_rp.png', 'button_gameplay_pressed_no_rp.png', 'button_gameplay_active_no_rp.png');

        this.rulesTab.anchor.setTo(0.5, 0.5);
        this.rulesTab_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_HELP_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.rulesTab_text.anchor.setTo(.5, .5);
        this.rulesTab_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.rulesTab.addChild(this.rulesTab_text);
        // ADD ANY WIN TO PANEL GROUP

        if (sROptions == 1)
            this.rulesTab_inActive = context.game.add.button(596, 93.5, 'mobile', openRules, this, 'button_rules_inactive.png', 'button_rules_inactive.png', 'button_rules_inactive.png');
        else
            this.rulesTab_inActive = context.game.add.button(498, 93.5, 'mobile', openRules, this, 'button_gameplay_inactive_no_rp.png', 'button_gameplay_inactive_no_rp.png', 'button_gameplay_inactive_no_rp.png');

        // this.rulesTab_inActive.frameName = "button_rules_inactive.png";
        this.rulesTab_inActive.anchor.setTo(0.5, 0.5);
        this.rulesTab_inActive_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_HELP_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.rulesTab_inActive_text.anchor.setTo(.5, .5);
        this.rulesTab_inActive_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.rulesTab_inActive.addChild(this.rulesTab_inActive_text);
        // this.rulesTab_inActive.addChild(this.rulesTab_inActive_text);
        // ADD ANY WIN TO PANEL GROUP
        this.options_panel.add(this.rulesTab_inActive);
        this.options_panel.add(this.rulesTab);
        // this.rulesTab_inActive.visible = false;


        this.gameplayTab.input.enableDrag();
        this.gameplayTab.events.onDragStop.add(onDragStop, this);

        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }

        function openGameplay() {
            this.gameplayOptions.visible = true;
            this.soundOptions.visible = false;
            this.responsibleOptions.visible = false;
            this.rulesOptions.visible = false;

            this.gameplayTab.visible = true;
            this.soundTab.visible = false;

            this.rulesTab.visible = false;

            if (sROptions == 1)
                this.responsibleTab.visible = false;
        }

        function openSound() {
            this.gameplayOptions.visible = false;
            this.soundOptions.visible = true;
            this.responsibleOptions.visible = false;
            this.rulesOptions.visible = false;

            this.gameplayTab.visible = false;
            this.soundTab.visible = true;

            this.rulesTab.visible = false;

            if (sROptions == 1)
                this.responsibleTab.visible = false;
        }

        function openResponsible() {
            this.gameplayOptions.visible = false;
            this.soundOptions.visible = false;
            this.responsibleOptions.visible = true;
            this.rulesOptions.visible = false;

            this.gameplayTab.visible = false;
            this.soundTab.visible = false;
            this.rulesTab.visible = false;

            if (sROptions == 1)
                this.responsibleTab.visible = true;
        }

        function openRules() {
            context.openGameRules();
            this.gameplayOptions.visible = false;
            this.soundOptions.visible = false;
            this.responsibleOptions.visible = false;
            this.rulesOptions.visible = true;

            this.gameplayTab.visible = false;
            this.soundTab.visible = false;
            this.rulesTab.visible = true;

            if (sROptions == 1)
                this.responsibleTab.visible = false;
        }

        // ADD CLOSE BUTTON
        this.closeOptions = context.game.add.button(720, 24, 'mobile', closeOptions, this, 'btn_close_active.png', 'btn_close_active.png', 'btn_close_pressed.png');
        this.closeOptions.anchor.setTo(0.5, 0.5);
        this.options_panel.add(this.closeOptions);

        function closeOptions() {
            this.options_panel.visible = false;
        }

        // Gameplay Options
        this.fast_spins_checkbox = new CheckΒox(380, 280, context.game, null, null, bedbugGameCore.settings.fast_spins, options, function(o) {
            bedbugGameCore.settings.fast_spins = o
        }, true, "mobile", "img_gui_switch");
        this.fast_spins_checkbox_text = context.game.add.text(-150, -20, bedbugGameCore.getLocalizedText("TXT_FAST_SPINS_TOGGLE"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.fast_spins_checkbox_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.fast_spins_checkbox.addChild(this.fast_spins_checkbox_text);
        this.gameplayOptions.add(this.fast_spins_checkbox);

        // sound options
        this.soundfx_checkbox = new CheckΒox(380, 235, context.game, null, null, bedbugGameCore.settings.sound_effects, options, function(o) {
            bedbugGameCore.settings.sound_effects = o;
            if (o)
                bedbugGameCore.sound_effects_volume = 1;
            else
                bedbugGameCore.sound_effects_volume = 0;
        }, true, "mobile", "img_gui_switch");
        this.soundfx_checkbox_text = context.game.add.text(-150, -20, bedbugGameCore.getLocalizedText("TXT_SOUND_EFFECTS_TOGGLE"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.soundfx_checkbox_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.soundfx_checkbox.addChild(this.soundfx_checkbox_text);
        this.soundOptions.add(this.soundfx_checkbox);

        this.ambiance_checkbox = new CheckΒox(380, 360, context.game, null, null, bedbugGameCore.settings.ambiance, options, function(o) {
            bedbugGameCore.settings.ambiance = o;
            context.setAmbiance(o);
        }, true, "mobile", "img_gui_switch");
        this.ambiance_checkbox_text = context.game.add.text(-150, -20, bedbugGameCore.getLocalizedText("TXT_SOUND_AMBIANCE_TOGGLE"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.ambiance_checkbox_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.ambiance_checkbox.addChild(this.ambiance_checkbox_text);
        // this.ambiance_checkbox.addChild(this.sambiance_checkbox_text);

        // this.soundOptions.add(this.ambiance_checkbox);
        this.soundOptions.add(this.ambiance_checkbox);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // RESPONSIBLE OPTIONS   ///////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.maxTime_checkbox = new CheckΒox(-90, 235, context.game, null, Responsible_Gaming.values.max_time_session, Responsible_Gaming.values.max_session_active, options, function(o, e) {
            Responsible_Gaming.values.max_session_active = o;
            if (e) Responsible_Gaming.values.max_time_session = e * 60;
        }, true, "mobile", "img_gui_switch");


        this.maxTime_checkbox_text = context.game.add.text(130, -35, bedbugGameCore.getLocalizedText("TXT_MAX_TIME_PER_SESSION_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: "400"
        });
        this.maxTime_checkbox_text.anchor.setTo(0, 0);
        // ADD TEXT AS CHILD
        this.maxTime_checkbox.addChild(this.maxTime_checkbox_text);
        this.responsibleOptions.add(this.maxTime_checkbox);

        this.maxTime_input = context.game.add.sprite(550, 235, "mobile");
        this.maxTime_input.frameName = "TextBox2.png";
        this.maxTime_input.anchor.setTo(.5, .5);
        this.responsibleOptions.add(this.maxTime_input);

        this.reality_checkbox = new CheckΒox(-90, 360, context.game, null, Responsible_Gaming.values.reality_check_interval, Responsible_Gaming.values.reality_check_active, options, function(o, e) {
            Responsible_Gaming.values.reality_check_active = o;
            if (e) Responsible_Gaming.values.reality_check_interval = e * 60
        }, true, "mobile", "img_gui_switch");
        this.reality_checkbox_text = context.game.add.text(130, -35, bedbugGameCore.getLocalizedText("TXT_REALITY_CHECK_INTERVAR_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: "400"
        });
        this.reality_checkbox_text.anchor.setTo(0, 0);
        // ADD TEXT AS CHILD
        this.reality_checkbox.addChild(this.reality_checkbox_text);
        this.responsibleOptions.add(this.reality_checkbox);

        this.reality_input = context.game.add.sprite(550, 360, "mobile");
        this.reality_input.frameName = "TextBox2.png";
        this.reality_input.anchor.setTo(.5, .5);
        this.responsibleOptions.add(this.reality_input);





        this.gameplayOptions.visible = true;
        this.soundOptions.visible = false;
        this.responsibleOptions.visible = false;
        this.rulesOptions.visible = false;

        this.gameplayTab.visible = true;
        this.soundTab.visible = false;
        this.rulesTab.visible = false;

        if (sROptions == 1)
            this.responsibleTab.visible = false;

        var options = {
            checkBoxLine: 3,
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 320
        };




        // if (bedbugGameCore.configuration.server_settings.responsible)
        //     var responsible_options_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("responsible_options"), width / 2, height - 60, 400, 60, this.openResponsibleOptions, this, false, {
        //         font: "bold 28px Arial",
        //         wordWrap: true,
        //         wordWrapWidth: 400,
        //         // bgColor: 0xFFFFFF,
        //         // backgroundAlpha: 1,
        //         fill: "#D86026",
        //         bgColor: 0xFFFFFF,
        //         backgroundAlpha: 1,
        //         // fill: "#000",
        //         align: 'center',
        //         boundsAlignH: 'top'
        //     });

        // if (bedbugGameCore.configuration.server_settings.responsible)
        //     this.options_panel.add(responsible_options_button);

        this.options_panel.visible = false;
    },

    updateBetButtonLabel: function() {
        var bet = bedbugGameCore.formatMoney(bedbugGameCore.bet_cash);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        bet = (symbolPosition == 0 || symbolPosition == 2) ? symbol + bet : bet + symbol;
        this.bet_heading.setText(bedbugGameCore.getLocalizedText("TXT_BET_LABEL") + ": " + bet);
    },

    updateTotalBet: function() {
        var bet = bedbugGameCore.formatMoney(bedbugGameCore.bet_cash);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        bet = (symbolPosition == 0 || symbolPosition == 2) ? symbol + bet : bet + symbol;
        this.total_bet_box.setLabel(bet);
        this.total_bet_coins_box.setLabel(bedbugGameCore.bet_coins);
        this.bet_Label.setText(bedbugGameCore.getLocalizedText("TXT_BET_LABEL") + ": " + bedbugGameCore.bet_coins);
    },

    updateUserBalance: function() {
        var balance = bedbugGameCore.formatMoney(bedbugGameCore.balance);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        balance = (symbolPosition == 0 || symbolPosition == 2) ? symbol + balance : balance + symbol;
        //this.balance_label.setLabel(balance);
        this.balance_label_heading.setText(bedbugGameCore.getLocalizedText("TXT_BALANCE_LABEL") + ": " + balance);
    },

    updateUserWin: function() {
        var win = bedbugGameCore.formatMoney(bedbugGameCore.win);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        win = (symbolPosition == 0 || symbolPosition == 2) ? symbol + win : win + symbol;
        //this.win_label.setLabel(win);
        this.win_label_heading.setText(bedbugGameCore.getLocalizedText("TXT_WIN_LABEL") + ": " + win);
    },

    openOptionsPanel: function() {
        console.log(bedbugGameCore.controls_enabled);
        if (!bedbugGameCore.controls_enabled) return;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        Controls.options_panel.visible = true;
    },
    openResponsibleOptions: function() {
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        Controls.responsibleOptions_panel.visible = true;
    },
    openBetPanel: function() {
        if (!bedbugGameCore.controls_enabled) return;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        Controls.bet_panel.visible = true;
    },

    openAutoplayPanel: function() {
        if (!bedbugGameCore.controls_enabled) return;

        // FIX: On Autoplay panel open reset stepper to 0
        bedbugGameCore.autoplay_current_step = 0;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        Controls.autoplay_panel.visible = true;
    },

    stopAutoplay: function() {
        var that = this;
        that.play_button.alpha = 1;
        that.showPlay();
        that.play_button.inputEnabled = true;
        // that.countButtonGroup.alpha = 0;
        that.countplay_button_stop.inputEnabled = true;
        that.autoplay_stop_button.visible = false;
        that.autoplay_button.visible = true;
        that.autoplay_count.visible = false;

        bedbugGameCore.autoplay_started = false;
        bedbugGameCore.autoplay_count = 0;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    createAutoplayPanel: function(context) {
        var that = this;
        var width = 500;
        var height = 500;

        this.autoplay_Panel_Bg = bedbugGameCore.game.add.sprite(-270, -10, "mobile", "Board.png");
        this.autoplay_Panel_Bg.anchor.setTo(0, .0);
        this.autoplay_Panel_Bg.inputEnabled = true;
        this.autoplay_Panel_Bg2 = bedbugGameCore.game.add.sprite(-270, -10, "mobile", "Board.png");
        this.autoplay_Panel_Bg2.anchor.setTo(0, .0);
        this.autoplay_Panel_Bg2.inputEnabled = true;

        var autoPlayStyle = {
            bgColor: "#afa5a5",
            fill: bedbugGameCore.game_specs.messages.style.normal.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.normal.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.normal.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.normal.lineColor,
            shadow: bedbugGameCore.game_specs.messages.style.normal.shadow,
            bevel: bedbugGameCore.game_specs.messages.style.normal.bevel,
            alpha: 0.0,
            isGradient: false,
            rampColor1: bedbugGameCore.game_specs.messages.style.normal.rampColor1,
            rampColor2: bedbugGameCore.game_specs.messages.style.normal.rampColor2
        };

        this.autoplay_panel = this.createPopupBG(context.game, width, height, true, autoPlayStyle, closeAutoplayPanel);
        this.autoplay_panel2 = this.createPopupBG(context.game, width, height, false, autoPlayStyle);
        this.autoplay_panel.add(this.autoplay_Panel_Bg);
        this.autoplay_panel2.add(this.autoplay_Panel_Bg2);

        this.autoplay_panel.y -= 50;
        this.autoplay_panel2.y -= 50;

        function checkAutoplayStatusAndPlay() {
            if (bedbugGameCore.autoplay_count > 0) {
                that.countplay_button_stop.inputEnabled = false;
                that.autoplay_stop_button.visible = true;
                that.autoplay_button.visible = false;
                if (!bedbugGameCore.reels_spinning) {
                    that.play_button.alpha = 0.3;
                    that.play_button.inputEnabled = false;
                    context.spin();
                }
            }
        }

        this.autoplay_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText("TXT_TOTAL_ROUNDS_LABEL"), bedbugGameCore.autoplay_count, context.decrAutoplayCount, context.incrAutoplayCount, width / 2, 200, 40, 130, true, {
                font: "bold 35px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#FFF"
                },
                stepperBgAlpha: 1,
                stepperBgColor: 0x555555,
                backgroundAlpha: 0
            },
            true, "mobile", "TextBox2.png", "arrow"
        );
        this.autoplay_panel.add(this.autoplay_stepper);

        var options = {
            checkBoxLine: 3,
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 100
        };

        // AUTOPLAY PANEL 1 TITLE
        this.panel1Title = context.game.add.text(250, 26, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), {
            font: "35px Arial",
            fill: "#ffffff"
        });
        this.panel1Title.anchor.setTo(.5, .5);
        this.panel1Title.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_panel.add(this.panel1Title);

        // STOP AT ANY WIN
        this.stop_any_checkbox = new CheckΒox(400, 330, context.game, null, null, bedbugGameCore.autoplay_setup.on_win.checked, options, function(o) {
            bedbugGameCore.autoplay_setup.on_win.checked = o
        }, true, "mobile", "img_gui_switch");
        this.stop_any_text = context.game.add.text(-150, -20, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_ANY"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.stop_any_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.stop_any_checkbox.addChild(this.stop_any_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel.add(this.stop_any_checkbox);

        // ADD BUTTON TO NEXT PANEL
        this.advancedOptions = context.game.add.button(30, 480, 'mobile', openAutoplayPanel2, this, 'btn_advanced_pressed.png', 'btn_advanced_pressed.png', 'btn_advanced_active.png');
        this.advancedOptions.anchor.setTo(0.5, 0.5);
        this.advanced_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_ADVANCED_OPTIONS"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.advanced_text.anchor.setTo(.5, .5);
        this.advanced_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.advancedOptions.addChild(this.advanced_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel.add(this.advancedOptions);


        // ADD Start Autoplay BUTTON TO NEXT PANEL
        this.advancedOptions = context.game.add.button(450, 480, 'mobile', startAutoplayPanel, this, 'btn_advanced_pressed.png', 'btn_advanced_pressed.png', 'btn_advanced_active.png');
        this.advancedOptions.anchor.setTo(0.5, 0.5);
        this.advanced_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_START_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.advanced_text.anchor.setTo(.5, .5);
        this.advanced_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.advancedOptions.addChild(this.advanced_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel.add(this.advancedOptions);

        // ADD CLOSE BUTTON
        this.backToGame = context.game.add.button(740, 15, 'mobile', closeAutoplayPanel, this, 'btn_close_pressed.png', 'btn_close_pressed.png', 'btn_close_active.png');
        this.backToGame.anchor.setTo(0.5, 0.5);
        this.autoplay_panel.add(this.backToGame);

        function openAutoplayPanel2() {
            console.log("Open Panel");
            this.autoplay_panel.visible = false;
            this.autoplay_panel2.visible = true;
        }

        function startAutoplayPanel() {
            checkAutoplayStatusAndPlay();
            this.autoplay_panel.visible = false;
            this.autoplay_panel2.visible = false;
        }

        function closeAutoplayPanel() {
            bedbugGameCore.autoplay_started = false;
            bedbugGameCore.autoplay_count = 0;
            bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');

            that.autoplay_panel.visible = false;
            that.autoplay_panel2.visible = false;
        }

        function closeAutoplayPanel2() {
            this.autoplay_panel.visible = true;
            this.autoplay_panel2.visible = false;
        }

        // AUTOPLAY PANEL 1 TITLE
        this.panel2Title = context.game.add.text(250, 26, bedbugGameCore.getLocalizedText("TXT_ADVANCED_OPTIONS"), {
            font: "35px Arial",
            fill: "#ffffff"
        });
        this.panel2Title.anchor.setTo(.5, .5);
        this.panel2Title.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_panel2.add(this.panel2Title);

        // STOP AT WIN AMOUNT
        this.stop_win_amount = new CheckΒox(280, 140, context.game, null, bedbugGameCore.autoplay_setup.on_win_amount.value, bedbugGameCore.autoplay_setup.on_win_amount.checked, _.merge(options, { isMoney: false, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT") }), function(o, e) {
            bedbugGameCore.autoplay_setup.on_win_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_win_amount.value = e
        }, true, "mobile", "img_gui_switch");
        this.stop_win_text = context.game.add.text(-140, -20, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.stop_win_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.stop_win_amount.addChild(this.stop_win_text);

        // STOP AT CASH
        this.stop_cash_amount = new CheckΒox(280, 260, context.game, null, bedbugGameCore.autoplay_setup.on_cash_amount.value, bedbugGameCore.autoplay_setup.on_cash_amount.checked, _.merge(options, { isMoney: true, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_CASH") }), function(o, e) {
            bedbugGameCore.autoplay_setup.on_cash_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_cash_amount.value = e;
        }, true, "mobile", "img_gui_switch");
        this.stop_cash_text = context.game.add.text(-140, -20, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_CASH"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.stop_cash_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.stop_cash_amount.addChild(this.stop_cash_text);

        // STOP AT TIME
        this.stop_time = new CheckΒox(280, 380, context.game, null, bedbugGameCore.autoplay_setup.on_time.value, bedbugGameCore.autoplay_setup.on_time.checked, _.merge(options, { isTime: true, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME") }), function(o, e, m) {
            bedbugGameCore.autoplay_setup.on_time.checked = o;
            if (e && m) bedbugGameCore.autoplay_setup.on_time.value = [e, m];
        }, true, "mobile", "img_gui_switch");
        this.stop_time_text = context.game.add.text(-140, -20, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.stop_time_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.stop_time.addChild(this.stop_time_text);

        // STOP AT LOSE
        this.stop_lose = new CheckΒox(280, 500, context.game, null, bedbugGameCore.autoplay_setup.on_lose.value, bedbugGameCore.autoplay_setup.on_lose.checked, _.merge(options, { isMoney: true, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE") }), function(o, e) {
            bedbugGameCore.autoplay_setup.on_lose.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_lose.value = e;
        }, true, "mobile", "img_gui_switch");
        this.stop_lose_text = context.game.add.text(-140, -20, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.stop_lose_text.anchor.setTo(1, 0);
        // ADD TEXT AS CHILD
        this.stop_lose.addChild(this.stop_lose_text);

        // ADD Back BUTTON
        this.backToAutoplay = context.game.add.button(740, 15, 'mobile', closeAutoplayPanel2, this, 'btn_back_pressed.png', 'btn_back_pressed.png', 'btn_back_active.png');
        this.backToAutoplay.anchor.setTo(0.5, 0.5);
        this.autoplay_panel2.add(this.backToAutoplay);


        this.autoplay_panel2.add(this.stop_lose);
        this.autoplay_panel2.add(this.stop_time);
        this.autoplay_panel2.add(this.stop_cash_amount);

        this.autoplay_panel2.add(this.stop_win_amount);

        this.autoplay_panel.visible = false;
        this.autoplay_panel2.visible = false;

        // ///////////// DRAG INFO
        // this.panel1Title.inputEnabled = true;
        // this.panel1Title.blockInput = true;
        // this.panel1Title.input.enableDrag();
        // this.panel1Title.events.onDragStop.add(onDragStop, this);
        // function onDragStop(sprite, pointer) {
        //     console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        // }
    },

    createBetPanel: function(context) { // Themis Popup to change

        var width = 780;
        var height = 420;

        this.bet_Panel_Bg = bedbugGameCore.game.add.sprite(-160, -30, "mobile", "Board.png");
        this.bet_Panel_Bg.inputEnabled = true;
        this.bet_Panel_Bg.anchor.setTo(0, .0);

        var betPanelStyle = {
            bgColor: "#afa5a5",
            fill: bedbugGameCore.game_specs.messages.style.normal.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.normal.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.normal.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.normal.lineColor,
            shadow: bedbugGameCore.game_specs.messages.style.normal.shadow,
            bevel: bedbugGameCore.game_specs.messages.style.normal.bevel,
            alpha: 1.0,
            isGradient: false,
            rampColor1: bedbugGameCore.game_specs.messages.style.normal.rampColor1,
            rampColor2: bedbugGameCore.game_specs.messages.style.normal.rampColor2
        };

        this.bet_panel = this.createPopupBG(context.game, width, height, true, betPanelStyle);
        this.bet_panel.x += 25;
        this.bet_panel.y -= 65;

        this.bet_panel.add(this.bet_Panel_Bg);

        // ADD CLOSE BUTTON
        this.closeBet = context.game.add.button(847, -5, 'mobile', closeABetPanel, this, 'btn_close_pressed.png', 'btn_close_pressed.png', 'btn_close_active.png');
        this.closeBet.anchor.setTo(0.5, 0.5);
        this.bet_panel.add(this.closeBet);

        function closeABetPanel() {

            this.bet_panel.visible = false;
        }



        // AUTOPLAY PANEL 1 TITLE
        this.betPanelTitle = context.game.add.text(360, 5, bedbugGameCore.getLocalizedText("TXT_SET_BET_LABEL"), {
            font: "35px Arial",
            fill: "#ffffff"
        });
        this.betPanelTitle.anchor.setTo(.5, .5);
        this.betPanelTitle.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.bet_panel.add(this.betPanelTitle);

        this.betPanelTitle2 = context.game.add.text(195, 100, bedbugGameCore.getLocalizedText("TXT_TOTAL_BET_LABEL"), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.betPanelTitle2.anchor.setTo(.5, .5);
        this.betPanelTitle2.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.bet_panel.add(this.betPanelTitle2);

        // ADD BUTTON MAX BET
        this.max_bet_button = context.game.add.button(165, 465, 'mobile', context.setMaxBet, context, 'btn_maxbet_pressed.png', 'btn_maxbet_pressed.png', 'btn_maxbet_active.png');
        this.max_bet_button.anchor.setTo(0.5, 0.5);
        this.max_bet_button_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), {
            font: "30px Arial",
            fill: "#ffffff"
        });
        this.max_bet_button_text.anchor.setTo(.5, .5);
        this.max_bet_button_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        this.max_bet_button.addChild(this.max_bet_button_text);
        // ADD ANY WIN TO PANEL GROUP
        this.bet_panel.add(this.max_bet_button);

        this.bet_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText('TXT_BET_LEVEL_LABEL'), bedbugGameCore.bet_level, bedbugGameCore.decrBetLevel, bedbugGameCore.incrBetLevel, 590, 380, 40, 100, true, {
                font: "bold 35px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#FFF"
                },
                stepperBgAlpha: 1,
                stepperBgColor: 0x555555,
                backgroundAlpha: 0
            },
            true, "mobile", "TextBox2.png", "arrow", false
        );
        this.bet_panel.add(this.bet_stepper);

        this.coin_value_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText("TXT_COIN_VALUE_LABEL"), bedbugGameCore.coin_value, bedbugGameCore.decrCoinValue, bedbugGameCore.incrCoinValue, 590, 190, 40, 100, true, {
                font: "bold 35px Arial",
                fill: "#FFF",
                stepperBgAlpha: 1,
                stepperBgColor: 0x555555,
                heading: {
                    fill: "#FFF"
                },
                backgroundAlpha: 0
            },
            true, "mobile", "TextBox2.png", "arrow", false
        );

        this.bet_panel.add(this.coin_value_stepper);


        this.total_bet_box = new ValueBox(context.game, bedbugGameCore.getLocalizedText("TXT_CASH_LABEL"), bedbugGameCore.coin_value, 195, 165, 250, 100, true, {
            font: "bold 35px Arial",
            fill: "#FFF",
            heading: {
                fill: "#FFF"
            },
            stepperBgAlpha: 0.1,
            stepperBgColor: 0x000000,
            backgroundAlpha: 1
        }, true);
        this.bet_panel.add(this.total_bet_box);


        this.total_bet_coins_box = new ValueBox(context.game, bedbugGameCore.getLocalizedText("TXT_COINS_LABEL"), bedbugGameCore.bet_coins, 195, 305, 250, 100, true, {
                font: "bold 35px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#FFF"
                },
                stepperBgAlpha: 0.1,
                stepperBgColor: 0x000000,
                backgroundAlpha: 0
            },
            true, "mobile", "TextBox2.png", "arrow"
        );

        this.bet_panel.add(this.total_bet_coins_box);
        Controls.updateTotalBet();

        this.bet_panel.visible = false;


    },
    openPaytableClose: function(game) {
        this.close_button2.visible = true;
        this.chevronRight.visible = true;
        this.chevronLeft.visible = true;
    },
    hideControls: function(game) {

        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = true;
        }
        for (var i = 0; i < this.buttonArray.length; i++) {
            this.buttonArray[i].visible = false;
        }

    },
    showControls: function(game) {

        for (var i = 0; i < this.buttonArray.length; i++) {
            this.buttonArray[i].visible = true;
        }
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = false;
        }

    },
    createPopupBG: function(game, width, height, shouldCloseExternalClick, style, onClickOutsideCallback) {

        var prestyle = {
            bgColor: bedbugGameCore.game_specs.messages.style.normal.bgColor,
            fill: bedbugGameCore.game_specs.messages.style.normal.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.normal.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.normal.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.normal.lineColor,
            shadow: bedbugGameCore.game_specs.messages.style.normal.shadow,
            bevel: bedbugGameCore.game_specs.messages.style.normal.bevel,
            alpha: bedbugGameCore.game_specs.messages.style.normal.alphacreatePopupBG,
            isGradient: bedbugGameCore.game_specs.messages.style.normal.gradient,
            rampColor1: bedbugGameCore.game_specs.messages.style.normal.rampColor1,
            rampColor2: bedbugGameCore.game_specs.messages.style.normal.rampColor2
        };

        prestyle = _.merge(prestyle, style);

        var popup = game.add.group();

        var panel_block_input = game.add.graphics(0, 0);
        panel_block_input.beginFill(0x000000, 0.3);
        panel_block_input.drawRect(-100, -100, 1680, 1000);
        panel_block_input.endFill();

        panel_block_input.inputEnabled = true;

        panel_block_input.events.onInputUp.add(function(btn) {
            if (shouldCloseExternalClick) {
                popup.visible = false;
            }
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            if (onClickOutsideCallback)
                onClickOutsideCallback();

        }, this);

        if (!prestyle.isGradient) {
            var panel_background = game.add.graphics(0, 0);
            panel_background.lineStyle(5, prestyle.lineColor, 1);
            panel_background.beginFill(prestyle.bgColor, 1);
            panel_background.drawRoundedRect(0, 0, width, height, 25);
            panel_background.endFill();
            panel_background.inputEnabled = true;
        }
        else {

            var panel_background = game.add.sprite(0, 0, "mobile", "Paytable_Back.png");
            panel_background.inputEnabled = true;
            //panel_background.scale.setTo(1.2, 1.2);
        }

        if (prestyle.bevel) {
            var panel_background_bevel = game.add.graphics(0, 0);
            panel_background_bevel.beginFill(prestyle.headingBgColor, .7);
            panel_background_bevel.drawRoundedRect(-3, 3, panel_background.width, panel_background.height, 25);
            panel_background_bevel.endFill();
        }
        if (prestyle.shadow) {
            var panel_background_shadow = game.add.graphics(0, 0);
            panel_background_shadow.beginFill(0x000000, .4);
            panel_background_shadow.drawRoundedRect(10, 10, panel_background.width, panel_background.height, 25);
            panel_background_shadow.endFill();
        }
        popup.add(panel_block_input);
        popup.add(panel_background_shadow);
        popup.add(panel_background_bevel);
        popup.add(panel_background);

        popup.x = 640 - (panel_background.width / 2);
        popup.y = 360 - (panel_background.height / 2);

        panel_block_input.x -= popup.x;
        panel_block_input.y -= popup.y;

        return popup;
    },

    /***************************************************************************
     *  This method creates the paytable info for the theme
     ***************************************************************************/
    createPaytable: function(context) {
        var that = this;

        /***********************************************************************
         *    Helper Method to extract rewards from the Intralot RGS Response
         */
        var prizesList = bedbugGameCore.configuration.server_settings.Game.PayTables[0].Prizes;
        var prizes = [];

        _.each(prizesList, function(prize) {
            prizes.push(prize.PrizeLines[0]);
        })

        function getAward(symbolName, quantity) {
            return _.find(prizes, {
                PrizeCode: symbolName,
                RequiredQty: quantity
            }).WinAmount;
        }

        /*
         ***********************************************************************/

        context.paytable = context.game.add.group();
        context.paytable.visible = false;
        // context.paytable.scale.setTo(.7,.7);
        context.panel_pages = 4;
        context.page_bullets = context.game.add.group();

        var panel_height = 600;
        var panel_width = 762;
        var panel_x = (context.game.width / 2 - panel_width / 2);
        var panel_y = 20;

        var paytable_area = Controls.createPopupBG(context.game, panel_width, panel_height + 30, false, null, function() {
            hidePaytable();
        });


        paytable_area.y -= 30;
        context.paytable.x = 0;

        context.paytable.add(paytable_area);

        var legal_text = context.game.add.text(panel_x + panel_width / 2, panel_y + panel_height - 150, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_GENERAL_INFO"), {
            font: '18px Arial',
            fill: '#fff',
            align: 'center',

            wordWrap: true,
            wordWrapWidth: panel_width + 100
        });
        legal_text.lineSpacing = -2;

        legal_text.anchor.set(0.5, 0);
        context.paytable.add(legal_text);


        var headingStyle = {
            'font': 'bold 45px Arial',
            'fontWeight': 'bold',
            'fill': '#fff',
            // backgroundColor: "#ffff00"
        };
        var left = 25;

        /* PAGE 1 */
        var screen1 = context.game.add.group();
        // WILD SYMBOL
        var wildsymbol = getSymbol(bedbugGameCore.symbolNameToID("WILD"), (panel_width) + 10, 180, 130, getAward("WILD", "5"), getAward("WILD", "4"), getAward("WILD", "3"), true);
        var wildText = context.game.add.text(wildsymbol.x + 50, wildsymbol.y + 130, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"), {
            'font': '22px Arial',
            'fill': '#fff',
            'align': 'right',
            wordWrap: true,
            wordWrapWidth: "400"
        });
        wildText.anchor.setTo(1, 0.5);

        // SCATTER SYMBOL
        var scattersymbol = getSymbol(bedbugGameCore.symbolNameToID("SCATTER"), left + 70, 180, 130, getAward("SCATTER", "5") + " + 15 " + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"), getAward("SCATTER", "4") + " + 10 " + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"), getAward("SCATTER", "3") + " + 5 " + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"));

        var scatterText = context.game.add.text(left + 30, scattersymbol.y + 70, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_01"), {
            'font': ' 22px Arial',
            'fill': '#fff',
            'align': 'left',
            wordWrap: true,
            wordWrapWidth: "400"
        });

        // FREE SPINS TEXT
        var freeSpinsText = context.game.add.text(panel_width / 2 + 45, 360, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"), {
            'font': ' 22px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "700"
        });
        freeSpinsText.anchor.setTo(0.5, 0);

        var freeSpinsText2 = context.game.add.text(panel_width / 2 + 45, 400, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_05") + "\n" + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_06"), {
            'font': ' 22px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "700"
        });
        freeSpinsText2.anchor.setTo(0.5, 0);
        // screen1.add(screen1_heading);
        screen1.add(wildsymbol);
        screen1.add(scattersymbol);
        screen1.add(wildText);
        screen1.add(scatterText);
        screen1.add(freeSpinsText);
        screen1.add(freeSpinsText2);


        /* PAGE 3 */
        var screen3 = context.game.add.group();
        // var screen3_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen3_heading.anchor.setTo(0.5, 0.5);
        // screen3_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var symbol1 = getSymbol(bedbugGameCore.symbolNameToID("H2"), left + 205, 200, 130, getAward("H2", "5"), getAward("H2", "4"), getAward("H2", "3"), false);
        var symbol2 = getSymbol(bedbugGameCore.symbolNameToID("H1"), left + 500, 210, 130, getAward("H1", "5"), getAward("H1", "4"), getAward("H1", "3"));
        var symbol3 = getSymbol(bedbugGameCore.symbolNameToID("M3"), left + 95, 390, 130, getAward("M3", "5"), getAward("M3", "4"), getAward("M3", "3"));
        var symbol4 = getSymbol(bedbugGameCore.symbolNameToID("M2"), left + 350, 390, 130, getAward("M2", "5"), getAward("M2", "4"), getAward("M2", "3"));
        var symbol5 = getSymbol(bedbugGameCore.symbolNameToID("M1"), left + 615, 390, 130, getAward("M1", "5"), getAward("M1", "4"), getAward("M1", "3"));
        screen3.add(symbol1);
        screen3.add(symbol2);
        screen3.add(symbol3);
        screen3.add(symbol4);
        screen3.add(symbol5);
        // screen3.add(screen3_heading);



        /* PAGE 4 */
        var screen4 = context.game.add.group();
        // var screen4_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen4_heading.anchor.setTo(0.5, 0.5);
        // screen4_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var symbol6 = getSymbol(bedbugGameCore.symbolNameToID("L5"), left + 215, 200, 130, getAward("L5", "5"), getAward("L5", "4"), getAward("L5", "3"));
        var symbol7 = getSymbol(bedbugGameCore.symbolNameToID("L4"), left + 495, 200, 130, getAward("L4", "5"), getAward("L4", "4"), getAward("L4", "3"));
        var symbol8 = getSymbol(bedbugGameCore.symbolNameToID("L3"), left + 95, 380, 130, getAward("L3", "5"), getAward("L3", "4"), getAward("L3", "3"));
        var symbol9 = getSymbol(bedbugGameCore.symbolNameToID("L2"), left + 350, 380, 130, getAward("L2", "5"), getAward("L2", "4"), getAward("L2", "3"));
        var symbol10 = getSymbol(bedbugGameCore.symbolNameToID("L1"), left + 605, 380, 130, getAward("L1", "5"), getAward("L1", "4"), getAward("L1", "3"));
        screen4.add(symbol6);
        screen4.add(symbol7);
        screen4.add(symbol8);
        screen4.add(symbol9);
        screen4.add(symbol10);
        // screen4.add(screen4_heading);


        // Sort the lines array by name in order to apear in the right order in the paytable
        bedbugGameCore.game_specs.lines = _.orderBy(bedbugGameCore.game_specs.lines, ["id"]);

        var lineChunks = _.chunk(bedbugGameCore.game_specs.lines, 30);

        /* PAGE 5 */
        var screen5 = context.game.add.group();
        // this.paytable.add(screen5);
        // var screen5_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_betlines_heading"), headingStyle);
        // screen5_heading.anchor.setTo(0.5, 0.5);
        // // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        // screen5.add(screen5_heading);

        var columnCount = 0;
        var column = 0;
        var row = 0;
        _.each(lineChunks[0], function(line, id) {
            var lineMap = new WinningLineMap(context.game, line.id, line, 10, 10, 2);

            if (columnCount % 5 == 0 && columnCount > 0) {
                column = 0;
                row++;
            };
            lineMap.x = left + 80 + (column * 140);
            lineMap.y = 100 + (row * 75);
            screen5.add(lineMap);
            columnCount++;
            column++;
        });


        screen1.scale = screen3.scale = screen4.scale = screen5.scale = {
            x: 0.9,
            y: 0.9
        };

        // Page Index
        context.paytablePageIndex = 0; // Set to 0 every time this opens

        slider.createSlider({
            customSliderBG: false,
            mode: "horizontal",
            showHandles: false,
            sliderBG: 0x202020,
            sliderBGAlpha: 0.01,
            width: panel_width,
            height: panel_height,
            x: panel_x + context.paytable.x,
            y: panel_y,
            objects: [screen1, screen3, screen4, screen5]
        });


        // The close buton
        // Close button is  a center component. Many alignments are based on this.
        // var close_button = new CustomButton(context.game, "X", panel_x + 90, panel_y + panel_height -30, 40, 40, hidePaytable, null, false, {
        //     font: "bold 30px Arial"
        // }, false);
        var close_button = bedbugGameCore.game.add.button(panel_x + 90, panel_y + panel_height - 30, 'mobile', hidePaytable, this, 'btn_close_pressed.png', 'btn_close_pressed.png', 'btn_close_active.png');
        close_button.anchor.setTo(.5, .5);
        close_button.scale.setTo(0.5, 0.5);
        close_button.alpha = 0;

        this.close_button2 = bedbugGameCore.game.add.button(1136, 63, 'mobile', hidePaytable, this, 'btn_close_pressed.png', 'btn_close_pressed.png', 'btn_close_active.png');
        this.close_button2.anchor.setTo(.5, .5);
        this.close_button2.visible = false;
        //close_button.scale.setTo(0.5, 0.5);




        function hidePaytable() {
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            bedbugGameCore.paytableIsShowing = false;
            context.paytable.visible = false;
            slider.hideSlider();
            that.close_button2.visible = false;
            that.chevronRight.visible = false;
            that.chevronLeft.visible = false;
        }



        context.current_bullet = 0;

        this.chevronRight = bedbugGameCore.game.add.button(50, 0, 'mobile', chevronRightPress, this, 'paytable_arrow_right_pressed.png', 'paytable_arrow_right_pressed.png', 'paytable_arrow_right_active.png');
        //chevronRight.scale.setTo(0.5, 0.5);

        this.chevronRight.x = 1085;
        this.chevronRight.y = 250;
        this.chevronRight.scale.setTo(1.2, 1.2);
        this.chevronRight.visible = false;
        // chevronRight.inputEnabled = true;
        // chevronRight.events.onInputDown.add(function(e, pointer) {
        //     bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
        //     if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
        //     context.drawBullets(context.current_bullet);
        //     slider.goToNext();
        // }, slider);



        this.chevronLeft = bedbugGameCore.game.add.button(50, 0, 'mobile', chevronLeftPress, this, 'paytable_arrow_left_pressed.png', 'paytable_arrow_left_pressed.png', 'paytable_arrow_left_active.png');
        //chevronLeft.scale.setTo(0.5, 0.5);


        this.chevronLeft.x = 150;
        this.chevronLeft.y = 250;
        this.chevronLeft.scale.setTo(1.2, 1.2);
        this.chevronLeft.visible = false;
        // chevronLeft.inputEnabled = true;
        // chevronLeft.events.onInputDown.add(function(e, pointer) {
        //     bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
        //     if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
        //     context.drawBullets(context.current_bullet);
        //     slider.goToPrev();
        // }, slider);
        // chevronLeft.input.enableDrag();
        // chevronLeft.events.onDragStop.add(onDragStop, this);
        // chevronRight.input.enableDrag();
        // chevronRight.events.onDragStop.add(onDragStop, this);
        // function onDragStop(sprite, pointer) {
        //     console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        // }
        function chevronLeftPress() {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
            context.drawBullets(context.current_bullet);

            context.paytablePageIndex--; // Add one and then check
            turnToPage(context.paytablePageIndex);
            //slider.goToPrev();
        }

        function chevronRightPress() {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
            context.drawBullets(context.current_bullet);
            context.paytablePageIndex++; // Add one and then check
            turnToPage(context.paytablePageIndex);
            // slider.goToNext();
        }

        function turnToPage(id) {
            // console.log(context.paytablePageIndex);

            if (id < 0) id = context.panel_pages - 1;
            if (id > context.panel_pages - 1) id = 0;

            context.paytablePageIndex = id;

            context.current_bullet = id;
            context.drawBullets(context.current_bullet);
            slider.moveToSlide(id);
        }

        // context.paytable.add(this.chevronRight);
        // context.paytable.add(this.chevronLeft);

        slider.hideSlider();

        var bullet_size = 150
        context.page_bullets.x = panel_width / 2 + bullet_size;
        context.page_bullets.y = close_button.y;

        // Bullets

        // context.drawBullets = function(index) {
        //     context.page_bullets.removeAll(true);
        //     var bullets = bedbugGameCore.game.add.sprite(0, 0,"mobile");
        //     _.times(context.panel_pages, function(i) {
        //         if (i == index) {
        //             // bullets.lineStyle(0);
        //             // bullets.beginFill(0xFFFFFF, 1);
        //              bullets.frameName = "PageNavigation_pressed.png";
        //         }
        //         else {
        //             // bullets.lineStyle(2, 0xFFFFFF);
        //             bullets.frameName = "PageNavigation_inactive.png";
        //         }
        //         // bullets.drawCircle((bullet_size + 10) * i, 0, bullet_size);
        //         // bullets.endFill();
        //         bullets.x = 10 * i;
        //         // console.log(bullets.x);
        //         // console.log(index);
        //     })

        //     context.page_bullets.add(bullets);
        //     console.log(context.page_bullets.length);
        // }
        context.drawBullets = function(index) {
            context.page_bullets.removeAll(true);

            _.times(context.panel_pages, function(i) {
                var bullets = bedbugGameCore.game.add.sprite(0, 0, "mobile");
                if (i == index) {

                    bullets.frameName = "PageNavigation_pressed.png";
                }
                else {

                    bullets.frameName = "PageNavigation_inactive.png";
                }

                bullets.x = 60 * i;
                bullets.anchor.setTo(.5, .5);
                context.page_bullets.add(bullets);
                //console.log(context.page_bullets.length);
            })



        }


        context.paytable.add(context.page_bullets);
        context.drawBullets(context.current_bullet);

        var client_version = context.game.add.text(panel_x + panel_width - 110, close_button.y, "Client v" + bedbugGameCore.game_specs.version, {
            font: '14px Arial',
            fill: '#fff',
            align: 'left'
        })
        context.paytable.add(client_version);

        function getSymbol(symbolID, x, y, dimension, points5, points4, points3, left, points2) {
            var point_style = {
                'font': '18px Arial',
                'fill': '#ffba00'
            };


            var symbol = new bedbugGameCore.Slots[symbolID](context.game, 1, x, y, dimension, dimension);

            if (points5) {
                if (!left) {
                    var coins5 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 20, "5 " + points5, point_style);
                    var coins4 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 55, "4 " + points4, point_style);
                    var coins3 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 85, "3 " + points3, point_style);
                    if (points2)
                        var coins2 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 115, "2 " + points2, point_style);

                }
                else {
                    var coins5 = context.game.add.text(-150, -dimension / 2 + 20, "5 " + points5, point_style);
                    var coins4 = context.game.add.text(-150, -dimension / 2 + 55, "4 " + points4, point_style);
                    var coins3 = context.game.add.text(-150, -dimension / 2 + 85, "3 " + points3, point_style);
                    if (points2)
                        var coins2 = context.game.add.text(-150, -dimension / 2 + 115, "2 " + points2, point_style);
                }
                coins5.addColor('#fff', 2);
                coins4.addColor('#fff', 2);
                coins3.addColor('#fff', 2);

                symbol.addChild(coins5);
                symbol.addChild(coins4);
                symbol.addChild(coins3);
                if (points2) {
                    coins2.addColor('#fff', 2);
                    symbol.addChild(coins2);
                }
            }
            return symbol;
        }

        context.paytable.add(close_button);
        //context.paytable.add(close_button2);

    },
    onSpinStarted: function() {
        bedbugGameCore.win = 0;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
        if (UnifiedPanel) UnifiedPanel.setUserWin();
    },
};
