var OFFSET = 21.875;
var CELL_WIDTH = 43.75;
var RIGHTEDGE = 743.75;
var WIDTH = 992;
var HEIGHT = 743.75 + CELL_WIDTH;

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: 743.75+CELL_WIDTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ MainMenuScene, 
        SplashScene,
        GameScene, 
        GameInfoScene,
        WinScene]
};
 
var game = new Phaser.Game(config); 
 