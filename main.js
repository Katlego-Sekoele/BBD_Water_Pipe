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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
 
var game = new Phaser.Game(config); 
 
function preload ()
{
    this.load.image('board', 'assets/grid.png');

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

}

var partsGroup;
 
function create ()
{
 
    //grid background
    grid = create_grid(); // creates a 2D array of 16x16
    this.add.image(OFFSET, OFFSET+CELL_WIDTH, 'board').setOrigin(0,0); //set the origin of the image to the top-left and add the image to the scene
    
    

    //TESTING SPRITE CREATION
    for (var i = 1; i < 9; i++){
        create_sprites(this, 10, i);// creates 
    }

    var previous_position; // previous position of game object in pixels
    var previous_x; // previous x position of game object in the 2D array
    var previous_y; // previous y position of game object in the 2D array
    
    this.input.on('dragstart', function (pointer, gameObject, dropZone){
        //sets the starting grid block to null
        //save the previous position in case the user drags the object to an occupied grid cell
        previous_position = [gameObject.x, gameObject.y];
        previous_x = (gameObject.x/CELL_WIDTH)-1;
        previous_y = (gameObject.y/CELL_WIDTH)-1;
        if (previous_y != 0){
            grid[previous_y][previous_x] = null;
        }
        
    });
    
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, CELL_WIDTH);
        gameObject.y = Phaser.Math.Snap.To(dragY, CELL_WIDTH);
    });
 
    this.input.on('dragend', function(pointer, gameObject, dropZone) {
        var x = (gameObject.x/CELL_WIDTH)-1;
        var y = (gameObject.y/CELL_WIDTH)-1;
        var kind = getKind(gameObject);
        var direction = getDirection(gameObject.angle);
        
        if (grid[y][x]){
            //returns the pipe to its previous position
            gameObject.x = previous_position[0];
            gameObject.y = previous_position[1];
            console.log(previous_x, previous_y);
            grid[previous_x][previous_y] = true;
        }else{
            //sets the new grid position as true (i.e. occupied)
            grid[y][x] = new GameEntity(kind, 1, direction, {y, x});
        } 
        
        //console.log(grid);
        //console.log(kind);
        //console.log(angle);

        
    });
 
    this.input.on('gameobjectdown', function(pointer, gameObject){
        //rotates the pipe 90 degrees on click
        //FIX: the game rotates the object when the user drags, 
        gameObject.angle += 90;
    });

    //"run" button
    var button = this.add.text(743.75-CELL_WIDTH,OFFSET, 'RUN!', {fil: '0B3'}).setOrigin(0,0);
    button.on('pointerdown', function(pointer) {
        button.setScale(1.1);
    });
    button.on('pointerup', function (pointer) {
        button.setScale(1);
    });
	
}
 
function update(){
 
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
        case 'BENDLEFT':
            return ObjectType.BENDLEFT;
            break;
        case 'BENDRIGHT':
            return ObjectType.BENDRIGHT;
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
        case 180:
            return Direction.WEST;
        break;
        default:
            //
    }
}