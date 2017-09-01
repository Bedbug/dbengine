    var WinningLineMap = function(game, id, lineData, width, height, padding) {
    

     Phaser.Text.call(this, game, 0, 0, id, {
      font: "20px Arial",
      fontWeight: "bold",
      fill: "#fff"
     });
   
     var that = this;
     var slotWidth = width || 15;
     var slotHeight = height || 15;
     var padding = padding || 4;
     var Slots = {};

     // Rectangle Line
     var rectWidth = (bedbugGameCore.game_specs.grid.columns * (padding + slotWidth)) + padding;
     var rectHeight = (bedbugGameCore.game_specs.grid.rows * (padding + slotHeight)) + padding;

     var rectLine = game.add.graphics(0, 25);
     rectLine.lineStyle(3, 0xFFFFFF, 1);
     rectLine.drawRect(0, 0, rectWidth, rectHeight);

     this.addChild(rectLine);
     var column = 0;
     // console.log(lineData.slots);
     _.each(lineData.slots, function(row) {

      // row = slot[1];
      Slots[id] = game.add.graphics(0, 0);
      Slots[id].beginFill(0xffffff, 1);
      Slots[id].drawRoundedRect(padding + (column * (padding + slotWidth)), padding + (row * (padding + slotHeight)), slotWidth, slotHeight, 3);
      Slots[id].endFill();
      rectLine.addChild(Slots[id]);
      column++;
     })

     // _.times(bedbugGameCore.game_specs.grid.columns, function(column){
     //     _.times(bedbugGameCore.game_specs.grid.rows, function(row){

     //         var id = column+""+row;
     //         Slots[id] = game.add.graphics(0,0);
     //          Slots[id].beginFill(0xffffff, 1);
     //          Slots[id].drawRoundedRect(padding + (column * (padding + slotWidth)), padding + (row * (padding + slotHeight)), slotWidth, slotHeight, 3);
     //          Slots[id].endFill();
     //          rectLine.addChild(Slots[id]);
     //     })
     // })

     // // //adds button to game    
     game.add.existing(this);

    };

    WinningLineMap.prototype = Object.create(Phaser.Text.prototype);
    WinningLineMap.prototype.constructor = WinningLineMap;