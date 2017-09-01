var BBReel = function(game, x, y, name, id, parent, addtostage) {

    Phaser.Group.call(this, game, null, name);

    var that = this;

    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;


    // Initing the array with the displayed symbols
    this.displayResults = [];
    // Initing the array with the server result
    this.serverResult = [];
    // The intial slots of the reel whese will be replaced on every spin
    this.Slots = [];

    // The number of spins the reel will make before fininshing. Defaults to 2.
    this.NumSpins = 2;

    this.spinCount = 0;

    this.numOfSlotsInReel = 10;

    this.randomGenerateSlots(this.numOfSlotsInReel + 1);

    var Timmings = bedbugGameCore.game_specs.config.timmings;

    this.initSpinTime = bedbugGameCore.settings.fast_spins ? Timmings.reel_fast_spin_duration : Timmings.reel_spin_duration;
    this.spinTime = bedbugGameCore.settings.fast_spins ? this.initSpinTime + (parseInt(this.id) * Timmings.reel_fast_spin_time_space) : this.initSpinTime + (parseInt(this.id) * Timmings.reel_time_space);

    this.fastSpinTime = this.initSpinTime + (parseInt(this.id) * Timmings.reel_fast_spin_time_space);

    // this.createDummyPadding();

    game.add.existing(this);


    // var pivot = this.game.add.graphics(0, 0);
    // pivot.beginFill(0xff0000, 1);
    // pivot.drawRect(0, -10, 10, 10);
    // pivot.endFill();

    // this.add(pivot);
    // this.bringToTop(pivot);
    // this.setReelBlur(true);

}

BBReel.prototype = Object.create(Phaser.Group.prototype);
BBReel.prototype.constructor = BBReel;

BBReel.prototype.GetSlot = function(index) {
    var indx = 2 - index;
    return this.Slots[indx];
}

// BBReel.prototype.GetWorldPosition = function(index) {
//     var indx = 2 - index;
//     var slotWorldPosition = {};
//     slotWorldPosition.x = this.left + (bedbugGameCore.game_specs.slots.width / 2);
//     slotWorldPosition.y = (this.y + (-indx * bedbugGameCore.game_specs.slots.height) - (bedbugGameCore.game_specs.slots.height / 2));
//     return slotWorldPosition;
// }

BBReel.prototype.GetWorldPosition = function(index) {
    // console.log(" --- "+this.name+" : "+ this.x);
    var indx = 2 - index;
    var slotWorldPosition = {};
    // slotWorldPosition.x = this.left + (bedbugGameCore.game_specs.slots.width / 2);
    slotWorldPosition.x = this.x + (bedbugGameCore.game_specs.slots.width / 2);

    slotWorldPosition.y = (this.y + (-indx * bedbugGameCore.game_specs.slots.height) - (bedbugGameCore.game_specs.slots.height / 2)) -
        (bedbugGameCore.game_specs.reels.spacing.y * indx - 1);

    return slotWorldPosition;
}

BBReel.prototype.getSlotAt = function(index) {
    var indx = 2 - index;
    return this.Slots[indx];
}

/*************************************************************
 *  First, initiate the spin animation.
 */
