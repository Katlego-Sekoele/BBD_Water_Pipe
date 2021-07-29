var OFFSET = 21.875;
var CELL_WIDTH = 43.75;

var config = {
    type: Phaser.AUTO,
    width: 743.75,
    height: 743.75+CELL_WIDTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ MainMenuScene, GameScene]
};
 
var game = new Phaser.Game(config); 
 