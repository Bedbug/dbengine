var BBReel = function(game, x, y, name, id, parent, addtostage) {

    Phaser.Group.call(this, game, null, name);

    bedbugGameCore.log("Reel overriden by theme's reel", true);

    var that = this;

    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;


    // The intial slots of the reel whese will be replaced on every spin
    this.Slots = [];

    this.Overlay = [];

    // The number of spins the reel will make before fininshing. Defaults to 2.
    this.NumSpins = 2;

    this.spinCount = 0;

    this.ticketReceived = 0;

    /** Set the initial slots */
    this.randomGenerateSlots();

    this.overlayGroup = this.game.add.group();

    this.createOverlaySlots(0, 3, bedbugGameCore.symbolNameToID('L1'), this.overlayGroup);

    this.addChild(this.overlayGroup);
    // this.createDummyPadding();

    bedbugEventsSystem.addListener('ON_SPIN_STOP_CLICKED', showReelResults);

    game.add.existing(this);

    function showReelResults() {

        console.log("Show Results!!!!!!");
        that.game.time.events.remove(that.resolveEvent);
        // Tell the system that a stop spin was requested
        // We override this way the default delay in the stop
        that.stopIsRequested = true;
        var ReelPlayType = that.spinInfo.ReelPlayType;
        var onSpinFinished = that.spinInfo.onSpinFinished;
        var results = that.spinInfo.results;

        //Theme.stoneDropAnimation();

        var ind = results.length - 1;
        var slotindex = results.length - 1;
        // var tempSlots = [];
        // tempSlots.push(that.Slots[10]);
        // tempSlots.push(that.Slots[11]);
        // tempSlots.push(that.Slots[12]);
        // tempSlots.push(that.Slots[13]);
        // tempSlots.push(that.Slots[14]);

        // tempSlots.push(that.Slots[5]);
        // tempSlots.push(that.Slots[6]);
        // tempSlots.push(that.Slots[7]);
        // tempSlots.push(that.Slots[8]);
        // tempSlots.push(that.Slots[9]);

        // tempSlots.push(that.Slots[0]);
        // tempSlots.push(that.Slots[1]);
        // tempSlots.push(that.Slots[2]);
        // tempSlots.push(that.Slots[3]);
        // tempSlots.push(that.Slots[4]);

        // _.each(tempSlots, function(slot) {
        //     that.game.time.events.add(20 * ind, function() {

        //         // Hide the overlay for this slot;
        //         that.Overlay[slotindex].visible = false;

        //         slot.setToAppear();
        //         slotindex--;
        //         if (slotindex == -1)
        //             if (onSpinFinished)
        //                 that.game.time.events.add(200, function() {
        //                     that.spinInfo.onSpinFinished();
        //                 }, this);
        //     }, this);
        //     ind--;
        // })

        _.each(that.Slots, function(slot) {
            that.game.time.events.add(20 * ind, function() {

                // Hide the overlay for this slot;
                that.Overlay[slotindex].visible = false;

                slot.setToAppear();
                slotindex--;
                if (slotindex == -1)
                    if (onSpinFinished)
                        that.game.time.events.add(200, function() {
                            that.spinInfo.onSpinFinished();
                        }, this);
            }, this);
            ind--;
        })

        if (ReelPlayType == 3) {
            bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR');
            if (!(that.id == 3 && bedbugGameCore.scatters_appeard < 2) && !(that.id == 4 && bedbugGameCore.scatters_appeard < 3))
                bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR_' + that.name);
        }

        // FIX: Wait a little so the sound of bounds corresponds to the end of the appear animation
        that.game.time.events.add(100, function() {
            bedbugEventsSystem.emitEvent('ON_REEL_BOUNCE');
        }, this);
    }

    //// Disable this for production
    // var centerSpot = that.game.add.graphics(0, 0);
    // centerSpot.beginFill(0xD44A52, 1);
    // centerSpot.drawRoundedRect(that.x, that.y, 10, 10, 6);
    // centerSpot.endFill();
    /***************************************************/
    console.log(this.name + " : " + this.x);
}

BBReel.prototype = Object.create(Phaser.Group.prototype);
BBReel.prototype.constructor = BBReel;

BBReel.prototype.GetSlot = function(index) {
    var indx = 2 - index;
    return this.Slots[indx];
}

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

var ik = 0;
/*************************************************************
 *  First, initiate the spin animation.
 */
