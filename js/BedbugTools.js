MessageTools = {};

var defaults = {
    normal: {
        bgColor: 0xD86026,
        fill: 0xffffff,
        headingBgColor: 0xffffff,
        headingFill: "#D86026"
    },
    "error": {
        "bgColor": "0x000000",
        "fill": "0xffffff",
        "headingBgColor": "0xff0000",
        "headingFill": "#FFF",
        "lineColor": "0xff0000"
    }
}


MessageTools.confirm = function(game, headingText, messageText, cbk, style, shouldPauseGame) {

    var prestyle;

    if (bedbugGameCore.game_specs)
        prestyle = {
            bgColor: bedbugGameCore.game_specs.messages.style.normal.bgColor,
            fill: bedbugGameCore.game_specs.messages.style.normal.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.normal.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.normal.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.normal.lineColor
        }
    else
        prestyle = defaults.normal;

    prestyle = _.merge(prestyle, style);


    var popup = createPopupBG(game, prestyle.bgColor, prestyle.headingBgColor, false);

    if (headingText) {
        var heading = new CustomLabel(game, headingText, 250, 0, 400, 50, true, {
            "bgColor": prestyle.headingBgColor,
            "backgroundAlpha": 1,
            fill: prestyle.headingFill,
            font: "bold 25px Arial"
        });

        var heading_bevel = new CustomLabel(game, headingText, 250, 3, 400, 50, true, {
            "bgColor": prestyle.headingBgColor,
            "backgroundAlpha": 0.3,
            fill: prestyle.headingFill,
            font: "bold 25px Arial"
        });

        popup.add(heading_bevel);

        popup.add(heading);
    }

    if (messageText) {
        var message = new CustomLabel(game, messageText, 250, 135, 400, 50, true, {
            "backgroundAlpha": 0,
            font: "bold 25px Arial",
            wordWrapWidth: 390

        });

        popup.add(message);
    }

    var ok_button = new CustomButton(game, bedbugGameCore.getLocalizedText("continue"), 250, 330, 200, 80, confirm, this, false, {
        font: "bold 25px Arial"
    }, shouldPauseGame);

    popup.add(ok_button);

    function confirm() {
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        if (cbk) cbk();
        game.paused = false;
        game.input.onDown.removeAll();
        popup.destroy();
    }

    popup.alpha = 0;
    var tween = game.add.tween(popup).to({
        alpha: 1
    }, 300, Phaser.Easing.Exponential.Out, true);

    //	When it completes it will call this function
    tween.onComplete.add(function() {
        if (shouldPauseGame)
            game.paused = true;
    }, this);


}

