  /************************************************************************
   *    slot1: P4
   ************************************************************************/
  slot1 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Wolfie_Normal.png', 'Wolfie', 'assets', "Plain", true, null, false, true);
     this.symbolName = "P5";
  }
  slot1.prototype.symbolName = "P5";
  slot1.prototype = Object.create(BBSlot.prototype);
  slot1.prototype.constructor = slot1;

  /************************************************************************
   *    slot2: P3
   ************************************************************************/
  slot2 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Frank_Normal.png', 'Frank', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P4";
  }
  slot2.prototype.symbolName = "P4";
  slot2.prototype = Object.create(BBSlot.prototype);
  slot2.prototype.constructor = slot2;

  /************************************************************************
   *    slot3: P2
   ************************************************************************/
  slot3 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Nosfy_Normal.png', 'Nosfy', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P3";
  }
  slot3.prototype.symbolName = "P3";
  slot3.prototype = Object.create(BBSlot.prototype);
  slot3.prototype.constructor = slot3;

  /************************************************************************
   *    slot4: P1
   ************************************************************************/
  slot4 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Invi_Normal.png', 'Invi', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P2";
  }
  slot4.prototype.symbolName = "P2";
  slot4.prototype = Object.create(BBSlot.prototype);
  slot4.prototype.constructor = slot4;

  /************************************************************************
   *    slot5: L4
   ************************************************************************/
  slot5 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Witch_Normal.png', 'Witch', 'assets', "Plain", true, null, false, true);
    this.symbolName = "P1";
  }
  slot5.prototype.symbolName = "P1";
  slot5.prototype = Object.create(BBSlot.prototype);
  slot5.prototype.constructor = slot5;

  /************************************************************************
   *    slot6: L5
   ************************************************************************/
  slot6 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'A_Normal.png', 'A',  "assets", "Low", true, null, false, true);
    this.symbolName = "L5";
  }
  slot6.prototype.symbolName = "L5";
  slot6.prototype = Object.create(BBSlot.prototype);
  slot6.prototype.constructor = slot6;

  /************************************************************************
   *    slot7: L4
   ************************************************************************/
  slot7 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'K_Normal.png', 'K', "assets", "Low", true, null, false, true);
    this.symbolName = "L4";
  }
  slot7.prototype.symbolName = "L4";
  slot7.prototype = Object.create(BBSlot.prototype);
  slot7.prototype.constructor = slot7;

  /************************************************************************
   *    slot8: L3
   ************************************************************************/
  slot8 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Q_Normal.png', 'Q', "assets", "Low", true, null, false, true);
    this.symbolName = "L3";
  }
  slot8.prototype.symbolName = "L3";
  slot8.prototype = Object.create(BBSlot.prototype);
  slot8.prototype.constructor = slot8;

  /************************************************************************
  *    slot9: L2
  ************************************************************************/
  slot9 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'J_Normal.png', 'J', "assets", "Low", true, null, false, true);
    this.symbolName = "L2";
  }
  slot9.prototype.symbolName = "L2";
  slot9.prototype = Object.create(BBSlot.prototype);
  slot9.prototype.constructor = slot9;

  /************************************************************************
  *    slot10: L1
  ************************************************************************/
  slot10 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, '10_Normal.png', '10', "assets", "Low", true, null, false, true);
    this.symbolName = "L1";
  }
  slot10.prototype.symbolName = "L1";
  slot10.prototype = Object.create(BBSlot.prototype);
  slot10.prototype.constructor = slot10;



  /************************************************************************
   *    slot11: WILD
   ************************************************************************/
  slot11 = function(game, positionAsName, x, y, width, height) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Wild_Normal.png', 'Wild', 'assets', "Wild", true, null, false, true);
    this.symbolName = "WILD";
  }
  slot11.prototype.symbolName = "WILD";
  slot11.prototype = Object.create(BBSlot.prototype);
  slot11.prototype.constructor = slot11;

  /************************************************************************
   *    slot12: SCATTER
   *  In Scatter
   ************************************************************************/
  slot12 = function(game, positionAsName, x, y, width, height, isVisible, ReelName) {
    BBSlot.call(this, game, positionAsName, x, y, width, height, 'Scatter_Normal.png', 'Scatter', 'assets', "Scatter", true, null, false, true);
    this.symbolName = "SCAT";
    var that = this;

    bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_' + ReelName, function() {
      that.actionOnClick();
    });

    bedbugEventsSystem.addListener('ON_SCATTER_WIN', function() {
      that.actionOnClick();
    });


  }
  slot12.prototype.symbolName = "SCAT";
  slot12.prototype = Object.create(BBSlot.prototype);
  slot12.prototype.constructor = slot12;





  /****************************************************************
   * **  Assign Theme symbols to the Engine's Slots Array **
   * This is the pool that the engine uses to create symbols
   * from the results returned by the RGS for the game reels
   ***************************************************************/
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P5")] = slot1;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P4")] = slot2;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P3")] = slot3;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P2")] = slot4;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("P1")] = slot5;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L5")] = slot6;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L4")] = slot7;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L3")] = slot8;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L2")] = slot9;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("L1")] = slot10;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("WILD")] = slot11;
  bedbugGameCore.Slots[bedbugGameCore.symbolNameToID("SCAT")] = slot12;


  bedbugGameCore.game_specs.slots.scatterSymbolID = bedbugGameCore.symbolNameToID("SCAT");
  