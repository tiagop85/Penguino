"use strict";

var BasicGame = function (game) {};

var isoGroup, player;

BasicGame.prototype.preload = function () {    
        console.debug('ok');
        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // In order to have the camera move, we need to increase the size of our world bounds.
        game.world.setBounds(0, 0, 2048, 1024);

        // Start the IsoArcade physics system.
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        // When using camera following, it's best to keep the Y anchor set to 0, which will let the camera
        // cover the full size of your world bounds.
        game.iso.anchor.setTo(0.5, 0);
};

BasicGame.prototype.create = function () {
    
//Musica
    if (game.global.music != 2 && game.global.music != -1){
        game.global.music = 2;
        game.sound.stopAll();
        if (game.global.level_atual == 1){
            this.music_game = this.game.add.music = this.add.audio('music_game1');        
        }
        else
        if (game.global.level_atual == 2){
            this.music_game = this.game.add.music = this.add.audio('music_game2');         
        }
        else{
            this.music_game = this.game.add.music = this.add.audio('music_game3');                    
        }
            
        this.music_game.loopFull();
    }    
    
    game.paused = false;  
    
//Som    
//    this.jumpSound = this.game.add.audio('jumpSound');
//    this.pickupSound = this.game.add.audio('pickupSound');
//    this.hurtSound = this.game.add.audio('hurtSound');
//    this.enemyDeathSound= this.game.add.audio('enemyDeathSound');

    this.game.stage.backgroundColor = "#5c82bc";    
    
    
        // Create a group for our tiles, so we can use Group.sort
        isoGroup = game.add.group();

        // Set the global gravity for IsoArcade.
        game.physics.isoArcade.gravity.setTo(0, 0, -500);

        // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
        var cube;
        for (var xx = 1024; xx > 0; xx -= 140) {
            for (var yy = 1024; yy > 0; yy -= 140) {
                // Create a cube using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
//                
//                this.player = this.game.add.sprite(160, 2600, 'player', 5); 
                this.CubeGrey = this.game.add.sprite(0, 0, 'tileImageGreyBlack', 1); 
//                
//                cube = game.add.isoSprite(xx, yy, 0, 'cube', 0, isoGroup);
                cube = game.add.isoSprite(xx, yy, 0,'tileImageGreyBlack', 1, isoGroup);
                cube.anchor.set(0.5);

                // Enable the physics body on this cube.
                game.physics.isoArcade.enable(cube);

                // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
                cube.body.collideWorldBounds = true;

                // Add a full bounce on the x and y axes, and a bit on the z axis. 
                cube.body.bounce.set(1, 1, 0.2);

                // Add some X and Y drag to make cubes slow down after being pushed.
                cube.body.drag.set(100, 100, 0);
            }
        }

        // Create another cube as our 'player', and set it up just like the cubes above.
        player = game.add.isoSprite(128+280, 128+280, 0, 'cube', 0, isoGroup);
        player.tint = 0x86bfda;
        player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;

        // Set up our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        space.onDown.add(function () {
            player.body.velocity.z = 300;
        }, this);

        // Make the camera follow the player.
        game.camera.follow(player);

    //Game State
    this.totalItems = 0;
    this.totalItemsCapturados = 0;
    
//        this.levelAtual = this.game.add.tilemap('tileMapTeste');
//        this.levelAtual.addTilesetImage('tileImage1','greenBlue_x0_y32');
//        this.levelAtual.addTilesetImage('tileImage2','greyBlack');
//        this.levelAtual.addTilesetImage('tileImage3','redYellow');

//HUD    
    this.moldura = this.game.add.sprite(0, 0, 'bgMoldura') 
    this.moldura.fixedToCamera = true;  
    
    this.textScore = this.game.add.text(240, 17, this.totalItems - this.totalItemsCapturados, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "right"});
    this.textScore.anchor.x = 0.5; 
    this.textScore.fixedToCamera = true;  
   
    //menu
    this.menu = this.game.add.sprite(10, 10, 'menu')
    this.menu.scale.x = 1.1
    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);
    this.menu.fixedToCamera = true;  

    //som
    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite)
    this.sound.scale.x = 1.1
    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);        
    this.sound.fixedToCamera = true;  

    //pausar
    this.pause = this.game.add.sprite(735, 10, 'pause')
    this.pause.scale.x = 1.1
    this.pause.scale.y = 1.1
    this.pause.inputEnabled = true;
    this.pause.events.onInputDown.add(setarPause, this);           
    this.pause.fixedToCamera = true;  
};

BasicGame.prototype.update = function () {
        // Move the player at this speed.
        var speed = 100;

        if (this.cursors.up.isDown) {
            player.body.velocity.y = -speed;
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.y = speed;
        }
        else {
            player.body.velocity.y = 0;
        }

        if (this.cursors.left.isDown) {
            player.body.velocity.x = -speed;
        }
        else if (this.cursors.right.isDown) {
            player.body.velocity.x = speed;
        }
        else {
            player.body.velocity.x = 0;
        }

        // Our collision and sorting code again.
        game.physics.isoArcade.collide(isoGroup);
        game.iso.topologicalSort(isoGroup);
};
    
BasicGame.prototype.render = function () {
        game.debug.text("Move with cursors, jump with space!", 2+20, 36+70, "#ffffff");
        game.debug.text('FPS: '+game.time.fps || 'FPS: --', 2+20, 14+70, "#ffffff");
};