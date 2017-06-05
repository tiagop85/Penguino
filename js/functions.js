"use strict"; 

var FunctionsGame = function(game) {};


FunctionsGame.prototype.preload = function() {
//spritesheets
    this.game.load.spritesheet('player'        , 'Assets/spritesheets/bunny_52x75.png' , 52, 75, 13);
    this.game.load.spritesheet('tiles_spearfox', 'Assets/spritesheets/enemies/spear_550x192_110x64.png', 110, 64, 15);
    this.game.load.spritesheet('tiles_axefox', 'Assets/spritesheets/enemies/axe725x333_145x111.png', 145, 111, 15);
    this.game.load.spritesheet('life'          , 'Assets/spritesheets/HUD970x88.png', 194, 88, 5);
    this.game.load.spritesheet('tiles_items'   , 'Assets/spritesheets/items.png'  , 32, 32, 16);
    this.game.load.spritesheet('enemies'       , 'Assets/spritesheets/enemies.png', 32, 32, 12);
    this.game.load.spritesheet('tiles_platform_level1', 'Assets/tileset/TileSet_Fase1_Floresta.png', 32, 32);
    this.game.load.spritesheet('sensor'        , 'Assets/spritesheets/enemies/sensor.png');

//Level1
    this.game.load.image      ('tileImageFase1','Assets/tileset/TileSet_Fase1_Floresta.png');
    this.game.load.tilemap    ('tileMapFase1' ,'Assets/maps/level1_floresta.json', null, Phaser.Tilemap.TILED_JSON);
//Level2 -> AJUSTAR
    this.game.load.image      ('tileImageFase2','Assets/tileset/TileSet_Fase2_Caverna.png');
    this.game.load.tilemap    ('tileMapFase2' ,'Assets/maps/level2_caverna.json', null, Phaser.Tilemap.TILED_JSON);
//Level3 -> AJUSTAR
    this.game.load.image      ('tileImageFase3','Assets/tileset/TileSet_Fase3_Castelo.png');
    this.game.load.tilemap    ('tileMapFase3' ,'Assets/maps/level3_castelo.json', null, Phaser.Tilemap.TILED_JSON);

    
//sounds
    this.game.load.audio('button_click' , ['assets/audio/Button-SoundBible.com-1420500901_01.ogg']);
    this.game.load.audio('button_switch', ['assets/audio/Switch-SoundBible.com-350629905_01.ogg']);

//old
    this.game.load.audio('jumpSound'      ,'Assets/sounds/jump.wav');
    this.game.load.audio('pickupSound'    ,'Assets/sounds/pickup.wav');
    this.game.load.audio('hurtSound'      ,'Assets/sounds/hurt3.ogg');
    this.game.load.audio('enemyDeathSound','Assets/sounds/hit2.ogg');
    this.game.load.audio('music'          ,'Assets/sounds/mystery.wav');
    
//screens
    this.game.load.image('bgCredits'    , 'Assets/screens/screen_credits.png');    
    this.game.load.image('bgSplash'     , 'Assets/screens/splash_screen.png');
    this.game.load.image('bgMenu'       , 'Assets/screens/screen_title.png');
    this.game.load.image('bgGameOver'   , 'Assets/screens/screen_game_over.png');
    this.game.load.image('bgVictory'   , 'Assets/screens/screen_victory.png');
    this.game.load.image('bgMoldura'    , 'Assets/screens/game_frame.png');
    
//HUD
    this.game.load.image('start'        , 'Assets/HUD/big_button_play_on.png'); 
    this.game.load.image('credits'      , 'Assets/HUD/big_button_credits_on.png');       
    this.game.load.image('sound_on'     , 'Assets/HUD/button_sound_on.png');
    this.game.load.image('sound_off'    , 'Assets/HUD/button_sound_off.png');
    this.game.load.image('menu'         , 'Assets/HUD/button_home_on.png');
    this.game.load.image('pause'        , 'Assets/HUD/button_pause.png');
    this.game.load.image('play'         , 'Assets/HUD/button_play.png');
    this.game.load.image('restart'      , 'Assets/HUD/button_back_off.png'); 

//musicas    
    this.game.load.audio('music_menu',    ['assets/audio/Song of the Wise Fox-Logan Epic Canto - Menu Principal.mp3']);
    this.game.load.audio('music_game1',   ['assets/audio/Forest Song-Logan Epic Canto-Medieval Ballad - Primeira Fase.mp3']);
    this.game.load.audio('music_game2',   ['assets/audio/For the King - Adrian von Ziegler - Segunda Fase.mp3']);
    this.game.load.audio('music_game3',   ['assets/audio/Bua No Bas Victory or Death - Adrian von Ziegler - Terceira fase.mp3']); 
    
    game.sound.mute = false;
};

FunctionsGame.prototype.create = function() {
    this.game.state.start("splash");
};

FunctionsGame.prototype.update = function() {
};

//Navegação
function gotoStartGame(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    this.game.time.events.add(Phaser.Timer.SECOND * 1, startGame, this);
};

function gotoRestartGame(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    this.game.time.events.add(Phaser.Timer.SECOND * 1, restartGame, this);
};

