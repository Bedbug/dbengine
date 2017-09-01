// var _ = require(['lib/lodash']);

// UNIFIED PANEL

UnifiedPanel = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    bet: 0,

    balance: 0,

    win: 0,

    volume: 0.5,

    funInfoIsShowing: false,

    settings_panel_open: false,

    audio_panel_open: false,

    localizationTexts: {},

    home_disable: false,

    init: function(mode, localization, language) {
        this.funPlayToggle(mode);
        this.setupInteractions();
        this.localizationTexts = localization;
        this.localizeTexts(language);
    },
    create: function(context) {


        var that = this;

        bedbugEventsSystem.addListener('ON_REELS_STARTED', ON_REELS_STARTED);
        bedbugEventsSystem.addListener('ON_REELS_STOPED', ON_REELS_STOPED);

        this.UIP = context.game.add.group();
        this.UIP.y = 720 - 30;

        var uip_background = context.game.add.graphics(0, 0);
        uip_background.beginFill(0x000000, 1);
        uip_background.drawRect(0, 0, 1280, 30);
        uip_background.endFill();

        var point_style = {
            'font': '15px Arial',
            'fill': '#ffffff'
        };

        /*****************************************************
         * PLAYER INFO AND WAGERS
         */
        var playerInfo_mask = context.game.add.graphics(0, 0);
        playerInfo_mask.beginFill(0x0225D0, 1);
        playerInfo_mask.drawRect(0, 0, 1280, uip_background.height);
        playerInfo_mask.endFill();
        playerInfo_mask.y = 720 - uip_background.height;

        this.playerInfo = context.game.add.group();
        var playerInfo_background = context.game.add.graphics(0, 0);
        playerInfo_background.beginFill(0x000000, 1);
        playerInfo_background.lineStyle(1, 0x575757);
        playerInfo_background.drawRoundedRect(0, 0, 560, uip_background.height - 8, 5);
        playerInfo_background.endFill();
        playerInfo_background.anchor.setTo(0.5, 0.5);

        this.balanceText = context.game.add.text(60, uip_background.height / 2 - 12, "Balance:", point_style);
        this.balanceText.resolution = 2;
        this.betText = context.game.add.text(260, uip_background.height / 2 - 12, "Bet:", point_style);
        this.betText.resolution = 2;
        this.winText = context.game.add.text(400, uip_background.height / 2 - 12, "Win:", point_style);
        this.winText.resolution = 2;

        var funInfo = context.game.add.text(playerInfo_background.width / 2, -20, bedbugGameCore.getLocalizedText("MSG_FUN_MODE"), point_style);
        funInfo.resolution = 2;
        funInfo.anchor.setTo(0.5, 0.5);

        this.playerInfo.add(funInfo);

        this.playerInfo.add(playerInfo_background);
        this.playerInfo.add(this.balanceText);
        this.playerInfo.add(this.betText);
        this.playerInfo.add(this.winText);
        this.playerInfo.mask = playerInfo_mask;


        this.playerInfo.x = (1280 / 2) - (this.playerInfo.width / 2);
        this.playerInfo.y = (uip_background.height / 2) - playerInfo_background.height / 2;

        /****************************************************/

        /*****************************************************
         * TIME INFO
         */
        this.timeInfo = context.game.add.text(1270, uip_background.height / 2, "TIME", point_style);
        this.timeInfo.resolution = 2;
        this.timeInfo.anchor.setTo(1, 0.5);

        /****************************************************/


        /*****************************************************
         * BUTTONS
         */
        var home_button = context.game.add.button(27, uip_background.height / 2, 'uip_buttons', goHome, this, 1, 0, 0, 0);
        home_button.anchor.setTo(0.5, 0.5);
        home_button.width = 22;
        home_button.height = 22;
        // Let's Create the buttons

        var settings_button = context.game.add.button(57, uip_background.height / 2, 'uip_buttons', this.openOptions, this, 3, 2, 2, 2);
        settings_button.anchor.setTo(0.5, 0.5);
        settings_button.width = 22;
        settings_button.height = 22;


        var delay = 300;
        that.prevAmbiance = false;
        that.prevEfects = false;

        this.volumeClicks = 0;
        that.clickHandled = false;

        var mute_image = context.game.add.sprite(87, uip_background.height / 2, 'uip_mute_sound');
        mute_image.anchor.setTo(0.5, 0.5);
        mute_image.visible = false;

        var sound_button = context.game.add.button(87, uip_background.height / 2, 'uip_buttons', function() {
                that.volumeClicks++;
                // code for first click
                setTimeout(function() {

                    if (that.volumeClicks == 1) {
                        that.openVolume();
                        that.clickHandled = false;
                    }
                    else {
                        if (that.clickHandled) {
                            that.clickHandled = false;
                            return;
                        }
                        that.clickHandled = true;

                        bedbugGameCore.game.sound.mute = !bedbugGameCore.game.sound.mute;
                        mute_image.visible = bedbugGameCore.game.sound.mute;

                        if (!bedbugGameCore.game.sound.mute) {
                            sliderVertical.setValue(bedbugGameCore.game.sound.volume);

                            // bedbugGameCore.settings.ambiance = that.prevAmbiance;
                            // bedbugGameCore.settings.sound_effects = that.prevEfects;
                            // context.setAmbiance(bedbugGameCore.settings.ambiance);

                            // if (bedbugGameCore.settings.sound_effects)
                            //     bedbugGameCore.sound_effects_volume = 1;
                            // else
                            //     bedbugGameCore.sound_effects_volume = 0;
                            // console.log("unmute");
                            mute_image.visible = false;
                        }
                        else {
                            // that.prevAmbiance = bedbugGameCore.settings.ambiance;
                            // that.prevEfects = bedbugGameCore.settings.sound_effects;
                            // bedbugGameCore.settings.ambiance = false;
                            // bedbugGameCore.settings.sound_effects = false;
                            // context.setAmbiance(bedbugGameCore.settings.ambiance);
                            // bedbugGameCore.sound_effects_volume = 0;
                            mute_image.visible = true;
                            bedbugGameCore.game.sound.mute = true;
                            sliderVertical.setValue(0);
                            // console.log("mute");
                        }
                    }

                    that.volumeClicks = 0;
                }, 400)
            },
            this, 5, 4, 4, 4);

        sound_button.anchor.setTo(0.5, 0.5);
        sound_button.width = 22;
        sound_button.height = 22;



        var info_button = context.game.add.button(117, uip_background.height / 2, 'uip_buttons', gameRules, this, 7, 6, 6, 6);
        info_button.anchor.setTo(0.5, 0.5);
        info_button.width = 22;
        info_button.height = 22;

        /****************************************************/

        var options = {
            checkBoxLine: 3,
            // color: 0x000000,
            // dotColor: 0x000000,
            fill: "#fff",
            wordWrapWidth: 320,

        };

        var panelStyle = {
            panel: false
        };

        var settingsTopY = 0;


        var showResponsibleSetting = _.find(bedbugGameCore.configuration.server_settings.Game.Settings, {
            SettingName: "ResponsibleGaming"
        });

        var showResponsibleOptions = showResponsibleSetting ? showResponsibleSetting.SettingValue : 0;

        if (showResponsibleOptions > 0) {
            settingsTopY = 34;
        }
        this.settingsPanel = this.createPanel(context.game, 260, 200, true, panelStyle);
        var settings_background = context.game.add.sprite(0, 0, showResponsibleOptions == 0 ? "uip_options_panel" : "uip_options_panel_responsible");
        settings_background.inputEnabled = true;
        this.settingsPanel.add(settings_background);
        this.settingsPanel.x = 5;
        this.settingsPanel.y = 520 - settingsTopY;

        var heading_setting_text = context.game.add.text(7, 5, bedbugGameCore.getLocalizedText("TXT_OPTIONS_LABEL"), {
            font: "13px Arial",
            fill: "#ffffff",
            align: 'left'
        });

        var game_play_setting_text = context.game.add.text(20, 27, bedbugGameCore.getLocalizedText("TXT_GAMEPLAY_SETTINGS_LABEL"), {
            font: "13px Arial",
            fill: "#ffffff",
            align: 'left'
        });

        var enable_fast_spins = new CheckΒoxSmall(20, 56, context.game, null, null, bedbugGameCore.settings.fast_spins, options, function(o) {
            bedbugGameCore.settings.fast_spins = o
        });

        var enable_fast_spins_text = context.game.add.text(50, 56, bedbugGameCore.getLocalizedText("TXT_FAST_SPINS_TOGGLE"), {
            font: "13px Arial",
            fill: "#ffffff",
            align: 'left'
        });

        if (showResponsibleOptions > 0)
            var responsible_options_button = new CustomButton(context.game, bedbugGameCore.getLocalizedText("TXT_RESPONSIBLE_GAMING_OPTIONS"), 20 + 85, 95, 170, 25, openResponsibleOptions, this, false, {
                font: "11px Arial",
                wordWrap: true,
                wordWrapWidth: 165,
                // bgColor: 0xFFFFFF,
                // backgroundAlpha: 1,
                fill: "#D86026",
                bgColor: 0xFFFFFF,
                backgroundAlpha: 1,
                fill: "#000",
                align: 'center',
                boundsAlignH: 'top'
            });



        this.settingsPanel.add(heading_setting_text);
        this.settingsPanel.add(game_play_setting_text);
        this.settingsPanel.add(enable_fast_spins);
        this.settingsPanel.add(enable_fast_spins_text);


        if (showResponsibleOptions > 0)
            this.settingsPanel.add(responsible_options_button);

        var audio_setting_text = context.game.add.text(20, 82 + settingsTopY, bedbugGameCore.getLocalizedText("TXT_SOUND_SETTINGS_LABEL"), {
            font: "13px Arial",
            fill: "#ffffff",
            align: 'left'
        });

        var enable_effects = new CheckΒoxSmall(20, 112 + settingsTopY, context.game, null, null, bedbugGameCore.settings.sound_effects, options, function(o) {
            bedbugGameCore.settings.sound_effects = o;
            if (o)
                bedbugGameCore.sound_effects_volume = 1;
            else
                bedbugGameCore.sound_effects_volume = 0;
        });

        var enable_effects_text = context.game.add.text(50, 112 + settingsTopY, bedbugGameCore.getLocalizedText("TXT_SOUND_EFFECTS_LABEL"), {
            font: "13px Arial",
            fill: "#ffffff",
            align: 'left'
        });

        var enable_ambiance = new CheckΒoxSmall(20, 140 + settingsTopY, context.game, null, null, bedbugGameCore.settings.ambiance, options, function(o) {
            bedbugGameCore.settings.ambiance = o;
            context.setAmbiance(o);
        });

        var enable_ambiance_text = context.game.add.text(50, 140 + settingsTopY, bedbugGameCore.getLocalizedText("TXT_AMBIENT_SOUNDS_LABEL"), {
            font: "13px Arial",
            fill: "#ffffff",
            align: 'left'
        });


        this.settingsPanel.add(audio_setting_text);
        this.settingsPanel.add(enable_effects);
        this.settingsPanel.add(enable_effects_text);
        this.settingsPanel.add(enable_ambiance);
        this.settingsPanel.add(enable_ambiance_text);
        this.settingsPanel.visible = false;

        this.responsiblePanel = this.createPanel(context.game, 260, 200, true, panelStyle);
        var responsiblePanel_background = context.game.add.sprite(0, 0, "uip_responsible_options");
        this.responsiblePanel.add(responsiblePanel_background);
        this.responsiblePanel.x = 215;
        this.responsiblePanel.y = 520;
        this.responsiblePanel.visible = false;

        var responsible_setting_text = context.game.add.text(20, 10, bedbugGameCore.getLocalizedText("TXT_RESPONSIBLE_GAMING_OPTIONS"), {
            font: "bold 12px Arial",
            fill: "#ffffff",
            align: 'left'
        });

        var options = {
            checkBoxLine: 1,
            // color: 0x000000,
            // dotColor: 0x000000,
            checkBoxSize: 20,
            fill: "#fff",
            font: "12px Arial",
            wordWrapWidth: 140,
            inputWidth: 50
        };


        var max_session_ammount = new CheckΒox(20, 45, context.game, bedbugGameCore.getLocalizedText("TXT_MAX_TIME_PER_SESSION_LABEL") + " (min)", Responsible_Gaming.values.max_time_session, Responsible_Gaming.values.max_session_active, options, function(o, e) {
            Responsible_Gaming.values.max_session_active = o;
            if (e) Responsible_Gaming.values.max_time_session = e * 60;
        });

        var reality_check_ammount = new CheckΒox(20, 95, context.game, bedbugGameCore.getLocalizedText("TXT_REALITY_CHECK_INTERVAR_LABEL") + " (min)", Responsible_Gaming.values.reality_check_interval, Responsible_Gaming.values.reality_check_active, options, function(o, e) {
            Responsible_Gaming.values.reality_check_active = o;
            if (e) Responsible_Gaming.values.reality_check_interval = e * 60
        });

        this.responsiblePanel.add(responsible_setting_text);
        this.responsiblePanel.add(max_session_ammount);
        this.responsiblePanel.add(reality_check_ammount);

        function openResponsibleOptions() {
            that.responsiblePanel.visible = true;
        }
        /****************************************************/


        this.UIP.add(uip_background);
        // this.UIP.add(playInfo);
        this.UIP.add(this.timeInfo);
        this.UIP.add(home_button);
        this.UIP.add(settings_button);
        this.UIP.add(sound_button);
        this.UIP.add(mute_image);
        this.UIP.add(info_button);
        this.UIP.add(this.playerInfo);
        this.startTimer();
        this.loopFunPlay(context);

        // Set user balance
        this.updateUnifiedPanelValues();


        this.volumebg = this.createPanel(context.game, 0, 0, true, panelStyle, this.closeVolume, this);
        this.VolumeInputBlock = context.game.add.graphics(0, 0);
        this.VolumeInputBlock.beginFill(0x110000, 1);
        this.VolumeInputBlock.drawRect(
            65,
            553,
            49,
            130
        );
        this.VolumeInputBlock.endFill();
        this.VolumeInputBlock.inputEnabled = true;
        this.volumepanel;
        bedbugGameCore.slickUI.add(this.volumepanel = new SlickUI.Element.Panel(62, 550, 55, 136));
        var sliderVertical = new SlickUI.Element.Slider(25, 17, 90, 1, true);
        this.volumepanel.add(sliderVertical);
        sliderVertical.onDrag.add(function(value) {
            // This will log the slider's value on a scale of 100 every time the user moves the drag handle
            UnifiedPanel.volume = value;
            bedbugGameCore.game.sound.volume = value;

            if (bedbugGameCore.game.sound.volume == 0) {
                mute_image.visible = true;
                bedbugGameCore.game.sound.mute = true;
            }
            else {
                mute_image.visible = false;
                bedbugGameCore.game.sound.mute = false;
            }

            if (bedbugGameCore.settings.sound_effects)
                bedbugGameCore.sound_effects_volume = value;

            if (bedbugGameCore.settings.ambiance) {
                bedbugGameCore.ambiance_volume = value;
                _.each(bedbugGameCore.ambiance_channel, function(amb) {
                    amb.volume = bedbugGameCore.ambiance_volume;
                })
            }

            // console.log(value);
            // console.log(Math.round(value * 100) + '%');
        });

        this.volumebg.visible = false;
        this.volumepanel.visible = false;
        this.VolumeInputBlock.visible = false;

        // sliderVertical.onDragStart.add(function(value) {
        //     // This will be logged when the user clicks on the drag handle
        //     console.log('Start dragging at ' + Math.round(value * 100) + '%');
        // });
        // sliderVertical.onDragStop.add(function(value) {
        //     // This will be logged when the user releases the drag handle
        //     console.log('Stop dragging at ' + Math.round(value * 100) + '%');
        // });


    },
    setupInteractions: function() {
        // Setup panel button
        $('#unified_home').click(goHome);
        $('#gameRulesButton').click(gameRules);
        $('#unified_gear').click(toggleOptions);
        $('#unified_audio').click(toggleAudio);
        $('#localized_fast_spins').click(toggleFastSpinsSetting);
        $('#localized_sound_effects').click(toggleSoundEffectsSetting);
        $('#localized_sound_ambiance').click(toggleAmbianceSetting);
        $('#localized_quality_high, #localized_quality_medium, #localized_quality_low').click(switchQualitySetting);


        // Setup the volume slider
        $("#volume").slider({
            min: 0,
            max: 100,
            value: this.volume * 100,
            range: "min",
            animate: true,
            slide: function(event, ui) {
                setVolume((ui.value) / 100);
            }
        });
    },
    localizeTexts: function(languagekey) {
        _.forEach(this.localizationTexts, function(value, key) {
            var id = '#' + key;
            $(id).text(value[languagekey]);
        })
    },
    resetPanelValues: function() {
        this.bet = 0;
        this.balance = 0;
        this.win = 0;
        this.updateUnifiedPanelValues();
    },
    setUnifiedPanelVisibility: function(state) {
        // if (state) {
        //     document.getElementById('unified-control').style.display = state;
        // }

        // this.startTime();
    },
    setUserBalance: function() {
        BedbugTools.countTo(this.balanceText, {
            from: this.balance, // the number the element should start at
            to: bedbugGameCore.balance, // the number the element should end at
            speed: 500, // how long it should take to count between the target numbers
            refreshInterval: 25, // how often the element should be updated
            isMoney: true,
            concated_text: bedbugGameCore.getLocalizedText("TXT_BALANCE_LABEL") + ": ",
        });

        this.balance = bedbugGameCore.balance;
    },
    setUserBet: function() {
        BedbugTools.countTo(this.betText, {
            from: this.bet, // the number the element should start at
            to: bedbugGameCore.bet_cash, // the number the element should end at
            speed: 500, // how long it should take to count between the target numbers
            refreshInterval: 25, // how often the element should be updated
            isMoney: true,
            concated_text: bedbugGameCore.getLocalizedText("TXT_BET_LABEL") + ": ",
        });
        this.bet = bedbugGameCore.bet_cash;
    },
    setUserWin: function(win) {

        BedbugTools.countTo(this.winText, {
            from: this.win, // the number the element should start at
            to: bedbugGameCore.win, // the number the element should end at
            speed: 500, // how long it should take to count between the target numbers
            refreshInterval: 25, // how often the element should be updated
            isMoney: true,
            concated_text: bedbugGameCore.getLocalizedText("TXT_WIN_LABEL") + ": ",
        });
        this.win = bedbugGameCore.win;
    },
    updateUnifiedPanelValues: function() {
        this.setUserBet();
        this.setUserWin(this.win);
        this.setUserBalance(this.balance);
    },
    funPlayToggle: function(state) {

        clearInterval(this.funInfoInterval);

        $("#balance-block").removeClass('play-for-fun');

        if (state === true) {
            this.funInfoIsShowing = true;
            this.loopFunPlay();
        }
    },
    loopFunPlay: function(context) {
        // var context = this;
        // if (this.funInfoIsShowing) {
        //     this.funInfoIsShowing = false;
        //     $("#balance-block").removeClass('play-for-fun');
        //     this.funInfoInterval = setTimeout(function() {
        //         context.loopFunPlay();
        //     }, bedbugGameCore.configuration.fun_game_settings.fun_label_interval);
        // }
        // else {
        //     this.funInfoIsShowing = true;
        //     $("#balance-block").addClass('play-for-fun');
        //     this.funInfoInterval = setTimeout(function() {
        //         context.loopFunPlay();
        //     }, bedbugGameCore.configuration.fun_game_settings.fun_label_duration);
        // }

        if (bedbugGameCore.game_mode == 1 || bedbugGameCore.game_mode == 3) {
            var funtween = context.game.add.tween(this.playerInfo).to({
                y: 35
            }, 1000, Phaser.Easing.Exponential.Out, true, 2000, -1)

            funtween.yoyo(true, bedbugGameCore.configuration.fun_game_settings.fun_label_duration);
            funtween.repeatDelay(bedbugGameCore.configuration.fun_game_settings.fun_label_interval);
        }

    },
    startTimer: function() {
        var i = 0;
        var that = this;
        clearInterval(this.timeInterval);
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
    },
    createPanel: function(game, width, height, shouldCloseExternalClick, style, onClickOutsideCallback, scope) {

        var prestyle = {};

        prestyle = _.merge(prestyle, style);

        var popup = game.add.group();



        var panel_block_input = game.add.graphics(0, 0);

        panel_block_input.beginFill(0x000000, 0.1);
        panel_block_input.drawRect(-1280, -720, 1280 * 3, 720 * 3);
        panel_block_input.endFill();

        panel_block_input.inputEnabled = true;
        //panel_background.blockInput = true;

        panel_block_input.events.onInputUp.add(function(btn) {
            if (shouldCloseExternalClick) {
                popup.visible = false;
            }
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');

            if (onClickOutsideCallback)
                onClickOutsideCallback(scope);

        }, this);
        popup.add(panel_block_input);

        if (style.panel != false) {
            var panel_background = game.add.graphics(0, 0);
            panel_background.lineStyle(prestyle.stroke || 5, prestyle.lineColor, 1);
            panel_background.beginFill(prestyle.bgColor, 1);
            panel_background.drawRoundedRect(0, 0, width, height, prestyle.corner);
            panel_background.endFill();
            panel_background.inputEnabled = true;


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


            popup.add(panel_background);

            if (panel_background_shadow)
                popup.add(panel_background_shadow);
            if (panel_background_bevel)
                popup.add(panel_background_bevel);
            popup.add(panel_background);

            popup.x = 640 - (panel_background.width / 2);
            popup.y = 360 - (panel_background.height / 2);
        }
        panel_block_input.x -= popup.x;
        panel_block_input.y -= popup.y;

        return popup;
    },
    openOptions: function() {
        this.settingsPanel.visible = !this.settingsPanel.visible;
    },
    openVolume: function() {
        this.volumebg.visible = true;
        this.volumepanel.visible = true;
        this.VolumeInputBlock.visible = true;
    },
    closeVolume: function(context) {
        context.volumepanel.visible = false;
        context.VolumeInputBlock.visible = false;
    }

};



