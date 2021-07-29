class GameInfoScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;

    constructor(){
        super('GameInfoScene');
    }

    preload (){
        this.load.image('info_bg', 'assets/info_bg.png');
        // this.load.image('PIPE', 'assets/pipe.png');
        // this.load.image('BENDLEFT', 'assets/bend_left.png');
        // this.load.image('BENDRIGHT', 'assets/bend_right.png');
        // this.load.image('CHECKPIPE', 'assets/checkerpipe_clean.png');
        // this.load.image('DOUBLEDUAL', 'assets/doublepipe_dual.png');
        // this.load.image('DOUBLELEFT', 'assets/doublepipe_left.png');
        // this.load.image('DOUBLERIGHT', 'assets/doublepipe_right.png');
        // this.load.image('PURIFIER', 'assets/purify.png');
        // this.load.image('FUNCTIONBLOCK', 'assets/function.png');
        // this.load.image('FUNCTIONCALL', 'assets/functioncall.png');
    }
        
    create(){
        var bg = this.add.image(WIDTH+CELL_WIDTH, HEIGHT, 'info_bg').setOrigin(1);
        bg.setScale(1.1);

        for (var type in AVAILABLE_OBJECTS){
            if (AVAILABLE_OBJECTS.hasOwnProperty(type)) {
                create_sprites_info_icons(this, 1, parseInt(type));
            }
        }

    }

    update(){

    }

}

var pipe_text;
var bendleft_text;
var bendright_text;
var checkpipe_text;
var doubledual_text;
var doubleleft_text;
var doubleright_text;
var purifier_text;


function create_sprites_info_icons(context, number, type) {
    //generates sprites givent the number of sprites needed and the type of sprite needed
    var x = WIDTH-OFFSET-(4*CELL_WIDTH);
    var y = CELL_WIDTH;
    var text_y = (y-10);
    var text_x = x + CELL_WIDTH;
    const style = { font: "bold 12px Arial", fill: "#000" };
    
    switch (type) {
        case ObjectType.PIPE:
            for (var i = 0; i < number; i++){
                var pipe = context.add.sprite(x, y, 'PIPE');
                pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                pipe_text = context.add.text(text_x, text_y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.BENDLEFT:
            for (var i = 0; i < number; i++){
                var bend_left = context.add.sprite(x, y*3, 'BENDLEFT');
                bend_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                bendleft_text = context.add.text(text_x, text_y*3, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.BENDRIGHT:
            for (var i = 0; i < number; i++){
                var bend_right = context.add.sprite(x, y*5, 'BENDRIGHT').setInteractive();
                bend_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(bend_right);
                //partsGroup.add(bend_right);
            }
            break;
        case ObjectType.CHECKPIPE:
            for (var i = 0; i < number; i++){
                var check_pipe = context.add.sprite(x, y*7, 'CHECKPIPE').setInteractive();
                check_pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(check_pipe);
                //partsGroup.add(check_pipe);
            }
            break;
        case ObjectType.DOUBLEDUAL:
            for (var i = 0; i < number; i++){
                var double_pipe_dual = context.add.sprite(x, y*9, 'DOUBLEDUAL').setInteractive();
                double_pipe_dual.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_dual);
                //partsGroup.add(double_pipe_dual);
            }
            break;
        case ObjectType.DOUBLELEFT:
            for (var i = 0; i < number; i++){
                var double_pipe_left = context.add.sprite(x, y*11, 'DOUBLELEFT').setInteractive();
                double_pipe_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_left);
                //partsGroup.add(double_pipe_left);
            }
            break;
        case ObjectType.DOUBLERIGHT:
            for (var i = 0; i < number; i++){
                var double_pipe_right = context.add.sprite(x, y*13, 'DOUBLERIGHT').setInteractive();
                double_pipe_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_right);
                //partsGroup.add(double_pipe_right);
            }
            break;
        case ObjectType.PURIFIER:
            for (var i = 0; i < number; i++){
                var purifier = context.add.sprite(x, y*15, 'PURIFIER').setInteractive();
                purifier.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(purifier);
                //partsGroup.add(purifier);
            }
            break;
        //MISSING: functionblock and functioncal
        default:
            console.log("INSIDE FUNCTION DEFAULT");
    }
    
}