BBReel.prototype.SetToSpin = function() {

    var that = this;
    var Timmings = bedbugGameCore.game_specs.config.timmings;

    var heightOfEachSlot = bedbugGameCore.game_specs.slots.height;
    // This is the position that we should return when we complete a full cycle
    that.startY = this.position.y;
    that.endY = this.position.y + ((this.numOfSlotsInReel - 3) * (heightOfEachSlot + bedbugGameCore.game_specs.reels.spacing.y));

    this.spinInfo = null;
    // Reseting the array with the displayed symbols
    this.displayResults = [];
    // Reseting the array with the server result
    this.serverResult = [];
    // We will need to create random symbols ourselves for the reel slots
    this.randomizeSlots(3, this.numOfSlotsInReel - 6); // From slot 3 (starting not visible slot) create 9 random slots
    // and make 12 the result staring index;
    this.index = this.numOfSlotsInReel - 3;

    bedbugEventsSystem.emitEvent('ON_EACH_REEL_SPIN');

    // spinTime = bedbugGameCore.settings.fast_spins ? spinTime / 2: spinTime; 

    //if (((spinTime / 2) + 100) >= initSpinTime) numOfSpins++;

    // spinTime = spinTime / numOfSpins;

    var spinIntro = this.game.add.tween(this.position).to({
            y: that.startY - 40
        }, 200
        //(spinTime / (endY - startY) * 80)
        , Phaser.Easing.Quintic.easeOut, false, 0); // delay

    var spinintroReturn = this.game.add.tween(this.position).to({
            y: that.startY
        },
        50
        // (spinTime / (endY - startY) * 40)
        , Phaser.Easing.Quintic.easeInOut);

    // LOOOP
    var spinLoop = this.game.add.tween(this.position).to({
        y: that.endY
    }, that.initSpinTime, Phaser.Easing.Linear.None, false, 0, 0, false);


    spinLoop.onStart.add(function() {
        that.setToBlur();
    })


    spinLoop.onComplete.add(function() {

        // If we haven't received data from RGS continue spinning
        if (that.spinInfo && bedbugGameCore.spin_reel_index == that.id) {
            bedbugGameCore.spin_reel_index++;
            var s = that.spinInfo;
            that.Spin(s.results, s.delay, s.ReelPlayType, s.anticipationIndex, s.onSpinFinished);
        }
        else {
            that.position.y = that.startY;
            spinLoop.start();
        }
    });


    spinIntro.chain(spinintroReturn);
    spinintroReturn.chain(spinLoop);
    spinIntro.start();

}

BBReel.prototype.SetSpinInfo = function(results, delay, ReelPlayType, anticipationIndex, onSpinFinished) {

    //   console.log(this.name+" info: "+ReelPlayType);
    this.spinInfo = {
        results: results,
        delay: delay,
        ReelPlayType: ReelPlayType,
        anticipationIndex: anticipationIndex,
        onSpinFinished: onSpinFinished
    }
}



