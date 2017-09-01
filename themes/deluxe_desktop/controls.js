Controls = {
    create: function(context) {

        this.buttonArray = [];
        this.buttonsOffArray = [];

        this.controlsGroup = context.game.add.group();
        // Temp Ui
        // var tempUI = context.game.add.sprite(context.game.width / 2, 710, "uiassets");
        // tempUI.frameName = "MenuBar.png";
        // tempUI.anchor.setTo(0.5, 1);
        // this.controlsGroup.add(tempUI);


        // Play Button
        this.play_button = context.game.add.button(640, 659, 'assets', context.play_spin, context, 'button-spin-over.png', 'button-spin-active.png', 'button-spin-pressed-01.png', 'button-spin-active.png');
        this.play_button.anchor.setTo(.5, .5);
        // this.play_button.hitArea = new Phaser.Rectangle(-50, -25, 100, 100);
        this.buttonArray.push(this.play_button);
        this.play_button_off = context.game.add.sprite(640, 659, 'assets');
        this.play_button_off.frameName = "button-spin-inactive.png";
        this.play_button_off.anchor.setTo(.5, .5);
        this.play_button_off.visible = false;
        this.buttonsOffArray.push(this.play_button_off);

        this.countplay_button_stop = context.game.add.button(640, 659, "assets", context.stop_spin, context, 'button-spin-over.png', 'button-spin-active.png', 'button-spin-pressed-01.png', 'button-spin-active.png');
        this.countplay_button_stop.anchor.setTo(.5, .5);

        this.play_text = context.game.add.text(0, -20, '', {
            font: "16px Arial",
            fill: "#fff"
        });
        this.play_text.anchor.setTo(0.5, 1);

        this.play_count = context.game.add.text(0, 0, '', {
            font: "bold 20px Arial",
            fill: 0x076618
        });
        this.play_count.anchor.setTo(0.5, 0.4);

        this.countplay_button_stop.visible = false;


        var buttonTextStyle = {
            font: " 22px ACTypoGrotesk",
            fill: "#fff",
            align: "center"
        }

        var titleStyle = {
            font: " 20px ACTypoGrotesk",
            fill: "#000",
            align: "center"
        }
        //this.controlsGroup.addChild(this.countplay_button);

        //this.autoplay_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), 535, 623, 86, 24, this.openAutoplayPanel, this, false);
        this.autoplay_button = context.game.add.button((context.game.width / 2) - 140, 648, 'assets', this.openAutoplayPanel, context, 'button-autoplay-over.png', 'button-autoplay-active.png', 'button-autoplay-pressed.png', 'button-autoplay-active.png');
        this.autoplay_button.anchor.setTo(0.5, 0.5);
        this.autoplay_text = context.game.add.text((context.game.width / 2) - 159, 648, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), buttonTextStyle);
        this.autoplay_text.anchor.setTo(0.5, 0.5);
        this.autoplay_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.autoplay_text.resolution = 2;
        // this.autoplay_button.addChild(this.autoplay_text);
        this.buttonArray.push(this.autoplay_button);
        this.buttonArray.push(this.autoplay_text);

        this.autoplayOff_button = context.game.add.button((context.game.width / 2) - 140, 648, 'assets');
        this.autoplayOff_button.frameName = "button-autoplay-inactive.png";
        this.autoplayOff_button.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text = context.game.add.text((context.game.width / 2) - 159, 648, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), buttonTextStyle);
        this.autoplayOff_text.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text.alpha = .6;
        this.autoplayOff_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.autoplayOff_text.resolution = 2;
        // this.autoplayOff_button.addChild(this.autoplayOff_text);
        this.buttonsOffArray.push(this.autoplayOff_button);
        this.buttonsOffArray.push(this.autoplayOff_text);

        this.auto_stopcount_text = context.game.add.text(58, 2, "0", {
            font: "bold 18px Arial",
            fill: "#cecece"
        });
        this.auto_stopcount_text.anchor.setTo(0.5, 0.5);
        this.auto_stopcount_text.setShadow(0, 2, '#fff', 0);
        this.auto_stopcount_text.resolution = 2;
        this.autoplayOff_button.addChild(this.auto_stopcount_text);

        // this.autoplay_stop_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("stop"), 535, 623, 86, 24, context.controls_stop_auto, context, false);
        this.autoplay_stop_button = context.game.add.button((context.game.width / 2) - 140, 648, 'assets', context.controls_stop_auto, context, 'button-autoplay-over.png', 'button-autoplay-active.png', 'button-autoplay-pressed.png', 'button-autoplay-active.png');
        this.autoplay_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text = context.game.add.text(-19, 0, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LABEL"), buttonTextStyle);
        this.autoplay_stop_text.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.autoplay_stop_text.resolution = 2;

        this.autoplay_stop_button.addChild(this.autoplay_stop_text);
        this.autoplay_stop_button.visible = false;


        //this.paytable_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), 550, 653, 122, 24, context.showPayTable, context, false);
        this.paytable_button = context.game.add.button((context.game.width / 2) - 140, 683, 'assets', context.showPayTable, context, 'button-paytable-over.png', 'button-paytable-active.png', 'button-paytable-pressed.png', 'button-paytable-active.png');
        this.paytable_button.anchor.setTo(0.5, 0.5);

        this.paytable_text = context.game.add.text((context.game.width / 2) - 140, 663, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), buttonTextStyle);
        this.paytable_text.anchor.setTo(0.5, 0.5);
        this.paytable_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.paytable_text.resolution = 2;
        // this.paytable_button.addChild(this.paytable_text);
        this.buttonArray.push(this.paytable_button);
        this.buttonArray.push(this.paytable_text);

        this.paytableOff_button = context.game.add.button((context.game.width / 2) - 140, 683, 'assets');
        this.paytableOff_button.frameName = "button-paytable-inactive.png";
        this.paytableOff_button.anchor.setTo(0.5, 0.5);
        this.paytableOff_text = context.game.add.text((context.game.width / 2) - 140, 663, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), buttonTextStyle);
        this.paytableOff_text.anchor.setTo(0.5, 0.5);
        this.paytableOff_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.paytableOff_text.resolution = 2;
        this.paytableOff_text.alpha = .6;
        // this.paytableOff_button.addChild(this.paytableOff_text);
        this.buttonsOffArray.push(this.paytableOff_button);
        this.buttonsOffArray.push(this.paytableOff_text);

        this.max_bet_button = context.game.add.button((context.game.width / 2) + 140, 665, 'assets', context.setMaxBet, context, 'button-max-bet-over.png', 'button-max-bet-active.png', 'button-max-bet-pressed.png', 'button-max-bet-active.png');
        this.max_bet_button.anchor.setTo(0.5, 0.5);
        this.maxbet_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), buttonTextStyle);
        this.maxbet_text.anchor.setTo(0.5, 0.5);
        this.maxbet_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.maxbet_text.resolution = 2;
        this.max_bet_button.addChild(this.maxbet_text);
        this.buttonArray.push(this.max_bet_button);

        this.max_betOff_button = context.game.add.button((context.game.width / 2) + 140, 665, 'assets');
        this.max_betOff_button.frameName = "button-max-bet-inactive.png";
        this.max_betOff_button.anchor.setTo(0.5, 0.5);
        this.maxbetOff_text = context.game.add.text(0, 0, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), buttonTextStyle);
        this.maxbetOff_text.anchor.setTo(0.5, 0.5);
        this.maxbetOff_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        this.maxbetOff_text.resolution = 2;
        this.maxbetOff_text.alpha = .6;
        this.max_betOff_button.addChild(this.maxbetOff_text);
        this.buttonsOffArray.push(this.max_betOff_button);



        // this.decr_level_button = new CustomButton(context.game, "-", 274, 644, 26, 24, bedbugGameCore.decrBetLevel);
        this.decr_level_button = context.game.add.button(168, 678, 'assets', bedbugGameCore.decrBetLevel, this, 'button-arrow-minus-over.png', 'button-arrow-minus-active.png', 'button-arrow-minus-pressed.png', 'button-arrow-minus-active.png');
        this.decr_level_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.decr_level_button);

        this.decr_levelOff_button = context.game.add.button(168, 678, 'assets');
        this.decr_levelOff_button.frameName = "button-arrow-minus-inactive.png";
        this.decr_levelOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.decr_levelOff_button);


        //this.incr_level_button = new CustomButton(context.game, "+", 349, 644, 26, 24, bedbugGameCore.incrBetLevel);
        this.incr_level_button = context.game.add.button(268, 678, 'assets', bedbugGameCore.incrBetLevel, this, 'button-arrow-plus-over.png', 'button-arrow-plus-active.png', 'button-arrow-plus-pressed.png', 'button-arrow-plus-active.png');
        this.incr_level_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.incr_level_button);

        this.incr_levelOff_button = context.game.add.button(268, 678, 'assets');
        this.incr_levelOff_button.frameName = "button-arrow-plus-inactive.png";
        this.incr_levelOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.incr_levelOff_button);


        this.decr_coin_value_button = context.game.add.button(1013, 678, 'assets', bedbugGameCore.decrCoinValue, this, 'button-arrow-minus-over.png', 'button-arrow-minus-active.png', 'button-arrow-minus-pressed.png', 'button-arrow-minus-active.png');
        this.decr_coin_value_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.decr_coin_value_button);

        this.decr_coin_valueOff_button = context.game.add.button(1013, 678, 'assets');
        this.decr_coin_valueOff_button.frameName = "button-arrow-minus-inactive.png";
        this.decr_coin_valueOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.decr_coin_valueOff_button);


        this.incr_coin_value_button = context.game.add.button(1112, 678, 'assets', bedbugGameCore.incrCoinValue, this, 'button-arrow-plus-over.png', 'button-arrow-plus-active.png', 'button-arrow-plus-pressed.png', 'button-arrow-plus-active.png');
        this.incr_coin_value_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.incr_coin_value_button);

        this.incr_coin_valueOff_button = context.game.add.button(1112, 678, 'assets');
        this.incr_coin_valueOff_button.frameName = "button-arrow-plus-inactive.png";
        this.incr_coin_valueOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.incr_coin_valueOff_button);





        // Label BGs
        this.BetField = context.game.add.sprite(285, 670, "assets");
        this.BetField.frameName = "BET_PANEL.png";
        this.BetField.anchor.setTo(.5, .5);
        this.controlsGroup.addChild(this.BetField);

        this.CoinsField = context.game.add.sprite(995, 670, "assets");
        this.CoinsField.frameName = "COIN_VALUE_Panel.png";
        this.CoinsField.anchor.setTo(.5, .5);
        this.controlsGroup.addChild(this.CoinsField);

        // this.BetLevel_Field = context.game.add.sprite(250, 660, "uiassets");
        // this.BetLevel_Field.frameName = "BetLevel_Field.png";
        // this.BetLevel_Field.anchor.setTo(.5, .5);



        // this.CoinValue_Field = context.game.add.sprite(1030, 660, "uiassets");
        // this.CoinValue_Field.frameName = "CoinValue_Field.png";
        // this.CoinValue_Field.anchor.setTo(.5, .5);


        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }

        for (var i = 0; i < this.buttonArray.length; i++) {
            this.buttonsOffArray[i].visible = false;
        }


        this.controlsGroup.addChild(this.autoplay_button);
        this.controlsGroup.addChild(this.autoplay_text);
        this.controlsGroup.addChild(this.autoplayOff_button);
        this.controlsGroup.addChild(this.autoplayOff_text);
        this.controlsGroup.addChild(this.autoplay_stop_button);
        this.controlsGroup.addChild(this.paytable_button);
        this.controlsGroup.addChild(this.paytableOff_button);

        // (game, label, x, y, width, height, isDraggable, prestyle)
        this.autoplay_label = new CustomLabel(context.game, bedbugGameCore.autoplay_count, 58, 0, 30, 25);
        this.autoplay_Stop_label = new CustomLabel(context.game, bedbugGameCore.autoplay_count, 58, 0, 30, 25);

        this.coins_label = new CustomLabel(context.game, "500000", -63, 8, 100, 40);
        this.coin_value_label = new CustomLabel(context.game, "0.01", 68, 8, 46, 40);
        this.bet_level_label = new CustomLabel(context.game, "0.01", -68, 8, 46, 40);
        this.bet_label = new CustomLabel(context.game, "20", 63, 8, 100, 40);

        this.autoplay_button.addChild(this.autoplay_label);
        this.autoplay_stop_button.addChild(this.autoplay_Stop_label);

        this.BetField.addChild(this.bet_label);
        this.BetField.addChild(this.bet_level_label);
        this.CoinsField.addChild(this.coins_label);
        this.CoinsField.addChild(this.coin_value_label);

        this.controlsGroup.addChild(this.max_bet_button);
        this.controlsGroup.addChild(this.decr_level_button);
        this.controlsGroup.addChild(this.incr_level_button);
        this.controlsGroup.addChild(this.decr_coin_value_button);
        this.controlsGroup.addChild(this.incr_coin_value_button);

        this.controlsGroup.addChild(this.max_betOff_button);
        this.controlsGroup.addChild(this.decr_levelOff_button);
        this.controlsGroup.addChild(this.incr_levelOff_button);
        this.controlsGroup.addChild(this.decr_coin_valueOff_button);
        this.controlsGroup.addChild(this.incr_coin_valueOff_button);

        //this.BetLevel_Field.addChild(this.bet_level_label);

        // this.CoinValue_Field.addChild(this.coin_value_label);

        // ///////////// DRAG INFO
        // this.bet_label.inputEnabled = true;
        // this.bet_label.blockInput = true;
        // this.bet_label.input.enableDrag();
        // this.bet_label.events.onDragStop.add(onDragStop, this);

        var style = {
            font: "16px Arial",
            fill: "#fff",
            fontWeight: "bold"
        };
        this.betlevel_heading = context.game.add.text(216, 625, bedbugGameCore.getLocalizedText('TXT_BET_LEVEL_LABEL'), titleStyle);
        this.betlevel_heading.anchor.setTo(.5);
        this.betlevel_heading.setShadow(0, 3, 'rgba(255,255,255,.9)', 0);
        this.betlevel_heading.resolution = 2;

        this.bet_heading = context.game.add.text(350, 625, bedbugGameCore.getLocalizedText("TXT_BET_LABEL"), titleStyle);
        this.bet_heading.anchor.setTo(.5);
        this.bet_heading.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.bet_heading.resolution = 2;

        this.coins_heading = context.game.add.text(935, 625, bedbugGameCore.getLocalizedText("TXT_COINS_LABEL"), titleStyle);
        this.coins_heading.anchor.setTo(.5);
        this.coins_heading.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.coins_heading.resolution = 2;

        this.coin_value_heading = context.game.add.text(1061, 625, bedbugGameCore.getLocalizedText("TXT_COIN_VALUE_LABEL"), titleStyle);
        this.coin_value_heading.anchor.setTo(.5);
        this.coin_value_heading.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.coin_value_heading.resolution = 2;



        this.controlsGroup.addChild(this.play_button);
        this.controlsGroup.addChild(this.play_button_off);
        this.controlsGroup.addChild(this.countplay_button_stop);

        this.controlsGroup.y = this.controlsGroup.y - 20;
        // Draw the Autoplay option
        this.createAutoplayPanel(context);

        UnifiedPanel.create(context);

        bedbugEventsSystem.addListener('ON_CONTROL_PANEL_UPDATE', this.update);

        bedbugEventsSystem.addListener('ON_RESULT_RECEIVED', this.enableStop);

        this.update();
    },
    showStopPlay: function() {
        this.play_button.visible = false;

        this.countplay_button_stop.visible = true;
        this.countplay_button_stop.alpha = 0.0;
        this.countplay_button_stop.inputEnabled = false;
    },
    showPlay: function() {
        this.play_button.visible = true;
        this.countplay_button_stop.visible = false;
    },
    setCount: function(count) {
        if (count == 0)
            this.play_count.visible = false;
        else
            this.play_count.visible = true;

        // this.play_count.setText(count);
    },
    setCountText: function(text) {
        // this.play_text.setText(text);
    },
    disableBtn: function(button) {
        button.alpha = 0.5;
        //button.inputEnabled = false;
    },
    enableStop: function() {
        if (bedbugGameCore.settings.fast_spins) return;
        // console.log("Result received: Enabling STOP button");
        Controls.enableBtn(Controls.countplay_button_stop);
    },
    disableStop: function() {
        Controls.countplay_button_stop.inputEnabled = false;
        Controls.countplay_button_stop.alpha = 0;
    },
    enableBtn: function(button) {
        button.alpha = 1.0;
        button.inputEnabled = true;
    },
    update: function() {

        // Disable Buttons Logic
        if (bedbugGameCore.coin_value_current == bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues.length - 1)
            Controls.disableBtn(Controls.incr_coin_value_button);
        else if (bedbugGameCore.coin_value_current == 0)
            Controls.disableBtn(Controls.decr_coin_value_button);
        else {
            Controls.enableBtn(Controls.decr_coin_value_button);
            Controls.enableBtn(Controls.incr_coin_value_button);

        }

        if (bedbugGameCore.bet_level == 1) {
            Controls.disableBtn(Controls.decr_level_button);
            Controls.enableBtn(Controls.incr_level_button);
        }
        else if (bedbugGameCore.bet_level_step == bedbugGameCore.bet_levels.length - 1) {
            Controls.disableBtn(Controls.incr_level_button);
            Controls.enableBtn(Controls.decr_level_button);
        }
        else {
            Controls.enableBtn(Controls.decr_level_button);
            Controls.enableBtn(Controls.incr_level_button);
        }

        Controls.autoplay_stepper.setLabel(bedbugGameCore.autoplay_count);
        Controls.autoplay_label.setLabel(bedbugGameCore.autoplay_count);
        Controls.autoplay_Stop_label.setLabel(bedbugGameCore.autoplay_count);
        Controls.coin_value_label.setLabel(bedbugGameCore.addZeroes(bedbugGameCore.coin_value));
        Controls.coins_label.setLabel(bedbugGameCore.numberWithSpaces(Math.round(bedbugGameCore.coins)));
        Controls.bet_level_label.setLabel(bedbugGameCore.bet_level);
        Controls.bet_label.setLabel(bedbugGameCore.bet_coins);
    },
    openPaytableClose: function(game) {
        this.close_button2.visible = true;
    },
    closePaytableClose: function(game) {
        this.close_button2.visible = false;
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
    openAutoplayPanel: function(context) {
        if (!bedbugGameCore.controls_enabled) return;

        // FIX: On Autoplay panel open reset stepper to 0
        bedbugGameCore.autoplay_current_step = 0;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        Controls.autoplay_panel.visible = true;
        Controls.back_panel.visible = true;
        context.game.world.bringToTop(Controls.autoplay_panel); // BRING TO TOP
    },
    stopAutoplay: function() {
        // console.log("------------- stop auto-play  ")
        var that = this;
        that.play_button.alpha = 1;
        that.showPlay();
        that.play_button.inputEnabled = true;
        // that.countplay_button.alpha = 0;
        that.countplay_button_stop.inputEnabled = true;
        that.autoplay_stop_button.visible = false;
        that.autoplay_button.visible = true;
        bedbugGameCore.autoplay_started = false;
        bedbugGameCore.autoplay_count = 0;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },
    createAutoplayPanel: function(context) {

        console.log()
        var that = this;
        var width = 500;
        var height = 500;

        var buttonTextStyle = {
            font: " 18px ACTypoGrotesk",
            fill: "#fff",
            align: "center"
        }

        var titleStyle = {
            font: " 20px ACTypoGrotesk",
            fill: "#000",
            align: "center"
        }

        // Black Solid Background
        this.back_panel = context.game.add.graphics(0, 0);
        this.back_panel.beginFill(0x000000, 0.3);
        this.back_panel.drawRect(-100, -100, 1680, 1000);
        this.back_panel.endFill();

        this.back_panel.inputEnabled = true;
        //panel_background.blockInput = true;

        this.back_panel.events.onInputUp.add(function(btn) {
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            closeAutoplayPanel();
        }, this);

        this.autoplay_Panel_Bg = bedbugGameCore.game.add.sprite(155, -25, "assets", "autoplay-panel-01.png");
        this.autoplay_Panel_Bg.anchor.setTo(0, .0);
        this.autoplay_Panel_Bg.scale.setTo(1.0, 1.0);
        this.autoplay_Panel_Bg.inputEnabled = true;
        this.autoplay_Panel_Bg2 = bedbugGameCore.game.add.sprite(-13, -55, "assets", "autoplay-panel-02.png");
        this.autoplay_Panel_Bg2.scale.setTo(1, 1);
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
            alpha: 1.0,
            isGradient: false,
            rampColor1: bedbugGameCore.game_specs.messages.style.normal.rampColor1,
            rampColor2: bedbugGameCore.game_specs.messages.style.normal.rampColor2
        };

        this.autoplay_panel = context.game.add.group();
        //this.autoplay_panel.scale.setTo(.60,.60);
        this.autoplay_panel.x = bedbugGameCore.game.width / 2 - 382;
        this.autoplay_panel.y = bedbugGameCore.game.height / 2 + 69;

        this.autoplay_panel2 = context.game.add.group();
        //this.autoplay_panel2.scale.setTo(.60,.60);
        this.autoplay_panel2.x = bedbugGameCore.game.width / 2 - 43;
        this.autoplay_panel2.y = bedbugGameCore.game.height / 2 + 100;

        // this.back_panel = this.createPopupBG(context.game, bedbugGameCore.game.width, bedbugGameCore.game.height, true, autoPlayStyle, closeAutoplayPanel);
        // this.back_panel.x = 0;
        // this.back_panel.y = 0;



        this.autoplay_panel.add(this.autoplay_Panel_Bg);
        this.autoplay_panel2.add(this.autoplay_Panel_Bg2);

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



        var options = {
            checkBoxLine: 3,
            color: 0x333333,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 115
        };


        this.autoplay_stepper = new StepperSmall(context.game, null, bedbugGameCore.autoplay_count, context.decrAutoplayCount, context.incrAutoplayCount, (width / 2) - 7, 34, 52, 130, true, {
                font: "bold 20px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#FFF"
                },
                stepperBgAlpha: 0,
                stepperBgColor: 0x555555,
                backgroundAlpha: 0
            },
            true, "assets", "TextBox_Small.png", "arrow", false, 1
        );
        //this.autoplay_stepper.scale.setTo(.35,.35);
        //this.autoplay_stepper.scale.setTo(1, 1);
        this.autoplay_panel.add(this.autoplay_stepper);

        // Title
        this.title_text = context.game.add.text(245, 0, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), titleStyle);
        this.title_text.anchor.setTo(0.5, 0.5);
        this.title_text.resolution = 2;
        this.title_text.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.autoplay_panel.add(this.title_text);

        // ADD BUTTON TO NEXT PANEL
        this.advancedOptions = context.game.add.button(245, 82, 'assets', openAutoplayPanel2, this, 'autoplay-panel-button-over.png', 'autoplay-panel-button-active.png', 'autoplay-panel-button-pressed.png', 'autoplay-panel-button-active.png');
        this.advancedOptions.anchor.setTo(0.5, 0.5);

        this.advanced_text = context.game.add.text(245, 82, bedbugGameCore.getLocalizedText("TXT_ADVANCED_OPTIONS"), buttonTextStyle);
        this.advanced_text.anchor.setTo(0.5, 0.5);
        this.advanced_text.resolution = 2;
        this.advanced_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);

        // this.advancedOptions.addChild(this.advanced_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel.add(this.advancedOptions);
        this.autoplay_panel.add(this.advanced_text);

        // ADD START AUTOPLAY TO NEXT PANEL
        this.startAuto = context.game.add.button(245, 120, 'assets', startAutoplayPanel, this, 'autoplay-panel-button-over.png', 'autoplay-panel-button-active.png', 'autoplay-panel-button-pressed.png', 'autoplay-panel-button-active.png');
        this.startAuto.anchor.setTo(0.5, 0.5);
        this.startAuto_text = context.game.add.text(245, 120, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_START_LABEL"), buttonTextStyle);
        this.startAuto_text.anchor.setTo(0.5, 0.5);
        this.startAuto_text.resolution = 2;
        this.startAuto_text.setShadow(0, 4, 'rgba(0,0,0,0.2)', 0);
        // this.startAuto.addChild(this.startAuto_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel.add(this.startAuto);
        this.autoplay_panel.add(this.startAuto_text);
        // ADD CLOSE BUTTON
        // this.backToGame = context.game.add.button(255, 200, 'assets', closeAutoplayPanel, this, 'AUTOPLAY_OVER.png', 'AUTOPLAY_active.png', 'AUTOPLAY_off.png', 'AUTOPLAY_active.png');
        // //this.backToGame = context.game.add.button(740, 15, 'mobile', closeAutoplayPanel, this, 'btn_close_pressed.png', 'btn_close_pressed.png', 'btn_close_active.png');
        // this.backToGame.anchor.setTo(0.5, 0.5);
        // this.startAuto_text = context.game.add.bitmapText(0, 3, "font_small", bedbugGameCore.getLocalizedText("START"), 25);
        // this.advanced_text.anchor.setTo(0.5, 0.5);
        // this.advancedOptions.addChild(this.advanced_text);
        // this.autoplay_panel.add(this.backToGame);

        this.panel2Open = false;

        function openAutoplayPanel2() {
            console.log("Open Panel");
            if (!this.autoplay_panel2.visible) {
                this.autoplay_panel2.visible = true;
                this.panel2Open = true;
            }
            else {
                this.autoplay_panel2.visible = false;
                this.panel2Open = false;
            }
        }

        function startAutoplayPanel() {
            checkAutoplayStatusAndPlay();
            this.autoplay_panel.visible = false;
            this.autoplay_panel2.visible = false;
            this.back_panel.visible = false;
        }

        function closeAutoplayPanel() {
            that.autoplay_panel.visible = false;
            that.autoplay_panel2.visible = false;
            that.back_panel.visible = false;
            that.panel2Open = false;

            // Reset Autoplay Count
            bedbugGameCore.autoplay_count = 0;
            // Reset labels
            Controls.autoplay_stepper.setLabel(bedbugGameCore.autoplay_count);
            Controls.autoplay_label.setLabel(bedbugGameCore.autoplay_count);
            Controls.autoplay_Stop_label.setLabel(bedbugGameCore.autoplay_count);
        }

        function closeAutoplayPanel2() {
            this.autoplay_panel.visible = true;
            this.autoplay_panel2.visible = false;
        }



        var inputStyle = {
            fillAlpha: 0,
            fill: '#fff'
        }

        // STOP AT ANY WIN
        this.stop_any_checkbox = new CheckΒoxSmall(8, -37, context.game, null, null, bedbugGameCore.autoplay_setup.on_win.checked, options, function(o) {
            bedbugGameCore.autoplay_setup.on_win.checked = o
        });
        this.stop_any_text = context.game.add.text(30, 0, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_ANY"), titleStyle);
        this.stop_any_text.anchor.setTo(0, 0);
        this.stop_any_text.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.stop_any_text.resolution = 2;

        // ADD TEXT AS CHILD
        this.stop_any_checkbox.addChild(this.stop_any_text);
        this.stop_any_checkbox.scale.setTo(1, 1);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_panel2.add(this.stop_any_checkbox);

        // STOP AT WIN AMOUNT
        this.stop_win_amount = new CheckΒoxSmall(8, -4, context.game, null, bedbugGameCore.autoplay_setup.on_win_amount.value, bedbugGameCore.autoplay_setup.on_win_amount.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_win_amount.checked = o;
            if (e)
                bedbugGameCore.autoplay_setup.on_win_amount.value = e;
        }, null, null, null, inputStyle);

        this.stop_win_text = context.game.add.text(30, -2, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT"), titleStyle);
        this.stop_win_text.anchor.setTo(0, 0);
        this.stop_win_text.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.stop_win_text.resolution = 2;

        // ADD TEXT AS CHILD
        this.stop_win_amount.addChild(this.stop_win_text);

        // STOP AT CASH
        this.stop_cash_amount = new CheckΒoxSmall(8, 29, context.game, null, bedbugGameCore.autoplay_setup.on_cash_amount.value, bedbugGameCore.autoplay_setup.on_cash_amount.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_cash_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_cash_amount.value = e
        }, null, null, null, inputStyle);
        this.stop_cash_text = context.game.add.text(30, -2, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_CASH"), titleStyle);
        this.stop_cash_text.anchor.setTo(0, 0);
        this.stop_cash_text.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.stop_cash_text.resolution = 2;
        // ADD TEXT AS CHILD
        this.stop_cash_amount.addChild(this.stop_cash_text);
        // STOP AT TIME
        this.stop_time = new CheckΒoxSmall(8, 62, context.game, null, bedbugGameCore.autoplay_setup.on_time.value, bedbugGameCore.autoplay_setup.on_time.checked, options, function(o, e, m) {
            bedbugGameCore.autoplay_setup.on_time.checked = o;
            if (e && m) bedbugGameCore.autoplay_setup.on_time.value = [e, m];
        }, null, null, null, inputStyle);
        this.stop_time_text = context.game.add.text(30, -2, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME"), titleStyle);
        this.stop_time_text.anchor.setTo(0, 0);
        this.stop_time_text.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.stop_time_text.resolution = 2;
        // ADD TEXT AS CHILD
        this.stop_time.addChild(this.stop_time_text);

        // STOP AT LOSE
        this.stop_lose = new CheckΒoxSmall(8, 95, context.game, null, bedbugGameCore.autoplay_setup.on_lose.value, bedbugGameCore.autoplay_setup.on_lose.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_lose.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_lose.value = e;
        }, null, null, null, inputStyle);
        this.stop_lose_text = context.game.add.text(30, -2, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE"), titleStyle);
        this.stop_lose_text.anchor.setTo(0, 0);
        this.stop_lose_text.setShadow(0, 3, 'rgba(255,255,255,0.9)', 0);
        this.stop_lose_text.resolution = 2;
        // ADD TEXT AS CHILD
        this.stop_lose.addChild(this.stop_lose_text);

        // ADD Back BUTTON
        // this.backToAutoplay = context.game.add.button( 740, 15, 'mobile', closeAutoplayPanel2, this, 'btn_back_pressed.png', 'btn_back_pressed.png', 'btn_back_active.png');
        // this.backToAutoplay.anchor.setTo(0.5, 0.5);
        // this.autoplay_panel2.add(this.backToAutoplay);


        this.autoplay_panel2.add(this.stop_lose);
        this.autoplay_panel2.add(this.stop_time);
        this.autoplay_panel2.add(this.stop_cash_amount);

        this.autoplay_panel2.add(this.stop_win_amount);

        this.autoplay_panel.visible = false;
        this.autoplay_panel2.visible = false;
        this.back_panel.visible = false;
        // ///////////// DRAG INFO
        // this.autoplay_panel.inputEnabled = true;
        // this.autoplay_panel.blockInput = true;
        // this.autoplay_panel.input.enableDrag();
        // this.autoplay_panel.events.onDragStop.add(onDragStop, this);
        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }
    },
    createPopupBG: function(game, width, height, shouldCloseExternalClick, style, onClickOutsideCallback, scope) {

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

        var panel_background = game.add.sprite(bedbugGameCore.game.width / 2, bedbugGameCore.game.height / 2, "assets", "paytable-panel.png");
        panel_background.anchor.setTo(.5, .5)
        panel_background.inputEnabled = true;


        var panel_block_input = game.add.graphics(0, 0);
        panel_block_input.beginFill(0x000000, 0.3);
        panel_block_input.drawRect(-100, -100, 1680, 1000);
        panel_block_input.endFill();

        panel_block_input.inputEnabled = true;
        //panel_background.blockInput = true;

        panel_block_input.events.onInputUp.add(function(btn) {
            // if (shouldCloseExternalClick) {
            //     popup.visible = false;
            // }
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');

            if (onClickOutsideCallback)
                onClickOutsideCallback(scope);

        }, this);

        popup.add(panel_block_input);
        popup.add(panel_background);

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
        context.panel_pages = 2;
        context.page_bullets = context.game.add.group();

        var panel_height = 600;
        var panel_width = 762;
        var panel_x = (context.game.width / 2 - panel_width / 2);
        var panel_y = 20;

        var paytable_area = Controls.createPopupBG(context.game, panel_width, panel_height + 30, true, null, hidePaytable, this);


        paytable_area.y -= 30;
        context.paytable.x = 0;

        context.paytable.add(paytable_area);

        var legal_text = context.game.add.text(panel_x + panel_width / 2, panel_y + panel_height - 190, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_GENERAL_INFO"), {
            font: '16px Arial',
            fill: '#fff',
            align: 'center',

            wordWrap: true,
            wordWrapWidth: panel_width
        });
        legal_text.lineSpacing = -2;
        legal_text.resolution = 2;
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
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_01"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_04"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_05"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_06"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_07"));
        // console.log(bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_08"));
        var screen1 = context.game.add.group();

        // WILD SYMBOL
        var titleText = context.game.add.text(430, 125, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_01"), {
            'font': ' 55px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "500"
        });
        titleText.anchor.setTo(0.5, 0.5);

        // WILD SYMBOL
        var winSymbol = context.game.add.sprite((panel_width / 2) - 180, 270, "assets", "15x3-win-layout.png")
        winSymbol.anchor.setTo(.5, .5);
        winSymbol.scale.setTo(1.2);

        var wildText = context.game.add.text(winSymbol.x, winSymbol.y + 130, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"), {
            'font': ' 45px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "400"
        });

        wildText.anchor.setTo(0.5, 0.5);

        // SCATTER SYMBOL
        var loseSymbol = context.game.add.sprite((panel_width / 2) + 280, 270, "assets", "15x3-no-win-layout.png")
        loseSymbol.anchor.setTo(.5, .5);
        loseSymbol.scale.setTo(1.2);


        var scatterText = context.game.add.text(loseSymbol.x, loseSymbol.y + 130, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03"), {
            'font': '45px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "400"
        });
        scatterText.anchor.setTo(0.5, 0.5);


        // screen1.add(screen1_heading);
        screen1.add(titleText);
        screen1.add(winSymbol);
        screen1.add(loseSymbol);
        screen1.add(wildText);
        screen1.add(scatterText);
        // screen1.add(freeSpinsText);
        // screen1.add(freeSpinsText2);


        /* PAGE 3 */
        var screen3 = context.game.add.group();
        // var screen3_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen3_heading.anchor.setTo(0.5, 0.5);
        // screen3_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var symbol1 = getSymbol(bedbugGameCore.symbolNameToID("P4"), left + 50, 180, 130, getAward("P4", "5"), getAward("P4", "4"), getAward("P4", "3"));
        var symbol2 = getSymbol(bedbugGameCore.symbolNameToID("P3"), left + 270, 180, 130, getAward("P3", "5"), getAward("P3", "4"), getAward("P3", "3"));
        var symbol3 = getSymbol(bedbugGameCore.symbolNameToID("P2"), left + 480, 180, 130, getAward("P2", "5"), getAward("P2", "4"), getAward("P2", "3"));
        var symbol4 = getSymbol(bedbugGameCore.symbolNameToID("P1"), left + 700, 180, 130, getAward("P1", "5"), getAward("P1", "4"), getAward("P1", "3"));
        // var symbol5 = getSymbol(bedbugGameCore.symbolNameToID("M1"), left + 615, 390, 130, 250, 40, 20);
        var symbol7 = getSymbol(bedbugGameCore.symbolNameToID("L4"), left + 50, 360, 130, getAward("L4", "5"), getAward("L4", "4"), getAward("L4", "3"));
        var symbol8 = getSymbol(bedbugGameCore.symbolNameToID("L3"), left + 270, 360, 130, getAward("L3", "5"), getAward("L3", "4"), getAward("L3", "3"));
        var symbol9 = getSymbol(bedbugGameCore.symbolNameToID("L2"), left + 480, 360, 130, getAward("L2", "5"), getAward("L2", "4"), getAward("L2", "3"));
        var symbol10 = getSymbol(bedbugGameCore.symbolNameToID("L1"), left + 700, 360, 130, getAward("L1", "5"), getAward("L1", "4"), getAward("L1", "3"));

        screen3.add(symbol1);
        screen3.add(symbol2);
        screen3.add(symbol3);
        screen3.add(symbol4);
        screen3.add(symbol7);
        screen3.add(symbol8);
        screen3.add(symbol9);
        screen3.add(symbol10);
        // screen3.add(symbol5);
        // screen3.add(screen3_heading);



        /* PAGE 4 */
        // var screen4 = context.game.add.group();
        // var screen4_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen4_heading.anchor.setTo(0.5, 0.5);
        // // screen4_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        // // var symbol6 = getSymbol(bedbugGameCore.symbolNameToID("L5"), left + 215, 200, 130, 150, 30, 15);
        // var symbol7 = getSymbol(bedbugGameCore.symbolNameToID("L4"), left + 495, 200, 130, 125, 30, 15);
        // var symbol8 = getSymbol(bedbugGameCore.symbolNameToID("L3"), left + 95, 380, 130, 100, 24, 12);
        // var symbol9 = getSymbol(bedbugGameCore.symbolNameToID("L2"), left + 350, 380, 130, 70, 20, 10);
        // var symbol10 = getSymbol(bedbugGameCore.symbolNameToID("L1"), left + 605, 380, 130, 50, 20, 10);
        // // screen4.add(symbol6);
        // screen4.add(symbol7);
        // screen4.add(symbol8);
        // screen4.add(symbol9);
        // screen4.add(symbol10);
        // screen4.add(screen4_heading);


        // Sort the lines array by name in order to apear in the right order in the paytable
        bedbugGameCore.game_specs.lines = _.orderBy(bedbugGameCore.game_specs.lines, ["id"]);

        var lineChunks = _.chunk(bedbugGameCore.game_specs.lines, 30);

        /* PAGE 5 */
        // var screen5 = context.game.add.group();
        // // this.paytable.add(screen5);
        // // var screen5_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_betlines_heading"), headingStyle);
        // // screen5_heading.anchor.setTo(0.5, 0.5);
        // // // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        // // screen5.add(screen5_heading);

        // var columnCount = 0;
        // var column = 0;
        // var row = 0;
        // _.each(lineChunks[0], function(line, id) {
        //     var lineMap = new WinningLineMap(context.game, line.id, line, 12, 12, 3);

        //     if (columnCount % 6 == 0 && columnCount > 0) {
        //         column = 0;
        //         row++;
        //     };
        //     lineMap.x = left + 40 + (column * 130);
        //     lineMap.y = 140 + (row * 100);
        //     screen5.add(lineMap);
        //     columnCount++;
        //     column++;
        // });

        // /* PAGE 6 */
        // var screen6 = context.game.add.group();
        // // this.paytable.add(screen5);
        // var screen6_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_betlines_heading"), headingStyle);
        // screen6_heading.anchor.setTo(0.5, 0.5);
        // // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        // screen6.add(screen6_heading);

        // var columnCount = 0;
        // var column = 0;
        // var row = 0;


        // _.each(lineChunks[1], function(line, id) {
        //     var lineMap = new WinningLineMap(context.game, line.id, line);

        //     if (columnCount % 5 == 0 && columnCount > 0) {
        //         column = 0;
        //         row++
        //     };
        //     lineMap.x = left + 40 + (column * 160);
        //     lineMap.y = 130 + (row * 130);
        //     screen6.add(lineMap);
        //     columnCount++;
        //     column++;
        // });

        screen1.scale = screen3.scale = {
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
            objects: [screen1, screen3]
        });


        // The close buton
        // Close button is  a center component. Many alignments are based on this.
        // var close_button = new CustomButton(context.game, "X", panel_x + 90, panel_y + panel_height -30, 40, 40, hidePaytable, null, false, {
        //     font: "bold 30px Arial"
        // }, false);

        // CLOSE BUTTON
        var close_button = bedbugGameCore.game.add.button(panel_width / 2, panel_y + panel_height - 30, context.game.cache.checkImageKey('mobile') ? 'mobile' : null, hidePaytable, this, context.game.cache.checkImageKey('btn_close_pressed.png') ? 'btn_close_pressed.png' : null, context.game.cache.checkImageKey('btn_close_pressed.png') ? 'btn_close_pressed.png' : null, 'btn_close_active.png');
        close_button.anchor.setTo(.5, .5);
        close_button.scale.setTo(0.5, 0.5);
        close_button.alpha = 0;

        this.close_button2 = bedbugGameCore.game.add.button(260, 560, 'assets', hidePaytable, this, 'paytable-home-button-over.png', 'paytable-home-button-active.png', 'paytable-home-button-pressed.png', 'paytable-home-button-active.png');
        this.close_button2.anchor.setTo(.5, .5);
        this.close_button2.visible = false;
        //close_button.scale.setTo(0.5, 0.5);
        // this.close_button2.input.enableDrag();
        // this.close_button2.events.onDragStop.add(onDragStop, this);




        function hidePaytable() {
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            bedbugGameCore.paytableIsShowing = false;
            context.paytable.visible = false;
            slider.hideSlider();
            that.close_button2.visible = false;
        }


        var chevronRight;
        var chevronLeft;
        context.current_bullet = 0;

        chevronRight = bedbugGameCore.game.add.button(50, 0, 'assets', chevronRightPress, this, 'paytable-right-button-over.png', 'paytable-right-button-active.png', 'paytable-right-button-pressed.png', 'paytable-right-button-active.png');
        chevronRight.x = 283;
        chevronRight.y = 538;


        chevronLeft = bedbugGameCore.game.add.button(50, 0, 'assets', chevronLeftPress, this, 'paytable-left-button-over.png', 'paytable-left-button-active.png', 'paytable-left-button-pressed.png', 'paytable-left-button-active.png');
        //chevronLeft.scale.setTo(0.5, 0.5);

        chevronLeft.x = 172;
        chevronLeft.y = 538;



        // chevronRight.input.enableDrag();
        // chevronRight.events.onDragStop.add(onDragStop, this);
        // chevronLeft.input.enableDrag();
        // chevronLeft.events.onDragStop.add(onDragStop, this);
        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }

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

        context.paytable.add(chevronRight);
        context.paytable.add(chevronLeft);

        slider.hideSlider();

        var bullet_size = 150
        context.page_bullets.x = panel_width / 2 + bullet_size;
        context.page_bullets.y = close_button.y - 28;


        context.drawBullets = function(index) {
            context.page_bullets.removeAll(true);

            _.times(context.panel_pages, function(i) {
                var bullets = bedbugGameCore.game.add.sprite(0, 0, "assets");
                if (i == index) {

                    bullets.frameName = "paytable-page-tab-on.png";
                }
                else {

                    bullets.frameName = "paytable-page-tab-off.png";
                }

                bullets.x = 80 + (57 * i);
                bullets.anchor.setTo(.5, .5);
                context.page_bullets.add(bullets);
                //console.log(context.page_bullets.length);
            })



        }


        context.paytable.add(context.page_bullets);
        context.drawBullets(context.current_bullet);

        var client_version = context.game.add.text(panel_x + panel_width - 20, 555, "Client v" + bedbugGameCore.game_specs.version, {
            font: '14px Arial',
            fill: '#fff',
            align: 'left'
        })
        // client_version.anchor.setTo(.5);
        context.paytable.add(client_version);

        function getSymbol(symbolID, x, y, dimension, points5, points4, points3, left, points2) {
            var point_style = {
                'font': '18px Arial',
                'fill': '#ffba00'
            };

            var symbol = new bedbugGameCore.Slots[symbolID](context.game, 1, x, y, dimension, dimension);

            if (points5) {
                if (!left) {
                    var coins5 = context.game.add.text(dimension / 2 + 10, -dimension / 2 + 20, "5 " + points5, point_style);
                    var coins4 = context.game.add.text(dimension / 2 + 10, -dimension / 2 + 55, "4 " + points4, point_style);
                    var coins3 = context.game.add.text(dimension / 2 + 10, -dimension / 2 + 85, "3 " + points3, point_style);
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
}
