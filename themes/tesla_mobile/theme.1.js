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
            font: "bold 60px TimesNewRoman",
            fill: "#fff",
            align: "center",
        },
        big_win_label: {
            font: " 140px TimesNewRoman Black",
            fill: "#fff",
            align: "center",
        },
        freespin_label: {
            font: " 90px TimesNewRoman",
            fill: "#fff",
            align: "center",
        }
    },
    logoOriginalPostition: null,
    logoBonusPosition: null,
    create: function(context) {

        var that = this;

        var game_background = context.game.add.sprite(0, 0, 'mobile');
        game_background.frameName = "GameBack.jpg";

        game_background.height = context.game.height;
        game_background.width = context.game.width;

        //LOGO
        var LogoAnim = context.game.add.sprite(276, -45, "logoloop");
        LogoAnim.animations.add("logoloop");
        LogoAnim.anchor.setTo(0.5, 0);
        var animationName = "Logo-Loop_";
        //  //console.log(animationName);
        LogoAnim.animations.add("logo", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 5), 24, true);
        LogoAnim.animations.play("logo");

        // // LEFT LIGHTNINGS
        // this.FXGroup = context.game.add.group();
        // this.leftLightnings = context.game.add.sprite(0, 0, "effects");
        // this.leftLightnings.frameName = "Lightning_Left_00001.png";
        // this.leftLightnings.animations.add("effects");
        // this.leftLightnings.anchor.setTo(0, 0);
        // this.leftLightnings.scale.setTo(1.23, 1.23);
        // this.FXGroup.add(this.leftLightnings);

        // var animationName = "Lightning_Left_";
        // //  //console.log(animationName);
        // this.leftLightnings.animations.add("lightningL", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 5), 24, true);
        // //leftLightnings.animations.play("lightningL");

        // this.engineLeft = context.add.sprite(54, 345, "symbols2")
        // this.engineLeft.frameName = "leftPower.png";
        // this.engineLeft.alpha = 1.0;

        // this.FXGroup.add(this.engineLeft);

        // // RIGHT LIGHTNINGS
        // //this.LeftLightningsGroup = this.game.add.group();
        // this.rightLightnings = context.game.add.sprite(context.game.width, 0, "effects");
        // this.rightLightnings.frameName = "Lightning_Right_00001.png";
        // this.rightLightnings.animations.add("effects");
        // this.rightLightnings.anchor.setTo(1, 0);
        // this.rightLightnings.scale.setTo(1.23, 1.23);
        // this.FXGroup.add(this.rightLightnings);

        // var animationName = "Lightning_Right_";
        // //  //console.log(animationName);
        // this.rightLightnings.animations.add("lightningR", Phaser.Animation.generateFrameNames(animationName, 0, 29, '.png', 5), 24, true);
        // //rightLightnings.animations.play("lightningR");

        // this.engineRight = context.add.sprite(context.game.width -17, 428, "symbols2")
        // this.engineRight.frameName = "rightPower.png";
        // this.engineRight.anchor.setTo(1, 0);
        // this.engineRight.alpha = 1.0;

        // this.FXGroup.add(this.engineRight);
        // this.FXGroup.visible = false;

        this.closeEngines = function() {
            // this.FXGroup.visible = false;
            // context.game.tweens.removeFrom(this.engineRight);
            // context.game.tweens.removeFrom(this.engineLeft);
            // this.leftLightnings.animations.stop(null, true);
            // this.rightLightnings.animations.stop(null, true);
        }

        this.openEngines = function() {
            // this.FXGroup.visible = true;
            // var scope = this;

            // // Stage 1 - Open Engines
            // this.leftEngineStart = context.game.add.tween(this.engineLeft).from({ alpha: 0 }, 300, "Elastic.easeOut", true, 0, 0, false);
            // this.rightEngineStart = context.game.add.tween(this.engineRight).from({ alpha: 0 }, 300, "Elastic.easeOut", true, 0, 0, false); 

            // setTimeout(function(){
            //     scope.engineLeft.alpha = 0;
            //     scope.engineRight.alpha = 0;
            //     // Stage 2 - Engines Workings
            //     scope.leftEngineAnim = context.game.add.tween(scope.engineLeft).from({ alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 0, 1000, true);
            //     scope.leftEngineAnim.yoyo(true, 200);

            //     scope.rightEngineAnim = context.game.add.tween(scope.engineRight).from({alpha: 1}, 750, Phaser.Easing.Linear.None, true, 0, 1000, true);
            //     scope.rightEngineAnim.yoyo(true, 200); 

            //     scope.leftEngineStart.chain(scope.leftEngineAnim);
            //     scope.rightEngineStart.chain(scope.leftEngineAnim);
            // },1000);


            // setTimeout(function(){
            //  // Stage 3 - Open Effects
            //     scope.leftLightnings.animations.play("lightningL");
            //     scope.rightLightnings.animations.play("lightningR");
            // },2000);



        }

        //this.openEngines();

        // Lights
        // var LightsGroup = context.game.add.group();
        // var lampL1 = context.add.sprite((context.game.width / 2) - 215, 120, "symbols2")
        // lampL1.frameName = "lamp.png";
        // lampL1.anchor.setTo(.5, 1);
        // lampL1.alpha = 0.0;
        // var lampL2 = context.add.sprite((context.game.width / 2) - 272, 120, "symbols2")
        // lampL2.frameName = "lamp.png";
        // lampL2.anchor.setTo(.5, 1);
        // lampL2.alpha = 0.0;
        // var lampL3 = context.add.sprite((context.game.width / 2) - 325, 120, "symbols2")
        // lampL3.frameName = "lamp.png";
        // lampL3.anchor.setTo(.5, 1);
        // lampL3.alpha = 0.0;
        // LightsGroup.add(lampL1);
        // LightsGroup.add(lampL2);
        // LightsGroup.add(lampL3);

        // var lampR1 = context.add.sprite((context.game.width / 2) + 217, 118, "symbols2")
        // lampR1.frameName = "lamp.png";
        // lampR1.anchor.setTo(.5, 1);
        // lampR1.alpha = 0.0;
        // var lampR2 = context.add.sprite((context.game.width / 2) + 274, 118, "symbols2")
        // lampR2.frameName = "lamp.png";
        // lampR2.anchor.setTo(.5, 1);
        // lampR2.alpha = 0.0;
        // var lampR3 = context.add.sprite((context.game.width / 2) + 330, 118, "symbols2")
        // lampR3.frameName = "lamp.png";
        // lampR3.anchor.setTo(.5, 1);
        // lampR3.alpha = 0.0;

        // this.LampL1Tween = context.game.add.tween(lampL1).to({
        //     alpha: 1
        // }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true);
        // this.LampL1Tween.yoyo(true, 300);
        // this.LampR1Tween = context.game.add.tween(lampR1).to({
        //     alpha: 1
        // }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true);
        // this.LampR1Tween.yoyo(true, 300);

        // setTimeout(function() {
        //     this.LampL2Tween = context.game.add.tween(lampL2).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true)
        //     this.LampL2Tween.yoyo(true, 350);

        //     this.LampR2Tween = context.game.add.tween(lampR2).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true)
        //     this.LampR2Tween.yoyo(true, 350);
        // }, 200);

        // setTimeout(function() {
        //     this.LampL3Tween = context.game.add.tween(lampL3).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true)
        //     this.LampL3Tween.yoyo(true, 400);
        //     this.LampR3Tween = context.game.add.tween(lampR3).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true)
        //     this.LampR3Tween.yoyo(true, 400);
        // }, 2000);

        // LightsGroup.add(lampR1);
        // LightsGroup.add(lampR2);
        // LightsGroup.add(lampR3);
        // LightsGroup.visible = false;


        // lamp Tweens
        this.openLights = function() {

                //LightsGroup.visible = true;

                //setTimeout(function () {var LampL3Tween = context.game.add.tween(lampL3).to( { alpha: 1 }, 600, Phaser.Easing.Linear.None, true, 0, 1000, true)}, 200);
            }
            //openLights();

        this.closeLights = function() {
            // LightsGroup.visible = false;
            // if(this.LampL1Tween) {this.LampL1Tween.stop()};
            // if(this.LampL2Tween) {this.LampL2Tween.stop()};
            // if(this.LampL3Tween) {this.LampL3Tween.stop()};
            // this.LampR1Tween.stop();
            // this.LampL2Tween.stop();
            // this.LampR2Tween.stop();
            // this.LampL3Tween.stop();
            // this.LampR3Tween.stop();

        }

        this.closeLights();
        // LINES
        this.linesGroup = context.add.group();
        this.values.lines["line01"] = context.add.group();
        var line1_a = context.game.add.tileSprite(330, 330, 620, 100, "uiassets");
        line1_a.animations.add("uiassets");
        line1_a.anchor.setTo(.0, .35);
        line1_a.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line1_a.animations.play("winline");
        this.values.lines["line01"].add(line1_a);
        this.linesGroup.add(this.values.lines["line01"]);

        this.values.lines["line02"] = context.add.group();
        var line2_a = context.game.add.tileSprite(330, 185, 620, 100, "uiassets");
        line2_a.animations.add("uiassets");
        line2_a.anchor.setTo(.0, .35);
        line2_a.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line2_a.animations.play("winline");
        this.values.lines["line02"].add(line2_a);
        this.linesGroup.add(this.values.lines["line02"]);

        this.values.lines["line03"] = context.add.group();
        var line3_a = context.game.add.tileSprite(330, 480, 620, 100, "uiassets");
        line3_a.animations.add("uiassets");
        line3_a.anchor.setTo(.0, .35);
        line3_a.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line3_a.animations.play("winline");
        this.values.lines["line03"].add(line3_a);
        this.linesGroup.add(this.values.lines["line03"]);

        this.values.lines["line04"] = context.add.group();
        var line_a2_b3 = context.game.add.tileSprite(330, 330, 235, 100, "uiassets");
        line_a2_b3.animations.add("uiassets");
        line_a2_b3.anchor.setTo(.0, .35);
        line_a2_b3.angle = 45;
        line_a2_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a2_b3.animations.play("winline");
        this.values.lines["line04"].add(line_a2_b3);
        var line_b3_d1 = context.game.add.tileSprite(484, 496, 438, 100, "uiassets");
        line_b3_d1.animations.add("uiassets");
        line_b3_d1.anchor.setTo(.0, .35);
        line_b3_d1.angle = -45;
        line_b3_d1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_b3_d1.animations.play("winline");
        this.values.lines["line04"].add(line_b3_d1);
        var line_d1_e2 = context.game.add.tileSprite(800, 185, 220, 100, "uiassets");
        line_d1_e2.animations.add("uiassets");
        line_d1_e2.anchor.setTo(.0, .35);
        line_d1_e2.angle = 45;
        line_d1_e2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_d1_e2.animations.play("winline");
        this.values.lines["line04"].add(line_d1_e2);
        // this.values.lines["line04"].visible = false;
        this.linesGroup.add(this.values.lines["line04"]);

        this.values.lines["line05"] = context.add.group();
        var line_a1_c3 = context.game.add.tileSprite(335, 185, 440, 100, "uiassets");
        line_a1_c3.animations.add("uiassets");
        line_a1_c3.anchor.setTo(.0, .35);
        line_a1_c3.angle = 45;
        line_a1_c3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a1_c3.animations.play("winline");
        this.values.lines["line05"].add(line_a1_c3);
        var line_c3_e1 = context.game.add.tileSprite(635, 495, 440, 100, "uiassets");
        line_c3_e1.animations.add("uiassets");
        line_c3_e1.anchor.setTo(.0, .35);
        line_c3_e1.angle = -45;
        line_c3_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_c3_e1.animations.play("winline");
        this.values.lines["line05"].add(line_c3_e1);
        // this.values.lines["line05"].visible = false;
        this.linesGroup.add(this.values.lines["line05"]);

        this.values.lines["line06"] = context.add.group();
        var line_a3_c1 = context.game.add.tileSprite(320, 500, 448, 100, "uiassets");
        line_a3_c1.animations.add("uiassets");
        line_a3_c1.anchor.setTo(.0, .35);
        line_a3_c1.angle = -45;
        line_a3_c1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a3_c1.animations.play("winline");
        this.values.lines["line06"].add(line_a3_c1);
        var line_c3_e3 = context.game.add.tileSprite(645, 185, 440, 100, "uiassets");
        line_c3_e3.animations.add("uiassets");
        line_c3_e3.anchor.setTo(.0, .35);
        line_c3_e3.angle = 45;
        line_c3_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_c3_e3.animations.play("winline");
        this.values.lines["line06"].add(line_c3_e3);
        //line6.visible = false;
        this.linesGroup.add(this.values.lines["line06"]);

        this.values.lines["line07"] = context.add.group();
        var line_a2_b1 = context.game.add.tileSprite(330, 330, 220, 100, "uiassets");
        line_a2_b1.animations.add("uiassets");
        line_a2_b1.anchor.setTo(.0, .35);
        line_a2_b1.angle = -45;
        line_a2_b1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a2_b1.animations.play("winline");
        this.values.lines["line07"].add(line_a2_b1);
        var line_b1_c2 = context.game.add.tileSprite(490, 170, 230, 100, "uiassets");
        line_b1_c2.animations.add("uiassets");
        line_b1_c2.anchor.setTo(.0, .35);
        line_b1_c2.angle = 45;
        line_b1_c2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_b1_c2.animations.play("winline");
        this.values.lines["line07"].add(line_b1_c2);
        var line_c2_d1 = context.game.add.tileSprite(640, 330, 220, 100, "uiassets");
        line_c2_d1.animations.add("uiassets");
        line_c2_d1.anchor.setTo(.0, .35);
        line_c2_d1.angle = -45;
        line_c2_d1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_c2_d1.animations.play("winline");
        this.values.lines["line07"].add(line_c2_d1);
        var line_d1_e2 = context.game.add.tileSprite(800, 170, 230, 100, "uiassets");
        line_d1_e2.animations.add("uiassets");
        line_d1_e2.anchor.setTo(.0, .35);
        line_d1_e2.angle = 45;
        line_d1_e2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_d1_e2.animations.play("winline");
        this.values.lines["line07"].add(line_d1_e2);
        //line7.visible = false;
        this.linesGroup.add(this.values.lines["line07"]);

        this.values.lines["line08"] = context.add.group();
        var line_a1_b3 = context.game.add.tileSprite(335, 180, 365, 100, "uiassets");
        line_a1_b3.animations.add("uiassets");
        line_a1_b3.anchor.setTo(.0, .35);
        line_a1_b3.angle = 63;
        line_a1_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a1_b3.animations.play("winline");
        this.values.lines["line08"].add(line_a1_b3);
        var line_b3_d1 = context.game.add.tileSprite(487, 503, 445, 100, "uiassets");
        line_b3_d1.animations.add("uiassets");
        line_b3_d1.anchor.setTo(.0, .35);
        line_b3_d1.angle = -47;
        line_b3_d1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_b3_d1.animations.play("winline");
        this.values.lines["line08"].add(line_b3_d1);
        var line_d1_e3 = context.game.add.tileSprite(800, 180, 360, 100, "uiassets");
        line_d1_e3.animations.add("uiassets");
        line_d1_e3.anchor.setTo(.0, .35);
        line_d1_e3.angle = 63;
        line_d1_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_d1_e3.animations.play("winline");
        this.values.lines["line08"].add(line_d1_e3);
        //line8.visible = false;
        this.linesGroup.add(this.values.lines["line08"]);

        this.values.lines["line09"] = context.add.group();
        var line_a3_b1 = context.game.add.tileSprite(320, 500, 358, 100, "uiassets");
        line_a3_b1.animations.add("uiassets");
        line_a3_b1.anchor.setTo(.0, .35);
        line_a3_b1.angle = -63;
        line_a3_b1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a3_b1.animations.play("winline");
        this.values.lines["line09"].add(line_a3_b1);
        var line_b1_c2b = context.game.add.tileSprite(490, 180, 220, 100, "uiassets");
        line_b1_c2b.animations.add("uiassets");
        line_b1_c2b.anchor.setTo(.0, .35);
        line_b1_c2b.angle = 45;
        line_b1_c2b.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_b1_c2b.animations.play("winline");
        this.values.lines["line09"].add(line_b1_c2b);
        var line_c2_d1b = context.game.add.tileSprite(635, 335, 222, 100, "uiassets");
        line_c2_d1b.animations.add("uiassets");
        line_c2_d1b.anchor.setTo(.0, .35);
        line_c2_d1b.angle = -45;
        line_c2_d1b.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_c2_d1b.animations.play("winline");
        this.values.lines["line09"].add(line_c2_d1b);
        var line_d1_e3b = context.game.add.tileSprite(800, 180, 360, 100, "uiassets");
        line_d1_e3b.animations.add("uiassets");
        line_d1_e3b.anchor.setTo(.0, .35);
        line_d1_e3b.angle = 63;
        line_d1_e3b.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_d1_e3b.animations.play("winline");
        this.values.lines["line09"].add(line_d1_e3b);
        //line9.visible = false;
        this.linesGroup.add(this.values.lines["line09"]);

        this.values.lines["line10"] = context.add.group();
        var line_a2_b1b = context.game.add.tileSprite(330, 330, 220, 100, "uiassets");
        line_a2_b1b.animations.add("uiassets");
        line_a2_b1b.anchor.setTo(.0, .35);
        line_a2_b1b.angle = -45;
        line_a2_b1b.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_a2_b1b.animations.play("winline");
        this.values.lines["line10"].add(line_a2_b1b);
        var line_b1_d3 = context.game.add.tileSprite(490, 175, 440, 100, "uiassets");
        line_b1_d3.animations.add("uiassets");
        line_b1_d3.anchor.setTo(.0, .35);
        line_b1_d3.angle = 45;
        line_b1_d3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_b1_d3.animations.play("winline");
        this.values.lines["line10"].add(line_b1_d3);
        var line_d3_e2 = context.game.add.tileSprite(790, 485, 220, 100, "uiassets");
        line_d3_e2.animations.add("uiassets");
        line_d3_e2.anchor.setTo(.0, .35);
        line_d3_e2.angle = -45;
        line_d3_e2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line_d3_e2.animations.play("winline");
        this.values.lines["line10"].add(line_d3_e2);
        //line10.visible = false;
        this.linesGroup.add(this.values.lines["line10"]);

        this.values.lines["line11"] = context.add.group();
        var line11_a1_b2 = context.game.add.tileSprite(330, 180, 228, 100, "uiassets");
        line11_a1_b2.animations.add("uiassets");
        line11_a1_b2.anchor.setTo(.0, .35);
        line11_a1_b2.angle = 45;
        line11_a1_b2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line11_a1_b2.animations.play("winline");
        this.values.lines["line11"].add(line11_a1_b2);
        var line11_b2_c1 = context.game.add.tileSprite(480, 340, 222, 100, "uiassets");
        line11_b2_c1.animations.add("uiassets");
        line11_b2_c1.anchor.setTo(.0, .35);
        line11_b2_c1.angle = -45;
        line11_b2_c1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line11_b2_c1.animations.play("winline");
        this.values.lines["line11"].add(line11_b2_c1);
        var line11_c1_d2 = context.game.add.tileSprite(645, 185, 220, 100, "uiassets");
        line11_c1_d2.animations.add("uiassets");
        line11_c1_d2.anchor.setTo(.0, .35);
        line11_c1_d2.angle = 45;
        line11_c1_d2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line11_c1_d2.animations.play("winline");
        this.values.lines["line11"].add(line11_c1_d2);
        var line11_d2_e1 = context.game.add.tileSprite(787, 340, 220, 100, "uiassets");
        line11_d2_e1.animations.add("uiassets");
        line11_d2_e1.anchor.setTo(.0, .35);
        line11_d2_e1.angle = -45;
        line11_d2_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line11_d2_e1.animations.play("winline");
        this.values.lines["line11"].add(line11_d2_e1);
        //line11.visible = false;
        this.linesGroup.add(this.values.lines["line11"]);

        this.values.lines["line12"] = context.add.group();
        var line12_a3_b2 = context.game.add.tileSprite(330, 485, 219, 100, "uiassets");
        line12_a3_b2.animations.add("uiassets");
        line12_a3_b2.anchor.setTo(.0, .35);
        line12_a3_b2.angle = -45;
        line12_a3_b2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line12_a3_b2.animations.play("winline");
        this.values.lines["line12"].add(line12_a3_b2);
        var line12_b2_c3 = context.game.add.tileSprite(490, 330, 221, 100, "uiassets");
        line12_b2_c3.animations.add("uiassets");
        line12_b2_c3.anchor.setTo(.0, .35);
        line12_b2_c3.angle = 45;
        line12_b2_c3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line12_b2_c3.animations.play("winline");
        this.values.lines["line12"].add(line12_b2_c3);
        var line12_c3_d2 = context.game.add.tileSprite(635, 485, 222, 100, "uiassets");
        line12_c3_d2.animations.add("uiassets");
        line12_c3_d2.anchor.setTo(.0, .35);
        line12_c3_d2.angle = -45;
        line12_c3_d2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line12_c3_d2.animations.play("winline");
        this.values.lines["line12"].add(line12_c3_d2);
        var line12_d2_e3 = context.game.add.tileSprite(800, 330, 230, 100, "uiassets");
        line12_d2_e3.animations.add("uiassets");
        line12_d2_e3.anchor.setTo(.0, .35);
        line12_d2_e3.angle = 45;
        line12_d2_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line12_d2_e3.animations.play("winline");
        this.values.lines["line12"].add(line12_d2_e3);
        //line12.visible = false;
        this.linesGroup.add(this.values.lines["line12"]);

        this.values.lines["line13"] = context.add.group();
        var line13_a2_b3 = context.game.add.tileSprite(330, 330, 228, 100, "uiassets");
        line13_a2_b3.animations.add("uiassets");
        line13_a2_b3.anchor.setTo(.0, .35);
        line13_a2_b3.angle = 45;
        line13_a2_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line13_a2_b3.animations.play("winline");
        this.values.lines["line13"].add(line13_a2_b3);
        var line13_b3_c2 = context.game.add.tileSprite(480, 490, 225, 100, "uiassets");
        line13_b3_c2.animations.add("uiassets");
        line13_b3_c2.anchor.setTo(.0, .35);
        line13_b3_c2.angle = -45;
        line13_b3_c2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line13_b3_c2.animations.play("winline");
        this.values.lines["line13"].add(line13_b3_c2);
        var line13_c2_d3 = context.game.add.tileSprite(645, 330, 228, 100, "uiassets");
        line13_c2_d3.animations.add("uiassets");
        line13_c2_d3.anchor.setTo(.0, .35);
        line13_c2_d3.angle = 45;
        line13_c2_d3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line13_c2_d3.animations.play("winline");
        this.values.lines["line13"].add(line13_c2_d3);
        var line13_d3_e1 = context.game.add.tileSprite(792, 492, 345, 100, "uiassets");
        line13_d3_e1.animations.add("uiassets");
        line13_d3_e1.anchor.setTo(.0, .35);
        line13_d3_e1.angle = -63;
        line13_d3_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line13_d3_e1.animations.play("winline");
        this.values.lines["line13"].add(line13_d3_e1);
        //line13.visible = false;
        this.linesGroup.add(this.values.lines["line13"]);

        this.values.lines["line14"] = context.add.group();
        var line14_a1_b2 = context.game.add.tileSprite(330, 180, 233, 100, "uiassets");
        line14_a1_b2.animations.add("uiassets");
        line14_a1_b2.anchor.setTo(.0, .35);
        line14_a1_b2.angle = 45;
        line14_a1_b2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line14_a1_b2.animations.play("winline");
        this.values.lines["line14"].add(line14_a1_b2);
        var line14_b2_d2 = context.game.add.tileSprite(485, 340, 310, 100, "uiassets");
        line14_b2_d2.animations.add("uiassets");
        line14_b2_d2.anchor.setTo(.0, .35);
        line14_b2_d2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line14_b2_d2.animations.play("winline");
        this.values.lines["line14"].add(line14_b2_d2);
        var line14_d2_e1 = context.game.add.tileSprite(786, 344, 220, 100, "uiassets");
        line14_d2_e1.animations.add("uiassets");
        line14_d2_e1.anchor.setTo(.0, .35);
        line14_d2_e1.angle = -45;
        line14_d2_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line14_d2_e1.animations.play("winline");
        this.values.lines["line14"].add(line14_d2_e1);
        //this.values.lines["line14"].visible = false;
        this.linesGroup.add(this.values.lines["line14"]);

        this.values.lines["line15"] = context.add.group();
        var line15_a3_b2 = context.game.add.tileSprite(330, 485, 225, 100, "uiassets");
        line15_a3_b2.animations.add("uiassets");
        line15_a3_b2.anchor.setTo(.0, .35);
        line15_a3_b2.angle = -45;
        line15_a3_b2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line15_a3_b2.animations.play("winline");
        this.values.lines["line15"].add(line15_a3_b2);
        var line15_b2_d2 = context.game.add.tileSprite(485, 330, 315, 100, "uiassets");
        line15_b2_d2.animations.add("uiassets");
        line15_b2_d2.anchor.setTo(.0, .35);
        line15_b2_d2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line15_b2_d2.animations.play("winline");
        this.values.lines["line15"].add(line15_b2_d2);
        var line15_d2_e3 = context.game.add.tileSprite(800, 330, 230, 100, "uiassets");
        line15_d2_e3.animations.add("uiassets");
        line15_d2_e3.anchor.setTo(.0, .35);
        line15_d2_e3.angle = 45;
        line15_d2_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line15_d2_e3.animations.play("winline");
        this.values.lines["line15"].add(line15_d2_e3);
        //this.values.lines["line15"].visible = false;
        this.linesGroup.add(this.values.lines["line15"]);

        this.values.lines["line16"] = context.add.group();
        var line16_a2_b1 = context.game.add.tileSprite(330, 330, 220, 100, "uiassets");
        line16_a2_b1.animations.add("uiassets");
        line16_a2_b1.anchor.setTo(.0, .35);
        line16_a2_b1.angle = -45;
        line16_a2_b1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line16_a2_b1.animations.play("winline");
        this.values.lines["line16"].add(line16_a2_b1);
        var line16_b1_c3 = context.game.add.tileSprite(490, 175, 360, 100, "uiassets");
        line16_b1_c3.animations.add("uiassets");
        line16_b1_c3.anchor.setTo(.0, .35);
        line16_b1_c3.angle = 64;
        line16_b1_c3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line16_b1_c3.animations.play("winline");
        this.values.lines["line16"].add(line16_b1_c3);
        var line16_c3_d1 = context.game.add.tileSprite(630, 500, 360, 100, "uiassets");
        line16_c3_d1.animations.add("uiassets");
        line16_c3_d1.anchor.setTo(.0, .35);
        line16_c3_d1.angle = -63;
        line16_c3_d1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line16_c3_d1.animations.play("winline");
        this.values.lines["line16"].add(line16_c3_d1);
        var line16_d1_e2 = context.game.add.tileSprite(800, 170, 230, 100, "uiassets");
        line16_d1_e2.animations.add("uiassets");
        line16_d1_e2.anchor.setTo(.0, .35);
        line16_d1_e2.angle = 45;
        line16_d1_e2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line16_d1_e2.animations.play("winline");
        this.values.lines["line16"].add(line16_d1_e2);
        //this.values.lines["line16"].visible = false;
        this.linesGroup.add(this.values.lines["line16"]);

        this.values.lines["line17"] = context.add.group();
        var line17_a1_b3 = context.game.add.tileSprite(330, 180, 358, 100, "uiassets");
        line17_a1_b3.animations.add("uiassets");
        line17_a1_b3.anchor.setTo(.0, .35);
        line17_a1_b3.angle = 63;
        line17_a1_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line17_a1_b3.animations.play("winline");
        this.values.lines["line17"].add(line17_a1_b3);
        var line17_b3_c1 = context.game.add.tileSprite(475, 500, 350, 100, "uiassets");
        line17_b3_c1.animations.add("uiassets");
        line17_b3_c1.anchor.setTo(.0, .35);
        line17_b3_c1.angle = -63;
        line17_b3_c1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line17_b3_c1.animations.play("winline");
        this.values.lines["line17"].add(line17_b3_c1);
        var line17_c1_d3 = context.game.add.tileSprite(645, 185, 360, 100, "uiassets");
        line17_c1_d3.animations.add("uiassets");
        line17_c1_d3.anchor.setTo(.0, .35);
        line17_c1_d3.angle = 63;
        line17_c1_d3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line17_c1_d3.animations.play("winline");
        this.values.lines["line17"].add(line17_c1_d3);
        var line17_d3_e1 = context.game.add.tileSprite(790, 510, 350, 100, "uiassets");
        line17_d3_e1.animations.add("uiassets");
        line17_d3_e1.anchor.setTo(.0, .35);
        line17_d3_e1.angle = -64;
        line17_d3_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line17_d3_e1.animations.play("winline");
        this.values.lines["line17"].add(line17_d3_e1);
        //line17.visible = false;
        this.linesGroup.add(this.values.lines["line17"]);

        this.values.lines["line18"] = context.add.group();
        var line18_a3_b1 = context.game.add.tileSprite(320, 500, 360, 100, "uiassets");
        line18_a3_b1.animations.add("uiassets");
        line18_a3_b1.anchor.setTo(.0, .35);
        line18_a3_b1.angle = -63;
        line18_a3_b1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line18_a3_b1.animations.play("winline");
        this.values.lines["line18"].add(line18_a3_b1);
        var line18_b1_c3 = context.game.add.tileSprite(492, 175, 360, 100, "uiassets");
        line18_b1_c3.animations.add("uiassets");
        line18_b1_c3.anchor.setTo(.0, .35);
        line18_b1_c3.angle = 65;
        line18_b1_c3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line18_b1_c3.animations.play("winline");
        this.values.lines["line18"].add(line18_b1_c3);
        var line18_c3_d1 = context.game.add.tileSprite(628, 500, 360, 100, "uiassets");
        line18_c3_d1.animations.add("uiassets");
        line18_c3_d1.anchor.setTo(.0, .35);
        line18_c3_d1.angle = -63;
        line18_c3_d1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line18_c3_d1.animations.play("winline");
        this.values.lines["line18"].add(line18_c3_d1);
        var line18_d1_e3 = context.game.add.tileSprite(800, 180, 360, 100, "uiassets");
        line18_d1_e3.animations.add("uiassets");
        line18_d1_e3.anchor.setTo(.0, .35);
        line18_d1_e3.angle = 63;
        line18_d1_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line18_d1_e3.animations.play("winline");
        this.values.lines["line18"].add(line18_d1_e3);
        //this.values.lines["line18"].visible = false;
        this.linesGroup.add(this.values.lines["line18"]);

        this.values.lines["line19"] = context.add.group();
        var line19_a2_b3 = context.game.add.tileSprite(330, 330, 230, 100, "uiassets");
        line19_a2_b3.animations.add("uiassets");
        line19_a2_b3.anchor.setTo(.0, .35);
        line19_a2_b3.angle = 45;
        line19_a2_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line19_a2_b3.animations.play("winline");
        this.values.lines["line19"].add(line19_a2_b3);
        var line19_b3_c1 = context.game.add.tileSprite(480, 500, 350, 100, "uiassets");
        line19_b3_c1.animations.add("uiassets");
        line19_b3_c1.anchor.setTo(.0, .35);
        line19_b3_c1.angle = -63;
        line19_b3_c1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line19_b3_c1.animations.play("winline");
        this.values.lines["line19"].add(line19_b3_c1);
        var line19_c1_d3 = context.game.add.tileSprite(645, 185, 350, 100, "uiassets");
        line19_c1_d3.animations.add("uiassets");
        line19_c1_d3.anchor.setTo(.0, .35);
        line19_c1_d3.angle = 63;
        line19_c1_d3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line19_c1_d3.animations.play("winline");
        this.values.lines["line19"].add(line19_c1_d3);
        var line19_d3_e2 = context.game.add.tileSprite(790, 500, 230, 100, "uiassets");
        line19_d3_e2.animations.add("uiassets");
        line19_d3_e2.anchor.setTo(.0, .35);
        line19_d3_e2.angle = -45;
        line19_d3_e2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line19_d3_e2.animations.play("winline");
        this.values.lines["line19"].add(line19_d3_e2);
        //this.values.lines["line19"].visible = false;
        this.linesGroup.add(this.values.lines["line19"]);

        this.values.lines["line20"] = context.add.group();
        var line20_a1_b3 = context.game.add.tileSprite(330, 180, 360, 100, "uiassets");
        line20_a1_b3.animations.add("uiassets");
        line20_a1_b3.anchor.setTo(.0, .35);
        line20_a1_b3.angle = 63;
        line20_a1_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line20_a1_b3.animations.play("winline");
        this.values.lines["line20"].add(line20_a1_b3);
        var line20_b3_c2 = context.game.add.tileSprite(480, 500, 225, 100, "uiassets");
        line20_b3_c2.animations.add("uiassets");
        line20_b3_c2.anchor.setTo(.0, .35);
        line20_b3_c2.angle = -45;
        line20_b3_c2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line20_b3_c2.animations.play("winline");
        this.values.lines["line20"].add(line20_b3_c2);
        var line20_c2_d3 = context.game.add.tileSprite(645, 340, 225, 100, "uiassets");
        line20_c2_d3.animations.add("uiassets");
        line20_c2_d3.anchor.setTo(.0, .35);
        line20_c2_d3.angle = 45;
        line20_c2_d3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line20_c2_d3.animations.play("winline");
        this.values.lines["line20"].add(line20_c2_d3);
        var line20_d3_e1 = context.game.add.tileSprite(790, 500, 350, 100, "uiassets");
        line20_d3_e1.animations.add("uiassets");
        line20_d3_e1.anchor.setTo(.0, .35);
        line20_d3_e1.angle = -64;
        line20_d3_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line20_d3_e1.animations.play("winline");
        this.values.lines["line20"].add(line20_d3_e1);
        // this.values.lines["line20"].visible = false;
        this.linesGroup.add(this.values.lines["line20"]);

        this.values.lines["line21"] = context.add.group();
        var line21_a3_b1 = context.game.add.tileSprite(320, 500, 360, 100, "uiassets");
        line21_a3_b1.animations.add("uiassets");
        line21_a3_b1.anchor.setTo(.0, .35);
        line21_a3_b1.angle = -63;
        line21_a3_b1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line21_a3_b1.animations.play("winline");
        this.values.lines["line21"].add(line21_a3_b1);
        var line21_b1_d3 = context.game.add.tileSprite(490, 175, 450, 100, "uiassets");
        line21_b1_d3.animations.add("uiassets");
        line21_b1_d3.anchor.setTo(.0, .35);
        line21_b1_d3.angle = 46;
        line21_b1_d3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line21_b1_d3.animations.play("winline");
        this.values.lines["line21"].add(line21_b1_d3);
        var line21_d3_e2 = context.game.add.tileSprite(790, 500, 230, 100, "uiassets");
        line21_d3_e2.animations.add("uiassets");
        line21_d3_e2.anchor.setTo(.0, .35);
        line21_d3_e2.angle = -45;
        line21_d3_e2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line21_d3_e2.animations.play("winline");
        this.values.lines["line21"].add(line21_d3_e2);
        //this.values.lines["line21"].visible = false;
        this.linesGroup.add(this.values.lines["line21"]);

        this.values.lines["line22"] = context.add.group();
        var line22_a2_b2 = context.game.add.tileSprite(320, 330, 170, 100, "uiassets");
        line22_a2_b2.animations.add("uiassets");
        line22_a2_b2.anchor.setTo(.0, .35);
        line22_a2_b2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line22_a2_b2.animations.play("winline");
        this.values.lines["line22"].add(line22_a2_b2);
        var line22_b2_c3 = context.game.add.tileSprite(490, 330, 221, 100, "uiassets");
        line22_b2_c3.animations.add("uiassets");
        line22_b2_c3.anchor.setTo(.0, .35);
        line22_b2_c3.angle = 45;
        line22_b2_c3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line22_b2_c3.animations.play("winline");
        this.values.lines["line22"].add(line22_b2_c3);
        var line22_c32_e3 = context.game.add.tileSprite(640, 482, 325, 100, "uiassets");
        line22_c32_e3.animations.add("uiassets");
        line22_c32_e3.anchor.setTo(.0, .35);
        line22_c32_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line22_c32_e3.animations.play("winline");
        this.values.lines["line22"].add(line22_c32_e3);
        //this.values.lines["line22"].visible = false;
        this.linesGroup.add(this.values.lines["line22"]);

        this.values.lines["line23"] = context.add.group();
        var line23_a1_b1 = context.game.add.tileSprite(320, 180, 170, 100, "uiassets");
        line23_a1_b1.animations.add("uiassets");
        line23_a1_b1.anchor.setTo(.0, .35);
        line23_a1_b1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line23_a1_b1.animations.play("winline");
        this.values.lines["line23"].add(line23_a1_b1);
        var line23_b1_c3 = context.game.add.tileSprite(490, 182, 345, 100, "uiassets");
        line23_b1_c3.animations.add("uiassets");
        line23_b1_c3.anchor.setTo(.0, .35);
        line23_b1_c3.angle = 63;
        line23_b1_c3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line23_b1_c3.animations.play("winline");
        this.values.lines["line23"].add(line23_b1_c3);
        var line23_c32_e3 = context.game.add.tileSprite(635, 480, 325, 100, "uiassets");
        line23_c32_e3.animations.add("uiassets");
        line23_c32_e3.anchor.setTo(.0, .35);
        line23_c32_e3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line23_c32_e3.animations.play("winline");
        this.values.lines["line23"].add(line23_c32_e3);
        //this.values.lines["line23"].visible = false;
        this.linesGroup.add(this.values.lines["line23"]);

        this.values.lines["line24"] = context.add.group();
        var line24_a3_b3 = context.game.add.tileSprite(320, 480, 163, 100, "uiassets");
        line24_a3_b3.animations.add("uiassets");
        line24_a3_b3.anchor.setTo(.0, .35);
        line24_a3_b3.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line24_a3_b3.animations.play("winline");
        this.values.lines["line24"].add(line24_a3_b3);
        var line24_b3_c1 = context.game.add.tileSprite(475, 483, 335, 100, "uiassets");
        line24_b3_c1.animations.add("uiassets");
        line24_b3_c1.anchor.setTo(.0, .35);
        line24_b3_c1.angle = -62;
        line24_b3_c1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line24_b3_c1.animations.play("winline");
        this.values.lines["line24"].add(line24_b3_c1);
        var line24_c1_e1 = context.game.add.tileSprite(635, 185, 325, 100, "uiassets");
        line24_c1_e1.animations.add("uiassets");
        line24_c1_e1.anchor.setTo(.0, .35);
        line24_c1_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line24_c1_e1.animations.play("winline");
        this.values.lines["line24"].add(line24_c1_e1);
        //this.values.lines["line24"].visible = false;
        this.linesGroup.add(this.values.lines["line24"]);

        this.values.lines["line25"] = context.add.group();
        var line25_a2_b2 = context.game.add.tileSprite(320, 330, 170, 100, "uiassets");
        line25_a2_b2.animations.add("uiassets");
        line25_a2_b2.anchor.setTo(.0, .35);
        line25_a2_b2.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line25_a2_b2.animations.play("winline");
        this.values.lines["line25"].add(line25_a2_b2);
        var line25_b2_c1 = context.game.add.tileSprite(481, 333, 210, 100, "uiassets");
        line25_b2_c1.animations.add("uiassets");
        line25_b2_c1.anchor.setTo(.0, .35);
        line25_b2_c1.angle = -45;
        line25_b2_c1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line25_b2_c1.animations.play("winline");
        this.values.lines["line25"].add(line25_b2_c1);
        var line25_c1_e1 = context.game.add.tileSprite(630, 185, 325, 100, "uiassets");
        line25_c1_e1.animations.add("uiassets");
        line25_c1_e1.anchor.setTo(.0, .35);
        line25_c1_e1.animations.add("winline", Phaser.Animation.generateFrameNames("Winning_Line_", 0, 19, '.png', 5), 20, true);
        line25_c1_e1.animations.play("winline");
        this.values.lines["line25"].add(line25_c1_e1);
        //this.values.lines["line25"].visible = false;
        this.linesGroup.add(this.values.lines["line25"]);

        // console.log(this.linesGroup.length);
        // this.linesGroup.forEach(function(item) {
        //     console.log(item);
        //     item.visible = true;
        //     item.x -= 300;
        //     item.y -= 300;
        //   item.scale.setTo(1.5,1.5);
        //   });

        //this.linesGroup.scale.setTo(1.5, 1.5);
        
        // FREE SPINS
        this.freeSpins = context.game.add.sprite((context.game.width / 2), (context.game.height / 2) - 30, "uiassets")
        this.freeSpins.frameName = "freespins_panel.png";
        this.freeSpins.anchor.setTo(.5, .5);
        this.freeSpins.alpha = 0;
        
        var style3 = this.styles.freespin_label;
        
        this.freespins_text = context.game.add.text(context.game.width / 2, (context.game.height / 2) , "", style3);
        this.freespins_text.anchor.setTo(0.5, 0.5);
        // bedbugGameCore.bigwinLabel_text.x = (this.game.width / 2);
        // bedbugGameCore.bigwinLabel_text.y = (this.game.height / 2);
        this.freespins_text.addColor('#059577', 0);
        this.freespins_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        this.freespins_text.stroke = '#d1f8de';
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

        // this.rays = context.game.add.sprite((context.game.width / 2), (context.game.height / 2), 'bigwin', 'rays.png');
        // this.rays.scale.setTo(5, 5);
        // this.rays.anchor.setTo(0.5, 0.5);
        // this.rays.alpha = 0.2;
        // this.rays.inputEnabled = true;
        // var raysTween = context.game.add.tween(this.rays).to({
        //     angle: 360
        // }, 6000, Phaser.Easing.Linear.None, true);
        // raysTween.repeat(-1);
        // this.rays.events.onInputUp.add(function(btn) {
        //     bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
        //     that.hideBigWin(context);

        // }, this);


        // context.winGroup.add(this.rays);

        this.bigwin = context.game.add.sprite((context.game.width / 2), (context.game.height / 2) - 75, 'uiassets', 'bigwin.png');
        this.bigwin.anchor.setTo(0.5, 0.5);
        this.bigwin.scale.setTo(1, 1);
        context.winGroup.add(this.bigwin);


        //context.winGroup.x += 40;


        context.game.physics.startSystem(Phaser.Physics.ARCADE);
        context.moneyEmitter = context.game.add.emitter(context.world.centerX, 450, 100);
        context.winGroup.add(context.moneyEmitter);

        var CoinParticle = (function() {

            var CoinParticle = function(game, x, y) {
                Phaser.Particle.call(this, game, x, y, 'effects');
                this.animations.add('rotate', Phaser.Animation.generateFrameNames("coinRot.", 1, 22, ".png", 4));
            };

            CoinParticle.prototype = Object.create(Phaser.Particle.prototype);
            CoinParticle.prototype.constructor = CoinParticle;
            CoinParticle.prototype.onEmit = function() {

                this.animations.stop("rotate", true);
                this.animations.play("rotate", 24, true);
                this.animations.getAnimation('rotate').frame = Math.floor(Math.random() * this.animations.getAnimation('rotate').frameTotal);
            }

            return CoinParticle;

        }());

        context.moneyEmitter.width = 400;
        context.moneyEmitter.minParticleScale = 0.8;
        context.moneyEmitter.maxParticleScale = 0.8;
        context.moneyEmitter.setXSpeed(-300, 300);
        context.moneyEmitter.setYSpeed(-100, -400);
        context.moneyEmitter.particleClass = CoinParticle;
        context.moneyEmitter.makeParticles();
        context.moneyEmitter.gravity = 300;
        context.winGroup.visible = false;





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

        context.game.world.bringToTop(context.winGroup);

        // var bigTween = context.game.add.tween(this.big).from({
        //     x: -350
        // }, 750, Phaser.Easing.Quadratic.Out, true);
        var winTween = context.game.add.tween(this.bigwin).from({
            alpha: 0
        }, 400, Phaser.Easing.Elastic.Out, true);

        winTween.onComplete.add(function() {
            context.moneyEmitter.explode(5000, 200);
            if (callback)
                callback();

            setTimeout(function() {
                if (context.winGroup.visible)
                    that.hideBigWin(context);
            }, 5000);
        })

        // Open the top Lights
        this.openLights();

    },
    hideBigWin: function(context) {
        var hidebg = context.game.add.tween(context.winGroup).to({
            alpha: 0
        }, 600, Phaser.Easing.Quadratic.Out, true);

        hidebg.onComplete.add(function() {
            context.winGroup.visible = false;
            context.winGroupbg.visible = false;
            context.winGroup.alpha = 1;
        });

        var hideText = context.game.add.tween(bedbugGameCore.bigwinLabel_text).to({
            alpha: 0
        }, 400, Phaser.Easing.Quadratic.Out, true);

        hideText.onComplete.add(function() {
            bedbugGameCore.bigwinLabel_text.visible = false;
            bedbugGameCore.bigwinLabel_text.alpha = 1;
        });

        // Close the top Lights
        this.closeLights();
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
        var anticipation = bedbugGameCore.game.add.sprite(x, y, "antiFx", "AntiFX_00000.png");
        anticipation.anchor.setTo(0.5, .1);
        anticipation.scale.setTo(0, 0.5);
        anticipation.animations.add("Reel_Anticipation", Phaser.Animation.generateFrameNames("AntiFX_", 0, 29, ".png", 5), 16, true);
        anticipation.play("Reel_Anticipation", 60, true);
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
            x: 1.25,
            y: 1.50
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
            'font': '12px Arial',
            'fill': '#9acdf3',
            "align": "center"
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
            start_dot.onInputOver.add(lineContext.showLine, lineContext);
            start_dot.onInputOut.add(lineContext.hideLine, lineContext);
            lineContext.lineID = context.game.add.text(line.dots.start[0], line.dots.start[1], line.name, id_style);
            lineContext.lineID.anchor.set(0.5, 0.4);
            // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
            lineContext.lineID.visible = false;
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
            end_dot.onInputOver.add(lineContext.showLine, lineContext);
            end_dot.onInputOut.add(lineContext.hideLine, lineContext);
            lineContext.lineID = context.game.add.text(line.dots.end[0], line.dots.end[1], line.name, id_style);
            lineContext.lineID.anchor.set(0.5, 0.4);
            // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
            lineContext.lineID.visible = false;
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
        if (themLine)
            themLine.moveAll(winLine);


        // console.log(gfx);
        // var gfx = context.game.add.graphics(0, 0);
        // var heightLine = 0;

        // if (!slim) {

        //     heightLine = 0;

        //     // Lines in Mobile should not have filters and should be white
        //     if (bedbugGameCore.isDesktop()) {
        //         gfx.filters = [context.game.add.filter('Glow')];
        //         gfx.lineStyle(5, 0x94daf5, 1);
        //     }
        //     else
        //         gfx.lineStyle(5, 0xffffff, 1);
        // }
        // else {
        //     gfx.lineStyle(2, 0x94daf5, .8);
        // }

        // lineContext.PointsLabel = null;

        // var style = {
        //     'font': '100px Arial',
        //     'fill': 'white'
        // };

        // if (start_dot)
        //     gfx.moveTo(start_dot.x, start_dot.y);

        var reelPoint = 0;
        var slot;
        _.forEach(line.slots, function(row) {
            reelPoint++;
            slot = bedbugGameCore.Reels[reelPoint - 1].GetWorldPosition(row);
            //     // Define starting point of the Payline
            //     if (reelPoint == 1 && start_dot)
            //         gfx.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);
            //     if (reelPoint == 1 && !start_dot)
            //         gfx.moveTo(slot.x, slot.y + heightLine);
            //     else
            //         gfx.lineTo(slot.x, slot.y + heightLine);

            //// Here we create the lable that will hold the point of the winning line.
            //// WARNING: Leave as it is.
            if (reelPoint == 3) {
                //lineContext.PointsLabel = context.game.add.text(slot.x, slot.y, "", style);
                lineContext.PointsLabel = context.game.add.bitmapText(slot.x, slot.y, "teslafont", "", 75);
                lineContext.PointsLabel.anchor.setTo(0.5, 0.5);
            }
        })

        // // Define ending point of the Payline
        // if (line.dots.end && !slim)
        //     gfx.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);


        // winLine.addChild(gfx);



        /* Set default state as hidden */
        winLine.visible = false;
        winLine.scale.setTo(1.28, 1.28);
        winLine.x -= 180;
        winLine.y -= 70;
        return winLine;
    },
      /*********************************************************************************************
     * Called when the engine starts spinning
     *********************************************************************************************/
    onSpinStarted: function() {
        this.closeLights();
    },
    /*********************************************************************************************
     *  Start Bonus Game
     *  Called when the engine requests a game upgrade to the theme's bonus game
     *  serverResult:        The current action as returned by the server ticket
     *********************************************************************************************/
    startBonusGame: function(serverResult, context) {
        // console.log('-- ON_BONUSGAME_STARTED');
        bedbugGameCore.bonus_status = 1;
        // bedbugGameCore.bonus_stage = 0;
        // bedbugGameCore.bonus_multiplier = 1;
        bedbugGameCore.free_spins_left = serverResult.FreeSpinsLeft;
        bedbugGameCore.bonus_total_coins = serverResult.BonusTotalWinCoins;

        // Controls.hideControls(context.game);

        // Engines open
        this.openEngines();


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

        context.infotextarea = context.game.add.text(infox, infoy, "", {
            "font": "bold 22px ArialRound",
            "fill": "#fff",
            "align": "center"
        })

        context.infotextarea2 = context.game.add.text(infox + 580, infoy, "", {
            "font": "bold 22px ArialRound",
            "fill": "#fff",
            "align": "center"
        })

        this.updateBonusInfo(serverResult.BonusTotalWinCoins, serverResult.FreeSpinsLeft, context);


        context.infotextarea.alpha = 0.01;
        context.infotextarea.anchor.setTo(0, 0);
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
         this.SpinTweenAlpha  = context.game.add.tween(this.freeSpins).to({
            alpha: 1
        }, 600, Phaser.Easing.Elastic.Out, true);
            
        // Update the Text
        this.freespins_text.setText("x"+serverResult.FreeSpinsLeft);
        
        //context.game.bringToTop(this.spinsGroup);
        this.SpinTweenAlpha.onComplete.add(function() {
            // console.log("CLOSING FREESPINS");
            //Open Text
             this.SpinTextAlpha = context.game.add.tween(this.freespins_text).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            
            //Close Panel And Text
             this.SpinTweenAlpha = context.game.add.tween(this.freeSpins).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);
             this.SpinTextAlpha = context.game.add.tween(this.freespins_text).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true, 4000, 0, false);
             
        }, this)

        var infotextarea_text_appear = context.game.add.tween(context.infotextarea).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 3400);
        var infotextarea2_text_appear = context.game.add.tween(context.infotextarea2).to({
            alpha: 1
        }, 1000, Phaser.Easing.Exponential.Out, true, 3400);


        infotextarea_text_appear.onComplete.add(upgradeStage, this);

        function upgradeStage() {
            // context.checkBonusStageUpgrade(serverResult);
            context.spin();
        }

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
            context.infotextarea.setText("                    " + bedbugGameCore.getLocalizedText("TXT_TOTAL_WIN") + ": " + totalwin);
            context.infotextarea2.setText(bedbugGameCore.getLocalizedText("TXT_FREESPINS_LEFT").toUpperCase() + ": " + freespins);
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

        // Reset Values
        bedbugGameCore.bonus_status = 0;
        bedbugGameCore.bonus_stage = 0;
        bedbugGameCore.bonus_multiplier = 1;

        // Close Engines
        this.closeEngines();

        var winIs = bedbugGameCore.bonus_total_coins;
        // console.log(winIs);
        if (winIs > 0 && winIs < (18 * bedbugGameCore.bet_level)) {

            context.showEndBonusWinnings(winIs, "1", proceed);
        }
        else if (winIs > 0 && winIs < (180 * bedbugGameCore.bet_level)) {

            context.showEndBonusWinnings(winIs, "2", proceed);
        }
        else if (winIs > 0) {

            context.showEndBonusWinnings(winIs, "3", proceed);
        }

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


            Controls.showPlay();
            Controls.showControls(context.game);

            bedbugGameCore.bonus_total_coins = 0;

            bedbugGameCore.controls_enabled = true;

            if (bedbugGameCore.autoplay_count > 0) {
                // Pass the autoplay validatation in order to continue auto-playing
                var waitTime = 2000;

                if (winIs > 2) waitTime = 5000;

                if (!bedbugGameCore.autoplay.shouldStopOnWin(winIs, winIs * bedbugGameCore.coin_value)) {
                    setTimeout(function() {
                        bedbugGameCore.autoplay_count--;
                        context.spin();
                    }, waitTime);

                    return;
                }

            }
        }


    }
}
