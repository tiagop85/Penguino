"use strict"; 

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
};

LoseState.prototype.create = function() {
    this.game.add.sprite(0,0, 'bgGameOver')

    this.menu = this.game.add.sprite(10, 10, 'menu')
    this.menu.scale.x = 1.1
    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);
    
    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite)
    this.sound.scale.x = 1.1
    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);       
    
    this.restart = this.game.add.sprite(513, 360, 'restart')
    this.restart.scale.x = 1.1
    this.restart.scale.y = 1.1
    this.restart.inputEnabled = true;
    this.restart.events.onInputDown.add(gotoRestartGame, this);

    this.textScore = this.game.add.text(526, 290, game.global.score, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center"});    
};

LoseState.prototype.update = function() {
};
