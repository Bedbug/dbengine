Splash = {
    create: function(context) {
        
        bedbugGameCore.ambianceKey = "music_main_loop";
        bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');
        
        var splashBg = context.game.add.sprite(context.game.width / 2, (context.game.height / 2) , "screens2","Splash.png");
        splashBg.anchor.setTo(.5);
        
       // Screen1
       var splashWin1 = context.game.add.sprite(context.game.width / 2, (context.game.height / 2) , "screens2","SplashWin1.png");
        splashWin1.anchor.setTo(.5);
        splashWin1.alpha = 0;
        var splashWin1Text = context.game.add.sprite(context.game.width / 2 - 10, (context.game.height / 2) , "screens2","SplashWin1Text.png");
        splashWin1Text.anchor.setTo(.5);
        splashWin1Text.alpha = 0;
        
        var screen1 = context.game.add.tween(splashWin1).to({
          alpha:1
        },1000, "Linear", true, 500, -1);
        screen1.yoyo(true, 4000);
        screen1.repeatDelay(4000);
        
        var screen1text = context.game.add.tween(splashWin1Text).to({
          alpha:1,
          x:context.game.width / 2 + 20
        },2000, Phaser.Easing.Exponential.Out, true, 1500, -1);
        screen1text.yoyo(true, 1000);
        screen1text.repeatDelay(5000);
        
        
        //Screen2
         var splashWin2 = context.game.add.sprite(context.game.width / 2, (context.game.height / 2) , "screens2","SplashWin2.png");
        splashWin2.anchor.setTo(.5);
        splashWin2.alpha = 0;
        var splashWin2Text = context.game.add.sprite(context.game.width / 2 , (context.game.height / 2) -30, "screens2","SplashWin2Text.png");
        splashWin2Text.anchor.setTo(.5);
        splashWin2Text.alpha = 0;
        
        var screen2 = context.game.add.tween(splashWin2).to({
          alpha:1
        },1000, "Linear", true, 4500, -1);
        screen2.yoyo(true, 4000);
        screen2.repeatDelay(4000);
        
        var screen2text = context.game.add.tween(splashWin2Text).to({
          alpha:1,
          y:context.game.height / 2 
        },2000, Phaser.Easing.Exponential.Out, true, 5500, -1);
        screen2text.yoyo(true, 1000);
        screen2text.repeatDelay(5000);
        
        
        
        var style = {
            font: "bold 30px ArialRound",
            fill: "#fff",
            align: "center",
            wordWrap: true,
            wordWrapWidth: "400"
        }
        // screen1.onComplete.add(function() {
        //     context.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                
                
        //   }, this);
        // },this)
        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
        
        //screen1.repeat(true, 3000);
        
        // screen1.yoyoDelay(4000);
        // var screen2 = context.game.add.tween(splashWin2).from({
        //   alpha: 0
        // }, 1000, Phaser.Easing.Exponential.InOut, true, 4000, true);
        // screen2.repeatDelay(4000);
        // screen2.yoyoDelay(4000);
        // var wildSprite = context.game.add.sprite(400, 230, "assets", "wild-norm.png");
        // wildSprite.anchor.setTo(.5);
        // // bedbugGameCore.getLocalizedText('txt_paytable_page_01_info_01')
        // var wildInfo_text = context.game.add.bitmapText( wildSprite.x, 380, "contrail_small", bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_01'), 30);
        // wildInfo_text.anchor.setTo(.5, .5);
        // wildInfo_text.align = "center";
        // wildInfo_text.maxWidth = 400;
        // wildInfo_text.lineSpacing = 100;
        // //context.wildInfo_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        // //context.wildInfo_text.resolution = 2;

        // // var scatterHelpText = bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_02") ;
        // // scatterHelpText += bedbugGameCore.getLocalizedText("TXT_FTHS_INFO_04") + "\n\n";
        // var wildSprite2 = context.game.add.sprite(1020, 320, "assets2", "wilds_stacked.png");
        // wildSprite2.scale.setTo(1.15);
        // wildSprite2.anchor.setTo(.5);
        
        // var wildInfo_text2 = context.game.add.bitmapText(780, 320, "contrail_small", bedbugGameCore.getLocalizedText('TXT_FTHS_INFO_02'), 30);
        // wildInfo_text2.anchor.setTo(.5, .5);
        // wildInfo_text2.align = "center";
        // wildInfo_text2.maxWidth = 300;
       
       
       // Test Creature SYmbol
    //   var scatterCret = context.game.add.creature(450, 350, 'scatCreatureImg', 'scatCreatureJson');
    //     scatterCret.play(true);
    //   scatterCret.scale.set(25.0);
    
        
       
       
       
       
        context.continue_button = context.game.add.sprite( context.game.width/2  , 755, 'screens', 'papyrus.0004.png');
        context.continue_button.anchor.setTo(0.5, 0.5);
        context.continue_button.angle = 90;
        context.continue_button.scale.setTo(0.6, 0.6);
        
        context.continue_button2 = context.game.add.button( context.game.width/2 , 654 - 2, 'screens2', context.nextState, context, 'BigButtonHover.png', 'BigButtonNormal.png', 'BigButtonPressed.png', 'BigButtonNormal.png');
        context.continue_button2.anchor.setTo(0.5, 0.5);
        // context.continue_button.angle = 90;
        context.continue_button2.scale.setTo(1.3, 1.3);
        // context.continue_button.hitArea = new Phaser.Rectangle(0, 0, 500, 500);
        context.continue_text = context.game.add.bitmapText(context.game.width/2 -4, 654, "contrail_small", bedbugGameCore.getLocalizedText('CONTINUE_LABEL'), 28);
        
        // context.continue_text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
        context.continue_text.anchor.setTo(0.5, 0.5);
        // context.continue_text.resolution = 2;
        //context.continue_button.addChild(context.continue_text);
    }
}
