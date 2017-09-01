  slot1 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName, x, y, width, height, 'symbolSun.png', 'symbol_sunny_blur.png', 'symbols', true, null, true);
   this.symbolName = "SUN";
  }

  slot1.prototype = Object.create(BBSlot.prototype); 
   
  slot1.prototype.constructor = slot1;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("SUN")] = slot1;