BBReel.prototype.Spin = function(results, delay, ReelPlayType, anticipationIndex, onSpinFinished) {
    var that = this;

    /* Reset the Reel's position */
    that.position.y = that.startY;

    /* The Theme's animation configuration timmings*/
    var Timmings = bedbugGameCore.game_specs.config.timmings;

    /**
     * Enum ReelPlayType
     * [1 - Normal, 2 - Normal-Scatter, 3 - Anticipation, 4 - Anticipation-Scatter] 
     */
    this.ReelPlayType = ReelPlayType;
    // if (ReelPlayType > 1){
    //     bedbugGameCore.log("Reel " + this.name + " is spinning in " + {
    //         "2": "Normal-Scatter",
    //         "3": "Anticipation-NoScatter",
    //         "4": "Anticipation-Scatter"
    //     }[ReelPlayType] + " Mode");
    //       bedbugGameCore.log("Anticipation index is: "+ anticipationIndex);
    // }



    var heightOfEachSlot = bedbugGameCore.game_specs.slots.height;
    // This is the position that we should return when we complete a full cycle
    // var startY = this.position.y;
    // var endY = this.position.y + ((this.numOfSlotsInReel - 3) * (heightOfEachSlot + bedbugGameCore.game_specs.reels.spacing.y));



    this.numOfSpins = bedbugGameCore.settings.fast_spins ? Timmings.reel_fast_spins_num || 1 : Timmings.reel_spins_num || 5;
    // this.numOfSpins = 10;
    this.displayResults = [];

    this.index = this.numOfSlotsInReel - 3;

    _.times(results.length, function(i) {

        // Flip it to start from bottom;
        var k = results.length - 1 - i;

        // Store the displayed results to replace them with the current, later.
        if (i < 3)
            that.displayResults.push(results[k]);


        // Destroy previous symbols
        that.Slots[that.index].destroy();

        if (bedbugGameCore.Slots[results[k]]) {


            that.Slots[that.index] = new bedbugGameCore.Slots[results[k]](
                that.game,
                that.index,
                (bedbugGameCore.game_specs.slots.width / 2),
                ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -that.index) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height);
            that.addChild(that.Slots[that.index]);
        }
        // that.replaceSlot(index, that.Slots[index]);
        that.index++;
    })


    // LOOOP
    var spinLoop = this.game.add.tween(this.position).to({
        y: that.endY
    }, that.numOfSpins != 1 ? that.initSpinTime : that.spinTime, Phaser.Easing.Linear.None, false, 0, this.numOfSpins - 1, false);

    var anticipation = this.game.add.tween(this.position).to({
        y: that.endY
    }, that.spinTime - 200, Phaser.Easing.Linear.None, false, 0, 2 * anticipationIndex, false);

    // LAST LOOP
    var spinlast = this.game.add.tween(this.position).to({
        y: that.endY + 40
    }, 100, "Sine.easeOut", false, 0, 0, true);






    spinLoop.onStart.add(function() {

        setTimeout(function() {

            _.times(that.displayResults.length, function(i) {
                // Destroy previous symbols
                that.Slots[i].destroy();
                if (bedbugGameCore.Slots[that.displayResults[i]]) {

                    that.Slots[i] = new bedbugGameCore.Slots[that.displayResults[i]](
                        that.game,
                        i,
                        (bedbugGameCore.game_specs.slots.width / 2),
                        ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -i) - (bedbugGameCore.game_specs.slots.height / 2),
                        bedbugGameCore.game_specs.slots.width,
                        bedbugGameCore.game_specs.slots.height,
                        true,
                        that.name);

                    that.addChild(that.Slots[that.index]);

                    that.addChild(that.Slots[i]);
                }
            })

            that.setToBlur();

            /* Now we can safely stop the spin*/
          if (bedbugGameCore.bonus_status === 0) {
            bedbugEventsSystem.emitEvent('ON_RESULT_RECEIVED');
            bedbugGameCore.result_received = true;
        }

        }, (that.spinTime / 3));
    })
    var loop = 1;
    spinLoop.onRepeat.add(function() {
        loop++;

        // console.log(this.name+": "+loop);

        // console.log(loop+" | "+(that.numOfSpins - 1));
        if (bedbugGameCore.stopSpin && bedbugGameCore.stop_spin_index == that.id) {
            bedbugGameCore.stop_spin_index++;
            spinLoop.repeat(0);
            spinLoop.updateTweenData("duration", that.fastSpinTime);

            // spinLoop.stop();

            // if (that.ReelPlayType == 3 || that.ReelPlayType == 4)
            //   that.position.y = that.startY;


            // spinLoop.chainedTween.start();
        }
        else if (loop == that.numOfSpins - 1) {
            spinLoop.updateTweenData("duration", that.spinTime -100);
            // console.log("last loop");
        }

    });

    spinLoop.onComplete.add(function() {
        if (that.ReelPlayType == 3 || that.ReelPlayType == 4)
            that.position.y = that.startY;
    });



    anticipation.onStart.add(function() {
        bedbugEventsSystem.emitEvent('ON_EACH_ANTICIPATION_START');
        Theme.createAnticipationAnimation(
            that.name,
            that.x + bedbugGameCore.game_specs.slots.width / 2,
            bedbugGameCore.game_specs.grid.y
        )
    });

    anticipation.onComplete.add(function() {
        if (that.ReelPlayType == 4)
            bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR');

        bedbugEventsSystem.emitEvent('ON_EACH_ANTICIPATION_END');
        // if(that.ReelPlayType == 3)
        //     bedbugEventsSystem.emitEvent('ON_ANTICIPATION_FAILED');

        Theme.removeAnticipationAnimation(that.name);
    });




    spinlast.onStart.add(function() {
        if (that.ReelPlayType == 2) {
            bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR');
            //  console.log('ON_SCATTER_APPEAR');
        }

        bedbugEventsSystem.emitEvent('ON_REEL_BOUNCE');
        that.setToNormal();
    })
    spinlast.onComplete.add(function() {
        setTimeout(function() {
            that.position.y = that.startY;
            if (that.ReelPlayType == 2 || that.ReelPlayType == 4) {
                // console.log('ON_SCATTER_APPEAR_' + that.name);
                bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR_' + that.name);
            }

            // When the reel has stoped moving, we delay the callback according to theme specs.
            setTimeout(function() {
                onSpinFinished();
            }, Timmings.reel_finish_wait_time)
        }, 100);




    })



    if (that.ReelPlayType != 3 && that.ReelPlayType != 4)
        spinLoop.chain(spinlast);
    else {
        spinLoop.chain(anticipation);
        anticipation.chain(spinlast);
    }


    spinLoop.start();

}


