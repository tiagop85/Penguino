"use strict"; 

var CreditsState = function(game) {};

CreditsState.prototype.preload = function() {
};

CreditsState.prototype.create = function() {
    this.game.add.sprite(0,0, 'bgCredits')

    this.menu = this.game.add.sprite(10, 10, 'menu');
    this.menu.scale.x = 1.1;
    this.menu.scale.y = 1.1;
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);
    
    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite);
    this.sound.scale.x = 1.1;
    this.sound.scale.y = 1.1;
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);   
};

CreditsState.prototype.update = function() {
};
