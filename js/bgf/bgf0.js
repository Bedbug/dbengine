bedbugGameCore.Boot = function(game) {}


bedbugGameCore.Boot.prototype = {
    init: function() {
        var context = this;

        // Do not pause if game looses focus
        this.stage.disableVisibilityChange = true;

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.windowConstraints = {
            "right": "layout",
            "bottom": "visual"
        };

        bedbugGameCore.orientated = true;

        this.scale.fullScreenTarget = document.querySelector('#viewport');
        // this.scale.forceOrientation(true, false);
        // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

        this.game.scale.compatibility.supportsFullScreen = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        // console.log("Setting fullscreen listener");
        // this.game.input.onDown.add(this.goFullscreen, this);

        this.game.onBlur.add(this.onBlur, this);
        this.game.onFocus.add(this.onFocus, this);

        window.addEventListener('resize', this.gameResized.bind(this));

        this.game.scale.onSizeChange.add(this.gameResized, this);

        if (!this.game.device.desktop && this.game.device.requestFullscreen != '') {
            this.game.scale.startFullScreen(true);
            this.game.input.onTap.add(this.goFullscreen, this);
        }

        // fix for ios8/9 for iphone . Show slide up animation
        if (this.game.device.iPhone) {
            bedbugGameCore.CSSscrollUpDiv = document.getElementsByClassName('scrollup')[0];
            bedbugGameCore.CSSscrollUpImageDiv = document.getElementsByClassName('scrollupimage')[0];
        }
        
        // Removes the scroll up element in desktop devices
        if(this.game.device.desktop)
            $(".scrollup").css("display","none");

        if (this.game.device.iOS) {
            window.addEventListener('scroll', function() {

                // if(!bedbugGameCore.isDisplayingInput)
                context.gameResized();
                // Do not scroll when keyboard is visible
                // if (document.activeElement === document.body && window.scrollY > 0) {
                //     document.body.scrollTop = 0;
                // }
            }, true);
        }

        // Disable Pinch Zoom
        document.documentElement.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, false);

        // if (!this.game.device.desktop) {
        //     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //     console.log(domElement);
        //     // this.scale.pageAlignHorizontally = true;
        //     // this.scale.pageAlignVertically = true;
        //     this.scale.fullScreenTarget = document.querySelector('#viewport');
        //     this.scale.forceOrientation(true, false);
        //     this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        //     this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

        // this.game.screen.orientation.lock('landscape');

        // }


        // setInterval(function(){
        //          context.scale.refresh();
        //     ;},4000);

        bedbugGameCore.game = this.game;

        bedbugGameCore.slickUI;

        this.game.FrameworkInit = function() {
            bedbugGameCore.init(context.changeToPreloadState);
        }



    },
    preload: function() {
        this.load.json('bedbug', 'assets/data/bedbug_config.json');

        // Main config file
        this.load.json('config', 'config.json');

        // this.load.json('localization', 'assets/data/localization.json');
        this.load.image('preloader_empty', 'assets/images/preloader_empty.png');
        this.load.image('preloader_full', 'assets/images/preloader_full.png');
        this.load.image('preloader_fullBB', 'assets/images/preloader_fullBB.png');
        this.load.image('static_logo', 'assets/images/loader_static_logo.png');

        this.load.image('wrong_orientation', 'assets/images/rotatePhone.png');
        
    },
    create: function() {
        
        this.scale.forceOrientation(true, false);
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        
        this.game.input.maxPointers = 1;

        this.bedbug = this.cache.getJSON('bedbug');
        var that = this;
        setTimeout(function() {

            // Assign the game theme
            if (that.bedbug.theme) {
                bedbugGameCore.theme = that.bedbug.theme;
            }

            // Assign a theme from the url setting if requested
            if (bedbugGameCore.urlSettings.theme)
                bedbugGameCore.theme = bedbugGameCore.urlSettings.theme;

            bedbugGameCore.themesPath = 'themes/' + bedbugGameCore.theme.toLowerCase() + (bedbugGameCore.game.device.desktop ? "_desktop" : "_mobile") + '/';

            // Intralot config.json residing in theme folder
            that.load.json('theme_config', bedbugGameCore.themesPath + "config/config.json");

            // Intralot initial offline game configuration for theme
            that.load.json('game_config', bedbugGameCore.themesPath + "init.json");

            that.load.onLoadComplete.addOnce(that.startFramework, that);


            that.load.start();
        }, 100);

    },
    startFramework: function() {
        var that = this;
        setTimeout(function() {
                bedbugGameCore.configuration = that.cache.getJSON('game_config');

                bedbugGameCore.config;
                var configKeyUsed;

                // console.log(that.bedbug.override_intralot_config_file_with_theme_local);
                // console.log(bedbugGameCore.urlSettings.theme);
                // If not set or another theme is request in url settings, use the default config.json
                if (!that.bedbug.override_intralot_config_file_with_theme_local && !bedbugGameCore.urlSettings.theme)

                    configKeyUsed = 'config';
                else
                    configKeyUsed = 'theme_config';

                // console.log(configKeyUsed);
                bedbugGameCore.config = that.cache.getJSON(configKeyUsed);

                // _.merge(bedbugGameCore.configuration.server_settings.Game.Configuration, bedbugGameCore.config)

                that.game.add.text(0, 0, "bb", {
                    "font": "1px ArialRound",
                    "fill": "#fff",
                    "align": "center"
                })

                that.game.add.text(0, 0, "bb", {
                    "font": "1px Contrail",
                    "fill": "#fff",
                    "align": "center"
                })
                
                that.game.add.text(0, 0, "bb", {
                    "font": "1px ParkLane",
                    "fill": "#fff",
                    "align": "center"
                })
                
                that.game.add.text(0, 0, "bb", {
                    "font": "1px ParkLaneNF",
                    "fill": "#fff",
                    "align": "center"
                })
                
                that.game.add.text(0, 0, "bb", {
                    "font": "1px ACTypoGrotesk",
                    "fill": "#fff",
                    "align": "center"
                })

                // Init the framework
                that.game.FrameworkInit();
            },
            100);

    },
    goFullscreen: function() {
        if (!this.game.scale.isFullScreen) {
            // console.log("Go FullScreen");
            this.game.scale.startFullScreen(true);
            // this.game.scale.setUserScale(window.screen.height / context.game.height, window.screen.height / context.game.height);
        }

    },
    gameResized: function(width, height) {
        // console.log("iOS:" + this.game.device.iPhone + " | " + this.game.device.iOSVersion);
        if (this.game.device.iPhone) {
            // if (!(this.game.net.medium == 'ds' || this.game.net.medium == 'ma')) {
            // this._gameRePosition();
            // console.log("Displaying Input: "+ bedbugGameCore.isDisplayingInput);
            if (!bedbugGameCore.isDisplayingInput)
                bedbugGameCore.ios9FullscreenCheck();
            // }
        }
        // console.log("resized");
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
    },

    changeToPreloadState: function() {

        // Assign the game theme
        if (bedbugGameCore.configuration.server_settings.Game.Configuration.GameName) {
            // bedbugGameCore.log("Bedbug Slots Game Engine theme set to: " + bedbugGameCore.theme.toUpperCase() +" v"+bedbugGameCore.game_specs, true);

            // bedbugGameCore.themesPath = 'themes/' + bedbugGameCore.configuration.server_settings.Game.Configuration.GameName + (bedbugGameCore.game.device.desktop ? "_desktop" : "_mobile") + '/';
        }

        // bedbugGameCore.log("Theme path: " + bedbugGameCore.themesPath);

        if (bedbugGameCore.game.device.desktop) {

            bedbugGameCore.log("Bedbug Slots Game Engine set to: Desktop", true);
        }
        else {

            bedbugGameCore.log("Bedbug Slots Game Engine set to: Mobile", true);
        }

        bedbugGameCore.game.state.start('preload');
    },

    enterIncorrectOrientation: function() {

        console.log("PHASER: wrong orientation");
        // document.getElementById('wrong-orientation').style.display = 'block';
        // document.getElementById('brim-main').style.display = 'none';
        // document.getElementById('brim-mask').style.display = 'none';
        // document.getElementById('viewport').style.display = 'none';


        var wrongOrientationImage = bedbugGameCore.game.add.graphics(0, 0);
        wrongOrientationImage.beginFill(0x000000, 1);
        wrongOrientationImage.drawRect(0, 0, this.game.width, this.game.height);
        wrongOrientationImage.endFill();
        wrongOrientationImage.cacheAsBitmap = true;
        var rotateImage = bedbugGameCore.game.add.sprite(0, 0, 'wrong_orientation');
        rotateImage.anchor.setTo(0.5, 0.5);
        rotateImage.position = {
            x: this.game.width / 2,
            y: this.game.height / 2
        };
        rotateImage.width *= 3;
        bedbugGameCore.wrongOrientationImage = bedbugGameCore.game.add.group();
        bedbugGameCore.wrongOrientationImage.addChild(wrongOrientationImage);
        bedbugGameCore.wrongOrientationImage.addChild(rotateImage);
        bedbugGameCore.orientated = false;
        bedbugGameCore.game.paused = true;

    },

    leaveIncorrectOrientation: function() {
        console.log("PHASER: correct orientation");
        bedbugGameCore.orientated = true;
        bedbugGameCore.game.paused = false;
        // document.getElementById('wrong-orientation').style.display = 'none';
        // document.getElementById('brim-mask').style.width = '100%';
        // document.getElementById('brim-mask').style.height = '100%';
        // document.getElementById('brim-main').style.display = 'block';
        // document.getElementById('brim-mask').style.display = '';
        // document.getElementById('viewport').style.display = 'block';
        if (bedbugGameCore.wrongOrientationImage)
            bedbugGameCore.wrongOrientationImage.destroy();

    },

    onFocus: function() {
        // console.log("FOCUS");
        // Notify Lobby that the game has focus
        if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GOT_FOCUS);
        
        bedbugGameCore.hasFocus = true;
        
        if (bedbugGameCore.orientated){
            this.game.paused = false;
        }
    },

    onBlur: function() {
        // console.log("BLUR");
        // this.game.paused = true;
        // Notify Lobby that the game has lost focus
        if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_LOST_FOCUS);
            
            
        if((!bedbugGameCore.urlSettings.blur || bedbugGameCore.urlSettings.blur == "true") && (bedbugGameCore.shouldPause || !this.game.device.desktop)){
            this.game.paused =  true;
            console.log("paused")
        }
            
        bedbugGameCore.hasFocus = false;
    }
};
