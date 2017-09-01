Controls = {
    create: function(context) {

        this.controlsGroup = context.game.add.group();

        this.buttonArray = [];
        this.buttonsOffArray = [];


        // Play Button
        this.play_button = context.game.add.button(669, 640, 'gui', context.play_spin, context, 'play_over.png', 'play_active.png', 'play_pressed.png', 'play_active.png');
        this.play_button.anchor.setTo(.5, .5);
        //  this.play_button.visible = false;
        this.buttonArray.push(this.play_button);

        this.playOff_button = context.game.add.button(669, 640, 'gui');
        this.playOff_button.frameName = "play_off.png";
        this.playOff_button.anchor.setTo(.5, .5);
        this.buttonsOffArray.push(this.playOff_button);

        // COUNT PLAY
        // -- COUNTPLAY STATE
        this.countplay_button = context.game.add.button(this.play_button.x, this.play_button.y, 'gui', context.stop_spin, context, 'stop_over.png', 'stop_active.png', 'stop_pressed.png', 'stop_active.png');
        this.countplay_button.anchor.setTo(.5, .5);




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


        this.countplay_button.addChild(this.play_text);
        this.countplay_button.addChild(this.play_count);

        this.countplay_button.visible = false;



        //this.autoplay_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), 535, 623, 86, 24, this.openAutoplayPanel, this, false);
        this.autoplay_button = context.game.add.button(550, 619, 'gui', this.openAutoplayPanel, context, 'wide_over.png', 'wide__active.png', 'wide_pressed.png', 'wide__active.png');
        this.autoplay_button.anchor.setTo(0.5, 0.5);
        this.autoplay_text = context.game.add.text(-15, 3, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), {
            font: "14px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });

        this.autoplay_text.anchor.setTo(0.5, 0.5);
        this.autoplay_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_text.resolution = 2;
        this.autoplay_button.addChild(this.autoplay_text);
        this.buttonArray.push(this.autoplay_button);

        this.autoplayOff_button = context.game.add.sprite(550, 619, 'gui');
        this.autoplayOff_button.frameName = "wide_off.png"
        this.autoplayOff_button.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text = context.game.add.text(-15, 3, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), {
            font: "14px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });

        this.autoplayOff_text.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplayOff_text.resolution = 2;
        this.autoplayOff_button.addChild(this.autoplayOff_text);
        this.buttonsOffArray.push(this.autoplayOff_button);

        // this.autoplay_stop_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("stop"), 535, 623, 86, 24, context.controls_stop_auto, context, false);
        this.autoplay_stop_button = context.game.add.button(550, 619, 'gui', context.controls_stop_auto, context, 'wide_over.png', 'wide__active.png', 'wide_pressed.png', 'wide__active.png');
        this.autoplay_stop_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text = context.game.add.text(-15, 3, bedbugGameCore.getLocalizedText("stop"), {
            font: "14px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.autoplay_stop_text.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.autoplay_stop_button.addChild(this.autoplay_stop_text);
        this.autoplay_stop_button.visible = false;


        //this.paytable_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), 550, 653, 122, 24, context.showPayTable, context, false);
        this.paytable_button = context.game.add.button(550, 662, 'gui', context.showPayTable, context, 'wide_over.png', 'wide__active.png', 'wide_pressed.png', 'wide__active.png');
        this.paytable_button.anchor.setTo(0.5, 0.5);
        this.paytable_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), {
            font: "14px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.paytable_text.anchor.setTo(0.5, 0.5);
        this.paytable_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.paytable_text.resolution = 2;
        this.paytable_button.addChild(this.paytable_text);
        this.buttonArray.push(this.paytable_button);

        this.paytableOff_button = context.game.add.button(550, 662, 'gui');
        this.paytableOff_button.frameName = "wide_off.png";
        this.paytableOff_button.anchor.setTo(0.5, 0.5);
        this.paytableOff_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), {
            font: "14px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.paytableOff_text.anchor.setTo(0.5, 0.5);
        this.paytableOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.paytableOff_text.resolution = 2;
        this.paytableOff_button.addChild(this.paytableOff_text);
        this.buttonsOffArray.push(this.paytableOff_button);

        // this.max_bet_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), 788, 638, 121, 54, context.setMaxBet);
        this.max_bet_button = context.game.add.button(788, 642, 'gui', context.setMaxBet, context, 'max_over.png', 'max_active.png', 'max_pressed.png', 'max_active.png');
        this.max_bet_button.anchor.setTo(0.5, 0.5);
        this.maxbet_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.maxbet_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.maxbet_text.anchor.setTo(0.5, 0.5);
        this.max_bet_button.addChild(this.maxbet_text);
        //   this.maxbet_text.x = Math.round(this.maxbet_text.x);
        //   this.maxbet_text.y = Math.round(this.maxbet_text.y);
        this.maxbet_text.resolution = 2;
        this.buttonArray.push(this.max_bet_button);

        this.max_betOff_button = context.game.add.button(788, 642, 'gui');
        this.max_betOff_button.frameName = "max_off.png";
        this.max_betOff_button.anchor.setTo(0.5, 0.5);
        this.maxbetOff_text = context.game.add.text(0, 3, bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.maxbetOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.maxbetOff_text.anchor.setTo(0.5, 0.5);
        this.max_betOff_button.addChild(this.maxbetOff_text);
        this.maxbetOff_text.resolution = 2;
        this.buttonsOffArray.push(this.max_betOff_button);

        // this.decr_level_button = new CustomButton(context.game, "-", 274, 644, 26, 24, bedbugGameCore.decrBetLevel);
        this.decr_level_button = context.game.add.button(260, 662, 'gui', bedbugGameCore.decrBetLevel, this, 'small_over.png', 'small_active.png', 'small_pressed.png', 'small_active.png');
        this.decr_level_button.anchor.setTo(0.5, 0.5);
        this.decr_level_text = context.game.add.text(0, 3, "-", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.decr_level_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.decr_level_text.anchor.setTo(0.5, 0.5);
        this.decr_level_text.resolution = 2;
        this.decr_level_button.addChild(this.decr_level_text);
        this.buttonArray.push(this.decr_level_button);

        this.decr_levelOff_button = context.game.add.button(260, 662, 'gui');
        this.decr_levelOff_button.frameName = "small_off.png";
        this.decr_levelOff_button.anchor.setTo(0.5, 0.5);
        this.decr_levelOff_text = context.game.add.text(0, 3, "-", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.decr_levelOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.decr_levelOff_text.anchor.setTo(0.5, 0.5);
        this.decr_levelOff_text.resolution = 2;
        this.decr_levelOff_button.addChild(this.decr_levelOff_text);
        this.buttonsOffArray.push(this.decr_levelOff_button);

        //this.incr_level_button = new CustomButton(context.game, "+", 349, 644, 26, 24, bedbugGameCore.incrBetLevel);
        this.incr_level_button = context.game.add.button(345, 662, 'gui', bedbugGameCore.incrBetLevel, this, 'small_over.png', 'small_active.png', 'small_pressed.png', 'small_active.png');
        this.incr_level_button.anchor.setTo(0.5, 0.5);
        this.incr_level_text = context.game.add.text(0, 3, "+", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.incr_level_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.incr_level_text.anchor.setTo(0.5, 0.5);
        this.incr_level_text.resolution = 2;
        this.incr_level_button.addChild(this.incr_level_text);
        this.buttonArray.push(this.incr_level_button);

        this.incr_levelOff_button = context.game.add.button(345, 662, 'gui');
        this.incr_levelOff_button.frameName = "small_off.png"
        this.incr_levelOff_button.anchor.setTo(0.5, 0.5);
        this.incr_levelOff_text = context.game.add.text(0, 3, "+", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.incr_levelOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.incr_levelOff_text.anchor.setTo(0.5, 0.5);
        this.incr_levelOff_text.resolution = 2;
        this.incr_levelOff_button.addChild(this.incr_levelOff_text);
        this.buttonsOffArray.push(this.incr_levelOff_button);

        //this.decr_coin_value_button = new CustomButton(context.game, "-", 1000, 644, 26, 24, bedbugGameCore.decrCoinValue);
        this.decr_coin_value_button = context.game.add.button(995, 662, 'gui', bedbugGameCore.decrCoinValue, this, 'small_over.png', 'small_active.png', 'small_pressed.png', 'small_active.png');
        this.decr_coin_value_button.anchor.setTo(0.5, 0.5);
        this.decr_coin_text = context.game.add.text(0, 3, "-", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.decr_coin_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.decr_coin_text.anchor.setTo(0.5, 0.5);
        this.decr_coin_text.resolution = 2;
        this.decr_coin_value_button.addChild(this.decr_coin_text);
        this.buttonArray.push(this.decr_coin_value_button);

        this.decr_coin_valueOff_button = context.game.add.button(995, 662, 'gui');
        this.decr_coin_valueOff_button.frameName = "small_off.png"
        this.decr_coin_valueOff_button.anchor.setTo(0.5, 0.5);
        this.decr_coinOff_text = context.game.add.text(0, 3, "-", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.decr_coinOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.decr_coinOff_text.anchor.setTo(0.5, 0.5);
        this.decr_coinOff_text.resolution = 2;
        this.decr_coin_valueOff_button.addChild(this.decr_coinOff_text);
        this.buttonsOffArray.push(this.decr_coin_valueOff_button);

        // this.incr_coin_value_button = new CustomButton(context.game, "+", 1075, 644, 26, 24, bedbugGameCore.incrCoinValue);
        this.incr_coin_value_button = context.game.add.button(1085, 662, 'gui', bedbugGameCore.incrCoinValue, this, 'small_over.png', 'small_active.png', 'small_pressed.png', 'small_active.png');
        this.incr_coin_value_button.anchor.setTo(0.5, 0.5);
        this.incr_coin_text = context.game.add.text(0, 3, "+", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.incr_coin_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.incr_coin_text.anchor.setTo(0.5, 0.5);
        this.incr_coin_text.resolution = 2;
        this.incr_coin_value_button.addChild(this.incr_coin_text);
        this.buttonArray.push(this.incr_coin_value_button);

        this.incr_coin_valueOff_button = context.game.add.button(1085, 662, 'gui');
        this.incr_coin_valueOff_button.frameName = "small_off.png";
        this.incr_coin_valueOff_button.anchor.setTo(0.5, 0.5);
        this.incr_coinOff_text = context.game.add.text(0, 3, "+", {
            font: "22px Arial",
            fill: "#ffffff",
            fontWeight: "bold"
        });
        this.incr_coinOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.incr_coinOff_text.anchor.setTo(0.5, 0.5);
        this.incr_coinOff_text.resolution = 2;
        this.incr_coin_valueOff_button.addChild(this.incr_coinOff_text);
        this.buttonsOffArray.push(this.incr_coin_valueOff_button);

        // Close All Off Buttons
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = false;
        }

        this.controlsGroup.addChild(this.autoplay_button);
        this.controlsGroup.addChild(this.paytable_button);
        this.controlsGroup.addChild(this.max_bet_button);
        this.controlsGroup.addChild(this.decr_level_button);
        this.controlsGroup.addChild(this.incr_level_button);
        this.controlsGroup.addChild(this.decr_coin_value_button);
        this.controlsGroup.addChild(this.incr_coin_value_button);

        this.controlsGroup.addChild(this.autoplayOff_button);
        this.controlsGroup.addChild(this.paytableOff_button);
        this.controlsGroup.addChild(this.max_betOff_button);
        this.controlsGroup.addChild(this.decr_levelOff_button);
        this.controlsGroup.addChild(this.incr_levelOff_button);
        this.controlsGroup.addChild(this.decr_coin_valueOff_button);
        this.controlsGroup.addChild(this.incr_coin_valueOff_button);

        // (game, label, x, y, width, height, isDraggable, prestyle)
        this.autoplay_label = new CustomLabel(context.game, bedbugGameCore.autoplay_count, 598, 618, 30, 25, false, {
            backgroundAlpha: 0.5
        });
        this.bet_level_label = new CustomLabel(context.game, 1, 303, 662, 40, 40, false, {
            backgroundAlpha: 0.5
        });
        this.coins_label = new CustomLabel(context.game, "500000", 917, 662, 100, 40, false, {
            backgroundAlpha: 0.5
        });
        this.coin_value_label = new CustomLabel(context.game, "0.01", 1040, 662, 46, 40, false, {
            backgroundAlpha: 0.5
        });
        this.bet_label = new CustomLabel(context.game, "20", 426, 662, 100, 40, false, {
            backgroundAlpha: 0.5
        });


        var style = {
            font: "16px Arial",
            fill: "#fff",
            fontWeight: "bold"
        };
        this.betlevel_heading = context.game.add.text(303, 620, bedbugGameCore.getLocalizedText('TXT_BET_LEVEL_LABEL'), style);
        this.betlevel_heading.anchor.setTo(0.5, 0);
        this.betlevel_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.betlevel_heading.resolution = 2;

        this.bet_heading = context.game.add.text(426, 620, bedbugGameCore.getLocalizedText("TXT_BET_LABEL"), style);
        this.bet_heading.anchor.setTo(0.5, 0);
        this.bet_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.bet_heading.resolution = 2;

        this.coins_heading = context.game.add.text(917, 620, bedbugGameCore.getLocalizedText("TXT_COINS_LABEL"), style);
        this.coins_heading.anchor.setTo(0.5, 0);
        this.coins_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.coins_heading.resolution = 2;

        this.coin_value_heading = context.game.add.text(1040, 620, bedbugGameCore.getLocalizedText("TXT_COIN_VALUE_LABEL"), style);
        this.coin_value_heading.anchor.setTo(0.5, 0);
        this.coin_value_heading.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        this.coin_value_heading.resolution = 2;


        // Added last in order to be on top of all else buttons
        // this.controlsGroup.addChild(this.countplay_button);
        this.controlsGroup.addChild(this.play_button);

        // Draw the Autoplay option
        this.createAutoplayPanel(context);

        UnifiedPanel.create(context);

        bedbugEventsSystem.addListener('ON_CONTROL_PANEL_UPDATE', this.update);

        bedbugEventsSystem.addListener('ON_RESULT_RECEIVED', this.enableStop);

        this.update();
    },
    showStopPlay: function() {
        this.play_button.visible = false;
        // console.log(bedbugGameCore.autoplay_started);

        this.countplay_button.visible = true;
        this.countplay_button.alpha = 0.0;
        this.countplay_button.inputEnabled = false;

    },
    showPlay: function() {
        this.play_button.visible = true;
        this.play_button.alpha = 1.0;
        this.play_button.inputEnabled = true;
        this.countplay_button.visible = false;
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
        // console.log("HIDE CONTROLS!!");
        button.alpha = 0.5;
        //button.inputEnabled = false;
    },
    enableStop: function() {
        // console.log("Result received: Enabling STOP button");
        if (bedbugGameCore.settings.fast_spins) return;
        Controls.enableBtn(Controls.countplay_button);
    },
    disableStop: function() {
        Controls.countplay_button.inputEnabled = false;
        Controls.countplay_button.alpha = 0;
    },
    enableBtn: function(button) {
        // console.log("HIDE CONTROLS!!");
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
        Controls.coin_value_label.setLabel(bedbugGameCore.addZeroes(bedbugGameCore.coin_value));
        Controls.coins_label.setLabel(bedbugGameCore.numberWithSpaces(Math.round(bedbugGameCore.coins)));
        Controls.bet_level_label.setLabel(bedbugGameCore.bet_level);
        Controls.bet_label.setLabel(bedbugGameCore.bet_coins);
    },
    hideControls: function(game) {
        // game.add.tween(this.controlsGroup).to({
        //     alpha: 0.3
        // }, 400, Phaser.Easing.Exponential.Out, true);
        // console.log("HIDE CONTROLS!!");
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = true;
        }
        for (var i = 0; i < this.buttonArray.length; i++) {
            this.buttonArray[i].visible = false;
        }


    },
    showControls: function(game) {
        // console.log("HIDE CONTROLS!!");
        // game.add.tween(this.controlsGroup).to({
        //     alpha: 1
        // }, 400, Phaser.Easing.Exponential.Out, true);
        // console.log("SHOW CONTROLS!!");
        for (var i = 0; i < this.buttonArray.length; i++) {
            this.buttonArray[i].visible = true;
        }
        for (var i = 0; i < this.buttonsOffArray.length; i++) {
            this.buttonsOffArray[i].visible = false;
        }
    },
    openAutoplayPanel: function(context) {
        if (!bedbugGameCore.controls_enabled) return;
        bedbugGameCore.autoplay_current_step = 0;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        Controls.autoplay_panel.visible = true;
        context.game.world.bringToTop(Controls.autoplay_panel); // BRING TO TOP
    },
    stopAutoplay: function() {
        var that = this;
        that.play_button.alpha = 1;
        that.showPlay();
        that.play_button.inputEnabled = true;
        // that.countplay_button.alpha = 0;
        that.countplay_button.inputEnabled = true;
        that.autoplay_stop_button.visible = false;
        that.autoplay_button.visible = true;
        bedbugGameCore.autoplay_started = false;
        bedbugGameCore.autoplay_count = 0;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },
    createAutoplayPanel: function(context) {
        var that = this;
        var width = 500;
        var height = 500;

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

        this.autoplay_panel.scale.setTo(0.9, 0.9);
        this.autoplay_panel.x += 60;
        this.autoplay_panel.y += 25;

        function checkAutoplayStatusAndPlay() {
            if (bedbugGameCore.autoplay_count > 0) {
                that.countplay_button.alpha = 0.3;
                that.countplay_button.inputEnabled = false;
                that.autoplay_stop_button.visible = true;
                that.autoplay_button.visible = false;

                if (!bedbugGameCore.reels_spinning) {
                    that.play_button.alpha = 0.3;
                    that.play_button.inputEnabled = false;
                    context.spin();
                }
            }
        }

        // this.autoplay_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), bedbugGameCore.autoplay_count, context.decrAutoplayCount, context.incrAutoplayCount, width / 2, 100, 250, 100, true, {
        //     font: "bold 35px Arial",
        //     fill: "#FFF",
        //     heading: {
        //         fill: "#FFF"
        //     },
        //     stepperBgAlpha: 1,
        //     stepperBgColor: "#afa5a5",
        //     backgroundAlpha: 1
        // }, checkAutoplayStatusAndPlay);
        this.autoplay_stepper = new Stepper(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), bedbugGameCore.autoplay_count, context.decrAutoplayCount, context.incrAutoplayCount, width / 2, 100, 250, 100, true, {
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
        this.startAuto = context.game.add.button(250, 175, 'gui', startAutoplayPanel, this, 'wide_over.png', 'wide__active.png', 'wide_pressed.png', 'wide__active.png');
        this.startAuto.anchor.setTo(0.5, 0.5);
        this.startAuto.scale.setTo(1.45, 1.35);
        this.startAuto_text = context.game.add.text(250, 175, bedbugGameCore.getLocalizedText("TXT_START_LABEL"), {
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
            checkBoxLine: 3,
            // color: 0x000000,
            // dotColor: 0x000000,
            inputFont: '22px Arial',
            fill: "#fff",
            wordWrapWidth: 280
        };

        this.stop_any_checkbox = new CheckΒox(20, 220, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_ANY"), null, bedbugGameCore.autoplay_setup.on_win.checked, options, function(o) {
            bedbugGameCore.autoplay_setup.on_win.checked = o;

        });

        this.stop_win_amount = new CheckΒox(20, this.stop_any_checkbox.y + this.stop_any_checkbox.height + 10, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT"), bedbugGameCore.autoplay_setup.on_win_amount.value, bedbugGameCore.autoplay_setup.on_win_amount.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_win_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_win_amount.value = e
        });

        this.stop_cash_amount = new CheckΒox(20, this.stop_win_amount.y + this.stop_win_amount.height + 10, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_CASH"), bedbugGameCore.autoplay_setup.on_cash_amount.value, bedbugGameCore.autoplay_setup.on_cash_amount.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_cash_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_cash_amount.value = e;
        });

        this.stop_time = new CheckΒox(20, this.stop_cash_amount.y + this.stop_cash_amount.height + 10, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME"), bedbugGameCore.autoplay_setup.on_time.value, bedbugGameCore.autoplay_setup.on_time.checked, options, function(o, e, m) {
            bedbugGameCore.autoplay_setup.on_time.checked = o;
            if (e && m) bedbugGameCore.autoplay_setup.on_time.value = [e, m];
        });

        this.stop_lose = new CheckΒox(20, this.stop_time.y + this.stop_time.height + 10, context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE"), bedbugGameCore.autoplay_setup.on_lose.value, bedbugGameCore.autoplay_setup.on_lose.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_lose.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_lose.value = e;
        });

        this.autoplay_panel.add(this.stop_lose);
        this.autoplay_panel.add(this.stop_time);
        this.autoplay_panel.add(this.stop_cash_amount);
        this.autoplay_panel.add(this.stop_any_checkbox);
        this.autoplay_panel.add(this.stop_win_amount);

        this.autoplay_panel.visible = false;
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
        panel_block_input.drawRect(-1280, -720, 1280 * 3, 720 * 3);
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

        // var myBitmap = game.add.bitmapData(100, 100);
        // myBitmap.beginLinearGradientFill(["#000", "#FFF"], [0, 1], 0, 20, 0, 120);
        // myBitmap.rect(20, 20, 120, 120);
        // myBitmap.fill();
        // game.add.sprite(50, 50, myBitmap);

        if (!prestyle.isGradient) {
            var panel_background = game.add.graphics(0, 0);
            panel_background.lineStyle(5, prestyle.lineColor, 1);
            panel_background.beginFill(prestyle.bgColor, 1);
            panel_background.drawRoundedRect(0, 0, width, height, 25);
            panel_background.endFill();
            panel_background.alpha = prestyle.alpha;
        }
        else {
            //context.game.add.sprite(0, 280, "extras", "Tree_wind0000.png");
            var panel_background = game.add.sprite(0, 0, "extras2", "paytable.png");
            //nel_background.scale.setTo(1.15, 1.2);
        }


        panel_background.inputEnabled = true;

        if (prestyle.bevel) {
            var panel_background_bevel = game.add.graphics(0, 0);
            panel_background_bevel.beginFill(prestyle.headingBgColor, .7);
            panel_background_bevel.drawRoundedRect(0, 3, panel_background.width, panel_background.height, 25);
            panel_background_bevel.endFill();
        }

        if (bedbugGameCore.game_specs.messages.style.normal.shadow) {
            var panel_background_shadow = game.add.graphics(0, 0);
            panel_background_shadow.beginFill(0x000000, .4);
            panel_background_shadow.drawRoundedRect(0, 10, panel_background.width, panel_background.height, 25);
            panel_background_shadow.endFill();
        }
        popup.add(panel_block_input);

        if (bedbugGameCore.game_specs.messages.style.normal.shadow) {
            popup.add(panel_background_shadow);
        }

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
        var screen2_heading = context.game.add.text(panel_width / 2 + 45, 70, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_02_INFO_01"), headingStyle);
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

        var thunderText = context.game.add.text(panel_width / 2 + 45, 105, thunderText, {
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
        // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
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
            y: panel_y - 10,
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
        chevronRight.scale.setTo(0.5, 0.5);

        chevronRight.x = close_button.x + close_button.width / 2 + 20;
        chevronRight.y = close_button.y - chevronRight.height / 2;
        chevronRight.inputEnabled = true;
        
        chevronRight.events.onInputDown.add(function(e, pointer) {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
            context.drawBullets(context.current_bullet);
            
            context.paytablePageIndex ++; // Add one and then check
            turnToPage(context.paytablePageIndex);
            // slider.goToNext();
        }, slider);



        chevronLeft = bedbugGameCore.game.add.image(0, 0, "slider_chevron_left");
        chevronLeft.scale.setTo(0.5, 0.5);

        chevronLeft.x = close_button.x - close_button.width / 2 - chevronLeft.width - 20;
        chevronLeft.y = close_button.y - chevronLeft.height / 2;
        chevronLeft.inputEnabled = true;
        
        chevronLeft.events.onInputDown.add(function(e, pointer) {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
            context.drawBullets(context.current_bullet);
            
            context.paytablePageIndex --; // Add one and then check
            turnToPage(context.paytablePageIndex);
            // slider.goToPrev();
        }, slider);

        context.paytable.add(chevronRight);
        context.paytable.add(chevronLeft);
        
        
         function turnToPage(id) {
            // console.log(context.paytablePageIndex);
            
            if(id < 0) id = context.panel_pages -1;
            if(id > context.panel_pages -1) id = 0;
            
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
    closePaytableClose: function(game) {},
    onSpinStarted: function() {
        bedbugGameCore.win = 0;
       if(UnifiedPanel) UnifiedPanel.setUserWin();
    },
    openPaytableClose: function() {

    }
}