BBReel.prototype.SetToSpin = function() {

    var heightOfEachSlot = bedbugGameCore.game_specs.slots.height;
    var that = this;
    that.stopIsRequested = false;
    this.ticketReceived = 0;

    /* The Theme's animation configuration timmings*/
    var Timmings = bedbugGameCore.game_specs.config.timmings;

    // Stagger the reel Spin Start if necessary
    this.game.time.events.add(Timmings.reel_each_spin_delay * that.id, startReelSpin, this);
    // setTimeout(startReelSpin, Timmings.reel_each_spin_delay * that.id);

    // this.bringToTop(this.overlayGroup);
    console.log("---- SetToSpin");

    function startReelSpin() {
        _.times(3, function(i) {
            var k = 3 - i;
            var posIndex = i;
            // Destroy previous symbols
            // Stagger if required the appearance of each symbol
            that.game.time.events.add(Timmings.symbol_stagger_start_delay * k, showSymbol, this);

            function showSymbol() {
                console.log("---- Fade out symbols");
                if (that.ticketReceived == 0) {
                    // that.Overlay[i].visible = true;
                    that.Slots[i].fadeSymbol(function() {
                        //  that.Slots[i].destroy();
                    })

                }
            };

            that.game.time.events.add(300, function() {
                Theme.stoneDisolve(that);
            }, this);
            // that.replaceSlot(index, that.Slots[index]);
        });




        // Inform the engine that the Reel has started spinning
        bedbugEventsSystem.emitEvent('ON_EACH_REEL_SPIN');

    }
}

BBReel.prototype.hideOverlay = function() {
    console.log(this.spinInfo);
    var that = this;
    _.times(3, function(i) {
        console.log(i + " : " + that.Overlay[i]);
        that.Overlay[i].visible = false;
    });

}


BBReel.prototype.SetSpinInfo = function(results, delay, ReelPlayType, anticipationIndex, onSpinFinished) {

    var that = this;
    this.spinInfo = {
        results: results,
        delay: delay,
        ReelPlayType: ReelPlayType,
        anticipationIndex: anticipationIndex,
        onSpinFinished: onSpinFinished
    }
    var s = this.spinInfo;
    setTimeout(function() {
        Theme.stoneDropAnimation(that);
        setTimeout(function() {
            that.Spin(s.results, s.delay, s.ReelPlayType, s.anticipationIndex, s.onSpinFinished);
        }, 600);
    }, 1000)
}

