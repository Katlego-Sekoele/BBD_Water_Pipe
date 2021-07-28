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

    this.load.image('source', 'assets/start.png');
    this.load.image('end', 'assets/end.png');

    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('bend_left', 'assets/bend_left.png');
    this.load.image('bend_right', 'assets/bend_right.png');
    this.load.image('check_pipe', 'assets/checkerpipe_clean.png');
    this.load.image('double_pipe_dual', 'assets/doublepipe_dual.png');
    this.load.image('double_pipe_left', 'assets/doublepipe_left.png');
    this.load.image('double_pipe_right', 'assets/doublepipe_right.png');
    this.load.image('purifier', 'assets/purify.png');
    

}
 
function create ()
{
 
    grid = create_grid(); // creates a 2D array of 16x16
    this.add.image(OFFSET, OFFSET+CELL_WIDTH, 'board').setOrigin(0,0); //set the origin of the image to the top-left and add the image to the scene

    create_sprites(this, 10, ObjectType.REGULAR_PIPE);// creates 
 
    var previous_position; // previous position in pixels
    var previous_x; // previous x position in the 2D array
    var previous_y; // previous y position in the 2D array
    
    this.input.on('dragstart', function (pointer, gameObject, dropZone){
        //sets the starting grid block false
        //save the previous position in case the user drags the pipe to an occupied grid cell
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
        
        if (grid[y][x] === true){
            //returns the pipe to its previous position
            gameObject.x = previous_position[0];
            gameObject.y = previous_position[1];
            console.log(previous_x, previous_y);
            grid[previous_x][previous_y] = true;
        }else{
            //sets the new grid position as true (i.e. occupied)
            grid[y][x] = true;
        } 
        
        console.log(grid);
        
    });
 
    this.input.on('gameobjectdown', function(pointer, gameObject){
        //rotates the pipe 90 degrees on click
        //FIX: the game rotates the object when the user drags, 
        gameObject.angle += 90;
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
    if (type === ObjectType.REGULAR_PIPE){
        for (var i = 0; i < number; i++){
            var pipe = context.add.sprite(CELL_WIDTH, CELL_WIDTH, 'pipe').setInteractive();
            pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
            context.input.setDraggable(pipe);
        }
    }
    
}