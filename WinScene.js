class WinScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;

    constructor(){
        super('WinScene');
    }

    preload (){
        this.load.image('win', 'assets/win.png');
        
    }
        
    create(){
        var win = this.add.sprite(0, 0, 'win').setOrigin(0,0);
    }

}