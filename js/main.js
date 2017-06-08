var game = new Phaser.Game(840, 480, Phaser.CANVAS, 'phaser-canvas');

game.global = {
//    score : 0,
    cheat : 0,
    gravidade : 750,
    click_count : 0,
    music : -1, //-1 desabilitado //0habilitado
    sound_sprite: 'sound_on',
    level_atual: 0,
    tiles_level_atual: ''
}

game.state.add('functions', FunctionsGame);
game.state.add('menu', MenuState);
game.state.add('game', GameState);
game.state.add('credits',CreditsState);
game.state.add('lose', LoseState);
game.state.add('win', WinState);
game.state.add('teste', BasicGame);
game.state.add('splash', SplashState);
game.state.start('functions');

