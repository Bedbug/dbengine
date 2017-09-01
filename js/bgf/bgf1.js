bedbugGameCore.Preload = function(game) {
  this.asset = null;
  this.ready = false;
  this.changedState = false;

  // Clear local data
  //localStorage.clear();
}

bedbugGameCore.Preload.prototype = {
  preload: function() {

    // Load game theme files
    this.load.json('game_specs', bedbugGameCore.themesPath + "game_specs.json");
    this.load.json('assets_list', bedbugGameCore.themesPath + "assets.json");
    // this.load.json('localization', bedbugGameCore.themesPath + "localization.json");

    this.load.json('slick-ui-theme', "assets/ui/kenney/kenney.json");
    this.load.image("slick-ui-slider_end", "assets/ui/kenney/images/grey_sliderEnd.png");
    this.load.image("slick-ui-slider_handle_off", "assets/ui/kenney/images/grey_sliderDown.png");
    this.load.image("slick-ui-slider_base", "assets/ui/kenney/images/grey_sliderHorizontal.png");
    this.load.image("slick-ui-slider_handle_on", "assets/ui/kenney/images/blue_sliderDown.png");
    this.load.image("slick-ui-panel", "assets/ui/kenney/images/black_panel.png");
    this.load.image("uip_options_panel", "assets/images/uip_options_panel.png");
    this.load.image("uip_options_panel_responsible", "assets/images/uip_options_panel_responsible.png");
    this.load.image("uip_responsible_options", "assets/images/uip_responsible_options.png");
    this.load.image("uip_mute_sound", "assets/images/mute.png");
    this.load.spritesheet('uip_buttons', 'assets/images/uip_buttons_spritesheet.png', 22, 22, 9);
    this.load.spritesheet('loader_light', 'assets/images/loader_light.png', 90, 90, 24);

    this.load.image('bedbug_logo', 'assets/images/bedbug_logo.png');
    // if(bedbugGameCore.game_specs.loader == "bedbug")
    this.load.atlas("bedbug", "assets/images/bedbugLogo.png", "assets/images/bedbugLogo.json");

    this.load.image('gameway_g', 'assets/images/logo/G.png');
    this.load.image('gameway_a', 'assets/images/logo/A.png');
    this.load.image('gameway_m', 'assets/images/logo/M.png');
    this.load.image('gameway_e', 'assets/images/logo/E.png');
    this.load.image('gameway_w', 'assets/images/logo/W.png');
    this.load.image('gameway_a2', 'assets/images/logo/A2.png');
    this.load.image('gameway_y', 'assets/images/logo/Y.png');
    this.load.image('gameway_crown', 'assets/images/logo/Crown.png');


    // Load game theme controls
    // this.game.load.script('sounds', bedbugGameCore.themesPath + "sounds.js");

    // Load game theme controls
    // this.game.load.script('controls', bedbugGameCore.themesPath + "controls.js")

    // Load extra theme addition
    // this.game.load.script('theme', bedbugGameCore.themesPath + "theme.js")

    // Only for testing purposes
    if (this.game.device.desktop) {
      this.game.load.script('BlurX', 'lib/blurX.js');
      this.game.load.script('BlurY', 'lib/blurY.js');
      this.game.load.script('Glow', 'lib/glows.js');
    }

    /* If the game uses spines */
    // if(PhaserSpine != undefined)
    // bedbugGameCore.game.plugins.add(PhaserSpine.SpinePlugin);
  },
  create: function() {
    var that = this;

    // Assign the configuration of the game on bedbugGameCore for easy access
    bedbugGameCore.game_specs = this.cache.getJSON('game_specs');

    bedbugGameCore.log("Loader set to: " + bedbugGameCore.game_specs.loader);
    bedbugGameCore.log("Bedbug Slots Game Engine theme set to: " + bedbugGameCore.theme.toUpperCase() + " v" + bedbugGameCore.game_specs.version);

    // Make updates to theme according to server configuration
    Server.UpdateThemeSpecs();

    bedbugGameCore.updateBet();
    bedbugGameCore.updateCoins();

    // Assign the html title of the page
    $('#game_title').text(bedbugGameCore.game_specs.title);

    var context = this;
    this.empty = this.add.sprite(this.game.world.centerX - 147, (this.game.height / 2) + 20, 'preloader_empty');
    this.empty.alpha = 0;
    // this.empty.width = 500;
    // this.empty.height = 15;
    // this.empty.scale.setTo(.6667);
    this.empty.anchor.setTo(0, 0.5);

    // Logo
    if (bedbugGameCore.game_specs.loader != "bedbug") {
      // Sprite Logo
      // this.logo = this.add.sprite(this.game.world.centerX + 15, (this.game.height / 2) - 60, 'static_logo');
      // this.logo.anchor.setTo(0.5, 0.5);
      // this.logo.scale.setTo(.7, .7);
      // var logoFadeIn = this.add.tween(this.logo).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
      // logoFadeIn.onComplete.add(this.loadAssets, this);


      var logo = this.add.sprite(this.game.world.centerX, (this.game.height / 2) - 170, 'gameway_crown');
      logo.anchor.setTo(0.5, 0);
      
      
      // Create the gameway logo positions
      var initPosition = { x: this.game.world.centerX - 170, y: (this.game.height / 2) - 75 };
      var logoLettersDistance = 30;
      var logo_letters = [];
      var logo_g = this.add.sprite(initPosition.x, initPosition.y, 'gameway_g');
      initPosition.x += logo_g.width - logoLettersDistance - 4;
      initPosition.y -= 7;
      logo_letters.push(logo_g);
      var logo_a = this.add.sprite(initPosition.x, initPosition.y, 'gameway_a');
      initPosition.x += logo_g.width - logoLettersDistance + 4;
      logo_letters.push(logo_a);
      var logo_m = this.add.sprite(initPosition.x, initPosition.y, 'gameway_m');
      initPosition.x += logo_g.width - logoLettersDistance + 2;
      logo_letters.push(logo_m);
      var logo_e = this.add.sprite(initPosition.x, initPosition.y, 'gameway_e');
      initPosition.x += logo_g.width - logoLettersDistance;
      logo_letters.push(logo_e);
      var logo_w = this.add.sprite(initPosition.x, initPosition.y, 'gameway_w');
      initPosition.x += logo_g.width - logoLettersDistance;
      logo_letters.push(logo_w);
      var logo_a2 = this.add.sprite(initPosition.x, initPosition.y, 'gameway_a2');
      initPosition.x += logo_g.width - logoLettersDistance - 6;
      initPosition.y += 6;
      logo_letters.push(logo_a2);
      var logo_y = this.add.sprite(initPosition.x, initPosition.y, 'gameway_y');
      initPosition.x += logo_g.width - logoLettersDistance;
      logo_letters.push(logo_y);
      
      var logo_letters_tweens = [];
      _.each(logo_letters, function(o) {
        o.alpha = 0;
        var rand = 600 + (Math.floor(Math.random() * (500 - 100 + 1)) + 100);
        var letter_tween =
          that.game.add.tween(o).to({
            alpha: 1
          }, 1000, "Elastic.easeInOut", false, rand, 0, false);
          logo_letters_tweens.push(letter_tween);
      })
      
      
      _.each(logo_letters_tweens, function(t){
        t.start();
      })
      
       var logoFadeIn = this.add.tween(logo.alpha).from(0 , 150, Phaser.Easing.Exponential.EaseIn, true, 0);
      var logoDrop = this.add.tween(logo.scale).to({ x:0.5, y:0.5 }, 150, Phaser.Easing.Exponential.EaseIn, true, 150);
      logoDrop.onComplete.add(this.loadAssets, this);

      // Video Logo
      // var video;
      // var sprite;
      // this.videologo = this.game.add.video('videoLogo');
      // this.sprite = this.videologo.addToWorld(this.game.world.centerX + 15, (this.game.height / 2) -40, 0.5, 0.5);
      // this.sprite.scale.setTo(.7);
      // this.videologo.play();

      // this.videologo.onComplete.add(this.loadAssets, this);


    }
    else {
      // this.game.stage.backgroundColor = "#007cfc";
      this.logo = this.add.sprite(this.game.world.centerX + 15, (this.game.height / 2) - 60, 'bedbug', "bedbuglogo_00000.png");
      // this.logo.alpha = 1;
      // this.logo.scale.setTo(.7, .7);
      this.logo.anchor.setTo(0.5, 0.5);
      this.logoAnim = this.logo.animations.add("logoAnim", Phaser.Animation.generateFrameNames("bedbuglogo_", 0, 153, ".png", 5), 30, false);
      this.logoAnim.play(30, false);
      this.logoAnim.onComplete.add(function() {
        console.log("Animation Ended!!!!!!");
        this.loadAssets()
      }, this);
      //this.logo.alpha = 0;

    }


    if (!this.game.device.desktop && this.game.device.requestFullscreen != '') {
      // console.log("StartFullScreen Listener");
      this.game.scale.startFullScreen(true);
      this.game.input.onTap.add(this.goFullscreen, this);
    }

  },
  goFullscreen: function() {
    if (!this.game.scale.isFullScreen) {
      // console.log("Go FullScreen");
      this.game.scale.startFullScreen(true);
      // this.game.scale.setUserScale(window.screen.height / context.game.height, window.screen.height / this.game.height);
    }
  },
  loadAssets: function() {

    // Adding the logo animation of the preloader
    this.empty.alpha = 0;

    var barFadeIn = this.add.tween(this.empty).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true);

    barFadeIn.onComplete.add(preloadAllGameAssets, this);

    function preloadAllGameAssets() {
      var context = this;
      if (bedbugGameCore.game_specs.loader != "bedbug")
        this.asset = this.add.sprite(this.game.world.centerX - 147, (this.game.height / 2) + 20, 'preloader_full');
      else
        this.asset = this.add.sprite(this.game.world.centerX - 147, (this.game.height / 2) + 20, 'preloader_fullBB');
      // this.asset.scale.setTo(.6667);
      // this.asset.width = 500;
      // this.asset.height = 15;
      this.asset.anchor.setTo(0, 0.5);
      this.asset.cropEnabled = false;
      this.load.setPreloadSprite(this.asset);

      this.assets_list = this.cache.getJSON('assets_list');


      // Load script overrides
      var overrides = _.filter(this.assets_list, {
        type: "override"
      });

      for (var i = 0; i < overrides.length; i++) {
        this.load.script(overrides[i].key, bedbugGameCore.themesPath + overrides[i].path);
      };



      // Load audio assets
      var sounds = _.filter(this.assets_list, {
        type: "audio"
      });

      for (var i = 0; i < sounds.length; i++) {
        sounds[i].path = _.map(sounds[i].path, function(o) {
          // console.log(o);
          return bedbugGameCore.themesPath + "/assets/" + o;
        })

        // console.log(sounds[i].path);
        this.load.audio(sounds[i].key, sounds[i].path);
      }

      // Load image assets
      var images = _.filter(this.assets_list, {
        type: "image"
      });

      for (var i = 0; i < images.length; i++) {
        this.load.image(images[i].key, images[i].data ? images[i].data : bedbugGameCore.themesPath + "/assets/" + images[i].path);
      };

      // Load Bitmap Fonts
      var bitmapfonts = _.filter(this.assets_list, {
        type: "bitmapfont"
      });

      for (var i = 0; i < bitmapfonts.length; i++) {
        this.load.bitmapFont(bitmapfonts[i].key, bedbugGameCore.themesPath + "/assets/" + bitmapfonts[i].path, bedbugGameCore.themesPath + "/assets/" + bitmapfonts[i].xmlpath);
      };

      // Load spritesheet assets
      var spritesheets = _.filter(this.assets_list, {
        type: "spritesheet"
      });

      for (var i = 0; i < spritesheets.length; i++) {
        this.load.spritesheet(spritesheets[i].key, bedbugGameCore.themesPath + "/assets/" + spritesheets[i].path, spritesheets[i].frame_width, spritesheets[i].frame_height, spritesheets[i].frame_num);
      }

      // Load Atlas assets
      var atlases = _.filter(this.assets_list, {
        type: "atlas"
      });

      for (var i = 0; i < atlases.length; i++) {
        this.load.atlas(atlases[i].key, bedbugGameCore.themesPath + "/assets/" + atlases[i].path, bedbugGameCore.themesPath + "/assets/" + atlases[i].jsonpath);
      }

      // Load jSon assets
      var jSons = _.filter(this.assets_list, {
        type: "json"
      });

      for (var i = 0; i < jSons.length; i++) {
        this.load.json(jSons[i].key, bedbugGameCore.themesPath + "/assets/" + jSons[i].path);
      }

      // Load spine assets
      var spines = _.filter(this.assets_list, {
        type: "spine"
      });

      for (var i = 0; i < spines.length; i++) {
        this.load.spine(spines[i].key, bedbugGameCore.themesPath + "/assets/spines/" + spines[i].key + ".json");
      }

      // Load symbols prefabs
      if (bedbugGameCore.game_specs.slots.concated)
        context.load.script("all_symbols", bedbugGameCore.themesPath + "symbols/all_symbols.js", function(Symbol) {});
      else
        _.forEach(bedbugGameCore.game_specs.slots.symbols, function(symbolPrefab, symbolKey) {
          context.load.script(symbolKey, bedbugGameCore.themesPath + "symbols/" + symbolPrefab + ".js", function(Symbol) {});
        })

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.start();
    }
    // this.asset.cropEnabled = false;
  },
  update: function() {
    if (!!this.ready && !this.changedState) {
      this.changedState = true;

      if (localStorage.getItem("showAgain") == "true")
        this.game.state.start('play');
      else
        this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