/********************************
 * Unified Panel Functions
 */
function ON_REELS_STARTED() {
    UnifiedPanel.home_disable = true;
}

function ON_REELS_STOPED() {
    UnifiedPanel.home_disable = false;
}

function goHome() {
    if (!UnifiedPanel.home_disable)
        bedbugGameCore.GO_HOME();
    else
        bedbugGameCore.log("Cannot go home now. Maybe try to phoning")
}

function gameRules() {
    bedbugGameCore.OPEN_GAME_RULES();
}

var lastOptionCalledTime = 0;
var lastVolumeCalledTime = 0;

function toggleOptions(e) {

    if (e)
        e.stopPropagation();


    if (Math.floor((new Date() - lastOptionCalledTime) / 500) < 1) {
        return;
    }
    else {
        lastOptionCalledTime = new Date();

    }

    if (UnifiedPanel.audio_panel_open) toggleAudio();

    UnifiedPanel.settings_panel_open = !UnifiedPanel.settings_panel_open;

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    if (UnifiedPanel.settings_panel_open) {

        $('.settings-options-panel-wrapper').click(function(e) { //button click class name is myDiv
            e.stopPropagation();
        });

        $(function() {
            $(document).bind('click', toggleOptions);
        });

        var animation = "fadeIn";
        $('.settings-options-panel-wrapper:hidden').css("display", "block");
        $('.settings-options-panel').addClass(animation).one(animationEnd, function() {
            $('.settings-options-panel').removeClass(animation);
            // $('.settings-options-panel').css("opacity", 1);
        });
    }
    else {
        var animation = "fadeOut";
        $('.settings-options-panel').addClass(animation).one(animationEnd, function() {
            $('.settings-options-panel').removeClass(animation);
            // $('.settings-options-panel').css("display", "none");
            $(document).unbind("click", toggleOptions);
            $('.settings-options-panel-wrapper').unbind("click");
            $('.settings-options-panel-wrapper').css("display", "none");
        });
    }
}


