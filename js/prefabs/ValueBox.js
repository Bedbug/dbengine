var ValueBox = function(game, stepperLabel, initValue, x, y, width, height, isDraggable, prestyle, isBitmap) {
    Phaser.Graphics.call(this, game, x, y);

    var that = this;
    this.cacheX = x;
    this.cacheY = y;
    this.cacheWidth = width;
    this.cacheHeight = height;
    this.isBitmap = isBitmap;
   
    // //  Input Enable the sprites
    // this.inputEnabled = false;
    // //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    // this.events.onInputDown.add(function(btn) {
    //     game.testPlacement = that;
    //     btn.parent.bringToTop(btn);
    // }, this);
    // this.input.enableDrag(isDraggable);
    // this.input.dragFromCenter = false;

    this.style = {
            font: "30px Arial",
            fill: "#fff",
            align: "center",
            heading: {
                font: " 30px Arial",
                fill: "#fff"
            }
        };

    // HEADING
    if(!isBitmap) {
         
        var backgroundColor = 0x000000;
        var backgroundAlpha = 0.1;
    
        if (prestyle.stepperBgColor)
            backgroundColor = prestyle.stepperBgColor;
    
        if (prestyle.stepperBgAlpha >= 0) {
            backgroundAlpha = prestyle.stepperBgAlpha;
        }
    
        this.lineStyle(1, 0x000000, 0.05);
        
        if (backgroundAlpha > 0) {
            this.beginFill(backgroundColor, backgroundAlpha);
            this.drawRoundedRect(0 - (width / 2), 0 - (height / 2), width, height, 6);
            this.endFill();
        }
        
        
    
        if (prestyle)
           this.style = _.merge(this.style, prestyle);
        
        var heading = that.game.add.text(0, -this.cacheHeight / 2, stepperLabel, this.style.heading);
            heading.anchor.setTo(0.5, 1);
        
            this.addChild(heading);
        
            this.label = new CustomLabel(that.game, initValue, 0, 0, width - 50, 58, false, this.style);
        
            this.addChild(this.label);
    } else {
        this.textbox = that.game.add.sprite(0,0, "mobile");
        this.textbox.frameName = "TextBox2.png";
        this.textbox.anchor.setTo(.5,.5);
        this.addChild(this.textbox);
        
        var heading = that.game.add.text(-130, 0, stepperLabel, this.style.heading);
        heading.anchor.setTo(1, .5);
        
        this.addChild(heading);
        
        this.label = new CustomLabel(that.game, initValue, 0, 0, width - 50, 58, false, this.style);
        this.addChild(this.label);
        
        
    }
    // var decr_level_button = new CustomButton(context.game, "-", 0, 0, 26, 24, bedbugGameCore.decrBetLevel);
    // var incr_level_button = new CustomButton(context.game, "+", 45, 0, 26, 24, bedbugGameCore.incrBetLevel);
    // bet_panel.add(bet_level_label);
    // bet_panel.add(decr_level_button);
    // bet_panel.add(incr_level_button);



    // var chevronLeft = bedbugGameCore.game.add.image(-(width / 2 - 40), 0, "slider_chevron_left");
    // chevronLeft.anchor.setTo(0.5, 0.5);
    // chevronLeft.scale.setTo(1, 1);
    // chevronLeft.inputEnabled = true;
    // chevronLeft.events.onInputDown.add(function(e, pointer) {
    //     if (leftCallback)
    //         leftCallback();
    // }, bedbugGameCore);

    // var chevronRight = bedbugGameCore.game.add.image((width / 2 - 40), 0, "slider_chevron_right");
    // chevronRight.anchor.setTo(0.5, 0.5);
    // chevronRight.scale.setTo(1, 1);
    // chevronRight.inputEnabled = true;
    // chevronRight.events.onInputDown.add(function(e, pointer) {
    //     if (rightCallback)
    //         rightCallback();
    // }, bedbugGameCore);

    // this.addChild(chevronRight);
    // this.addChild(chevronLeft);


    // // //adds button to game    
    game.add.existing(this);

};

ValueBox.prototype = Object.create(Phaser.Graphics.prototype);

ValueBox.prototype.constructor = ValueBox;
ValueBox.prototype.setLabel = function(label) {

    this.label.setLabel(label);
};
