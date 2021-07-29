class SplashScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;
    
    

    constructor(){
        super('SplashScene');
    }

    preload (){
        this.load.image('HowTo', 'assets/HowTo.png');
        
    }
        
    create(){
        var howTo = this.add.sprite(0, 0, 'HowTo').setOrigin(0,0).setInteractive();

        this.input.on('gameobjectdown', function(pointer, gameObject){

                this.scene.start('GameScene');//.launch('GameInfoScene');
            
            
        }, this);
    }

}