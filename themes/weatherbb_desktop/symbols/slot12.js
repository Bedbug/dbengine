  slot12 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'symbolWild.png', 'symbol_wild_blur.png', 'symbols', true, null, true);
   this.symbolName = "WILD";
  }

  slot12.prototype = Object.create(BBSlot.prototype);
  
  slot12.prototype.constructor = slot11;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("WILD")] = slot12;