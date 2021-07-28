// The object kinds 
const ObjectType = {
	SOURCE: 0,
	PIPE: 1,
	BENDLEFT: 2,
	BENDRIGHT: 3,
	CHECKPIPE: 4,
	DOUBLEDUAL: 5,
	DOUBLELEFT: 6,
	DOUBLERIGHT: 7,
	PURIFIER: 8,
	FUNCTIONBLOCK: 9,
	FUNCTIONCALL: 10,
	END: 11
}

// Directions
const Direction
{
	SOUTH: 1,
	NORTH: 2,
	EAST: 3,
	WEST: 4
}

// Water purity level
const PurityLevel = {
	CLEAN: 0,
	HIGH_POLLUTED: 1,
	MEDIUM_POLLUTED: 2,
	LOW_POLLUTED: 3
}

// For game objects  
class GameEntity
{
	constructor(kind, purity)
	{
		this.kind_ = kind;
		this.purity_ = purity;
		this.faceDirection_ = 
	}
	
	get hasCleanWater() {
		if (this.purity_ === 0)
			return false;
		return true;
	}
	
	set purityLevel(purity) {this.purity_ = purity}
	get purityLevel() {return this.purity_;}
	get kind {return this.kind_;}
}


function simulate(grid, currPos)
{	
	currObject = grid[currPos.row][currPos.col];
	
	// Checking if we have reached the destination
	// If it is the end, we return true if the water if clean and false otherwise
	if (currObject.type === ObjectType.END)
	{
		if (currObject.hasCleanWater)
			return {outcome:true, message:"Clean water is supplied."}
	}
	
	// Otherwise if it is not the end we move to the next position connected to by the current object
	connectedPos = outPos(currObject);
	
	// If the other end connects to nothing it's loss
	nextObect = grid[pos.row][pos.col];
	if (nextObject === null)
		result1 = {outcome:false, "Open line. Water is wasted."};
		
	// If the end do not connect right to the next object is a loss 
	if(!compatible(currObject, nextObject) )
		result2 = {outcome:false, "Blocked water passsage."}
	
	if (connectedPos.)
}
