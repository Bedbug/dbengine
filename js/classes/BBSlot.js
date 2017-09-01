  var BBSlot = function(game, positionAsName, x, y, width, height, normalSprite, blurSprite, Spritesheet, isVisible, ReelName, isAtlas, hasBox) {

   Phaser.Group.call(this, game, null, positionAsName);


   // console.log("Slot created: "+ normalSprite);
   this.x = x;
   this.y = y;

   this.normalSprite = normalSprite;
   this.blurSprite = blurSprite;
   this.Spritesheet = Spritesheet;
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
   this.createStateLost();
   this.createStateBlur();
   this.createStateWin();
   this.setToNormal();

  };

  BBSlot.prototype.createStateNormal = function() {


   this.NormalGroup.name = "Normal";
   this.NormalGroup.visible = false;


   // BBSlot Sprite 
   // var BBSlotK = this.game.add.sprite(0, 0, 'letterK', this.actionOnClick, this, 2, 1, 0);
   // BBSlotK.anchor.setTo(0, 1);
   // BBSlotK.width = this.BBSlotWidth;
   // BBSlotK.height = this.BBSlotHeight;
   // this.NormalGroup.add(BBSlotK);
   var gameobject;

   //console.log(this.isAtlas);

   if (this.isAtlas === true) {

    var gameobject;
    //gameobject = this.game.add.sprite(0, 0, 'symbols', 'symbolSun_00000');
    gameobject = this.game.add.sprite(0, 0, this.Spritesheet, this.normalSprite); // Add sprite giving the name and the Atlas
    gameobject.anchor.setTo(0.5, 0.5);
    gameobject.width = this.BBSlotWidth;
    gameobject.height = this.BBSlotHeight;
    this.NormalGroup.add(gameobject);

   }
   else {

    if (this.normalSprite) {
     var gameobject;
     gameobject = this.game.add.sprite(0, 0, this.normalSprite);
     // gameobject = this.game.add.sprite(0, 0, 'letterA');
     gameobject.anchor.setTo(0.5, 0.5);
     gameobject.width = this.BBSlotWidth;
     gameobject.height = this.BBSlotHeight;
     this.NormalGroup.add(gameobject);
    }
    else {
     gameobject = this.game.add.graphics(0, 0);
     gameobject.lineStyle(2, 0xFFFFFF, 0.2);
     gameobject.beginFill(0x106ff4, 0.4);
     gameobject.drawRoundedRect(5, -this.BBSlotHeight + 5, this.BBSlotWidth - 10, this.BBSlotHeight - 10, 6);
     gameobject.endFill();


     this.NormalGroup.add(gameobject);

    }
   }

   // var button = this.game.add.button(0, 0, 'letterK', this.actionOnClick, this, 2, 1, 0);
   // button.anchor.setTo(0, 1);
   // button.width = this.BBSlotWidth;
   // button.height = this.BBSlotHeight;
   // this.NormalGroup.add(button);


   this.add(this.NormalGroup);
  }

  BBSlot.prototype.createStateLost = function() {

   this.LostGroup.name = "Lost";
   this.LostGroup.visible = false;


   // var bg_graphic = this.game.add.graphics(0, 0);
   // bg_graphic.beginFill(0x044a73, 0.5);
   // bg_graphic.drawRoundedRect(2, -(this.BBSlotHeight - 2), this.BBSlotWidth - 4, this.BBSlotHeight - 4, 6);
   // bg_graphic.endFill();
   // this.LostGroup.add(bg_graphic);


   var gameobject;
   if (this.isAtlas === true) {
    var gameobject;
    gameobject = this.game.add.sprite(0, 0, this.Spritesheet, this.normalSprite); // Add sprite giving the name and the Atlas
    gameobject.anchor.setTo(0.5, 0.5);
    gameobject.width = this.BBSlotWidth;
    gameobject.height = this.BBSlotHeight;
    gameobject.alpha = 0.4;
    this.LostGroup.add(gameobject);

   }
   else {
    if (this.normalSprite) {
     var gameobject;
     gameobject = this.game.add.sprite(0, 0, this.normalSprite);
     gameobject.anchor.setTo(0.5, 0.5);
     gameobject.width = this.BBSlotWidth;
     gameobject.height = this.BBSlotHeight;
     gameobject.alpha = 0.4;
     this.LostGroup.add(gameobject);
    }
   }

   this.add(this.LostGroup);

  }

  BBSlot.prototype.createStateBlur = function() {


   this.BlurGroup.name = "Blur";
   this.BlurGroup.visible = false;
   //console.log("Is Atlas Blur "+this.isAtlas);


   if (this.isAtlas === true) {
    var gameobject;
    gameobject = this.game.add.sprite(0, 0, this.Spritesheet, this.blurSprite);
    gameobject.anchor.setTo(0.5, 0.5);
    gameobject.width = this.BBSlotWidth;
    gameobject.height = this.BBSlotHeight;
    this.BlurGroup.add(gameobject);

   }
   else {
    var gameobject;
    gameobject = this.game.add.sprite(0, 0, this.blurSprite);
    gameobject.anchor.setTo(0.5, 0.5);
    gameobject.width = this.BBSlotWidth;
    gameobject.height = this.BBSlotHeight;
    this.BlurGroup.add(gameobject);
   }

   this.add(this.BlurGroup);
  }

  //var BBSlotK;
  //var BBSlotAnim;
  BBSlot.prototype.createStateWin = function() {


   this.WinGroup.name = "Win";
   this.WinGroup.visible = false;

   if (this.isAtlas === true) {
    this.BBSlotAnim = this.game.add.sprite(0, 0, this.Spritesheet);
    //this.BBSlotAnim.animations.add(this.Spritesheet);

    var animationName = this.normalSprite.slice(0, -4) + "_";
    //console.log(animationName);
    this.BBSlotAnim.animations.add("win", Phaser.Animation.generateFrameNames(animationName, 0, 19, '.png', 5), 24, true);
    this.BBSlotAnim.animations.play("win");

    this.BBSlotAnim.anchor.setTo(0.5, 0.5);
    this.BBSlotAnim.width = this.BBSlotWidth;
    this.BBSlotAnim.height = this.BBSlotHeight;
    this.WinGroup.add(this.BBSlotAnim);

    //if(this.hasBox === true ) {

    this.slotBox = this.game.add.sprite(-3, 3, "extras2", "boxAnim_00000.png");
    //this.BBSlotAnim.animations.add(this.Spritesheet);

    //var animationName =  this.normalSprite.slice(0, -4)+"_";
    //console.log(animationName);
    this.slotBox.animations.add("boxAnim", Phaser.Animation.generateFrameNames("boxAnim_", 0, 16, '.png', 5), 16, true);
    this.slotBox.animations.play("boxAnim");

    this.slotBox.anchor.setTo(0.5, 0.5);
    this.slotBox.width = this.BBSlotWidth + 6;
    this.slotBox.height = this.BBSlotHeight + 6;
    this.WinGroup.add(this.slotBox);
    // }
    //   // sprite
    //  this.BBSlotAnim = this.game.add.sprite(0, 0, 'symbols', 'symbolWind_00');


    // // animation
    // this.BBSlotAnim.animations.add('walk', Phaser.Animation.generateFrameNames('symbolWind', 1, 8, '', 5), 10, true, false);
    // this.BBSlotAnim.animations.play('walk');


    // var BBSlotAnim = this.BBSlotK.animations.play("letter_k_win", 12);
    //  BBSlotAnim.onComplete.add(animationStopped, this);



   }
   else {

    if (this.normalSprite) {
     // BBSlot Sprite 
     this.BBSlotAnim = this.game.add.sprite(0, 0, this.Spritesheet);
     this.BBSlotAnim.animations.add(this.Spritesheet);
     // var BBSlotAnim = this.BBSlotK.animations.play("letter_k_win", 12);
     //  BBSlotAnim.onComplete.add(animationStopped, this);

     this.BBSlotAnim.anchor.setTo(0.5, 0.5);
     this.BBSlotAnim.width = this.BBSlotWidth;
     this.BBSlotAnim.height = this.BBSlotHeight;
     this.WinGroup.add(this.BBSlotAnim);
    }
   }
   this.add(this.WinGroup);
  }

  BBSlot.prototype.actionOnClick = function() {

   //this.setToWin();
   this.WinGroup.visible = true;

   // Move the reel that won on top
   this.parent.parent.bringToTop(this.parent);
   this.bringToTop(this.WinGroup);

   if (this.isAtlas === true) {

    this.BBSlotAnim.animations.play("win");
    //var BBSlotAnimed = BBSlotAnim.animations.play(this.Spritesheet, 16, false);
   }
   else {

    BBSlotAnim = _.find(this.WinGroup.children, {
     "key": this.Spritesheet
    });

    var BBSlotAnimed = BBSlotAnim.animations.play(this.Spritesheet, 16, false);
    var animCount = 0;
    //this.BBSlotAnimed.onComplete.add(this.animationStopped, this);
    //BBSlotAnimed.onLoop.add(this.animationLooped, this);
    BBSlotAnimed.onComplete.add(this.animationLooped, this);
   }

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
   this.LostGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = false;

   //
   // this.bringToTop(this.NormalGroup);
   // this.NormalGroup.z = 10;
   // this.BlurGroup.visible = false;
   // this.WinGroup.z = 0;

   //this.z = 1;
  }

  BBSlot.prototype.setToLost = function() {
   this.NormalGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = false;
   this.LostGroup.visible = true;
   // this.bringToTop(this.LostGroup);
  }

  BBSlot.prototype.setToBlur = function() {
   this.NormalGroup.visible = false;
   this.LostGroup.visible = false;
   this.BlurGroup.visible = true;
   this.WinGroup.visible = false;
  }

  BBSlot.prototype.setToWin = function(notToTop) {
   if (!notToTop)
    this.parent.parent.bringToTop(this.parent);
   this.NormalGroup.visible = false;
   this.LostGroup.visible = false;
   this.BlurGroup.visible = false;
   this.WinGroup.visible = true;



   // Play The sprite animation
   // this.BBSlotAnimed = this.BBSlotAnim.animations.play('letter_k_win', 35);
   // this.animCount = 0;
   // this.BBSlotAnimed.onComplete.add(this.animationStopped, this);

   // Play The sprite animation by looping
   if (this.isAtlas === true) {
    this.BBSlotAnimed = this.BBSlotAnim.animations.play("win", 20, false);
   }
   else {
    this.BBSlotAnimed = this.BBSlotAnim.animations.play(this.Spritesheet, 18, false);

   }
   // this.BBSlotAnimed.onLoop.add(this.animationLooped, this);
   this.BBSlotAnimed.onComplete.add(this.animationLooped, this);
  }
  