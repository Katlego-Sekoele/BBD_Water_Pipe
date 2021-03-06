var grid = create_grid();
var start_x;
var start_y;
class GameScene extends Phaser.Scene {

    OFFSET = 21.875;
    CELL_WIDTH = 43.75;
    RIGHTEDGE = 743.75;

    constructor(){
        super('GameScene');
    }

    preload (){
        this.load.image('board', 'assets/grid.png');
        this.load.image('run', 'assets/run.png');
        this.load.image('redo', 'assets/redo.png');
        this.load.image('info', 'assets/info.png');
        this.load.image('HowTo', 'assets/HowTo.png');

        this.load.image('SOURCE', 'assets/start.png');
        this.load.image('END', 'assets/end.png');

        this.load.image('PIPE', 'assets/pipe.png');
        this.load.image('BENDLEFT', 'assets/bend_left.png');
        this.load.image('BENDRIGHT', 'assets/bend_right.png');
        this.load.image('CHECKPIPE', 'assets/checkerpipe_clean.png');
        this.load.image('DOUBLEDUAL', 'assets/doublepipe_dual.png');
        this.load.image('DOUBLELEFT', 'assets/doublepipe_left.png');
        this.load.image('DOUBLERIGHT', 'assets/doublepipe_right.png');
        this.load.image('PURIFIER', 'assets/purify.png');
        this.load.image('FUNCTIONBLOCK', 'assets/function.png');
        this.load.image('FUNCTIONCALL', 'assets/functioncall.png');
        //console.log("GameScene starts");
    }
        
    create(){
        //grid background
    //grid = create_grid(); // creates a 2D array of 16x16
    this.add.image(OFFSET, OFFSET+CELL_WIDTH, 'board').setOrigin(0,0); //set the origin of the image to the top-left and add the image to the scene
    this.scene.launch('GameInfoScene');

    //level generation
    console.log(grid);
    generateLevel(this, CURRENT_LEVEL);

    //run button
    var runBtn = this.add.image(RIGHTEDGE-CELL_WIDTH,OFFSET, 'run').setOrigin(0,0);
    runBtn.setInteractive();
    runBtn.setScale(0.08);

    //redo button
    var redoBtn = this.add.image(RIGHTEDGE-CELL_WIDTH,OFFSET*2, 'redo').setOrigin(0,0);
    redoBtn.setInteractive();
    redoBtn.setScale(0.08);

    //info button
    var infoBtn = this.add.image(RIGHTEDGE-CELL_WIDTH, OFFSET*4, 'info').setOrigin(0,0);
    infoBtn.setInteractive();
    infoBtn.setScale(2);

    //How to
    var howTo = this.add.image(0, 0, 'HowTo').setOrigin(0,0).setVisible(false);

    var previous_position; // previous position of game object in pixels
    var previous_x; // previous x position of game object in the 2D array
    var previous_y; // previous y position of game object in the 2D array
    var drag_triggered = false;
    
    this.input.on('dragstart', function (pointer, gameObject, dropZone){
        drag_triggered = true;
        //sets the starting grid block to null
        //save the previous position in case the user drags the object to an occupied grid cell
        previous_position = [gameObject.x, gameObject.y];
        previous_x = (gameObject.x/CELL_WIDTH)-1;
        previous_y = (gameObject.y/CELL_WIDTH)-1;
        gameObject.angle += 90;
        grid[previous_y][previous_x] = null;
        
    });
    
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, CELL_WIDTH);
        gameObject.y = Phaser.Math.Snap.To(dragY, CELL_WIDTH);
    });
 
    this.input.on('dragend', function(pointer, gameObject, dropZone) {
        drag_triggered = false;
        let x = (gameObject.x/CELL_WIDTH)-1;
        let y = (gameObject.y/CELL_WIDTH)-1;
        let kind = getKind(gameObject);
        let direction = getDirection(gameObject.angle);
        console.log("GAME OBJECT Y IS: ",gameObject.y);
     

        if (y === 0 || gameObject.x < CELL_WIDTH || gameObject.x > 700 || gameObject.y > 750){
            gameObject.x = previous_position[0];
            gameObject.y = previous_position[1];
            grid[previous_y][previous_x] = new GameEntity(kind, 1, direction, {y: y, x: x});
        }else if (grid[y][x] != null){
            //returns the pipe to its previous position
            gameObject.x = previous_position[0];
            gameObject.y = previous_position[1];
            //console.log(previous_x, previous_y);
            grid[previous_y][previous_x] = new GameEntity(kind, 1, direction, {y: y, x: x});
        }else{
            //sets the new grid position as true (i.e. occupied)
            grid[y][x] = new GameEntity(kind, 1, direction, {y: y, x: x});
            
            if (previous_y === 0){
                AVAILABLE_OBJECTS[kind] -= 1;
                
                
            }
            
        } 
        let result = simulate(grid, {y: start_y, x: start_x});
        console.log(result.message)
        update_text(result);
        
    });
    
    this.input.on('gameobjectdown', function(pointer, gameObject){
        //rotates the pipe 90 degrees on click
        //FIX: the game rotates the object when the user drags, 
        if (gameObject.texture.key === 'info'){
            console.log("INFO CLICKED")
            howTo.setVisible(true)
            howTo.setInteractive();
            this.scene.sendToBack('GameInfoScene');
        }else if (gameObject.texture.key === 'HowTo'){
            //hide splash
            howTo.disableInteractive();
            howTo.setVisible(false);
        }
        else if (gameObject.texture.key === 'run'){
            let result = simulate(grid, {y: start_y, x: start_x});
            if (result.outcome && CURRENT_LEVEL === LEVELS.numberOFLevels-1){
                this.scene.start('WinScene');
            }else if (result.outcome){
                //move on to the next level
                CURRENT_LEVEL ++;
                //do some fancy animation
                //restart scene
                update_text(result);
                grid = create_grid();
                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.restart('GameScene') // restart current scene
            }
            alert(result.message);
            
        }else if (gameObject.texture.key === 'redo'){
            //redo current level
            grid = create_grid();
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene           
        };
        
         
    }, this);

    }



}

