  slot2 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'symbolClouds.png', 'symbol_cloudy_blur.png', 'symbols', true, null, true);
  
   this.symbolName = "CLOUD";
  }

  slot2.prototype = Object.create(BBSlot.prototype);
  
  slot2.prototype.constructor = slot2;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("CLOUD")] = slot2;