MessageTools.options = function(game, headingText, messageText, option1text, option2text, cbk1, cbk2, style, shouldPauseGame) {

    var prestyle;

    if (bedbugGameCore.game_specs)
        prestyle = {
            bgColor: bedbugGameCore.game_specs.messages.style.normal.bgColor,
            fill: bedbugGameCore.game_specs.messages.style.normal.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.normal.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.normal.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.normal.lineColor
        }
    else
        prestyle = defaults.normal;

    prestyle = _.merge(prestyle, style);



    var popup = createPopupBG(game, prestyle.bgColor, prestyle.headingBgColor, false);
    if (headingText && bedbugGameCore.game.cache.getJSON('bedbug').show_error_heading) {
        var heading = new CustomLabel(game, headingText, 250, 0, 400, 50, true, {
            "bgColor": prestyle.headingBgColor,
            "backgroundAlpha": 1,
            fill: prestyle.headingFill,
            font: "bold 25px Arial"
        });

        var heading_bevel = new CustomLabel(game, headingText, 250, 3, 400, 50, true, {
            "bgColor": prestyle.headingBgColor,
            "backgroundAlpha": 0.3,
            fill: prestyle.headingFill,
            font: "bold 25px Arial"
        });

        popup.add(heading_bevel);
        popup.add(heading);
    }

    if (messageText) {
        var message = new CustomLabel(game, messageText, 250, 135, 400, 50, true, {
            "backgroundAlpha": 0,
            font: "bold 25px Arial",
            wordWrapWidth: 390

        });

        popup.add(message);
    }
    var xpos = 135;

    if (!option2text)
        xpos = 250;


    var option1_button = new CustomButton(game, option1text, xpos, 330, 200, 80, option1, this, false, {
        font: "bold 25px Arial",
        wordWrapWidth: 180,
        wordWrap: true,
        align: 'center'
    }, shouldPauseGame);

    if (option2text)
        var option2_button = new CustomButton(game, option2text, 365, 330, 200, 80, option2, this, false, {
            font: "bold 25px Arial",
            wordWrapWidth: 180,
            wordWrap: true,
            align: 'center'
        }, shouldPauseGame);

    popup.add(option1_button);

    if (option2text)
        popup.add(option2_button);

    function option2() {
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        if (cbk2) cbk2();
        game.paused = false;
        game.input.onDown.removeAll();
        popup.destroy();
    }

    function option1() {
        bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        if (cbk1) cbk1();
        game.paused = false;
        game.input.onDown.removeAll();
        popup.destroy();
    }

    popup.alpha = 0;
    var tween = game.add.tween(popup).to({
        alpha: 1
    }, 300, Phaser.Easing.Exponential.Out, true);

    //	When it completes it will call this function
    tween.onComplete.add(function() {
        if (shouldPauseGame)
            game.paused = true;
    }, this);

    // popup.cacheAsBitmap = true;

}



MessageTools.error = function(game, headingText, messageText, option1text, option2text, cbk1, cbk2) {

    var errorstyle;
    if (bedbugGameCore.game_specs)
        errorstyle = {
            bgColor: bedbugGameCore.game_specs.messages.style.error.bgColor || this.defaultStyle.error.bgColor,
            fill: bedbugGameCore.game_specs.messages.style.error.fill || this.defaultStyle.error.fill,
            headingBgColor: bedbugGameCore.game_specs.messages.style.error.headingBgColor || this.defaultStyle.error.headingBgColor,
            headingFill: bedbugGameCore.game_specs.messages.style.error.headingFill || this.defaultStyle.error.headingFill,
            lineColor: bedbugGameCore.game_specs.messages.style.error.lineColor || this.defaultStyle.error.lineColor
        };
    else
        errorstyle = defaults.error;

    this.options(game, headingText, messageText, option1text, option2text, cbk1, cbk2, errorstyle);
}

MessageTools.showLoader = function() {

    if (this.loader)
        this.loader.destroy();
    var prestyle;


    var bgColor = bedbugGameCore.game_specs.messages.style.normal.bgColor;
    var fill = bedbugGameCore.game_specs.messages.style.normal.fill;
    var headingBgColor = bedbugGameCore.game_specs.messages.style.normal.headingBgColor;
    var headingFill = bedbugGameCore.game_specs.messages.style.normal.headingFill;
    var lineColor = bedbugGameCore.game_specs.messages.style.normal.lineColor;

    this.loader = bedbugGameCore.game.add.group();
    var game = bedbugGameCore.game;

    var panel_background = game.add.graphics(0, 0);
    panel_background.lineStyle(5, lineColor, 1);
    panel_background.beginFill(bgColor, 1);
    panel_background.drawRoundedRect(0, 0, 200, 200, 25);
    panel_background.endFill();
    panel_background.inputEnabled = true;

    var panel_background_bevel = game.add.graphics(0, 0);
    panel_background_bevel.beginFill(lineColor, .7);
    panel_background_bevel.drawRoundedRect(-3, 3, panel_background.width, panel_background.height, 25);
    panel_background_bevel.endFill();

    var panel_background_shadow = game.add.graphics(0, 0);
    panel_background_shadow.beginFill(0x000000, .4);
    panel_background_shadow.drawRoundedRect(20, 20, panel_background.width, panel_background.height, 25);
    panel_background_shadow.endFill();

    this.loader.add(panel_background_shadow);
    this.loader.add(panel_background_bevel);
    this.loader.add(panel_background);
    
    var loader_light = bedbugGameCore.game.add.sprite(90, 90, 'loader_light');
    loader_light.anchor.set(0.5,0.5);
    loader_light.x = panel_background.width / 2;
    loader_light.y = panel_background.height / 2;
    loader_light.animations.add('walk');
    loader_light.animations.play('walk', 24, true);
    this.loader.add(loader_light);
    
    this.loader.x = 640 - (panel_background.width / 2);
    this.loader.y = 330 - (panel_background.height / 2);

    this.loader.alpha = 0;
    var tween = bedbugGameCore.game.add.tween(this.loader).to({
        alpha: 1
    }, 300, Phaser.Easing.Exponential.Out, true);


}

