  slot10 = function(game, positionAsName, x, y, width, height) {
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'letterTen.png', 'letter_ten_blur.png', 'symbols', true, null, true,true);
   this.symbolName = "TEN";
  }

  slot10.prototype = Object.create(BBSlot.prototype);
  
  slot10.prototype.constructor = slot10;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("TEN")] = slot10;