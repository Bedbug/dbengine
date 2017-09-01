var CustomButton = function(game, label, x, y, width, height, callback, callbackContext, isDraggable, prestyle, ignorePause, noLine, value) {
    Phaser.Group.call(this, game);

    var that = this;
    this.x = x;
    this.y = y;
    this.cacheX = x;
    this.cacheY = y;
    this.cacheWidth = width;
    this.cacheHeight = height;
    this.noLine = noLine;
    this.style = {
        'font': '12px Arial',
        'fill': 'white',
        'corners': 6,
        'backgroundAlpha': 0.01,
        'bgColor': 0x000000
    };

    if (prestyle)
        this.style = _.merge(this.style, prestyle);

    this.background = game.add.graphics(0, 0);
   
    if(noLine)
    this.background.lineStyle(1, 0x000000, 1);
    else
    this.background.lineStyle(2, 0xFFFFFF, 1);
    
    this.background.beginFill(this.style.bgColor, this.style.backgroundAlpha);
    this.background.drawRoundedRect(0 - (width / 2), 0 - (height / 2), width, height, this.style.corners);
    this.background.endFill();
    this.background.cacheAsBitmap = true;
    this.background.inputEnabled = true;
    this.addChild(this.background);

    this.button_label = game.add.text(0, 0, label, this.style);
    this.button_label.lineSpacing = -4;
    this.button_label.anchor.setTo(0.5, 0.45);
    this.button_label.cacheAsBitmap = true;
    this.addChild(this.button_label);


    if (ignorePause) {
        game.input.onDown.add(unpause, this);
    }

    // // TODO Find a better way to fix bounds
    // // Bounds Hack fix - Don't know why but creating and destroying a sprite will return the correct bounds of the graphic
    // var sprite = game.add.sprite(this.cacheX, this.cacheY, this.generateTexture());
    // sprite.anchor.setTo(0.5, 0.5);
    // this.addChild(sprite);
    // sprite.destroy();


    function unpause() {
        if (this.background.getBounds().contains(game.input.x, game.input.y)) {
            if (callback)
                callback(callbackContext, value);
        }
    }
    

    this.background.events.onInputDown.add(function(btn) {
        game.testPlacement = that;
        //btn.setFillColor(0xFFFFFF);
        // btn.parent.bringToTop(btn);
    }, this);

    this.background.events.onInputUp.add(function(btn) {
        if (callback)
            callback(callbackContext, value);


        if (isDraggable) {
            game.testPlacement = that;
        }
        //btn.setFillColor(0x982020);
    }, this);


    //   this.cacheAsBitmap = true;

    // // //adds button to game    
    game.add.existing(this);

};

CustomButton.prototype = Object.create(Phaser.Group.prototype);

CustomButton.prototype.constructor = CustomButton;
CustomButton.prototype.setLabel = function(label) {
    this.button_label.setText(label);
};

CustomButton.prototype.disable = function() {
    this.alpha = 0.4;
    this.background.inputEnabled = false;
}

CustomButton.prototype.enable = function() {
    this.alpha = 1;
    this.background.inputEnabled = true;
}

CustomButton.prototype.setFillColor = function(color) {
    this.clear();
    this.lineStyle(1, 0xFFFFFF, 1);
    this.beginFill(color, 1);
    this.drawRoundedRect(-(this.cacheWidth / 2), -(this.cacheHeight / 2), this.cacheWidth, this.cacheHeight, 6);
    this.endFill();
};
