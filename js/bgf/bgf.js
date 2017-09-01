/**
 * @license
 * 
 * BedbugGamingFramework
 * Game: WinChill - Video Slot Machine 
 * 
 * This code is for use only for the game titled:  "WinChill"
 * video slot machine. No repetition in part or whole is permitted
 * without the written consent of the respectful copyright owners.
 * Copyright Aris Brink Koutroulis, Bedbug Studio, OOLA.
 **/

// The glue
var bedbugEventsSystem = new EventEmitter();

// The Object that will handle all server connections
var Server = {};

var UnifiedPanel;

Responsible_Gaming = null;

// The core of the video slot game framework
bedbugGameCore = {

    version: "1.0.10",

    home_url: "",

    rules_url: "",

    fps: false,

    debug: false,

    controls_enabled: true,

    reels_spinning: false,

    /**
     * 0: WaitForBet
     * 1: Spinning
     * 2: ShowWinnings
     * 3: BonusGame
     **/
    game_state: 0,

    GAME_STATES: {
        IDLE: 0,
        SPINNING: 1,
        SHOW_WIN: 2,
        BONUS: 3,
        AUTOPLAY: 4
    },

    setGameStatus: function(state) {
        this.game_state = state;
    },

    /* Here we've just got some global level vars that persist regardless of State swaps */
    bet_coins: 0,

    bet_cash: 0,

    bet_coins_step: 0,

    bet_level: 0,

    bet_level_step: 0,

    bet_levels: [],

    one_coin_cash_value: 0, // In cents (?)

    coin_value: 0,

    // coin_values: ["1", "2", "5", "10", "25", "500", "100", "200"], // Coin Based

    // coin_value_steps: ["0.01", "0.02", "0.05", "0.10", "0.25", "0.50", "1.00", "2.00"], // Cash Based

    coin_value_current: 0,

    coins: 0,

    balance: 0,

    win: 0,

    settings: {
        fast_spins: false,
        sound_effects: true,
        ambiance: true
    },

    sound_effects_volume: 1,

    ambiance_volume: 1,

    ambiance_channel: [],

    spins_queue: [],

    // The free_spins_left displayed to the user
    free_spins_left: 0,

    // [0 - none, 1 - active, 2 - last_spin]
    bonus_status: 0,

    bonus_stage: 0,

    bonus_multiplier: 1,

    bonus_total_coins: 0,

    bonus_total_cash: 0,

    bonus_total_free_spins: 0,

    // the slot symbol classes
    Slots: {},

    stopSpin: false,


    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check bedbugGameCore.orientated in internal loops to know if it should pause or not */
    orientated: false,
    
    hasFocus: true,

    init: function(callback) {
        var that = this;

        if (this.game.device.chrome) {
            var args = [
                '%c BEDBUG Slots GameEngine ' + this.version + '   ',
                'color: #ffffff; background: #d44a52;',
            ];
            console.log.apply(console, args);
        }
        else {
            console.log('BEDBUG Slots GameEngine ' + this.version);
        }





        // Set the Game_Mode
        this.game_mode = this.urlSettings.mode || this.config.GameMode || 3;

        if (this.game_mode == 3) {

            // Setting up the DEMO_PLAY State and dummy server
            Server = DemoServer;

            // Initialize the state and localization of the unified panel.
            // UnifiedPanel.init(bedbugGameCore.game_mode == 1, bedbugGameCore.configuration.unified_panel_localization, bedbugGameCore.urlSettings.language || bedbugGameCore.configuration.default_language);

            // Reset user values to zero
            this.resetUserValues();

            var initialBalance = (this.urlSettings.balance || this.configuration.server_settings.Player.CurrentBalance || this.configuration.fun_game_settings.user_starting_balance) / 100;

            this.setUserBalance(initialBalance);

            bedbugGameCore.log("Game inited in " + bedbugGameCore.configuration.states[bedbugGameCore.game_mode], true);

            if (callback)
                callback();
        }
        else {
            // Setting Up play from server [Regular, Sandbox]
            Server = IntralotServer;

            if (!Server.headers)
                console.log(Server);


            // console.log(this.urlSettings.UserToken);
            Server.headers.GameMode = this.game_mode;

            if (this.urlSettings.UserToken)
                Server.headers.UserToken = bedbugGameCore.config.UserToken = this.urlSettings.UserToken;

            if (this.urlSettings.RequestID)
                Server.headers.RequestID = bedbugGameCore.config.RequestID = this.urlSettings.RequestID;

            if (this.urlSettings.GameID)
                Server.headers.GameID = bedbugGameCore.config.GameID = this.urlSettings.GameID;

            if (this.urlSettings.AuthToken)
                Server.headers.AuthToken = bedbugGameCore.config.AuthToken = this.urlSettings.AuthToken;

            if (this.urlSettings.OperatorID)
                Server.headers.OperatorID = bedbugGameCore.config.OperatorID = this.urlSettings.OperatorID;

            if (this.urlSettings.GameLocaleId)
                this.configuration.default_language = bedbugGameCore.config.GameLocaleId = this.urlSettings.GameLocaleId;



            Server.init(function(res) {

                // console.log (bedbugGameCore.configuration.server_settings);
                bedbugGameCore.log("Server settings received", true);

                // Merge server game settings with the local game settings.
                _.assign(bedbugGameCore.configuration.server_settings, res);

                bedbugGameCore.log("Game inited in " + bedbugGameCore.configuration.states[bedbugGameCore.game_mode], true);

                bedbugGameCore.home_url = _.find(bedbugGameCore.configuration.server_settings.Game.Settings, {
                    "SettingName": "LobbyURL"
                }).SettingValue;
                bedbugGameCore.rules_url = _.find(bedbugGameCore.configuration.server_settings.Game.Settings, {
                    "SettingName": "HelpURL"
                }).SettingValue;
                // Initialize the state and localization of the unified panel.
                // UnifiedPanel.init(bedbugGameCore.game_mode == 1, bedbugGameCore.configuration.unified_panel_localization, bedbugGameCore.urlSettings.language || bedbugGameCore.configuration.default_language);

                // Reset user values to zero
                that.resetUserValues();

                var initialBalance = (that.urlSettings.balance || that.configuration.server_settings.Player.CurrentBalance || that.configuration.fun_game_settings.user_starting_balance) / 100;

                that.setUserBalance(initialBalance);

                // Set the user balance as received by the server.
                // bedbugGameCore.setUserBalance(bedbugGameCore.configuration.server_settings.Player.CurrentBalance / 100);
                // bedbugGameCore.updateBet();
                // bedbugGameCore.setUserWin(0);

                // Nothing to see here. Move along.
                if (callback)
                    callback();
            })

        }

    },

    urlSettings: {},
    mapUrlSettings: function(urlSettings) {
        this.urlSettings = urlSettings;
    },
    getLocalizedText: function(key) {

        var localizedResources = _.find(bedbugGameCore.configuration.server_settings.Game.Resources, function(res) {
            return res.Locale.toLowerCase() == bedbugGameCore.configuration.default_language.toLowerCase();
        });

        if (!localizedResources) {
            // bedbugGameCore.log("Localization for key: " + key + " and language: " + this.configuration.default_language + " is missing", false);
            return key;
        }

        var token = _.find(localizedResources.Tokens, function(tok) {
            return tok.TokenID.toLowerCase() == key.toLowerCase();
        });

        if (token)
            return token.Text;
        else {
            // bedbugGameCore.log("The key: [" + key + "] in localization is missing", false);
            return key;
        }


        // if (this.game.cache.getJSON('localization')[key])
        //     if (this.game.cache.getJSON('localization')[key][this.configuration.default_language])
        //         return this.game.cache.getJSON('localization')[key][this.configuration.default_language];
        //     else {
        //         bedbugGameCore.log("Localization for key: " + key + " and language: " + this.configuration.default_language + " is missing", false);
        //         return key;
        //     }
        // else {
        //     bedbugGameCore.log("The key: [" + key + "] in localization is missing", false);
        //     return key;
        // }
    },

    isDesktop: function() {
        return this.game.device.desktop === true;
    },

    payCoins: function() {
        if (bedbugGameCore.bet_coins < bedbugGameCore.coins || bedbugGameCore.bet_coins == bedbugGameCore.coins) {
            // return false;
            bedbugGameCore.coins -= bedbugGameCore.bet_coins;
            bedbugGameCore.coins = Math.round(bedbugGameCore.coins);

            bedbugGameCore.setUserBalance(bedbugGameCore.coins * bedbugGameCore.coin_value);

            bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');

        }
        return true;
    },
    canPayCoins: function() {
        if (bedbugGameCore.bet_coins < bedbugGameCore.coins || bedbugGameCore.bet_coins == bedbugGameCore.coins)
            return true;
        else
            return false;
    },

    resetUserValues: function() {
        if (UnifiedPanel)
            UnifiedPanel.updateUnifiedPanelValues();
    },
    addUserWin: function(coins, serverResult) {

        this.setUserWin(coins / 100);
        this.coins += coins;

        if (serverResult)
            this.setUserBalance(serverResult.FinalBalance / 100);

        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },
    setUserBalance: function(balance) {
        this.balance = balance;
        this.updateCoins();

        if (UnifiedPanel != undefined)
            UnifiedPanel.setUserBalance();
    },

    updateBet: function() {
        /** Coin Based Calculation **/
        // this.bet_coins = this.bet_level * this.bet_coins_step;
        // this.bet_cash = this.coin_value * this.bet_coins;

        /** Cents Based Calculation **/
        this.bet_coins = (bedbugGameCore.configuration.server_settings.Game.WagerSettings.BetLines[0] * bedbugGameCore.configuration.server_settings.Game.PayTables[0].BetAmount) * this.bet_level; // bedbugGameCore.configuration.server_settings.Game.WinLines.length * this.bet_level;
        this.bet_cash = this.coin_value * this.bet_coins;

        if (UnifiedPanel)
            UnifiedPanel.setUserBet();
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    updateCoins: function() {
        /** Coin Based Calculation **/
        // this.coins = this.balance / this.coin_value;

        /** Cents Based Calculation **/
        this.coins = this.balance / this.coin_value;
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    setUserWin: function(win) {
        this.win = win;
        if (UnifiedPanel)
            UnifiedPanel.setUserWin();
        bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    updateUnifiedPanelValues: function() {
        if (UnifiedPanel)
            UnifiedPanel.updateUnifiedPanelValues();
    },

    setMaxBet: function() {
        if (!bedbugGameCore.controls_enabled) return;

        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        var context = bedbugGameCore;
        bedbugGameCore.bet_level_step = bedbugGameCore.bet_levels.length - 1;
        bedbugGameCore.bet_level = bedbugGameCore.bet_levels[bedbugGameCore.bet_level_step];

        context.updateBet();
    },

    decrBetLevel: function() {

        if (!bedbugGameCore.controls_enabled) return;

        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');

        var context = bedbugGameCore;

        context.bet_level_step--;
        if (context.bet_level_step < 0)
            context.bet_level_step = 0;

        context.bet_level = bedbugGameCore.bet_levels[bedbugGameCore.bet_level_step];

        context.updateBet();

        // context.bet_level--;

        // if (context.bet_level < 1) {
        //     context.bet_level = 1;
        //     return;
        // }

        // context.updateBet();
    },
    incrBetLevel: function() {
        if (!bedbugGameCore.controls_enabled) return;

        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');

        var context = bedbugGameCore;

        context.bet_level_step++;
        if (context.bet_level_step > bedbugGameCore.bet_levels.length - 1)
            context.bet_level_step = bedbugGameCore.bet_levels.length - 1;

        context.bet_level = bedbugGameCore.bet_levels[bedbugGameCore.bet_level_step];

        context.updateBet();

        // var context = bedbugGameCore;
        // context.bet_level++;
        // if (context.bet_level > 10) {
        //     context.bet_level = 10;
        //     return;
        // }

        // context.updateBet();
    },
    incrCoinValue: function() {
        if (!bedbugGameCore.controls_enabled) return;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        var context = bedbugGameCore;
        context.coin_value_current++;

        //** Legacy method ot assign hard coded values **/
        // if (context.coin_value_current > context.coin_value_steps.length - 1) context.coin_value_current = context.coin_value_steps.length - 1;
        // context.coin_value = parseFloat(context.coin_value_steps[context.coin_value_current]);

        //** RGS CHANGE -- Changed to receive dynamic coin values**/
        if (context.coin_value_current > bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues.length - 1) context.coin_value_current = bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues.length - 1;

        context.coin_value = parseFloat(bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues[context.coin_value_current] * 0.01);

        context.updateCoins();
        context.updateBet();

    },

    decrCoinValue: function() {
        if (!bedbugGameCore.controls_enabled) return;
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        var context = bedbugGameCore;

        context.coin_value_current--;

        if (context.coin_value_current < 0) context.coin_value_current = 0;

        //** Legacy method ot assign hard coded values **/
        // context.coin_value = parseFloat(context.coin_value_steps[context.coin_value_current]);

        //** RGS CHANGE -- Changed to receive dynamic coin values**/
        context.coin_value = parseFloat(bedbugGameCore.configuration.server_settings.Game.WagerSettings.CoinValues[context.coin_value_current] * 0.01);

        context.updateCoins();
        context.updateBet();

    },
    formatMoney: function(num) {
        if (_.isString(num)) num = parseInt(num);
        var c = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedDecimalDigitsCount;
        var d = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedDecimalSeparator;
        var t = bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedThousandsSeparator;

        // function(c, d, t) {
        var n = num,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        var value = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

        return value;
    },

    log: function(text, success) {
        if (success == false) {
            if (this.game.device.chrome) {
                var args = [
                    '%c' + " [x] " + text + ' ',
                    // 'background: #5fba7d',
                    'color: #ffffff; background: #d02502;',
                    // 'background: #5fba7d'
                ];
                console.log.apply(console, args);
            }
            else {
                console.log(" [x] " + text);
            }
        }
        else if (success == true) {
            if (this.game.device.chrome) {
                var args = [
                    '%c' + " [√] " + text + ' ',
                    // 'background: #5fba7d',
                    'color: #ffffff; background: #349e10;',
                    // 'background: #5fba7d'
                ];
                console.log.apply(console, args);
            }
            else {
                console.log(" [√] " + text);
            }
        }
        else {
            if (this.game.device.chrome) {
                var args = [
                    '%c' + " [-] " + text + ' ',
                    // 'background: #5fba7d',
                    'color: #ffffff; background: #0e71f5;',
                    // 'background: #5fba7d'
                ];
                console.log.apply(console, args);
            }
            else {
                console.log(" [-] " + text);
            }
        }

    },

    getGridCenter: function() {
        var center = {
            "x": 0,
            "y": 0
        };

        center.x = bedbugGameCore.game_specs.grid.x + (((bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1))) / 2);

        center.y = bedbugGameCore.game_specs.grid.y + (((bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) + (bedbugGameCore.game_specs.reels.spacing.y * (bedbugGameCore.game_specs.grid.rows - 1))) / 2);

        return center;

    },
    autoplay_setup: {
        "on_win": {
            checked: false
        },
        "on_win_amount": {
            checked: false,
            value: 100
        },
        "on_cash_amount": {
            checked: false,
            value: 1.50
        },
        "on_time": {
            checked: false,
            value: [13, 30]
        },
        "on_lose": {
            checked: false,
            value: 5.00
        }
    },
    autoplay_steps: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 999],
    autoplay_current_step: 0,
    autoplay_proggresive_lose: 0,
    autoplay_count: 0,
    autoplay: {
        shouldStopOnLoss: function() {
            //  console.log("----- shouldStopOnLose: "+  bedbugGameCore.autoplay_proggresive_lose +" >= "+ bedbugGameCore.autoplay_setup.on_lose.value);
            //  console.log((bedbugGameCore.autoplay_setup.on_lose.checked && bedbugGameCore.autoplay_proggresive_lose >= bedbugGameCore.autoplay_setup.on_lose.value));
            return (bedbugGameCore.autoplay_setup.on_lose.checked && bedbugGameCore.autoplay_proggresive_lose >= bedbugGameCore.autoplay_setup.on_lose.value);
        },
        shouldStopOnWin: function(winCoins, winCash) {

            winCash = winCash / 100;

            // console.log(bedbugGameCore.autoplay_setup.on_win.checked + ": on_win. ")

            // console.log(bedbugGameCore.autoplay_setup.on_win_amount.checked + ": " + bedbugGameCore.autoplay_setup.on_win_amount.value + " | " + winCoins + ": " + (bedbugGameCore.autoplay_setup.on_win_amount.checked && bedbugGameCore.autoplay_setup.on_win_amount.value <= winCoins));

            // console.log(bedbugGameCore.autoplay_setup.on_cash_amount.checked + ": " +bedbugGameCore.autoplay_setup.on_cash_amount.value + " < " + winCash + ": " + (bedbugGameCore.autoplay_setup.on_cash_amount.checked && bedbugGameCore.autoplay_setup.on_cash_amount.value <= winCash));

            if (bedbugGameCore.autoplay_setup.on_win.checked) {
                bedbugGameCore.log("Autoplay stopped due to advanced Win On Any settings");
                return true;
            }
            if (bedbugGameCore.autoplay_setup.on_win_amount.checked && bedbugGameCore.autoplay_setup.on_win_amount.value <= winCoins) {
                bedbugGameCore.log("Autoplay stopped due to advanced Win Coins Amount settings");
                return true;
            }
            if (bedbugGameCore.autoplay_setup.on_cash_amount.checked && bedbugGameCore.autoplay_setup.on_cash_amount.value <= winCash) {
                bedbugGameCore.log("Autoplay stopped due to advanced Win Cash Amount settings");
                return true;
            }
            if (this.shouldStopOnTime())
                return true;

            return false;
        },
        shouldStopOnTime: function() {

            if (!bedbugGameCore.autoplay_setup.on_time.checked) return false;

            var thedate = new Date();
            
            bedbugGameCore.log("Stop On Time Debug:");
            bedbugGameCore.log("Time set to stop: "+ bedbugGameCore.autoplay_setup.on_time.value[0]+":"+ bedbugGameCore.autoplay_setup.on_time.value[1]);
            bedbugGameCore.log("PC Time: "+ thedate);
            bedbugGameCore.log("Actual Time: "+ thedate.getHours()+":"+ thedate.getMinutes());
            bedbugGameCore.log("Hours set greater than actual hours: "+ (thedate.getHours() > bedbugGameCore.autoplay_setup.on_time.value[0]));
            bedbugGameCore.log("Minutes set greater/equal than actual minutes: "+ ( thedate.getMinutes() >= bedbugGameCore.autoplay_setup.on_time.value[1]));
            
            // console.log("[ " + thedate.getHours() + " | " + bedbugGameCore.autoplay_setup.on_time.value[0] + " , " + thedate.getMinutes() + " | " + bedbugGameCore.autoplay_setup.on_time.value[1] + " ] ");
            if (thedate.getHours() > bedbugGameCore.autoplay_setup.on_time.value[0]) {
                bedbugGameCore.log("Autoplay stopped due to advanced Time settings");
                return true;
            }

            if (thedate.getHours() == bedbugGameCore.autoplay_setup.on_time.value[0] && thedate.getMinutes() >= bedbugGameCore.autoplay_setup.on_time.value[1]) {
                bedbugGameCore.log("Autoplay stopped due to advanced Time settings");
                return true;
            }

            return false;
        }
    },
    GO_HOME: function() {
        bedbugGameCore.log("Leaving game. Request to move to the Lobby.");
        // Notify Lobby that the user want to go home
        if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GO_HOME);

        console.log(this.home_url);
        if (this.home_url)
            window.location = this.home_url;
        // if(bedbugGameCore.configuration.server_settings)
    },
    OPEN_GAME_RULES: function() {
        bedbugGameCore.log("Request to view the game rules.");
        console.log(this.rules_url)
        if (this.rules_url)
            window.open(bedbugGameCore.rules_url);

    },
    /** UTILITIES **/
    numberWithSpaces: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    toFixed: function toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        var decNum = num.toString().match(re)[0];
        return this.addZeroes(decNum);
    },
    addZeroes: function(num) {
        //   num = parseFloat(num);
        // Cast as number
        var num = Number(num);
        // If not a number, return 0
        if (isNaN(num)) {
            return 0;
        }

        // If there is no decimal, or the decimal is less than 2 digits, toFixed
        if (String(num).split(".").length < 2 || String(num).split(".")[1].length <= 2) {
            num = num.toFixed(2);
        }
        // Return the number
        return num;
    },
    symbolNameToID: function(symbolName) {

        var v = _.find(this.configuration.server_settings.Game.Symbols, {
            "SymbolName": symbolName
        })
        if (v)
            return v.SymbolID;
        else return null;
    },
    getGuid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    createVertical: function(str) {
        var result = '';
        while (str.length > 0) {
            result += str.substring(0, 1) + '\n';
            str = str.substring(1);
        }
        return result;
    },
    iPhoneVersion: function() {
        //portrait
        if (window.innerHeight > window.innerWidth) {
            //iphone 6 && iphone 6S
            if (document.documentElement.clientWidth === 375 || document.documentElement.clientWidth === 414) {
                return 'iPhone6';
            }
            else {
                return 'iPhone5';
            }
        }
        else {
            //Landscape
            if (document.documentElement.clientWidth === 667 || document.documentElement.clientWidth === 736) {
                return 'iPhone6';
            }
            else {
                return 'iPhone5';
            }
        }
    },
    ios9FullscreenCheck: function ios9FullscreenCheck() {
        if (window.innerHeight < window.innerWidth) {
            //landscape
            if (window.innerHeight == document.documentElement.clientHeight) {
                // bedbugGameCore.game.paused = false;
                bedbugGameCore.CSSscrollUpDiv.style.visibility = 'hidden';
                bedbugGameCore.CSSscrollUpImageDiv.style.visibility = 'hidden';
                $(".scrollupimage").stop();
                bedbugGameCore.handAnimating = false;
                // this.CSSscrollUpImageDiv.className = 'scrollup-image';
            }
            else {
                bedbugGameCore.game.device.iPhoneDevice = bedbugGameCore.iPhoneVersion();
                if (bedbugGameCore.game.device.iPhoneDevice != 'iPhone5' && bedbugGameCore.game.device.iPhone4 != true) {
                    bedbugGameCore.CSSscrollUpDiv.style.visibility = 'visible';
                    // bedbugGameCore.game.paused = true;
                    bedbugGameCore.CSSscrollUpImageDiv.style.visibility = 'visible';
                    if (!bedbugGameCore.handAnimating) {
                        bedbugGameCore.handAnimating = true;
                        loop();
                    }
                }
            }
        }
        else {
            //portrait
            bedbugGameCore.CSSscrollUpDiv.style.visibility = 'hidden';
            // bedbugGameCore.game.paused = false;
            bedbugGameCore.CSSscrollUpImageDiv.style.visibility = 'hidden';
            $(".scrollupimage").stop();
            bedbugGameCore.handAnimating = false;
            // this.CSSscrollUpImageDiv.className = 'scrollup-image';
        }

        function loop() {
            var ScrollImage = $(".scrollupimage");
            ScrollImage.css({
                'background-position-y': '150px'
            });
            ScrollImage.animate({
                'opacity': 1
            }, 400, "swing", function() {
                ScrollImage.animate({
                    'background-position-y': '20',
                }, 2000, "swing", function() {
                    ScrollImage.animate({
                        'opacity': 0
                    }, 300, "swing", function() {
                        loop()
                    });
                });
            });
        }
    },
    removeSymbolInfo: function() {
        if (bedbugGameCore.symbolInfo)
            bedbugGameCore.symbolInfo.destroy();
    },
    showSymbolInfo: function(symbolID, position) {

        if (bedbugGameCore.BypassWinSequence && (!bedbugGameCore.BypassedWinSequence || bedbugGameCore.BypassedWinSequenceAfterCount)) return;
        if (bedbugGameCore.paytableIsShowing) return;

        // Fix for wrong symbol name in weather
        if (symbolID == "STORM") symbolID = "RAIN";

        if (bedbugGameCore.symbolInfo)
            bedbugGameCore.symbolInfo.destroy();

        var prizesList = bedbugGameCore.configuration.server_settings.Game.PayTables[0].Prizes;
        var prizes = [];

        _.each(prizesList, function(prize) {
            prizes.push(prize.PrizeLines[0]);
        })

        bedbugGameCore.showingSymbolInfo = true;

        bedbugGameCore.symbolInfo = bedbugGameCore.game.add.group();
        bedbugGameCore.symbolInfo.alpha = 0;
        bedbugGameCore.symbolInfo.inputEnableChildren = true;

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
        var panel_background;

        if (bedbugGameCore.game_specs.messages.style.normal.bgKey) {
            if (bedbugGameCore.game_specs.messages.style.normal.bgAtlas) {
                panel_background = bedbugGameCore.game.add.sprite(0, 0, bedbugGameCore.game_specs.messages.style.normal.bgAtlas, bedbugGameCore.game_specs.messages.style.normal.bgKey);
                panel_background.anchor.set(0, 0);
                panel_background.width = 350;
                panel_background.height = bedbugGameCore.game_specs.slots.height;
            }
        }
        else {
            panel_background = bedbugGameCore.game.add.graphics(0, 0);
            panel_background.lineStyle(3, prestyle.lineColor, 1);
            panel_background.beginFill(prestyle.bgColor, 1);
            panel_background.drawRoundedRect(0, 0, 350, bedbugGameCore.game_specs.slots.height, 15);
            panel_background.endFill();
            panel_background.alpha = 1;
        }

        bedbugGameCore.symbolInfo.add(panel_background);
        bedbugGameCore.symbolInfo.x = position.x - (bedbugGameCore.game_specs.slots.width / 2);
        bedbugGameCore.symbolInfo.y = position.y - (bedbugGameCore.game_specs.slots.height / 2);

        if ((bedbugGameCore.symbolInfo.x + bedbugGameCore.symbolInfo.width) > bedbugGameCore.game.width) {
            bedbugGameCore.symbolInfo.x += (bedbugGameCore.game.width - (bedbugGameCore.symbolInfo.x + bedbugGameCore.symbolInfo.width)) - 30;
        }

        bedbugGameCore.game.add.tween(bedbugGameCore.symbolInfo).to({
            alpha: 1
        }, 600, Phaser.Easing.Exponential.Out, true);
        bedbugGameCore.game.add.tween(bedbugGameCore.symbolInfo.scale).from({
            x: 0
        }, 200, Phaser.Easing.Back.Out, true);

        if (symbolID == "SCATTER" || symbolID == "SCAT") {
            var symbolgroup = getSymbol(bedbugGameCore.symbolNameToID(symbolID), 100, panel_background.height / 2, 130, "");
            var infotext = bedbugGameCore.game.add.text(symbolgroup.x + 100, symbolgroup.y, bedbugGameCore.getLocalizedText("TXT_INFO_SCATTER"), {
                'font': '18px Arial',
                'fill': '#fff',
                'align': 'center',
                wordWrap: true,
                wordWrapWidth: "100"
            });
            infotext.anchor.set(0, 0.5);
            bedbugGameCore.symbolInfo.add(infotext);
            bedbugGameCore.symbolInfo.add(symbolgroup);

            if (bedbugGameCore.game_specs.messages.slotinfo && bedbugGameCore.game_specs.messages.slotinfo.state == "appear")
                symbolgroup.setToAppear();
        }
        else if (symbolID == "WILD") {
            var symbolgroup = getSymbol(bedbugGameCore.symbolNameToID("WILD"), 100, panel_background.height / 2, 130, "");
            var infotext = bedbugGameCore.game.add.text(symbolgroup.x + 100, symbolgroup.y, bedbugGameCore.getLocalizedText("TXT_INFO_WILD"), {
                'font': '18px Arial',
                'fill': '#fff',
                'align': 'center',
                wordWrap: true,
                wordWrapWidth: "100"
            });
            infotext.anchor.set(0, 0.5);
            bedbugGameCore.symbolInfo.add(infotext);
            bedbugGameCore.symbolInfo.add(symbolgroup);

            if (bedbugGameCore.game_specs.messages.slotinfo && bedbugGameCore.game_specs.messages.slotinfo.state == "appear")
                symbolgroup.setToAppear();
        }
        else {
            var symbolgroup = getSymbol(bedbugGameCore.symbolNameToID(symbolID), 100, panel_background.height / 2, 130, getAward(symbolID, "5"), getAward(symbolID, "4"), getAward(symbolID, "3"));
            bedbugGameCore.symbolInfo.add(symbolgroup);
            if (bedbugGameCore.game_specs.messages.slotinfo && bedbugGameCore.game_specs.messages.slotinfo.state == "appear")
                symbolgroup.setToAppear();
        }


        function getAward(symbolName, quantity) {
            return _.find(prizes, {
                PrizeCode: symbolName,
                RequiredQty: quantity
            }).WinAmount;
        }

        function getSymbol(symbolID, x, y, dimension, points5, points4, points3, left, points2) {
            var point_style = {
                'font': 'bold 26px Arial',
                'fontWeight': 'bold',
                'fill': '#ffba00'
            };

            var symbol = new bedbugGameCore.Slots[symbolID](bedbugGameCore.game, 1, x, y, dimension, dimension);

            if (points5) {
                if (!left) {
                    var coins5 = bedbugGameCore.game.add.text(dimension / 2 + 25, -dimension / 2 + 20, "5    " + points5, point_style);
                    var coins4 = bedbugGameCore.game.add.text(dimension / 2 + 25, -dimension / 2 + 55, "4    " + points4, point_style);
                    var coins3 = bedbugGameCore.game.add.text(dimension / 2 + 25, -dimension / 2 + 85, "3    " + points3, point_style);
                    if (points2)
                        var coins2 = bedbugGameCore.game.add.text(dimension / 2 + 20, -dimension / 2 + 115, "2   " + points2, point_style);

                }
                else {
                    var coins5 = bedbugGameCore.game.add.text(-150, -dimension / 2 + 20, "5    " + points5, point_style);
                    var coins4 = bedbugGameCore.game.add.text(-150, -dimension / 2 + 55, "4    " + points4, point_style);
                    var coins3 = bedbugGameCore.game.add.text(-150, -dimension / 2 + 85, "3    " + points3, point_style);
                    if (points2)
                        var coins2 = bedbugGameCore.game.add.text(-150, -dimension / 2 + 115, "2   " + points2, point_style);
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
    }
};

(function($) {
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
})(jQuery);
