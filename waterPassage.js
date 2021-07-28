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
const Direction = {
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

// Purifies the water
function purifyWater(level)
{
	switch (level)
	{
		case PurityLevel.CLEAN:
			return PurityLevel.CLEAN;
		case PurityLevel.LOW_POLLUTED:
			return PurityLevel.CLEAN;
		case PurityLevel.MEDIUM_POLLUTED:
			return PurityLevel.LOW_POLLUTED;
		case PurityLevel.HIGH_POLLUTED:
			return PurityLevel.MEDIUM_POLLUTED;
		default:
			return level;
	} 
}

// For game objects  
class GameEntity
{
	constructor(kind, purity, faceDirection)
	{
		this.kind_ = kind;
		this.purity_ = purity;
		this.faceDirection_  = faceDirection= 
	}
	
	get hasCleanWater() {
		if (this.purity_ === PurityLevel.CLEAN)
			return false;
		return true;
	}
	
	function passWater(otherObject)
	{
		if (this.type === ObjectType.PURIFIER)
			otherObject.purity = purifyWater(object1.purity - 1);
		else
			otherObject.purity = purity;
	}
	
	set purityLevel(purity) {this.purity_ = purity}
	get purityLevel() {return this.purity_;}
	get kind {return this.kind_;}
}

// Checks if water from the given point reaches to the end CLEAN in all passages that connects the given point to the end
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
	
	// Otherwise if it is not the end we try move to the next position(s) connected to by the current object
	const connectedPos = outPos(currObject);
	
	let result; 
	for (int i = 0; i < connectedPos.length; i++)
	{
		const nextPos = connectedPos[i];
		const nextObect = grid[nextPos.row][nextPos.col];
		
		// If the other end connects to nothing it is a loss
		if (nextObject === null)
			return {outcome:false, "Open line. Water is wasted."};
			
		// If an end cannot successfully connect with next object it is a loss 
		if(!validConnection(currObject, currPos, nextObject, nextPos))
			return {outcome:false, "Blocked water passsage."}
		
		result = simulate(grid, pos);
		if (!result.outcome)
			return result;
	}
	
	return result;
}

function validConnection()
{
}
