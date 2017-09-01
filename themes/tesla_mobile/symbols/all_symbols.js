  /************************************************************************
   *    slot1: H2
   ************************************************************************/
  slot1 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_High_PLAY_PowerTower.png', 'Symbol_High_WIN_PowerTower.png', 'symbols', "HIGH", true, null, false, true);
    this.symbolName = "H2";
  }
  slot1.prototype = Object.create(BBSlot.prototype);
  slot1.prototype.constructor = slot1;

  /************************************************************************
   *    slot2: H1
   ************************************************************************/
  slot2 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_High_PLAY_Warning.png', 'Symbol_High_WIN_Warning.png', 'symbols', "HIGH", true, null, false, true);
    this.symbolName = "H1";
  }
  slot2.prototype = Object.create(BBSlot.prototype);
  slot2.prototype.constructor = slot2;

  /************************************************************************
   *    slot3: M3
   ************************************************************************/
  slot3 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Mid_PLAY_Heating.png', 'Symbol_Mid_WIN_Heating.png', 'symbols', "MID", true, null, false, true);
    this.symbolName = "M3";
  }
  slot3.prototype = Object.create(BBSlot.prototype);
  slot3.prototype.constructor = slot3;

  /************************************************************************
   *    slot4: M2
   ************************************************************************/
  slot4 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Mid_PLAY_LightBulb.png', 'Symbol_Mid_WIN_LightBulb.png', 'symbols', "MID", true, null, false, true);
    this.symbolName = "M2";
  }
  slot4.prototype = Object.create(BBSlot.prototype);
  slot4.prototype.constructor = slot4;

  /************************************************************************
   *    slot5: M1
   ************************************************************************/
  slot5 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Mid_PLAY_Lightning.png', 'Symbol_Mid_WIN_Lightning.png', 'symbols', "MID", true, null, false, true);
    this.symbolName = "M1";
  }
  slot5.prototype = Object.create(BBSlot.prototype);
  slot5.prototype.constructor = slot5;

  /************************************************************************
   *    slot6: L5
   ************************************************************************/
  slot6 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Low_PLAY_A.png', 'Symbol_Low_WIN_A.png', 'symbols', "LOW", true, null, false, true);
    this.symbolName = "L5";
  }
  slot6.prototype = Object.create(BBSlot.prototype);
  slot6.prototype.constructor = slot6;

  /************************************************************************
   *    slot7: L4
   ************************************************************************/
  slot7 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Low_PLAY_K.png', 'Symbol_Low_WIN_K.png', 'symbols', "LOW", true, null, false, true);
    this.symbolName = "L4";
  }
  slot7.prototype = Object.create(BBSlot.prototype);
  slot7.prototype.constructor = slot7;

  /************************************************************************
   *    slot8: L3
   ************************************************************************/
  slot8 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Low_PLAY_Q.png', 'Symbol_Low_WIN_Q.png', 'symbols', "LOW", true, null, false, true);
    this.symbolName = "L3";
  }
  slot8.prototype = Object.create(BBSlot.prototype);
  slot8.prototype.constructor = slot8;

  /************************************************************************
   *    slot9: L2
   ************************************************************************/
  slot9 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Low_PLAY_J.png', 'Symbol_Low_WIN_J.png', 'symbols', "LOW", true, null, false, true);
    this.symbolName = "L2";
  }
  slot9.prototype = Object.create(BBSlot.prototype);
  slot9.prototype.constructor = slot9;

  /************************************************************************
   *    slot10: L1
   ************************************************************************/
  slot10 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Low_PLAY_10.png', 'Symbol_Low_WIN_10.png', 'symbols', "LOW", true, null, false, true);
    this.symbolName = "L1";
  }
  slot10.prototype = Object.create(BBSlot.prototype);
  slot10.prototype.constructor = slot10;

  /************************************************************************
   *    slot11: WILD
   ************************************************************************/
  slot11 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Special_PLAY_Tesla.png', 'Symbol_Special_WIN_Tesla.png', 'symbols', "SPECIAL", true, null, false, true);
    this.symbolName = "WILD";
  }
  slot11.prototype = Object.create(BBSlot.prototype);
  slot11.prototype.constructor = slot11;

  /************************************************************************
   *    slot12: SCATTER
   *  In Scatter
   ************************************************************************/
  slot12 = function(game, positionAsName, x, y, width, height, isVisible, ReelName) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Symbol_Special_PLAY_PlasmaBall.png', 'Symbol_Special_WIN_PlasmaBall.png', 'symbols', "SPECIAL", true, null, false, true);
    this.symbolName = "SCATTER";
    var that = this;

    bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_' + ReelName, function() {
      that.actionOnClick();
    });

    bedbugEventsSystem.addListener('ON_SCATTER_WIN', function() {
      that.actionOnClick();
    });


  }
  slot12.prototype = Object.create(BBSlot.prototype);
  slot12.prototype.constructor = slot12;





  /****************************************************************
   * **  Assign Theme symbols to the Engine's Slots Array **
   * This is the pool that the engine uses to create symbols
   * from the results returned by the RGS for the game reels
   ***************************************************************/
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("H2")] = slot1;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("H1")] = slot2;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("M3")] = slot3;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("M2")] = slot4;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("M1")] = slot5;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L5")] = slot6;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L4")] = slot7;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L3")] = slot8;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L2")] = slot9;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L1")] = slot10;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("WILD")] = slot11;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("SCATTER")] = slot12;


  bedbugGameCore.game_specs.slots.scatterSymbolID = bedbugGameCore.symbolNameToID("SCATTER");
  