function toggleFastSpinsSetting(e) {
    $(e.target).toggleClass("ui-checkbox-off ui-checkbox-on");
    bedbugGameCore.settings.fast_spins = !bedbugGameCore.settings.fast_spins;

}

function toggleSoundEffectsSetting(e) {
    $(e.target).toggleClass("ui-checkbox-off ui-checkbox-on");
    if (bedbugGameCore.sound_effects_volume == 0)
        bedbugGameCore.sound_effects_volume = 1;
    else
        bedbugGameCore.sound_effects_volume = 0;

}

function toggleAmbianceSetting(e) {

    _.each(bedbugGameCore.ambiance_channel, function(amb) {
        amb.volume = bedbugGameCore.ambiance_volume;
    })
}

function switchQualitySetting(e) {
    console.log($("[id^=localized_quality_]"));
    $("[id^=localized_quality_]").removeClass("ui-radio-on ui-radio-off").addClass("ui-radio-off");
    $(e.target).addClass("ui-radio-on").removeClass("ui-radio-off");
}

function toggleAudio(e) {



    if (e)
        e.stopPropagation();

    if (Math.floor((new Date() - lastVolumeCalledTime) / 500) < 1) {
        return;
    }
    else {
        lastVolumeCalledTime = new Date();

    }

    if (UnifiedPanel.settings_panel_open) toggleOptions();
    UnifiedPanel.audio_panel_open = !UnifiedPanel.audio_panel_open;

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    if (UnifiedPanel.audio_panel_open) {

        $('.volume-panel-wrapper').click(function(e) { //button click class name is myDiv
            e.stopPropagation();
        });

        $(function() {
            $(document).bind('click', toggleAudio);
        });


        var animation = "fadeIn";
        $('.volume-panel-wrapper:hidden').css("display", "block");
        $('.volume-panel').addClass(animation).one(animationEnd, function() {
            console.log("remove it");
            $('.volume-panel').removeClass(animation);
        });
    }
    else {
        var animation = "fadeOut";
        $('.volume-panel').addClass(animation).one(animationEnd, function() {
            $('.volume-panel').removeClass(animation);
            $(document).unbind("click", toggleAudio);
            $('.volume-panel-wrapper').unbind("click");
            $('.volume-panel-wrapper').css("display", "none");
        });
    }
}