BBReel.prototype.Spin = function(results, delay, ReelPlayType, anticipationIndex, onSpinFinished) {


    this.ticketReceived = 1;
    // this.hideOverlay();


    var that = this;

    var REEL_TYPES = {
        NORMAL: 1,
        NORMAL_SCATTER: 2,
        ANTICIPATION_NO_SCATTER: 3,
        ANTICIPATION_SCATTER: 4
    }

    // If this value is turn to true, the reel should stop animating and show the 
    // result as soon as possible.
    bedbugGameCore.stopSpin = false;


    var heightOfEachSlot = bedbugGameCore.game_specs.slots.height;

    /* The Theme's animation configuration timmings*/
    var Timmings = bedbugGameCore.game_specs.config.timmings;




    // Stagger the reel Spin Start if necessary
    this.game.time.events.add(Timmings.reel_each_spin_delay * that.id, startReelSpin, this);
    // setTimeout(startReelSpin, Timmings.reel_each_spin_delay * that.id);

    function startReelSpin() {

        // console.log("Maybe This???????");
        _.times(results.length, function(i) {

            // Flip it to start from bottom;
            var k = results.length - 1 - i;
            // No need to flip
            // var k = i;
            // but we need to flip the positions in order to start from the top
            // var posIndex = results.length - 1 - i;
            var posIndex = i;
            // Destroy previous symbols
            // console.log("-- destroy symbols");
            that.Slots[i].destroy();

            // For each inverted symbol in results
            if (bedbugGameCore.Slots[results[k]]) {
                // Stagger if required the appearance of each symbol
                that.game.time.events.add(Timmings.symbol_stagger_start_delay * k, replaceSymbolAndSpin, this);

                function replaceSymbolAndSpin() {
                    that.Slots[i] = new bedbugGameCore.Slots[results[k]]
                        (that.game, i, (bedbugGameCore.game_specs.slots.width / 2), ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * (-posIndex)) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height, true, that.name);

                    var x_adj = bedbugGameCore.game_specs.reels.slots_adjustments[that.id][i][0];
                    var y_adj = bedbugGameCore.game_specs.reels.slots_adjustments[that.id][i][1];

                    that.Slots[i].x += x_adj;
                    that.Slots[i].y += y_adj;

                    that.addChild(that.Slots[i]);
                    // Start the monitor spin

                    that.Slots[i].setToSpin();

                    if (k == 0 && that.id == bedbugGameCore.game_specs.grid.columns - 1)
                        if (bedbugGameCore.bonus_status === 0) {
                            setTimeout(function() {
                                bedbugEventsSystem.emitEvent('ON_RESULT_RECEIVED');
                                bedbugGameCore.result_received = true;
                            }, 500);
                        }
                };
                // that.replaceSlot(index, that.Slots[index]);
            };


        });


        // Set Spin Duration from the game_specs file.
        var initSpinTime = bedbugGameCore.settings.fast_spins ? Timmings.reel_fast_spin_duration : Timmings.reel_spin_duration;

        // Add extra time to each succesive Reel will take to finish in order to emphasize the cascade effect
        var spinTime = bedbugGameCore.settings.fast_spins ? initSpinTime + (parseInt(that.id) * Timmings.reel_fast_spin_time_space) : initSpinTime + (parseInt(that.id) * Timmings.reel_time_space);

        that.resolveEvent = that.game.time.events.add(spinTime, resolveSpin, this);




        function resolveSpin() {

            // console.log("Stop Requested: " + that.stopIsRequested);

            /* If the user has clicked stop, we will handle it elsewhere */
            if (that.stopIsRequested) {
                console.log("Resolve spin not needed");
                return;
            }
            else {
                Controls.disableStop();
            }

            /**
             * The reel is not part of an anticipation extravaganza. 
             * Show the symbols and inform the event system.
             */
            if (ReelPlayType == REEL_TYPES.NORMAL || ReelPlayType == REEL_TYPES.NORMAL_SCATTER) {
                var ind = 0; // results.length - 1;
                var slotindex = results.length - 1;


                _.each(that.Slots, function(slot) {
                    that.game.time.events.add(Timmings.symbol_stagger_end_delay * ind, function() {

                        // Hide the overlay for this slot;
                        that.Overlay[slotindex].visible = false;

                        slot.setToAppear();
                        slotindex--;
                        if (slotindex == -1)
                            if (onSpinFinished)
                                that.game.time.events.add(Timmings.reel_finish_wait_time, function() {
                                    onSpinFinished();
                                }, this);
                    }, this);
                    ind++;
                })

                if (ReelPlayType == REEL_TYPES.NORMAL_SCATTER) {
                    bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR');
                    if (!(that.id == 3 && bedbugGameCore.scatters_appeard < 2) && !(that.id == 4 && bedbugGameCore.scatters_appeard < 3)) {
                        bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR_' + that.name);
                    }
                }

                // FIX: Wait a little so the sound of bounds corresponds to the end of the appear animation
                that.game.time.events.add((Timmings.symbol_stagger_end_delay * results.length - 1) + 100, function() {
                    bedbugEventsSystem.emitEvent('ON_REEL_BOUNCE');
                }, this);

            }
            /**
             * Time to show the anticipation effect.
             * Delay the Slots appearance and tell the Theme
             * that it's time to do its thing.
             */
            else {
                bedbugEventsSystem.emitEvent('ON_EACH_ANTICIPATION_START');
                // We tell Theme to display the anticipation animation.
                Theme.createAnticipationAnimation(
                    that.name,
                    that.x + bedbugGameCore.game_specs.slots.width / 2,
                    bedbugGameCore.game_specs.grid.y,
                    ReelPlayType
                );
                // Now setting the end of the anticipation
                bedbugGameCore.game.time.events.add(bedbugGameCore.settings.fast_spins ? Timmings.fast_spin_anticipation_time * anticipationIndex : Timmings.anticipation_time * anticipationIndex,

                    function() {

                        if (ReelPlayType == REEL_TYPES.ANTICIPATION_SCATTER)
                            bedbugEventsSystem.emitEvent('ON_SCATTER_APPEAR_' + that.name);
                        else
                            bedbugEventsSystem.emitEvent('ON_ANTICIPATION_FAILED');

                        bedbugEventsSystem.emitEvent('ON_EACH_ANTICIPATION_END');
                        // Tell the Theme script to remove the anticipation effect
                        Theme.removeAnticipationAnimation(that.name);

                        var ind = results.length - 1;
                        var slotindex = results.length - 1;
                        _.each(that.Slots, function(slot) {
                            bedbugGameCore.game.time.events.add(100, function() {
                                // Hide the overlay for this slot;
                                // console.log("Hidding overlay: " + slotindex);
                                that.Overlay[slotindex].visible = false;

                                slot.setToAppear();
                                slotindex--;
                                if (slotindex == -1)
                                    if (onSpinFinished)
                                        that.game.time.events.add(Timmings.reel_finish_wait_time, function() {
                                            onSpinFinished();
                                        }, this);

                            }, this);
                            ind--;
                        })


                        that.game.time.events.add(200, function() {
                            bedbugEventsSystem.emitEvent('ON_REEL_BOUNCE');
                        }, this);

                    }, this);
            }
        };

    }

}

