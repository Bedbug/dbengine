Theme = {
    /*********************************************************************************************
     * values:
     * Holds all properties used by Theme. You can reference them from child methods
     * with "this". e.g. this.lines["line02"]
     *********************************************************************************************/
    values: {
        customWinningBanner: false,
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
            bitmapFont: "pointfonts",
            fontSize: 140
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

        // console.log(context.game.antialias);
        context.game.antialias = true;
        // console.log(context.game.antialias);
        var that = this;

        
        //bedbugGameCore.ambianceKey = "music_main_loop";

        var game_background = context.game.add.sprite(0, 0, "mainSet",'Sky_Background.jpg');

        // game_background.height = context.game.height;
        game_background.width = context.game.width;
        
        var cloudDust = context.game.add.sprite(-600, -50, "mainSet",'CloudDust.png');
        cloudDust.scale.setTo(3,1.5);
        var cloudsTween = context.game.add.tween(cloudDust);
        cloudsTween.to({
            x: 0
        }, 50000, Phaser.Easing.Linear.InOut, true, 0, -1, true);

        cloudsTween.yoyo(true, 3000);
        cloudsTween.start();
        
        
        var floor = context.game.add.sprite(0, 0, "mainSet",'Floor.png');
        
        var camel = context.game.add.sprite(900, 200, "mainSet",'camel_00000.png');
        camel.scale.setTo(.7);
        var camelAnim = camel.animations.add("camelAnim", Phaser.Animation.generateFrameNames("camel_", 0, 105, '.png', 5), 24, true);
        camelAnim.play(40);
        
        var camelTween = context.game.add.tween(camel);
        camelTween.to({
            x: -600
        }, 91000, Phaser.Easing.Linear.none, true).loop(true);
        
        // camelTween.onRepeat.add(camelTweenLoop, this);
        // camelTween.onComplete.add(camelTweenReset, this);
        
        
        // function camelTweenLoop() {
        //     console.log("Animation Looped!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //     camel.x = 600;
        //     //camelTween.play();
        // }
        // function camelTweenReset() {
        //     console.log("Animation ended!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //     camel.x = 600;
        //     //camelTween.play();
        // }
        
        var palmLeft =  context.game.add.sprite(0, 0, "mainSet",'PalmLeft.png');
        var palmRight =  context.game.add.sprite(0, 0, "mainSet",'PalmRight.png');
        
        var movingPalm = context.game.add.sprite(-43, 180, "mainSet",'MovingPalm.png');
        var palmTween = context.game.add.tween(movingPalm);
        palmTween.to({
            x: -46
        }, 2000, Phaser.Easing.Linear.Out, true, 0, -1, true);

        palmTween.yoyo(true, 0);
        palmTween.start();
        
        var pylons = context.game.add.sprite(-15, -20, "mainSet",'Pylons.png');
        var rockUi = context.game.add.sprite(context.game.width/2, 400, "mainSet",'rockui.png');
        rockUi.scale.setTo(.9);
        rockUi.anchor.setTo(.5);
        
       this.stone0 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop0 = this.stone0.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 0, 3, '.png', 4), 6, false);
        this.dust0 = context.game.add.sprite(0, 0, "stones",'Comp 1_00033.png');
        this.stoneDust0 = this.dust0.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 1, '.png', 5), 24, false);
        
        this.stone1 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop1 = this.stone1.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 0, 10, '.png', 4), 6, false);
        this.dust1 = context.game.add.sprite(-310, 200, "stones",'Comp 1_00033.png');
        this.stoneDust1 = this.dust1.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone2 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop2 = this.stone2.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 11, 20, '.png', 4), 6, false);
        this.dust2 = context.game.add.sprite(-150, 200, "stones",'Comp 1_00033.png');
        this.stoneDust2 = this.dust2.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone3 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop3 = this.stone3.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 21, 30, '.png', 4), 6, false);
        this.dust3 = context.game.add.sprite(0, 200, "stones",'Comp 1_00033.png');
        this.stoneDust3 = this.dust3.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone4 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop4 = this.stone4.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 31, 40, '.png', 4), 24, false);
        this.dust4 = context.game.add.sprite(150, 200, "stones",'Comp 1_00033.png');
        this.stoneDust4 = this.dust4.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone5 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop5 = this.stone5.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 41, 50, '.png', 4), 24, false);
        this.dust5 = context.game.add.sprite(300, 200, "stones",'Comp 1_00033.png');
        //dust5.scale.setTo(-1,1);
        this.stoneDust5 = this.dust5.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone6 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop6 = this.stone6.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 51, 60, '.png', 4), 24, false);
        this.dust6 = context.game.add.sprite(-310, 65, "stones",'Comp 1_00033.png');
        this.stoneDust6 = this.dust6.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone7 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop7 = this.stone7.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 61, 70, '.png', 4), 24, false);
        this.dust7 = context.game.add.sprite(-150, 65, "stones",'Comp 1_00033.png');
        this.stoneDust7 = this.dust7.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone8 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop8 = this.stone8.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 71, 80, '.png', 4), 24, false);
        this.dust8 = context.game.add.sprite(-0, 65, "stones",'Comp 1_00033.png');
        this.stoneDust8 = this.dust8.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone9 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop9 = this.stone9.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 81, 90, '.png', 4), 24, false);
        this.dust9 = context.game.add.sprite(150, 65, "stones",'Comp 1_00033.png');
        this.stoneDust9 = this.dust9.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone10 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop10 = this.stone10.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 91, 100, '.png', 4), 24, false);
        this.dust10 = context.game.add.sprite(300, 65, "stones",'Comp 1_00033.png');
        this.stoneDust10 = this.dust10.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        //dust10.scale.setTo(-1,1);
        
        this.stone11 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop11 = this.stone11.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 101, 110, '.png', 4), 24, false);
        this.dust11 = context.game.add.sprite(-310, -70, "stones",'Comp 1_00033.png');
        this.stoneDust11 = this.dust11.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone12 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop12 = this.stone12.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 111, 120, '.png', 4), 24, false);
        this.dust12 = context.game.add.sprite(-150, -70, "stones",'Comp 1_00033.png');
        this.stoneDust12 = this.dust12.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone13 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop13 = this.stone13.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 121, 130, '.png', 4), 24, false);
        this.dust13 = context.game.add.sprite(-0, -70, "stones",'Comp 1_00033.png');
        this.stoneDust13 = this.dust13.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone14 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop14 = this.stone14.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 131, 140, '.png', 4), 24, false);
        this.dust14 = context.game.add.sprite(150, -70, "stones",'Comp 1_00033.png');
        this.stoneDust14 = this.dust14.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        
        this.stone15 = context.game.add.sprite(0, -35, "stones",'rockDrop.0001.png');
        this.stoneDrop15 = this.stone15.animations.add("stoneDrop", Phaser.Animation.generateFrameNames("rockDrop.", 141, 150, '.png', 4), 24, false);
        this.dust15 = context.game.add.sprite(300, -70, "stones",'Comp 1_00033.png');
        this.stoneDust15 = this.dust15.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 24, false);
        //dust15.scale.setTo(-1,1);
        
        // TOP STONE
        this.topStone = context.game.add.sprite(0, -35, "extras",'topDrop.0000.png');
        this.topStoneAnim = this.topStone.animations.add("topDrop", Phaser.Animation.generateFrameNames("topDrop.", 0, 10, '.png', 4), 20, false);
        // TOP STONE DUST
        this.dust16 = context.game.add.sprite(-890, -210, "stones",'Comp 1_00033.png');
        this.dust16.scale.setTo( 2, 1);
        // this.dust16.anchor.setTo(.5);
        this.stoneDust16 = this.dust16.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 20, false);
        this.dust17 = context.game.add.sprite(-440, -210, "stones",'Comp 1_00033.png');
        this.dust17.scale.setTo(2, 1);
        // this.dust17.anchor.setTo(.5);
        this.stoneDust17 = this.dust17.animations.add("stoneDust", Phaser.Animation.generateFrameNames("Comp 1_", 0, 33, '.png', 5), 20, false);
        //  this.dust16 = context.game.add.sprite(-440, -210, "stones",'Comp 1_00025.png');
        //  this.dust16.scale.setTo(2,1);
         
        this.stoneSprites = [];
         this.stoneSprites.push(this.stone0);
         this.stoneSprites.push(this.stone1);
         this.stoneSprites.push(this.stone2);
         this.stoneSprites.push(this.stone3);
         this.stoneSprites.push(this.stone4);
         this.stoneSprites.push(this.stone5);
         this.stoneSprites.push(this.stone6);
         this.stoneSprites.push(this.stone7);
         this.stoneSprites.push(this.stone8);
         this.stoneSprites.push(this.stone9);
         this.stoneSprites.push(this.stone10);
         this.stoneSprites.push(this.stone11);
         this.stoneSprites.push(this.stone12);
         this.stoneSprites.push(this.stone13);
         this.stoneSprites.push(this.stone14);
         this.stoneSprites.push(this.stone15);
        
        this.stones = [];
         this.stones.push(this.stoneDrop0);
         this.stones.push(this.stoneDrop1);
         this.stones.push(this.stoneDrop2);
         this.stones.push(this.stoneDrop3);
         this.stones.push(this.stoneDrop4);
         this.stones.push(this.stoneDrop5);
         this.stones.push(this.stoneDrop6);
         this.stones.push(this.stoneDrop7);
         this.stones.push(this.stoneDrop8);
         this.stones.push(this.stoneDrop9);
         this.stones.push(this.stoneDrop10);
         this.stones.push(this.stoneDrop11);
         this.stones.push(this.stoneDrop12);
         this.stones.push(this.stoneDrop13);
         this.stones.push(this.stoneDrop14);
         this.stones.push(this.stoneDrop15);
        
        this.dusts = [];
        this.dusts.push(this.stoneDust0);
        this.dusts.push(this.stoneDust1);
        this.dusts.push(this.stoneDust2);
        this.dusts.push(this.stoneDust3);
        this.dusts.push(this.stoneDust4);
        this.dusts.push(this.stoneDust5);
        this.dusts.push(this.stoneDust6);
        this.dusts.push(this.stoneDust7);
        this.dusts.push(this.stoneDust8);
        this.dusts.push(this.stoneDust9);
        this.dusts.push(this.stoneDust10);
        this.dusts.push(this.stoneDust11);
        this.dusts.push(this.stoneDust12);
        this.dusts.push(this.stoneDust13);
        this.dusts.push(this.stoneDust14);
        this.dusts.push(this.stoneDust15);
        
        this.stonesDroping = false;
        this.stoneCount = 0;
        
        this.playStoneAnim = function(stoneAnim, stoneCount) {
            // console.log('stoneCount: ',this.stoneCount);
            if(this.stoneSprites[this.stoneCount]){
                // console.log("Visible: ",this.stoneSprites[this.stoneCount].visible);
                this.stoneSprites[this.stoneCount].visible = true;
            }
                
                if(stoneAnim) {
                    stoneAnim.play( context.game.rnd.integerInRange(50, 60), false);
                    this.stoneCount++;
                    // console.log("StoneCount: ",this.stoneCount);
                    // console.log("StoneAnim: ",stoneAnim);
                    
                    
                    
                    if( stoneAnim == this.stones[5] || stoneAnim == this.stones[10]){
                        // console.log(stoneAnim.currentFrame);
                        stoneAnim.enableUpdate = true;
            
                        // stoneDrop5.onUpdate.add(checkFrame, this);
                         stoneAnim.onUpdate.add(function () {	
                            //  console.log(stoneAnim.currentFrame.name);
                                if( stoneAnim.currentFrame.name == "rockDrop.0045.png" || stoneAnim.currentFrame.name == "rockDrop.0046.png" ||  stoneAnim.currentFrame.name == "rockDrop.0047.png" ||   stoneAnim.currentFrame.name == "rockDrop.0097.png" ||  stoneAnim.currentFrame.name == "rockDrop.0098.png")
                                    this.lensFlare.visible = false;
                                else
                                    this.lensFlare.visible = true;
                               
                               }, this);
                     }else
                        this.lensFlare.visible = true;
                        
                    //stoneAnim.onAnimationComplete 
                    stoneAnim.onComplete.add(function () {	
                        // console.log("StoneAnim END: ",stoneAnim);
                        if( stoneAnim == this.stones[15]) { // The Last one
                            this.lensFlare.visible = false;
                            this.stonesDroping = false;
                            
                            // Top stone drop
                            this.topStoneAnim.play();
                            //this.topStoneAnim.onComplete.add(function())
                            
                            context.game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){
                                 this.stoneDust16.play();
                                this.stoneDust17.play();
                                
                            }, this);
                            // this.topStoneAnim.onComplete.add(function () {
                               
                            // }, this);
                            
                            
                            
                        }else{
                            this.lensFlare.visible = true;
                        }
                        
                        // Show Dust
                        if(this.dusts[this.stoneCount-1])
                        this.dusts[this.stoneCount-1].play( context.game.rnd.integerInRange(20,40), false);
                           
                        stoneAnim.onComplete.removeAll();
                        
                        this.playStoneAnim(this.stones[this.stoneCount], this.stoneCount);
                        // console.log('animation complete');
                        
                    }, this);
                }
        }
        
         
        
        this.lensFlare = context.game.add.sprite(context.game.width/2 + 200, context.game.height/2, "mainSet",'lensflare.png');
        this.lensFlare.anchor.setTo(.5,.5);
        this.lensFlare.scale.setTo(1.5);
        this.lensFlare.alpha = .5;
       
        
        this.firstStone = this.stoneDrop0.play( 2, false);
        this.firstStone.onComplete.add(function () {
            
                 
                    this.stoneCount++;
                    this.playStoneAnim(that.stones[that.stoneCount], that.stoneCount);
                    // console.log('First animation complete');
                 
                }, this);




        function onDragStop(sprite, pointer) {
            console.log(sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y);
        }


        // // FREE SPINS
        // this.freeSpins = context.game.add.sprite((context.game.width / 2)+30, (context.game.height / 2) - 30, "assets")
        // this.freeSpins.frameName = "free-spin-popup.png";
        // this.freeSpins.anchor.setTo(.5, .5);
        // this.freeSpins.alpha = 0;

        // var style3 = this.styles.freespin_label;

        // this.freespins_text = context.game.add.text((context.game.width / 2)+15, (context.game.height / 2) -30 , "", style3);
        // this.freespins_text.anchor.setTo(0.5, 0.5);
        // // bedbugGameCore.bigwinLabel_text.x = (this.game.width / 2);
        // // bedbugGameCore.bigwinLabel_text.y = (this.game.height / 2);
        // this.freespins_text.addColor('#fff', 0);
        // this.freespins_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        // this.freespins_text.stroke = '#000';
        // this.freespins_text.strokeThickness = 6;
        // this.freespins_text.alpha = 0;
        // context.spinsGroup = context.game.add.group();
        // context.spinsGroup.add(this.freeSpins);
        // context.spinsGroup.add(this.freespins_text);

        /**************
         **   WINS
         ***************/

        context.winGroupbg = context.game.add.group();
        context.winGroup = context.game.add.group();


        this.bigwin = context.game.add.sprite((context.game.width / 2), (context.game.height / 2) - 75, 'assets', 'big-win.png');
        this.bigwin.anchor.setTo(0.5, 0.5);
        this.bigwin.scale.setTo(1, 1);
        this.bigwin.alpha = 0;
        context.winGroup.add(this.bigwin);


       

    },
    update: function() {

        this.filter.update();

    },
    playBigWin: function(context, callback) {
        var that = this;
        context.winGroup.visible = true;
        context.winGroupbg.visible = true;
        this.bigwin.alpha = 1;
        context.game.world.bringToTop(context.winGroup);

        context.game.world.bringToTop(bedbugGameCore.bigwinLabel_text);
        // Win Label Extra Style 
        bedbugGameCore.bigwinLabel_text.y = (context.game.height / 2) - 30;
        bedbugGameCore.bigwinLabel_text.x = context.game.width / 2;
        // bedbugGameCore.bigwinLabel_text.addColor('#e4e347', 0);
        // bedbugGameCore.bigwinLabel_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
        // bedbugGameCore.bigwinLabel_text.stroke = '#cc3a00';
        // bedbugGameCore.bigwinLabel_text.strokeThickness = 10;


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
            }, 5000);
        })

        // Open the top Lights
        // this.openLights();

    },
    hideBigWin: function(context) {
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
    stoneDropAnimation: function() {
        // console.log("STONE DROPP CALLED!!!!!!!");
        if(!this.stonesDroping) {
            
            // console.log("Doing the animation ",this.stonesDroping);
            this.stonesDroping = true;
            for(var i = 0; i < this.stones.length; i++) {
              this.stoneSprites[i].frameName = "rockDrop.0001.png";
                // this.stoneSprites[i].visible = false;
            }
            
            this.lensFlare.visible = true;
            
            this.topStone.frameName = "topDrop.0000.png";
             this.stoneCount = 0;
             this.firstStone.play(2, false);
        }else {
            // console.log("NOT Doing the animation ",this.stonesDroping);
        }
         //this.playStoneAnim(this.stones[this.stoneCount], this.stoneCount);
    },
    
    createAnticipationAnimation: function(reelName, x, y) {
        // var anticipation = bedbugGameCore.game.add.sprite(x, y + 30, "assets", "scat_anticipation_01.png");
        // anticipation.anchor.setTo(0.5, .1);
        // anticipation.scale.setTo(0, 0.5);
        // anticipation.animations.add("Reel_Anticipation", Phaser.Animation.generateFrameNames("scat_anticipation_", 1, 5, ".png", 2), 16, true);
        // anticipation.play("Reel_Anticipation", 16, true);
        // anticipation.alpha = 0;

        // this.values.reelAnticipations.push({
        //     reel: reelName,
        //     animation: anticipation
        // });
        // // Play the first one immediatly
        // if (this.values.reelAnticipations.length == 1)
        //     this.anticipationPlay(anticipation);
    },
    removeAnticipationAnimation: function(reelName) {
        // _.remove(this.values.reelAnticipations, {
        //     reel: reelName
        // })[0].animation.destroy();
        // if (this.values.reelAnticipations.length > 0)
        //     this.anticipationPlay(this.values.reelAnticipations[0].animation);
    },
    anticipationPlay: function(anticipation) {
        // bedbugGameCore.game.add.tween(anticipation.scale).to({
        //     x: 1,
        //     y: 1.0
        // }, 500, Phaser.Easing.Exponential.Out, true);

        // bedbugGameCore.game.add.tween(anticipation).to({
        //     alpha: 1
        // }, 500, Phaser.Easing.Exponential.Out, true);

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

            // console.log("Dots start",line.dots.sprite_name);

            //start_dot = context.game.add.button(line.dots.start[0], line.dots.start[1], 'assets', null, null, "payline-on.png", "payline-off.png", "payline-on.png", "payline-off.png");
            start_dot = context.game.add.sprite(line.dots.start[0], line.dots.start[1], 'symbols', line.dots.sprite_name+".png");
            
            start_dot.animations.add("dotAnim",  Phaser.Animation.generateFrameNames(line.dots.sprite_name, 0, 50, ".png", 5), 24, true)
            
            start_dot.anchor.set(0.5, 0.5);
            // start_dot.alpha = 0.1;
            start_dot.inputEnabled = true;
            start_dot.events.onInputOver.add(lineContext.showLine, lineContext);
            start_dot.events.onInputOver.add(start_playAnim, this);
            
            start_dot.events.onInputOut.add(lineContext.hideLine, lineContext);
            start_dot.events.onInputOut.add(start_stopAnim, this);

            function start_playAnim() {
                // console.log("Playing Animation");
                start_dot.animations.play("dotAnim", 24, true);
            }
            
            function start_stopAnim() {
                 start_dot.animations.stop("dotAnim");
                start_dot.frameName = line.dots.sprite_name+".png";
            }
           
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
            
            end_dot = context.game.add.sprite(line.dots.end[0], line.dots.end[1], 'symbols', line.dots.sprite_name+".png");
            
            end_dot.animations.add("dotAnim",  Phaser.Animation.generateFrameNames(line.dots.sprite_name, 0, 50, ".png", 5), 24, true)
            
            end_dot.anchor.set(0.5, 0.5);
            // start_dot.alpha = 0.1;
            end_dot.inputEnabled = true;
            end_dot.events.onInputOver.add(lineContext.showLine, lineContext);
            end_dot.events.onInputOver.add(end_playAnim, this);
            
            end_dot.events.onInputOut.add(lineContext.hideLine, lineContext);
            end_dot.events.onInputOut.add(end_stopAnim, this);

            function end_playAnim() {
                // console.log("Playing Animation");
                end_dot.animations.play("dotAnim", 24, true);
            }
            
            function end_stopAnim() {
                 end_dot.animations.stop("dotAnim");
                end_dot.frameName = line.dots.sprite_name+".png";
            }
            //end_dot = context.game.add.button(line.dots.end[0], line.dots.end[1], 'line_dot', null, null, 1, 0);
            // end_dot = context.game.add.button(line.dots.end[0], line.dots.end[1], 'assets', null, null, "payline-on.png", "payline-off.png", "payline-on.png", "payline-off.png");
            // end_dot.anchor.set(0.5, 0.5);
            // // end_dot.alpha = 0.1;
            // end_dot.onInputOver.add(lineContext.showLine, lineContext);
            // end_dot.onInputOut.add(lineContext.hideLine, lineContext);

            
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


        // WinBoxes
        // var winboxes = [];
        var winbox1 = context.game.add.sprite(0, 0, "symbols", "winbox_00000.png");
            winbox1.anchor.setTo(.5,.5);
            winbox1.animations.add("winboxglow", Phaser.Animation.generateFrameNames("winbox_", 1, 25, '.png', 5), 24, true);
            winbox1.animations.play("winboxglow", 24, true);
        var winbox2 = context.game.add.sprite(0, 0, "symbols", "winbox_00000.png");
            winbox2.anchor.setTo(.5,.5);
            winbox2.animations.add("winboxglow", Phaser.Animation.generateFrameNames("winbox_", 1, 25, '.png', 5), 24, true);
            winbox2.animations.play("winboxglow", 24, true);
        var winbox3 = context.game.add.sprite(0, 0, "symbols", "winbox_00000.png");
            winbox3.anchor.setTo(.5,.5);
            winbox3.animations.add("winboxglow", Phaser.Animation.generateFrameNames("winbox_", 1, 25, '.png', 5), 24, true);
            winbox3.animations.play("winboxglow", 24, true);
        var winbox4 = context.game.add.sprite(0, 0, "symbols", "winbox_00000.png");
            winbox4.anchor.setTo(.5,.5);
            winbox4.animations.add("winboxglow", Phaser.Animation.generateFrameNames("winbox_", 1, 25, '.png', 5), 24, true);
            winbox4.animations.play("winboxglow", 24, true);
        var winbox5 = context.game.add.sprite(0, 0, "symbols", "winbox_00000.png");
            winbox5.anchor.setTo(.5,.5);
            winbox5.animations.add("winboxglow", Phaser.Animation.generateFrameNames("winbox_", 1, 25, '.png', 5), 24, true);
            winbox5.animations.play("winboxglow", 24, true);
        
        // winboxes.push(winbox1);
        // winboxes.push(winbox2);
        // winboxes.push(winbox3);
        // winboxes.push(winbox4);
        // winboxes.push(winbox5);

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
        //lineContext.pointsbg = null;
        var style = {
            // 'font': '100px Arial',
            // 'fill': 'white'
            font: " 80px Contrail",
            fill: "#e4e347",
            align: "center",
        };

        // if (start_dot) {
        //     gfx2.moveTo(start_dot.x, start_dot.y);
        //     gfx.moveTo(start_dot.x, start_dot.y);
        // }

        var reelPoint = 0;
        var slot;
        _.forEach(line.slots, function(row) {
            
            reelPoint++;
            slot = bedbugGameCore.Reels[reelPoint - 1].GetWorldPosition(row);
            //console.log(slot);
            // Add  WinBox
            // console.log(reelPoint, winboxes[reelPoint - 1])
            if (reelPoint == 1) {
             winbox1.x = slot.x;
             winbox1.y = slot.y;
            }
            if (reelPoint == 2) {
             winbox2.x = slot.x;
             winbox2.y = slot.y;
            }
            if (reelPoint == 3) {
             winbox3.x = slot.x;
             winbox3.y = slot.y;
            }
            if (reelPoint == 4) {
             winbox4.x = slot.x;
             winbox4.y = slot.y;
            }
            if (reelPoint == 5) {
             winbox5.x = slot.x;
             winbox5.y = slot.y;
            }
             
            // gfx2.addChild(winbox1);
            // gfx2.addChild(winbox1);
            // Define starting point of the Payline
            // if (reelPoint == 1 && start_dot) {
            //     gfx2.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5) - 5, slot.y);
            //     gfx.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);
            // }
            // if (reelPoint == 1 && !start_dot) {
            //     gfx2.moveTo(slot.x, slot.y + heightLine);
            //     gfx.moveTo(slot.x, slot.y + heightLine);
            // }
            // else {
            //     gfx2.lineTo(slot.x, slot.y + heightLine);
            //     gfx.lineTo(slot.x, slot.y + heightLine);
            // }

            //// Here we create the lable that will hold the point of the winning line.
            //// WARNING: Leave as it is.
            if (reelPoint == 3) {
                // lineContext.PointsLabel = context.game.add.text(slot.x, slot.y, "", style);
                // lineContext.PointsLabel.addColor('#e4e347', 0);
                // lineContext.PointsLabel.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
                // lineContext.PointsLabel.stroke = '#cc3a00';
                // lineContext.PointsLabel.strokeThickness = 5;
                // lineContext.PointsLabel.resolution = 2;
                //lineContext.pointsbg = context.game.add.sprite(slot.x, slot.y, "assets", "payline-win-tab.png")
               // lineContext.pointsbg.anchor.setTo(0.5, 0.5);
                //lineContext.pointsbg.visible = false;
                lineContext.PointsLabel = context.game.add.bitmapText(slot.x, slot.y, "pointfonts", "", 75);
                lineContext.PointsLabel.letterSpacing = 25;
                lineContext.PointsLabel.anchor.setTo(0.5, 0.5);
                //lineContext.PointsLabel.scale.setTo(1.2, 1.2);
            }
           
        })

        // Define ending point of the Payline
        // if (line.dots.end && !slim) {
        //     gfx2.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5) + 5, slot.y);
        //     gfx.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);
        // }
        //winLine.addChild(winboxes);
        winLine.addChild(winbox1);
        winLine.addChild(winbox2);
        winLine.addChild(winbox3);
        winLine.addChild(winbox4);
        winLine.addChild(winbox5);
        
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

        context.infotextarea = context.game.add.text(infox + 30, infoy, "", {
            "font": "bold 18px Contrail",
            "fill": "#fff",
            "align": "center"
        })

        context.infotextarea2 = context.game.add.text(infox + 330, infoy, "", {
            "font": "bold 18px Contrail",
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

        // Open The Red Background
        this.closeRed(context);


        // var winIs = bedbugGameCore.bonus_total_coins;
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
            }
        }


    }
}
