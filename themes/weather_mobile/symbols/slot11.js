  slot11 = function(game, positionAsName, x, y, width, height, isVisible, ReelName) {
   // BBSlot.call(this, game, positionAsName,x ,y, width, height, '', '', '', isVisible, ReelName);
   BBSlot.call(this, game, positionAsName,x ,y, width, height, 'symbolScatter.png', 'Symbol_tornado_blur.png', 'symbols', true, null, true);
   this.symbolName = "SCATTER";
   var that = this;
   
  if(isVisible){
   bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_'+ReelName, function(){
    // console.log("ON_SCATTER_APPEAR_");
       that.actionOnClick();
   });
   
   bedbugEventsSystem.addListener('ON_SCATTER_WIN', function(){
       that.actionOnClick();
   });
  }
  }
  

  slot11.prototype = Object.create(BBSlot.prototype);
  
  slot11.prototype.constructor = slot11;

  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("SCATTER")] = slot11;
  
  bedbugGameCore.game_specs.slots.scatterSymbolID = bedbugGameCore.symbolNameToID("SCATTER");