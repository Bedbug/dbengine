  slot6 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height,'symbolA.png', 'letter_a_blur.png', 'symbols', true, null, true);
   
   this.symbolName = "A";
  }

  slot6.prototype = Object.create(BBSlot.prototype);
  
 this.actionOnClick = function() {

   //this.setToWin();
   this.WinGroup.visible = true;

   // Move the reel that won on top
   this.parent.parent.bringToTop(this.parent);

   console.log(this.parent);
   this.bringToTop(this.WinGroup);
   // console.log(this.z);
   // this.z = 100;
   // this.game.world.bringToTop(this);
   // console.log(this.z);
   // this.NormalGroup.z = 0;
   // this.BlurGroup.visible = false;
   // this.WinGroup.z = 10;

   BBSlotAnim = _.find(this.WinGroup.children, {
    "key": this.winSpritesheet
   });

   var BBSlotAnimed = BBSlotAnim.animations.play(this.winSpritesheet, 24, false);
   var animCount = 0;
   //this.BBSlotAnimed.onComplete.add(this.animationStopped(), this);
   BBSlotAnimed.onLoop.add(this.animationLooped, this);




  }
  
  slot6.prototype.constructor = slot6;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("A")] = slot6;