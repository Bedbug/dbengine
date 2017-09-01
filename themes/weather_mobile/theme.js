Theme = {
    values: {
        lines: {},
        reelAnticipations: [],
        currentWeather: null,
        weatherGroups: []
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
        // var logoTitle = new CustomLabel(context.game, "TITLE PLACEHOLDER", bedbugGameCore.game_specs.logo.x, bedbugGameCore.game_specs.logo.y, bedbugGameCore.game_specs.logo.width, bedbugGameCore.game_specs.logo.height, true, {
        //     font: "bold 30px Arial"
        // });

        var that = this;

        bedbugEventsSystem.addListener('ON_REELS_STOPED', ON_REELS_STOPED);

        function ON_REELS_STOPED(bestSymbolId) {
            if (bestSymbolId)
                that.weatherChangeBySymbol(bestSymbolId, context);
        }

        // Create The Background Objects
        // this.bgGroups = this.
        var cloudGroup = context.game.add.group();
        var stormGroup = context.game.add.group();
        var snowGroup = context.game.add.group();
        var sunGroup = context.game.add.group();
        var windGroup = context.game.add.group();
        var X2Group = context.game.add.group();
        var X3Group = context.game.add.group();
        var X4Group = context.game.add.group();
        var X5Group = context.game.add.group();

        this.values.weatherGroups = {
            cloud: cloudGroup,
            storm: stormGroup,
            snow: snowGroup,
            sun: sunGroup,
            wind: windGroup,
            state1: X2Group,
            state2: X3Group,
            state3: X4Group,
            state4: X5Group
        };

        /// THUNDERSTORM BACKGROUNDS
        // X2 Background
        var x2Bg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'thunderstormA1.png');
        x2Bg.alpha = 1;
        x2Bg.anchor.setTo(0.5, 0.5);
        x2Bg.height = context.game.height;
        x2Bg.width = context.game.width;
        // stormBg.visible = true;
        X2Group.add(x2Bg);

        // var A2 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormA2.png');
        // A2.alpha = 0;
        // A2.anchor.setTo(0.5, 0.5);
        // A2.height = context.game.height;
        // A2.width = context.game.width;
        // X2Group.add(A2);

        // var lightningnOnA2 = context.game.add.tween(A2).to({
        //     alpha: 1
        // }, 700, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        // lightningnOnA2.repeatDelay(5000);


        // X3 Background
        var x3Bg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'thunderstormB1.jpg');
        x3Bg.alpha = 1;
        x3Bg.anchor.setTo(0.5, 0.5);
        x3Bg.height = context.game.height;
        x3Bg.width = context.game.width;
        // stormBg.visible = true;
        X3Group.add(x3Bg);

        // var B2 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormB2.jpg');
        // B2.alpha = 0;
        // B2.anchor.setTo(0.5, 0.5);
        // B2.height = context.game.height;
        // B2.width = context.game.width;
        // X3Group.add(B2);

        // var lightningnOnB2 = context.game.add.tween(B2).to({
        //     alpha: 1
        // }, 600, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        // lightningnOnB2.repeatDelay(10000);

        // var B3 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormB3.jpg');
        // B3.alpha = 0;
        // B3.anchor.setTo(0.5, 0.5);
        // B3.height = context.game.height;
        // B3.width = context.game.width;
        // X3Group.add(B3);

        // var lightningnOnB3 = context.game.add.tween(B3).to({
        //     alpha: 1
        // }, 500, Phaser.Easing.Bounce.InOut, true, 3000, -1, true);
        // lightningnOnB3.repeatDelay(13000);

        if (context.game.device.desktop) {
            var emitter = context.game.add.emitter(context.game.world.centerX, 20, 1000);
            X3Group.add(emitter);
            emitter.width = context.game.world.width;
            emitter.angle = -0; // uncomment to set an angle for the rain.
            emitter.forEach(function(particle) {
                particle.tint = 0x83c7fb;
                // particle.scale.setTo(2,2);
            });

            emitter.makeParticles('rain2');

            emitter.minParticleScale = 1;
            emitter.maxParticleScale = 2;

            emitter.setYSpeed(3000, 3000);
            emitter.setXSpeed(10, 25);


            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            //emitter.start(false, 600, 1, 0);
            emitter.start(false, 250, 50);
        }

        // x4 Background
        var x4Bg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'thunderstormC2.jpg');
        x4Bg.alpha = 1;
        x4Bg.anchor.setTo(0.5, 0.5);
        x4Bg.height = context.game.height;
        x4Bg.width = context.game.width;
        // stormBg.visible = true;
        X4Group.add(x4Bg);

        //     var C2 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormC2.jpg');
        //     C2.alpha = 0;
        //     C2.anchor.setTo(0.5, 0.5);
        //     C2.height = context.game.height;
        //     C2.width = context.game.width;
        //     X4Group.add(C2);

        //     var lightningnOnC2 = context.game.add.tween(C2).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        //     lightningnOnC2.repeatDelay(3000);

        //     var C3 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormC3.jpg');
        //     C3.alpha = 0;
        //     C3.anchor.setTo(0.5, 0.5);
        //     C3.height = context.game.height;
        //     C3.width = context.game.width;
        //     X4Group.add(C3);

        //     var lightningnOnC3 = context.game.add.tween(C3).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Bounce.InOut, true, 3000, -1, true);
        //     lightningnOnC3.repeatDelay(5000);

        //      var L1 = context.game.add.sprite(130, 160, 'extras','Lightning_A_001.png');
        //      L1.angle = -25;
        //      L1.anchor.setTo(0.5, 0.5);
        //     L1.scale.setTo( 1.2, 1.2);
        //     L1.alpha = 0;
        //     X4Group.add(L1);

        //     var lightningnOnL1 = context.game.add.tween(L1).to({
        //         alpha: 1
        //     }, 700, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        //     lightningnOnL1.repeatDelay(5500);

        //     var L2 = context.game.add.sprite(300, 0, 'extras','Lightning_B_002.png');
        //     L2.scale.setTo( 1.9, 1.9);
        //   // L2.anchor.setTo(0.5, 0.5);
        //     L2.alpha = 0;
        //     X4Group.add(L2);

        //     var lightningnOnL2 = context.game.add.tween(L2).to({
        //         alpha: 1
        //     }, 500, Phaser.Easing.Bounce.InOut, true, 3000, -1, true);
        //     lightningnOnL2.repeatDelay(4000);

        if (context.game.device.desktop) {
            var emitter = context.game.add.emitter(context.game.world.centerX, 20, 1000);
            X4Group.add(emitter);
            emitter.width = context.game.world.width;
            emitter.angle = -4; // uncomment to set an angle for the rain.
            emitter.forEach(function(particle) {
                particle.tint = 0x83c7fb;
                // particle.scale.setTo(2,2);
            });

            emitter.makeParticles('rain2');

            emitter.minParticleScale = 2;
            emitter.maxParticleScale = 2.5;

            emitter.setYSpeed(3000, 3000);
            emitter.setXSpeed(10, 25);


            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            //emitter.start(false, 600, 1, 0);
            emitter.start(false, 250, 25);
        }


        // x5 Background
        var x5Bg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'thunderstormD2.jpg');
        x5Bg.alpha = 1;
        x5Bg.anchor.setTo(0.5, 0.5);
        x5Bg.height = context.game.height;
        x5Bg.width = context.game.width;
        // stormBg.visible = true;
        X5Group.add(x5Bg);

        //     var D2 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormD2.jpg');
        //     D2.alpha = 0;
        //     D2.anchor.setTo(0.5, 0.5);
        //     D2.height = context.game.height;
        //     D2.width = context.game.width;
        //     X5Group.add(D2);

        //     var lightningnOnD2 = context.game.add.tween(D2).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        //     lightningnOnD2.repeatDelay(2000);

        //     var D3 = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras','thunderstormD3.jpg');
        //     D3.alpha = 0;
        //     D3.anchor.setTo(0.5, 0.5);
        //     D3.height = context.game.height;
        //     D3.width = context.game.width;
        //     X5Group.add(D3);

        //     var lightningnOnD3 = context.game.add.tween(D3).to({
        //         alpha: 1
        //     }, 600, Phaser.Easing.Bounce.InOut, true, 3000, -1, true);
        //     lightningnOnD3.repeatDelay(3000);

        //      var L3 = context.game.add.sprite(130, 160, 'extras','Lightning_B_001.png');
        //      L3.angle = -25;
        //      L3.anchor.setTo(0.5, 0.5);
        //     L3.scale.setTo( 1.2, 1.2);
        //     L3.alpha = 0;
        //     X5Group.add(L3);

        //     var lightningnOnL3 = context.game.add.tween(L3).to({
        //         alpha: 1
        //     }, 700, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        //     lightningnOnL3.repeatDelay(4000);

        //     var L4 = context.game.add.sprite(300, 0, 'extras','Lightning_B_002.png');
        //     L4.scale.setTo( 1.9, 1.9);
        //   // L2.anchor.setTo(0.5, 0.5);
        //     L4.alpha = 0;
        //     X5Group.add(L4);

        //     var lightningnOnL4 = context.game.add.tween(L4).to({
        //         alpha: 1
        //     }, 500, Phaser.Easing.Bounce.InOut, true, 3000, -1, true);
        //     lightningnOnL4.repeatDelay(3500);

        if (context.game.device.desktop) {
            var rainEmitter2 = context.game.add.emitter(context.game.world.centerX, 20, 1000);
            X5Group.add(rainEmitter2);
            rainEmitter2.width = context.game.world.width;
            rainEmitter2.angle = -7; // uncomment to set an angle for the rain.
            rainEmitter2.forEach(function(particle) {
                particle.tint = 0x83c7fb;
                // particle.scale.setTo(2,2);
            });

            rainEmitter2.makeParticles('rain2');

            rainEmitter2.minParticleScale = 2.5;
            rainEmitter2.maxParticleScale = 2.5;

            rainEmitter2.setYSpeed(4000, 4000);
            rainEmitter2.setXSpeed(10, 25);


            rainEmitter2.minRotation = 0;
            rainEmitter2.maxRotation = 0;

            //emitter.start(false, 600, 1, 0);
            rainEmitter2.start(false, 200, 1);
        }

        // Tornado  Animation
        var tornado = context.game.add.sprite((context.game.width / 2) - 60, (context.game.height / 2) + 450, "extras2", "Tornado_0000.png");
        tornado.anchor.setTo(0.5, 1);
        tornado.scale.setTo(2.5, 2.5);
        tornado.animations.add("tornado", Phaser.Animation.generateFrameNames("Tornado_", 0, 19, ".png", 4), 16, true);
        tornado.play("tornado", 16, true);
        X5Group.add(tornado);




        // 4 Different Sets of Color Backrounds to change at the WeatheCrhangeTo() method
        // Clouds
        var cloudBg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', "clouds_bg.png");

        cloudBg.alpha = 1;
        cloudBg.anchor.setTo(0.5, 0.5);
        cloudBg.height = context.game.height;
        cloudBg.width = context.game.width;
        cloudGroup.add(cloudBg);
        // cloudBg.visible = false;

        // Create The House And all the states
        // var houseClouds = context.game.add.sprite(260, 210, "extras", "HouseClouds_00000.png");
        // houseClouds.scale.setTo(-1.8, 1.8);
        // houseClouds.animations.add("houseclouds", Phaser.Animation.generateFrameNames('HouseClouds_', 0, 23,'.png',5), 16, true);
        // houseClouds.play("houseclouds", 16, true);
        // cloudGroup.add(houseClouds);


        // Storm
        var stormBg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'storm_bg.png');
        stormBg.alpha = 1;
        stormBg.anchor.setTo(0.5, 0.5);
        stormBg.height = context.game.height;
        stormBg.width = context.game.width;
        // stormBg.visible = true;
        stormGroup.add(stormBg);

        // var clouds = context.game.add.sprite(-1000, -200, 'clouds');
        // clouds.scale.setTo(1.2, 0.75);
        // stormGroup.add(clouds);

        // var light = context.game.add.sprite(1000, 0, 'light');
        // light.alpha = 0;
        // light.scale.setTo(-2, 2);
        // stormGroup.add(light);
        // var light2 = context.game.add.sprite(50, 0, 'light');
        // light2.alpha = 0;
        // light2.scale.setTo(1.2, 1.59);
        // stormGroup.add(light2);

        // var lightningnOn1 = context.game.add.tween(light).to({
        //     alpha: 1
        // }, 400, Phaser.Easing.Bounce.InOut, true, 5000, -1, true);
        // lightningnOn1.repeatDelay(10000);
        // var lightningnOn2 = context.game.add.tween(light2).to({
        //     alpha: 1
        // }, 500, Phaser.Easing.Bounce.InOut, true, 3000, -1, true);
        // lightningnOn2.repeatDelay(13000);

        // function (properties, duration, ease, autoStart, delay, repeat, yoyo)
        // var cloudsTween = context.game.add.tween(clouds);
        // cloudsTween.to({
        //     x: 0
        // }, 120000, Phaser.Easing.Linear.InOut, true, 0, -1, true);

        // cloudsTween.yoyo(true, 3000);
        // cloudsTween.start();

        // Create The House And all the states
        // var houseStorm = context.game.add.sprite(260, 210, "extras", "HouseStorm_00000.png");
        // houseStorm.scale.setTo(-1.8, 1.8);
        // houseStorm.animations.add("housestorm", Phaser.Animation.generateFrameNames ("HouseStorm_",0,23,".png",5), 16, true);
        // houseStorm.play("housestorm", 16, true);
        // stormGroup.add(houseStorm);

        // Create Rain
        if (context.game.device.desktop) {
            var emitter = context.game.add.emitter(context.game.world.centerX, 20, 500);
            stormGroup.add(emitter);
            emitter.width = context.game.world.width;
            emitter.angle = -7; // uncomment to set an angle for the rain.
            emitter.forEach(function(particle) {
                particle.tint = 0x83c7fb;
            });

            emitter.makeParticles('rain2');

            emitter.minParticleScale = 1;
            emitter.maxParticleScale = 1;

            emitter.setYSpeed(800, 900);
            emitter.setXSpeed(10, 25);


            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            emitter.start(false, 600, 1, 0);
        }

        if (context.game.device.desktop) {
            var emitter2 = context.game.add.emitter(context.game.world.centerX + 100, 50, 500);
            stormGroup.add(emitter2);
            emitter2.width = context.game.world.width;
            emitter2.angle = -8; // uncomment to set an angle for the rain.

            emitter2.makeParticles('rain2');

            emitter2.minParticleScale = 1;
            emitter2.maxParticleScale = 1;

            emitter2.setYSpeed(1200, 1300);
            emitter2.setXSpeed(10, 25);


            emitter2.minRotation = 0;
            emitter2.maxRotation = 0;

            emitter2.start(false, 400, 1, 0);
        }

        if (context.game.device.desktop) {
            var emitter3 = context.game.add.emitter(context.game.world.centerX + 100, 0, 500);
            stormGroup.add(emitter3);
            emitter3.width = context.game.world.width;
            emitter3.angle = -9; // uncomment to set an angle for the rain.

            emitter3.makeParticles('rain2');

            emitter3.minParticleScale = 1;
            emitter3.maxParticleScale = 1;

            emitter3.setYSpeed(900, 1100);
            emitter3.setXSpeed(10, 25);


            emitter3.minRotation = 0;
            emitter3.maxRotation = 0;

            emitter3.start(false, 700, 1, 0);
        }

        // Snow
        var snowBg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'snow_bg.png');
        snowBg.alpha = 1;
        snowBg.anchor.setTo(0.5, 0.5);
        snowBg.height = context.game.height;
        snowBg.width = context.game.width;
        snowGroup.add(snowBg);

        // Create The House And all the states
        // var houseSnow = context.game.add.sprite(260, 210, "extras", "HouseSnow_00000.png");
        // houseSnow.scale.setTo(-1.8, 1.8);
        // houseSnow.animations.add("housesnow", Phaser.Animation.generateFrameNames("HouseSnow_", 0, 23, ".png", 5), 16, true);
        // houseSnow.play("housesnow", 16, true);
        // snowGroup.add(houseSnow);

        // var cloudsSnow = context.game.add.sprite(-1000, -10, 'clouds2');
        // cloudsSnow.scale.setTo(2.2, 0.7);
        // snowGroup.add(cloudsSnow);

        // function (properties, duration, ease, autoStart, delay, repeat, yoyo)
        // var clouds2Tween = context.game.add.tween(cloudsSnow);
        // clouds2Tween.to({
        //     x: 0
        // }, 70000, Phaser.Easing.Linear.InOut, true, 0, -1, true);


        // Snow Emmiters
        if (context.game.device.desktop) {
            var max = 0;
            var front_emitter;
            var mid_emitter;
            var back_emitter;
            var update_interval = 4 * 60;
            var i = 0;

            back_emitter = context.game.add.emitter(context.game.world.centerX, -32, 600);
            back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
            back_emitter.maxParticleScale = 0.6;
            back_emitter.minParticleScale = 0.2;
            back_emitter.setYSpeed(20, 100);
            back_emitter.gravity = 0;
            back_emitter.width = context.game.world.width * 1.5;
            back_emitter.minRotation = 0;
            back_emitter.maxRotation = 40;
            snowGroup.add(back_emitter);

            mid_emitter = context.game.add.emitter(context.game.world.centerX, -32, 250);
            mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
            mid_emitter.maxParticleScale = 1.2;
            mid_emitter.minParticleScale = 0.8;
            mid_emitter.setYSpeed(50, 150);
            mid_emitter.gravity = 0;
            mid_emitter.width = context.game.world.width * 1.5;
            mid_emitter.minRotation = 0;
            mid_emitter.maxRotation = 40;
            snowGroup.add(mid_emitter);

            front_emitter = context.game.add.emitter(context.game.world.centerX, -32, 50);
            front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
            front_emitter.maxParticleScale = 1;
            front_emitter.minParticleScale = 0.5;
            front_emitter.setYSpeed(100, 200);
            front_emitter.gravity = 0;
            front_emitter.width = context.game.world.width * 1.5;
            front_emitter.minRotation = 0;
            front_emitter.maxRotation = 40;
            snowGroup.add(front_emitter);

            changeWindDirection();

            back_emitter.start(false, 14000, 20);
            mid_emitter.start(false, 12000, 40);
            front_emitter.start(false, 6000, 1000);
        }

        function changeWindDirection() {

            var multi = Math.floor((max + 200) / 4),
                frag = (Math.floor(Math.random() * 100) - multi);
            max = max + frag;

            if (max > 200) max = 150;
            if (max < -200) max = -150;

            setXSpeed(back_emitter, max);
            setXSpeed(mid_emitter, max);
            setXSpeed(front_emitter, max);

        }

        function setXSpeed(emitter, max) {

            emitter.setXSpeed(max - 20, max);
            emitter.forEachAlive(setParticleXSpeed, context, max);

        }

        function setParticleXSpeed(particle, max) {

            particle.body.velocity.x = max - Math.floor(Math.random() * 30);

        }


        // Sun    
        var sunBg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'sun_bg.png');
        sunBg.alpha = 1;
        sunBg.anchor.setTo(0.5, 0.5);
        sunBg.height = context.game.height;
        sunBg.width = context.game.width;
        sunGroup.add(sunBg);

        //  var sun = context.game.add.sprite(context.game.width , 0, 'extras', 'sun.png');
        // sun.scale.setTo(5.2, 5.2);
        // sun.anchor.setTo(0.5, 0.5);
        // //sun.alpha = 0.6;
        // sunGroup.add(sun);

        // // function (properties, duration, ease, autoStart, delay, repeat, yoyo)
        // var sunTween = context.game.add.tween(sun);
        // sunTween.to({
        //   angle: 360
        // }, 100000, Phaser.Easing.Linear.InOut, true, 0, -1, false);



        // Wind    
        var windBg = context.game.add.sprite(context.game.width / 2, context.game.height / 2, 'extras', 'wind_bg.png');
        windBg.alpha = 1;
        windBg.anchor.setTo(0.5, 0.5);
        windBg.height = context.game.height;
        windBg.width = context.game.width;
        windGroup.add(windBg);

        //  var cloudsWind = context.game.add.sprite(-2112, -50, 'clouds2');
        // cloudsWind.scale.setTo(2.2, 1.0);
        // cloudsWind.alpha = 0.6;
        // windGroup.add(cloudsWind);

        // function (properties, duration, ease, autoStart, delay, repeat, yoyo)
        // var cloudsWindTween = context.game.add.tween(cloudsWind);
        // cloudsWindTween.to({
        //     x: 0
        // }, 10000, Phaser.Easing.Linear.InOut, true, 0, -1, false);


        // Tree Wind Animation
        var windTree = context.game.add.sprite(0, 280, "extras", "Tree_wind0000.png");
        windTree.scale.setTo(1.7, 1.7);
        windTree.animations.add("treeWind", Phaser.Animation.generateFrameNames("Tree_wind", 0, 19, ".png", 4), 16, true);
        windTree.play("treeWind", 16, true);
        windGroup.add(windTree);

        // Create The House And all the states
        // var houseSun = context.game.add.sprite(260, 210, "extras", "HouseSun_00000.png");
        // houseSun.scale.setTo(-1.8, 1.8);
        // houseSun.animations.add("housesun", Phaser.Animation.generateFrameNames("HouseSun_", 0, 23, ".png", 5), 16, true);
        // houseSun.play("housesun", 16, true);
        // sunGroup.add(houseSun);

        // Test Alpha Tween after 3secs close the visibility
        //function (properties, duration, ease, autoStart, delay, repeat, yoyo)
        // var testTween =  context.game.add.tween(sunGroup).to({
        //     alpha: 0
        //   }, 3000, Phaser.Easing.Linear.None, true, 6000);
        //   testTween.repeatDelay(-1);
        //   //testTween.repeatDelay = 5000;
        //   testTween.yoyo(true, 6000);
        //   //testTween.yoyoDelay(5000);



        // Create the Icon object To Transition at The WeatheCrhangeTo() method
        // context.animedIcon = context.game.add.sprite(23, 280, "icon_anim");
        // context.animedIcon.animations.add("fullAnim");
        // // Suns to
        // context.animedIcon.animations.add('sun_cloud', [0, 1, 2, 3, 4, 5, 6, 7]);
        // context.animedIcon.animations.add('sun_storm', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        // context.animedIcon.animations.add('sun_snow', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
        // // Clouds to
        // context.animedIcon.animations.add('cloud_storm', [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        // context.animedIcon.animations.add('cloud_snow', [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
        // context.animedIcon.animations.add('cloud_sun', [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 0]);
        // // Storm to
        // context.animedIcon.animations.add('storm_snow', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
        // context.animedIcon.animations.add('storm_sun', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 0]);
        // context.animedIcon.animations.add('storm_cloud', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 0, 1, 2, 3, 4, 5, 6, 7]);
        // // Snow to
        // context.animedIcon.animations.add('snow_sun', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 0]);
        // context.animedIcon.animations.add('snow_cloud', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 0, 1, 2, 3, 4, 5, 6, 7]);
        // context.animedIcon.animations.add('snow_storm', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        // context.animedIcon.visible = false;
        // // animedIcon.animations.play('snow_storm', 12, true);
        // // animedIcon.animations.play('fullAnim', 12, true);
        // // Create the four idle icons
        // context.idleGroup = context.game.add.group();
        // var sunIdle = context.game.add.sprite(23, 280, "sunIdle");
        // var sunIdleAnim = sunIdle.animations.add("sunIdle");
        // context.idleGroup.add(sunIdle);
        // sunIdleAnim.play(12, true);
        // sunIdle.visible = true;

        // var stormIdle = context.game.add.sprite(23, 280, "stormIdle");
        // var stormIdleAnim = stormIdle.animations.add("stormIdle");
        // context.idleGroup.add(stormIdle);
        // //stormIdleAnim.play(12, true);
        // stormIdle.visible = false;

        // var snowIdle = context.game.add.sprite(23, 280, "snowIdle");
        // var snowIdleAnim = snowIdle.animations.add("snowIdle");
        // context.idleGroup.add(snowIdle);
        // //snowIdleAnim.play(12, true);
        // snowIdle.visible = false;

        // var cloudIdle = context.game.add.sprite(23, 280, "cloudIdle");
        // var cloudIdleAnim = cloudIdle.animations.add("cloudIdle");
        // context.idleGroup.add(cloudIdle);
        // //cloudIdleAnim.play(12, true);
        // cloudIdle.visible = false;

        // // Dictionary of the Anims for future Reference
        // context.weatherIdles = {
        //     "cloud": cloudIdle,
        //     "storm": stormIdle,
        //     "snow": snowIdle,
        //     "sun": sunIdle
        // };

        // var idleGroupTween = context.game.add.tween(context.idleGroup).to({
        //   y: 10
        // }, 3000, Phaser.Easing.Quadratic.InOut, true);
        // idleGroupTween.repeat(-1);
        // //testTween.repeatDelay = 5000;
        // idleGroupTween.yoyo(true);
        // //testTween.yoyoDelay(5000);



        // context.weatherGroups.cloud.visible = true;



        // Finally Add The Logo Title     
        this.logoTitle = context.game.add.sprite(bedbugGameCore.getGridCenter().x, bedbugGameCore.game_specs.grid.y / 2, "extras2", "Logo.png");
        this.logoTitle.scale.setTo(0.80, 0.80);
        this.logoTitle.anchor.setTo(0, 0.5);
        // this.logoTitle.x = this.logoTitle.x - (this.logoTitle.width / 2);
        this.logoTitle.x = bedbugGameCore.game_specs.grid.x;
        this.logoOriginalPostition = this.logoTitle.position.x;
        this.logoBonusPosition = bedbugGameCore.game_specs.grid.x;


        context.bonusMultipliersOff = {};
        _.times(4, function(i) {
            var step = i + 2;
            var pos = 3 - i;

            context.bonusMultipliersOff["x" + step] = {};
            context.bonusMultipliersOff["x" + step].off = context.game.add.sprite(
                bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) - (73 * pos) - 35,
                (bedbugGameCore.game_specs.grid.y / 2) + 16,
                'off_x' + step);
            context.bonusMultipliersOff["x" + step].off.anchor.setTo(0.5, 0.5);
            context.bonusMultipliersOff["x" + step].off.scale.setTo(0.9, 0.9);
        })

        // Finally Add The Logo Title     
        // var logoTitle = context.game.add.sprite(bedbugGameCore.game_specs.grid.x, bedbugGameCore.game_specs.grid.y / 2, "extras2", "Logo.png");
        // logoTitle.scale.setTo(0.4, 0.4);
        // logoTitle.anchor.setTo(0,0.5);
        // var x2 = context.game.add.sprite(750, 25, "extras2", "X2_ON.png");
        // var x3 = context.game.add.sprite(825, 25, "extras2", "X3_ON.png");
        // var x4 = context.game.add.sprite(894, 25, "extras2", "X4_ON.png");
        // var x5 = context.game.add.sprite(971, 20, "extras2", "X5_ON.png");

        context.multis = {
            state1: X2Group,
            state2: X3Group,
            state3: X4Group,
            state4: X5Group
        };

        context.closeMultis = function() {
            X2Group.visible = false;
            X3Group.visible = false;
            X4Group.visible = false;
            X5Group.visible = false;
        }
        context.openMulti = function(multiname) {
            context.closeMultis();
            context.multis[multiname].visible = true;
        }



        // var logoTitle =  new CustomLabel(context.game,"TITLE PLACEHOLDER", bedbugGameCore.game_specs.logo.x, bedbugGameCore.game_specs.logo.y, bedbugGameCore.game_specs.logo.width, bedbugGameCore.game_specs.logo.height, true, {
        //       font: "bold 30px Arial"
        //   });

        // var downLine1 = context.game.add.sprite(100, 103, "line");
        // downLine1.scale.setTo(1, 0.5);
        // var downLine2 = context.game.add.sprite(100, 555, "line");
        // downLine2.scale.setTo(1, 0.5);


        // The Temp
        // context.tempstyle = {
        //     font: "60px Calibri Light",
        //     fill: "#ffffff",
        //     align: "center"
        // };
        // context.temptext = context.game.add.text(150, 240, "35°", context.tempstyle);
        // context.temptext.anchor.set(0.5);
        // // The Weather name
        // context.weathstyle = {
        //     font: "30px Calibri Light",
        //     fill: "#ffffff",
        //     align: "center"
        // };
        // context.weatherNametext = context.game.add.text(85, 470, "SUNNY", context.weathstyle);

        // context.temptext.anchor.set(0.5);

        // Create The Big Win Group


        context.winGroupbg = context.game.add.group();
        context.winGroup = context.game.add.group();

        this.rays = context.game.add.sprite((context.game.width / 2), (context.game.height / 2), 'bigwin', 'rays.png');
        this.rays.scale.setTo(5, 5);
        this.rays.anchor.setTo(0.5, 0.5);
        this.rays.alpha = 0.2;
        this.rays.inputEnabled = true;
        var raysTween = context.game.add.tween(this.rays).to({
            angle: 360
        }, 6000, Phaser.Easing.Linear.None, true);
        raysTween.repeat(-1);
        this.rays.events.onInputUp.add(function(btn) {
            bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
            that.hideBigWin(context);
        }, this);

        context.winGroup.add(this.rays);

        this.big = context.game.add.sprite((context.game.width / 2) - 30, (context.game.height / 2) - 75, 'bigwin', 'Big.png');
        this.big.anchor.setTo(1, 0.5);
        this.big.scale.setTo(1.0, 1);
        context.winGroup.add(this.big);
        this.win = context.game.add.sprite((context.game.width / 2) - 30, (context.game.height / 2) - 75, 'bigwin', 'Win.png');
        this.win.anchor.setTo(0, 0.5);
        this.win.scale.setTo(1.0, 1.0);
        context.winGroup.add(this.win);

        context.winGroup.x += 40;


        context.game.physics.startSystem(Phaser.Physics.ARCADE);
        context.moneyEmitter = context.game.add.emitter(context.world.centerX, 450, 100);
        context.winGroup.add(context.moneyEmitter);

        var CoinParticle = (function() {

            var CoinParticle = function(game, x, y) {
                Phaser.Particle.call(this, game, x, y, 'extras');
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
        context.moneyEmitter.setXSpeed(-300, 300);
        context.moneyEmitter.setYSpeed(-100, -400);
        context.moneyEmitter.particleClass = CoinParticle;
        context.moneyEmitter.makeParticles();
        context.moneyEmitter.gravity = 300;
        context.winGroup.visible = false;




        // Starting Set Up
        cloudGroup.visible = false;
        stormGroup.visible = false;
        snowGroup.visible = false;
        sunGroup.visible = true;
        windGroup.visible = false;
        X2Group.visible = true;
        X3Group.visible = true;
        X4Group.visible = true;
        X5Group.visible = true;

        X2Group.alpha = 0;
        X3Group.alpha = 0;
        X4Group.alpha = 0;
        X5Group.alpha = 0;

        context.winGroup.visible = false;

        context.currentWeather = "sun";
        context.currentWeatherObj = sunGroup;


        var downLine1 = context.game.add.sprite(100, bedbugGameCore.game_specs.grid.y - 2, "line");
        downLine1.scale.setTo(1, 0.5);
        var downLine2 = context.game.add.sprite(100, bedbugGameCore.game_specs.grid.y + (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows), "line");
        downLine2.scale.setTo(1, 0.5);

        this.weatherChange("wind", true, context);
        
        // Create Free Spins End Panel
        // FREE SPINS
        this.freeSpins = context.game.add.sprite((context.game.width / 2) + 30, (context.game.height / 2) - 30, "extras2")
        this.freeSpins.frameName = "paytable.png";
        this.freeSpins.scale.setTo(.7);
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
    },
    playBigWin: function(context, callback) {
        var that = this;
        context.winGroup.visible = true;
        context.winGroupbg.visible = true;

        context.game.world.bringToTop(context.winGroup);

        var bigTween = context.game.add.tween(this.big).from({
            x: -350
        }, 750, Phaser.Easing.Quadratic.Out, true);
        var winTween = context.game.add.tween(this.win).from({
            x: (context.game.width) + 300
        }, 750, Phaser.Easing.Quadratic.Out, true);

        winTween.onComplete.add(function() {
            context.moneyEmitter.explode(5000, 50);
            if (callback)
                callback();

            setTimeout(function() {
                if (context.winGroup.visible)
                    that.hideBigWin(context);
            }, 5000);
        })


    },
    hideBigWin: function(context) {
        bedbugGameCore.controls_enabled = true;
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
    /**
     * ANTICIPATION
     */
    reelAnticipations: [],
    createAnticipationAnimation: function(reelName, x, y) {
        var anticipation = bedbugGameCore.game.add.sprite(x, y, "extras2", "Anticipation_0000.png");
        anticipation.anchor.setTo(0.5, 0);
        anticipation.scale.setTo(0, 1.16);
        anticipation.animations.add("Reel_Anticipation", Phaser.Animation.generateFrameNames("Anticipation_", 0, 19, ".png", 4), 16, true);
        anticipation.play("Reel_Anticipation", 16, true);
        anticipation.alpha = 0;

        this.reelAnticipations.push({
            reel: reelName,
            animation: anticipation
        });

        // Play the first one immediatly
        if (this.reelAnticipations.length == 1)
            this.anticipationPlay(anticipation);

    },
    removeAnticipationAnimation: function(reelName) {
        _.remove(this.reelAnticipations, {
            reel: reelName
        })[0].animation.destroy();
        if (this.reelAnticipations.length > 0)
            this.anticipationPlay(this.reelAnticipations[0].animation);
    },
    anticipationPlay: function(anticipation) {
        bedbugGameCore.game.add.tween(anticipation.scale).to({
            x: 1,
            y: 1.16
        }, 500, Phaser.Easing.Exponential.Out, true);

        bedbugGameCore.game.add.tween(anticipation).to({
            alpha: 1
        }, 500, Phaser.Easing.Exponential.Out, true);

    },
    /*********************************************************************************************
     * Create Win Lines
     * line:    Line. Has all the details of the line to draw. (!: child of game_specs.json Lines:[])
     * slim:    Boolean. if true, draws a line without start[end] dots and with a different visual
     *          style. (!: commonly used for max bet. showSlimLine() shows this line)
     *********************************************************************************************/
    createLine: function(line, slim, lineContext, context) {
        var winLine = context.game.add.group();

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
         *  Here is where we start to draw the graphic line and then add it to the winline group
         *  If we want to create a different line we should replace the gfx with whatever we want 
         *  and make it a child of winLine. If we want to identify the line, use the property id 
         *  as console.log(line.id) // => "line02" .see theme's line ids in game_specs.json
         * ******************************************************************************************/
        var gfx = context.game.add.graphics(0, 0);
        var heightLine = 0;

        if (!slim) {

            heightLine = 0;

            // Lines in Mobile should not have filters and should be white
            if (bedbugGameCore.isDesktop()) {
                gfx.filters = [context.game.add.filter('Glow')];
                gfx.lineStyle(5, 0x94daf5, 1);
            }
            else
                gfx.lineStyle(5, 0xffffff, 1);
        }
        else {
            gfx.lineStyle(2, 0x94daf5, .8);
        }

        lineContext.PointsLabel = null;
        var reelPoint = 0;
        var style = {
            'font': '100px Arial',
            'fill': 'white'
        };

        if (start_dot)
            gfx.moveTo(start_dot.x, start_dot.y);

        var slot;
        _.forEach(line.slots, function(row) {
            reelPoint++;
            slot = bedbugGameCore.Reels[reelPoint - 1].GetWorldPosition(row);

            // Define starting point of the Payline
            if (reelPoint == 1 && start_dot)
                gfx.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);

            if (reelPoint == 1 && !start_dot)
                gfx.moveTo(slot.x, slot.y + heightLine);
            else
                gfx.lineTo(slot.x, slot.y + heightLine);

            if (reelPoint == 3) {
                //lineContext.PointsLabel = context.game.add.text(slot.x, slot.y, "", style);
                lineContext.PointsLabel = context.game.add.bitmapText(slot.x, slot.y, "pointsfont", "", 75);
                lineContext.PointsLabel.anchor.setTo(0.5, 0.5);
            }
        })

        // Define ending point of the Payline
        if (line.dots.end && !slim)
            gfx.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);


        /* Adding the drawn line to the object to be returned to the engine */
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
     * Start Bonus Game
     * Called when the engine requests a game upgrade to the theme's bonus game
     * serverResult:        The current action as returned by the server ticket
     *********************************************************************************************/
    startBonusGame: function(serverResult, context) {

        bedbugGameCore.bonus_status = 1;
        // bedbugGameCore.bonus_stage = 0;
        // bedbugGameCore.bonus_multiplier = 1;
        bedbugGameCore.free_spins_left = serverResult.FreeSpinsLeft;
        bedbugGameCore.bonus_total_coins = serverResult.BonusTotalWinCoins;

        Controls.hideControls(context.game);

        // Hide the Info box
        context.infobox.visible = false;
        context.resetLines();
        context.resetGrid();

        context.BonusGameGroup = context.game.add.group();

        // Create Animation Assets
        context.clouds = context.game.add.sprite(0, -394, "clouds2");
        context.clouds.scale.set(2, 2);
        context.clouds.alpha = 0.9;

        // Hide Clouds
        context.clouds.alpha = 0

        var infox = bedbugGameCore.game_specs.infobox.x;
        var infoy = bedbugGameCore.game_specs.infobox.y + 6;
        if (context.game.device.desktop) infoy -= 7;
        var infocenter = bedbugGameCore.game_specs.infobox.width / 2;
        context.infotextarea = context.game.add.text(infox + infocenter, infoy, "", {
            "font": "bold 22px ArialRound",
            "fill": "#fff",
            "align": "center"
        })

        this.updateBonusInfo(serverResult.BonusTotalWinCoins, serverResult.FreeSpinsLeft, context);


        context.infotextarea.alpha = 0.01;
        context.infotextarea.anchor.setTo(0.5, 0);
        context.infotextarea.setShadow(1, 1, 'rgba(0,0,0,0.2)', 5);


        if (bedbugGameCore.game.device.desktop)
            context.infotextarea.resolution = 2;

        var centerx = bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) / 2);
        var centery = bedbugGameCore.game_specs.grid.y + ((bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) / 2);

        // this.thunderstorm = this.game.add.text(centerx, centery, "THUNDERSTORM", {
        //   "font": "bold 80px Impact",
        //   "fill": "#fff",
        //   "align": "center"
        // })
        //this.thunderstorm = this.game.add.sprite(centerx, centery, "thunderstorm");
        //this.thunderstorm.alpha = 0;
        //this.thunderstorm.anchor.setTo(0.5, 0.5);
        //var offsetx = this.thunderstorm.width / 2;
        //this.thunderstorm.scale.setTo(2.5, 2.5);
        // this.thunderstorm.setShadow(1, 1, 'rgba(0,0,0,0.5)', 5);

        context.bonusStage = context.game.add.text(bedbugGameCore.game_specs.grid.x - 100, bedbugGameCore.game_specs.grid.y / 2 + 50, "", {
            "font": "bold 40px ArialRound",
            "fill": "#fff",
            "align": "center"
        })

        context.bonusStage.setText(bedbugGameCore.getLocalizedText("bonus_stage") + "1");
        context.bonusStage.alpha = 0;
        context.bonusStage.anchor.setTo(0.5, 0.5);
        context.bonusStage.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

        context.BonusGameGroup.addChild(context.infotextarea);
        context.BonusGameGroup.addChild(context.clouds);
        // this.BonusGameGroup.addChild(this.thunderstorm);
        context.BonusGameGroup.addChild(context.bonusStage);

        context.bonusMultipliers = {};

        _.times(4, function(i) {
            var step = i + 2;
            var pos = 3 - i;

            context.bonusMultipliers["x" + step] = {};

            context.bonusMultipliers["x" + step].on = context.game.add.sprite(bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) - (75 * pos) - 33, (bedbugGameCore.game_specs.grid.y / 2) + 16, 'on_x' + step);
            context.bonusMultipliers["x" + step].on.anchor.setTo(0.5, 0.5);
            context.bonusMultipliers["x" + step].on.scale.setTo(0.9, 0.9);

            // context.bonusMultipliers["x" + step].off = context.game.add.sprite(
            //   bedbugGameCore.game_specs.grid.x + (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) - (73 * pos) - 85,
            //   (bedbugGameCore.game_specs.grid.y / 2) + 16,
            //   'off_x' + step);
            // context.bonusMultipliers["x" + step].off.anchor.setTo(0.5, 0.5);
            // context.bonusMultipliers["x" + step].off.scale.setTo(0.9, 0.9);

            // context.bonusMultipliers["x" + step].off.width = context.bonusMultipliers["x" + step].off.height = 80;
            // context.bonusMultipliers["x" + step].on.width = context.bonusMultipliers["x" + step].on.height = 100;

            // context.bonusMultipliers["x" + step].off.alpha = 0;
            context.bonusMultipliers["x" + step].on.alpha = 0;
            context.BonusGameGroup.addChild(context.bonusMultipliers["x" + step].on);
            // context.BonusGameGroup.addChild(context.bonusMultipliers["x" + step].off);
        })


        // Start Animations
        // this.weatherChange("storm");


        // var clouds_appear = this.game.add.tween(this.clouds).to({
        //   y: -147
        // }, 2000, Phaser.Easing.Exponential.Out, true, 0);


        // var thunderstorm_text_appear = this.game.add.tween(this.thunderstorm).to({
        //   alpha: 1
        // }, 1000, Phaser.Easing.Exponential.Out, true, 1700);

        // var thunderstorm_text_move = this.game.add.tween(this.thunderstorm).to({
        //   x: bedbugGameCore.game_specs.grid.x + offsetx,
        //   y: bedbugGameCore.game_specs.grid.y / 2
        // }, 1000, Phaser.Easing.Exponential.Out, true, 3500);

        // var thunderstorm_text_scale = this.game.add.tween(this.thunderstorm.scale).to({
        //   x: 1,
        //   y: 1
        // }, 1000, Phaser.Easing.Exponential.Out, true, 3500);

        // var drop_stage_alpha = this.game.add.tween(this.bonusStage).to({
        //   alpha: 1
        // }, 400, Phaser.Easing.Exponential.Out, true, 4100);

        // Move the logo left
        // Theme.setLogoBonus(context);

        context.displayCenterMessage("THUNDERSTORM", 2);
        context.displayCenterMessage("IS COMING!", 2);

        // _.times(4, function(i) {
        //   var step = i + 2;
        //   var pos = context.bonusMultipliers["x" + step].off.x + 50;
        //   context.game.add.tween(context.bonusMultipliers["x" + step].off).to({
        //     alpha: 1,
        //     x: pos
        //   }, 200, Phaser.Easing.Exponential.Out, true, 2300 + (i * 200));
        // })


        // Move
        var stage_move = context.game.add.tween(context.bonusStage).to({
            x: bedbugGameCore.game_specs.grid.x + context.bonusStage.width / 2
        }, 400, Phaser.Easing.Exponential.Out, true, 2800);

        var infotextarea_text_appear = context.game.add.tween(context.infotextarea).to({
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
    requiresBonusStageUpgrade: function(serverResult, context) {
        // var context = this;

        if (bedbugGameCore.bonus_stage != serverResult.ActionLevel) {

            bedbugGameCore.bonus_stage = parseInt(serverResult.ActionLevel);

            bedbugEventsSystem.emitEvent('ON_BONUSGAME_STAGEUPGRADE');
            // bedbugGameCore.bonus_stage++;

            context.displayCenterMessage("STAGE " + bedbugGameCore.bonus_stage, 2);

            context.displayCenterMessage(bedbugGameCore.free_spins_left + " Free Spins", 2);

            // Set the multipliers  
            _.times(4, function(i) {
                var step = i + 2;
                // console.log(context);
                context.game.add.tween(context.bonusMultipliers["x" + step].on).to({
                    alpha: 0
                }, 200, Phaser.Easing.Exponential.Out, true);
            })

            context.bonusStage.setText(bedbugGameCore.getLocalizedText("bonus_stage") + bedbugGameCore.bonus_stage);
            context.game.add.tween(context.bonusMultipliers["x" + serverResult.spinMultiplier].on.scale).to({
                x: 1.6,
                y: 1.6
            }, 600, Phaser.Easing.Exponential.InOut, true, 200, 0, true);

            context.displayCenterMessage("x" + serverResult.spinMultiplier, 2.5);

            context.game.add.tween(context.bonusMultipliers["x" + serverResult.spinMultiplier].on).to({
                alpha: 1
            }, 300, Phaser.Easing.Bounce.Out, true, 200);

        }

        // Here we create the different stages visual components
        // Check against bedbugGameCore.isDesktop() for platform differences
        switch (bedbugGameCore.bonus_stage) {
            case 1:
                // STAGE 1 - MULTIPLAYER x2
                this.weatherChange("state1", true, context);
                break;
            case 2:
                // STAGE 2 - MULTIPLAYER x3
                this.weatherChange("state2", true, context);
                break;
            case 3:
                // STAGE 3 - MULTIPLAYER x4
                this.weatherChange("state3", true, context);
                break;
            case 4:
                // STAGE 4 - MULTIPLAYER x5
                this.weatherChange("state4", true, context);
                break;
        }

    },
    weatherChange: function(weatherName, ignoreBonus, context) {
      
        if (this.values.currentWeather == weatherName || (bedbugGameCore.bonus_status > 0 && !ignoreBonus)) {
            return;
        }
        console.log("Change Weather:");
        // var context = this;
        // Change the weather by transitioning from the currentWeather to the weatherName
        // Get the correct object
        var newWeather;

        newWeather = this.values.weatherGroups[weatherName];
console.log(newWeather);
        // Open Visibility of New Weather Object
        newWeather.visible = true; // NOT WORKING

        // Tween the Alpha of the two objects
        var tweenOn = context.game.add.tween(newWeather).to({
            alpha: 1
        }, 3000, Phaser.Easing.Linear.None, true);

        if (context.currentWeatherObj) {
            var tweenOff = context.game.add.tween(context.currentWeatherObj).to({
                alpha: 0
            }, 3000, Phaser.Easing.Linear.None, true);
            tweenOff.onComplete.add(closeOldWeather, this);
        }

        function closeOldWeather() {
            console.log("Close Old Weather");
            // // Close Visibility
            context.currentWeatherObj.visible = false;
            // // Store new current Weather Object
            context.currentWeatherObj = newWeather;

        }

        // Request ambiance sound for new stage
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_END_LAST')
            // Change the current weather for future refernce
        this.values.currentWeather = weatherName;
        // Request ambiance sound for new stage
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
    },
    weatherChangeBySymbol: function(symbolid, context) {

        var SUN = bedbugGameCore.symbolNameToID('SUN');
        var CLOUD = bedbugGameCore.symbolNameToID('CLOUD');
        var RAIN = bedbugGameCore.symbolNameToID('RAIN');
        var WIND = bedbugGameCore.symbolNameToID('WIND');
        var SNOW = bedbugGameCore.symbolNameToID('SNOW');

        switch (symbolid) {
            case SUN:
                this.weatherChange("sun", true, context);
                break;
            case CLOUD:
                this.weatherChange("cloud", true, context);
                break;
            case RAIN:
                this.weatherChange("storm", true, context);
                break;
            case WIND:
                this.weatherChange("wind", true, context);
                break;
            case SNOW:
                this.weatherChange("snow", true, context);
                break;
        }
    },
    /*********************************************************************************************
     * This is responsible to display the bonus game info. Do whatever you want with it.
     *********************************************************************************************/
    updateBonusInfo: function(totalwin, freespins, context) {
        if (context.infotextarea)
            context.infotextarea.setText(bedbugGameCore.getLocalizedText('MSG_FREE_SPINS_REMAIN').replace("$(1)", freespins).replace("$(2)", totalwin));
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
        var that = this;

        // Reset Values
        bedbugGameCore.bonus_status = 0;
        bedbugGameCore.bonus_stage = 0;
        bedbugGameCore.bonus_multiplier = 1;

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
        
        // Update the Text
        this.freespins_text.setText(bedbugGameCore.getLocalizedText('MSG_FREE_SPINS_END').replace("$(1)", bedbugGameCore.bonus_total_coins + "\n").replace("$(2)", "\n" + bedbugGameCore.bonus_total_free_spins));
        this.freespins_text.fontSize = 60;

        //context.game.bringToTop(this.spinsGroup);
        this.SpinTweenEndAlpha.onComplete.add(function() {
            // console.log("CLOSING FREESPINS");
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




        var winIs = bedbugGameCore.bonus_total_coins;

        function proceed() {

            var stage_alpha = context.game.add.tween(context.BonusGameGroup).to({
                alpha: 0
            }, 500, Phaser.Easing.Exponential.Out, true, 1000);

            // var clouds_appear = context.game.add.tween(context.clouds).to({
            //   y: -379
            // }, 1000, Phaser.Easing.Exponential.Out, true);

            that.weatherChange("sun", true, context);

            stage_alpha.onComplete.add(function() {
                context.BonusGameGroup.destroy(true);
            })


            // Controls.showPlay();
            // Controls.showControls(context.game);

            bedbugGameCore.bonus_total_coins = 0;

            // bedbugGameCore.controls_enabled = true;

            if (bedbugGameCore.autoplay_count > 0) {
                // Pass the autoplay validatation in order to continue auto-playing
                var waitTime = 2000;

                if (winIs > 2) waitTime = 5000;

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

            }else {
                Controls.showPlay();
                Controls.showControls(context.game);
                bedbugGameCore.controls_enabled = true;
            }
        }


    }
}
