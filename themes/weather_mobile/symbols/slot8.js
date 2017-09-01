  slot8 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'letterQ.png', 'letter_q_blur.png', 'symbols', true, null, true);
   this.symbolName = "Q";
  }

  slot8.prototype = Object.create(BBSlot.prototype);
  
  slot8.prototype.constructor = slot8;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("Q")] = slot8;