function startGame() {
//Score
//    game.global.score = 0
//Fase 1 
    game.global.level_atual = 1;
    
//    this.game.state.start("game");
    this.game.state.start("teste");
};

function restartGame() {
    this.game.state.start("game");
};

function gotoNextFase() {
//proxima fase
    game.global.level_atual++;
    console.debug(game.global.level_atual);
    if (game.global.level_atual >= 4){
        this.game.time.events.add(Phaser.Timer.SECOND, gotoWin, this);        
    }
    else{
        this.game.state.start("game");        
    }
};

function gotoCredits(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();    
    this.game.state.start("credits");
};

function gotoLose(item) {
    this.game.state.start('lose');
};

function gotoWin(item) {
    this.game.state.start('win');
};

function gotoMenu(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');
    if (this.game.state.current !== "splash") this.button_click.play();    
    game.paused = false;
    this.game.time.events.add(Phaser.Timer.SECOND * 1, startMenu, this);
};

function startMenu() {
    this.game.state.start("menu");
};

//botoes jogo
function setarSound(item) {
    this.button_switch = this.game.add.music = this.add.audio('button_switch');        
    this.button_switch.play();
    if (game.sound.mute) {
        game.sound.mute = false;
        game.global.sound_sprite = 'sound_on';
        this.sound.loadTexture('sound_on');
    }
    else {
        game.sound.mute = true;
        game.global.sound_sprite = 'sound_off';
        this.sound.loadTexture('sound_off');
    }    
};

function setarPause(item) {
    this.button_switch = this.game.add.music = this.add.audio('button_switch');        
    this.button_switch.play();
    if (game.paused) {
        game.paused = false;
        this.pause.loadTexture('pause');
    }
    else {
//    while (this.button_switch.isPlaying){}
        game.paused = true;
        this.pause.loadTexture('play');
    }        
};

//jogo
function coletarItem(player, item){
    this.pickupSound.play();
    item.kill();

//score a definir
    this.totalItemsCapturados++;
//    game.global.score += 100;
//    this.scoreText.text = "Score: " + game.global.score; 
//    this.textScore.setText(game.global.score);
    this.textScore.setText(this.totalItems - this.totalItemsCapturados);

//se o total de itens essenciais for alcançado, liberar a porta de saída    
    if (this.totalItemsCapturados == this.totalItems){
//        this.textScore = this.game.add.text(400,100,"GANHOU!!", {fill: '#fff'});
//        this.textScore.fixedToCamera = true;    
//        this.game.time.events.add(Phaser.Timer.SECOND * 0.1, gotoWin, this);
        
//        TODO: HABILITAR_SAIDA
//        this.game.time.events.add(Phaser.Timer.SECOND * 0.1, gotoNextFase, this);        
    }
}

function colisaoMortal(player, lava){
    this.hurtSound.play();    
//    this.level1.setCollision([5,6,13],false,this.lavaLayer);
//    this.textScore = this.game.add.text(400,300,"PERDEU!!", {fill: '#fff'});
//    this.textScore.fixedToCamera = true;   
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, gotoLose, this);
}

function proximoNivel(player, lava){ 
//    this.hurtSound.play();    
//    this.level1.setCollision([5,6,13],false,this.lavaLayer);
    if (this.totalItemsCapturados == this.totalItems || game.global.cheat == 1){
        this.game.time.events.add(Phaser.Timer.SECOND * 0.2, gotoNextFase, this);        
    }
}

function colisaoInimigo(player, inimigo){
    if (player.body.touching.down && inimigo.body.touching.up || game.global.cheat == 1){
//        this.enemyDeathSound.play();
//        this.player.body.velocity.y = -200;
//        game.global.score += 100;
//        this.scoreText.text = "Score: " + game.global.score;
//        this.textScore.setText(game.global.score);        
        inimigo.kill();
    }
    else{
        this.game.time.events.add(Phaser.Timer.SECOND * 0.3, gotoLose, this);         
    }
}

function platformFall (player, platform) {
    if (player.body.touching.down && platform.body.touching.up) {
        respawIt(platform, 5, {x: platform.x, y: platform.y});
         this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
            this.game.physics.enable(platform);
            platform.body.gravity.y = 750;   
         }, this);
    }
    
}

/**
 * Respaw do objeto na posição após o tempo
 */
function respawIt (obj, time, position) {
    game.time.events.add(Phaser.Timer.SECOND * time, function () {
        obj.body.gravity.y = 0;
        obj.body.velocity.y = 0;
        obj.revive();
        obj.x = position.x;
        obj.y = position.y;
    }, this);
    
}

/**
 * Não ta funcionando ainda
 * Função usada para tremer objeto 
 */
function shakeIt(obj, onCompleteCallback) {    
    var shake = game.add.tween(obj); 
    var pos = obj.y + 10;
    shake.to({ y:  pos },200, Phaser.Easing.Default, false, 500, 3, true);
    shake.onComplete.add(onCompleteCallback, this); 
    shake.start();

}

function setarCheat(item) {
    game.global.click_count++;
    if (game.global.click_count > 10){
        game.global.click_count = 0;
        if (game.global.cheat == 1){
            game.global.cheat = 0;
        }
        else{
            game.global.cheat = 1;
        }
    }
};