function create_grid(){
    var grid = new Array(17);
    var grid_width = 16;
 
    for (var i = 0; i < grid.length; i++){
        grid[i] = new Array(16);
    }

    // makes all elements null, makes first row elements true
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid_width; j++){
            if (i === 0){
                grid[i][j] = true;
            }else{
                grid[i][j] = null;
            }
            
        }
    }
 
    //NOTE: grid[y][x]
    return grid;
}


function create_sprites(context, number, type) {
    //generates sprites givent the number of sprites needed and the type of sprite needed
    switch(type) {
        case ObjectType.PIPE:
            for (var i = 0; i < number; i++){
                var pipe = context.add.sprite(CELL_WIDTH*ObjectType.PIPE, CELL_WIDTH, 'PIPE').setInteractive();
                pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(pipe);
                //partsGroup.add(pipe);
            }
            break;
        case ObjectType.BENDLEFT:
            for (var i = 0; i < number; i++){
                var bend_left = context.add.sprite(CELL_WIDTH*3, CELL_WIDTH, 'BENDLEFT').setInteractive();
                bend_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(bend_left);
                //partsGroup.add(bend_left);
            }
            break;
        case ObjectType.BENDRIGHT:
            for (var i = 0; i < number; i++){
                var bend_right = context.add.sprite(CELL_WIDTH*5, CELL_WIDTH, 'BENDRIGHT').setInteractive();
                bend_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(bend_right);
                //partsGroup.add(bend_right);
            }
            break;
        case ObjectType.CHECKPIPE:
            for (var i = 0; i < number; i++){
                var check_pipe = context.add.sprite(CELL_WIDTH*7, CELL_WIDTH, 'CHECKPIPE').setInteractive();
                check_pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(check_pipe);
                //partsGroup.add(check_pipe);
            }
            break;
        case ObjectType.DOUBLEDUAL:
            for (var i = 0; i < number; i++){
                var double_pipe_dual = context.add.sprite(CELL_WIDTH*9, CELL_WIDTH, 'DOUBLEDUAL').setInteractive();
                double_pipe_dual.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_dual);
                //partsGroup.add(double_pipe_dual);
            }
            break;
        case ObjectType.DOUBLELEFT:
            for (var i = 0; i < number; i++){
                var double_pipe_left = context.add.sprite(CELL_WIDTH*11, CELL_WIDTH, 'DOUBLELEFT').setInteractive();
                double_pipe_left.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_left);
                //partsGroup.add(double_pipe_left);
            }
            break;
        case ObjectType.DOUBLERIGHT:
            for (var i = 0; i < number; i++){
                var double_pipe_right = context.add.sprite(CELL_WIDTH*13, CELL_WIDTH, 'DOUBLERIGHT').setInteractive();
                double_pipe_right.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(double_pipe_right);
                //partsGroup.add(double_pipe_right);
            }
            break;
        case ObjectType.PURIFIER:
            for (var i = 0; i < number; i++){
                var purifier = context.add.sprite(CELL_WIDTH*15, CELL_WIDTH, 'PURIFIER').setInteractive();
                purifier.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
                context.input.setDraggable(purifier);
                //partsGroup.add(purifier);
            }
            break;
        //MISSING: functionblock and functioncal
        default:
          // code block
    }
    
}

function createImmovables(context, type, y, x, direction){
    var imageID = getImageID(type);
    var obj = context.add.sprite((x+1)*CELL_WIDTH, (y+1)*CELL_WIDTH, imageID);
    obj.angle = getAngle(direction);
    obj.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
    obj_x = (obj.x/CELL_WIDTH)-1;
    obj_y = (obj.y/CELL_WIDTH)-1;
    var obj_direction = direction;
    grid[obj_y][obj_x] = new GameEntity(type, PurityLevel.CLEAN, obj_direction, {y: obj_y, x: obj_x});
}

function getAngle(direction){
    switch (direction){
        case Direction.NORTH:
            return -90;
            break;
        case Direction.EAST:
            return 0;
            break;
        case Direction.SOUTH:
            return 90;
            break;
        case Direction.WEST:
            return -180;
            break;
        default:
            //
    }
}

