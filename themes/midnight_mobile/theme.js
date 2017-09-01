Theme = {
    /*********************************************************************************************
     * values:
     * Holds all properties used by Theme. You can reference them from child methods
     * with "this". e.g. this.lines["line02"]
     *********************************************************************************************/
    values: {
        lines: {},
        reelAnticipations: [],
    },
    styles: {
        win_label: {
            font: "bold 60px Contrail",
            fill: "#fff",
            align: "center"
        },
        big_win_label: {
            font: " 140px Contrail",
            fill: "#e4e347",
            align: "center",

            // backgroundColor: "#ffff00" 
        },
        freespin_label: {
            font: " 70px Contrail",
            fill: "#fff",
            align: "center",
        }
    },
    logoOriginalPostition: null,
    logoBonusPosition: null,
    create: function(context) {

        var that = this;

        // Here we assign the audio key that will be picked up as ambiance sound when the game starts
        // using this theme
        bedbugGameCore.ambianceKey = "music_main_loop";

        this.game_background = context.game.add.sprite(0, 0, 'assets2');
        this.game_background.frameName = "Midnight_Main_Back_Mobile.jpg";

        this.game_background.height = context.game.height;
        this.game_background.width = context.game.width;

        // Bonus BG
        this.redBg = context.game.add.sprite(0, 0, 'assets2');
        this.redBg.frameName = "Midnight_Bonus_Back_Mobile.jpg";
        this.redBg.height = context.game.height;
        this.redBg.width = context.game.width;
        this.redBg.alpha = 0;
        //this.redBg.visible = false;

        // White Flash
        this.whiteBg = context.game.add.sprite(0, 0, 'assets');
        this.whiteBg.frameName = "white.jpg";
        this.whiteBg.height = context.game.height;
        this.whiteBg.width = context.game.width;
        this.whiteBg.alpha = 0;
        this.whiteBg.visible = true;

        // Rain
        this.rain = context.game.add.sprite(0, 0, "rain");
        this.rain.scale.setTo(1.32, 1.33);
        this.rain.animations.add("rain", Phaser.Animation.generateFrameNames("rain_", 1, 5, '.png', 2), 20, true);
        this.rain.animations.play("rain");

        // Lamp
        this.Lamp = context.game.add.sprite(1134.59, 336.46, "assets");
        this.Lamp.anchor.setTo(.5, .5);
        this.Lamp.scale.setTo(1.8, 1.8);
        this.Lamp.animations.add("lamp", Phaser.Animation.generateFrameNames("lamp_", 1, 5, '.png', 2), 8, true);
        this.Lamp.animations.play("lamp");

        this.Lamp.inputEnabled = true;
        this.Lamp.blockInput = true;
        this.Lamp.input.enableDrag();
        this.Lamp.events.onDragStop.add(onDragStop, this);




        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }


        // FREE SPINS
        this.freeSpins = context.game.add.sprite((context.game.width / 2) + 30, (context.game.height / 2) - 30, "screens")
        this.freeSpins.frameName = "free-spin-popup.png";
        this.freeSpins.anchor.setTo(.5, .5);
        this.freeSpins.alpha = 0;

        var style3 = this.styles.freespin_label;

        this.freespins_text = context.game.add.text((context.game.width / 2) + 15, (context.game.height / 2) - 30, "", style3);
        this.freespins_text.anchor.setTo(0.5, 0.5);
        // bedbugGameCore.bigwinLabel_text.x = (this.game.width / 2);
        // bedbugGameCore.bigwinLabel_text.y = (this.game.height / 2);
        this.freespins_text.addColor('#fff', 0);
        this.freespins_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        this.freespins_text.stroke = '#000';
        this.freespins_text.strokeThickness = 6;
        this.freespins_text.alpha = 0;
        context.spinsGroup = context.game.add.group();
        context.spinsGroup.add(this.freeSpins);
        context.spinsGroup.add(this.freespins_text);

        /**************
         **   WINS
         ***************/

        context.winGroupbg = context.game.add.group();
        context.winGroup = context.game.add.group();


        this.bigwin = context.game.add.sprite((context.game.width / 2), (context.game.height / 2) - 75, 'screens', 'big-win-popup.png');
        this.bigwin.anchor.setTo(0.5, 0.5);
        this.bigwin.scale.setTo(1, 1);
        this.bigwin.alpha = 0;
        context.winGroup.add(this.bigwin);


        //context.winGroup.x += 40;


        // context.game.physics.startSystem(Phaser.Physics.ARCADE);
        // context.moneyEmitter = context.game.add.emitter(context.world.centerX, 450, 100);
        // context.winGroup.add(context.moneyEmitter);

        // var CoinParticle = (function() {

        //     var CoinParticle = function(game, x, y) {
        //         Phaser.Particle.call(this, game, x, y, 'effects');
        //         this.animations.add('rotate', Phaser.Animation.generateFrameNames("coinRot.", 1, 22, ".png", 4));
        //     };

        //     CoinParticle.prototype = Object.create(Phaser.Particle.prototype);
        //     CoinParticle.prototype.constructor = CoinParticle;
        //     CoinParticle.prototype.onEmit = function() {

        //         this.animations.stop("rotate", true);
        //         this.animations.play("rotate", 24, true);
        //         this.animations.getAnimation('rotate').frame = Math.floor(Math.random() * this.animations.getAnimation('rotate').frameTotal);
        //     }

        //     return CoinParticle;

        // }());

        // context.moneyEmitter.width = 400;
        // context.moneyEmitter.minParticleScale = 0.8;
        // context.moneyEmitter.maxParticleScale = 0.8;
        // context.moneyEmitter.setXSpeed(-300, 300);
        // context.moneyEmitter.setYSpeed(-100, -400);
        // context.moneyEmitter.particleClass = CoinParticle;
        // context.moneyEmitter.makeParticles();
        // context.moneyEmitter.gravity = 300;
        // context.winGroup.visible = false;



        // console.log("REMEMBER TO REMOVE OBSOLETE WINLINES CODE FROM THIS THEME!");



        // var downLine1 = context.game.add.sprite(100, bedbugGameCore.game_specs.grid.y - 2, "line");
        // downLine1.scale.setTo(1, 0.5);

        // var downLine2 = context.game.add.sprite(100, bedbugGameCore.game_specs.grid.y 
        //                 + (bedbugGameCore.game_specs.slots.height  * bedbugGameCore.game_specs.grid.rows)
        //                 + (bedbugGameCore.game_specs.reels.spacing.y  * bedbugGameCore.game_specs.grid.rows) - (bedbugGameCore.game_specs.reels.spacing.y) , "line");

        // downLine2.scale.setTo(1, 0.5);


    },
    playBigWin: function(context, callback) {
        var that = this;
        context.winGroup.visible = true;
        context.winGroupbg.visible = true;
        this.bigwin.alpha = 1;
        context.game.world.bringToTop(context.winGroup);

        context.game.world.bringToTop(bedbugGameCore.bigwinLabel_text);
        // Win Label Extra Style 
        bedbugGameCore.bigwinLabel_text.addColor('#e4e347', 0);
        bedbugGameCore.bigwinLabel_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        bedbugGameCore.bigwinLabel_text.stroke = '#cc3a00';
        bedbugGameCore.bigwinLabel_text.strokeThickness = 10;
        bedbugGameCore.bigwinLabel_text.x = 640;

        var bigTween = context.game.add.tween(this.bigwin).from({
            x: -350
        }, 400, Phaser.Easing.Back.Out, true);
        // var winTween = context.game.add.tween(this.bigwin).from({
        //     x: -(context.game.width / 2)
        // }, 400, Phaser.Easing.Back.Out, true);
        // var bigTweenFlicker = context.game.add.tween(this.bigwin).from({ 
        //     x: (context.game.width / 2) -5 
        // }, 400, Phaser.Easing.Back.Out, true).loop(true);

        //bigTween.chain(bigTweenFlicker);

        bigTween.onComplete.add(function() {
            //context.moneyEmitter.explode(5000, 200);
            if (callback)
                callback();
            //console.log(context.bigwin);
            // context.game.add.tween(that.bigwin).from({ 
            // x: (context.game.width / 2) -10 
            // }, 400, Phaser.Easing.Elastic.Out, true).loop(true).yoyo(true);

            setTimeout(function() {


                if (context.winGroup.visible)
                //bigTweenFlicker.stop();
                    that.hideBigWin(context);
            }, 10000);
        })

        // Open the top Lights
        // this.openLights();

    },
    hideBigWin: function(context) {
        bedbugEventsSystem.emitEvent('ON_HIDE_WIN_BIG');
        var hidebg = context.game.add.tween(context.winGroup).to({
            alpha: 0
        }, 600, Phaser.Easing.Quadratic.Out, true);

        hidebg.onComplete.add(function() {
            context.winGroup.visible = false;
            context.winGroupbg.visible = false;
            context.winGroup.alpha = 1;

            // // Remove Tweens
            // context.game.tweens.removeFrom(this.bigwin);

        });

        var hideText = context.game.add.tween(bedbugGameCore.bigwinLabel_text).to({
            alpha: 0
        }, 400, Phaser.Easing.Quadratic.Out, true);

        hideText.onComplete.add(function() {
            bedbugGameCore.bigwinLabel_text.visible = false;
            bedbugGameCore.bigwinLabel_text.alpha = 1;
        });

        // Close the top Lights
        // this.closeLights();
    },
    setLogoBonus: function(context) {

        context.game.add.tween(this.logoTitle).to({
            x: this.logoBonusPosition
        }, 1000, Phaser.Easing.Quadratic.Out, true);
    },
    setLogoOriginal: function(context) {
        context.game.add.tween(this.logoTitle).to({
            x: this.logoOriginalPostition
        }, 1000, Phaser.Easing.Quadratic.Out, true);
    },
    createAnticipationAnimation: function(reelName, x, y) {
        var anticipation = bedbugGameCore.game.add.sprite(x, y + 30, "assets", "scat_anticipation_01.png");
        anticipation.anchor.setTo(0.5, .1);
        anticipation.scale.setTo(0, 0.5);
        anticipation.animations.add("Reel_Anticipation", Phaser.Animation.generateFrameNames("scat_anticipation_", 1, 5, ".png", 2), 16, true);
        anticipation.play("Reel_Anticipation", 16, true);
        anticipation.alpha = 0;

        this.values.reelAnticipations.push({
            reel: reelName,
            animation: anticipation
        });
        // Play the first one immediatly
        if (this.values.reelAnticipations.length == 1)
            this.anticipationPlay(anticipation);
    },
    removeAnticipationAnimation: function(reelName) {
        _.remove(this.values.reelAnticipations, {
            reel: reelName
        })[0].animation.destroy();
        if (this.values.reelAnticipations.length > 0)
            this.anticipationPlay(this.values.reelAnticipations[0].animation);
    },
    anticipationPlay: function(anticipation) {
        bedbugGameCore.game.add.tween(anticipation.scale).to({
            x: 1,
            y: 1.15
        }, 500, Phaser.Easing.Exponential.Out, true);

        bedbugGameCore.game.add.tween(anticipation).to({
            alpha: 1
        }, 500, Phaser.Easing.Exponential.Out, true);

    },
    /*********************************************************************************************
     *  Create Win Lines
     *  line:   Line. Has all the details of the line to draw. (!: child of game_specs.json Lines:[])
     *  slim:   Boolean. if true, draws a line without start[end] dots and with a different visual
     *          style. (!: commonly used for max bet. showSlimLine() shows this line)
     *********************************************************************************************/
    createLine: function(line, slim, lineContext, context) {
        var winLine = context.game.add.group();


        winLine.name = line.id;

        var id_style = {
            'font': '37px Contrail',
            'fill': '#0b95bd',
            "align": "center",
            "stroke": "#000000",
            "strokeThickness": 6
        };

        var id_style2 = {
            'font': '40px Contrail',
            'fill': '#FE0466',
            "align": "center",
            "stroke": "#ffffff",
            "strokeThickness": 6
        };

        /* *******************************************************************************************
         *  Dots are ready and should be left unchanged. 
         *  Changes should be made in the part where the line is drawn.
         * ******************************************************************************************/
        var start_dot;
        if (line.dots.start && !slim && bedbugGameCore.isDesktop()) {

            /**
             * Check to see if the dot placement uses a variable instead of a exact integer
             * It helps with batch placement where left starting positions and right ending
             * positions are managed from central variables
             **/
            if (_.isString(line.dots.start[0]))
                line.dots.start[0] = bedbugGameCore.game_specs.dot_constants["start"];

            /**
             * This variable helps introduce stagger in line dot placement.
             * This way we can make the dots have proportion and not align perfectly
             * in a straight line.
             **/
            if (line.side_index)
                line.dots.start[0] += bedbugGameCore.game_specs.dot_constants["start_stagger"] * line.side_index;

            // console.log(line.dots.start[0]);

            start_dot = context.game.add.button(line.dots.start[0], line.dots.start[1], 'line_dot', null, null, 1, 0);
            start_dot.anchor.set(0.5, 0.5);
            start_dot.alpha = 0.1;
            // start_dot.inputEnabled = true;
            start_dot.onInputOver.add(lineContext.showLine, lineContext);
            start_dot.onInputOut.add(lineContext.hideLine, lineContext);

            lineContext.lineID1 = context.game.add.text(line.dots.start[0], line.dots.start[1], line.name, id_style);
            lineContext.lineID1.anchor.set(0.5, 0.4);

            // lineContext.lineID1.events.onInputOver.add(lineContext.showLine, lineContext);
            //  lineContext.lineID1.events.onInputOut.add(lineContext.hideLine, lineContext);

            lineContext.lineID2 = context.game.add.text(line.dots.start[0], line.dots.start[1], line.name, id_style2);
            lineContext.lineID2.anchor.set(0.5, 0.4);

            // lineContext.lineID2.events.onInputOut.add(lineContext.hideLine, lineContext);
            // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
            lineContext.lineID2.visible = false;
        }

        // create the last dot
        var end_dot;
        if (line.dots.end && !slim && bedbugGameCore.isDesktop()) {

            /**
             * Check to see if the dot placement uses a variable instead of a exact integer
             * It helps with batch placement where left starting positions and right ending
             * positions are managed from central variables
             **/
            if (_.isString(line.dots.end[0]))
                line.dots.end[0] = bedbugGameCore.game_specs.dot_constants["end"];

            /* Add stagger to dot placement if any */
            if (line.side_index)
                line.dots.end[0] += bedbugGameCore.game_specs.dot_constants["end_stagger"] * line.side_index;

            end_dot = context.game.add.button(line.dots.end[0], line.dots.end[1], 'line_dot', null, null, 1, 0);
            end_dot.anchor.set(0.5, 0.5);
            end_dot.alpha = 0.1;
            end_dot.onInputOver.add(lineContext.showLine, lineContext);
            end_dot.onInputOut.add(lineContext.hideLine, lineContext);
            lineContext.lineID1 = context.game.add.text(line.dots.end[0], line.dots.end[1], line.name, id_style);
            lineContext.lineID1.anchor.set(0.5, 0.4);
            // lineContext.lineID1.inputEnabled = true;
            // lineContext.lineID1.events.onInputOver.add(lineContext.showLine, lineContext);


            lineContext.lineID2 = context.game.add.text(line.dots.end[0], line.dots.end[1], line.name, id_style2);
            lineContext.lineID2.anchor.set(0.5, 0.4);
            // lineContext.lineID2.inputEnabled = true;
            // lineContext.lineID2.events.onInputOut.add(lineContext.hideLine, lineContext);
            // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
            lineContext.lineID2.visible = false;
        }

        /* *******************************************************************************************
         * ///////////////////      WRITE YOUR THEME CODE HERE    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
         *  Here is where we start to draw the graphic line and then add it to the winline group.
         *  If we want to create a different line we should replace the gfx with whatever we want 
         *  and make it a child of winLine. If we want to identify the line, use the property id 
         *  as console.log(line.id) // => "line02" .see theme line ids in game_specs.json
         * ******************************************************************************************/

        var themLine = null;

        if (this.values.lines[line.id])
            themLine = this.values.lines[line.id];

        /* Adding the drawn line to the object to be returned to the engine */
        // if (gfx2)
        //     winLine.add(gfx2);

        /* After a lot of trial and error, this is the way to move contents of a group to another
           group. For some reason adding the line group to the winline group didn't work. */
        // if (themLine)
        //     themLine.moveAll(winLine);


        // console.log(gfx);
        var gfx = context.game.add.graphics(0, 0);
        var gfx2 = context.game.add.graphics(0, 0);
        var heightLine = 0;

        if (!slim) {

            heightLine = 0;

            // Lines in Mobile should not have filters and should be white
            if (bedbugGameCore.isDesktop()) {
                gfx2.filters = [context.game.add.filter('Glow')];
                // gfx.filters  = [new PIXI.filters.GlowFilter(15, 2, 1, 0xFF0000, 0.5)];
                gfx2.lineStyle(9, 0xffffff, 1);
                gfx.lineStyle(5, 0xFE0466, 1);
            }
            else
                gfx.lineStyle(5, 0xffffff, 1);
        }
        else {
            gfx.lineStyle(2, 0xffffff, .8);
        }

        lineContext.PointsLabel = null;

        var style = {
            // 'font': '100px Arial',
            // 'fill': 'white'
            font: " 120px Contrail",
            fill: "#e4e347",
            align: "center",
        };

        if (start_dot) {
            gfx2.moveTo(start_dot.x, start_dot.y);
            gfx.moveTo(start_dot.x, start_dot.y);
        }

        var reelPoint = 0;
        var slot;
        _.forEach(line.slots, function(row) {
            reelPoint++;
            slot = bedbugGameCore.Reels[reelPoint - 1].GetWorldPosition(row);
            // Define starting point of the Payline
            if (reelPoint == 1 && start_dot) {
                gfx2.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5) - 5, slot.y);
                gfx.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);
            }
            if (reelPoint == 1 && !start_dot) {
                gfx2.moveTo(slot.x, slot.y + heightLine);
                gfx.moveTo(slot.x, slot.y + heightLine);
            }
            else {
                gfx2.lineTo(slot.x, slot.y + heightLine);
                gfx.lineTo(slot.x, slot.y + heightLine);
            }

            //// Here we create the lable that will hold the point of the winning line.
            //// WARNING: Leave as it is.
            if (reelPoint == 3) {
                lineContext.PointsLabel = context.game.add.text(slot.x, slot.y, "", style);
                lineContext.PointsLabel.addColor('#e4e347', 0);
                lineContext.PointsLabel.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
                lineContext.PointsLabel.stroke = '#cc3a00';
                lineContext.PointsLabel.strokeThickness = 10;
                lineContext.PointsLabel.resolution = 2;
                //lineContext.PointsLabel = context.game.add.bitmapText(slot.x, slot.y, "pointfonts", "", 100);

                lineContext.PointsLabel.anchor.setTo(0.5, 0.5);
                //lineContext.PointsLabel.scale.setTo(1.2, 1.2);
            }
        })

        // Define ending point of the Payline
        if (line.dots.end && !slim) {
            gfx2.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5) + 5, slot.y);
            gfx.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);
        }

        winLine.addChild(gfx2);
        winLine.addChild(gfx);



        /* Set default state as hidden */
        winLine.visible = false;

        return winLine;
    },
    /*********************************************************************************************
     * Called when the spin resulted to a win
     *********************************************************************************************/
    onWin: function() {},
    /*********************************************************************************************
     * Called when the engine starts spinning
     *********************************************************************************************/
    onSpinStarted: function() {},
    /*********************************************************************************************
     *  Start Bonus Game
     *  Called when the engine requests a game upgrade to the theme's bonus game
     *  serverResult:        The current action as returned by the server ticket
     *********************************************************************************************/
    startBonusGame: function(serverResult, context) {
        // console.log('-- ON_BONUSGAME_STARTED');

        // Request ambiance sound for new stage
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_END_LAST')
            // Set Bonus ambiance sound
        bedbugGameCore.ambianceKey = "music_free_spins_loop";
        // Request ambiance sound for new stage
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');

        bedbugEventsSystem.emitEvent('ON_FREESPINS_AWARDED');

        bedbugGameCore.bonus_status = 1;
        // bedbugGameCore.bonus_stage = 0;
        // bedbugGameCore.bonus_multiplier = 1;
        bedbugGameCore.free_spins_left = serverResult.FreeSpinsLeft;
        bedbugGameCore.bonus_total_coins = serverResult.BonusTotalWinCoins;

        // Controls.hideControls(context.game);

        // Engines open
        //this.openEngines();


        // Hide the Info box
        context.infobox.visible = false;
        context.resetLines();
        context.resetGrid();

        context.BonusGameGroup = context.game.add.group();

        // Create Animation Assets
        // context.clouds = context.game.add.sprite(0, -394, "clouds2");
        // context.clouds.scale.set(2, 2);
        // context.clouds.alpha = 0.9;

        // Hide Clouds
        // context.clouds.alpha = 0

        var infox = bedbugGameCore.game_specs.infobox.x;
        var infoy = bedbugGameCore.game_specs.infobox.y + 2;

        // if (context.game.device.desktop) infoy -= 7;

        var infocenter = bedbugGameCore.game_specs.infobox.width / 2;

        context.infotextarea = context.game.add.text(context.game.width / 2, infoy, "", {
            "font": "bold 22px Contrail",
            "fill": "#fff",
            "align": "center"
        })

        context.infotextarea2 = context.game.add.text(infox + 400, infoy, "", {
            "font": "bold 22px Contrail",
            "fill": "#fff",
            "align": "center"
        })

        this.updateBonusInfo(serverResult.BonusTotalWinCoins, serverResult.FreeSpinsLeft, context);


        context.infotextarea.alpha = 0.01;
        context.infotextarea.anchor.setTo(.5, 0);
        context.infotextarea.setShadow(1, 1, 'rgba(0,0,0,0.2)', 5);

        context.infotextarea2.alpha = 0.01;
        context.infotextarea2.anchor.setTo(0, 0);
        context.infotextarea2.setShadow(1, 1, 'rgba(0,0,0,0.2)', 5);


        if (bedbugGameCore.game.device.desktop) {
            context.infotextarea.resolution = 2;
            context.infotextarea2.resolution = 2;
        }

        var centerx = bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) / 2);
        var centery = bedbugGameCore.game_specs.grid.y + ((bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) / 2);


        // context.bonusStage = context.game.add.text(bedbugGameCore.game_specs.grid.x - 100, bedbugGameCore.game_specs.grid.y / 2 + 50, "", {
        //     "font": "bold 40px ArialRound",
        //     "fill": "#fff",
        //     "align": "center"
        // })

        // context.bonusStage.setText(bedbugGameCore.getLocalizedText("bonus_stage") + "1");
        // context.bonusStage.alpha = 0;
        // context.bonusStage.anchor.setTo(0.5, 0.5);
        // context.bonusStage.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

        context.BonusGameGroup.addChild(context.infotextarea);
        context.BonusGameGroup.addChild(context.infotextarea2);


        // context.BonusGameGroup.addChild(context.bonusStage);


        // DISPLAY MESSAGES INSTEAD OF ART
        // context.displayCenterMessage("BONUS", 2);
        // context.displayCenterMessage("FREE SPINS", 2);

        // DISPLAY Free Spins Panel
        context.game.world.bringToTop(context.spinsGroup);
        // console.log("TWEENING FREESPINS");
        this.SpinTweenAlpha = context.game.add.tween(this.freeSpins).to({
            alpha: 1
        }, 300, Phaser.Easing.Quadratic.Out, true);
        this.SpinTweenScale = context.game.add.tween(this.freeSpins.scale).from({
            x: 0.8,
            y: 0.8
        }, 300, Phaser.Easing.Back.Out, true);
        // Update the Text
        //\n
        this.freespins_text.setText("YOU WON\n" + serverResult.FreeSpinsLeft + "\nFREE SPINS");

        //context.game.bringToTop(this.spinsGroup);
        this.SpinTweenAlpha.onComplete.add(function() {
            // console.log("CLOSING FREESPINS");
            //Open Text
            this.SpinTextAlpha = context.game.add.tween(this.freespins_text).to({
                alpha: 1
            }, 300, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

            //Close Panel And Text
            this.SpinTweenAlpha2 = context.game.add.tween(this.freeSpins).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);
            this.SpinTextAlpha2 = context.game.add.tween(this.freespins_text).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);

        }, this)

        // Open The Red Background
        this.openRed(context);

        var infotextarea_text_appear = context.game.add.tween(context.infotextarea).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 3400);
        var infotextarea2_text_appear = context.game.add.tween(context.infotextarea2).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 3400);


        infotextarea_text_appear.onComplete.add(upgradeStage, this);

        // function openRed() {

        // }

        function upgradeStage() {
            // context.checkBonusStageUpgrade(serverResult);
            context.spin();
        }

    },
    openRed: function(context) {
        var that = this;
        this.whiteBgFlash = context.game.add.tween(that.whiteBg).to({
            alpha: 1
        }, 500, Phaser.Easing.Elastic.Out, true, 3000, 0, false);

        this.whiteBgFlash.onComplete.add(function() {
            context.game.add.tween(that.whiteBg).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.Out, true, 200, 0, false);
            // this.whiteBgFadeOut = context.game.add.tween(this.whiteBg).to({ alpha: 0 }, 500, Phaser.Easing.Back.In, true, 500, 0, false);
            this.redBgOpen = context.game.add.tween(that.redBg).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.Out, true, 200, 0, false);
        })
    },
    closeRed: function(context) {
        var that = this;
        this.whiteBgFlash = context.game.add.tween(that.whiteBg).to({
            alpha: 1
        }, 500, Phaser.Easing.Elastic.Out, true, 3000, 0, false);

        this.whiteBgFlash.onComplete.add(function() {
            context.game.add.tween(that.whiteBg).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.Out, true, 200, 0, false);
            // this.whiteBgFadeOut = context.game.add.tween(this.whiteBg).to({ alpha: 0 }, 500, Phaser.Easing.Back.In, true, 500, 0, false);
            this.redBgOpen = context.game.add.tween(that.redBg).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.Out, true, 100, 0, false);
        })
    },
    /*********************************************************************************************
     *  Here we create the bonus stage upgrades if any. Bonus stage upgrades are invrements of
     *  multipliers that upgrade after theme check validations. If the game does not contain a
     *  bonus stage upgrade mechanic we simply leave the method empty
     *********************************************************************************************/
    requiresBonusStageUpgrade: function(serverResult) {},
    /*********************************************************************************************
     * This is responsible to display the bonus game info. Do whatever you want with it.
     *********************************************************************************************/
    updateBonusInfo: function(totalwin, freespins, context) {
        if (context.infotextarea) {
            context.infotextarea.setText(bedbugGameCore.getLocalizedText("MSG_FREE_SPINS_REMAIN").replace("$(1)", freespins).replace("$(2)", totalwin));
            // context.infotextarea.setText("                    " + bedbugGameCore.getLocalizedText("TXT_TOTAL_WIN") + ": " + totalwin);
            // context.infotextarea2.setText(bedbugGameCore.getLocalizedText("TXT_FREESPINS_LEFT").toUpperCase() + ": " + freespins);
        }
    },
    /*********************************************************************************************
     *  End Bonus Game
     *  This method is called when all free spins have ended or any other event that the engine
     *  akwnoledges as an end of the bonus game. This method is responsible to display this 
     *  event to the user.
     *********************************************************************************************/
    endBonusGame: function(context) {
        // console.log('-- ON_BONUSGAME_ENDED');
        bedbugEventsSystem.emitEvent('ON_BONUSGAME_ENDED');


        // Request ambiance sound for new stage
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_END_LAST')
            // Set Bonus ambiance sound
        bedbugGameCore.ambianceKey = "music_main_loop";
        // Request ambiance sound for new stage
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');

        // Reset Values
        bedbugGameCore.bonus_status = 0;
        bedbugGameCore.bonus_stage = 0;
        bedbugGameCore.bonus_multiplier = 1;

        // DISPLAY Free Spins Panel
        context.game.world.bringToTop(context.spinsGroup);
        console.log("TWEENING FREESPINS");
        this.SpinTweenEndAlpha = context.game.add.tween(this.freeSpins).to({
            alpha: 1
        }, 300, Phaser.Easing.Quadratic.Out, true);
        this.SpinTweenEndScale = context.game.add.tween(this.freeSpins.scale).from({
            x: 0.8,
            y: 0.8
        }, 300, Phaser.Easing.Back.Out, true);

        // Update the Text
        this.freespins_text.setText(bedbugGameCore.getLocalizedText('MSG_FREE_SPINS_END').replace("$(1)", bedbugGameCore.bonus_total_coins + "\n").replace("$(2)", "\n" + bedbugGameCore.bonus_total_free_spins));
        this.freespins_text.fontSize = 60;

        //context.game.bringToTop(this.spinsGroup);
        this.SpinTweenEndAlpha.onComplete.add(function() {
            console.log("CLOSING FREESPINS");
            //Open Text
            this.SpinTextEndAlpha = context.game.add.tween(this.freespins_text).to({
                alpha: 1
            }, 300, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

            //Close Panel And Text
            this.SpinTweenEndAlpha = context.game.add.tween(this.freeSpins).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);
            this.SpinTextEndAlpha = context.game.add.tween(this.freespins_text).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);
            proceed();
        }, this)

        // Open The Red Background
        this.closeRed(context);


        var winIs = bedbugGameCore.bonus_total_coins;
        // // console.log(winIs);
        // if (winIs > 0 && winIs < (18 * bedbugGameCore.bet_level)) {

        //     context.showEndBonusWinnings(winIs, "1", proceed);
        // }
        // else if (winIs > 0 && winIs < (180 * bedbugGameCore.bet_level)) {

        //     context.showEndBonusWinnings(winIs, "2", proceed);
        // }
        // else if (winIs > 0) {

        //     context.showEndBonusWinnings(winIs, "3", proceed);
        // }

        function proceed() {

            var stage_alpha = context.game.add.tween(context.BonusGameGroup).to({
                alpha: 0
            }, 500, Phaser.Easing.Exponential.Out, true, 1000);

            // var clouds_appear = context.game.add.tween(context.clouds).to({
            //   y: -379
            // }, 1000, Phaser.Easing.Exponential.Out, true);

            stage_alpha.onComplete.add(function() {
                context.BonusGameGroup.destroy(true);
            })


            // Controls.showPlay();
            // Controls.showControls(context.game);

            bedbugGameCore.bonus_total_coins = 0;

           

            if (bedbugGameCore.autoplay_count > 0) {
                // Pass the autoplay validatation in order to continue auto-playing
                var waitTime = 2000;

                // if (winIs > 2) waitTime = 5000;

                if (!bedbugGameCore.autoplay.shouldStopOnWin(winIs, winIs * bedbugGameCore.coin_value)) {
                    setTimeout(function() {
                        if (bedbugGameCore.autoplay_count > 0) {
                            bedbugGameCore.autoplay_count--;
                            context.spin();
                        }
                        else {
                            Controls.showPlay();
                            Controls.showControls(context.game);
                            bedbugGameCore.controls_enabled = true;
                        }
                    }, waitTime);
                    return;
                }
                else {
                    Controls.showPlay();
                    Controls.showControls(context.game);
                    bedbugGameCore.controls_enabled = true;
                }

            }
            else {
                Controls.showPlay();
                Controls.showControls(context.game);
                 bedbugGameCore.controls_enabled = true;
            }
        }


    }
}