BBReel.prototype.randomGenerateSlots = function() {
    this.randomizeSlots(0, 3);
    var that = this;
    var slotindex = 2;
    var ind = 0;
    var Timmings = bedbugGameCore.game_specs.config.timmings;
    // For the Tesla Game we only need the 3 visible slots in each Reel.
    // The is no need to spin anything
    that.game.time.events.add(2000+(Timmings.reel_time_space * that.id) , function() {
        _.each(that.Slots, function(slot) {
            that.game.time.events.add(Timmings.symbol_stagger_end_delay * ind, function() {
                slot.setToAppear();
                slotindex--;
            }, this);
            ind++;
        })
    })
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

BBReel.prototype.createOverlaySlots = function(startingIndex, times, useThisSymbol, group) {


    var that = this;
    var index = startingIndex;

    _.times(times, function(k) {
        if (that.Overlay[index]) that.Overlay[index].destroy();

        that.Overlay[index] = new bedbugGameCore.Slots[useThisSymbol](that.game, index, (bedbugGameCore.game_specs.slots.width / 2), ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -index) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height);

        /****************************************************
         * We receive each slots adjustment and apply it.
         * INFO: The indexes are inverted. We start from 
         * the bottom for each reel so we need to correct 
         * that so we can read the correct specs.
         *****************************************************/
        var x_adj = bedbugGameCore.game_specs.reels.slots_adjustments[that.id][index][0];
        var y_adj = bedbugGameCore.game_specs.reels.slots_adjustments[that.id][index][1];

        that.Slots[index].x += x_adj;
        that.Slots[index].y += y_adj;

        that.Overlay[index].setToSpin();
        that.Overlay[index].visible = false;
        group.addChild(that.Overlay[index]);

        index++;
    });
}

BBReel.prototype.randomizeSlots = function(startingIndex, times, useThisSymbol) {


    var that = this;
    var index = startingIndex;

    _.times(times, function(k) {
        if (that.Slots[index]) that.Slots[index].destroy();

        // For marking only the visible slots
        // if (index < 4) useThisSymbol = 0;

        if (useThisSymbol)
            that.Slots[index] = new bedbugGameCore.Slots[useThisSymbol](that.game, index, (bedbugGameCore.game_specs.slots.width / 2), ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -index) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height);
        else {
            that.Slots[index] = new(_.sample(bedbugGameCore.Slots))(that.game, index, (bedbugGameCore.game_specs.slots.width / 2), ((bedbugGameCore.game_specs.slots.height + bedbugGameCore.game_specs.reels.spacing.y) * -index) - (bedbugGameCore.game_specs.slots.height / 2), bedbugGameCore.game_specs.slots.width, bedbugGameCore.game_specs.slots.height);
        }


        /****************************************************
         * We receive each slots adjustment and apply it.
         * INFO: The indexes are inverted. We start from 
         * the bottom for each reel so we need to correct 
         * that so we can read the correct specs.
         *****************************************************/
        var x_adj = bedbugGameCore.game_specs.reels.slots_adjustments[that.id][index][0];
        var y_adj = bedbugGameCore.game_specs.reels.slots_adjustments[that.id][index][1];

        that.Slots[index].x += x_adj;
        that.Slots[index].y += y_adj;

        // //// Disable this for production
        // var centerSpot = that.game.add.graphics(0, 0);
        // centerSpot.beginFill(0xD44A52, 1);
        // centerSpot.drawRoundedRect(that.x , that.y, 10, 10, 6);
        // centerSpot.endFill();
        // /***************************************************/


        if (startingIndex == 0 && index < 4) {
            var rand = 600 + (Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
            // that.Slots[index].scale.set(0.1,0.05);

            // var slotDrop =
            // that.game.add.tween(that.Slots[index].scale).to({x:1}, 400, "Sine.easeOut", true, rand, 0, false);
            // that.game.add.tween(that.Slots[index].scale).to({y:1}, 100, "Sine.easeIn", true, rand + 700, 0, false);
            // that.game.add.tween(that.Slots[index]).from({
            //     alpha: 0
            // }, 300, "Elastic.easeOut", true, rand, 0, false);
            //  slotDrop.onComplete.add(function(){
            //   bedbugEventsSystem.emitEvent('ON_SLOT_WIN0');
            //  })
        }

        that.addChild(that.Slots[index]);
        // that.replaceSlot(index, that.Slots[index]);

        // that.addChild(centerSpot);
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
    return;
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
