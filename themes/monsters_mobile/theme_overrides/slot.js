  var BBSlot = function(game, positionAsName, x, y, width, height, normalSprite, winSprite, Spritesheet, type, isVisible, ReelName, isAtlas, hasBox) {

   Phaser.Group.call(this, game, null, positionAsName);

   // switching anchoring from bottom left to center center
   this.x = x;
   this.y = y;
   this.id = positionAsName;
   this.normalSprite = normalSprite;
   this.winSprite = winSprite;
   this.Spritesheet = Spritesheet;
   this.type = type; // Symbol, Wild, Scatter
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
   this.BlurGroup = this.game.add.group();
   this.WinGroup = this.game.add.group();

   this.NormalGroup.inputEnableChildren = true;
   this.NormalGroup.onChildInputDown.add(showSymbolInfo, this);
   this.LostGroup.inputEnableChildren = true;
   this.LostGroup.onChildInputDown.add(showSymbolInfo, this);
   this.WinGroup.inputEnableChildren = true;
   this.WinGroup.onChildInputDown.add(showSymbolInfo, this);

   function showSymbolInfo() {
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
   this.createStateBlur();
   this.createStateWin();
   this.setToNormal();

  };

  BBSlot.prototype.createStateNormal = function() {

   this.NormalGroup.name = "Normal";
   this.NormalGroup.visible = false;

   // // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha  = 1.0;
   // this.NormalGroup.add(button);
   // //--------------------------------------------------------------------------------------------


   //var symbol;

   this.FlashSymbol = this.game.add.sprite(0, 0, this.Spritesheet); // Add sprite giving the name and the Atlas
   this.FlashSymbol.frameName = this.normalSprite;
   this.FlashSymbol.anchor.setTo(0.5, 0.5);
   this.FlashSymbol.alpha = 1;
   // if (this.type == "Scatter") {
   //  this.FlashSymbol.animations.add("scatter", Phaser.Animation.generateFrameNames(this.winSprite + "_anim", 0, 12, '.png', 5), 12, true);

   // }
   // if (this.type == "Wild") {
   //  this.FlashSymbol.animations.add("wild", Phaser.Animation.generateFrameNames(this.winSprite + "_anim", 0, 12, '.png', 5), 12, true);

   // }

   this.FlashSymbol.width = this.BBSlotWidth;
   this.FlashSymbol.height = this.BBSlotHeight;
   this.NormalGroup.add(this.FlashSymbol);


   // var randRange = this.game.rnd.integerInRange(1, 4);00
   // if (randRange == 3) {
   //  //this.FlashSymbol.alpha = 0.5;
   //  var timeToTween = this.game.rnd.integerInRange(5000, 10000);
   //  var randomDrop = this.game.rnd.integerInRange(5, 13);
   //  var randomTme = this.game.rnd.integerInRange(500, 1000);
   //  //this.game.time.events.loop(timeToTween, function() {    
   //  this.game.add.tween(this.FlashSymbol).to({
   //   y: randomDrop
   //  }, randomTme, Phaser.Easing.Back.InOut, true, timeToTween, 0, true).loop(true);
   //  //}, this);
   // }

   //this.game.time.events.add(Phaser.Timer.SECOND * timeToTween, function(this) {

   this.add(this.NormalGroup);

  }

  // SPIN GROUP
  BBSlot.prototype.createStateSpin = function() {

   // this.SpinGroup.name = "Spin";
   // this.SpinGroup.visible = false;

   // // // Button for next state ---------------------------------------------------------------------
   // // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // // button.anchor.setTo(0.5, 0.5);
   // // button.alpha  = 0.0;
   // // this.SpinGroup.add(button);
   // // //--------------------------------------------------------------------------------------------

   // this.BBSlotAnim = this.game.add.sprite(0, 0, this.Spritesheet);
   // this.BBSlotAnim.anchor.setTo(0.5, 0.5);
   // this.BBSlotAnim.animations.add(this.Spritesheet);

   //  var animationName = "Screen_NOISE_";
   // //  //console.log(animationName);
   //  this.BBSlotAnim.animations.add("spin", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 5), 24, true);
   //  //this.BBSlotAnim.animations.play("spin");

   //  this.SpinGroup.add(this.BBSlotAnim);
   //  this.add(this.SpinGroup);
  }

  // APPEAR GROUP
  BBSlot.prototype.createStateAppear = function() {

   // this.AppearGroup.name = "Appear";
   // this.AppearGroup.visible = false;

   // // // Button for next state ---------------------------------------------------------------------
   // // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // // button.anchor.setTo(0.5, 0.5);
   // // button.alpha  = 0.0;
   // // this.AppearGroup.add(button);
   // // //--------------------------------------------------------------------------------------------

   // //  this.animatedSymbol;

   //  this.animatedSymbol = this.game.add.sprite(0, 0, this.Spritesheet); // Add sprite giving the name and the Atlas
   //  this.animatedSymbol.frameName = this.normalSprite;
   //  this.animatedSymbol.anchor.setTo(0.5, 0.5);
   // //  // this.animatedSymbol.width = this.BBSlotWidth;
   // //  // this.animatedSymbol.height = this.BBSlotHeight;

   // // // Mask for the animated symbol --------------------------------------------------------------
   // //  var mask = this.game.add.graphics(-50, -48);
   // //  mask.beginFill(0xffffff);
   // //  mask.drawRect(0, 0, 100, 92);
   // //  mask.anchor.setTo(0, 0);
   // //  this.animatedSymbol.mask = mask;
   // // //--------------------------------------------------------------------------------------------

   // //  this.AppearGroup.add(mask);
   // //  this.AppearGroup.add(this.animatedSymbol);

   // //  this.game.add.tween(this.animatedSymbol).from( { y: -50 }, 1000, Phaser.Easing.Back.Out, true);
   //  this.add(this.AppearGroup);
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
   this.BBSlotLost.frameName = this.winSprite + "_off.png";
   this.BBSlotLost.anchor.setTo(0.5, 0.5);
   this.BBSlotLost.alpha = 1;
   this.BBSlotLost.width = this.BBSlotWidth;
   this.BBSlotLost.height = this.BBSlotHeight;




   this.LostGroup.add(this.BBSlotLost);
   this.add(this.LostGroup);

  }

  // BLUR
  BBSlot.prototype.createStateBlur = function() {


   this.BlurGroup.name = "Blur";
   this.BlurGroup.visible = false;
   //console.log("Is Atlas Blur "+this.isAtlas);

   this.BBSlotBlur = this.game.add.sprite(0, 0, this.Spritesheet);
   this.BBSlotBlur.frameName = this.winSprite + "_Blur.png";
   this.BBSlotBlur.anchor.setTo(0.5, 0.5);
   this.BBSlotBlur.width = this.BBSlotWidth;
   this.BBSlotBlur.height = this.BBSlotHeight;
   this.BBSlotBlur.alpha = 1;
   this.BlurGroup.add(this.BBSlotBlur);


   this.add(this.BlurGroup);
  }

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
   // var spritesheet = colorDict[this.type][0]
   // var animationName = colorDict[this.type][1]

   // this.BBSlotWinAnim = this.game.add.sprite(0, 0, spritesheet);
   //  //console.log(animationName);
   //  this.BBSlotWinAnim.animations.add("win", Phaser.Animation.generateFrameNames(animationName, 0, 19, '.png', 5), 29, true);

   //  this.BBSlotWinAnim.anchor.setTo(0.5, 0.5);
   //  this.WinGroup.add(this.BBSlotWinAnim);

   //  // Button for next state ---------------------------------------------------------------------
   // var button = this.game.add.button(0, 0, this.Spritesheet, this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0.5, 0.5);
   // button.alpha  = 0.0;
   // this.WinGroup.add(button);
   // //--------------------------------------------------------------------------------------------

   // Load the reverce symbol
   // if(this.type != "Plain") {
   //  this.winSymbol = this.game.add.sprite(0, 0, this.Spritesheet);
   //  this.winSymbol.frameName = this.normalSprite;
   // } else {
   // console.log(this.type);
   this.winSymbol = this.game.add.sprite(0, 0, (this.Spritesheet));
   if (this.type == "Plain" || this.type == "Wild") {
    this.winSymbol.frameName = (this.winSprite + "_win0000.png");

   }
   else {
    this.winSymbol.frameName = (this.winSprite + "_win.png");
   }
   // }
   this.winSymbol.anchor.setTo(0.5, 0.5);

   // if (this.type == "Scatter") {
   //this.winSymbol.frameName = this.winSprite+".png";


   // }
   if (this.type == "Wild") {
    this.winSymbol.animations.add("wild", Phaser.Animation.generateFrameNames(this.winSprite + "_win", 0, 59, '.png', 4), 24, false);

   }
   else if (this.type == "Scatter") {
    // Do Nothing
   }
   else if (this.type == "Plain") {
    this.winSymbol.animations.add("win", Phaser.Animation.generateFrameNames(this.winSprite + "_win", 0, 7, '.png', 4), 14, false);
   }

   // if (this.type == "Plain") {
   //  this.winSymbol.animations.add("plain", Phaser.Animation.generateFrameNames(this.winSprite + "_anim", 1, 14, '.png', 2), 12, true);

   // }



   //this.BBSlotLost.alpha = 0.3;
   //symbol.blendMode = PIXI.blendModes.LUMINOSITY;
   this.winSymbol.width = this.BBSlotWidth;
   this.winSymbol.height = this.BBSlotHeight;
   this.WinGroup.add(this.winSymbol);


   /**
    * WinGroup
    * step 1 - add the wingroup in a specific layer above winning lines and bellow everything else 
    */
   bedbugGameCore.WinningLayerGroup.add(this.WinGroup);
  }


  BBSlot.prototype.clickCount = 1;

  BBSlot.prototype.actionOnClick = function() {
   // console.log("Doing Scatter APPear");
   // console.log(this.clickCount);

   if (this.type == "Scatter") {
    this.game.add.tween(this.FlashSymbol.scale).to({
     y: 1.05,
     x: 1.05
    }, 1000, Phaser.Easing.Elastic.InOut, true, 0, 0, true).yoyo(true);
    this.FlashSymbol.animations.play("scatter", 12, false);

   }
   if (this.type == "Wild") {
    this.game.add.tween(this.FlashSymbol.scale).to({
     y: 1.05,
     x: 1.05
    }, 1000, Phaser.Easing.Elastic.InOut, true, 0, 0, true).yoyo(true);
    this.FlashSymbol.animations.play("wild", 12, false);
   }
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
   //  this.SpinGroup.visible = false;
   //  this.AppearGroup.visible = false;
   //  this.NormalGroup.visible = false;
   //  this.LostGroup.visible = false;
   //  // this.BlurGroup.visible = false;
   //  this.WinGroup.visible = true;
   // this.scatterAppear  = this.BBSlotWinAnim.animations.play("win", 24, false);
   //   this.SpinTweenAlpha.onComplete.add(function() {
   //          this.setToNormal();
   //      }, this)
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
   this.NormalGroup.visible = true;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   this.LostGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = false;

   //this.game.tweens.removeAll(this.winSymbol.scale);
  }

  BBSlot.prototype.setToLost = function() {
   this.NormalGroup.visible = false;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   this.LostGroup.visible = true;
   this.bringToTop(this.LostGroup);
  }

  BBSlot.prototype.setToBlur = function() {
   this.NormalGroup.visible = false;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   this.LostGroup.visible = false;
   this.BlurGroup.visible = true;
   this.WinGroup.visible = false;
  }

  BBSlot.prototype.setToSpin = function() {
   // this.NormalGroup.visible = false;
   // this.SpinGroup.visible = true;
   // this.AppearGroup.visible = false;
   // this.LostGroup.visible = false;
   // this.BlurGroup.visible = false;
   // this.WinGroup.visible = false;
   // // console.log("Spin animation requested by Reel");
   // this.BBSlotAnimed = this.BBSlotAnim.animations.play("spin", 24, true);

  }

  BBSlot.prototype.setToAppear = function() {
   var that = this;
   this.NormalGroup.visible = false;
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = true;
   this.LostGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   // // DROP
   // this.symbolAppear = this.game.add.tween(this.animatedSymbol).from( { y: -200 }, 300, Phaser.Easing.Back.Out, true);
   // this.symbolAppear.onComplete.add(function(that) {
   //          if(this.animatedSymbol.frameName =="Symbol_Special_PLAY_PlasmaBall.png") {
   //             this.SpinGroup.visible = false;
   //             this.AppearGroup.visible = false;
   //             this.NormalGroup.visible = false;
   //             this.LostGroup.visible = false;
   //             this.BlurGroup.visible = false;
   //             this.WinGroup.visible = true;

   //             this.scatterAppear = this.BBSlotWinAnim.animations.play("win", 24, false);
   //             this.scatterAppear.onComplete.add(function() {
   //              this.NormalGroup.visible = false;
   //              this.SpinGroup.visible = false;
   //              this.AppearGroup.visible = true;
   //              this.LostGroup.visible = false;
   //              this.BlurGroup.visible = false;
   //              this.WinGroup.visible = false;
   //             }, this)
   //          }
   //      }, this)
   // FLEAKER
   //this.game.add.tween(this.animatedSymbol).from({ alpha: 0 }, 300, "Elastic.easeOut", true, 0, 0, false);

   //console.log(this.animatedSymbol.frameName);
  }

  // BBSlot.prototype.setToWin = function(notToTop) {
  //  if (!notToTop)
  BBSlot.prototype.setToWin = function() {
   /**
    * WinGroup
    * step 2 - move the wingroup to the slot position
    */
   this.WinGroup.x = this.worldPosition.x;
   this.WinGroup.y = this.worldPosition.y;

   /**
    * WinGroup
    * step 3 - no need to raise the whole reel now
    */
   // this.parent.parent.bringToTop(this.parent);
   this.SpinGroup.visible = false;
   this.AppearGroup.visible = false;
   this.NormalGroup.visible = false;
   this.LostGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = true;

   if (this.type == "Wild") {
    // console.log("This is a wild");
    this.winSymbol.animations.play("wild", 28, false);
   }
   else if (this.type == "Plain") {
    this.winSymbol.play("win", 14, false);
   }

   // if (this.type == "Plain") {
   //this.winSymbol.animations.add("wild", Phaser.Animation.generateFrameNames(this.winSprite+"_anim", 0, 12, '.png', 5), 12, true);

   // }

   this.game.add.tween(this.winSymbol.scale).to({
    y: 1.05,
    x: 1.05
   }, 1000, Phaser.Easing.Elastic.InOut, true, 0, 0, true).yoyo(true);
   //this.BBSlotWinAnim.animations.play("win");
  }
  