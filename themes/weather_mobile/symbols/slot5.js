  slot5 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'symbolSnow.png', 'symbol_snowy_blur.png', 'symbols', true, null, true);
   
   this.symbolName = "SNOW";
  }

  slot5.prototype = Object.create(BBSlot.prototype);
  
  slot5.prototype.constructor = slot5;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("SNOW")] = slot5;