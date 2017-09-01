  var BBSlot = function(game, positionAsName, x, y, width, height, normalSprite, winSprite, Spritesheet, type, isVisible, ReelName, isAtlas, hasBox) {

   Phaser.Group.call(this, game, null, positionAsName);

   // switching anchoring from bottom left to center center
   this.x = x;
   this.y = y;

   this.normalSprite = normalSprite;
   this.winSprite = winSprite;
   this.Spritesheet = Spritesheet;
   this.type = type;
   this.BBSlotWidth = width;
   this.BBSlotHeight = height;
   this.isVisible = isVisible;
   this.ReelName = ReelName;
   this.isAnimating = false;

   this.isAtlas = isAtlas || false;
   this.hasBox = hasBox || false;

   this.isTest = normalSprite;

   this.createStates();
   game.add.existing(this);

   this.scale.setTo(1.25, 1.25);

  };

  // Inherits the prototype of a Phaser element
  BBSlot.prototype = Object.create(Phaser.Group.prototype);

  // Replace the constructor with this one
  BBSlot.prototype.constructor = BBSlot;

  // Is this symbol visible
  BBSlot.prototype.isVisible = false;

  BBSlot.prototype.createStates = function() {

   this.NormalGroup = this.game.add.group();
   this.SpinGroup = this.game.add.group();
   this.AppearGroup = this.game.add.group();
   this.LostGroup = this.game.add.group();
   // this.BlurGroup = this.game.add.group();
   this.WinGroup = this.game.add.group();
   
   
   // this.NormalGroup.inputEnableChildren = true;
   // this.NormalGroup.onChildInputDown.add(showSymbolInfo, this);
   // this.LostGroup.inputEnableChildren = true;
   // this.LostGroup.onChildInputDown.add(showSymbolInfo, this);
   // this.WinGroup.inputEnableChildren = true;
   // this.WinGroup.onChildInputDown.add(showSymbolInfo, this);

   function showSymbolInfo() {
    console.log("click");
    bedbugGameCore.showSymbolInfo(this.symbolName, this.worldPosition);
    bedbugGameCore.game.input.onDown.add(removeSymbolInfo, this);
   }

   function removeSymbolInfo() {
    bedbugGameCore.removeSymbolInfo();
    bedbugGameCore.game.input.onDown.remove(removeSymbolInfo, this);
   }

   this.createStateNormal();
   this.createStateSpin();
   this.createStateAppear();
   this.createStateLost();
   // this.createStateBlur();
   this.createStateWin();
   this.setToNormal();
   
   var bg_graphic = this.game.add.graphics(0, 0);
   bg_graphic.beginFill(0x044a73, 0);
   bg_graphic.drawRoundedRect(0, 0, 126, 126, 6);
   bg_graphic.x = -bg_graphic.width/2;
   bg_graphic.y = -bg_graphic.height/2;
   bg_graphic.endFill();
   bg_graphic.anchor.setTo(0, 0);
   this.add(bg_graphic);
   bg_graphic.inputEnabled = true;
   bg_graphic.events.onInputDown.add(showSymbolInfo, this);
   
   
  };

  BBSlot.prototype.createStateNormal = function() {

   this.NormalGroup.name = "Normal";
   this.NormalGroup.visible = false;

   // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha = 0.0;
   // this.NormalGroup.add(button);
   //--------------------------------------------------------------------------------------------


   //var symbol;

   this.FlashSymbol = this.game.add.sprite(0, 0, this.Spritesheet); // Add sprite giving the name and the Atlas
   this.FlashSymbol.frameName = this.normalSprite;
   this.FlashSymbol.anchor.setTo(0.5, 0.5);

   // symbol.width = this.BBSlotWidth;
   // symbol.height = this.BBSlotHeight;
   this.NormalGroup.add(this.FlashSymbol);

   var randRange = this.game.rnd.integerInRange(1, 4);
   if (randRange == 3) {
    this.FlashSymbol.alpha = 0.5;
    var timeToTween = this.game.rnd.integerInRange(5000, 10000);
    //this.game.time.events.loop(timeToTween, function() {    
    this.game.add.tween(this.FlashSymbol).from({
     alpha: 1
    }, 300, "Elastic.easeIn", true, timeToTween, 0, true).loop(true);
    //}, this);
   }
   else {
    this.FlashSymbol.alpha = 1;
   }

   //this.game.time.events.add(Phaser.Timer.SECOND * timeToTween, function(this) {

   this.add(this.NormalGroup);

  }

  // SPIN GROUP
  BBSlot.prototype.createStateSpin = function() {

   this.SpinGroup.name = "Spin";
   this.SpinGroup.visible = false;

   // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha = 0.0;
   // this.SpinGroup.add(button);
   //--------------------------------------------------------------------------------------------

   this.BBSlotAnim = this.game.add.sprite(0, 0, this.Spritesheet);
   this.BBSlotAnim.anchor.setTo(0.5, 0.5);
   this.BBSlotAnim.animations.add(this.Spritesheet);

   var animationName = "Screen_NOISE_";
   //  //console.log(animationName);
   this.BBSlotAnim.animations.add("spin", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 5), 24, true);
   //this.BBSlotAnim.animations.play("spin");

   this.SpinGroup.add(this.BBSlotAnim);
   this.add(this.SpinGroup);
  }

  // APPEAR GROUP
  BBSlot.prototype.createStateAppear = function() {

   this.AppearGroup.name = "Appear";
   this.AppearGroup.visible = false;

   // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha = 0.0;
   // this.AppearGroup.add(button);
   //--------------------------------------------------------------------------------------------

   this.animatedSymbol;

   this.animatedSymbol = this.game.add.sprite(0, 0, this.Spritesheet); // Add sprite giving the name and the Atlas
   this.animatedSymbol.frameName = this.normalSprite;
   this.animatedSymbol.anchor.setTo(0.5, 0.5);
   // this.animatedSymbol.width = this.BBSlotWidth;
   // this.animatedSymbol.height = this.BBSlotHeight;

   // Mask for the animated symbol --------------------------------------------------------------
   var mask = this.game.add.graphics(-50, -48);
   mask.beginFill(0xffffff);
   mask.drawRect(0, 0, 100, 92);
   mask.anchor.setTo(0, 0);
   this.animatedSymbol.mask = mask;
   //--------------------------------------------------------------------------------------------

   this.AppearGroup.add(mask);
   this.AppearGroup.add(this.animatedSymbol);

   this.game.add.tween(this.animatedSymbol).from({
    y: -50
   }, 1000, Phaser.Easing.Back.Out, true);
   this.add(this.AppearGroup);
  }

  // LOST
  BBSlot.prototype.createStateLost = function() {

   this.LostGroup.name = "Lost";
   this.LostGroup.visible = false;


   this.SpinGroup.name = "Spin";
   this.SpinGroup.visible = false;

   // // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha  = 0.0;
   // this.lOSTGroup.add(button);
   // //--------------------------------------------------------------------------------------------

   this.BBSlotLost = this.game.add.sprite(0, 0, this.Spritesheet);
   this.BBSlotLost.frameName = this.winSprite;
   this.BBSlotLost.anchor.setTo(0.5, 0.5);
   this.BBSlotLost.alpha = 0.3;
   //this.BBSlotLost.animations.add(this.Spritesheet);

   //  var animationName = "Screen_NOISE_";
   // //  //console.log(animationName);
   //  this.BBSlotLost.animations.add("spin", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 5), 24, true);
   //  this.BBSlotAnim.animations.play("spin");

   this.LostGroup.add(this.BBSlotLost);
   this.add(this.LostGroup);

  }

  // BLUR
  // BBSlot.prototype.createStateBlur = function() {


  //  this.BlurGroup.name = "Blur";
  //  this.BlurGroup.visible = false;
  //  //console.log("Is Atlas Blur "+this.isAtlas);


  //  if (this.isAtlas === true) {
  //   var gameobject;
  //   gameobject = this.game.add.sprite(0, 0, this.Spritesheet, this.blurSprite);
  //   gameobject.anchor.setTo(0, 1);
  //   gameobject.width = this.BBSlotWidth;
  //   gameobject.height = this.BBSlotHeight;
  //   this.BlurGroup.add(gameobject);

  //  }
  //  else {
  //   var gameobject;
  //   gameobject = this.game.add.sprite(0, 0, this.blurSprite);
  //   gameobject.anchor.setTo(0, 1);
  //   gameobject.width = this.BBSlotWidth;
  //   gameobject.height = this.BBSlotHeight;
  //   this.BlurGroup.add(gameobject);
  //  }

  //  this.add(this.BlurGroup);
  // }

  //var BBSlotK;
  //var BBSlotAnim;

  // WIN
  var colorDict = {
   LOW: ["symbols", "Screen_LOW_WIN_"],
   MID: ["symbols", "Screen_MID_WIN_"],
   HIGH: ["symbols2", "Screen_HIGH_WIN_"],
   SPECIAL: ["symbols2", "Screen_SPECIAL_WIN_"],

  }
  BBSlot.prototype.createStateWin = function() {

   this.WinGroup.name = "Win";
   this.WinGroup.visible = false;


   // Create BG animation and tint it
   var spritesheet = colorDict[this.type][0]
   var animationName = colorDict[this.type][1]

   this.BBSlotWinAnim = this.game.add.sprite(0, 0, spritesheet);
   //console.log(animationName);
   this.BBSlotWinAnim.animations.add("win", Phaser.Animation.generateFrameNames(animationName, 0, 19, '.png', 5), 29, true);


   this.BBSlotWinAnim.anchor.setTo(0.5, 0.5);
   this.WinGroup.add(this.BBSlotWinAnim);

   // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha = 0.0;
   // this.WinGroup.add(button);
   //--------------------------------------------------------------------------------------------

   // Load the reverce symbol
   var symbol;

   symbol = this.game.add.sprite(0, 0, this.Spritesheet); // Add sprite giving the name and the Atlas
   symbol.frameName = this.winSprite;
   symbol.anchor.setTo(0.5, 0.5);
   symbol.alpha = 0.3;
   //symbol.blendMode = PIXI.blendModes.LUMINOSITY;
   // symbol.width = this.BBSlotWidth;
   // symbol.height = this.BBSlotHeight;
   this.WinGroup.add(symbol);


   this.add(this.WinGroup);
  }


  BBSlot.prototype.clickCount = 1;

  BBSlot.prototype.actionOnClick = function() {
   // console.log("Doing Action!!!!!!!!!!!!!!!!!!!!!!!!!");
   // console.log(this.clickCount);

   // if(this.clickCount == 0) {
   //  this.setToNormal();
   //  this.clickCount++;

   // }else if(this.clickCount == 1) {
   //  // this.SpinGroup.visible = true;
   //  // this.bringToTop(this.SpinGroup);
   //  this.setToSpin();
   //  // this.BBSlotAnim.animations.play("spin", 24, true);

   //  this.clickCount++;

   // }else if(this.clickCount == 2) {
   //  this.setToAppear();
   //  this.clickCount++;

   // }else if(this.clickCount == 3) {
   //  console.log("Click count is 3");
   //  this.setToWin();
   //  this.clickCount = 0;
   // }
  }


  // Turn back to Static Frame
  BBSlot.prototype.animationStopped = function() {

   console.log(this.animCount);
   if (this.animCount < 1) {
    this.BBSlotAnimed.play();
    this.animCount++;
   }
   else {
    this.setToNormal();
   }

  }

  BBSlot.prototype.animationLooped = function(sprite, animation) {

   if (animation.loopCount === 1) {
    //loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
   }
   else {
    this.setToNormal();
    animation.loop = false;
   }

  }

  BBSlot.prototype.setToNormal = function() {
   var that = this;
   this.NormalGroup.visible = true;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   this.LostGroup.visible = false;
   // this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   //console.log(this.FlashSymbol);




   // setTimeout(function(that) {
   //          console.log(that.FlashSymbol);
   //          //this.game.add.tween( this.FlashSymbol).from({ alpha: 0 }, 300, "Elastic.easeOut", true, 0, 0, false);
   //      }, this.game.rnd.integerInRange(1000, 1000));

   //game.rnd.integerInRange(100, 200)

  }

  BBSlot.prototype.setToLost = function() {
   this.NormalGroup.visible = false;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   // this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   this.LostGroup.visible = true;
   // this.bringToTop(this.LostGroup);
  }

  // BBSlot.prototype.setToBlur = function() {
  //  this.NormalGroup.visible = false;
  //  this.SpinGroup.visible = false;
  //  this.AppearGroup.visible = false;
  //  // this.LostGroup.visible = false;
  //  // this.BlurGroup.visible = true;
  //  this.WinGroup.visible = false;
  // }

  BBSlot.prototype.setToSpin = function() {
   this.NormalGroup.visible = false;
   this.SpinGroup.visible = true;
   this.AppearGroup.visible = false;
   this.LostGroup.visible = false;
   // this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   // console.log("Spin animation requested by Reel");
   this.BBSlotAnimed = this.BBSlotAnim.animations.play("spin", 24, true);

  }

  BBSlot.prototype.setToAppear = function() {
   this.NormalGroup.visible = false;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = true;
   this.LostGroup.visible = false;
   // this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   // DROP
   this.symbolAppear = this.game.add.tween(this.animatedSymbol).from({
    y: -200
   }, 300, Phaser.Easing.Back.Out, true);
   this.symbolAppear.onComplete.add(function(that) {
     if (this.animatedSymbol.frameName == "Symbol_Special_PLAY_PlasmaBall.png") {
      this.SpinGroup.visible = false;
      this.AppearGroup.visible = false;
      this.NormalGroup.visible = false;
      this.LostGroup.visible = false;
      // this.BlurGroup.visible = false;
      this.WinGroup.visible = true;

      this.scatterAppear = this.BBSlotWinAnim.animations.play("win", 40, false);
      this.scatterAppear.onComplete.add(function() {
       if (!this.LostGroup.visible) {
        this.AppearGroup.visible = true;
        this.WinGroup.visible = false;
       }
       // this.NormalGroup.visible = false;
       // this.SpinGroup.visible = false;
       // this.AppearGroup.visible = true;
       // this.LostGroup.visible = false;
       // // this.BlurGroup.visible = false;
       // this.WinGroup.visible = false;
      }, this)
     }
    }, this)
    // FLEAKER
    //this.game.add.tween(this.animatedSymbol).from({ alpha: 0 }, 300, "Elastic.easeOut", true, 0, 0, false);

   //console.log(this.animatedSymbol.frameName);
  }

  // BBSlot.prototype.setToWin = function(notToTop) {
  //  if (!notToTop)
  BBSlot.prototype.setToWin = function() {
   this.parent.parent.bringToTop(this.parent);
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   this.NormalGroup.visible = false;
   this.LostGroup.visible = false;
   // this.BlurGroup.visible = false;
   this.WinGroup.visible = true;

   this.BBSlotWinAnim.animations.play("win");
  }
  