  /*global bedbugGameCore*/
  /*global UnifiedPanel*/
  /*global bedbugEventsSystem*/



  var autoplay = false;




  bedbugGameCore.Play = function() {
    bedbugGameCore.scatters_appeard = 0;
  }

  bedbugGameCore.Play.prototype = {
    // init: function(){
    //   console.log("adding focus listeners");
    //   this.game.onBlur.add(this.onBlur, this);
    //     this.game.onFocus.add(this.onFocus, this);
    // },
    // onFocus: function() {
    //   console.log("Gained focus");
    //   this.game.paused = false;
    //     // Notify Lobby that the game has focus
    //     if (LOBBY_PROXY)
    //         LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_GOT_FOCUS);
    // },

    // onBlur: function() {
    //     console.log("lost focus");
    //     this.game.paused = true;
    //     // Notify Lobby that the game has lost focus
    //     if (LOBBY_PROXY)
    //         LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_LOST_FOCUS);
    // },
    preload: function() {
      var context = this;

      var cursors;

      // if (bedbugGameCore.isDesktop())
      //   UnifiedPanel.setUnifiedPanelVisibility('block');

      slider = new phaseSlider(this.game);
      // // Load Controls design script
      // this.game.load.script('controls', bedbugGameCore.themesPath + "controls.js")

      // // Load symbols prefabs
      // bedbugGameCore.Slots = {};
      // _.forEach(bedbugGameCore.game_specs.slots.symbols, function(symbolPrefab, symbolKey) {
      //   context.game.load.script(symbolKey, bedbugGameCore.themesPath + "symbols/" + symbolPrefab + ".js", function(Symbol) {});
      // })

      // // Only for testing purposes
      // this.game.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
      // this.game.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');
      // this.game.load.script('Glow', 'lib/glows.js');

      bedbugGameCore.slickUI = bedbugGameCore.game.plugins.add(Phaser.Plugin.SlickUI);
      bedbugGameCore.slickUI.load('assets/ui/kenney/kenney.json');

    },
    goFullscreen: function() {
      if (!this.game.scale.isFullScreen) {
        // console.log("Go FullScreen");
        this.game.scale.startFullScreen(true);
        // this.game.scale.setUserScale(window.screen.height / context.game.height, window.screen.height / this.game.height);
      }
    },
    create: function() {
      var context = this;

      // this.game.scale.compatibility.supportsFullScreen = true;
      // this.game.input.onDown.add(this.goFullscreen, this);
      if (!this.game.device.desktop && this.game.device.requestFullscreen != '') {
        // console.log("StartFullScreen Listener");
        this.game.scale.startFullScreen(true);
        this.game.input.onTap.add(this.goFullscreen, this);
      }
      // if (!context.game.device.desktop && context.game.device.requestFullscreen != '') {
      //       context.game.scale.startFullScreen(true);
      //       context.game.input.onTap.add(function() {
      //           console.log("TAP");
      //           if (!context.game.scale.isFullScreen) {
      //               context.game.scale.startFullScreen(true);
      //               context.game.scale.setUserScale(window.screen.height / context.game.height, window.screen.height / context.game.height);
      //           }
      //       }, context);
      //   }

      cursors = this.game.input.keyboard.createCursorKeys();


      // A Layer that hold all SLOT WIN STATES in order to be
      // above all layers of the grid and winning lines in between
      bedbugGameCore.WinningLayerGroup = this.game.add.group();

      // PERFORMENCE FIX: Created a separate layer for Winning line
      // Labels in order for them to be above the slots
      bedbugGameCore.WinningLabelsLayerGroup = this.game.add.group();
      bedbugGameCore.WinningLabelsLayerGroup.name = "WinningLabelsLayerGroup";

      this.createExtras(this);

      this.createReels();


      this.game.world.bringToTop(bedbugGameCore.WinningLayerGroup);
      this.game.world.bringToTop(bedbugGameCore.WinningLabelsLayerGroup);


      this.createWinningBanners();

      this.createWinningLines();

      this.createScrollingText();

      this.createControls(this);

      // this.pushScrollingText(1, "");

      this.createPayTable();

      this.createHotKeys();

      this.createInputBlock();

      // this.drawDebugAreas();

      this.addListeners();

      if (Responsible_Gaming)
        Responsible_Gaming.startSession(context);

      // Play fun message if mobile
      if (!bedbugGameCore.game.device.desktop && (bedbugGameCore.game_mode == 1 || bedbugGameCore.game_mode == 3)) {
        setInterval(function() {
          if (context.scrolling_texts_array.length < 2)
            context.pushScrollingText(1, bedbugGameCore.getLocalizedText("MSG_FUN_MODE"));
        }, 30000)
      }


      // MessageTools.confirm(this.game, bedbugGameCore.getLocalizedText("official_welcome"), "Welcome to the Game, hope you have fun and enjoy your stay here.", function() {
      //   console.log("Yay!");
      // })

      // setTimeout(function() {
      //   MessageTools.options(context.game, bedbugGameCore.getLocalizedText("official_welcome"), "Welcome to the Game. \n We hope you 'll have fun and that you 'll enjoy your stay here. \n Please spend as much money as you can. We will appreciate you more.", "Exit to Lobbby", "Continue", function() {
      //     console.log("Lobby!");
      //   }, function() {
      //     console.log("Play!");
      //   }, null, true);
      // }, 1500);

      // MessageTools.error(this.game, bedbugGameCore.getLocalizedText("official_welcome"), "Welcome to the Game, hope you have fun and enjoy your stay here.", "Exit to Lobbby", "Continue", function() {
      //   console.log("Lobby!");
      // }, function() {
      //   console.log("Play!");
      // })


      // Request ambiance sound for new stage
      // bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');

      // Notify Lobby that we are in IDLE State
      if (LOBBY_PROXY)
        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_WAIT_FOR_BET);

      // Set state to IDLE
      bedbugGameCore.game_status = bedbugGameCore.GAME_STATES.IDLE;

      if (bedbugGameCore.fps) {
        this.game.time.advancedTiming = true;
        this.fps = this.game.add.text(15, 90, "", {
          font: "bold 30px Arial",
          fill: "white"
        })
      }

      //create the spine object
      // var buddy = bedbugGameCore.game.add.spine(400, 300, "buddy_skeleton");
      // // play animation
      //   buddy.setAnimationByName(0, "idle", true);
    },
    update: function() {

      // console.log("This Works!!!!");
      //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
      // if (cursors.up.isDown) {
      //   //  If the shift key is also pressed then the world is rotated
      //   if (cursors.up.shiftKey) {
      //     this.game.testPlacement.y -= 5;
      //   }
      //   else {
      //     this.game.testPlacement.y -= .5;
      //   }
      // }
      // else if (cursors.down.isDown) {
      //   if (cursors.down.shiftKey) {
      //     this.game.testPlacement.y += 5;
      //   }
      //   else {
      //     this.game.testPlacement.y += .5;
      //   }
      // }

      // if (cursors.left.isDown) {
      //   this.game.testPlacement.x -= .5;
      // }
      // else if (cursors.right.isDown) {
      //   this.game.testPlacement.x += .5;
      // }
    },
    render: function() {
      // this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
      if (bedbugGameCore.fps)
        this.fps.setText(this.game.time.fps);

      if (bedbugGameCore.debug)
        this.game.debug.inputInfo(32, 32);
      // if (this.game.testPlacement)
      //   this.game.debug.spriteCoords(this.game.testPlacement, 20, 25);

    },
    createControls: function() {
      Controls.create(this);
    },
    createExtras: function() {
      Theme.create(this);
    },
    setAmbiance: function(state) {
      if (state)
        bedbugGameCore.ambiance_volume = bedbugGameCore.game.sound.volume;
      else
        bedbugGameCore.ambiance_volume = 0;

      _.each(bedbugGameCore.ambiance_channel, function(amb) {
        amb.volume = bedbugGameCore.ambiance_volume;
      })
    },
    setupAudio: function() {
      // var context = this;

      // Sounds.create(this);
      // var reel_spin_loops = [];
      // var anticipation_loops = [];

      // bedbugEventsSystem.addListener('ON_NAVIGATE_CLICKED', ON_NAVIGATE_CLICKED);

      // function ON_NAVIGATE_CLICKED() {
      //   context.game.sound.play('onClick_navigate', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_SPIN_PLAY_CLICKED', ON_SPIN_PLAY_CLICKED);

      // function ON_SPIN_PLAY_CLICKED() {
      //   // console.log("Clicked play");
      //   context.game.sound.play('onClick_play', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_SPIN_STOP_CLICKED', ON_SPIN_STOP_CLICKED);

      // function ON_SPIN_STOP_CLICKED() {
      //   // console.log("Clicked stop");
      //   context.game.sound.play('onClick_stop', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_MAX_BET_CLICKED', ON_MAX_BET_CLICKED);

      // function ON_MAX_BET_CLICKED() {
      //   context.game.sound.play('onClick_max_bet', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_SPIN_CLICK_TOGGLE', ON_SPIN_CLICK_TOGGLE);

      // function ON_SPIN_CLICK_TOGGLE() {
      //   context.game.sound.play('onClick_stop', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_SCATTER_APPEAR', ON_SCATTER_APPEAR);

      // function ON_SCATTER_APPEAR() {
      //   scatters_appeard++;
      //   console.log('scatter_appear_' + scatters_appeard);
      //   context.game.sound.play('scatter_appear_' + scatters_appeard, bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_EACH_ANTICIPATION_START', ON_EACH_ANTICIPATION_START);

      // function ON_EACH_ANTICIPATION_START() {

      //   var anticipation_loop = context.game.add.sound('evnt_anticipation_start');
      //   anticipation_loops.push(anticipation_loop);

      //   if (anticipation_loops.length == 1 && !anticipation_loops[0].isPlaying) {
      //     anticipation_loops[0].play('', 0, bedbugGameCore.sound_effects_volume);
      //   }
      // };

      // bedbugEventsSystem.addListener('ON_EACH_ANTICIPATION_END', ON_EACH_ANTICIPATION_END);

      // function ON_EACH_ANTICIPATION_END() {

      //   if (anticipation_loops.length > 1) {
      //     anticipation_loops.pop();
      //     anticipation_loops[0].play('', 0, bedbugGameCore.sound_effects_volume);
      //     return;
      //   }

      //   if (anticipation_loops.length == 1) {
      //     anticipation_loops[0].destroy();
      //     anticipation_loops.pop();
      //   }

      //   if (scatters_appeard < 3) {
      //     console.log("ANTICIPATION FAILED: " + scatters_appeard);
      //     context.game.sound.play('evnt_anticipation_failed', bedbugGameCore.sound_effects_volume);
      //   }
      // };

      // bedbugEventsSystem.addListener('ON_ANTICIPATION_FAILED', ON_ANTICIPATION_FAILED);

      // function ON_ANTICIPATION_FAILED() {


      //   //context.game.sound.play('evnt_anticipation_failed', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_EACH_REEL_SPIN', ON_EACH_REEL_SPIN);

      // function ON_EACH_REEL_SPIN() {
      //   var reel_spin_loop = context.game.add.sound('evnt_reel_spinning_loop');
      //   reel_spin_loop.play('', 0, bedbugGameCore.sound_effects_volume, true);
      //   reel_spin_loops.push(reel_spin_loop);
      // };

      // bedbugEventsSystem.addListener('ON_REEL_BOUNCE', ON_REEL_BOUNCE);

      // function ON_REEL_BOUNCE() {
      //   // reel_spin_volume -= 0.10;
      //   // reel_spin_loop.volume = reel_spin_volume;
      //   context.game.sound.play('evnt_reel_spinning_stop', bedbugGameCore.sound_effects_volume);
      //   reel_spin_loops[0].destroy();
      //   reel_spin_loops.shift();

      // };

      // bedbugEventsSystem.addListener('ON_SLOT_WIN_SMALL', ON_SLOT_WIN_SMALL);

      // function ON_SLOT_WIN_SMALL() {
      //   context.game.sound.play('win_small', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_SLOT_WIN_MEDIUM', ON_SLOT_WIN_MEDIUM);

      // function ON_SLOT_WIN_MEDIUM() {
      //   context.game.sound.play('win_medium', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_SLOT_WIN_BIG', ON_SLOT_WIN_BIG);

      // function ON_SLOT_WIN_BIG() {
      //   context.game.sound.play('win_big', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_COIN_COUNT', ON_COIN_COUNT);

      // function ON_COIN_COUNT() {
      //   context.game.sound.play('coin_count', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_COIN_COUNT_END', ON_COIN_COUNT_END);

      // function ON_COIN_COUNT_END() {
      //   context.game.sound.play('coins_count_end', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_BUTTON_CLICK', ON_BUTTON_CLICK);

      // function ON_BUTTON_CLICK() {
      //   context.game.sound.play('onClick_generic', bedbugGameCore.sound_effects_volume);
      // };

      // bedbugEventsSystem.addListener('ON_AMBIANCE_START_NEW', ON_AMBIANCE_START_NEW);
      // bedbugEventsSystem.addListener('ON_AMBIANCE_END_LAST', ON_AMBIANCE_END_LAST);

      // function ON_AMBIANCE_START_NEW() {

      //   var ambiance = context.game.add.audio(bedbugGameCore.ambianceKey);

      //   if (bedbugGameCore.ambiance_volume > 0)
      //     ambiance.fadeIn(5000, true);
      //   else
      //     ambiance.play("", 0, bedbugGameCore.ambiance_volume);
      //   bedbugGameCore.ambiance_channel.push(ambiance);
      // };

      // function ON_AMBIANCE_END_LAST() {
      //   if (!bedbugGameCore.ambiance_channel[0]) return;
      //   bedbugGameCore.ambiance_channel[0].fadeOut(3000);
      //   bedbugGameCore.ambiance_channel[0].onFadeComplete.add(function() {
      //     bedbugGameCore.ambiance_channel[0].destroy();
      //     bedbugGameCore.ambiance_channel.shift();
      //   })

      // };



    },
    createInputBlock: function() {
      bedbugGameCore.inputBlock = this.game.add.graphics(0, 0);
      bedbugGameCore.inputBlock.beginFill(0x000000, 1);
      bedbugGameCore.inputBlock.drawRect(
        0,
        0,
        this.game.width,
        this.game.height
      );
      bedbugGameCore.inputBlock.endFill();
      bedbugGameCore.inputBlock.alpha = 0;
    },

    drawDebugAreas: function() {

      if (!bedbugGameCore.game_specs.grid.debug) return;

      // Reel area - Later will be used as the reel mask to hide animations
      var reelMask = this.game.add.graphics(0, 0);

      reelMask.beginFill(0xFFFF0B, 0.5);
      reelMask.drawRect(
        bedbugGameCore.game_specs.grid.x - bedbugGameCore.game_specs.grid.mask_padding[0],
        bedbugGameCore.game_specs.grid.y - bedbugGameCore.game_specs.grid.mask_padding[1],
        (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1)) + bedbugGameCore.game_specs.grid.mask_padding[0] + bedbugGameCore.game_specs.grid.mask_padding[2],
        (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) + (bedbugGameCore.game_specs.reels.spacing.y * bedbugGameCore.game_specs.grid.rows - 1) - (bedbugGameCore.game_specs.reels.spacing.y) + bedbugGameCore.game_specs.grid.mask_padding[1] + bedbugGameCore.game_specs.grid.mask_padding[3]
      );

      reelMask.endFill();

      var reel_width = bedbugGameCore.game_specs.slots.width;
      var reel_height = bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows + (bedbugGameCore.game_specs.reels.spacing.y * bedbugGameCore.game_specs.grid.rows - 1) - (bedbugGameCore.game_specs.reels.spacing.y);
      var i = 0;

      // ColumnA
      var columnA = this.game.add.graphics(0, 0);
      columnA.beginFill(0x75cce8, 0.5);
      columnA.drawRect(
        bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width + (i > 0 ? bedbugGameCore.game_specs.reels.spacing.x : 0)) * i),
        bedbugGameCore.game_specs.grid.y,
        reel_width,
        reel_height
      );
      columnA.endFill();

      // ColumnB
      i = 1;
      var ColumnB = this.game.add.graphics(0, 0);
      ColumnB.beginFill(0x75cce8, 0.5);
      ColumnB.drawRect(
        bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width + (i > 0 ? bedbugGameCore.game_specs.reels.spacing.x : 0)) * i),
        bedbugGameCore.game_specs.grid.y,
        reel_width,
        reel_height);
      ColumnB.endFill();

      // ColumnC
      i = 2;
      var ColumnC = this.game.add.graphics(0, 0);
      ColumnC.beginFill(0x75cce8, 0.5);
      ColumnC.drawRect(
        bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width + (i > 0 ? bedbugGameCore.game_specs.reels.spacing.x : 0)) * i),
        bedbugGameCore.game_specs.grid.y,
        reel_width,
        reel_height);
      ColumnC.endFill();

      // ColumnD
      i = 3
      var ColumnD = this.game.add.graphics(0, 0);
      ColumnD.beginFill(0x75cce8, 0.5);
      ColumnD.drawRect(
        bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width + (i > 0 ? bedbugGameCore.game_specs.reels.spacing.x : 0)) * i),
        bedbugGameCore.game_specs.grid.y,
        reel_width,
        reel_height);
      ColumnD.endFill();

      // ColumnE
      i = 4;
      var ColumnE = this.game.add.graphics(0, 0);
      ColumnE.beginFill(0x75cce8, 0.5);
      ColumnE.drawRect(
        bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width + (i > 0 ? bedbugGameCore.game_specs.reels.spacing.x : 0)) * i),
        bedbugGameCore.game_specs.grid.y,
        reel_width,
        reel_height);
      ColumnE.endFill();

    },
    clickListener: function() {
      this.game.state.start('gameover');
    },
    loopBackgrounds: function(bgSpriteNames) {
      var context = this;
      var backgrounds = [];

      _.each(bgSpriteNames, function(spriteName) {
        backgrounds.push(context.game.add.sprite(context.game.width / 2, context.game.height / 2, spriteName));
        backgrounds[backgrounds.length - 1].alpha = 0;
        backgrounds[backgrounds.length - 1].anchor.setTo(0.5, 0.5);
        backgrounds[backgrounds.length - 1].height = context.game.height;
        backgrounds[backgrounds.length - 1].width = context.game.width;

      })


      var index = 1;
      var lastIndex = -1;

      showBG(this);

      function showBG(that) {
        backgrounds[0].alpha = 1;
        // console.log("last index:"+ lastIndex);
        // if (lastIndex > -1)
        //   that.game.add.tween(backgrounds[lastIndex]).to({
        //     alpha: 0
        //   }, 1000, Phaser.Easing.Linear.NONE, true);

        // // console.log("new index:"+ index); 
        // that.game.add.tween(backgrounds[index]).to({
        //   alpha: 1
        // }, 1000, Phaser.Easing.Linear.NONE, true);

        // lastIndex = index;
        // index++;

        // if (index > backgrounds.length - 1) index = 0;
        // setTimeout(function() {
        //   showBG(that);
        // }, 7000);
      }

    }
  };


  // bedbugGameCore.Play.prototype.weatherChangeBySymbol = function(symbolid) {


  //   switch (symbolid) {
  //     case "00000030-0000-0000-0000-000000000001":
  //       this.weatherChange("sun");
  //       break;
  //     case "00000030-0000-0000-0000-000000000002":
  //       this.weatherChange("cloud");
  //       break;
  //     case "00000030-0000-0000-0000-000000000003":
  //       this.weatherChange("storm");
  //       break;
  //     case "00000030-0000-0000-0000-000000000004":
  //       this.weatherChange("wind");
  //       break;
  //     case "00000030-0000-0000-0000-000000000005":
  //       this.weatherChange("snow");
  //       break;
  //   }
  // }

  // bedbugGameCore.Play.prototype.weatherChange = function(weatherName, ignoreBonus) {

  //   if (this.currentWeather == weatherName || (bedbugGameCore.bonus_status > 0 && !ignoreBonus)) {
  //     return;
  //   }

  //   var context = this;
  //   // Change the weather by transitioning from the currentWeather to the weatherName
  //   // Get the correct object
  //   var newWeather;

  //   newWeather = this.weatherGroups[weatherName];

  //   // Open Visibility of New Weather Object
  //   newWeather.visible = true; // NOT WORKING

  //   // Tween the Alpha of the two objects
  //   var tweenOn = this.game.add.tween(newWeather).to({
  //     alpha: 1
  //   }, 3000, Phaser.Easing.Linear.None, true);
  //   if (this.currentWeatherObj) {
  //     var tweenOff = this.game.add.tween(this.currentWeatherObj).to({
  //       alpha: 0
  //     }, 3000, Phaser.Easing.Linear.None, true);
  //     tweenOff.onComplete.add(closeOldWeather, this);
  //   }

  //   function closeOldWeather() {
  //     // // Close Visibility
  //     this.currentWeatherObj.visible = false;
  //     // // Store new current Weather Object
  //     this.currentWeatherObj = newWeather;

  //   }

  //   // Request ambiance sound for new stage
  //   bedbugEventsSystem.emitEvent('ON_AMBIANCE_END_LAST')
  //     // Change the current weather for future refernce
  //   context.currentWeather = weatherName;
  //   // Request ambiance sound for new stage
  //   bedbugEventsSystem.emitEvent('ON_AMBIANCE_START_NEW');

  // }

  bedbugGameCore.Play.prototype.createHotKeys = function() {
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.play_spin, this);

    // this.leftArrowKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    // this.leftArrowKey.onDown.add(this.leftArrow, this);

    // this.rightArrowKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
    // this.rightArrowKey.onDown.add(this.rightArrow, this);

    // this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    // this.enterKey.onDown.add(this.EnterKeyHit, this);

    // this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    // this.escKey.onDown.add(this.EscKey, this);

    // this.altKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    // this.altKey.onDown.add(this.AltDown, this);
    // this.altKey.onUp.add(this.AltUp, this);

    // this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ESC]);
  }

  bedbugGameCore.Play.prototype.leftArrow = function() {
    bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");

    if (bedbugGameCore.paytableIsShowing) {
      if (this.current_bullet > 0 && !slider.isAnimating()) this.current_bullet--;
      this.drawBullets(this.current_bullet);
      slider.goToPrev();
    }
    else
      bedbugGameCore.decrBetLevel();
  }

  bedbugGameCore.Play.prototype.rightArrow = function() {
    bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
    if (bedbugGameCore.paytableIsShowing) {
      if (this.current_bullet < this.panel_pages - 1 && !slider.isAnimating()) this.current_bullet++;
      this.drawBullets(this.current_bullet);
      slider.goToNext();
    }
    else
      bedbugGameCore.incrBetLevel();
  }

  bedbugGameCore.Play.prototype.EscKey = function() {
    console.log("esc");
    if (bedbugGameCore.paytableIsShowing) {
      this.showPayTable(this);
    }
    // else{
    //   if (this.game.scale.isFullScreen)
    //   {
    //       this.game.scale.stopFullScreen();
    //   }
    //   else
    //   {
    //       this.game.scale.startFullScreen(false);
    //   }
    // }

  }

  bedbugGameCore.Play.prototype.AltDown = function() {
    var context = this;
    _.each(bedbugGameCore.game_specs.lines, function(value, key) {
      bedbugGameCore.Lines[value.winlineid].showSlimLine();
    })
  }

  bedbugGameCore.Play.prototype.AltUp = function() {
    var context = this;

    _.each(bedbugGameCore.game_specs.lines, function(value, key) {
      bedbugGameCore.Lines[value.winlineid].hideSlimLine();
    })

  }

  bedbugGameCore.Play.prototype.EnterKeyHit = function() {
    if (!bedbugGameCore.controls_enabled) return;

    this.showPayTable(this);
  }

  bedbugGameCore.Play.prototype.showPayTable = function() {

    //console.log("Button Working!");
    var context = this;

    // If bonus game is active ignore
    if (bedbugGameCore.bonus_status != 0 || !bedbugGameCore.controls_enabled) return;

    bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
    if (bedbugGameCore.paytableIsShowing) {
      bedbugGameCore.paytableIsShowing = false;
      context.paytable.visible = false;

      slider.hideSlider();
      // Controls.closePaytableClose();

    }
    else {
      //console.log(context);
      slider.moveToSlide(0);
      context.paytablePageIndex = 0; // Reset the page index for the slider
      context.drawBulletshowPayTablellet = 0;
      bedbugGameCore.paytableIsShowing = true;
      context.paytable.visible = true;
      context.current_bullet = 0;
      context.drawBullets(0);
      // context.game.world.bringToTop(context.paytable);
      // context.game.world.bringToTop(slider);
      slider.showSlider();
      Controls.openPaytableClose();
    }
  }

  bedbugGameCore.Play.prototype.createPayTable = function() {


    Controls.createPaytable(this);
    // var context = this;

    // this.paytable = this.game.add.group();
    // context.paytable.visible = false;

    // context.panel_pages = 5;
    // context.page_bullets = this.game.add.group();


    // var panel_height = 600;
    // var panel_width = 762;
    // var panel_x = (this.game.width / 2 - panel_width / 2);
    // var panel_y = 20;



    // // var paytable_area = this.game.add.graphics(0, 0);
    // // paytable_area.beginFill(0x000, .9);
    // // paytable_area.drawRoundedRect(panel_x, panel_y, panel_width, panel_height, 90);
    // // paytable_area.endFill();
    // // paytable_area.inputEnabled = true;
    // var paytable_area = Controls.createPopupBG(context.game, panel_width, panel_height + 30, false, null, function() {
    //   hidePaytable();
    // });


    // paytable_area.y -= 30;
    // this.paytable.x = 35;

    // this.paytable.add(paytable_area);

    // var legal_text = this.game.add.text(panel_x + panel_width / 2, panel_y + panel_height - 130, bedbugGameCore.getLocalizedText("paytable_legal"), {
    //   font: '15px Arial',
    //   fill: '#fff',
    //   align: 'center',

    //   wordWrap: true,
    //   wordWrapWidth: panel_width - 40
    // })
    // legal_text.lineSpacing = -2;

    // legal_text.anchor.set(0.5, 0);
    // this.paytable.add(legal_text);


    // var headingStyle = {
    //   'font': 'bold 45px Arial',
    //   'fontWeight': 'bold',
    //   'fill': '#fff',
    //   // backgroundColor: "#ffff00"
    // };
    // var left = 25;


    // var screen1 = this.game.add.group();
    // var screen1_heading = this.game.add.text((panel_width / 2) + 55, 70, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
    // screen1_heading.anchor.setTo(0.5, 0.5);
    // // screen1_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    // var wildsymbol = getSymbol(bedbugGameCore.symbolNameToID("WILD"), (panel_width / 2) - 10, 230, 130);

    // var scattersymbol = getSymbol(bedbugGameCore.symbolNameToID("SCAT"), left + 200, 450, 130, "250 + 15 " + bedbugGameCore.getLocalizedText("free_spins"), "100 + 10 " + bedbugGameCore.getLocalizedText("free_spins"), "10 + 5 " + bedbugGameCore.getLocalizedText("free_spins"));


    // var wildText = context.game.add.text(wildsymbol.x + 55, wildsymbol.y + 40, bedbugGameCore.getLocalizedText("wild_paytable_info_text"), {
    //   'font': 'bold 22px Arial',
    //   'fill': '#fff',
    //   'align': 'center',
    //   wordWrap: true,
    //   wordWrapWidth: "650"
    // });
    // wildText.anchor.setTo(0.5, 0.5);

    // var scatterText = context.game.add.text(left + 70, scattersymbol.y + 25, bedbugGameCore.getLocalizedText("scatterSymbolID_paytable_info_text"), {
    //   'font': 'bold 20px Arial',
    //   'fill': '#fff',
    //   'align': 'center',
    //   wordWrap: true,
    //   wordWrapWidth: "700"
    // });

    // screen1.add(screen1_heading);
    // screen1.add(wildsymbol);
    // screen1.add(scattersymbol);
    // screen1.add(wildText);
    // screen1.add(scatterText);


    // var screen2 = this.game.add.group();
    // var screen2_heading = this.game.add.text(panel_width / 2 + 45, 40, bedbugGameCore.getLocalizedText("thunderstorm_paytable_heading_text"), headingStyle);
    // screen2_heading.anchor.setTo(0.5, 0, 5);
    // var thunderText = context.game.add.text(panel_width / 2 + 45, 95, bedbugGameCore.getLocalizedText("thunderstorm_paytable_info_text"), {
    //   'font': 'bold 20px Arial',
    //   'fill': '#fff',
    //   'align': 'center',
    //   wordWrap: true,
    //   wordWrapWidth: "700"
    // });
    // thunderText.anchor.setTo(0.5, 0);

    // // var thunderarea = this.game.add.graphics(left, 40);
    // // thunderarea.anchor.setTo(0.5, 0,5);
    // // thunderarea.lineStyle(2, 0xffffff);
    // // thunderarea.drawRoundedRect(panel_x, panel_y, 740, 440, 45);
    // // thunderarea.endFill();

    // //screen2.add(thunderarea);
    // screen2.add(screen2_heading);
    // screen2.add(thunderText);

    // // Screen 3 - Symbols Payout
    // var screen3 = this.game.add.group();
    // var screen3_heading = this.game.add.text(panel_width / 2 + 45, 40, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
    // screen3_heading.anchor.setTo(0.5, 0, 5);
    // // screen3_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    // var symbol1 = getSymbol(bedbugGameCore.symbolNameToID("H2"), left + 45, 270, 130, 800, 400, 25);
    // var symbol2 = getSymbol(bedbugGameCore.symbolNameToID("H1"), left + 300, 270, 130, 600, 50, 20);
    // var symbol3 = getSymbol(bedbugGameCore.symbolNameToID("M3"), left + 555, 270, 130, 400, 40, 10);
    // var symbol4 = getSymbol(bedbugGameCore.symbolNameToID("M2"), left + 165, 465, 130, 200, 30, 10);
    // var symbol5 = getSymbol(bedbugGameCore.symbolNameToID("M1"), left + 445, 465, 130, 200, 25, 8);
    // screen3.add(symbol1);
    // screen3.add(symbol2);
    // screen3.add(symbol3);
    // screen3.add(symbol4);
    // screen3.add(symbol5);
    // screen3.add(screen3_heading);



    // // Screen 4 - Symbols Payout
    // var screen4 = this.game.add.group();
    // var screen4_heading = this.game.add.text(panel_width / 2 + 45, 40, bedbugGameCore.getLocalizedText("paytable_symbols_payout_heading"), headingStyle);
    // screen4_heading.anchor.setTo(0.5, 0, 5);
    // // screen4_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    // var symbol6 = getSymbol(bedbugGameCore.symbolNameToID("L5"), left + 45, 270, 130, 200, 20, 8);
    // var symbol7 = getSymbol(bedbugGameCore.symbolNameToID("L4"), left + 300, 270, 130, 100, 20, 8);
    // var symbol8 = getSymbol(bedbugGameCore.symbolNameToID("L3"), left + 555, 270, 130, 100, 15, 6);
    // var symbol9 = getSymbol(bedbugGameCore.symbolNameToID("L2"), left + 165, 465, 130, 100, 15, 6);
    // var symbol10 = getSymbol(bedbugGameCore.symbolNameToID("L1"), left + 445, 465, 130, 70, 15, 6);
    // screen4.add(symbol6);
    // screen4.add(symbol7);
    // screen4.add(symbol8);
    // screen4.add(symbol9);
    // screen4.add(symbol10);
    // screen4.add(screen4_heading);



    // // Screen 5 - Winning Bet Lines
    // var screen5 = this.game.add.group();
    // // this.paytable.add(screen5);

    // var screen5_heading = this.game.add.text(panel_width / 2 + 45, 70, bedbugGameCore.getLocalizedText("paytable_betlines_heading"), headingStyle);
    // screen5_heading.anchor.setTo(0.5, 0.5);
    // // screen5_heading.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    // screen5.add(screen5_heading);

    // var columnCount = 0;
    // var column = 0;
    // var row = 0;
    // _.each(bedbugGameCore.game_specs.lines, function(line, id) {

    //   var lineMap = new WinningLineMap(context.game, id, line);

    //   if (columnCount % 5 == 0 && columnCount > 0) {
    //     column = 0;
    //     row++
    //   };

    //   lineMap.x = left + 40 + (column * 160);
    //   lineMap.y = 100 + (row * 100);
    //   screen5.add(lineMap);
    //   columnCount++;
    //   column++;

    // });

    // screen1.scale = screen2.scale = screen3.scale = screen4.scale = screen5.scale = {
    //   x: 0.9,
    //   y: 0.9
    // };

    // slider.createSlider({
    //   customSliderBG: false,
    //   mode: "horizontal",
    //   showHandles: false,
    //   sliderBG: 0x202020,
    //   sliderBGAlpha: 0.01,
    //   width: panel_width,
    //   height: panel_height,
    //   x: panel_x + 35,
    //   y: panel_y,
    //   objects: [screen1, screen2, screen3, screen4, screen5]
    // });


    // // The close buton
    // // Close button is  a center component. Many alignments are based on this.
    // var close_button = new CustomButton(context.game, "X", panel_x + 90, panel_y + panel_height - 50, 40, 40, hidePaytable, null, false, {
    //   font: "bold 30px Arial"
    // }, false);

    // function hidePaytable() {
    //   bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');
    //   bedbugGameCore.paytableIsShowing = false;
    //   context.paytable.visible = false;
    //   slider.hideSlider();
    // }
    // this.paytable.add(close_button);

    // var chevronRight;
    // var chevronLeft;
    // context.current_bullet = 0;

    // chevronRight = bedbugGameCore.game.add.image(50, 0, "slider_chevron_right");
    // chevronRight.scale.setTo(0.5, 0.5);

    // chevronRight.x = close_button.x + close_button.width / 2 + 20;
    // chevronRight.y = close_button.y - chevronRight.height / 2;
    // chevronRight.inputEnabled = true;
    // chevronRight.events.onInputDown.add(function(e, pointer) {
    //   bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
    //   if (context.current_bullet < context.panel_pages - 1 && !slider.isAnimating()) context.current_bullet++;
    //   context.drawBullets(context.current_bullet);
    //   slider.goToNext();
    // }, slider);



    // chevronLeft = bedbugGameCore.game.add.image(0, 0, "slider_chevron_left");
    // chevronLeft.scale.setTo(0.5, 0.5);

    // chevronLeft.x = close_button.x - close_button.width / 2 - chevronLeft.width - 20;
    // chevronLeft.y = close_button.y - chevronLeft.height / 2;
    // chevronLeft.inputEnabled = true;
    // chevronLeft.events.onInputDown.add(function(e, pointer) {
    //   bedbugEventsSystem.emitEvent("ON_NAVIGATE_CLICKED");
    //   if (context.current_bullet > 0 && !slider.isAnimating()) context.current_bullet--;
    //   context.drawBullets(context.current_bullet);
    //   slider.goToPrev();
    // }, slider);

    // this.paytable.add(chevronRight);
    // this.paytable.add(chevronLeft);

    // slider.hideSlider();

    // var bullet_size = 20
    // context.page_bullets.x = panel_x + panel_width / 2 - (context.panel_pages / 2 * bullet_size);
    // context.page_bullets.y = close_button.y + 10;
    // // Bullets

    // context.drawBullets = function(index) {
    //   context.page_bullets.removeAll(true);
    //   var bullets = bedbugGameCore.game.add.graphics(0, 0);
    //   _.times(context.panel_pages, function(i) {
    //     if (i == index) {
    //       bullets.lineStyle(0);
    //       bullets.beginFill(0xFFFFFF, 1);
    //     }
    //     else {
    //       bullets.lineStyle(2, 0xFFFFFF);
    //     }
    //     bullets.drawCircle((bullet_size + 10) * i, 0, bullet_size);
    //     bullets.endFill();
    //   })

    //   context.page_bullets.add(bullets);
    // }



    // this.paytable.add(context.page_bullets);
    // context.drawBullets(context.current_bullet);

    // var client_version = this.game.add.text(panel_x + panel_width - 110, close_button.y, "Client v" + bedbugGameCore.version, {
    //   font: '14px Arial',
    //   fill: '#fff',
    //   align: 'left'
    // })
    // this.paytable.add(client_version);



    // Change the Size of the group to fit in the new paytable 
    //this.paytable.scale.setTo(0.8, 0.8);


  }

  bedbugGameCore.Play.prototype.createScrollingText = function() {
    // console.log(bedbugGameCore.game_specs);
    var x = bedbugGameCore.game_specs.infobox.x;
    var y = bedbugGameCore.game_specs.infobox.y;
    var width = bedbugGameCore.game_specs.infobox.width;
    var height = bedbugGameCore.game_specs.infobox.height;
    var corners = bedbugGameCore.game_specs.infobox.rounded;
    var style = bedbugGameCore.game_specs.infobox.style;


    if (this.game.device.desktop) {
      if (bedbugGameCore.game_specs.theme == "weather") {
        this.mobileBg = this.game.add.sprite((this.game.width / 2) + 30, 579, "gui");
        this.mobileBg.anchor.setTo(.5, .5);
        this.mobileBg.scale.setTo(.715, .7);
        this.mobileBg.frameName = "infobox.png";
      }

    }
    else {
      if (bedbugGameCore.game_specs.theme == "tesla") {
        this.mobileBg = this.game.add.sprite(150, 605, "mobile");
        this.mobileBg.scale.setTo(1.01, .9);
        this.mobileBg.frameName = "infobox.png";
      }
      else if (bedbugGameCore.game_specs.theme == "midnight") {
        this.mobileBg = this.game.add.sprite(290, 610, "mobile");
        this.mobileBg.alpha = 0.8;
        // this.mobileBg.scale.setTo(1.01, .9);
        this.mobileBg.frameName = "info-area.png";
      }
      else if (bedbugGameCore.game_specs.theme == "weather") {
        this.mobileBg = this.game.add.sprite(240, 585, "gui");
        // this.mobileBg.scale.setTo(1.01, .9);
        this.mobileBg.frameName = "infobox.png";
      }
    }


    this.scrolling_text_background = this.game.add.graphics(x, y);
    this.scrolling_text_background.beginFill(0x000, .0);
    this.scrolling_text_background.drawRoundedRect(0, 0, width, height, corners);
    this.scrolling_text_background.endFill();
    this.scrolling_text_background.cacheAsBitmap = true;
    this.scrolling_text_background.alpha = 1;
    this.ScrollingTextArea = this.game.add.sprite(x, y, this.scrolling_text_background.generateTexture());
    //this.scrolling_text_background.destroy();

    this.infobox = this.game.add.group();

    // Add to infobox group
    //this.infobox.addChild(this.ScrollingTextArea);



    if (this.game.device.desktop && bedbugGameCore.game_specs.theme == "tesla") {

      //   this.scrolling_text_mask = this.game.add.graphics(x, y);
      //   this.scrolling_text_mask.beginFill(0xFF0000, 1);
      //   this.scrolling_text_mask.drawRect(0, 0, (width/2)-30, height);
      //   this.scrolling_text_mask.endFill();
      // // this.scrolling_text_mask.cacheAsBitmap = true;

      this.scrolling_text_mask = this.game.add.graphics(x, y);
      // set a fill and line style
      this.scrolling_text_mask.beginFill(0xFF3300);

      // draw a shape
      this.scrolling_text_mask.moveTo(0, 0);
      this.scrolling_text_mask.lineTo(width, 0);
      this.scrolling_text_mask.lineTo(width, 25);
      this.scrolling_text_mask.lineTo((width / 2) + 54, 25);
      this.scrolling_text_mask.lineTo((width / 2) + 36, 1);
      this.scrolling_text_mask.lineTo((width / 2) - 36, 1);
      this.scrolling_text_mask.lineTo((width / 2) - 56, 25);
      this.scrolling_text_mask.lineTo(0, 25);
      this.scrolling_text_mask.lineTo(0, 0);
      this.scrolling_text_mask.endFill();

      this.scrolling_text_mask.cacheAsBitmap = true;

      //this.maskGroup.add(this.scrolling_text_mask);

    }
    else {
      this.scrolling_text_mask = this.game.add.graphics(x, y);
      // set a fill and line style
      this.scrolling_text_mask.beginFill(0xFF3300);

      // draw a shape
      this.scrolling_text_mask.moveTo(0, 0);
      this.scrolling_text_mask.lineTo(width, 0);
      this.scrolling_text_mask.lineTo(width, 30);
      // this.scrolling_text_mask.lineTo((width / 2) + 54, 25);
      // this.scrolling_text_mask.lineTo((width / 2) + 36, 1);
      // this.scrolling_text_mask.lineTo((width / 2) - 36, 1);
      // this.scrolling_text_mask.lineTo((width / 2) - 56, 25);
      this.scrolling_text_mask.lineTo(0, 30);
      this.scrolling_text_mask.lineTo(0, 0);
      this.scrolling_text_mask.endFill();

      this.scrolling_text_mask.cacheAsBitmap = true;
    }

    this.ScrollingTextGroup = this.game.add.group();
    this.ScrollingTextGroup.position = {
      "x": x,
      "y": y
    };

    // this.scrolling_text_label = this.game.add.bitmapText(0, 4, "defaultfont","test", 60);
    this.scrolling_text_label = this.game.add.text(0, 4, "", style);


    if (bedbugGameCore.game.device.desktop)
      this.scrolling_text_label.resolution = 2;

    if (!this.game.device.desktop) {
      //this.ScrollingTextGroup.add(this.mobileBg);

      this.scrolling_text_label.anchor.setTo(0.5, 0);
    }

    this.ScrollingTextGroup.add(this.scrolling_text_label);

    // Add to infobox group
    this.infobox.addChild(this.ScrollingTextGroup);

    // var group = this.game.add.group();
    // group.addChild(this.ScrollingTextGroup);

    if (this.game.device.desktop) {
      this.infobox.mask = this.scrolling_text_mask;
    }
    else {
      this.infobox.mask = this.scrolling_text_mask;
    }

    //this.game.world.bringToTop(this.ScrollingTextGroup);


    this.scrolling_texts_array = [];
  };
  bedbugGameCore.Play.prototype.pushScrollingText = function(count, text) {
    this.scrolling_texts_array.push({
      "c": count,
      "t": text
    });
    this.scrollingTextPlay();
  };
  bedbugGameCore.Play.prototype.InfoBulleting = function(text) {
    console.log(text);
    // Do a whole different thing
    // Fisrt stop what you are doing
    if (this.scroll_loop_tween) this.scroll_loop_tween.stop();
    if (this.scroll_loop_in) this.scroll_loop_in.stop();
    if (this.scroll_loop_out) this.scroll_loop_out.stop();

    var center = this.ScrollingTextArea.x + (this.ScrollingTextArea.width / 2);
    this.ScrollingTextGroup.x = center;
    this.scrolling_text_label.setText(text);

  }

  bedbugGameCore.Play.prototype.scrollingTextPlay = function() {

    var context = this;

    if (this.scrolling_text_playing || this.scrolling_texts_array.length == 0) return;

    // The loop has started playing
    this.scrolling_text_playing = true;

    // Set the first step if playing for the first time
    if (!this.scrolling_text_step || this.scrolling_text_step > this.scrolling_texts_array.length - 1 || this.scrolling_text_step < 0) this.scrolling_text_step = this.scrolling_texts_array.length - 1;

    var step = this.scrolling_text_step;

    // this.ScrollingTextGroup.cacheAsBitmap = false;
    this.scrolling_text_label.setText(this.scrolling_texts_array[step].t);
    // this.ScrollingTextGroup.cacheAsBitmap = true;

    this.scrolling_texts_array[step].c--;
    if (this.scrolling_texts_array[step].c == 0) this.scrolling_texts_array.pop();

    // IF DESKTOP OR MOBILE
    if (this.game.device.desktop) {
      this.ScrollingTextGroup.x = this.ScrollingTextArea.x + this.ScrollingTextArea.width + 10;

      this.scroll_loop_tween = this.game.add.tween(this.ScrollingTextGroup).to({
        x: this.ScrollingTextArea.x - this.scrolling_text_label.width - 10
      }, 5000, "Linear", true, 0, 0, false);

      this.scroll_loop_tween.onComplete.add(loopTween);
    }
    else {
      this.ScrollingTextGroup.x = this.ScrollingTextArea.x + this.ScrollingTextArea.width + 10;

      this.scroll_loop_tween = this.game.add.tween(this.ScrollingTextGroup).to({
        x: this.ScrollingTextArea.x - this.scrolling_text_label.width - 10
      }, 5000, "Linear", true, 0, 0, false);

      this.scroll_loop_tween.onComplete.add(loopTween);
      // this.ScrollingTextGroup.alpha = 0;
      // var center = this.ScrollingTextArea.x + (this.ScrollingTextArea.width / 2);

      // this.ScrollingTextGroup.x = center + 150;

      // this.scroll_loop_in = this.game.add.tween(this.ScrollingTextGroup).to({
      //   alpha: 1,
      //   x: center
      // }, 2000, Phaser.Easing.Exponential.Out, true, 300);

      // this.scroll_loop_out = this.game.add.tween(this.ScrollingTextGroup).to({
      //   alpha: 0,
      //   x: center - 150
      // }, 3000, Phaser.Easing.Exponential.In, false, 4000);

      // this.scroll_loop_in.chain(this.scroll_loop_out);

      // this.scroll_loop_out.onComplete.add(loopTween);
    }

    function loopTween() {
      context.scrolling_text_step--;
      if (context.scrolling_text_step == -1) context.scrolling_text_step = context.scrolling_texts_array.length - 1;
      context.scrolling_text_playing = false;
      if (context.scrolling_texts_array.length > 0) {
        context.scrollingTextPlay();
      }
      else {
        // setTimeout(function() {
        // if (context.scrolling_texts_array.length == 0) context.pushScrollingText(1, _.sample(bedbugGameCore.game_specs.rumblings));
        // console.log("Here we will insert a random text.")
        // }, 5000);
      }

    }
  };


  bedbugGameCore.Play.prototype.createReels = function() {
    // Create Reels
    bedbugGameCore.Reels = [];

    // var reels_bg = this.game.add.tileSprite(bedbugGameCore.game_specs.grid.x, bedbugGameCore.game_specs.grid.y, (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1)), bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows, 'bg_patern');
    // reels_bg.alpha = 0.5;
    // reels_bg.tint = 0xffffff;
    // reelMask.beginFill(0xFFFF0B, 0.5);
    // reelMask.drawRect(bedbugGameCore.game_specs.grid.x - maskextend, bedbugGameCore.game_specs.grid.y, (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1)) + (maskextend * 2), bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows);
    // reelMask.endFill();

    bedbugGameCore.GridGroup = this.game.add.group();


    /*****************************************************************************************
     * Grid Mask
     * The mask is controled in the game specs of each theme
     ******************************************************************************************/
    if (bedbugGameCore.game_specs.grid.use_mask) {
      var reelMask = this.game.add.graphics(0, 0);
      var maskextend = 50;
      reelMask.beginFill(0xFFFF0B, 1);
      reelMask.drawRect(
        bedbugGameCore.game_specs.grid.x - bedbugGameCore.game_specs.grid.mask_padding[0],
        bedbugGameCore.game_specs.grid.y - bedbugGameCore.game_specs.grid.mask_padding[1],
        (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1)) + bedbugGameCore.game_specs.grid.mask_padding[0] + bedbugGameCore.game_specs.grid.mask_padding[2],
        (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) + (bedbugGameCore.game_specs.reels.spacing.y * bedbugGameCore.game_specs.grid.rows - 1) - (bedbugGameCore.game_specs.reels.spacing.y) + bedbugGameCore.game_specs.grid.mask_padding[1] + bedbugGameCore.game_specs.grid.mask_padding[3]
      );

      reelMask.endFill();
      bedbugGameCore.GridGroup.mask = reelMask;

      /* Top Input block */
      var topInputBlock = this.game.add.graphics(0, 0);
      topInputBlock.beginFill(0xFFFF0B, 0.0);
      topInputBlock.drawRect(
        bedbugGameCore.game_specs.grid.x - bedbugGameCore.game_specs.grid.mask_padding[0],
        0,
        (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1)) + bedbugGameCore.game_specs.grid.mask_padding[0] + bedbugGameCore.game_specs.grid.mask_padding[2],
        bedbugGameCore.game_specs.grid.y - bedbugGameCore.game_specs.grid.mask_padding[1]
      );
      topInputBlock.inputEnabled = true;
      topInputBlock.endFill();

      /* Bottom Input block */
      var bottomInputBlock = this.game.add.graphics(0, 0);
      bottomInputBlock.beginFill(0xFFFF0B, 0.0);
      bottomInputBlock.drawRect(
        bedbugGameCore.game_specs.grid.x - bedbugGameCore.game_specs.grid.mask_padding[0],
        (bedbugGameCore.game_specs.grid.y - bedbugGameCore.game_specs.grid.mask_padding[1]) + (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) + (bedbugGameCore.game_specs.reels.spacing.y * bedbugGameCore.game_specs.grid.rows - 1) - (bedbugGameCore.game_specs.reels.spacing.y) + bedbugGameCore.game_specs.grid.mask_padding[1] + bedbugGameCore.game_specs.grid.mask_padding[3],
        (bedbugGameCore.game_specs.slots.width * bedbugGameCore.game_specs.grid.columns) + (bedbugGameCore.game_specs.reels.spacing.x * (bedbugGameCore.game_specs.grid.columns - 1)) + bedbugGameCore.game_specs.grid.mask_padding[0] + bedbugGameCore.game_specs.grid.mask_padding[2],

        this.game.height -
        (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) + (bedbugGameCore.game_specs.reels.spacing.y * bedbugGameCore.game_specs.grid.rows - 1) - (bedbugGameCore.game_specs.reels.spacing.y) + bedbugGameCore.game_specs.grid.mask_padding[1] + bedbugGameCore.game_specs.grid.mask_padding[3]
      );
      bottomInputBlock.inputEnabled = true;
      bottomInputBlock.endFill();

    }

    /*****************************************************************************************
     * Create the Reels
     * Each theme can have a custom reel or use the default BBReel class.
     * Reels creation starts from the bottom left corner of the panel for easier placement.
     ******************************************************************************************/

    for (var i = 0; i < bedbugGameCore.game_specs.grid.columns; i++) {
      var reelX = bedbugGameCore.game_specs.grid.x + ((bedbugGameCore.game_specs.slots.width + (i > 0 ? bedbugGameCore.game_specs.reels.spacing.x : 0)) * i);
      var reelY = bedbugGameCore.game_specs.grid.y + (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows) +
        (bedbugGameCore.game_specs.reels.spacing.y * bedbugGameCore.game_specs.grid.rows - 1) - (bedbugGameCore.game_specs.reels.spacing.y);

      var reel = null;

      // If we don't have a custom theme Reel, use the default
      // if(!bedbugGameCore.game_specs.theme_files.reel)
      reel = new BBReel(this.game, reelX, reelY, 'Reel' + i, i);
      // else
      // // If we do, use the custom Reel found in the themes folder
      // reel = new Custom_Reel(this.game, reelX, reelY, 'Reel' + i, i);

      bedbugGameCore.Reels.push(reel);
      bedbugGameCore.GridGroup.add(reel);

      // var reelPivot = this.game.add.graphics(0, 0);
      // reelPivot.beginFill(0x106ff4, 1);
      // reelPivot.drawRoundedRect(reelX, reelY, 10, 10, 6);
      // reelPivot.endFill();
    }

    bedbugEventsSystem.emitEvent('ON_REELS_CREATED');

    /****************************************************************************************/

  };

  bedbugGameCore.Play.prototype.createWinningBanners = function() {
    // CREATE WIN LABEL BANNER

    // If the theme has a custom banner call this instead and ignore the defaults
    if (Theme.values.customWinningBanner) {
      Theme.createWinningBanners(this);
      return;
    }

    // Create default winning banner
    var reelY = bedbugGameCore.game_specs.grid.y + (bedbugGameCore.game_specs.slots.height * bedbugGameCore.game_specs.grid.rows);
    bedbugGameCore.winLabel = this.game.add.graphics(0, reelY - 300);
    bedbugGameCore.winLabel.beginFill(0x000, 0.5);
    bedbugGameCore.winLabel.drawRect(0, 0, bedbugGameCore.game.world.width, 100);
    bedbugGameCore.winLabel.endFill();

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


    bedbugGameCore.winLabel_text = this.game.add.text(0, 0, "WIN: 40", style);
    // bedbugGameCore.winLabel_text.addChild(button_label);
    bedbugGameCore.winLabel_text.anchor.setTo(0.5, 0.5);
    bedbugGameCore.winLabel_text.x = bedbugGameCore.getGridCenter().x; //bedbugGameCore.winLabel.x + bedbugGameCore.winLabel.width / 2;
    bedbugGameCore.winLabel_text.y = bedbugGameCore.winLabel.y + bedbugGameCore.winLabel.height / 2;
    bedbugGameCore.winLabel_text.addColor('#fde603', 4);

    // If Theme does not use bitmap font use regular text for the big win coins count label
    if (!Theme.styles.big_win_label.bitmapFont) {
      bedbugGameCore.bigwinLabel_text = this.game.add.text((this.game.width / 2) + 30, (this.game.height / 2) + 60, "", style2);
      bedbugGameCore.bigwinLabel_text.addColor('#FFFFFF', 0);
      bedbugGameCore.bigwinLabel_text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
      bedbugGameCore.bigwinLabel_text.anchor.setTo(0.5, 0.5);
    }
    // Else use the bitmap font supplied in the Theme's style section
    else {
      bedbugGameCore.bigwinLabel_text = this.game.add.bitmapText((this.game.width / 2) - 10, (this.game.height / 2) + 50, Theme.styles.big_win_label.bitmapFont, "", 170);
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

  bedbugGameCore.Play.prototype.createWinningLines = function() {
      var context = this;
      bedbugGameCore.log("Winning lines found for game: " + _.size(bedbugGameCore.game_specs.lines));
      bedbugGameCore.Lines = {};

      bedbugGameCore.WinningLinesGroup = this.game.add.group();

      _.forEach(bedbugGameCore.game_specs.lines, function(line, key) {
        bedbugGameCore.Lines[line.winlineid] = {
          create: function() {

            var lineContext = this;

            this.winLine = Theme.createLine(line, false, lineContext, context);
            this.slimLine = Theme.createLine(line, true, lineContext, context);

            bedbugGameCore.WinningLinesGroup.add(this.winLine);
            bedbugGameCore.WinningLinesGroup.add(this.slimLine);

          },
          showLine: function() {

            this.winLine.visible = true;
            context.game.add.tween(this.winLine).to({
              alpha: 1
            }, 50, Phaser.Easing.Linear.None, true);


            if (this.lineID1)
              this.lineID1.visible = false;

            if (this.lineID2)
              this.lineID2.visible = true;
          },
          hideLine: function() {
            context.game.add.tween(this.winLine).to({
              alpha: 0
            }, 50, Phaser.Easing.Linear.None, true);

            this.PointsLabel.visible = false;
            if (this.pointsbg)
              this.pointsbg.visible = false;
            // this.winLine.visible = false;

            if (this.lineID1)
              this.lineID1.visible = true;

            if (this.lineID2)
              this.lineID2.visible = false;
          },
          showSlimLine: function() {
            this.slimLine.visible = true;
          },
          hideSlimLine: function() {
            this.slimLine.visible = false;
          },
          showPoints: function(points) {
            this.PointsLabel.setText(points);

            // if (this.pointsbg)
            //   this.pointsbg.bringToTop();
            //console.log(bedbugGameCore.WinningLabelsLayerGroup.children);
            // console.log(this.PointsLabel.parent.name)
            // console.log(this.pointsbg.parent)
            // bedbugGameCore.WinningLayerGroup.bringToTop(this.PointsLabel);
            // this.PointsLabel.bringToTop();
            // console.log(bedbugGameCore.WinningLabelsLayerGroup);
            // this.PointsLabel.bringToTop();


            if (!Theme.values.pointTweenSpeed) {
              context.game.add.tween(this.PointsLabel.scale).from({
                y: 0.0,
                x: 0.0
              }, 750, Phaser.Easing.Elastic.Out, true, 300);
            }
            else {
              if (!Theme.playPointsTween) { // Play tween from here or from Theme
                context.game.add.tween(this.PointsLabel.scale).from({
                  y: 0.0,
                  x: 0.0
                }, Theme.values.pointTweenSpeed, Phaser.Easing.Elastic.Out, true, 300);
              }
              else {
                Theme.playPointsTween(context, this.PointsLabel);
              }

            }


            this.PointsLabel.visible = true;

            if (this.pointsbg) {
              this.pointsbg.visible = true;
              context.game.add.tween(this.pointsbg.scale).from({
                y: 0.0,
                x: 0.0
              }, 650, Phaser.Easing.Elastic.Out, true, 300);
            }

            if (Theme.values.playSmallWin) {
              Theme.playSmallEffect();
            }
          },
          hidePoints: function() {
            this.PointsLabel.visible = false;
            if (this.pointsbg)
              this.pointsbg.visible = false;
          }
        };

        bedbugGameCore.Lines[line.winlineid].create();

        /*****************************************************************************************
         * Method:createLine() is deprecated in favor of thematic lines
         * It is left here for reference and will be removed in future updates
         ******************************************************************************************/
        // function createLine(line, key, slim, thisContext) {
        //   var winLine = context.game.add.group();
        //   // create the first dot
        //   var start_dot;
        //   if (line.dots.start && !slim && bedbugGameCore.isDesktop()) {

        //     /**
        //     * Check to see if the dot placement uses a variable instead of a exact integer
        //     * It helps with batch placement where left starting positions and right ending
        //     * positions are managed from central variables
        //     **/
        //     if (_.isString(line.dots.start[0]))
        //       line.dots.start[0] = bedbugGameCore.game_specs.dot_constants["start"];

        //     /**
        //     * This variable helps introduce stagger in line dot placement.
        //     * This way we can make the dots have proportion and not align perfectly
        //     * in a straight line.
        //     **/
        //     if (line.side_index)
        //       line.dots.start[0] += bedbugGameCore.game_specs.dot_constants["start_stagger"] * line.side_index;

        //     // console.log(line.dots.start[0]);

        //     start_dot = context.game.add.button(line.dots.start[0], line.dots.start[1], 'line_dot', null, null, 1, 0);

        //     start_dot.anchor.set(0.5, 0.5);
        //     start_dot.onInputOver.add(thisContext.showLine, thisContext);
        //     start_dot.onInputOut.add(thisContext.hideLine, thisContext);
        //     thisContext.lineID = context.game.add.text(line.dots.start[0], line.dots.start[1], line.name, id_style);
        //     thisContext.lineID.anchor.set(0.5, 0.4);
        //     // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
        //     thisContext.lineID.visible = false;
        //   }

        //   // create the last dot
        //   var end_dot;
        //   if (line.dots.end && !slim && bedbugGameCore.isDesktop()) {

        //     /**
        //     * Check to see if the dot placement uses a variable instead of a exact integer
        //     * It helps with batch placement where left starting positions and right ending
        //     * positions are managed from central variables
        //     **/
        //     if (_.isString(line.dots.end[0]))
        //       line.dots.end[0] = bedbugGameCore.game_specs.dot_constants["end"];

        //     /* Add stagger to dot placement if any */
        //     if (line.side_index)
        //       line.dots.end[0] += bedbugGameCore.game_specs.dot_constants["end_stagger"] * line.side_index;

        //     end_dot = context.game.add.button(line.dots.end[0], line.dots.end[1], 'line_dot', null, null, 1, 0);
        //     end_dot.anchor.set(0.5, 0.5);
        //     end_dot.onInputOver.add(thisContext.showLine, thisContext);
        //     end_dot.onInputOut.add(thisContext.hideLine, thisContext);
        //     thisContext.lineID = context.game.add.text(line.dots.end[0], line.dots.end[1], line.name, id_style);
        //     thisContext.lineID.anchor.set(0.5, 0.4);
        //     // this.lineID.setShadow(1, 1, 'rgba(0,0,0,0.5)', 0);
        //     thisContext.lineID.visible = false;
        //   }



        //   // And now the line according to specs
        //   var gfx = context.game.add.graphics(0, 0);
        //   var heightLine = 0;

        //   if (!slim) {

        //     heightLine = 0;

        //     // Lines in Mobile should not have filters and should be white
        //     if (bedbugGameCore.isDesktop()) {
        //       gfx.filters = [context.game.add.filter('Glow')];
        //       gfx.lineStyle(5, 0x94daf5, 1);
        //     }
        //     else
        //       gfx.lineStyle(5, 0xffffff, 1);
        //   }
        //   else {
        //     gfx.lineStyle(2, 0x94daf5, .8);
        //   }

        //   thisContext.PointsLabel = null;
        //   var reelPoint = 0;
        //   var style = {
        //     'font': '100px Arial',
        //     'fill': 'white'
        //   };

        //   if (start_dot)
        //     gfx.moveTo(start_dot.x, start_dot.y);

        //   var slot;
        //   _.forEach(line.slots, function(row) {
        //     reelPoint++;
        //     slot = bedbugGameCore.Reels[reelPoint - 1].GetWorldPosition(row);

        //     // Define starting point of the Payline
        //     if (reelPoint == 1 && start_dot)
        //       gfx.moveTo(slot.x - (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);

        //     if (reelPoint == 1 && !start_dot)
        //       gfx.moveTo(slot.x, slot.y + heightLine);
        //     else
        //       gfx.lineTo(slot.x, slot.y + heightLine);

        //     if (reelPoint == 3) {
        //       //lineContext.PointsLabel = context.game.add.text(slot.x, slot.y, "", style);
        //       thisContext.PointsLabel = context.game.add.bitmapText(slot.x, slot.y, "pointsfont", "", 75);
        //       thisContext.PointsLabel.anchor.setTo(0.5, 0.5);
        //     }
        //   })

        //   // Define ending point of the Payline
        //   if (line.dots.end && !slim)
        //     gfx.lineTo(slot.x + (bedbugGameCore.game_specs.slots.width / 2 + 5), slot.y);



        //   winLine.addChild(gfx);
        //   winLine.visible = false;

        //   return winLine;
        // }



        // this.test = new CustomButton(context.game, "", 100, 100, 10, 10);
      })

      bedbugGameCore.GridGroup.add(bedbugGameCore.WinningLinesGroup);
    },

    bedbugGameCore.Play.prototype.play_spin = function() {

      if (bedbugGameCore.paytableIsShowing) return;

      // If the reels are spinning behave as Stop Spin
      if (bedbugGameCore.reels_spinning) {
        if (!bedbugGameCore.settings.fast_spins && !bedbugGameCore.stopSpin)
          this.stop_spin();
        return;
      }

      // If bonus game is active ignore
      if (bedbugGameCore.bonus_status != 0) return;

      if (bedbugGameCore.spins_queue.length > 0 || bedbugGameCore.autoplay_count > 0 || Controls.autoplay_panel.visible || !bedbugGameCore.controls_enabled) return;

      // if (bedbugGameCore.autoplay_started) {
      //   bedbugGameCore.autoplay_started = false;
      //   bedbugGameCore.autoplay_count = 0;
      //   Controls.setCountText('');
      //   Controls.setCount(0);
      //   Controls.stopAutoplay();
      //   // bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
      // }


      bedbugEventsSystem.emitEvent('ON_SPIN_PLAY_CLICKED');
      this.pushScrollingText(1, bedbugGameCore.getLocalizedText("MSG_DEFAULT"));
      this.spin();

      // Make sure that win label is off
      if (bedbugGameCore.bigwinLabel_text)
        bedbugGameCore.bigwinLabel_text.visible = false;
    };

  bedbugGameCore.Play.prototype.stop_spin = function() {

    console.log("STOP: " + bedbugGameCore.stopSpin);

    Controls.disableStop();

    if (bedbugGameCore.stopSpin
      // || bedbugGameCore.bonus_status > 0
      ||
      !bedbugGameCore.result_received) return;

    if (bedbugGameCore.reels_spinning) {

      bedbugEventsSystem.emitEvent('ON_SPIN_STOP_CLICKED');

      // setTimeout(function() {
      if (bedbugGameCore.reels_spinning
        // && bedbugGameCore.bonus_status === 0
      )
        bedbugGameCore.stopSpin = true;

      console.log("STOP");
      // }, 10);

    };
  };

  bedbugGameCore.Play.prototype.controls_stop_auto = function(context) {
    // If bonus game is active ignore
    // if (bedbugGameCore.bonus_status != 0) return;

    if (bedbugGameCore.autoplay_started) {
      // bedbugGameCore.autoplay_started = false;
      bedbugGameCore.autoplay_count = 0;
      Controls.setCountText('');
      Controls.setCount(0);
      Controls.stopAutoplay();
      bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    }

    // if (!context) context = this;

    // console.log(context);

    // this.spin();
  };

  bedbugGameCore.Play.prototype.spin = function() {

    // ALL CONTROLS ARE DISABLED
    bedbugGameCore.controls_enabled = false;
    Controls.hideControls(this.game);

    // Remove Symbol info if present
    bedbugGameCore.removeSymbolInfo();

    // Notify Lobby that we are in LOCKED State
    if (LOBBY_PROXY)
      LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTION_WAIT_TO_STOP_SPINNING);

    //Set reel spinning here in order to fix stray win lines
    bedbugGameCore.reels_spinning = true;

    // Set state to SPINNING
    bedbugGameCore.setGameStatus(bedbugGameCore.GAME_STATES.SPINNING);

    // Close the inGroup and emitter
    if (this.winGroup && this.winGroup.visible) {
      Theme.hideBigWin(this);
      bedbugGameCore.bigwinLabel_text.visible = false;
    }

    Controls.showStopPlay();

    // Theme should implement the onSpinStarted method and 
    // handle what happens when the reels start spinning.
    Theme.onSpinStarted();

    // Controls should implement the onSpinStarted method and 
    // handle what happens when the reels start spinning.
    Controls.onSpinStarted();

    var context = this;
    bedbugGameCore.currentContext = this;

    // Remove all winnig lines
    this.resetLines();
    this.resetGrid();
    // Release unecesary Listeners to free up memory
    this.removeListeners();

    // Freeing up memory of previous spin
    bedbugGameCore.WinningLayerGroup.removeAll(true);
    // bedbugGameCore.SpinAssetsCollection = [];

    var ReelsSpinned = 0;

    // Start Reel Spin Animation if the user has required balance
    if (bedbugGameCore.canPayCoins()) {
      _.times(5, function(i) {
        bedbugGameCore.Reels[i].SetToSpin();
      });

      bedbugEventsSystem.emitEvent('ON_REELS_STARTED');
    }
    // Reset result status
    bedbugGameCore.result_received = false;
    // Reset the scatter count
    bedbugGameCore.scatters_appeard = 0;
    // Reset spin index so reels can stop in the rigth order
    bedbugGameCore.spin_reel_index = 0;
    // Reset stop index so reels can stop in the rigth order
    bedbugGameCore.stop_spin_index = 0;
    // Set the win animations bypass to false
    bedbugGameCore.BypassWinSequence = false;
    bedbugGameCore.BypassedWinSequence = false;
    // Remove the BypassWinSequence listener
    bedbugGameCore.game.input.onDown.remove(context.BypassWinSequence);

    if (!bedbugGameCore.hasFocus)
      this.game.paused = true;


    if (bedbugGameCore.spins_queue.length > 0)
      Server.FreePlay(function(serverResult) {

          // THE REELS STARTED SPINNING
          bedbugGameCore.reels_spinning = true;

          // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTION_BEGIN State
          if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTION_BEGIN);

          // We use last actions total coins and the stored free spins minus 1
          Theme.updateBonusInfo(bedbugGameCore.bonus_total_coins, bedbugGameCore.free_spins_left - 1, context);

          // Update the stored values
          bedbugGameCore.bonus_total_coins = serverResult.BonusTotalWinCoins;
          bedbugGameCore.free_spins_left = serverResult.FreeSpinsLeft;


          // Check the stage of the bonus game
          Theme.requiresBonusStageUpgrade(serverResult, context);

          if (bedbugGameCore.spins_queue == 0) bedbugGameCore.bonus_status = 2;

          // _.times(serverResult.Table.length, function(i) {
          //   bedbugGameCore.Reels[i].Spin(serverResult.Table[i], i * (bedbugGameCore.settings.fast_spins ? 150 : 150), serverResult.ReelPlayType[i], serverResult.ReelAnticipationIndex[i], onReelFinished);
          // });

          _.times(serverResult.Table.length, function(i) {
            bedbugGameCore.Reels[i].SetSpinInfo(serverResult.Table[i], i * (bedbugGameCore.settings.fast_spins ? 150 : 150), serverResult.ReelPlayType[i], serverResult.ReelAnticipationIndex[i], onReelFinished);
          });

          function onReelFinished() {

            ReelsSpinned++;

            if (ReelsSpinned == bedbugGameCore.game_specs.grid.columns) {

              bedbugGameCore.reels_spinning = false;

              bedbugGameCore.stopSpin = false;

              bedbugEventsSystem.emitEvent('ON_REELS_STOPED');

              if (serverResult.WinLines.length > 0) {
                // Add a listener that bypasses win animations on user tap
                bedbugGameCore.game.input.onDown.add(context.BypassWinSequence);
                // An Action requiring to draw animations
                context.startWinningLinesLoop(serverResult);
              }
              else {
                continueAferSpin();
              }

              function continueAferSpin() {
                // If free spins remaining
                if (bedbugGameCore.spins_queue.length > 0) {
                  // No other action required. Proceed to update the server and spin again
                  setTimeout(function() {
                    // context.spin();
                    context.FinishAction(serverResult, function() {
                      context.spin();
                    });
                  }, bedbugGameCore.game_specs.config.bonus_game.spin_space_delay);
                }
                else {
                  // Bonus Game Has ended
                  context.FinishAction(serverResult, function() {
                      setTimeout(function() {
                          console.log("here");
                          Theme.endBonusGame(context);
                          bedbugGameCore.addUserWin(serverResult.BonusTotalWinCash, serverResult);
                          // Notify Lobby that LOBBY_MESSAGE_STATE_ACTION_DISPLAY_EXIT_FREE_SPIN_TRANSITION has initiated
                          if (LOBBY_PROXY)
                            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTION_DISPLAY_EXIT_FREE_SPIN_TRANSITION);

                          if (bedbugGameCore.autoplay_count > 0 && !Controls.autoplay_panel.visible) {

                            // There is no win yet so we should only check if the set time has elapsed
                            if (!bedbugGameCore.autoplay.shouldStopOnTime() && !bedbugGameCore.autoplay.shouldStopOnLoss()) {
                            }
                            else {
                              bedbugGameCore.autoplay_proggresive_lose = 0;
                              Controls.stopAutoplay();
                              context.resetLines();
                              context.resetGrid();
                            }
                          };
                      }, bedbugGameCore.game_specs.config.bonus_game.end_delay);
                  });
              }
            }
          }

        }
      })
  else if (bedbugGameCore.payCoins()) {
    Server.Play(bedbugGameCore.bet_cash * 100, bedbugGameCore.coin_value * 100, bedbugGameCore.bet_level, bedbugGameCore.game_specs.config.bet_lines, function(serverResult, bestSymbolId) {

      // if (!bedbugGameCore.canPayCoins()) {
      //   bedbugEventsSystem.emitEvent('ON_REELS_STARTED');
      // }

      // THE REELS STARTED SPINNING
      bedbugGameCore.reels_spinning = true;

      // Ensure that the balance of the user in the system is the same as in the UI
      if (bedbugGameCore.balance != serverResult.InitialBalance)
        bedbugGameCore.setUserBalance(serverResult.InitialBalance / 100);

      if (bedbugGameCore.autoplay_count > 0 && !Controls.autoplay_panel.visible) {
        Controls.setCount(bedbugGameCore.autoplay_count - 1);
        // Controls.setCountText( i);
        bedbugGameCore.autoplay_started = true;

        bedbugGameCore.autoplay_proggresive_lose += bedbugGameCore.bet_cash;
        // Set state to IDLE
        bedbugGameCore.setGameStatus(bedbugGameCore.GAME_STATES.AUTOPLAY);
      }

      // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTIONS_BEGIN State
      if (LOBBY_PROXY)
        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTIONS_BEGIN);

      // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTION_BEGIN State
      if (LOBBY_PROXY)
        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTION_BEGIN);

      // _.times(serverResult.Table.length, function(i) {
      //   bedbugGameCore.Reels[i].Spin(serverResult.Table[i], i * (bedbugGameCore.settings.fast_spins ? 150 : 150), serverResult.ReelPlayType[i], serverResult.ReelAnticipationIndex[i], onReelFinished);
      // });

      _.times(serverResult.Table.length, function(i) {
        // console.log("Spin ReelPlayType: "+ serverResult.ReelPlayType[i]);
        bedbugGameCore.Reels[i].SetSpinInfo(serverResult.Table[i], i * (bedbugGameCore.settings.fast_spins ? 150 : 150), serverResult.ReelPlayType[i], serverResult.ReelAnticipationIndex[i], onReelFinished);
      });


      /* Moved this in the reel to safeguard that symbols are in place
          when the stop button is pressed 
      */
      // bedbugEventsSystem.emitEvent('ON_RESULT_RECEIVED');
      // bedbugGameCore.result_received = true;

      function onReelFinished() {

        ReelsSpinned++;


        if (ReelsSpinned == bedbugGameCore.game_specs.grid.columns) {

          bedbugGameCore.reels_spinning = false;

          bedbugGameCore.stopSpin = false;

          // Inform whomever is listeneing that the reels stoped
          bedbugEventsSystem.emitEvent('ON_REELS_STOPED', [bestSymbolId]);


          // If Win OR Switch To Bonus Game
          if (serverResult.WinLines.length > 0 || (serverResult.UpgradeBonusGame && bedbugGameCore.bonus_status === 0)) {
            // Add a listener that bypasses win animations on user tap
            bedbugGameCore.game.input.onDown.add(context.BypassWinSequence);
            // we have a win show let's show it
            context.startWinningLinesLoop(serverResult);
          }

          else {
            continueAfterSpin();
          }

          function continueAfterSpin() {
            if (bedbugGameCore.autoplay_count > 0 && !Controls.autoplay_panel.visible) {

              // No other action required. Proceed to update the server and spin again
              setTimeout(function() {
                context.FinishAction(serverResult, function() {

                  // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTION_BEGIN State
                  if (LOBBY_PROXY)
                    LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTIONS_FINISH);

                  bedbugGameCore.controls_enabled = true;
                  Controls.showControls(context.game);

                  // There is no win yet so we should only check if the set time has elapsed
                  if (!bedbugGameCore.autoplay.shouldStopOnTime() && !bedbugGameCore.autoplay.shouldStopOnLoss()) {
                    bedbugGameCore.autoplay_count--;
                    if (bedbugGameCore.autoplay_count < 0) bedbugGameCore.autoplay_count = 0;
                    if (bedbugGameCore.autoplay_count == 0) bedbugGameCore.autoplay_proggresive_lose = 0;
                    context.spin();
                  }
                  else {
                    bedbugGameCore.autoplay_proggresive_lose = 0;
                    Controls.stopAutoplay();
                    context.resetLines();
                    context.resetGrid();
                  }
                });
              }, 1000);

            }
            else {
              context.FinishAction(serverResult, function() {
                // console.log("--- Controls Enabled ----");
                bedbugGameCore.controls_enabled = true;
                Controls.showControls(context.game);

                // Set state to IDLE
                bedbugGameCore.setGameStatus(bedbugGameCore.GAME_STATES.IDLE);

                // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTION_BEGIN State
                if (LOBBY_PROXY)
                  LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTIONS_FINISH);
                // Notify Lobby that we are in IDLE State
                if (LOBBY_PROXY)
                  LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_WAIT_FOR_BET);


                Controls.showPlay();
                Controls.stopAutoplay();
                Controls.setCountText('');
              });
            }
          }



        }

        // if (ReelsSpinned == 3)
        //   context.weatherChangeBySymbol(bestSymbolId);

      }
    });
  }
  // else {

  //   // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTION_BEGIN State
  //   if (LOBBY_PROXY)
  //     LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_WAIT_FOR_BET);

  //   bedbugGameCore.controls_enabled = true;
  //   Controls.showControls(context.game);

  //   // Set state to IDLE
  //   bedbugGameCore.setGameStatus(bedbugGameCore.GAME_STATES.IDLE);
  // }
  };

  bedbugGameCore.Play.prototype.BypassWinSequence = function() {
    bedbugGameCore.BypassWinSequence = true;
    bedbugGameCore.BypassedWinSequenceAfterCount = true;
    Theme.hideBigWin(bedbugGameCore.currentContext);
    setTimeout(function() { bedbugGameCore.BypassedWinSequenceAfterCount = false }, 300);
    bedbugGameCore.game.input.onDown.remove(bedbugGameCore.currentContext.BypassWinSequence);
  }

  bedbugGameCore.Play.prototype.addListeners = function() {
    // Release unecesary Listeners to free up memory

    bedbugEventsSystem.addListener('ON_SCATTER_APPEAR', function() {
      bedbugGameCore.scatters_appeard++;
    });

    // Cannot stop reels if anticipation has started showing
    bedbugEventsSystem.addListener('ON_EACH_ANTICIPATION_START', function() {
      Controls.disableStop();
    });

  }

  bedbugGameCore.Play.prototype.removeListeners = function() {
    // Release unecesary Listeners to free up memory
    _.times(bedbugGameCore.game_specs.grid.columns, function(i) {
      bedbugEventsSystem.removeEvent('ON_SCATTER_APPEAR_Reel' + i);
    })

    bedbugEventsSystem.removeEvent('ON_SCATTER_WIN');


  }

  bedbugGameCore.Play.prototype.openGameRules = function() {
    bedbugGameCore.OPEN_GAME_RULES();
  }

  bedbugGameCore.Play.prototype.setMaxBet = function() {


    if (!bedbugGameCore.controls_enabled) return;

    bedbugEventsSystem.emitEvent('ON_MAX_BET_CLICKED');
    var context = this;
    _.each(bedbugGameCore.game_specs.lines, function(value, key) {
      // console.log()
      bedbugGameCore.Lines[value.winlineid].showSlimLine();
    })

    setTimeout(function() {
      _.each(bedbugGameCore.game_specs.lines, function(value, key) {
        bedbugGameCore.Lines[value.winlineid].hideSlimLine();
      })
    }, 2000)

    bedbugGameCore.setMaxBet();
  };

  bedbugGameCore.Play.prototype.setAutoPlay = function() {
      var context = this;
      bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');

      if (bedbugGameCore.autoplay_count == 50) {
        bedbugGameCore.autoplay_count = 0;
      }
      else
        _.each(bedbugGameCore.autoplay_steps, function(o) {
          if (o > bedbugGameCore.autoplay_count) {
            bedbugGameCore.autoplay_count = o;
            return false;
          }
        });

      bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    bedbugGameCore.Play.prototype.incrAutoplayCount = function() {

      var context = this;
      bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');

      bedbugGameCore.autoplay_current_step++;
      if (!bedbugGameCore.autoplay_steps[bedbugGameCore.autoplay_current_step]) bedbugGameCore.autoplay_current_step = bedbugGameCore.autoplay_steps.length - 1;


      bedbugGameCore.autoplay_count = bedbugGameCore.autoplay_steps[bedbugGameCore.autoplay_current_step];


      bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    bedbugGameCore.Play.prototype.decrAutoplayCount = function() {

      // console.log("decr");
      var context = this;
      bedbugEventsSystem.emitEvent('ON_BUTTON_CLICK');


      bedbugGameCore.autoplay_current_step--;
      if (bedbugGameCore.autoplay_current_step == -1) bedbugGameCore.autoplay_current_step = 0;

      bedbugGameCore.autoplay_count = bedbugGameCore.autoplay_steps[bedbugGameCore.autoplay_current_step];

      bedbugEventsSystem.emitEvent('ON_CONTROL_PANEL_UPDATE');
    },

    bedbugGameCore.Play.prototype.resetLines = function() {

      if (Theme.PointsLabel) {
        Theme.pointsbg.visible = false;
        Theme.PointsLabel.visible = false;
      }

      bedbugGameCore.WinningLinesGroup.parent.bringToTop(bedbugGameCore.WinningLinesGroup);
      // First hide all winning lines
      _.forEach(bedbugGameCore.Lines, function(line) {
        line.hideLine();
      })


    };

  bedbugGameCore.Play.prototype.resetGrid = function() {

    // Remove the timeout if exists for the winning loop;
    clearTimeout(this.WinningLoopTimeout);

    // Then, for each reel, reset the visible slots    
    _.forEach(bedbugGameCore.Reels, function(reel) {
      reel.resetSlotsState();
    })

    bedbugGameCore.winLabel.visible = false;
    bedbugGameCore.winLabel_text.visible = false;

  };

  bedbugGameCore.Play.prototype.setToLost = function() {

    // Then, for each reel, reset the visible slots    
    _.forEach(bedbugGameCore.Reels, function(reel) {
      reel.setToLost();
    })

  };


  bedbugGameCore.Play.prototype.showEndBonusWinnings = function(win, type, finishCallback) {

    // bedbugGameCore.winLabel_text.setText(bedbugGameCore.getLocalizedText("small_win_text") +" "+ 0);
    bedbugGameCore.winLabel.visible = true;
    bedbugGameCore.game.world.bringToTop(bedbugGameCore.winLabel);

    bedbugGameCore.winLabel_text.visible = true;
    bedbugGameCore.winLabel_text.bringToTop();


    var context = this;


    // SMALL WIN (type == "1")
    if (type === "1") {

      bedbugEventsSystem.emitEvent('ON_SLOT_WIN_SMALL');
      bedbugGameCore.winLabel_text.colors = [];
      bedbugGameCore.winLabel_text.addColor('#fde603', 4);
      // console.log(win);
      BedbugTools.countTo(bedbugGameCore.winLabel_text, {
        from: 0, // the number the element should start at
        to: win, // the number the element should end at
        speed: 500, // how long it should take to count between the target numbers
        refreshInterval: 25, // how often the element should be updated
        concated_text: bedbugGameCore.getLocalizedText("MSG_WIN").replace("$(1)", ""),
        onUpdate: function() {
          bedbugEventsSystem.emitEvent('ON_COIN_COUNT');
        },
        onComplete: countComplete
      });
    }
    if (type === "2") {

      bedbugEventsSystem.emitEvent('ON_SLOT_WIN_MEDIUM');
      bedbugGameCore.winLabel_text.colors = [];
      bedbugGameCore.winLabel_text.addColor('#fde603', 10);
      // console.log(win);
      BedbugTools.countTo(bedbugGameCore.winLabel_text, {
        from: 0, // the number the element should start at
        to: win, // the number the element should end at
        speed: 500, // how long it should take to count between the target numbers
        refreshInterval: 25, // how often the element should be updated
        concated_text: bedbugGameCore.getLocalizedText("MSG_WIN").replace("$(1)", "") + " ",
        onUpdate: function() {
          bedbugEventsSystem.emitEvent('ON_COIN_COUNT')
        },
        onComplete: countComplete
      });
    }

    if (type == "3") {
      bedbugEventsSystem.emitEvent('ON_SLOT_WIN_BIG');
      bedbugGameCore.winLabel.visible = false;
      bedbugGameCore.winLabel_text.visible = false;

      Theme.playBigWin(context, countWin);
      console.log("Big win from server: " + win);

      function countWin() {
        // console.log(bedbugGameCore.bigwinLabel_text);
        bedbugGameCore.bigwinLabel_text.visible = true;
        BedbugTools.countTo(bedbugGameCore.bigwinLabel_text, {
          from: 0, // the number the element should start at
          to: win, // the number the element should end at
          speed: 1000, // how long it should take to count between the target numbers
          refreshInterval: 25, // how often the element should be updated
          concated_text: " ",
          onUpdate: function() {
            bedbugEventsSystem.emitEvent('ON_COIN_COUNT')
          },
          onComplete: countComplete
        });
      }
    }

    function countComplete() {
      bedbugEventsSystem.emitEvent('ON_COIN_COUNT_END')
      context.pushScrollingText(1, "Total thunderstom winnings were " + win + " coins. Congrats!");
      finishCallback();
    }
  };

  bedbugGameCore.Play.prototype.showWinnings = function(serverResult, finishCallback) {

    var win = serverResult.WinCoins;
    var winAmount = serverResult.WinAmount;
    var type = serverResult.WinLevel;

    // Retrieve the RGS winning levels if we haven't already
    if (!bedbugGameCore.WinLevelsSettings)
      bedbugGameCore.WinLevelsSettings = _.map(_.sortBy(_.filter(bedbugGameCore.configuration.server_settings.Game.Settings, {
        "SettingName": "WinLevel"
      }), ['SettingKey']), function(o) {
        return parseInt(o.SettingValue);
      });

    // bedbugGameCore.winLabel_text.setText(bedbugGameCore.getLocalizedText("small_win_text") +" "+ 0);
    if (type !== "0") {
      Theme.onWin();
      bedbugGameCore.winLabel.visible = true;
      bedbugGameCore.game.world.bringToTop(bedbugGameCore.winLabel);
      bedbugGameCore.winLabel_text.visible = true;
      bedbugGameCore.winLabel_text.bringToTop();
    }

    var context = this;

    // SMALL WIN (type == "1")
    if (type === "1") {
      bedbugEventsSystem.emitEvent('ON_SLOT_WIN_SMALL');
      bedbugGameCore.winLabel_text.colors = [];
      bedbugGameCore.winLabel_text.addColor('#fde603', 4);

      BedbugTools.countTo(bedbugGameCore.winLabel_text, {
        from: 0, // the number the element should start at
        to: win, // the number the element should end at
        speed: 500, // how long it should take to count between the target numbers
        refreshInterval: 25, // how often the element should be updated
        concated_text: bedbugGameCore.getLocalizedText("MSG_WIN").replace("$(1)", "") + " ",
        onUpdate: function() {
          // bedbugEventsSystem.emitEvent('ON_COIN_COUNT')
        },
        onComplete: countComplete
      });
    }

    if (type === "2") {

      bedbugEventsSystem.emitEvent('ON_SLOT_WIN_MEDIUM');
      bedbugGameCore.winLabel_text.colors = [];
      bedbugGameCore.winLabel_text.addColor('#fde603', 10);

      BedbugTools.countTo(bedbugGameCore.winLabel_text, {
        from: 0, // the number the element should start at
        to: win, // the number the element should end at
        speed: 500, // how long it should take to count between the target numbers
        refreshInterval: 25, // how often the element should be updated
        concated_text: bedbugGameCore.getLocalizedText("MSG_WIN").replace("$(1)", "") + " ",
        onUpdate: function() {
          // bedbugEventsSystem.emitEvent('ON_COIN_COUNT')
        },
        onComplete: countComplete
      });
    }


    if (parseInt(type) >= 3) {
      bedbugEventsSystem.emitEvent('ON_SLOT_WIN_BIG');
      bedbugGameCore.winLabel.visible = false;
      bedbugGameCore.winLabel_text.visible = false;

      Theme.playBigWin(context, countWin);

      function countWin() {

        bedbugGameCore.bigwinLabel_text.text = "";
        bedbugGameCore.bigwinLabel_text.visible = true;


        /* Create waterfall Win*/
        // console.log(win + " >= " + bedbugGameCore.WinLevelsSettings[3]);
        // If win is greter than a Mega win
        if (bedbugGameCore.WinLevelsSettings[3] && win >= bedbugGameCore.WinLevelsSettings[3]) {
          BedbugTools.countTo(bedbugGameCore.bigwinLabel_text, {
            from: 0, // the number the element should start at
            to: bedbugGameCore.WinLevelsSettings[3], // the number the element should end at
            speed: 1000, // how long it should take to count between the target numbers
            refreshInterval: 25, // how often the element should be updated
            concated_text: "",
            onUpdate: function() {
              if (bedbugGameCore.BypassWinSequence && !bedbugGameCore.BypassedWinSequence) {
                // Theme.hideBigWin(context);
                countComplete();
              }
              else if (!bedbugGameCore.BypassedWinSequence)
                bedbugEventsSystem.emitEvent('ON_COIN_COUNT');
            },
            onComplete: upgradeBigWinMagnitudeToMega
          });
        }
        else {
          BedbugTools.countTo(bedbugGameCore.bigwinLabel_text, {
            from: 0, // the number the element should start at
            to: win, // the number the element should end at
            speed: 1000, // how long it should take to count between the target numbers
            refreshInterval: 25, // how often the element should be updated
            concated_text: "",
            onUpdate: function() {
              if (bedbugGameCore.BypassWinSequence && !bedbugGameCore.BypassedWinSequence) {
                console.log("bypassing")
                // Theme.hideBigWin(context);
                countComplete();
              }
              else if (!bedbugGameCore.BypassedWinSequence)
                bedbugEventsSystem.emitEvent('ON_COIN_COUNT');
            },
            onComplete: countComplete
          });
        }

        function upgradeBigWinMagnitudeToMega() {

          // console.log("Play upgrade win animation and sound here to Mega");

          bedbugEventsSystem.emitEvent('ON_SLOT_WIN_BIG_MAGNITUDE_CHANGE');
          var yoLabel = bedbugGameCore.game.add.tween(bedbugGameCore.bigwinLabel_text.scale).to({
            x: 1.4,
            y: 1.4
          }, 200, Phaser.Easing.Back.Out, true);
          yoLabel.yoyo(true);

          // If win is greater than an Ultra win
          if (bedbugGameCore.WinLevelsSettings[4] && win >= bedbugGameCore.WinLevelsSettings[4])
            BedbugTools.countTo(bedbugGameCore.bigwinLabel_text, {
              from: bedbugGameCore.WinLevelsSettings[3], // the number the element should start at
              to: bedbugGameCore.WinLevelsSettings[4], // the number the element should end at
              speed: 1000, // how long it should take to count between the target numbers
              refreshInterval: 25, // how often the element should be updated
              concated_text: "",
              onUpdate: function() {
                if (bedbugGameCore.BypassWinSequence && !bedbugGameCore.BypassedWinSequence) {
                  console.log("bypassing")
                  // Theme.hideBigWin(context);
                  countComplete();
                }
                else if (!bedbugGameCore.BypassedWinSequence)
                  bedbugEventsSystem.emitEvent('ON_COIN_COUNT');
              },
              onComplete: upgradeBigWinMagnitudeToUltra
            });
          else
            BedbugTools.countTo(bedbugGameCore.bigwinLabel_text, {
              from: bedbugGameCore.WinLevelsSettings[3], // the number the element should start at
              to: win, // the number the element should end at
              speed: 1000, // how long it should take to count between the target numbers
              refreshInterval: 25, // how often the element should be updated
              concated_text: "",
              onUpdate: function() {
                if (bedbugGameCore.BypassWinSequence && !bedbugGameCore.BypassedWinSequence) {
                  console.log("bypassing")
                  // Theme.hideBigWin(context);
                  countComplete();
                }
                else if (!bedbugGameCore.BypassedWinSequence)
                  bedbugEventsSystem.emitEvent('ON_COIN_COUNT');
              },
              onComplete: countComplete
            });
        }

        function upgradeBigWinMagnitudeToUltra() {
          // console.log("Play upgrade win animation and sound here to Ultra");
          bedbugEventsSystem.emitEvent('ON_SLOT_WIN_BIG_MAGNITUDE_CHANGE');
          var yoLabel = bedbugGameCore.game.add.tween(bedbugGameCore.bigwinLabel_text.scale).to({
            x: 2,
            y: 2
          }, 200, Phaser.Easing.Back.Out, true);
          yoLabel.yoyo(true);

          BedbugTools.countTo(bedbugGameCore.bigwinLabel_text, {
            from: bedbugGameCore.WinLevelsSettings[4], // the number the element should start at
            to: win, // the number the element should end at
            speed: 1000, // how long it should take to count between the target numbers
            refreshInterval: 25, // how often the element should be updated
            concated_text: "",
            onUpdate: function() {
              if (bedbugGameCore.BypassWinSequence && !bedbugGameCore.BypassedWinSequence) {
                // console.log("bypassing")
                // Theme.hideBigWin(context);
                countComplete();
              }
              else if (!bedbugGameCore.BypassedWinSequence)
                bedbugEventsSystem.emitEvent('ON_COIN_COUNT');

            },
            onComplete: countComplete
          });
        }

      }
    }

    // In case there is no win but we must proceed nevertheless 
    if (type === "0")
      countComplete();


    function countComplete() {
      if (!bedbugGameCore.BypassedWinSequence)
        context.countComplete(type, winAmount, serverResult, finishCallback);
    }
  };

  bedbugGameCore.Play.prototype.countComplete = function(type, winAmount, serverResult, finishCallback) {

    bedbugGameCore.BypassedWinSequence = true;
    var context = this;
    if (parseInt(type) >= 3)
      bedbugEventsSystem.emitEvent('ON_COIN_COUNT_END');


    // Credit Users their win
    // Ignore if it was the last spin of the bonus game
    if (bedbugGameCore.bonus_status === 0)
      bedbugGameCore.addUserWin(winAmount, serverResult);

    // Update the server about the Action Finished
    context.FinishAction(serverResult, function() {
      setTimeout(function() {
        // console.log("--- Controls Enabled ----:" + bedbugGameCore.spins_queue.length);

        if (!bedbugGameCore.spins_queue || (bedbugGameCore.spins_queue && bedbugGameCore.spins_queue.length == 0)) {
          bedbugGameCore.controls_enabled = true;
          Controls.showControls(context.game);

          // Set state to IDLE
          bedbugGameCore.setGameStatus(bedbugGameCore.GAME_STATES.IDLE);

          // Notify Lobby that we are in IDLE State
          if (LOBBY_PROXY)
            LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_WAIT_FOR_BET);
        }

        finishCallback();
      }, 1000);

    });
  }

  bedbugGameCore.Play.prototype.messageQueueIsPlaying = 0;
  bedbugGameCore.Play.prototype.displayCenterMessageQueue = [];

  bedbugGameCore.Play.prototype.displayCenterMessage = function(_message, _size) {
    var context = this;

    if (_message)
      context.displayCenterMessageQueue.push({
        message: _message,
        size: _size
      });

    if (context.messageQueueIsPlaying > 0) return;

    context.messageQueueIsPlaying = 1;

    var gridCenter = bedbugGameCore.getGridCenter();
    var style = {
      font: "bold 50px ArialRound",
      fill: "#fff"
    }

    var message = context.displayCenterMessageQueue.shift();
    var text = context.game.add.text(gridCenter.x, gridCenter.y, message.message, style);

    text.addColor('#fff', 0);
    text.setShadow(2, 2, 'rgba(0,0,0,0.3)', 5);
    text.stroke = '#3E6BB5';
    text.strokeThickness = 2;

    // text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    text.anchor.setTo(0.5, 0.5);
    text.alpha = 0;

    if (bedbugGameCore.game.device.desktop)
      text.resolution = 2;

    context.game.add.tween(text.scale).to({
      x: message.size,
      y: message.size
    }, 1200, Phaser.Easing.Linear.none, true, 0, 0, false);
    var text_alpha = context.game.add.tween(text).to({
      alpha: 1
    }, 600, Phaser.Easing.Exponential.Out, true, 0, 0, true);

    text_alpha.onComplete.add(function() {
      text.destroy();
      context.messageQueueIsPlaying = 0;
      if (context.displayCenterMessageQueue.length > 0) context.displayCenterMessage();
    }, this)

  }



  bedbugGameCore.Play.prototype.startWinningLinesLoop = function(serverResult) {
    var line = 0;
    var loop = 0;
    var context = this;

    if (bedbugGameCore.bonus_status === 0) {

      // Notify Lobby that we are in LOBBY_MESSAGE_STATE_ACTION_BEGIN State
      if (LOBBY_PROXY)
        LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTIONS_FINISH);


    }

    // Sound Effect of Win Type
    bedbugEventsSystem.emitEvent('ON_SLOT_WIN' + serverResult.WinLevel);

    context.resetLines();
    context.setToLost();

    // Show all wins
    _.each(serverResult.WinLines, function(eachwinline) {

      if (eachwinline.line) {
        var line = bedbugGameCore.Lines[eachwinline.line];
        if (line)
          line.showLine();
      }


      _.each(eachwinline.symbols, function(symbol) {
        bedbugGameCore.Reels[symbol[0]].getSlotAt(symbol[1]).setToWin(true);
      })
    })


    // Display Coin Count
    context.showWinnings(serverResult, startLoop);

    // bedbugGameCore.winLabel.visible = true;
    // bedbugGameCore.winLabel_text.visible = true;

    function startLoop() {

      if (bedbugGameCore.bonus_status === 2) {
        Theme.endBonusGame(context);
        bedbugGameCore.addUserWin(serverResult.BonusTotalWinCash, serverResult);
        // Notify Lobby that LOBBY_MESSAGE_STATE_ACTION_DISPLAY_EXIT_FREE_SPIN_TRANSITION has initiated
        if (LOBBY_PROXY)
          LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTION_DISPLAY_EXIT_FREE_SPIN_TRANSITION);

        return;
      }

      if (bedbugGameCore.reels_spinning) return;


      /** ************************************************************************************
       *  This is the initiator of the bonus game. everything starts here.
       * ***********************************************************************************/
      // console.log("Is Bonus: ", serverResult.UpgradeBonusGame && bedbugGameCore.bonus_status === 0)
      if (serverResult.UpgradeBonusGame && bedbugGameCore.bonus_status === 0) {
        // context.startBonusGame(serverResult);
        Theme.startBonusGame(serverResult, context);
        bedbugEventsSystem.emitEvent('ON_BONUSGAME_START');

        // Set state to BONUS
        bedbugGameCore.setGameStatus(bedbugGameCore.GAME_STATES.BONUS);

        // Notify Lobby that LOBBY_MESSAGE_STATE_ACTION_CHECK_FREE_SPIN has initiated
        if (LOBBY_PROXY)
          LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_ACTION_CHECK_FREE_SPIN);

        return;
      }

      if (bedbugGameCore.spins_queue.length > 0) {
        context.spin();
        return;
      }

      // // Then check Autoplay
      // if (bedbugGameCore.autoplay_count > 0 && !Controls.autoplay_panel.visible) {
      //   // console.log("progresive loss changed from: " + bedbugGameCore.autoplay_proggresive_lose);

      //   bedbugGameCore.autoplay_proggresive_lose -= (serverResult.WinAmount / 100);
      //   // console.log("Loss: " + bedbugGameCore.autoplay_proggresive_lose);
      //   // console.log("to: " + bedbugGameCore.autoplay_proggresive_lose);
      //   // Pass the autoplay validatation in order to continue auto-playing

      //   // console.log(serverResult);
      //   if (!bedbugGameCore.autoplay.shouldStopOnWin(serverResult.ProgressiveTotalWinCoins, serverResult.ProgressiveTotalWinAmount)) {
      //     bedbugGameCore.autoplay_count--;
      //     if (bedbugGameCore.autoplay_count < 0) bedbugGameCore.autoplay_count = 0;
      //     if (bedbugGameCore.autoplay_count == 0) bedbugGameCore.autoplay_proggresive_lose = 0;
      //     context.spin();
      //     return;
      //   }
      //   else {
      //     bedbugGameCore.autoplay_proggresive_lose = 0;
      //     bedbugGameCore.autoplay_count = 0;
      //   }

      // }

      if (bedbugGameCore.autoplay_count == 0) {
        // Notify Lobby that we are in IDLE State
        if (LOBBY_PROXY)
          LOBBY_PROXY.SendMessage(LOBBY_MESSAGES_ENUM.LOBBY_MESSAGE_STATE_WAIT_FOR_BET);

        // Set state to IDLE
        bedbugGameCore.game_status = bedbugGameCore.GAME_STATES.IDLE;

        bedbugGameCore.controls_enabled = true;
        Controls.showControls(this.game);
        Controls.showPlay();
        Controls.stopAutoplay();
      }

      context.resetLines();
      context.resetGrid();
      showWinningLine(serverResult.WinLines[line]);
    }

    function showWinningLine(winline) {
      context.resetLines();
      context.setToLost();

      // If there is an autoplay active escape the winning lines loop and continue
      if (loop == 1 || bedbugGameCore.BypassWinSequence)
        if (bedbugGameCore.autoplay_count > 0 && !Controls.autoplay_panel.visible) {
          // console.log("progresive loss changed from: " + bedbugGameCore.autoplay_proggresive_lose);
          bedbugGameCore.autoplay_proggresive_lose -= (serverResult.WinAmount / 100);
          // console.log("Loss: " + bedbugGameCore.autoplay_proggresive_lose);
          // console.log("to: " + bedbugGameCore.autoplay_proggresive_lose);
          // Pass the autoplay validatation in order to continue auto-playing
          if (!bedbugGameCore.autoplay.shouldStopOnWin(serverResult.ProgressiveTotalWinCoins, serverResult.ProgressiveTotalWinAmount)) {
            bedbugGameCore.autoplay_count--;
            if (bedbugGameCore.autoplay_count < 0) bedbugGameCore.autoplay_count = 0;
            if (bedbugGameCore.autoplay_count == 0) bedbugGameCore.autoplay_proggresive_lose = 0;
            context.spin();
            return;
          }
          else {
            bedbugGameCore.autoplay_proggresive_lose = 0;
            bedbugGameCore.autoplay_count = 0;
            bedbugGameCore.controls_enabled = true;
            Controls.showControls(this.game);
            Controls.showPlay();
            Controls.stopAutoplay();
          }

        }

      if (winline.line)
        bedbugGameCore.Lines[winline.line].showLine();

      var winningSymbolCount = 0;

      _.each(winline.symbols, function(symbol) {
        // setTimeout(function() {
        bedbugGameCore.Reels[symbol[0]].getSlotAt(symbol[1]).setToWin();
        // }, winningSymbolCount );
        // winningSymbolCount++;
      })
      // console.log("Winline: ",winline.line);
      if (winline.line)
        bedbugGameCore.Lines[winline.line].showPoints(winline.amount);
      else
        Theme.showPoints(winline.amount, context);

      bedbugGameCore.game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);

      function nextLine() {
        line++;
        if (line > serverResult.WinLines.length - 1) {
          // Reset which line we will show next
          line = 0;
          loop = 1;
        }

        if (bedbugGameCore.reels_spinning) return;
        showWinningLine(serverResult.WinLines[line]);

      };
    }
  };


  bedbugGameCore.Play.prototype.FinishAction = function(Action, callback) {
    Server.FinishAction(Action, callback);
  }
  