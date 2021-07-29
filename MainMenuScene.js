class MainMenuScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;

    constructor(){
        super('MainMenuScene');
    }

    preload (){
        this.load.image('run', 'assets/run.png');
        
    }
        
    create(){
        var runBtn = this.add.image(WIDTH/2, HEIGHT/2, 'run');
        runBtn.setInteractive();
        runBtn.setScale(1);

        this.input.on('gameobjectdown', function(pointer, gameObject){
            this.scene.start('SplashScene');
        }, this);
    }

}