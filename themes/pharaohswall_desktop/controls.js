Controls = {
    create: function(context) {

        this.buttonArray = [];
        this.buttonsOffArray = [];

        this.controlsGroup = context.game.add.group();
        // this.controlsGroup.visible = false;
        // Temp Ui
        // var tempUI = context.game.add.sprite(context.game.width / 2, 710, "uiassets");
        // tempUI.frameName = "MenuBar.png";
        // tempUI.anchor.setTo(0.5, 1);
        // this.controlsGroup.add(tempUI);


        // Play Button
        this.play_button = context.game.add.button(context.game.width / 2, 615, 'mainSet', context.play_spin, context, 'spinOut.png', 'spinOut.png', 'spinDown.png', 'spinOut.png');
        this.play_button.anchor.setTo(.5, .5);
        //this.play_button.scale.setTo(.9);
        //this.play_button.hitArea = new Phaser.Rectangle(-50, -25, 100, 100);
        this.buttonArray.push(this.play_button);
        this.play_button_off = context.game.add.sprite(context.game.width / 2, 615, 'mainSet');
        this.play_button_off.frameName = "spinOut.png";
        this.play_button_off.anchor.setTo(.5, .5);
        //this.play_button_off.scale.setTo(.9);
        this.play_button_off.visible = false;
        this.buttonsOffArray.push(this.play_button_off);

        this.countplay_button_stop = context.game.add.button(context.game.width / 2, 615, "mainSet", context.stop_spin, context, 'spinDown.png', 'spinDown.png', 'spinDown.png', 'spinDown.png');
        this.countplay_button_stop.anchor.setTo(.5, .5);
        // this.countplay_button_stop.scale.setTo(.9);

        this.animatedSpin = context.game.add.sprite(context.game.width / 2, 635, 'mainSet', "spinOut.png");
        this.animatedSpin.anchor.setTo(.5, .5);

        // this.animatedSpin.animations.add("spin", Phaser.Animation.generateFrameNames("spinOut", 1, 12, '.png', 2), 24, false);
        this.animatedSpin.visible = false;


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

        //this.controlsGroup.addChild(this.countplay_button);

        //this.autoplay_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), 535, 623, 86, 24, this.openAutoplayPanel, this, false);
        this.autoplay_button = context.game.add.button((context.game.width / 2) - 166, 664, 'mainSet', this.openAutoplayPanel, context, 'AutoUp.png', 'AutoUp.png', 'AutoDown.png', 'AutoUp.png');
        this.autoplay_button.anchor.setTo(0.5, 0.5);
        // this.autoplay_text = context.game.add.bitmapText(-19, 0,"contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), 20);
        this.autoplay_text = context.game.add.bitmapText(-25, -8, "contrail_small", bedbugGameCore.getLocalizedText("Auto"), 20);
        this.autoplay_text.angle = -5;
        this.autoplay_text.anchor.setTo(0.5, 0.5);
        // this.autoplay_text.scale.setTo(.9);
        // this.autoplay_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // this.autoplay_text.resolution = 2;
        this.autoplay_button.addChild(this.autoplay_text);
        this.buttonArray.push(this.autoplay_button);

        this.autoplayOff_button = context.game.add.button((context.game.width / 2) - 166, 664, 'mainSet');
        this.autoplayOff_button.frameName = "AutoUp.png";
        this.autoplayOff_button.anchor.setTo(0.5, 0.5);
        // this.autoplayOff_button.scale.setTo(.9);
        // this.autoplayOff_text = context.game.add.bitmapText(-19, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), 20);
        this.autoplayOff_text = context.game.add.bitmapText(-25, -8, "contrail_small", bedbugGameCore.getLocalizedText("Auto"), 20);

        this.autoplayOff_text.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text.angle = -5;
        this.autoplayOff_text.alpha = .6;
        // this.autoplayOff_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // this.autoplayOff_text.resolution = 2;
        this.autoplayOff_button.addChild(this.autoplayOff_text);
        this.buttonsOffArray.push(this.autoplayOff_button);

        this.auto_stopcount_text = context.game.add.text(28, -8, "0", {
            font: "bold 14px Arial",
            fill: "#cecece"
        });
        this.auto_stopcount_text.anchor.setTo(0.5, 0.5);
        this.auto_stopcount_text.setShadow(0, 2, '#fff', 0);
        this.auto_stopcount_text.resolution = 2;
        // this.auto_stopcount_text.angle = -5;
        this.autoplayOff_button.addChild(this.auto_stopcount_text);

        // this.autoplay_stop_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("stop"), 535, 623, 86, 24, context.controls_stop_auto, context, false);
        this.autoplay_stop_button = context.game.add.button((context.game.width / 2) - 166, 664, 'mainSet', context.controls_stop_auto, context, 'AutoUp.png', 'AutoUp.png', 'AutoDown.png', 'AutoUp.png');
        //this.autoplay_stop_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_button.anchor.setTo(0.5, 0.5);
        this.autoplay_stop_text = context.game.add.bitmapText(-25, -8, "contrail_small", bedbugGameCore.getLocalizedText("Stop"), 20);
        this.autoplay_stop_text.anchor.setTo(0.5, 0.5);
        this.autoplayOff_text.angle = -5;
        this.autoplay_stop_button.addChild(this.autoplay_stop_text);
        this.autoplay_stop_button.visible = false;


        //this.paytable_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), 550, 653, 122, 24, context.showPayTable, context, false);
        this.paytable_button = context.game.add.button(0, 0, 'assets', context.showPayTable, context, 'button-paytable-over.png', 'button-paytable-active.png', 'button-paytable-pressed.png', 'button-paytable-active.png');
        this.paytable_button.anchor.setTo(0.5, 0.5);
        this.paytable_text = context.game.add.bitmapText(0, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), 20);
        this.paytable_text.anchor.setTo(0.5, 0.5);
        this.paytable_button.addChild(this.paytable_text);
        this.buttonArray.push(this.paytable_button);

        this.paytableOff_button = context.game.add.button(0, 0, 'assets');
        this.paytableOff_button.frameName = "button-paytable-inactive.png";
        this.paytableOff_button.anchor.setTo(0.5, 0.5);
        this.paytableOff_text = context.game.add.bitmapText(0, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_PAYTABLE_LABEL"), 20);
        this.paytableOff_text.anchor.setTo(0.5, 0.5);
        this.paytableOff_text.alpha = .6;
        this.paytableOff_button.addChild(this.paytableOff_text);
        this.buttonsOffArray.push(this.paytableOff_button);


        this.max_bet_button = context.game.add.button((context.game.width / 2) + 160, 655, 'mainSet', context.setMaxBet, context, 'maxBetOut.png', 'maxBetOut.png', 'maxBetDown.png', 'maxBetOut.png');
        this.max_bet_button.anchor.setTo(0.5, 0.5);
        // this.max_bet_button.scale.setTo(.9);
        this.maxbet_text = context.game.add.bitmapText(0, -6, "contrail_small", bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), 22);
        this.maxbet_text.anchor.setTo(0.5, 0.5);
        this.maxbet_text.angle = 2;
        this.max_bet_button.addChild(this.maxbet_text);
        this.buttonArray.push(this.max_bet_button);

        this.max_betOff_button = context.game.add.button((context.game.width / 2) + 160, 655, 'mainSet');
        this.max_betOff_button.frameName = "maxBetOut.png";
        this.max_betOff_button.anchor.setTo(0.5, 0.5);
        // this.max_betOff_button.scale.setTo(.9);
        this.maxbetOff_text = context.game.add.bitmapText(0, -6, "contrail_small", bedbugGameCore.getLocalizedText('TXT_MAX_BET_LABEL'), 22);
        this.maxbetOff_text.angle = 2;
        this.maxbetOff_text.anchor.setTo(0.5, 0.5);
        this.maxbetOff_text.alpha = .6;
        this.max_betOff_button.addChild(this.maxbetOff_text);
        this.buttonsOffArray.push(this.max_betOff_button);

        // this.decr_level_button = new CustomButton(context.game, "-", 274, 644, 26, 24, bedbugGameCore.decrBetLevel);
        this.decr_level_button = context.game.add.button(137, 680, 'mainSet', bedbugGameCore.decrBetLevel, this, 'ArrowLeftUp.png', 'ArrowLeftUp.png', 'ArrowLeftDown.png', 'ArrowLeftUp.png');
        this.decr_level_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.decr_level_button);

        this.decr_levelOff_button = context.game.add.button(137, 680, 'mainSet');
        this.decr_levelOff_button.frameName = "ArrowLeftUp.png";
        this.decr_levelOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.decr_levelOff_button);


        //this.incr_level_button = new CustomButton(context.game, "+", 349, 644, 26, 24, bedbugGameCore.incrBetLevel);
        this.incr_level_button = context.game.add.button(217, 680, 'mainSet', bedbugGameCore.incrBetLevel, this, 'ArrowRightUp.png', 'ArrowRightUp.png', 'ArrowRightDown.png', 'ArrowRightUp.png');
        this.incr_level_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.incr_level_button);

        this.incr_levelOff_button = context.game.add.button(217, 680, 'mainSet');
        this.incr_levelOff_button.frameName = "ArrowRightUp.png";
        this.incr_levelOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.incr_levelOff_button);


        this.decr_coin_value_button = context.game.add.button(1040, 670, 'mainSet', bedbugGameCore.decrCoinValue, this, 'ArrowLeftUp.png', 'ArrowLeftUp.png', 'ArrowLeftDown.png', 'ArrowLeftUp.png');
        this.decr_coin_value_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.decr_coin_value_button);

        this.decr_coin_valueOff_button = context.game.add.button(1040, 670, 'mainSet');
        this.decr_coin_valueOff_button.frameName = "ArrowLeftUp.png";
        this.decr_coin_valueOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.decr_coin_valueOff_button);


        this.incr_coin_value_button = context.game.add.button(1122, 670, 'mainSet', bedbugGameCore.incrCoinValue, this, 'ArrowRightUp.png', 'ArrowRightUp.png', 'ArrowRightDown.png', 'ArrowRightUp.png');
        this.incr_coin_value_button.anchor.setTo(0.5, 0.5);
        this.buttonArray.push(this.incr_coin_value_button);

        this.incr_coin_valueOff_button = context.game.add.button(1122, 670, 'mainSet');
        this.incr_coin_valueOff_button.frameName = "ArrowRightUp.png";
        this.incr_coin_valueOff_button.anchor.setTo(0.5, 0.5);
        this.buttonsOffArray.push(this.incr_coin_valueOff_button);





        // Label BGs
        // this.BetField = context.game.add.sprite(306, 665, "assets");
        // this.BetField.frameName = "BET_PANEL.png";
        // this.BetField.anchor.setTo(.5, .5);
        // this.controlsGroup.addChild(this.BetField);

        // this.CoinsField = context.game.add.sprite(976, 661, "assets");
        // this.CoinsField.frameName = "COIN_VALUE_Panel.png";
        // this.CoinsField.anchor.setTo(.5, .5);
        // this.controlsGroup.addChild(this.CoinsField);

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
        this.controlsGroup.addChild(this.autoplayOff_button);
        this.controlsGroup.addChild(this.autoplay_stop_button);
        this.controlsGroup.addChild(this.paytable_button);
        this.controlsGroup.addChild(this.paytableOff_button);

        var autoplayCount_style = {
            font: "bold 16px Arial",
            // backgroundColor: "#ffff00" 
        };
        // (game, label, x, y, width, height, isDraggable, prestyle)
        this.autoplay_label = new CustomLabel(context.game, bedbugGameCore.autoplay_count, 28, -10, 30, 25, false, autoplayCount_style, 5);
        this.autoplay_label.resolution = 2;
        this.autoplay_Stop_label = new CustomLabel(context.game, bedbugGameCore.autoplay_count, 28, -10, 30, 25, false, autoplayCount_style, 5);
        this.autoplay_Stop_label.resolution = 2;

        this.coins_label = new CustomLabel(context.game, "500000", 950, 640, 100, 40, null, null, null, 3);
        this.coin_value_label = new CustomLabel(context.game, "0.01", 1082, 651, 46, 40);
        this.bet_level_label = new CustomLabel(context.game, "0.01", 177, 660, 46, 40);
        this.bet_label = new CustomLabel(context.game, "20", 305, 645, 100, 40, null, null, null, -5);

        this.autoplay_button.addChild(this.autoplay_label);
        this.autoplay_stop_button.addChild(this.autoplay_Stop_label);

        // this.BetField.addChild(this.bet_label);
        // this.BetField.addChild(this.bet_level_label);
        // this.CoinsField.addChild(this.coins_label);
        // this.CoinsField.addChild(this.coin_value_label);
        // this.controlsGroup.addChild(this.bet_label);
        // this.controlsGroup.addChild(this.bet_level_label);
        // this.controlsGroup.addChild(this.coins_label);
        // this.controlsGroup.addChild(this.coin_value_label);

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
        this.betlevel_heading = context.game.add.bitmapText(178, 605, "contrail_small", bedbugGameCore.getLocalizedText('TXT_BET_LEVEL_LABEL'), 20);
        this.betlevel_heading.anchor.setTo(0.5, 0);
        this.betlevel_heading.angle = 2;

        this.bet_heading = context.game.add.bitmapText(300, 605, "contrail_small", bedbugGameCore.getLocalizedText("TXT_BET_LABEL"), 20);
        this.bet_heading.anchor.setTo(0.5, 0);
        this.bet_heading.angle = -15;
        // this.maxbet_text.angle = 3;

        this.coins_heading = context.game.add.bitmapText(955, 600, "contrail_small", bedbugGameCore.getLocalizedText("TXT_COINS_LABEL"), 20);
        this.coins_heading.anchor.setTo(0.5, 0);
        this.coins_heading.angle = 6;

        this.coin_value_heading = context.game.add.bitmapText(1082, 600, "contrail_small", bedbugGameCore.getLocalizedText("TXT_COIN_VALUE_LABEL"), 20);
        this.coin_value_heading.anchor.setTo(0.5, 0);
        this.coin_value_heading.angle = 2;



        // this.controlsGroup.addChild(this.play_button);
        // this.controlsGroup.addChild(this.play_button_off);
        // this.controlsGroup.addChild(this.countplay_button_stop);
        this.controlsGroup.addChild(this.animatedSpin);

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
        this.play_button_off.visible = false
        this.countplay_button_stop.visible = false;

        this.animatedSpin.visible = true;
        // this.animatedSpinAnim = this.animatedSpin.animations.play("spin", 24, false);
        // this.animatedSpinAnim.onComplete.add(function() {
        //     // console.log("Animation Ended!");
        //     // console.log("HIDE CONTROLS!!");
        //     this.animatedSpin.visible = false;
        //     this.play_button.visible = false;
        //     this.play_button_off.visible = true;

        //     if (bedbugGameCore.result_received) {
        //         this.countplay_button_stop.visible = true;
        //         // this.countplay_button_stop.frameName = "Stop_ON.png";
        //         // this.countplay_button_stop.freezeFrames = false;
        //         // this.countplay_button_stop.alpha = 1.0;
        //         this.countplay_button_stop.inputEnabled = true;
        //     }
        //     else {
        //         this.countplay_button_stop.visible = true;
        //         this.countplay_button_stop.alpha = 0.0;
        //         this.countplay_button_stop.inputEnabled = false;
        //     }

        // }, this)
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

        // Play unfold animation
        Controls.autoplay_Panel_Bg.y = 50;
        var autoDrop1 = context.game.add.tween(Controls.autoplay_Panel_Bg).to({
            y: 85
        }, 400, Phaser.Easing.Back.Out, true);
        Controls.autoBgAnim.play();
        // Time open the UI
        Controls.autoplay_innerPanel.alpha = 0.0;
        var autoFade1 = context.game.add.tween(Controls.autoplay_innerPanel).to({
            alpha: 1
        }, 500, "Linear", true, 500);



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
        var that = this;
        var width = 500;
        var height = 500;

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

        this.autoplay_Panel_Bg = bedbugGameCore.game.add.sprite(245, 85, "screens", "papyrus.0001.png");
        this.autoBgAnim = this.autoplay_Panel_Bg.animations.add("autoBg", Phaser.Animation.generateFrameNames("papyrus.", 1, 8, '.png', 4), 35, false);
        this.autoplay_Panel_Bg.angle = 90;
        this.autoplay_Panel_Bg.anchor.setTo(.5, .5);
        this.autoplay_Panel_Bg.scale.setTo(.5, .6);
        this.autoplay_Panel_Bg.inputEnabled = true;

        this.autoplay_Panel_Bg2 = bedbugGameCore.game.add.sprite(140, -30, "screens", "papyrus.0001.png");
        this.autoBgAnim2 = this.autoplay_Panel_Bg2.animations.add("autoBg", Phaser.Animation.generateFrameNames("papyrus.", 1, 16, '.png', 4), 35, false);
        this.autoplay_Panel_Bg2.scale.setTo(.75, .6);
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
        this.autoplay_innerPanel = context.game.add.group();


        //this.autoplay_panel.scale.setTo(.60,.60);
        this.autoplay_panel.x = bedbugGameCore.game.width / 2 - 430;
        this.autoplay_panel.y = bedbugGameCore.game.height / 2 + 69;
        this.autoplay_innerPanel.x = -9;
        this.autoplay_innerPanel.y = -15;

        this.autoplay_panel2 = context.game.add.group();
        this.autoplay_innerPanel2 = context.game.add.group();
        this.autoplay_innerPanel2.x = 190;
        this.autoplay_innerPanel2.y = 45;
        //this.autoplay_panel2.scale.setTo(.60,.60);
        this.autoplay_panel2.x = bedbugGameCore.game.width / 2 - 200;
        this.autoplay_panel2.y = bedbugGameCore.game.height / 2 + 40;

        // this.back_panel = this.createPopupBG(context.game, bedbugGameCore.game.width, bedbugGameCore.game.height, true, autoPlayStyle, closeAutoplayPanel);
        // this.back_panel.x = 0;
        // this.back_panel.y = 0;



        // this.autoplay_Panel_Bg.addChild(this.back_panel);
        this.autoplay_panel.add(this.autoplay_Panel_Bg);
        this.autoplay_panel.addChild(this.autoplay_innerPanel);
        this.autoplay_panel2.add(this.autoplay_Panel_Bg2);
        this.autoplay_panel2.addChild(this.autoplay_innerPanel2);

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
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 65
        };

        // AUTOPLAY PANEL 1 TITLE
        // this.panel1Title = context.game.add.text(250,35, bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), {
        //     font: "25px Arial",
        //     fill: "#ffffff"
        // });
        // this.panel1Title.anchor.setTo(.5,.5);
        // this.panel1Title.setShadow( 2, 2, 'rgba(0,0,0,0.5)', 0 );
        // this.autoplay_panel.add(this.panel1Title);

        this.autoplay_stepper = new Stepper(context.game, null, bedbugGameCore.autoplay_count, context.decrAutoplayCount, context.incrAutoplayCount, (width / 2), 61, 0, 0, true, {
                font: "bold 20px Arial",
                fill: "#FFF",
                heading: {
                    fill: "#FFF"
                },
                stepperBgAlpha: 1,
                stepperBgColor: 0x555555,
                backgroundAlpha: 0
            },
            true, "screens2", "InputBig.png", "button-arrow", true, -122
        );
        //this.autoplay_stepper.scale.setTo(.35,.35);
        //this.autoplay_stepper.scale.setTo(1, 1);
        this.autoplay_innerPanel.add(this.autoplay_stepper);

        // Title
        this.title_text = context.game.add.bitmapText(252, 23, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_LABEL"), 25);
        this.title_text.anchor.setTo(0.5, 0.5);
        this.autoplay_innerPanel.add(this.title_text);

        // ADD BUTTON TO NEXT PANEL
        this.advancedOptions = context.game.add.button(250, 105, 'screens2', openAutoplayPanel2, this, 'BigButtonHover.png', 'BigButtonNormal.png', 'BigButtonPressed.png', 'BigButtonNormal.png');
        this.advancedOptions.anchor.setTo(0.5, 0.5);
        this.advanced_text = context.game.add.bitmapText(0, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_ADVANCED_OPTIONS"), 20);
        this.advanced_text.anchor.setTo(0.5, 0.5);
        this.advancedOptions.addChild(this.advanced_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_innerPanel.add(this.advancedOptions);

        // ADD START AUTOPLAY TO NEXT PANEL
        this.startAuto = context.game.add.button(250, 140, 'screens2', startAutoplayPanel, this, 'BigButtonHover.png', 'BigButtonNormal.png', 'BigButtonPressed.png', 'BigButtonNormal.png');
        this.startAuto.anchor.setTo(0.5, 0.5);
        this.startAuto_text = context.game.add.bitmapText(0, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_START_LABEL"), 20);
        this.startAuto_text.anchor.setTo(0.5, 0.5);
        this.startAuto.addChild(this.startAuto_text);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_innerPanel.add(this.startAuto);

        this.panel2Open = false;

        function openAutoplayPanel2() {

            if (!this.autoplay_panel2.visible) {
                this.stop_win_amount.verifyState();
                this.stop_cash_amount.verifyState();
                this.stop_lose.verifyState();

                this.autoplay_panel2.visible = true;
                this.panel2Open = true;

                // Play unfold animation
                Controls.autoBgAnim2.play();
                // Controls.autoplay_Panel_Bg.y = 50;
                // var autoDrop1 = context.game.add.tween(Controls.autoplay_Panel_Bg).to({
                //   y:85
                // }, 500, Phaser.Easing.Back.Out, true);

                // Time open the UI
                Controls.autoplay_innerPanel2.alpha = 0.0;
                var autoFade2 = context.game.add.tween(Controls.autoplay_innerPanel2).to({
                    alpha: 1
                }, 500, "Linear", true, 500);
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
        }

        function closeAutoplayPanel2() {
            this.autoplay_panel.visible = true;
            this.autoplay_panel2.visible = false;
        }


        // STOP AT ANY WIN
        this.stop_any_checkbox = new CheckΒoxSmall(19, -10, context.game, null, null, bedbugGameCore.autoplay_setup.on_win.checked, options, function(o) {
            bedbugGameCore.autoplay_setup.on_win.checked = o
        }, true, "screens2", "check");
        this.stop_any_text = context.game.add.bitmapText(25, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_ANY"), 20);
        this.stop_any_text.anchor.setTo(0, 0);


        // ADD TEXT AS CHILD
        this.stop_any_checkbox.addChild(this.stop_any_text);
        this.stop_any_checkbox.scale.setTo(1, 1);
        // ADD ANY WIN TO PANEL GROUP
        this.autoplay_innerPanel2.add(this.stop_any_checkbox);

        // STOP AT WIN AMOUNT
        this.stop_win_amount = new CheckΒoxSmall(19, 20, context.game, null, bedbugGameCore.autoplay_setup.on_win_amount.value, bedbugGameCore.autoplay_setup.on_win_amount.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_win_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_win_amount.value = e
        }, true, "screens2", "check");
        this.stop_win_text = context.game.add.bitmapText(25, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_WIN_AMOUNT"), 20);
        this.stop_win_text.anchor.setTo(0, 0);

        // ADD TEXT AS CHILD
        this.stop_win_amount.addChild(this.stop_win_text);

        // STOP AT CASH
        this.stop_cash_amount = new CheckΒoxSmall(19, 49, context.game, null, bedbugGameCore.autoplay_setup.on_cash_amount.value, bedbugGameCore.autoplay_setup.on_cash_amount.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_cash_amount.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_cash_amount.value = e;
        }, true, "screens2", "check");
        this.stop_cash_text = context.game.add.bitmapText(25, 0, "contrail_small", bedbugGameCore.getLocalizedText("STOP ON WIN CASH"), 20);
        this.stop_cash_text.anchor.setTo(0, 0);

        // ADD TEXT AS CHILD
        this.stop_cash_amount.addChild(this.stop_cash_text);

        // STOP AT TIME
        this.stop_time = new CheckΒoxSmall(19, 78, context.game, null, bedbugGameCore.autoplay_setup.on_time.value, bedbugGameCore.autoplay_setup.on_time.checked, options, function(o, e, m) {
            bedbugGameCore.autoplay_setup.on_time.checked = o;
            if (e && m) bedbugGameCore.autoplay_setup.on_time.value = [e, m];
        }, true, "screens2", "check");
        this.stop_time_text = context.game.add.bitmapText(25, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_TIME"), 20);
        this.stop_time_text.anchor.setTo(0, 0);

        // ADD TEXT AS CHILD
        this.stop_time.addChild(this.stop_time_text);

        // STOP AT LOSE
        this.stop_lose = new CheckΒoxSmall(19, 108, context.game, null, bedbugGameCore.autoplay_setup.on_lose.value, bedbugGameCore.autoplay_setup.on_lose.checked, options, function(o, e) {
            bedbugGameCore.autoplay_setup.on_lose.checked = o;
            if (e) bedbugGameCore.autoplay_setup.on_lose.value = e;
        }, true, "screens2", "check");
        this.stop_lose_text = context.game.add.bitmapText(25, 0, "contrail_small", bedbugGameCore.getLocalizedText("TXT_AUTOPLAY_STOP_LOSE"), 20);
        this.stop_lose_text.anchor.setTo(0, 0);
        // ADD TEXT AS CHILD
        this.stop_lose.addChild(this.stop_lose_text);

        // ADD Back BUTTON
        // this.backToAutoplay = context.game.add.button( 740, 15, 'mobile', closeAutoplayPanel2, this, 'btn_back_pressed.png', 'btn_back_pressed.png', 'btn_back_active.png');
        // this.backToAutoplay.anchor.setTo(0.5, 0.5);
        // this.autoplay_panel2.add(this.backToAutoplay);


        this.autoplay_innerPanel2.add(this.stop_lose);
        this.autoplay_innerPanel2.add(this.stop_time);
        this.autoplay_innerPanel2.add(this.stop_cash_amount);

        this.autoplay_innerPanel2.add(this.stop_win_amount);

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
        context.panel_pages = 3;
        context.page_bullets = context.game.add.group();

        var panel_height = 600;
        var panel_width = 762;
        var panel_x = (context.game.width / 2 - panel_width / 2);
        var panel_y = 20;

        var paytable_area = Controls.createPopupBG(context.game, panel_width, panel_height + 30, true, null, hidePaytable, this);


        paytable_area.y -= 30;
        context.paytable.x = 0;

        context.paytable.add(paytable_area);

        var legal_text = context.game.add.text(panel_x + panel_width / 2, panel_y + panel_height - 145, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_GENERAL_INFO"), {
            font: '16px Arial',
            fill: '#fff',
            align: 'center',

            wordWrap: true,
            wordWrapWidth: panel_width + 50
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
        // var screen1_heading = context.game.add.text((panel_width / 2) + 55, 55, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen1_heading.anchor.setTo(0.5, 0.5);
        //screen1_heading.width = 200;
        // WILD SYMBOL
        var info1 = context.game.add.text(panel_width / 2 + 40, 70, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_01"), {
            'font': ' 22px Arial',
            'fill': '#fff',
            'align': 'center',

        });
        info1.anchor.setTo(.5, 0);
        info1.resolution = 2;
        var wilds_stacked = context.game.add.sprite(0, 110, "assets2", "wilds_stacked.png");
        // // SCATTER SYMBOL
        var scattersymbol = getSymbol(bedbugGameCore.symbolNameToID("WILD"), left + 250, 180, 150);

        var info2 = context.game.add.text(scattersymbol.x, scattersymbol.y + 80, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02") + "\n\n" + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03") + "\n\n" + bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_04"), {
            'font': ' 22px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "300"
        });
        info2.anchor.setTo(.5, 0);
        info2.lineSpacing = -5;
        info2.resolution = 2;
        var info3 = context.game.add.text((panel_width) - 80, 135, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_05"), {
            'font': ' 22px Arial',
            'fill': '#fff',
            'align': 'center',
            wordWrap: true,
            wordWrapWidth: "350"
        });
        info3.lineSpacing = -5;
        info3.anchor.setTo(0.5, 0.5);
        info3.resolution = 2;

        var diamonds_stacked1 = context.game.add.sprite((panel_width) - 230, 170, "assets2", "diamonds_stacked.png");
        var diamonds_stacked2 = context.game.add.sprite((panel_width) - 120, 170, "assets2", "diamonds_stacked.png");
        var diamonds_stacked3 = context.game.add.sprite((panel_width) - 10, 170, "assets2", "diamonds_stacked.png");
        // diamonds_stacked1.anchor.
        // FREE SPINS TEXT
        // var freeSpinsText = context.game.add.text(panel_width / 2 + 45, 350, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_02"), {
        //     'font': 'bold 22px Arial',
        //     'fill': '#fff',
        //     'align': 'center',
        //     wordWrap: true,
        //     wordWrapWidth: "700"
        // });
        // freeSpinsText.anchor.setTo(0.5, 0);

        // var freeSpinsText2 = context.game.add.text(panel_width / 2 + 45, 390, bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_03")+"\n"+bedbugGameCore.getLocalizedText("TXT_PAYTABLE_PAGE_01_INFO_04"), {
        //     'font': ' 22px Arial',
        //     'fill': '#fff',
        //     'align': 'center',
        //     wordWrap: true,
        //     wordWrapWidth: "700"
        // });
        // freeSpinsText2.anchor.setTo(0.5, 0);

        // screen1.add(screen1_heading);
        screen1.add(diamonds_stacked1);
        screen1.add(diamonds_stacked2);
        screen1.add(diamonds_stacked3);
        screen1.add(scattersymbol);
        screen1.add(wilds_stacked);
        screen1.add(info1);
        screen1.add(info2);
        screen1.add(info3);

        // screen1.add(freeSpinsText);
        // screen1.add(freeSpinsText2);


        /* PAGE 3 */
        var screen3 = context.game.add.group();
        // var screen3_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
        // screen3_heading.anchor.setTo(0.5, 0.5);
        // screen3_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        var symbol1 = getSymbol(bedbugGameCore.symbolNameToID("H3"), left + 180, 180, 130, getAward("H3", "5"), getAward("H3", "4"), getAward("H3", "3"));
        var symbol2 = getSymbol(bedbugGameCore.symbolNameToID("H2"), left + 400, 180, 130, getAward("H2", "5"), getAward("H2", "4"), getAward("H2", "3"));
        var symbol3 = getSymbol(bedbugGameCore.symbolNameToID("H1"), left + 610, 180, 130, getAward("H1", "5"), getAward("H1", "4"), getAward("H1", "3"));
        // var symbol4 = getSymbol(bedbugGameCore.symbolNameToID("P1"), left + 700, 200, 130, 120, 30, 10);
        // var symbol5 = getSymbol(bedbugGameCore.symbolNameToID("M1"), left + 615, 390, 130, 250, 40, 20);
        var symbol7 = getSymbol(bedbugGameCore.symbolNameToID("L3"), left + 180, 360, 130, getAward("L3", "5"), getAward("L3", "4"), getAward("L3", "3"));
        var symbol8 = getSymbol(bedbugGameCore.symbolNameToID("L2"), left + 400, 360, 130, getAward("L2", "5"), getAward("L2", "4"), getAward("L2", "3"));
        var symbol9 = getSymbol(bedbugGameCore.symbolNameToID("L1"), left + 610, 360, 130, getAward("L1", "5"), getAward("L1", "4"), getAward("L1", "3"));
        // var symbol10 = getSymbol(bedbugGameCore.symbolNameToID("L1"), left + 700, 380, 130, 50, 12, 4);

        screen3.add(symbol1);
        screen3.add(symbol2);
        screen3.add(symbol3);
        // screen3.add(symbol4);
        screen3.add(symbol7);
        screen3.add(symbol8);
        screen3.add(symbol9);
        // screen3.add(symbol10);
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
        var screen5 = context.game.add.group();
        // this.paytable.add(screen5);
        // var screen5_heading = context.game.add.text(panel_width / 2 + 55, 55, bedbugGameCore.getLocalizedText("paytable_betlines_heading"), headingStyle);
        // screen5_heading.anchor.setTo(0.5, 0.5);
        // // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        // screen5.add(screen5_heading);

        var paylines = bedbugGameCore.game.add.sprite(panel_width / 2 + 50, panel_height / 2 - 20, "mobile", "paylines.png");
        paylines.anchor.setTo(.5);
        screen5.add(paylines);
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

        screen1.scale = screen3.scale = screen5.scale = {
            x: .95,
            y: .95
        };


        slider.createSlider({
            customSliderBG: false,
            mode: "horizontal",
            showHandles: false,
            sliderBG: 0x202020,
            sliderBGAlpha: 0.01,
            width: panel_width + 50,
            height: panel_height,
            x: panel_x + context.paytable.x - 20,
            y: panel_y,
            objects: [screen1, screen3, screen5]
        });


        // The close buton
        // Close button is  a center component. Many alignments are based on this.
        // var close_button = new CustomButton(context.game, "X", panel_x + 90, panel_y + panel_height -30, 40, 40, hidePaytable, null, false, {
        //     font: "bold 30px Arial"
        // }, false);

        // CLOSE BUTTON
        var close_button = bedbugGameCore.game.add.button(panel_width / 2, panel_y + panel_height - 30, 'mobile', hidePaytable, this, 'btn_options_close_pressed.png', 'btn_options_close_pressed.png', 'btn_options_close_active.png');
        close_button.anchor.setTo(.5, .5);
        close_button.scale.setTo(0.5, 0.5);
        close_button.alpha = 0;

        this.close_button2 = bedbugGameCore.game.add.button(265, 568, 'assets', hidePaytable, this, 'paytable-home-button-over.png', 'paytable-home-button-active.png', 'paytable-home-button-pressed.png', 'paytable-home-button-active.png');
        this.close_button2.anchor.setTo(.5, .5);
        this.close_button2.visible = false;
        //close_button.scale.setTo(0.5, 0.5);
        // this.close_button2.input.enableDrag();
        // this.close_button2.events.onDragStop.add(onDragStop, this);
        // this.close_button2.input.enableDrag();
        // this.close_button2.events.onDragStop.add(onDragStop, this);
        // function onDragStop(sprite, pointer) {
        //     console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        // }



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
        chevronRight.anchor.setTo(.5, .5);

        chevronRight.x = 310;
        chevronRight.y = 568;
        // chevronRight.inputEnabled = true;
        // chevronRight.events.onInputDown.add(function(e, pointer) {
        //     bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
        //     if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
        //     context.drawBullets(context.current_bullet);
        //     slider.goToNext();
        // }, slider);

        function chevronRightPress() {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
            context.drawBullets(context.current_bullet);
            slider.goToNext();
        }



        chevronLeft = bedbugGameCore.game.add.button(50, 0, 'assets', chevronLeftPress, this, 'paytable-left-button-over.png', 'paytable-left-button-active.png', 'paytable-left-button-pressed.png', 'paytable-left-button-active.png');
        //chevronLeft.scale.setTo(0.5, 0.5);
        chevronLeft.anchor.setTo(.5, .5);
        chevronLeft.x = 220;
        chevronLeft.y = 568;
        chevronLeft.inputEnabled = true;
        chevronLeft.events.onInputDown.add(function(e, pointer) {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
            context.drawBullets(context.current_bullet);
            slider.goToPrev();
        }, slider);

        chevronLeft.input.enableDrag();
        chevronLeft.events.onDragStop.add(onDragStop, this);
        chevronRight.input.enableDrag();
        chevronRight.events.onDragStop.add(onDragStop, this);

        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }

        function chevronLeftPress() {
            bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
            if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
            context.drawBullets(context.current_bullet);
            slider.goToPrev();
        }

        context.paytable.add(chevronRight);
        context.paytable.add(chevronLeft);

        slider.hideSlider();

        var bullet_size = 150
        context.page_bullets.x = panel_width / 2 + bullet_size;
        context.page_bullets.y = close_button.y - 21;

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
                var bullets = bedbugGameCore.game.add.sprite(0, 0, "assets");
                if (i == index) {

                    bullets.frameName = "paytable-page-tab-on.png";
                }
                else {

                    bullets.frameName = "paytable-page-tab-off.png";
                }

                bullets.x = 95 + (40 * i);
                bullets.anchor.setTo(.5, .5);
                context.page_bullets.add(bullets);
                //console.log(context.page_bullets.length);
            })



        }


        context.paytable.add(context.page_bullets);
        context.drawBullets(context.current_bullet);

        var client_version = context.game.add.text(panel_x + panel_width - 20, 572, "Client v" + bedbugGameCore.game_specs.version, {
            font: '14px Arial',
            fill: '#fff',
            align: 'left'
        })
        client_version.anchor.setTo(.5);
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
