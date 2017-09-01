  slot7 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height,'letterK.png', 'letter_k_blur.png', 'symbols', true, null, true);
   this.symbolName = "K";
  }

  slot7.prototype = Object.create(BBSlot.prototype);
  
  slot7.prototype.constructor = slot7;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("K")] = slot7;