function toggleAudioMute() {
    console.log("mute")
};

// var myMedia = document.createElement('audio');
// $('#player').append(myMedia);
// myMedia.id = "myMedia";
// playAudio('http://iviewsource.com/exercises/audioslider/audio/ViewSource', 0);

function playAudio(fileName, myVolume) {
    var mediaExt = (myMedia.canPlayType('audio/mp3')) ? '.mp3' :
        (myMedia.canPlayType('audio/ogg')) ? '.ogg' :
        '';
    if (mediaExt) {
        myMedia.src = fileName + mediaExt;
        myMedia.setAttribute('loop', 'loop');
        setVolume(myVolume);
        myMedia.play();
    }
}

function setVolume(myVolume) {

    UnifiedPanel.volume = myVolume;
    bedbugGameCore.game.sound.volume = myVolume;

    var myMedia = document.getElementById('myMedia');
    // console.log(myVolume);
    if (myVolume == 0) {
        $('#unified_audio').removeClass('ui-icon-audio-mute ui-icon-audio-min ui-icon-audio-max');
        $('#unified_audio').addClass('ui-icon-audio-mute');
    }
    if (myVolume > 0) {
        $('#unified_audio').removeClass('ui-icon-audio-mute ui-icon-audio-min ui-icon-audio-max');
        $('#unified_audio').addClass('ui-icon-audio-min');
    }
    if (myVolume > 0.8) {
        $('#unified_audio').removeClass('ui-icon-audio-mute ui-icon-audio-min ui-icon-audio-max');
        $('#unified_audio').addClass('ui-icon-audio-max');
    }

    // myMedia.volume = UnifiedPanel.volume;
}



// CountTo jquery plugin
(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;

                // Set money count according to server specs
                var count = bedbugGameCore.formatMoney(value);
                count = options.symbolPosition == 0 ? options.symbol + count : count + options.symbol;

                $(_this).html(count);

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 100, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        symbol: "",
        decimals: 0, // the number of decimal places to show
        onUpdate: null, // callback method for every time the element is updated,
        onComplete: null, // callback method for when the element finishes updating
    };


})(jQuery);