MessageTools.hideLoader = function() {
    if (this.loader)
        this.loader.destroy();

    this.loader = null;
}


function createPopupBG(game, bgColor, lineColor, shouldCloseExternalClick) {

    var popup = game.add.group();

    var panel_block_input = game.add.graphics(0, 0);
    panel_block_input.beginFill(0x000000, 0.3);
    panel_block_input.drawRect(0, 0, 1280, 720);
    panel_block_input.endFill();

    panel_block_input.inputEnabled = true;

    if (shouldCloseExternalClick)
        panel_block_input.events.onInputUp.add(function(btn) {
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            popup.destroy(true);
        }, this);

    var panel_background = game.add.graphics(0, 0);
    panel_background.lineStyle(5, lineColor, 1);
    panel_background.beginFill(bgColor, 1);
    panel_background.drawRoundedRect(0, 0, 500, 400, 25);
    panel_background.endFill();
    panel_background.inputEnabled = true;

    var panel_background_bevel = game.add.graphics(0, 0);
    panel_background_bevel.beginFill(lineColor, .7);
    panel_background_bevel.drawRoundedRect(-3, 3, panel_background.width, panel_background.height, 25);
    panel_background_bevel.endFill();

    var panel_background_shadow = game.add.graphics(0, 0);
    panel_background_shadow.beginFill(0x000000, .4);
    panel_background_shadow.drawRoundedRect(20, 20, panel_background.width, panel_background.height, 25);
    panel_background_shadow.endFill();

    popup.add(panel_block_input);
    popup.add(panel_background_shadow);
    popup.add(panel_background_bevel);
    popup.add(panel_background);

    popup.x = 640 - (panel_background.width / 2);
    popup.y = 360 - (panel_background.height / 2);

    panel_block_input.x -= popup.x;
    panel_block_input.y -= popup.y;

    return popup;
}

BedbugTools = {}

BedbugTools.countTo = function(text, options) {

    // merge the default plugin settings with the custom options
    var defaults = _.clone(BedbugTools.countTo.defaults);
    options = _.merge(defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
        increment = (options.to - options.from) / loops;

    return _.each(this, function() {
        var _this = this,
            loopCount = 0,
            value = options.from,
            interval = setInterval(updateTimer, options.refreshInterval);

        function updateTimer() {
            value += increment;
            loopCount++;

            // Set money count according to server specs
            var count = options.isMoney ? bedbugGameCore.formatMoney(Math.abs(value)) : Math.round(Math.abs(value));

            count = options.isMoney ? (bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition == 0 || bedbugGameCore.configuration.server_settings.Game.Configuration.CurrencySymbolPosition == 2) ? bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol + count : count + bedbugGameCore.configuration.server_settings.Game.Configuration.LocalizedCurrencySymbol : count;
            count = options.concatPosition == 0 ? options.concated_text + count : count + options.concated_text;

            text.setText(count);

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

BedbugTools.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 100, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    concated_text: "",
    concatPosition: 0,
    isMoney: false,
    decimals: 0, // the number of decimal places to show
    onUpdate: null, // callback method for every time the element is updated,
    onComplete: null, // callback method for when the element finishes updating
};
