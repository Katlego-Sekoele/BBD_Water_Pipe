var infocontext;
class GameInfoScene extends Phaser.Scene {
    OFFSET = 21.875;
    CELL_WIDTH = 43.75;

    constructor(){
        super('GameInfoScene');
    }

    preload (){
        console.log("INFO SCREEN")
        this.load.image('info_bg', 'assets/info_bg.png');
    }
        
    create(){
        infocontext = this;
        var bg = this.add.image(WIDTH+CELL_WIDTH, HEIGHT, 'info_bg').setOrigin(1);
        bg.setScale(1.1);

        

        for (var type in AVAILABLE_OBJECTS){
            if (AVAILABLE_OBJECTS.hasOwnProperty(type)) {
                create_sprites_info_icons(this, 1, parseInt(type));
            }
        }

        var level_str_ = (1+CURRENT_LEVEL) + '';
        var water_purity_current_level = LEVELS[level_str_].WATER_PURITY_LEVEL;
        level_purity = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 700, `The purity level in the source is: ${water_purity_current_level}`, { font: "bold 12px Arial", fill: "#00F", wordWrap: { width: 200, useAdvancedWrap: true } });
        purity_text = infocontext.add.text(WIDTH-OFFSET-(4*CELL_WIDTH)-20, 715, `Currently:\nNot yet started.`, { font: "bold 12px Arial", fill: "#000", wordWrap: { width: 200, useAdvancedWrap: true } });
        console.log("COUNT TEXTS", count_texts)

    }

    

}


var ipipe;
var ibend_left;
var ibend_right;
var icheck_pipe;
var idouble_pipe_dual;
var idouble_pipe_left;
var idouble_pipe_right;
var ipurifier;
var purity_text;
var level_purity;
var simulate_outcome;

function update_text(simulate_outcome_){
    simulate_outcome = simulate_outcome_;

    console.log("TEXT UPDATED");
    console.log(AVAILABLE_OBJECTS)
    var x = WIDTH-OFFSET-(4*CELL_WIDTH);
    var y = CELL_WIDTH;
    var text_y = (y-10);
    var text_x = x + CELL_WIDTH;
    const style = { font: "bold 12px Arial", fill: "#000" };    

    if (ipipe) {
        count_texts.pipe_text.destroy();
        var ipipey = ipipe.y;  
        count_texts.pipe_text = infocontext.add.text(text_x, ipipey, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.PIPE]}`, style);
    }else{

    }
    if (ibend_left) {
        count_texts.bendleft_text.destroy();
        var ibend_lefty = ibend_left.y;
        count_texts.bendleft_text = infocontext.add.text(text_x, ibend_lefty, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.BENDLEFT]}`, style);}
    if (ibend_right) {
        count_texts.bendright_text.destroy();
        var ibend_righty = ibend_right.y;
        count_texts.bendright_text = infocontext.add.text(text_x, ibend_righty, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.BENDRIGHT]}`, style);}
    if (icheck_pipe) {
        count_texts.checkpipe_text.destroy();
        var icheck_pipey = icheck_pipe.y;
        count_texts.checkpipe_text = infocontext.add.text(text_x, icheck_pipey, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.CHECKPIPE]}`, style);}
    if (idouble_pipe_dual) {
        count_texts.doubledual_text.destroy();
        var idouble_pipe_dualy = idouble_pipe_dual.y;
        count_texts.doubledual_text = infocontext.add.text(text_x, idouble_pipe_dualy, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.DOUBLEDUAL]}`, style);}
    if (idouble_pipe_left) {
        count_texts.doubleleft_text.destroy();
        var idouble_pipe_lefty = idouble_pipe_left.y;
        count_texts.doubleleft_text = infocontext.add.text(text_x, idouble_pipe_lefty, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.DOUBLELEFT]}`, style);}
    if (idouble_pipe_right) {
        count_texts.doubleright_text.destroy();
        var idouble_pipe_righty = idouble_pipe_right.y;
        count_texts.doubleright_text = infocontext.add.text(text_x, idouble_pipe_righty, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.DOUBLERIGHT]}`, style);}
    if (ipurifier) {
        count_texts.purifier_text.destroy();
        var ipurifiery = ipurifier.y;
        count_texts.purifier_text = infocontext.add.text(text_x, ipurifiery, `Inventory count: ${AVAILABLE_OBJECTS[ObjectType.PURIFIER]}`, style);}

    if (purity_text){
        console.log("UPDATED!!!!!!!!!!!!!")
        if (simulate_outcome.outcome === undefined){
            purity_text.setText(`Currently:\nNot yet started.`);
        }else if (simulate_outcome.outcome) {
            purity_text.setText(`Currently:\n${simulate_outcome.message}`);
            purity_text.setColor('#135029')
        }else{
            purity_text.setText(`Currently:\n${simulate_outcome.err}`);
            purity_text.setColor('#f00')
        }
        //purity_text = infocontext.add.text(text_x-CELL_WIDTH, 743, `Currently:\n${simulate_outcome}`, style);
    }
    
}


function create_sprites_info_icons(context, number, type) {
    //generates sprites givent the number of sprites needed and the type of sprite needed
    var x = WIDTH-OFFSET-(4*CELL_WIDTH);
    var y = CELL_WIDTH;
    var text_y = (y-10);
    var text_x = x + CELL_WIDTH;
    
    const style = { font: "bold 12px Arial", fill: "#000"};
    
    switch (type) {
        case ObjectType.PIPE:
            for (var i = 0; i < number; i++){
                ipipe = context.add.sprite(x, y, 'PIPE');
                ipipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.pipe_text = context.add.text(text_x, ipipe.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.BENDLEFT:
            for (var i = 0; i < number; i++){
                ibend_left = context.add.sprite(x, y*3, 'BENDLEFT');
                ibend_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.bendleft_text = context.add.text(text_x, ibend_left.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.BENDRIGHT:
            for (var i = 0; i < number; i++){
                ibend_right = context.add.sprite(x, y*5, 'BENDRIGHT');
                ibend_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.bendright_text = context.add.text(text_x, ibend_right.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.CHECKPIPE:
            for (var i = 0; i < number; i++){
                icheck_pipe = context.add.sprite(x, y*7, 'CHECKPIPE');
                icheck_pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.checkpipe_text = context.add.text(text_x, icheck_pipe.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.DOUBLEDUAL:
            for (var i = 0; i < number; i++){
                idouble_pipe_dual = context.add.sprite(x, y*9, 'DOUBLEDUAL');
                idouble_pipe_dual.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.doubledual_text = context.add.text(text_x, idouble_pipe_dual.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.DOUBLELEFT:
            for (var i = 0; i < number; i++){
                idouble_pipe_left = context.add.sprite(x, y*11, 'DOUBLELEFT');
                idouble_pipe_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.doubleleft_text = context.add.text(text_x, idouble_pipe_left.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.DOUBLERIGHT:
            for (var i = 0; i < number; i++){
                idouble_pipe_right = context.add.sprite(x, y*13, 'DOUBLERIGHT');
                idouble_pipe_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.doubleright_text = context.add.text(text_x, idouble_pipe_right.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        case ObjectType.PURIFIER:
            for (var i = 0; i < number; i++){
                ipurifier = context.add.sprite(x, y*15, 'PURIFIER');
                ipurifier.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                count_texts.purifier_text = context.add.text(text_x, ipurifier.y, `Inventory count: ${AVAILABLE_OBJECTS[type]}`, style);
            }
            break;
        //MISSING: functionblock and functioncal
        default:
            console.log("INSIDE FUNCTION DEFAULT");
    }
    
}