  /************************************************************************
   *    slot1: P4
   ************************************************************************/
  slot1 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'P4.png', 'P4', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P4";
  }
  slot1.prototype.symbolName = "P4";
  slot1.prototype = Object.create(BBSlot.prototype);
  slot1.prototype.constructor = slot1;

  /************************************************************************
   *    slot2: P3
   ************************************************************************/
  slot2 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'P3.png', 'P3', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P3";
  }
  slot2.prototype.symbolName = "P3";
  slot2.prototype = Object.create(BBSlot.prototype);
  slot2.prototype.constructor = slot2;

  /************************************************************************
   *    slot3: P2
   ************************************************************************/
  slot3 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'P2.png', 'P2', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P2";
  }
  slot3.prototype.symbolName = "P2";
  slot3.prototype = Object.create(BBSlot.prototype);
  slot3.prototype.constructor = slot3;

  /************************************************************************
   *    slot4: P1
   ************************************************************************/
  slot4 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'P1.png', 'P1', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P1";
  }
  slot4.prototype.symbolName = "P1";
  slot4.prototype = Object.create(BBSlot.prototype);
  slot4.prototype.constructor = slot4;

  /************************************************************************
   *    slot5: L4
   ************************************************************************/
  slot5 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'L2.png', 'L2', 'assets', "Low", true, null, false, true);
    this.symbolName = "L4";
  }
  slot5.prototype.symbolName = "L4";
  slot5.prototype = Object.create(BBSlot.prototype);
  slot5.prototype.constructor = slot5;

  /************************************************************************
   *    slot6: L3
   ************************************************************************/
  slot6 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'L4.png', 'L4',  "assets", "Low", true, null, false, true);
    this.symbolName = "L3";
  }
  slot6.prototype.symbolName = "L3";
  slot6.prototype = Object.create(BBSlot.prototype);
  slot6.prototype.constructor = slot6;

  /************************************************************************
   *    slot7: L2
   ************************************************************************/
  slot7 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'L3.png', 'L3', "assets", "Low", true, null, false, true);
    this.symbolName = "L2";
  }
  slot7.prototype.symbolName = "L2";
  slot7.prototype = Object.create(BBSlot.prototype);
  slot7.prototype.constructor = slot7;

  /************************************************************************
   *    slot8: L1
   ************************************************************************/
  slot8 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'L1.png', 'L1', "assets", "Low", true, null, false, true);
    this.symbolName = "L1";
  }
  slot8.prototype.symbolName = "L1";
  slot8.prototype = Object.create(BBSlot.prototype);
  slot8.prototype.constructor = slot8;

  /************************************************************************
  *    slot9: L2
  ************************************************************************/
  // slot9 = function(game, positionAsName, x, y, width, height) {
  //   BBSlot.call(this, game, positionAsName, x, y, width, height, 'L1.png', 'L1.png', 'assets', "LOW", true, null, false, true);
  //   this.symbolName = "L2";
  // }
  // slot9.prototype = Object.create(BBSlot.prototype);
  // slot9.prototype.constructor = slot9;

  /************************************************************************
  *    slot10: L1
  ************************************************************************/
  // slot10 = function(game, positionAsName, x, y, width, height) {
  //   BBSlot.call(this, game, positionAsName, x, y, width, height, 'L1.png', 'L1.png', 'assets', "LOW", true, null, false, true);
  //   this.symbolName = "L1";
  // }
  // slot10.prototype = Object.create(BBSlot.prototype);
  // slot10.prototype.constructor = slot10;

  /************************************************************************
   *    slot11: WILD
   ************************************************************************/
  slot9 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'wild_anim00001.png', 'wild', 'assets', "Wild", true, null, false, true);
    this.symbolName = "WILD";
  }
  slot9.prototype.symbolName = "WILD";
  slot9.prototype = Object.create(BBSlot.prototype);
  slot9.prototype.constructor = slot9;

  /************************************************************************
   *    slot12: SCATTER
   *  In Scatter
   ************************************************************************/
  slot10 = function(game, positionAsName, x, y, width, height, isVisible, ReelName) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'scatter_anim00001.png', 'scatter', 'assets', "Scatter", true, null, false, true);
    this.symbolName = "SCAT";
    var that = this;

    bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_' + ReelName, function() {
      that.actionOnClick();
    });

    bedbugEventsSystem.addListener('ON_SCATTER_WIN', function() {
      that.actionOnClick();
    });


  }
  slot10.prototype.symbolName = "SCAT";
  slot10.prototype = Object.create(BBSlot.prototype);
  slot10.prototype.constructor = slot10;





  /****************************************************************
   * **  Assign Theme symbols to the Engine's Slots Array **
   * This is the pool that the engine uses to create symbols
   * from the results returned by the RGS for the game reels
   ***************************************************************/
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P4")] = slot1;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P3")] = slot2;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P2")] = slot3;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P1")] = slot4;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L4")] = slot5;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L3")] = slot6;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L2")] = slot7;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L1")] = slot8;
  // bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L2")] = slot7;
  // bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L1")] = slot8;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("WILD")] = slot9;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("SCAT")] = slot10;


  bedbugGameCore.game_specs.slots.scatterSymbolID = bedbugGameCore.symbolNameToID("SCAT");
  