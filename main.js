var config = {
    type: Phaser.AUTO,
    width: 743.75,
    height: 743.75,
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
var OFFSET = 21.875;
var CELL_WIDTH = 43.75;
 
function preload ()
{
    this.load.image('board', 'assets/grid.png');
    this.load.image('pipe', 'assets/pipe.png');
}
 
function create ()
{
 
    grid = create_grid(); // creates a 2D array of 16x16
 
    this.add.image(OFFSET, OFFSET, 'board').setOrigin(0,0); //set the origin of the image to the top-left and add the image to the scene
    var pipe = this.add.sprite(CELL_WIDTH, CELL_WIDTH, 'pipe').setInteractive();
    pipe.setScale(0.35); // resize the pipe to be the same height as a cell on the grid
    this.input.setDraggable(pipe);
 
    var previous_position; // previous position in pixels
    var previous_x; // previous x position in the 2D array
    var previous_y; // previous y position in the 2D array
 
    
    
    this.input.on('dragstart', function (pointer, gameObject, dropZone){
        //sets the starting grid block false
        //save the previous position in case the user drags the pipe to an occupied grid cell
        previous_position = [gameObject.x, gameObject.y];
        previous_x = (gameObject.x/CELL_WIDTH)-1;
        previous_y = (gameObject.y/CELL_WIDTH)-1;
        grid[previous_x][previous_y] = false;
    });
    
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, CELL_WIDTH);
        gameObject.y = Phaser.Math.Snap.To(dragY, CELL_WIDTH);
    });
 
    this.input.on('dragend', function(pointer, gameObject, dropZone) {
        var x = (gameObject.x/CELL_WIDTH)-1;
        var y = (gameObject.y/CELL_WIDTH)-1;
        
        if (grid[x][y] === true){
            //returns the pipe to its previous position
            gameObject.x = previous_position[0];
            gameObject.y = previous_position[1];
            console.log(previous_x, previous_y);
            grid[previous_x][previous_y] = true;
        }else{
            //sets the new grid position as true (i.e. occupied)
            grid[x][y] = true;
        }  
        
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
    var grid = new Array(16);
 
    for (var i = 0; i < grid.length; i++){
        grid[i] = new Array(16);
    }
 
    //NOTE: grid[x][y]
    return grid;
}