function getImageID(type){
    switch (type){
        case ObjectType.SOURCE:
            return 'SOURCE';
            break;
        case ObjectType.PIPE:
            return 'PIPE';
            break;
        case ObjectType.BENDLEFT:
            return 'BENDLEFT';
            break;
        case ObjectType.BENDRIGHT:
            return 'BENDRIGHT';
            break;
        case ObjectType.CHECKPIPE:
            return 'CHECKPIPE';
            break;
        case ObjectType.DOUBLEDUAL:
            return'DOUBLEDUAL';
            break;
        case ObjectType.DOUBLELEFT:
            return 'DOUBLELEFT';
            break;
        case ObjectType.DOUBLERIGHT:
            return 'DOUBLERIGHT';
            break;
        case ObjectType.PURIFIER:
            return 'PURIFIER'
            break;
        case ObjectType.FUNCTIONBLOCK:
            return 'FUNCTIONBLOCK';
            break;
        case ObjectType.FUNCTIONCALL:
            return 'FUNCTIONCALL';
            break;
        case ObjectType.END:
            return 'END';
            break;
        default:
            //
    }
}


function generateLevel(context, current_level){
    
    var current_level_str = current_level + 1 + "";

    //var numLevels = LEVELS.numberOFLevels;
    var source_pos = LEVELS[current_level_str].SOURCE;
    var end_pos = LEVELS[current_level_str].END;
    var immovables = LEVELS[current_level_str].IMMOVABLES;
    var movables = LEVELS[current_level_str].MOVABLES;

    for (var i = 0; i < movables.length; i++){
        var key = LEVELS[current_level_str].MOVABLES[i].type;
        AVAILABLE_OBJECTS[key] = LEVELS[current_level_str].MOVABLES[i].quantity;
    } 

    //start
    //console.log(source_pos.x+1);
    var start = context.add.sprite((source_pos.x+1)*CELL_WIDTH, (source_pos.y+1)*CELL_WIDTH, 'SOURCE');
    start.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
     start_x = (start.x/CELL_WIDTH)-1;
     start_y = (start.y/CELL_WIDTH)-1;
    var start_kind = getKind(start);
    var start_direction = getDirection(start.angle);
    grid[start_y][start_x] = new GameEntity(start_kind, LEVELS[current_level_str].WATER_PURITY_LEVEL, start_direction, {y: start_y, x: start_x});

    //end
    var end = context.add.sprite((end_pos.x+1)*CELL_WIDTH, (end_pos.y+1)*CELL_WIDTH, 'END');
    end.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
    const end_x = (end.x/CELL_WIDTH)-1;
    const end_y = (end.y/CELL_WIDTH)-1;
    var end_kind = getKind(end);
    var end_direction = getDirection(start.angle);
    grid[end_y][end_x] = new GameEntity(end_kind, LEVELS[current_level_str].WATER_PURITY_LEVEL, start_direction, {y: end_y, x: end_x});

    //game pieces
    for (var i = 0; i < movables.length; i++){
        var type = movables[i].type;
        var quantity = movables[i].quantity;
        create_sprites(context, quantity, type);
    }

    //immovables
    for (var i = 0; i < immovables.length; i++){
        var type = immovables[i].type;
        var y = immovables[i].y;
        var x = immovables[i].x;
        var direction = immovables[i].direction;
        createImmovables(context, type, y, x, direction);
    }

    let result = simulate(grid, {y: start_y, x: start_x});
    update_text(result.outcome);

}

function getKind(gameObject) {
    switch (gameObject.texture.key){
        case 'SOURCE':
            return ObjectType.SOURCE;
            break;
        case 'END':
            return ObjectType.END;
            break;
        case 'PIPE':
            return ObjectType.PIPE;
            break;
        case 'CHECKPIPE':
            return ObjectType.CHECKPIPE
            break;
        case 'BENDLEFT':
            return ObjectType.BENDLEFT;
            break;
        case 'BENDRIGHT':
            return ObjectType.BENDRIGHT;
            break;
        case 'DOUBLEDUAL':
            return ObjectType.DOUBLEDUAL;
            break;
        case 'DOUBLELEFT':
            return ObjectType.DOUBLELEFT;
            break;
        case 'DOUBLERIGHT':
            return ObjectType.DOUBLERIGHT;
            break;
        case 'PURIFIER':
            return ObjectType.PURIFIER;
            break;
        case 'FUNCTIONBLOCK':
            return ObjectType.FUNCTIONBLOCK;
            break;
        case 'FUNCTIONCALL':
            return ObjectType.FUNCTIONCALL;
            break;
        case 'run':
            return -1;
            break;
        default:
            //
    }
}

function getDirection(angle){
    switch (angle){
        case -90:
            return Direction.NORTH;
        break;
        case 0:
            return Direction.EAST;
        break;
        case 90:
            return Direction.SOUTH;
        break;
        case -180:
            return Direction.WEST;
        break;
        default:
            return -3
    }
}