var StepperSmall = function(game, stepperLabel, initValue, leftCallback, rightCallback, x, y, width, height, isDraggable, prestyle, isAtlas, spritesheet, spritebox, spritearrow, notDisabled, arrowScale) {
    Phaser.Graphics.call(this, game, x, y);

    var that = this;
    this.cacheX = x;
    this.cacheY = y;
    this.cacheWidth = width;
    this.cacheHeight = height;
    this.isAtlas = isAtlas;
    this.spritesheet = spritesheet;
    this.spritebox = spritebox;
    this.spritearrow = spritearrow;
    this.notDisabled = notDisabled;
    this.arrowScale = arrowScale;
    // console.log("-------------------------------------------------------------------------------------");
    // console.log(this.isAtlas);
    
     var style = {
        font: "14px Arial",
        fill: "#fff",
        align: "center",
        heading:{
        font: "bold 30px Arial",
        fill: "#000",
        backgroundAlpha: "0.0"
        },
        stepper:{
            bgColor: 0x00000,
            bgAlpha: 0.0
        }
    };

    if (prestyle)
        style = _.merge(style, prestyle);
    

    this.lineStyle(1, 0x000000, 0.05);
    
    this.decimals = 2;
    
    if (style.stepper.bgAlpha > 0) {
        this.beginFill(style.stepper.bgColor, style.stepper.bgAlpha);
        this.drawRoundedRect(0 , 0 , width, height, 6);
        this.endFill();
    }
    //  Input Enable the sprites
    // this.inputEnabled = true;
    // //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    // this.events.onInputDown.add(function(btn) {
    //     game.testPlacement = that;
    //     btn.parent.bringToTop(btn);
    // }, this);
    // this.input.enableDrag(isDraggable);
    // this.input.dragFromCenter = false;

   

    // HEADING
    // var heading = that.game.add.text(0, -this.cacheHeight / 2, stepperLabel, style.heading);
    // heading.anchor.setTo(0.5, 1);

    // this.addChild(heading);
    
    if(this.isAtlas){
        var headingBitmap = that.game.add.text(0,-this.cacheHeight / 2, stepperLabel, {
            font: "30px Arial",
            fill: "#ffffff"
        });
        headingBitmap.anchor.setTo(0.5, 1);
        this.addChild(headingBitmap);
        
        // this.textbox = that.game.add.sprite(0,0, "mobile");
        // this.textbox.frameName = "TextBox2.png";
        
        this.textbox = that.game.add.sprite(0,0, this.spritesheet);
        this.textbox.frameName = this.spritebox;
        
        this.textbox.anchor.setTo(.5,.5);
        //this.textbox.scale.setTo(.35,.35);
        this.addChild(this.textbox);
    } else {
        var heading = that.game.add.text(0, -this.cacheHeight / 2, stepperLabel, style.heading);
        heading.anchor.setTo(0.5, 1);
    
        this.addChild(heading);
    }

    this.label = new CustomLabel(that.game, initValue, 0, 0, 89, 58, false, style);

    this.addChild(this.label);

    // var decr_level_button = new CustomButton(context.game, "-", 0, 0, 26, 24, bedbugGameCore.decrBetLevel);
    // var incr_level_button = new CustomButton(context.game, "+", 45, 0, 26, 24, bedbugGameCore.incrBetLevel);
    // bet_panel.add(bet_level_label);
    // bet_panel.add(decr_level_button);
    // bet_panel.add(incr_level_button);
    this.leftCallback = leftCallback;
    this.rightCallback = rightCallback;
    
    if(!isAtlas || isAtlas == null) {
        this.chevronLeft = bedbugGameCore.game.add.image(-(width / 2 ), 0, "slider_chevron_left");
        this.chevronLeft.anchor.setTo(0.5, 0.5);
        
        if( this.arrowScale == null ){
            this.chevronLeft.scale.setTo(.35,.35);
            // console.log("Scale is .35")
        }else{
            this.chevronLeft.scale.setTo(this.arrowScale);
            // console.log("Scale is:", this.arrowScale)
        }
        
        this.chevronLeft.inputEnabled = true;
        this.chevronLeft.events.onInputDown.add(function(e, pointer) {
            if (leftCallback)
                leftCallback();
        }, bedbugGameCore);
    
        this.chevronRight = bedbugGameCore.game.add.image((width / 2 ), 0, "slider_chevron_right");
        this.chevronRight.anchor.setTo(0.5, 0.5);
       
        if( this.arrowScale == null )
        this.chevronRight.scale.setTo(.35,.35);
        else
        this.chevronLeft.scale.setTo(this.arrowScale);
        
        this.chevronRight.inputEnabled = true;
        this.chevronRight.events.onInputDown.add(function(e, pointer) {
            if (rightCallback)
                rightCallback();
        }, bedbugGameCore);
    } else {
        // this.chevronLeft = bedbugGameCore.game.add.button(-170 ,0, 'mobile', this.leftCallback, this, 'arrow---pressed.png', 'arrow---pressed.png', 'arrow---active.png');
        // this.chevronLeft.anchor.setTo(0.5, 0.5);
        // this.chevronLeftinActive = bedbugGameCore.game.add.sprite(-170 ,0, 'mobile');
        // this.chevronLeftinActive.frameName = 'arrow---inactive.png';
        // this.chevronLeftinActive.anchor.setTo(0.5, 0.5);
        // this.chevronLeftinActive.visible = false;
        
        // this.chevronRight = bedbugGameCore.game.add.button( 170 ,0, 'mobile', this.rightCallback, this, 'arrow-+-pressed.png', 'arrow-+-pressed.png', 'arrow-+-active.png');
        // this.chevronRight.anchor.setTo(0.5, 0.5);
        // this.chevronRightinActive = bedbugGameCore.game.add.sprite( 170 ,0, 'mobile');
        // this.chevronRightinActive.frameName = 'arrow-+-inactive.png';
        // this.chevronRightinActive.anchor.setTo(0.5, 0.5);
        // this.chevronRightinActive.visible = false;
        
        this.chevronLeft = bedbugGameCore.game.add.button((width / 2)-70 ,0, this.spritesheet, this.leftCallback, this, this.spritearrow+'---over.png', this.spritearrow+'---active.png', this.spritearrow+'---pressed.png', this.spritearrow+'---active.png');
        this.chevronLeft.anchor.setTo(0.5, 0.5);
         if( this.arrowScale == null ){
            this.chevronLeft.scale.setTo(.35,.35);
            // console.log("Scale is .35")
        }else{
            this.chevronLeft.scale.setTo(this.arrowScale);
            // console.log("Scale is:", this.arrowScale)
        }
        this.chevronLeftinActive = bedbugGameCore.game.add.sprite((width / 2)-170 ,0, this.spritesheet);
        this.chevronLeftinActive.frameName = this.spritearrow+'---inactive.png';
        this.chevronLeftinActive.anchor.setTo(0.5, 0.5);
        this.chevronLeftinActive.visible = false;
        
        this.chevronRight = bedbugGameCore.game.add.button((width / 2)+20 ,0, this.spritesheet, this.rightCallback, this, this.spritearrow+'-+-over.png', this.spritearrow+'-+-active.png', this.spritearrow+'-+-pressed.png', this.spritearrow+'-+-active.png');
        this.chevronRight.anchor.setTo(0.5, 0.5);
        if( this.arrowScale == null )
        this.chevronRight.scale.setTo(.35,.35);
        else
        this.chevronLeft.scale.setTo(this.arrowScale);
        this.chevronRightinActive = bedbugGameCore.game.add.sprite((width / 2)+ 120 ,0, this.spritesheet);
        this.chevronRightinActive.frameName = this.spritearrow+'-+-inactive.png';
        this.chevronRightinActive.anchor.setTo(0.5, 0.5);
        this.chevronRightinActive.visible = false;
        
    }
    
    this.leftCallback = leftCallback;
    
    this.addChild(this.chevronRight);
    this.addChild(this.chevronLeft);
    
    if(isAtlas){
        this.addChild(this.chevronLeftinActive);
        this.addChild(this.chevronRightinActive);
    }


    // // //adds button to game    
    game.add.existing(this);

};

