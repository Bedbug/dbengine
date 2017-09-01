  slot4 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height,'symbolWind.png', 'symbol_wind_blur.png', 'symbols', true, null, true);
   
   this.symbolName = "WIND";
  }

  slot4.prototype = Object.create(BBSlot.prototype);
  
  slot4.prototype.constructor = slot4;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("WIND")] = slot4;