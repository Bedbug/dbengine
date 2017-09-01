  slot3 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'symbolStorm.png', 'symbol_stormy_blur.png', 'symbols', true, null, true);
    
   this.symbolName = "STORM";
  }

  slot3.prototype = Object.create(BBSlot.prototype);
  
  slot3.prototype.constructor = slot3;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("RAIN")] = slot3;