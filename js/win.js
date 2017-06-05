"use strict"; 

var WinState = function(game) {};

WinState.prototype.preload = function() {
};

WinState.prototype.create = function() {
    this.game.add.sprite(0,0, 'bgVictory')

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
    
    this.textScore = this.game.add.text(526, 290, game.global.score, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center"});    
};

WinState.prototype.update = function() {
};