StepperSmall.prototype = Object.create(Phaser.Graphics.prototype);

StepperSmall.prototype.constructor = StepperSmall;
StepperSmall.prototype.setLabel = function(label, leftDisabled, rightDisabled) {
    this.label.setLabel(label);

//   var t = Math.pow(label, this.decimals);   
//   var p = (Math.round((label * t) + (this.decimals>0?1:0)*(Math.sign(label) * (10 / Math.pow(100, this.decimals)))) / t).toFixed(this.decimals);

    
    if(!this.notDisabled) {
        if(leftDisabled){
            if(this.isAtlas) {
                this.chevronLeft.visible = false;
                this.chevronLeftinActive.visible = true;
            }else{
                this.chevronLeft.alpha = 0.4;
                this.chevronLeft.inputEnabled = false;
            }
        }else if(rightDisabled){
            if(this.isAtlas) {
                this.chevronRight.visible = false;
                this.chevronRightinActive.visible = true;
            }else{
                this.chevronRight.alpha = 0.4;
                this.chevronRight.inputEnabled = false;
            }
        }else{
            if(this.isAtlas) {
                this.chevronLeft.visible = true;
                this.chevronRight.visible = true;
                this.chevronRightinActive.visible = false;
                this.chevronLeftinActive.visible = false;
            }else{
                this.chevronLeft.alpha = 1;
                this.chevronLeft.inputEnabled = true;
                this.chevronRight.alpha = 1;
                this.chevronRight.inputEnabled = true;
            }
        }
    } else {
        this.chevronLeft.alpha = 1;
        this.chevronLeft.inputEnabled = true;
        this.chevronRight.alpha = 1;
        this.chevronRight.inputEnabled = true;
    }
};


