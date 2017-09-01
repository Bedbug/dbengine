  slot9 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'letterJ.png', 'letter_j_blur.png', 'symbols', true, null, true,true);
   this.symbolName = "J";
  }

  slot9.prototype = Object.create(BBSlot.prototype);
  
  slot9.prototype.constructor = slot9;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("J")] = slot9;