BBReel.prototype.randomGenerateSlots = function(numSlots) {
    this.randomizeSlots(0, numSlots);
}

BBReel.prototype.createDummyPadding = function() {
    this.add(new(_.sample(bedbugGameCore.Slots))(this.game, "reel_bottom_padding", 0, bedbugGameCore.game_specs.slots.height, bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height));
    // this.add(new(_.sample(bedbugGameCore.Slots))(this.game, "reel_top_padding", 0,bedbugGameCore.game_specs.slots.height * -this.numOfSlotsInReel+1, bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height));
}



BBReel.prototype.setReelBlur = function(state) {
    if (state) {
        var blurX = this.game.add.filter('BlurX');
        var blurY = this.game.add.filter('BlurY');

        blurX.blur = 1;
        blurY.blur = 15;

        this.filters = [blurX, blurY];
    }
    else
        this.filters = null;
}

BBReel.prototype.randomizeSlots = function(startingIndex, times, useThisSymbol) {
    var that = this;
    var index = startingIndex;

    var keys = [];
    var firstKeys = [];
    for (var prop in bedbugGameCore.Slots) {
        if (bedbugGameCore.Slots.hasOwnProperty(prop)) {
            keys.push(prop);
        }
    }
    var stackCount = 0;
    var prevStackSymbol = null;
    
    var shouldStackOn = _.sample([0,1,2]);
    
    _.times(times, function(k) {
        if (that.Slots[index]) that.Slots[index].destroy();
        // console.log("here: "+);
        if (times == that.numOfSlotsInReel + 1) {
            if (index == times - 4)
                useThisSymbol = firstKeys[0];

            if (index == times - 3)
                useThisSymbol = firstKeys[1];

            if (index == times - 2)
                useThisSymbol = firstKeys[2];
        }

        // console.log(bedbugGameCore.Slots);

        // if (bedbugGameCore.Slots[0])
        //     console.log(bedbugGameCore.Slots[0].symbolName);
        //  console.log(_.find(bedbugGameCore.Slots,{name:"slot2"}).symbolName);

        if (useThisSymbol) {
            that.Slots[index] = new bedbugGameCore.Slots[useThisSymbol](that.game, index, (bedbugGameCore.game_specs.slots.width / 2), ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -index) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height);
        }
        else {
            
            if(stackCount == 0)
                prevStackSymbol = _.sample(keys);
            
            if(shouldStackOn == 2 &&  stackCount == 1) prevStackSymbol = _.sample(keys);
            var key = prevStackSymbol;
            stackCount ++;
            
            if(shouldStackOn == 0 && stackCount == 3) stackCount = 0;
            if(shouldStackOn == 1 && stackCount == 2) stackCount = 0;
           
            
            if (index < 3) firstKeys.push(key);
            that.Slots[index] = new bedbugGameCore.Slots[key](that.game, index, (bedbugGameCore.game_specs.slots.width / 2), ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -index) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height);
        }

        if (startingIndex == 0 && index < 3) {
            var Rand = 600+Math.floor((Math.random() * 800) + 1);
            var slotDrop = that.game.add.tween(that.Slots[index].scale).from({
                y: 1.5, x:1.5
            }, 300, "Bounce.easeOut", true, Rand, 0, false);
            var slotDropAlpha = that.game.add.tween(that.Slots[index]).from({
                alpha: 0
            }, 300, "Sine.easeOut", true, Rand,0, false);
            //  slotDrop.onComplete.add(function(){
            //   bedbugEventsSystem.emitEvent('ON_SLOT_WIN0');
            //  })
        }

        that.addChild(that.Slots[index]);
        // that.replaceSlot(index, that.Slots[index]);
        index++;
    });
}

BBReel.prototype.setToNormal = function() {
    // this.setReelBlur(false);
    _.each(this.Slots, function(slot) {
        slot.setToNormal();
    })
}

BBReel.prototype.setToBlur = function() {
    //this.setReelBlur(true);

    _.each(this.Slots, function(slot) {
        slot.setToBlur();
    })
}

BBReel.prototype.resetSlotsState = function() {
    var that = this;
    _.times(3, function(i) {
        that.Slots[i].setToNormal();
    })
}

BBReel.prototype.setToLost = function() {
    var that = this;
    _.times(3, function(i) {
        that.Slots[i].setToLost();
    })
}
