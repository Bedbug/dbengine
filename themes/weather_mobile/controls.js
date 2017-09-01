Controls = {
    create: function(context) {

        var that = this;


        this.controlsGroup = context.game.add.group();

        this.buttonArray = [];
        this.buttonsOffArray = [];

        // ΗΟΜΕ BUTTON
        // this.home_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("home"), 90, 36, 160, 60, null, context, false, {
        //     font: "bold 18px Arial"
        // });
        this.home_button = context.game.add.button(90, 36, 'gui', bedbugGameCore.GO_HOME, bedbugGameCore, 'max_active.png', 'max_active.png', 'max_pressed.png', 'max_active.png');
        this.home_button.anchor.setTo(0.5, 0.5);
        this.home_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_HOME"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.home_text.anchor.setTo(0.5, 0.5);
        this.home_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.home_button.addChild(this.home_text);

        this.controlsGroup.addChild(this.home_button);

        // // SETTINGS BUTTON
        // this.settings_button = new CustomButton(context.game, "≡", 1230, 36, 60, 60, this.openOptionsPanel, this, false, {
        //     font: "bold 30px Arial"
        // });
        this.settings_button = context.game.add.button(1230, 36, 'gui', this.openOptionsPanel, this, 'small_active.png', 'small_active.png', 'small_pressed.png', 'small_active.png');
        this.settings_button.anchor.setTo(0.5, 0.5);
        this.settings_button.scale.setTo(0.9, 0.9);
        this.settings_text = context.game.add.text(0, 3, "≡", {
            font: "30px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.settings_text.anchor.setTo(0.5, 0.5);
        this.settings_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.settings_button.addChild(this.settings_text);

        this.controlsGroup.addChild(this.settings_button);

        // Time
        this.game_time_bg = new CustomLabel(context.game, "", 90, 600, 130, 50, true, {
            font: "bold 20px Arial",
            align: "left",
            backgroundAlpha: 0.5
        });

        var point_style = {
            'font': '20px Arial',
            'fill': '#ffffff'
        };
        this.timeInfo = context.game.add.text(114, 603, "", point_style);
        this.timeInfo.resolution = 2;
        this.timeInfo.anchor.setTo(1, 0.5);

        var i = 0;
        this.timeInterval = setInterval(function() {
            i++;
            var thedate = new Date();
            if (i % 2 == 0) {
                i = 0;
                that.timeInfo.setText(thedate.getHours() + ':' + (thedate.getMinutes() < 10 ? '0' : '') + thedate.getMinutes());
            }
            else
                that.timeInfo.setText(thedate.getHours() + ' ' + (thedate.getMinutes() < 10 ? '0' : '') + thedate.getMinutes());
        }, 1000);

        // this.game_time = context.game.add.text(90, 620, bedbugGameCore.getLocalizedText("TXT_TIME"), {
        //     font: "17px Arial",
        //     fill: "#EAEAEA",
        // });
        // this.game_time.anchor.setTo(0.5, .5);
        // this.game_time.resolution = 2;
        // this.game_time.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

        // PAYTABLE BUTTON
        this.paytable_button = context.game.add.button(90, 670, 'gui', context.showPayTable, context, 'max_active.png', 'max_active.png', 'max_pressed.png', 'max_active.png');
        this.paytable_button.anchor.setTo(0.5, 0.5);
        this.paytable_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.paytable_text.anchor.setTo(0.5, 0.5);
        this.paytable_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.paytable_text.anchor.resolution = 2;
        this.paytable_button.addChild(this.paytable_text);
        this.buttonArray.push(this.paytable_button);

        this.paytableOff_button = context.game.add.button(90, 670, 'gui');
        this.paytableOff_button.frameName = "max_off.png";
        this.paytableOff_button.anchor.setTo(0.5, 0.5);
        this.paytableOff_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), {
            font: "20px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.paytableOff_text.anchor.setTo(0.5, 0.5);
        this.paytableOff_text.anchor.resolution = 2;
        this.paytableOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.paytableOff_button.addChild(this.paytableOff_text);
        this.buttonsOffArray.push(this.paytableOff_button);

        // SET BET BUTTON
        // this.set_bet_button = new CustomButton(context.game, "", 1006, 670, 162, 60, this.openBetPanel, this, false, {
        //     bgColor: 0x000000,
        //     backgroundAlpha: 0.01
        // });
        this.set_bet_button = context.game.add.button(1006, 670, 'gui', this.openBetPanel, this, 'max_active.png', 'max_active.png', 'max_pressed.png', 'max_active.png');
        this.set_bet_button.anchor.setTo(0.5, 0.5);
        this.set_bet_button.scale.setTo(1.1, 1.1);
        this.buttonArray.push(this.set_bet_button);
        this.controlsGroup.addChild(this.set_bet_button);

        this.set_betOff_button = context.game.add.button(1006, 670, 'gui');
        this.set_betOff_button.frameName = "max_off.png";
        this.set_betOff_button.anchor.setTo(0.5, 0.5);
        this.set_betOff_button.scale.setTo(1.1, 1.1);
        this.buttonsOffArray.push(this.set_betOff_button);
        this.controlsGroup.addChild(this.set_betOff_button);
        // this.autoplay_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_VERTICAL"),
        //     bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.grid.columns * (bedbugGameCore.game_specs.reels.spacing.x + bedbugGameCore.game_specs.slots.width)) + 50, 360, 80, 250, this.openAutoplayPanel, this, false, {
        //         font: "bold 20px Arial",
        //         wordWrap: true,
        //         wordWrapWidth: 5,
        //         bgColor: 0x000000,
        //         backgroundAlpha: .3,
        //         fill: "#fff",
        //         align: 'center',
        //         boundsAlignH: 'top'
        //     });

        this.autoplay_button = context.game.add.button(bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.grid.columns * (bedbugGameCore.game_specs.reels.spacing.x + bedbugGameCore.game_specs.slots.width)) + 50, 330, 'gui', this.openAutoplayPanel, this, 'max_active_vertical.png', 'max_active_vertical.png', 'max_pressed_vertical.png', 'max_active_vertical.png');
        this.autoplay_button.anchor.setTo(0.5, 0.5);
        this.autoplay_button.width = this.autoplay_button.width * 1.4;
        this.autoplay_button.height = this.autoplay_button.height * 1.5;
        // this.autoplay_button.scale.setTo(1.4, 1.5);


        this.autoplay_text = context.game.add.text(0, 0, bedbugGameCore.createVertical(bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL")).toUpperCase(), {
            font: "14px Arial",
            wordWrap: true,
            wordWrapWidth: 1,
            fill: "#ffffff",
            fontWeight: "bold",
            align: 'center'
        });



        this.autoplay_text.lineSpacing = -2;
        this.autoplay_text.anchor.resolution = 2;
        this.autoplay_text.anchor.setTo(0.5, 0.5);
        this.autoplay_text.scale.setTo(0.9, 0.9);
        this.autoplay_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_text.y = ((this.autoplay_button.height / 1.5) / 2) - this.autoplay_text.height / 2;
        this.autoplay_button.addChild(this.autoplay_text);
        this.buttonArray.push(this.autoplay_button);

        this.autoplayOff_button = context.game.add.button(bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.grid.columns * (bedbugGameCore.game_specs.reels.spacing.x + bedbugGameCore.game_specs.slots.width)) + 50, 330, 'gui');
        this.autoplayOff_button.frameName = "max_off_vertical.png";
        this.autoplayOff_button.anchor.setTo(0.5, 0.5);
        this.autoplayOff_button.scale.setTo(1.4, 1.5);
        this.autoplayOff_text = context.game.add.text(0, 0, bedbugGameCore.createVertical(bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL")).toUpperCase(), {
            font: "14px Arial",
            wordWrap: true,
            wordWrapWidth: 1,
            fill: "#ffffff",
            fontWeight: "bold",
            align: 'center'
        });
        this.autoplayOff_text.lineSpacing = -2;
        this.autoplayOff_text.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text.anchor.resolution = 2;
        this.autoplayOff_text.scale.setTo(0.9, 0.9);
        this.autoplayOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplayOff_text.y = ((this.autoplayOff_button.height / 1.5) / 2) - this.autoplayOff_text.height / 2;
        this.autoplayOff_button.addChild(this.autoplayOff_text);
        this.buttonsOffArray.push(this.autoplayOff_button);



        this.autoplay_stop_button = context.game.add.button(bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.grid.columns * (bedbugGameCore.game_specs.reels.spacing.x + bedbugGameCore.game_specs.slots.width)) + 50, 330, 'gui', context.controls_stop_auto, context, 'max_active_vertical.png', 'max_active_vertical.png', 'max_pressed_vertical.png', 'max_active_vertical.png');
        this.autoplay_stop_button.lineSpacing = -2;
        this.autoplay_stop_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_button.scale.setTo(1.4, 1.5);
        this.autoplay_stop_text = context.game.add.text(0, 0, bedbugGameCore.createVertical(bedbugGameCore.getLocalizedText("TXT_STOP_LABEL")).toUpperCase(), {
            font: "14px Arial",
            wordWrap: true,
            wordWrapWidth: 5,
            fill: "#ffffff",
            fontWeight: "bold",
            align: 'center'
        });
        this.autoplay_stop_text.anchor.setTo(0.5, 1);
        this.autoplay_stop_text.scale.setTo(0.9, 0.9);
        this.autoplay_stop_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_stop_text.y = ((this.autoplay_stop_button.height / 1.5) / 2) - this.autoplay_stop_text.height / 4 - 10;

        this.autoplay_stop_button.addChild(this.autoplay_stop_text);


        this.autoplay_stop_button.visible = false;

        this.autoplay_count = new CustomButton(context.game, "", this.autoplay_stop_button.x, this.autoplay_stop_button.y + this.autoplay_stop_button.height / 2 + 30, 80, 50, null, null, false, {
            font: "bold 30px Arial",
            bgColor: 0x000000,
            backgroundAlpha: 0.5
        }, false, true);
        this.autoplay_count.visible = false;

        this.controlsGroup.addChild(this.autoplay_button);
        this.controlsGroup.addChild(this.autoplayOff_button);
        this.controlsGroup.addChild(this.autoplay_stop_button);
        this.controlsGroup.addChild(this.autoplay_count);

        var AnchorLeft = bedbugGameCore.game_specs.grid.x;

        // BALANCE LABEL
        this.balance_label = new CustomLabel(context.game, "", AnchorLeft + (270 / 2), 674, 270, 50, true, {
            font: "bold 30px Arial",
            backgroundAlpha: 0.5
        });
        var balance_label_heading = context.game.add.text(AnchorLeft + (this.balance_label.width / 2), 630, bedbugGameCore.getLocalizedText("TXT_BALANCE_LABEL"), {
            font: "bold 25px Arial",
            fill: "#EAEAEA"
        });
        balance_label_heading.anchor.setTo(0.5, 0);
        //balance_label_heading.cacheAsBitmap = true;
        balance_label_heading.resolution = 2;
        balance_label_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        balance_label_heading.stroke = '#000000';
        balance_label_heading.strokeThickness = 1;
        this.updateUserBalance();

        // WIN LABEL
        this.win_label = new CustomLabel(context.game, "", 623, 674, 200, 50, true, {
            font: "bold 30px Arial",
            backgroundAlpha: 0.5
        });
        var win_label_heading = context.game.add.text(this.win_label.x, 630, bedbugGameCore.getLocalizedText("TXT_WIN_LABEL"), {
            font: "bold 25px Arial",
            fill: "#EAEAEA"
        });
        win_label_heading.anchor.setTo(0.5, 0);
        win_label_heading.resolution = 2;
        win_label_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        win_label_heading.stroke = '#000000';
        win_label_heading.strokeThickness = 1;
        this.updateUserWin();

        // COINS
        this.coins_label = new CustomLabel(context.game, "500000", 823, 674, 170, 50, true, {
            font: "bold 30px Arial",
            backgroundAlpha: 0.5
        });
        var coins_heading = context.game.add.text(823, 630, bedbugGameCore.getLocalizedText("TXT_COINS_LABEL"), {
            font: "bold 25px Arial",
            fill: "#EAEAEA"
        });
        //coins_heading.cacheAsBitmap = true;
        coins_heading.anchor.setTo(0.5, 0);
        coins_heading.resolution = 2;
        coins_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        coins_heading.stroke = '#000000';
        coins_heading.strokeThickness = 1;
        this.coins_label.setLabel(Math.round(bedbugGameCore.coins));

        // BET
        this.bet_label = new CustomLabel(context.game, bedbugGameCore.bet_coins, 1006, 680, 120, 30, true, {
            font: "bold 20px Arial",
            fill: "#fff",
            backgroundAlpha: 0
        });
        var bet_heading = context.game.add.text(1006, 646, bedbugGameCore.getLocalizedText("TXT_BET_LABEL"), {
            font: "bold 19px Arial",
            fill: "#fff"
        });
        bet_heading.anchor.setTo(0.5, 0);
        bet_heading.resolution = 2;
        bet_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);





        //this.controlsGroup.addChild(this.set_bet_button);
        // PLAY BUTTON

        // -- PLAY STATE
        // this.play_button = context.game.add.button(1185, 630, 'play_button', context.play_spin, context, 0, 1, 2);
        // this.play_button.anchor.setTo(.5, .5);
        // this.play_button.width = 200;
        // this.play_button.height = 200;
        this.play_button = context.game.add.button(1185, 630, 'gui', context.play_spin, context, 'play_active.png', 'play_active.png', 'play_pressed.png', 'play_active.png');
        this.play_button.anchor.setTo(.5, .5);
        this.play_button.scale.setTo(1.4, 1.4);
        this.buttonArray.push(this.play_button);

        this.playOff_button = context.game.add.button(1185, 630, 'gui');
        this.playOff_button.frameName = "play_off.png";
        this.playOff_button.anchor.setTo(.5, .5);
        this.playOff_button.scale.setTo(1.4, 1.4);
        this.buttonsOffArray.push(this.playOff_button);

        // Close All Off Buttons
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = false;
        }

        // -- COUNTPLAY STATE
        this.countButtonGroup = context.game.add.group();
        this.countButtonGroup.x = 1185;
        this.countButtonGroup.y = 630;



        // this.countplay_button = context.game.add.graphics(0, 0);
        // this.countplay_button.lineStyle(2, 0xffffff);
        // this.countplay_button.beginFill(0xFFFFFF, 0.05);
        // this.countplay_button.drawCircle(0, 0, 170);
        // this.countplay_button.endFill();
        // this.countplay_button.cacheAsBitmap = true;
        // this.countplay_button.inputEnabled = true;
        // this.countplay_button.events.onInputDown.add(function(btn) {
        //     context.play_spin();
        // }, context);


        this.countplay_button_stop = context.game.add.button(0, 0, 'gui', context.stop_spin, context, 'stop_active.png', 'stop_active.png', 'stop_pressed.png');
        this.countplay_button_stop.anchor.setTo(.5, .5);
        this.countplay_button_stop.scale.setTo(1.4, 1.4);


        // this.play_text = context.game.add.text(0, -35, '', {
        //     font: "bold 25px Arial",
        //     fill: "#fff"
        // });
        // this.play_text.anchor.setTo(0.5, 1);

        // this.play_count = context.game.add.text(0, 0, '', {
        //     font: "bold 40px Arial",
        //     fill: "#fff"
        // });
        // this.play_count.anchor.setTo(0.5, 0.4);

        // this.countButtonGroup.add(this.countplay_button);
        this.countButtonGroup.add(this.countplay_button_stop);
        // this.countButtonGroup.add(this.play_text);
        // this.countButtonGroup.add(this.play_count);

        this.countButtonGroup.visible = false;

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
        // if (count == 0)
        //     this.play_count.visible = false;
        // else
        //     this.play_count.visible = true;

        // this.play_count.setText(count);
    },
    setCountText: function(text) {
        // this.play_text.setText(text);
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
        button.alpha = 1.0;
        button.inputEnabled = true;
    },
    update: function() {
        Controls.autoplay_stepper.setLabel(bedbugGameCore.autoplay_count);
        Controls.autoplay_count.setLabel(bedbugGameCore.autoplay_count);

        Controls.coin_value_stepper.setLabel(bedbugGameCore.addZeroes(bedbugGameCore.coin_value), bedbugGameCore.coin_value_current == 0, bedbugGameCore.coin_value_current == bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues.length - 1);
        Controls.coins_label.setLabel(bedbugGameCore.numberWithSpaces(Math.round(bedbugGameCore.coins)));


        // console.log( (bedbugGameCore.bet_level == bedbugGameCore.bet_levels[0]) +" | "+(bedbugGameCore.bet_level == bedbugGameCore.bet_levels[bedbugGameCore.bet_levels.length - 1]))
        Controls.bet_stepper.setLabel(bedbugGameCore.bet_level, bedbugGameCore.bet_level == bedbugGameCore.bet_levels[0], bedbugGameCore.bet_level == bedbugGameCore.bet_levels[bedbugGameCore.bet_levels.length - 1]);


        // Controls.bet_level_label.setLabel(bedbugGameCore.bet_level);

        // Request to change bet coins to bet cash on Mobile UI Bet Button
        Controls.updateBetButtonLabel();
        // Controls.bet_label.setLabel(bedbugGameCore.bet_coins);

        // Time Update game_time
        // Controls.game_time.setText(bedbugGameCore.getLocalizedText("TXT_TIME") + ": " + Controls.getCurrentTime());
        // Controls.game_time.setLabel(Controls.getCurrentTime());

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


        var time_per_session = new Stepper(context.game, bedbugGameCore.getLocalizedText("time_per_session"), bedbugGameCore.time_per_session, bedbugGameCore.decrTimePerSession, bedbugGameCore.incrTimePerSession, width / 2, 190, 250, 100, true, {
            font: "bold 35px Arial",
            fill: "#FFF",
            heading: {
                fill: "#fff",
                font: "bold 25px Arial",
            },
            stepperBgAlpha: 1,
            stepperBgColor: 0x555555,
            backgroundAlpha: 1
        });

        var reality_check = new Stepper(context.game, bedbugGameCore.getLocalizedText("reality_message_interval"), bedbugGameCore.reality_message_interval, bedbugGameCore.decrRealityInterval, bedbugGameCore.incrRealityInterval, width / 2, 400, 250, 100, true, {
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
            backgroundAlpha: 1
        });

        this.responsibleOptions_panel.add(time_per_session);
        this.responsibleOptions_panel.add(reality_check);
        this.responsibleOptions_panel.add(heading);


        this.responsibleOptions_panel.visible = false;
    },
    createOptions: function(context) {

        var width = 500;
        var height = 470;

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
        }

        this.options_panel = this.createPopupBG(context.game, width, height, true, optionsStyle);
        this.options_panel.x += 25;
        this.options_panel.y -= 30;

        var game_rules_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_HELP_LABEL"), 250, height - 75, 300, 75, context.openGameRules, context, true, {
            font: "bold 40px Arial",
            fill: "#000000",
            bgColor: 0xFFFFFF,
            backgroundAlpha: 1,
            align: 'center',
            wordWrap: false,
            wordWrapWidth: 100,
            corners: 25
        });

        this.options_panel.add(game_rules_button);

        // var gamemplay_heading = new CustomLabel(context.game, bedbugGameCore.getLocalizedText("TXT_GAMEPLAY_SETTINGS_LABEL"), 250, 45, 280, 50, true, {
        //     "bgColor": 0x000000,
        //     "backgroundAlpha": 1,
        //     font: "bold 25px Arial",
        //     align:'left'
        // });

        var gamemplay_heading = context.game.add.text(50, 45, bedbugGameCore.getLocalizedText("TXT_GAMEPLAY_SETTINGS_LABEL"), {
            font: "bold 25px Arial",
            fill: "#ffffff",
            align: "left",
            wordWrap: true,
            wordWrapWidth: 700
        });

        // gamemplay_heading.anchor.setTo(.5,.5);
        var options = {
            checkBoxLine: 3,
            inputFont: '22px Arial',
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 280
        };

        var fast_spins_checkbox = new CheckΒox(50, 90, context.game, bedbugGameCore.getLocalizedText("TXT_FAST_SPINS_TOGGLE"), null, bedbugGameCore.settings.fast_spins, options, function(o) {
            console.log(o);
            bedbugGameCore.settings.fast_spins = o
        });

        // var sound_heading = new CustomLabel(context.game, bedbugGameCore.getLocalizedText("TXT_SOUND_SETTINGS_LABEL"), 250, 170, 280, 50, true, {
        //     "bgColor": 0x000000,
        //     "backgroundAlpha": 1,
        //     font: "bold 25px Arial",
        //     align:'left'
        // });

        var sound_heading = context.game.add.text(50, 170, bedbugGameCore.getLocalizedText("TXT_SOUND_SETTINGS_LABEL"), {
            font: "bold 25px Arial",
            fill: "#ffffff",
            align: "left",
            wordWrap: true,
            wordWrapWidth: 700
        });
        // sound_heading.anchor.setTo(.5,.5);

        var soundfx_checkbox = new CheckΒox(50, 215, context.game, bedbugGameCore.getLocalizedText("TXT_SOUND_EFFECTS_TOGGLE"), null, bedbugGameCore.settings.sound_effects, options, function(o) {
            bedbugGameCore.settings.sound_effects = o;
            if (o)
                bedbugGameCore.sound_effects_volume = 1;
            else
                bedbugGameCore.sound_effects_volume = 0;
        });

        var ambiance_checkbox = new CheckΒox(50, 285, context.game, bedbugGameCore.getLocalizedText("TXT_SOUND_AMBIANCE_TOGGLE"), null, bedbugGameCore.settings.ambiance, options, function(o) {
            bedbugGameCore.settings.ambiance = o;
            context.setAmbiance(o);
        });

        // console.log(bedbugGameCore.server_settings);

        if (bedbugGameCore.configuration.server_settings.responsible)
            var responsible_options_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("responsible_options"), width / 2, height - 60, 400, 60, this.openResponsibleOptions, this, false, {
                font: "bold 28px Arial",
                wordWrap: true,
                wordWrapWidth: 400,
                // bgColor: 0xFFFFFF,
                // backgroundAlpha: 1,
                fill: "#D86026",
                bgColor: 0xFFFFFF,
                backgroundAlpha: 1,
                // fill: "#000",
                align: 'center',
                boundsAlignH: 'top'
            });

        this.options_panel.add(fast_spins_checkbox);
        this.options_panel.add(gamemplay_heading);
        this.options_panel.add(sound_heading);
        this.options_panel.add(soundfx_checkbox);
        this.options_panel.add(ambiance_checkbox);

        if (bedbugGameCore.configuration.server_settings.responsible)
            this.options_panel.add(responsible_options_button);

        this.options_panel.visible = false;
    },
    updateBetButtonLabel: function() {
        var bet = bedbugGameCore.formatMoney(bedbugGameCore.bet_cash);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        bet = (symbolPosition == 0 || symbolPosition == 2) ? symbol + bet : bet + symbol;
        this.bet_label.setLabel(bet);
    },
    updateTotalBet: function() {
        var bet = bedbugGameCore.formatMoney(bedbugGameCore.bet_cash);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        bet = (symbolPosition == 0 || symbolPosition == 2) ? symbol + bet : bet + symbol;
        this.total_bet_box.setLabel(bet);
        // this.total_bet_coins_box.setLabel(bedbugGameCore.bet_coins);
    },
    updateUserBalance: function() {
        var balance = bedbugGameCore.formatMoney(bedbugGameCore.balance);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        balance = (symbolPosition == 0 || symbolPosition == 2) ? symbol + balance : balance + symbol;
        this.balance_label.setLabel(balance);
    },
    updateUserWin: function() {
        var win = bedbugGameCore.formatMoney(bedbugGameCore.win);
        var symbol = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol;
        var symbolPosition = bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition;
        win = (symbolPosition == 0 || symbolPosition == 2) ? symbol + win : win + symbol;
        this.win_label.setLabel(win);
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
        // that.countplay_button.inputEnabled = true;
        that.autoplay_stop_button.visible = false;
        that.autoplay_button.visible = true;
        that.autoplay_count.visible = false;

        bedbugGameCore.autoplay_started = false;
        bedbugGameCore.autoplay_count = 0;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },
    createAutoplayPanel: function(context) {
        var that = this;
        var width = 700;
        var height = 600;



        var autoPlayStyle = {
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
        }

        this.autoplay_panel = this.createPopupBG(context.game, width, height, true, autoPlayStyle, closeAutoplayPanel);

        //   function checkAutoplayStatusAndPlay() {
        //         if (bedbugGameCore.autoplay_count > 0) {
        //             that.countplay_button.alpha = 0.3;
        //             that.countplay_button.inputEnabled = false;
        //             that.autoplay_stop_button.visible = true;
        //             that.autoplay_button.visible = false;

        //             if (!bedbugGameCore.reels_spinning) {
        //                 that.play_button.alpha = 0.3;
        //                 that.play_button.inputEnabled = false;
        //                 context.spin();
        //             }
        //         }
        //     }

        function checkAutoplayStatusAndPlay() {
            if (bedbugGameCore.autoplay_count > 0) {
                that.countplay_button_stop.inputEnabled = false;
                that.autoplay_stop_button.visible = true;
                that.autoplay_button.visible = false;
                that.autoplay_count.visible = true;
                that.countButtonGroup.alpha = 1;
                if (!bedbugGameCore.reels_spinning) {
                    that.play_button.alpha = 0.3;
                    that.play_button.inputEnabled = false;
                    context.spin();
                }
            }
        }

        //  function checkAutoplayStatusAndPlay() {
        //     if (bedbugGameCore.autoplay_count > 0) {
        //         // Lets' disable play
        //         // Lets' disable play
        //         that.play_button.alpha = 0.3;
        //         that.play_button.inputEnabled = false;


        //         // that.countplay_button.inputEnabled = false;
        //         that.autoplay_stop_button.visible = true;
        //         that.autoplay_button.visible = false;
        //         context.spin();
        //     }
        // }

        this.autoplay_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), bedbugGameCore.autoplay_count, context.decrAutoplayCount, context.incrAutoplayCount, width / 2, 110, 250, 100, true, {
            font: "bold 35px Arial",
            fill: "#FFF",
            heading: {
                fill: "#FFF"
            },
            stepperBgAlpha: 1,
            stepperBgColor: "#afa5a5",
            backgroundAlpha: 1
        }, false);

        this.autoplay_panel.add(this.autoplay_stepper);

        // ADD Start Autoplay BUTTON TO NEXT PANEL
        this.startAuto = context.game.add.button(width / 2, 200, 'gui', startAutoplayPanel, this, 'max_active.png', 'max_active.png', 'max_pressed.png', 'max_active.png');
        this.startAuto.anchor.setTo(0.5, 0.5);
        this.startAuto.scale.setTo(1.35, 1.0);
        this.startAuto_text = context.game.add.text(width / 2, 200, bedbugGameCore.getLocalizedText("TXT_START_LABEL"), {
            font: "25px Arial",
            fill: "#ffffff"
        });
        this.startAuto_text.anchor.setTo(.5, .5);
        this.startAuto_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // ADD TEXT AS CHILD
        //this.startAuto.addChild(this.startAuto_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel.add(this.startAuto);
        this.autoplay_panel.add(this.startAuto_text);


        function startAutoplayPanel() {
            checkAutoplayStatusAndPlay();
            this.autoplay_panel.visible = false;

        }

        function closeAutoplayPanel() {
            bedbugGameCore.autoplay_started = false;
            bedbugGameCore.autoplay_count = 0;
            bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');

            that.autoplay_panel.visible = false;

        }

        var options = {
            font: '30px Arial',
            checkBoxLine: 3,
            inputFont: '30px Arial',
            inputDoubleFont: '30px Arial',
            inputWidth: 90,
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 370
        };

        this.stop_any_checkbox = new CheckΒox(80, 250, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_ANY"), null, bedbugGameCore.autoplay_setup.on_win.checked, options, function(o) {
            bedbugGameCore.autoplay_setup.on_win.checked = o
        });

        this.stop_win_amount = new CheckΒox(80, this.stop_any_checkbox.y + this.stop_any_checkbox.height + 20, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT"), bedbugGameCore.autoplay_setup.on_win_amount.value, bedbugGameCore.autoplay_setup.on_win_amount.checked, _.merge(options, { isMoney: false, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT") }), function(o, e) {
            bedbugGameCore.autoplay_setup.on_win_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_win_amount.value = e
        });

        this.stop_cash_amount = new CheckΒox(80, this.stop_win_amount.y + this.stop_win_amount.height + 20, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_CASH"), bedbugGameCore.autoplay_setup.on_cash_amount.value, bedbugGameCore.autoplay_setup.on_cash_amount.checked, _.merge(options, { isMoney: true, isTime: false, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_CASH") }), function(o, e) {
            bedbugGameCore.autoplay_setup.on_cash_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_cash_amount.value = e;
        });

        this.stop_time = new CheckΒox(80, this.stop_cash_amount.y + this.stop_cash_amount.height + 20, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME"), bedbugGameCore.autoplay_setup.on_time.value, bedbugGameCore.autoplay_setup.on_time.checked, _.merge(options, { isTime: true, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME") }), function(o, e, m) {
            bedbugGameCore.autoplay_setup.on_time.checked = o;
            if (e && m) bedbugGameCore.autoplay_setup.on_time.value = [e, m];
        });

        this.stop_lose = new CheckΒox(80, this.stop_time.y + this.stop_time.height + 20, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE"), bedbugGameCore.autoplay_setup.on_lose.value, bedbugGameCore.autoplay_setup.on_lose.checked, _.merge(options, { isMoney: true, isTime: false, description: bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE") }), function(o) {
            bedbugGameCore.autoplay_setup.on_lose.checked = o
        });

        this.autoplay_panel.add(this.stop_lose);
        this.autoplay_panel.add(this.stop_time);
        this.autoplay_panel.add(this.stop_cash_amount);
        this.autoplay_panel.add(this.stop_any_checkbox);
        this.autoplay_panel.add(this.stop_win_amount);

        this.autoplay_panel.visible = false;
    },
    createBetPanel: function(context) { // Themis Popup to change

        var width = 780;
        var height = 420;

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
        }

        this.bet_panel = this.createPopupBG(context.game, width, height, true, betPanelStyle);
        this.bet_panel.x += 25;
        this.bet_panel.y -= 25;

        var max_bet_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), width - 200, 120, 250, 150, context.setMaxBet, context, true, {
            font: "bold 40px Arial",
            fill: "#000000",
            bgColor: 0xFFFFFF,
            backgroundAlpha: 1,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 200,
            corners: 25
        });
        this.bet_panel.add(max_bet_button);

        this.bet_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText('TXT_BET_LEVEL_LABEL'), bedbugGameCore.bet_level, bedbugGameCore.decrBetLevel, bedbugGameCore.incrBetLevel, 200, 110, 250, 100, true, {
            font: "bold 35px Arial",
            fill: "#FFF",
            heading: {
                fill: "#FFF"
            },
            stepperBgAlpha: 1,
            stepperBgColor: 0x555555,
            backgroundAlpha: 1
        });
        this.bet_panel.add(this.bet_stepper);

        this.coin_value_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText("TXT_COIN_VALUE_LABEL"), bedbugGameCore.coin_value, bedbugGameCore.decrCoinValue, bedbugGameCore.incrCoinValue, 200, height - 75, 250, 100, true, {
            font: "bold 35px Arial",
            fill: "#FFF",
            stepperBgAlpha: 1,
            stepperBgColor: 0x555555,
            heading: {
                fill: "#FFF"
            },
            backgroundAlpha: 1
        });
        this.bet_panel.add(this.coin_value_stepper);


        this.total_bet_box = new ValueBox(context.game, bedbugGameCore.getLocalizedText("TXT_TOTAL_BET_LABEL"), bedbugGameCore.coin_value, width - 200, height - 75, 250, 100, true, {
            font: "bold 35px Arial",
            fill: "#FFF",
            heading: {
                fill: "#FFF"
            },
            stepperBgAlpha: 0.1,
            stepperBgColor: 0x000000,
            backgroundAlpha: 1
        });
        this.bet_panel.add(this.total_bet_box);


        // this.total_bet_coins_box = new ValueBox(context.game, bedbugGameCore.getLocalizedText("TXT_BET_IN_COINS"), bedbugGameCore.bet_coins, this.total_bet_box.x - 225, this.total_bet_box.y, 250, 100, true, {
        //     font: "bold 35px Arial",
        //     fill: "#FFF",
        //     heading: {
        //         fill: "#FFF"
        //     },
        //     stepperBgAlpha: 0.1,
        //     stepperBgColor: 0x000000,
        //     backgroundAlpha: 1
        // });
        // this.bet_panel.add(this.total_bet_coins_box);
        Controls.updateTotalBet();

        this.bet_panel.visible = false;
    },
    hideControls: function(game) {
        // console.log("HIDE CONTROLS!!");
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = true;
        }
        for (var i = 0; i < this.buttonArray.length; i++) {
            this.buttonArray[i].visible = false;
        }

    },
    showControls: function(game) {
        // console.log("SHOW CONTROLS!!");
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
        }

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

            var panel_background = game.add.sprite(0, 0, "gui", "paytable.png");
            panel_background.inputEnabled = true;
            panel_background.scale.setTo(1.2, 1.2);
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

        context.paytable = context.game.add.group();
        context.paytable.visible = false;

        context.panel_pages = 5;
        context.page_bullets = context.game.add.group();


        var panel_height = 600;
        var panel_width = 762;
        var panel_x = (context.game.width / 2 - panel_width / 2);
        var panel_y = 20;

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

        // var paytable_area = this.game.add.graphics(0, 0);
        // paytable_area.beginFill(0x000, .9);
        // paytable_area.drawRoundedRect(panel_x, panel_y, panel_width, panel_height, 90);
        // paytable_area.endFill();
        // paytable_area.inputEnabled = true;
        var paytable_area = Controls.createPopupBG(context.game, panel_width, panel_height + 30, false, null, function() {
            hidePaytable();
        });


        paytable_area.y -= 30;
        //paytable_area.inputEnabled = true;
        context.paytable.x = 35;

        context.paytable.add(paytable_area);

        var legal_text = context.game.add.text(panel_x + panel_width / 2, panel_y + panel_height - 140, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_GENERAL_INFO"), {
            font: '15px Arial',
            fill: '#fff',
            align: 'center',

            wordWrap: true,
            wordWrapWidth: panel_width - 40
        })
        legal_text.lineSpacing = -2;

        legal_text.anchor.set(0.5, 0);
        context.paytable.add(legal_text);



        var headingStyle = {
            'font': 'bold 22px Arial',
            'fontWeight': 'bold',
            'fill': '#fff',
            // backgroundColor: "#ffff00"
        };
        var left = 25;


        var screen1 = context.game.add.group();
        // var screen1_heading = context.game.add.text((panel_width / 2) + 55, 70, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen1_heading.anchor.setTo(0.5, 0.5);
        // screen1_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        var wildsymbol = getSymbol(bedbugGameCore.symbolNameToID("WILD"), (panel_width / 2) - 10, 230, 130);

        var scattersymbol = getSymbol(bedbugGameCore.symbolNameToID("SCATTER"), left + 200, 450, 130, "250 + 15 " + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"), "100 + 10 " + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"), "10 + 5 " + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"));


        var wildText = context.game.add.text(wildsymbol.x + 55 - 130 / 2, wildsymbol.y + 40 + 130 / 2, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_01"), {
            'font': 'bold 22px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "650"
        });
        wildText.anchor.setTo(0.5, 0.5);

        var scatterText = context.game.add.text(left + 70, scattersymbol.y + 25 + 130 / 2, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"), {
            'font': 'bold 20px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "700"
        });

        // screen1.add(screen1_heading);
        screen1.add(wildsymbol);
        screen1.add(scattersymbol);
        screen1.add(wildText);
        screen1.add(scatterText);


        var screen2 = context.game.add.group();
        var screen2_heading = context.game.add.text(panel_width / 2 + 45, 80, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_01"), headingStyle);
        screen2_heading.anchor.setTo(0.5, 0, 5);

        var thunderText = bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_02") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_03") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_04") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_05") + "\n\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_06") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_07") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_08") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_09") + "\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_10") + "\n\n";
        thunderText += bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_11") + "\n";

        var thunderText = context.game.add.text(panel_width / 2 + 45, 115, thunderText, {
            'font': '20px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "700"
        });
        thunderText.anchor.setTo(0.5, 0);

        // var thunderarea = this.game.add.graphics(left, 40);
        // thunderarea.anchor.setTo(0.5, 0,5);
        // thunderarea.lineStyle(2, 0xffffff);
        // thunderarea.drawRoundedRect(panel_x, panel_y, 740, 440, 45);
        // thunderarea.endFill();

        //screen2.add(thunderarea);
        screen2.add(screen2_heading);
        screen2.add(thunderText);

        // Screen 3 - Symbols Payout
        var screen3 = context.game.add.group();
        // var screen3_heading = context.game.add.text(panel_width / 2 + 45, 40, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen3_heading.anchor.setTo(0.5, 0, 5);
        // screen3_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var symbol1 = getSymbol(bedbugGameCore.symbolNameToID("SUN"), left + 45, 270, 130, getAward("SUN", "5"), getAward("SUN", "4"), getAward("SUN", "3"));
        var symbol2 = getSymbol(bedbugGameCore.symbolNameToID("CLOUD"), left + 300, 270, 130, getAward("CLOUD", "5"), getAward("CLOUD", "4"), getAward("CLOUD", "3"));
        var symbol3 = getSymbol(bedbugGameCore.symbolNameToID("RAIN"), left + 555, 270, 130, getAward("RAIN", "5"), getAward("RAIN", "4"), getAward("RAIN", "3"));
        var symbol4 = getSymbol(bedbugGameCore.symbolNameToID("WIND"), left + 165, 465, 130, getAward("WIND", "5"), getAward("WIND", "4"), getAward("WIND", "3"));
        var symbol5 = getSymbol(bedbugGameCore.symbolNameToID("SNOW"), left + 445, 465, 130, getAward("SNOW", "5"), getAward("SNOW", "4"), getAward("SNOW", "3"));
        screen3.add(symbol1);
        screen3.add(symbol2);
        screen3.add(symbol3);
        screen3.add(symbol4);
        screen3.add(symbol5);
        // screen3.add(screen3_heading);



        // Screen 4 - Symbols Payout
        var screen4 = context.game.add.group();
        // var screen4_heading = context.game.add.text(panel_width / 2 + 45, 40, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen4_heading.anchor.setTo(0.5, 0, 5);
        // screen4_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var symbol6 = getSymbol(bedbugGameCore.symbolNameToID("A"), left + 45, 270, 130, getAward("A", "5"), getAward("A", "4"), getAward("A", "3"));
        var symbol7 = getSymbol(bedbugGameCore.symbolNameToID("K"), left + 300, 270, 130, getAward("K", "5"), getAward("K", "4"), getAward("K", "3"));
        var symbol8 = getSymbol(bedbugGameCore.symbolNameToID("Q"), left + 555, 270, 130, getAward("Q", "5"), getAward("Q", "4"), getAward("Q", "3"));
        var symbol9 = getSymbol(bedbugGameCore.symbolNameToID("J"), left + 165, 465, 130, getAward("J", "5"), getAward("J", "4"), getAward("J", "3"));
        var symbol10 = getSymbol(bedbugGameCore.symbolNameToID("TEN"), left + 445, 465, 130, getAward("TEN", "5"), getAward("TEN", "4"), getAward("TEN", "3"));
        screen4.add(symbol6);
        screen4.add(symbol7);
        screen4.add(symbol8);
        screen4.add(symbol9);
        screen4.add(symbol10);
        // screen4.add(screen4_heading);



        // Screen 5 - Winning Bet Lines
        var screen5 = context.game.add.group();
        // this.paytable.add(screen5);

        // var screen5_heading = context.game.add.text(panel_width / 2 + 45, 70, bedbugGameCore.getLocalizedText("paytable_betlines_heading"), headingStyle);
        // screen5_heading.anchor.setTo(0.5, 0.5);
        // // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        // screen5.add(screen5_heading);
        // Sort the lines array by name in order to apear in the right order in the paytable
        bedbugGameCore.game_specs.lines = _.orderBy(bedbugGameCore.game_specs.lines, ["id"]);
        var columnCount = 0;
        var column = 0;
        var row = 0;
        _.each(bedbugGameCore.game_specs.lines, function(line, id) {

            var lineMap = new WinningLineMap(context.game, line.id, line);

            if (columnCount % 5 == 0 && columnCount > 0) {
                column = 0;
                row++
            };

            lineMap.x = left + 40 + (column * 160);
            lineMap.y = 100 + (row * 100);
            screen5.add(lineMap);
            columnCount++;
            column++;

        });

        screen1.scale = screen2.scale = screen3.scale = screen4.scale = screen5.scale = {
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
            x: panel_x + 35,
            y: panel_y - 25,
            objects: [screen1, screen2, screen3, screen4, screen5]
        });


        // The close buton
        // Close button is  a center component. Many alignments are based on this.
        var close_button = new CustomButton(context.game, "X", panel_x + 90, panel_y + panel_height - 50, 40, 40, hidePaytable, null, false, {
            font: "bold 30px Arial"
        }, false);

        function hidePaytable() {
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            bedbugGameCore.paytableIsShowing = false;
            context.paytable.visible = false;
            slider.hideSlider();
        }
        context.paytable.add(close_button);

        var chevronRight;
        var chevronLeft;
        context.current_bullet = 0;

        chevronRight = bedbugGameCore.game.add.image(50, 0, "slider_chevron_right");
        chevronRight.scale.setTo(0.7, 0.7);

        chevronRight.x = close_button.x + close_button.width / 2 + 20;
        chevronRight.y = close_button.y - chevronRight.height / 2;
        chevronRight.inputEnabled = true;
        chevronRight.events.onInputDown.add(function(e, pointer) {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
            context.drawBullets(context.current_bullet);

            context.paytablePageIndex++; // Add one and then check
            turnToPage(context.paytablePageIndex);
            // slider.goToNext();
        }, slider);



        chevronLeft = bedbugGameCore.game.add.image(0, 0, "slider_chevron_left");
        chevronLeft.scale.setTo(0.7, 0.7);

        chevronLeft.x = close_button.x - close_button.width / 2 - chevronLeft.width - 20;
        chevronLeft.y = close_button.y - chevronLeft.height / 2;
        chevronLeft.inputEnabled = true;
        chevronLeft.events.onInputDown.add(function(e, pointer) {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
            context.drawBullets(context.current_bullet);

            context.paytablePageIndex--; // Add one and then check
            turnToPage(context.paytablePageIndex);
            // slider.goToPrev();
        }, slider);

        context.paytable.add(chevronRight);
        context.paytable.add(chevronLeft);

        function turnToPage(id) {
            // console.log(context.paytablePageIndex);

            if (id < 0) id = context.panel_pages - 1;
            if (id > context.panel_pages - 1) id = 0;

            context.paytablePageIndex = id;

            context.current_bullet = id;
            context.drawBullets(context.current_bullet);
            slider.moveToSlide(id);
        }

        slider.hideSlider();

        var bullet_size = 20
        context.page_bullets.x = panel_x + panel_width / 2 - (context.panel_pages / 2 * bullet_size);
        context.page_bullets.y = close_button.y + 10;
        // Bullets

        context.drawBullets = function(index) {
            context.page_bullets.removeAll(true);
            var bullets = bedbugGameCore.game.add.graphics(0, 0);
            _.times(context.panel_pages, function(i) {
                if (i == index) {
                    bullets.lineStyle(0);
                    bullets.beginFill(0xFFFFFF, 1);
                }
                else {
                    bullets.lineStyle(2, 0xFFFFFF);
                }
                bullets.drawCircle((bullet_size + 10) * i, 0, bullet_size);
                bullets.endFill();
            })

            context.page_bullets.add(bullets);
        }



        context.paytable.add(context.page_bullets);
        context.drawBullets(context.current_bullet);

        var client_version = context.game.add.text(panel_x + panel_width - 110, close_button.y, "Client v" + bedbugGameCore.game_specs.version, {
            font: '14px Arial',
            fill: '#fff',
            align: 'left'
        })
        context.paytable.add(client_version);



        // Change the Size of the group to fit in the new paytable 
        //this.paytable.scale.setTo(0.8, 0.8);

        function getSymbol(symbolID, x, y, dimension, points5, points4, points3) {
            var point_style = {
                'font': '23px Arial',
                'fill': '#ffba00'
            };

            var symbol = new bedbugGameCore.Slots[symbolID](context.game, 1, x + dimension / 2, y - dimension / 2, dimension, dimension);
            //   symbol.anchor.setTo(0.5,0.5);

            if (points5) {
                var coins5 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 20, "5 " + points5, point_style);
                var coins4 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 55, "4 " + points4, point_style);
                var coins3 = context.game.add.text(dimension / 2 + 20, -dimension / 2 + 85, "3 " + points3, point_style);
                coins5.addColor('#fff', 2);
                coins4.addColor('#fff', 2);
                coins3.addColor('#fff', 2);
                symbol.addChild(coins5);
                symbol.addChild(coins4);
                symbol.addChild(coins3);
            }
            return symbol;
        }
    },
    onSpinStarted: function() {
        bedbugGameCore.win = 0;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
        if (UnifiedPanel) UnifiedPanel.setUserWin();
    },
    openPaytableClose: function() {

    }

}
