var CustomLabel = function(game, label, x, y, width, height, isDraggable, prestyle, clickCallback, angle) {
    Phaser.Group.call(this, game);

    var that = this;
    this.x = x;
    this.y = y;
    this.cacheX = x;
    this.cacheY = y;
    this.cacheWidth = width;
    this.cacheHeight = height;
    this.angle = angle;
    var backgroundColor = 0x000000;
    var backgroundAlpha = 0.1;

    // console.log(prestyle);

    var style = {
        font: "bold 18px Arial",
        fill: "#fff",
        wordWrap: true,
        wordWrapWidth: this.cacheWidth,
        align: "center",
        bgColor: 0x000000,
        backgroundAlpha: 0.01,
        lineAlpha: 0
            // backgroundColor: "#ffff00" 
    };

    if (prestyle)
        style = _.merge(style, prestyle);

    // if (prestyle)
    //     console.log(prestyle);

    // Background
    var background = game.add.graphics(0, 0);

    if (style.lineAlpha > 0)
        background.lineStyle(2, 0x000000, style.lineAlpha);

    background.beginFill(style.bgColor, style.backgroundAlpha);
    background.drawRoundedRect(0 - (width / 2), 0 - (height / 2), width, height, 6);
    background.endFill();
    background.cacheAsBitmap = true;

    this.addChild(background);

    if (clickCallback) {
        background.inputEnabled = true;
        background.events.onInputDown.add(function(e, pointer) {
            clickCallback()
        })
    }
    // Text
    this.button_label = game.add.text(0, 0, label, style);
    this.button_label.anchor.setTo(0.5, 0.4);

    if (!style.noShadow)
        this.button_label.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

    if (bedbugGameCore.game.device.desktop)
        this.button_label.resolution = 2;
    this.addChild(this.button_label);

    if(this.angle != 0) {
        // console.log("This Angle: ",this.angle)
        this.button_label.angle = this.angle;
    }


    game.add.existing(this);


    //  Input Enable the sprites
    // this.inputEnabled = true;
    // //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    // this.events.onInputDown.add(function(btn) {
    //     game.testPlacement = that;
    //     // btn.parent.bringToTop(btn);
    // }, this);

    // this.input.enableDrag();
    // this.input.dragFromCenter = false;

    // var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth:  this.cacheWidth, align: "center", backgroundColor: "#ffff00" };

    // text = game.add.text(0, 0, "- text on a sprite -\ndrag me", style);
    // text.anchor.set(0.5);
};

CustomLabel.prototype = Object.create(Phaser.Group.prototype);

CustomLabel.prototype.constructor = CustomLabel;
CustomLabel.prototype.setLabel = function(label) {
    this.button_label.setText(label);
};

CustomLabel.prototype.setFillColor = function(color) {
    this.clear();
    this.lineStyle(1, 0xFFFFFF, 1);
    this.beginFill(color, .5);
    this.drawRoundedRect(-(this.cacheWidth / 2), -(this.cacheHeight / 2), this.cacheWidth, this.cacheHeight, 6);
    this.endFill();
};
