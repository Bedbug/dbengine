var BitmapButton = function(game, label, x, y, width, height, callback, callbackContext, isDraggable, prestyle, ignorePause) {
   
    Phaser.Graphics.call(this, game, x, y);

    var that = this;
    this.cacheX = x;
    this.cacheY = y;
    this.cacheWidth = width;
    this.cacheHeight = height;
    this.style = {
        'font': '12px Arial',
        'fill': 'white',
        'corners': 6,
        'backgroundAlpha': 0.01,
        'bgColor': 0x000000
    };

    if (prestyle)
        this.style = _.merge(this.style, prestyle);


    this.lineStyle(1, 0xFFFFFF, 1);
    this.beginFill(this.style.bgColor, this.style.backgroundAlpha);
    this.drawRoundedRect(0 - (width / 2), 0 - (height / 2), width, height, this.style.corners);
    this.endFill();
    
    

    this.inputEnabled = true;
    // this.input.enableDrag(isDraggable);
    // this.input.dragFromCenter = false;

    // this.events.onDragStop.add(function(sprite, pointer) {
    //     console.log(" dropped at x:" + pointer.x + " y: " + pointer.y);
    // }, this);
    var button_label = game.add.bitmapText(0, 0, 'defaultfont', label, 30);
    // this.button_label = game.add.text(0, 0, label, this.style);
    // this.button_label.resolution = 2;
    button_label.lineSpacing = -4;
    button_label.anchor.setTo(0.5, 0.5);
    this.addChild(button_label);
    // this.setLabel(label);

    
    if (ignorePause) {
        game.input.onDown.add(unpause, this);
    }
    
    // TODO Find a better way to fix bounds
    // Bounds Hack fix - Don't know why but creating and destroying a sprite will return the correct bounds of the graphic
    var sprite = game.add.sprite(this.cacheX,  this.cacheY, this.generateTexture());
    sprite.anchor.setTo(0.5,0.5);
    this.addChild(sprite);
    sprite.destroy();
    
    function unpause() {
        if (this.getBounds().contains(game.input.x, game.input.y)) {
            if (callback)
                callback(callbackContext);
        }
    }

    this.events.onInputDown.add(function(btn) {
        game.testPlacement = that;
        //btn.setFillColor(0xFFFFFF);
        // btn.parent.bringToTop(btn);
    }, this);

    this.events.onInputUp.add(function(btn) {
        if (callback)
            callback(callbackContext);


        if (isDraggable) {
            game.testPlacement = that;
        }
        //btn.setFillColor(0x982020);
    }, this);



    // // //adds button to game    
    game.add.existing(this);

};

BitmapButton.prototype = Object.create(Phaser.Graphics.prototype);

BitmapButton.prototype.constructor = BitmapButton;
BitmapButton.prototype.setLabel = function(label) {
    this.button_label.setText(label);
};

BitmapButton.prototype.setFillColor = function(color) {
    this.clear();
    this.lineStyle(1, 0xFFFFFF, 1);
    this.beginFill(color, 1);
    this.drawRoundedRect(-(this.cacheWidth / 2), -(this.cacheHeight / 2), this.cacheWidth, this.cacheHeight, 6);
    this.endFill();
};
