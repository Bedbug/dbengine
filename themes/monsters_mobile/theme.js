Theme = {
    /*********************************************************************************************
     * values:
     * Holds all properties used by Theme. You can reference them from child methods
     * with "this". e.g. this.lines["line02"]
     *********************************************************************************************/
    values: {
        lines: {},
        reelAnticipations: [],
        customWinningBanner: true,
        anticipationPlayedOnce: false
    },
    styles: {
        win_label: {
            font: " 90px Contrail",
            fill: "#fff",
            align: "center"
        },
        big_win_label: {
            font: " 100px Contrail",
            fill: "#e4e347",
            align: "center",

            // backgroundColor: "#ffff00" 
        },
        freespin_label: {
            font: " 60px Contrail",
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

        this.game_background = context.game.add.sprite(0, 0, 'screensmb');
        this.game_background.frameName = "BG.jpg";

        this.game_background.height = context.game.height;
        this.game_background.width = context.game.width;

        // Bonus BG
        this.bonusBg = context.game.add.sprite(0, 0, 'screensmb');
        this.bonusBg.frameName = "BG_free-spin.jpg";
        this.bonusBg.height = context.game.height;
        this.bonusBg.width = context.game.width;
        this.bonusBg.alpha = 0;

        this.lightLeft = context.game.add.sprite(0, 720, 'screensmb', "FreeSpin_.png");
        this.lightLeft.anchor.setTo(0.1, .5);
        this.lightLeft.alpha = .4;
        this.lightLeft.angle = -90;
        context.game.add.tween(this.lightLeft).to({
            angle: -20
        }, 1500, Phaser.Easing.Linear.none, true).loop(true).yoyo(true);

        this.lightRight = context.game.add.sprite(1280, 720, 'screensmb', "FreeSpin_.png");
        this.lightRight.anchor.setTo(0.1, .5);
        this.lightRight.alpha = .4;
        this.lightRight.angle = -90;
        context.game.add.tween(this.lightRight).to({
            angle: -160
        }, 1500, Phaser.Easing.Linear.none, true).loop(true).yoyo(true);

        context.lightsGroup = context.game.add.group();
        context.lightsGroup.add(this.lightLeft);
        context.lightsGroup.add(this.lightRight);
        context.lightsGroup.alpha = 0;

        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }


        // FREE SPINS
        this.freeSpins = context.game.add.sprite((context.game.width / 2), (context.game.height / 2) - 60, "screensmb")
        this.freeSpins.frameName = "Message_BOARD.png";
        this.freeSpins.anchor.setTo(.5, .5);
        this.freeSpins.alpha = 0;

        var style3 = this.styles.freespin_label;

        this.freespins_text = context.game.add.text((context.game.width / 2), (context.game.height / 2) + 5, "", style3);
        this.freespins_text.anchor.setTo(0.5, 0.5);
        // bedbugGameCore.bigwinLabel_text.x = (this.game.width / 2);
        // bedbugGameCore.bigwinLabel_text.y = (this.game.height / 2);
        this.freespins_text.addColor('#fff', 0);
        this.freespins_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        this.freespins_text.stroke = '#000';
        this.freespins_text.strokeThickness = 1;
        this.freespins_text.alpha = 0;
        this.freespins_text.lineSpacing = -15;
        context.spinsGroup = context.game.add.group();
        // context.spinsGroup.add(this.freeSpins);
        // context.spinsGroup.add(this.freeSpins);

        context.spinsGroup.add(this.freeSpins);
        context.spinsGroup.add(this.freespins_text);

        /**************
         **   WINS
         ***************/

        context.winGroupbg = context.game.add.group();
        context.winGroup = context.game.add.group();

        // this.bigwinRibbon = context.game.add.sprite(0, (context.game.height / 2) - 30, 'screensmb', 'ribbon.png'); 
        // this.bigwinRibbon.scale.setTo(40,1);
        // this.bigwinRibbon.anchor.setTo(0, 0.5);
        // this.bigwinRibbon.alpha = 0;
        // context.winGroup.add(this.bigwinRibbon);
        this.bigwin = context.game.add.sprite((context.game.width / 2), (context.game.height / 2) - 30, 'assets', 'BIG_WIN.png');
        this.bigwin.anchor.setTo(0.5, 0.5);
        this.bigwin.scale.setTo(1, 1);
        this.bigwin.alpha = 0;
        // this.bigwinTitle = context.game.add.sprite(0, -140, 'assets', 'BIG_WIN.png');
        // this.bigwinTitle.anchor.setTo(.5);
        // this.bigwin.addChild(this.bigwinTitle);
        // this.bigwinStar = context.game.add.sprite(0, 140, 'screensmb', 'star.png');
        // this.bigwinStar.anchor.setTo(.5);
        // this.bigwin.addChild(this.bigwinStar);
        context.winGroup.add(this.bigwin);

        // context.game.physics.startSystem(Phaser.Physics.ARCADE);
        // context.moneyEmitter = context.game.add.emitter(context.world.centerX, 200, 100);


        // context.moneyEmitter.width = 150;
        // context.moneyEmitter.minParticleScale = 0.8;
        // context.moneyEmitter.maxParticleScale = 0.8;
        // context.moneyEmitter.setXSpeed(-300, 300);
        // context.moneyEmitter.setYSpeed(-300, -600);
        
        // context.moneyEmitter.minRotation = -550;
        // context.moneyEmitter.maxRotation = 550;
        
        // context.moneyEmitter.makeParticles('popcorns', [0, 1, 2, 3]);
        
        
        // // context.moneyEmitter.makeParticles();
        // context.moneyEmitter.gravity = 600;
        // context.moneyEmitter.alpha = 0
        context.winGroup.visible = false;

        // context.winGroup.add(context.moneyEmitter);

        // context.anticipCameraGroup = context.game.add.group();
        this.camera = context.game.add.sprite(1300, 780, "anticipation", "Projector_.png");
        this.camera.anchor.setTo(.5);
        this.camera.scale.setTo(.8);
        this.cameraLight = context.game.add.sprite(-400, -580, "anticipation", "Light_.png");
        this.camera.addChild(this.cameraLight);
        this.camera.alpha = 0;
        // cameraLight.anchor.setTo(.5);
        // context.anticipCameraGroup.add(cameraLight);
        // context.anticipCameraGroup.x = 1200;
        // context.anticipCameraGroup.y = 600;
    },
    playBigWin: function(context, callback) {
        var that = this;
        context.winGroup.visible = true;
        context.winGroupbg.visible = true;
        this.bigwin.alpha = 1;
        
        // context.moneyEmitter.alpha = 1;
        // this.bigwinRibbon.alpha = 1;
        context.game.world.bringToTop(context.winGroup);

        context.game.world.bringToTop(bedbugGameCore.bigwinLabel_text);
        // context.game.world.bringToTop(context.moneyEmitter);
        // Win Label Extra Style & Properties
        bedbugGameCore.bigwinLabel_text.addColor('#fff', 0);
        // bedbugGameCore.bigwinLabel_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        // bedbugGameCore.bigwinLabel_text.stroke = '#cc3a00';
        // bedbugGameCore.bigwinLabel_text.strokeThickness = 10;
        bedbugGameCore.bigwinLabel_text.x = 640;
        bedbugGameCore.bigwinLabel_text.y = 390;

        // var RibbonTween = context.game.add.tween(this.bigwinRibbon.scale).from({
        //     x: 1
        // }, 400, Phaser.Easing.Back.Out, true);

        var bigTween = context.game.add.tween(this.bigwin).from({
            y: -350
        }, 400, Phaser.Easing.Back.Out, true, 300);




        bigTween.onComplete.add(function() {
            // context.moneyEmitter.explode(5000, 200);
            // context.moneyEmitter.on = true;
            // context.moneyEmitter.start(true, 14000, 20);
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
        // context.moneyEmitter.on = false;

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
        var anticipation = bedbugGameCore.game.add.sprite(x, y + 45, "anticipation", "Anticipation_0000.png");
        anticipation.anchor.setTo(0.5, .1);
        anticipation.scale.setTo(0, 0.5);
        anticipation.animations.add("Reel_Anticipation", Phaser.Animation.generateFrameNames("Anticipation_", 0, 59, ".png", 4), 24, false);

       

        this.values.reelAnticipations.push({
            reel: reelName,
            animation: anticipation
        });
        
        // Play the first one immediatly
        if (this.values.reelAnticipations.length == 1){
             this.values.anticipationPlayedOnce = false;
            this.anticipationPlay(anticipation);
        }
    },
    removeAnticipationAnimation: function(reelName) {


        _.remove(this.values.reelAnticipations, {
            reel: reelName
        })[0].animation.destroy();

        if (this.values.reelAnticipations.length > 0) {
            this.anticipationPlay(this.values.reelAnticipations[0].animation);
        }
        else{
            bedbugGameCore.game.add.tween(this.camera).to({
                x: 1300,
                y: 780
            }, 500, Phaser.Easing.Exponential.Out, true);
             bedbugGameCore.game.add.tween(this.camera).to({
                alpha: 0
            }, 500, Phaser.Easing.Exponential.Out, true);
        }
    },
    anticipationPlay: function(anticipation) {

        if (!this.values.anticipationPlayedOnce) {
            this.values.anticipationPlayedOnce = true;
            this.camera.alpha = 1;
            // this.game.world.bringToTop(this.camera);
            bedbugGameCore.game.add.tween(this.camera).to({
                x: 1200,
                y: 600
            }, 500, Phaser.Easing.Exponential.Out, true);
        }

        anticipation.frame = 0;
        anticipation.play("Reel_Anticipation", 30, false);
        anticipation.alpha = 1;

        anticipation.events.onAnimationComplete.add(function() {
            console.log("Animation Completed!");
            anticipation.frame = 0;
        })

        bedbugGameCore.game.add.tween(anticipation.scale).to({
            x: 1.3,
            y: 1.25
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
            'font': '37px ParkLane',
            'fill': '#0b95bd',
            "align": "center",
            "stroke": "#000000",
            "strokeThickness": 6
        };

        var id_style2 = {
            'font': '40px ParkLane',
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

            start_dot = context.game.add.button(line.dots.start[0], line.dots.start[1], 'assets', null, null, "Payline_Select.png", "Payline_Normal.png", "Payline_Select.png", "Payline_Normal.png");
            start_dot.anchor.set(0.5, 0.5);
            // start_dot.alpha = 0.1;
            // start_dot.inputEnabled = true;
            start_dot.onInputOver.add(lineContext.showLine, lineContext);
            start_dot.onInputOut.add(lineContext.hideLine, lineContext);

            // lineContext.lineID1 = context.game.add.text(line.dots.start[0], line.dots.start[1], line.name, id_style);
            // lineContext.lineID1.anchor.set(0.5, 0.4);

            // lineContext.lineID1.events.onInputOver.add(lineContext.showLine, lineContext);
            //  lineContext.lineID1.events.onInputOut.add(lineContext.hideLine, lineContext);

            // lineContext.lineID2 = context.game.add.text(line.dots.start[0], line.dots.start[1], line.name, id_style2);
            // lineContext.lineID2.anchor.set(0.5, 0.4);

            // lineContext.lineID2.events.onInputOut.add(lineContext.hideLine, lineContext);
            // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
            // lineContext.lineID2.visible = false;
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

            //end_dot = context.game.add.button(line.dots.end[0], line.dots.end[1], 'line_dot', null, null, 1, 0);
            end_dot = context.game.add.button(line.dots.end[0], line.dots.end[1], 'assets', null, null, "Payline_Select.png", "Payline_Normal.png", "Payline_Select.png", "Payline_Normal.png");
            end_dot.anchor.set(0.5, 0.5);
            // end_dot.alpha = 0.1;
            end_dot.onInputOver.add(lineContext.showLine, lineContext);
            end_dot.onInputOut.add(lineContext.hideLine, lineContext);

            // lineContext.lineID1 = context.game.add.text(line.dots.end[0], line.dots.end[1], line.name, id_style);
            // lineContext.lineID1.anchor.set(0.5, 0.4);
            // // lineContext.lineID1.inputEnabled = true;
            // // lineContext.lineID1.events.onInputOver.add(lineContext.showLine, lineContext);


            // lineContext.lineID2 = context.game.add.text(line.dots.end[0], line.dots.end[1], line.name, id_style2);
            // lineContext.lineID2.anchor.set(0.5, 0.4);
            // // lineContext.lineID2.inputEnabled = true;
            // // lineContext.lineID2.events.onInputOut.add(lineContext.hideLine, lineContext);
            // // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
            // lineContext.lineID2.visible = false;
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
                // gfx.filters  = [new PIXI.filters.GlowFilter(5, 2, 1, 0x9f8cb2, 0.5)];
                gfx2.lineStyle(3, 0xdacaea, 1);
                // gfx.lineStyle(5, 0xFE0466, 1);
            }
            else
                gfx.lineStyle(5, 0xffffff, 1);
        }
        else {
            gfx.lineStyle(2, 0xffffff, .8);
        }

        lineContext.PointsLabel = null;
        lineContext.pointsbg = null;
        var style = {
            // 'font': '100px Arial',
            // 'fill': 'white'
            font: " 80px Contrail",
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
                lineContext.pointsbg = context.game.add.sprite(slot.x, slot.y, "screensmb", "WinTab_.png")
                lineContext.pointsbg.anchor.setTo(0.5, 0.5);
                lineContext.pointsbg.visible = false;
                bedbugGameCore.WinningLabelsLayerGroup.add(lineContext.pointsbg);
                lineContext.PointsLabel = context.game.add.text(slot.x, slot.y, "", style);
                lineContext.PointsLabel.anchor.setTo(.5);
                lineContext.PointsLabel.addColor('#fff', 0);
                lineContext.PointsLabel.setShadow(2, 2, 'rgba(0,0,0,0.8)', 5);
                bedbugGameCore.WinningLabelsLayerGroup.add( lineContext.PointsLabel);
                // lineContext.PointsLabel.stroke = '#c40000';
                // lineContext.PointsLabel.strokeThickness = 5;
                lineContext.PointsLabel.resolution = 2;
                
                // lineContext.PointsLabel = context.game.add.bitmapText(slot.x, slot.y, "pointfonts", "", 60);
                // lineContext.PointsLabel.anchor.setTo(0.5, 0.5);
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
        
        // if(!context.infotextarea) 
        context.infotextarea = context.game.add.text(context.game.width / 2, infoy, "", {
            "font": "bold 18px ParkLane",
            "fill": "#fff",
            "align": "center"
        })

        // if(!context.infotextarea2)    
        context.infotextarea2 = context.game.add.text(infox + 330, infoy, "", {
            "font": "bold 18px ParkLane",
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

        if(!this.continue_button) 
        this.continue_button = context.game.add.button( context.game.width/2 , 510, 'assets', upgradeStage, this, 'Continue BTN_Over.png', 'Continue BTN_Normal.png', 'Continue BTN_Select.png', 'Continue BTN_Normal.png');
        
        this.continue_button.anchor.setTo(0.5, 0.5);
        this.continue_button.scale.setTo(1, 1);
        this.continue_button.alpha = 0.01;
        this.continue_button.visible = true;
            
        var style = {
            font: "40px ParkLane",
            fill: "#fff",
            align: "center",
            
        }
        
        if(!this.continue_text)
        this.continue_text = context.game.add.text((context.game.width / 2) , 510, bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), style);
        this.continue_text.anchor.setTo(0.5, 0.5);
        this.continue_text.alpha = 0.01;
        this.continue_text.visible = true;
        // if(!this.continue_button)
        context.spinsGroup.add(this.continue_button);
        // if(!this.continue_text)
        context.spinsGroup.add(this.continue_text);
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

        // context.BonusGameGroup.addChild(context.continue_button);
        // context.BonusGameGroup.addChild(context.continue_text);
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

            // //Close Panel And Text
            // this.SpinTweenAlpha2 = context.game.add.tween(this.freeSpins).to({
            //     alpha: 0
            // }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);
            
            // this.SpinTextAlpha2 = context.game.add.tween(this.freespins_text).to({
            //     alpha: 0
            // }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);

        }, this)

        // Open The Red Background
        this.openRed(context);

        var infotextarea_text_appear = context.game.add.tween(context.infotextarea).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 3400);
        var infotextarea2_text_appear = context.game.add.tween(context.infotextarea2).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 3400);
        
        context.game.add.tween(this.continue_button).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 0);
        context.game.add.tween(this.continue_text).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 0);

        
        
        // infotextarea_text_appear.onComplete.add(upgradeStage, this);

        // function openRed() {

        // }

        function upgradeStage() {
            // context.checkBonusStageUpgrade(serverResult);
            console.log("Running Spin!!!");
            //Close Panel And Text
            this.SpinTweenAlpha2 = context.game.add.tween(this.freeSpins).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            
            this.SpinTextAlpha2 = context.game.add.tween(this.freespins_text).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            
            this.continue_button.visible = false;
            this.continue_text.visible = false;
            // context.game.add.tween(this.continue_button).to({
            // alpha: 0
            // }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
        
            // context.game.add.tween(this.continue_text).to({
            //     alpha: 0
            // }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
        
            context.spin();
        }

    },
    openRed: function(context) {
        var that = this;

        this.redBgOpen = context.game.add.tween(that.bonusBg).to({
            alpha: 1
        }, 300, Phaser.Easing.Linear.Out, true, 200, 0, false);
        context.lightsGroup.alpha = 1;
        // this.whiteBgFlash = context.game.add.tween(that.whiteBg).to({
        //     alpha: 1
        // }, 500, Phaser.Easing.Elastic.Out, true, 3000, 0, false);

        // this.whiteBgFlash.onComplete.add(function() {
        //     context.game.add.tween(that.whiteBg).to({
        //         alpha: 0
        //     }, 300, Phaser.Easing.Linear.Out, true, 200, 0, false);
        //     // this.whiteBgFadeOut = context.game.add.tween(this.whiteBg).to({ alpha: 0 }, 500, Phaser.Easing.Back.In, true, 500, 0, false);
        //     this.redBgOpen = context.game.add.tween(that.redBg).to({
        //         alpha: 1
        //     }, 500, Phaser.Easing.Linear.Out, true, 200, 0, false);
        // })
    },
    closeRed: function(context) {
        var that = this;
        this.redBgOpen = context.game.add.tween(that.bonusBg).to({
            alpha: 0
        }, 300, Phaser.Easing.Linear.Out, true, 100, 0, false);
        context.game.world.bringToTop(context.lightsGroup);
        context.lightsGroup.alpha = 0;
        // this.whiteBgFlash = context.game.add.tween(that.whiteBg).to({
        //     alpha: 1
        // }, 500, Phaser.Easing.Elastic.Out, true, 3000, 0, false);

        // this.whiteBgFlash.onComplete.add(function() {
        //     context.game.add.tween(that.whiteBg).to({
        //         alpha: 0
        //     }, 300, Phaser.Easing.Linear.Out, true, 200, 0, false);
        //     // this.whiteBgFadeOut = context.game.add.tween(this.whiteBg).to({ alpha: 0 }, 500, Phaser.Easing.Back.In, true, 500, 0, false);
        //     this.redBgOpen = context.game.add.tween(that.redBg).to({
        //         alpha: 0
        //     }, 300, Phaser.Easing.Linear.Out, true, 100, 0, false);
        // })
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
        
        var that = this;
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


        if(!this.continueEnd_button) 
        this.continueEnd_button = context.game.add.button( context.game.width/2 , 510, 'assets', proceed, this, 'Continue BTN_Over.png', 'Continue BTN_Normal.png', 'Continue BTN_Select.png', 'Continue BTN_Normal.png');
        
        this.continueEnd_button.anchor.setTo(0.5, 0.5);
        this.continueEnd_button.scale.setTo(1, 1);
        this.continueEnd_button.alpha = 0.01;
        this.continueEnd_button.visible = true;

        
        var style = {
            font: "40px ParkLane",
            fill: "#fff",
            align: "center",
            
        }
        
        if(!this.continueEnd_text)
        this.continueEnd_text = context.game.add.text((context.game.width / 2) , 510, bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), style);
        
        this.continueEnd_text.anchor.setTo(0.5, 0.5);
        this.continueEnd_text.alpha = 0.01;
        this.continueEnd_text.visible = true;
        // DISPLAY Free Spins Panel
        context.game.world.bringToTop(context.spinsGroup);
        // console.log("TWEENING FREESPINS");
        this.SpinTweenEndAlpha = context.game.add.tween(this.freeSpins).to({
            alpha: 1
        }, 300, Phaser.Easing.Quadratic.Out, true);
        this.SpinTweenEndScale = context.game.add.tween(this.freeSpins.scale).from({
            x: 0.8,
            y: 0.8
        }, 300, Phaser.Easing.Back.Out, true);

        context.game.add.tween(this.continueEnd_button).to({
            alpha: 1
        }, 300, Phaser.Easing.Quadratic.Out, true);
        
        context.game.add.tween(this.continueEnd_text).to({
            alpha: 1
        }, 300, Phaser.Easing.Quadratic.Out, true);

        // Update the Text
        this.freespins_text.setText(bedbugGameCore.getLocalizedText('MSG_FREE_SPINS_END').replace("$(1)", bedbugGameCore.bonus_total_coins + "\n").replace("$(2)", "\n" + bedbugGameCore.bonus_total_free_spins));
        this.freespins_text.fontSize = 60;


        
        
        // if(!this.continueEnd_button)
        context.spinsGroup.add(this.continueEnd_button);
        // if(!this.continueEnd_text)
        context.spinsGroup.add(this.continueEnd_text);    

        //context.game.bringToTop(this.spinsGroup);
        this.SpinTweenEndAlpha.onComplete.add(function() {
            // console.log("CLOSING FREESPINS");
            //Open Text
            this.SpinTextEndAlpha = context.game.add.tween(this.freespins_text).to({
                alpha: 1
            }, 300, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

            
            // proceed();
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
            console.log("Running Proceed!!!");
            // Close Texts
            //Close Panel And Text
            that.SpinTweenEndAlpha = context.game.add.tween(that.freeSpins).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            that.SpinTextEndAlpha = context.game.add.tween(that.freespins_text).to({
                alpha: 0
            }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            // Close Button
            that.continueEnd_button.visible = false;
            that.continueEnd_text.visible = false;
            // context.game.add.tween(that.continueEnd_button).to({
            //     alpha: 0
            // }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            // context.game.add.tween(that.continueEnd_text).to({
            //     alpha: 0
            // }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            
            var stage_alpha = context.game.add.tween(context.BonusGameGroup).to({
                alpha: 0
            }, 500, Phaser.Easing.Exponential.Out, true, 1000);

            // var clouds_appear = context.game.add.tween(context.clouds).to({
            //   y: -379
            // }, 1000, Phaser.Easing.Exponential.Out, true);

            stage_alpha.onComplete.add(function() {
                context.BonusGameGroup.destroy(true);
            })

            bedbugGameCore.bonus_total_coins = 0;

            bedbugGameCore.controls_enabled = true;

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
                        }
                    }, waitTime);
                    return;
                }
                else {
                    Controls.showPlay();
                    Controls.showControls(context.game);
                }

            }
            else {
                Controls.showPlay();
                Controls.showControls(context.game);
            }
        }


    },
    /*********************************************************************************************
     *  Create Themed Winning Bannners
     *  This method is called when only if it exists
     *  and creates banners with animation and sprites
     *  
     *********************************************************************************************/
    createWinningBanners: function(context) {
        // console.log("WINNING BANNERS FROM THEME!!!!!!")
            // Create default winning banner
        var reelY = bedbugGameCore.game_specs.grid.y + (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows);
        // bedbugGameCore.winLabel = context.game.add.graphics(0, reelY - 300);
        // bedbugGameCore.winLabel.beginFill(0x000, 0.5);
        // bedbugGameCore.winLabel.drawRect(0, 0, bedbugGameCore.game.world.width, 100);
        // bedbugGameCore.winLabel.endFill();

        bedbugGameCore.winLabel = context.game.add.sprite(0, (context.game.height / 2) - 52, 'screensmb', 'win-small.png');
        bedbugGameCore.winLabel.scale.setTo(1, .7);
        bedbugGameCore.winLabel.anchor.setTo(0, 0.5);

        var pointsBg
            // console.log("Styles for win labels should be assigned in themes.");
        var style = Theme.styles.win_label;

        // {
        //   font: "bold 60px TimesNewRoman",
        //   fill: "#fff",
        //   align: "center",
        //   // backgroundColor: "#ffff00" 
        // };

        var style2 = Theme.styles.big_win_label;
        // {
        //   font: " 140px TimesNewRoman Black",
        //   fill: "#fff",
        //   align: "center",
        //   // backgroundColor: "#ffff00" 
        // };


        bedbugGameCore.winLabel_text = context.game.add.text(0, 0, "WIN: 40", style);
        // bedbugGameCore.winLabel_text.addChild(button_label);
        bedbugGameCore.winLabel_text.anchor.setTo(0.5, 0.5);
        bedbugGameCore.winLabel_text.x = bedbugGameCore.getGridCenter().x; //bedbugGameCore.winLabel.x + bedbugGameCore.winLabel.width / 2;
        bedbugGameCore.winLabel_text.y = bedbugGameCore.winLabel.y;
        bedbugGameCore.winLabel_text.addColor('#fff', 4);

        // If Theme does not use bitmap font use regular text for the big win coins count label
        if (!Theme.styles.big_win_label.bitmapFont) {
            bedbugGameCore.bigwinLabel_text = context.game.add.text((context.game.width / 2) + 30, (context.game.height / 2) + 60, "", style2);
            bedbugGameCore.bigwinLabel_text.addColor('#FFFFFF', 0);
            bedbugGameCore.bigwinLabel_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
            bedbugGameCore.bigwinLabel_text.anchor.setTo(0.5, 0.5);
        }
        // Else use the bitmap font supplied in the Theme's style section
        else {
            bedbugGameCore.bigwinLabel_text = context.game.add.bitmapText((context.game.width / 2) - 10, (context.game.height / 2) + 50, Theme.styles.big_win_label.bitmapFont, "", 170);
            bedbugGameCore.bigwinLabel_text.anchor.setTo(0.5, 0.5);
        }

        bedbugGameCore.bigwinLabel_text.visible = false;
        bedbugGameCore.winLabel.visible = false;
        bedbugGameCore.winLabel_text.visible = false;


        if (bedbugGameCore.game.device.desktop) {
            bedbugGameCore.winLabel_text.resolution = 2;
            if (!Theme.styles.big_win_label.bitmapFont)
                bedbugGameCore.bigwinLabel_text.resolution = 2;
        }
    }
}
