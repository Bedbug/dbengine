Sounds = {
    /*********************************************************************************************
     * values:
     * Holds all the global values of the model for easy reference
     *********************************************************************************************/
    values: {

    },
    create: function(context) {

        var that = this;
        // Here we assign the audio key that will be picked up as ambiance sound when the game starts
        // using this theme
        bedbugGameCore.ambianceKey = "music_main_loop";

        var scatters_appeard = 0;
        var reel_spin_loops = [];
        var anticipation_loops = [];

        bedbugEventsSystem.addListener('ON_FREESPINS_AWARDED', ON_FREESPINS_AWARDED);

        function ON_FREESPINS_AWARDED() {
            context.game.sound.play('evnt_free_spins_awarded', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_NAVIGATE_CLICKED', ON_NAVIGATE_CLICKED);

        function ON_NAVIGATE_CLICKED() {
            context.game.sound.play('onClick_navigate', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_SPIN_PLAY_CLICKED', ON_SPIN_PLAY_CLICKED);

        function ON_SPIN_PLAY_CLICKED() {
            // console.log("Clicked play");
            context.game.sound.play('onClick_play', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_SPIN_STOP_CLICKED', ON_SPIN_STOP_CLICKED);

        function ON_SPIN_STOP_CLICKED() {
            // console.log("Clicked stop");
            context.game.sound.play('onClick_stop', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_MAX_BET_CLICKED', ON_MAX_BET_CLICKED);

        function ON_MAX_BET_CLICKED() {
            context.game.sound.play('onClick_max_bet', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_SPIN_CLICK_TOGGLE', ON_SPIN_CLICK_TOGGLE);

        function ON_SPIN_CLICK_TOGGLE() {
            context.game.sound.play('onClick_stop', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_SCATTER_APPEAR', ON_SCATTER_APPEAR);

        function ON_SCATTER_APPEAR() {
            scatters_appeard++;
        };

        function ON_SCATTER_APPEAR_SOUND() {
            //console.log('scatter_appear_' + scatters_appeard);
            context.game.sound.play('scatter_appear_' + scatters_appeard, bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_EACH_ANTICIPATION_START', ON_EACH_ANTICIPATION_START);

        
         function ON_EACH_ANTICIPATION_START() {
            var anticipation_loop = context.game.add.sound('evnt_anticipation_start');
            anticipation_loops.push(anticipation_loop);
            if (anticipation_loops.length == 1 && !anticipation_loops[0].isPlaying) {
                anticipation_loops[0].play('', 0, bedbugGameCore.sound_effects_volume,true);
                if (bedbugGameCore.settings.ambiance)
                bedbugGameCore.ambiance_channel[0].fadeTo(500, 0.1);
            }
        };

        bedbugEventsSystem.addListener('ON_EACH_ANTICIPATION_END', ON_EACH_ANTICIPATION_END);

        function ON_EACH_ANTICIPATION_END() {

            if (anticipation_loops.length == 1) {
                anticipation_loops[0].onFadeComplete.add(function(sound, volume) {
                    anticipation_loops[0].destroy();
                    anticipation_loops.pop();
                  if (bedbugGameCore.settings.ambiance)
                    bedbugGameCore.ambiance_channel[0].fadeTo(500, bedbugGameCore.game.sound.volume);
                    
                });
                anticipation_loops[0].fadeOut(500);
            }
            else{
                anticipation_loops.pop();
            }

            if (bedbugGameCore.scatters_appeard < 3) {
                //console.log("ANTICIPATION FAILED: " + bedbugGameCore.scatters_appeard);
                context.game.sound.play('evnt_anticipation_failed', bedbugGameCore.sound_effects_volume);
            }
        };

        bedbugEventsSystem.addListener('ON_ANTICIPATION_FAILED', ON_ANTICIPATION_FAILED);

        function ON_ANTICIPATION_FAILED() {


            //context.game.sound.play('evnt_anticipation_failed', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_REELS_STARTED', ON_REELS_STARTED);

        function ON_REELS_STARTED() {

            scatters_appeard = 0;
            bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_Reel0', ON_SCATTER_APPEAR_SOUND);
            bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_Reel1', ON_SCATTER_APPEAR_SOUND);
            bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_Reel2', ON_SCATTER_APPEAR_SOUND);
            bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_Reel3', ON_SCATTER_APPEAR_SOUND);
            bedbugEventsSystem.addListener('ON_SCATTER_APPEAR_Reel4', ON_SCATTER_APPEAR_SOUND);
            var reel_spin_loop = context.game.add.sound('evnt_reel_spinning_loop');
            reel_spin_loop.play('', 0, bedbugGameCore.sound_effects_volume, true);
            reel_spin_loops.push(reel_spin_loop);

        }

        bedbugEventsSystem.addListener('ON_REELS_STOPED', ON_REELS_STOPED);

        function ON_REELS_STOPED() {
            reel_spin_loops[0].destroy();
            reel_spin_loops.shift();
        }


        bedbugEventsSystem.addListener('ON_EACH_REEL_SPIN', ON_EACH_REEL_SPIN);

        function ON_EACH_REEL_SPIN() {
            // var reel_spin_loop = context.game.add.sound('evnt_reel_spinning_loop');
            // reel_spin_loop.play('', 0, bedbugGameCore.sound_effects_volume, true);
            // reel_spin_loops.push(reel_spin_loop);
        };

        bedbugEventsSystem.addListener('ON_REEL_BOUNCE', ON_REEL_BOUNCE);

        function ON_REEL_BOUNCE() {
            // reel_spin_volume -= 0.10;
            // reel_spin_loop.volume = reel_spin_volume;
            context.game.sound.play('evnt_reel_spinning_stop', bedbugGameCore.sound_effects_volume);
            // reel_spin_loops[0].destroy();
            // reel_spin_loops.shift();

        };

        bedbugEventsSystem.addListener('ON_SLOT_WIN_SMALL', ON_SLOT_WIN_SMALL);

        function ON_SLOT_WIN_SMALL() {
            context.game.sound.play('win_small', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_SLOT_WIN_MEDIUM', ON_SLOT_WIN_MEDIUM);

        function ON_SLOT_WIN_MEDIUM() {
            context.game.sound.play('win_medium', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_SLOT_WIN_BIG', ON_SLOT_WIN_BIG);

        function ON_SLOT_WIN_BIG() {
            that.values.bigwinloop = context.game.sound.play('win_big', bedbugGameCore.sound_effects_volume, true);

            // console.log("Fade Out sound");
            bedbugGameCore.ambiance_channel[0].fadeTo(500, 0.1);
        };

        bedbugEventsSystem.addListener('ON_HIDE_WIN_BIG', ON_HIDE_WIN_BIG);

        function ON_HIDE_WIN_BIG() {
            if (that.values.bigwinloop) {
                that.values.bigwinloop.fadeOut(1000);
                //  console.log("Fade In sound");
                bedbugGameCore.ambiance_channel[0].fadeTo(500, 1);
            }
        };

        bedbugEventsSystem.addListener('ON_COIN_COUNT', ON_COIN_COUNT);

        function ON_COIN_COUNT() {
            context.game.sound.play('coin_count', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_COIN_COUNT_END', ON_COIN_COUNT_END);

        function ON_COIN_COUNT_END() {
            context.game.sound.play('coins_count_end', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_BUTTON_CLICK', ON_BUTTON_CLICK);

        function ON_BUTTON_CLICK() {
            context.game.sound.play('onClick_generic', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_BUTTON_TOGGLE', ON_BUTTON_TOGGLE);

        function ON_BUTTON_TOGGLE() {
            context.game.sound.play('onClick_toggle', bedbugGameCore.sound_effects_volume);
        };

        bedbugEventsSystem.addListener('ON_AMBIANCE_START_NEW', ON_AMBIANCE_START_NEW);
        bedbugEventsSystem.addListener('ON_AMBIANCE_END_LAST', ON_AMBIANCE_END_LAST);

        function ON_AMBIANCE_START_NEW() {

            var ambiance = context.game.add.audio(bedbugGameCore.ambianceKey);

            if (bedbugGameCore.ambiance_volume > 0)
                ambiance.fadeIn(5000, true);
            else
                ambiance.play("", 0, bedbugGameCore.ambiance_volume);
            bedbugGameCore.ambiance_channel.push(ambiance);
        };

        function ON_AMBIANCE_END_LAST() {
            if (!bedbugGameCore.ambiance_channel[0]) return;
            bedbugGameCore.ambiance_channel[0].fadeOut(3000);
            bedbugGameCore.ambiance_channel[0].onFadeComplete.add(function() {
                bedbugGameCore.ambiance_channel[0].destroy();
                bedbugGameCore.ambiance_channel.shift();
            })

        };


    }
}
