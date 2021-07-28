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
	constructor(kind, purity, faceDirection, position)
	{
		this.kind_ = kind;
		this.purity_ = purity;
		this.faceDirection_  = faceDirection
		this.position_ = position;
		if ()
		{
		}
		this.inGrid = 
		this.outGrid = {{}}
	}
	
	// Checks if water in the object is clean
	get hasCleanWater() {
		if (this.purity_ === PurityLevel.CLEAN)
			return false;
		return true;
	}
	
	// Passes the water to an object 
	passWater(otherObject)
	{
		if (this.type === ObjectType.PURIFIER)
			otherObject.purity = purifyWater(purity_);
		else
			otherObject.purity = purity_;
	}
	
	// Checks if a connection between this and another object is valid
	connectsTo(nextObject)
	{
		this.outPos();
	}
	
	// Return the end points of an object 
	outPos()
	{
		if (type == ObjectType.SOURCE)
		{
			return[{}]
		}
		if (type === ObjectType.PIPE)
		{
			return [{}]
		}
		else if (type == ObjectType.BENDLEFT)
		{
			return [{}]
		}
		else if (type == ObjectType.BENDRIGHT)
		{
			return [{}]
		}
		else if (type == ObjectType.CHECKPIPE)
		{
			return [{}]
		}
		else if (type == ObjectType.DOUBLEDUAL)
		{
			return [{}]
		}
		else if (type == ObjectType.DOUBLELEFT)
		{
			return [{}]
		}
		else if (type == ObjectType.DOUBLERIGHT)
		{
			return [{}]
		}
		else if (type == ObjectType.PURIFIER)
		{
			return [{}]
		}
		else if (type == ObjectType.FUNCTIONBLOCK)
		{
			return [{}]
		}
		else if (type == ObjectType.FUNCTIONCALL)
		{
			return [{}]
		}
		else if (type == ObjectType.FUNCTIONCALL)
		{
			return [{}]
		}
		else 
			return [];
		
	}
	
	set purityLevel(purity) {this.purity_ = purity}
	get purityLevel() {return this.purity_;}
}

// Checks if water from the given point reaches to the end CLEAN in all passages that connects the given point to the end
function simulate(grid, currPos)
{	
	currObject = grid[currPos.y][currPos.x];
	
	// Checking if we have reached the destination
	// If it is the end, we return true if the water if clean and false otherwise
	if (currObject.type === ObjectType.END)
	{
		if (currObject.hasCleanWater)
			return {outcome:true, message:"Clean water is supplied."}
		else
			return {outcome:false, message:"Dirty water is supplied."}
	}
	
	// Otherwise if it is not the end we try move to the next position(s) connected to by the current object
	const connectedPos = outPos(currObject, currPos);
	
	let result; 
	for (const i = 0; i < connectedPos.length; i++)
	{
		const nextPos = connectedPos[i];
		const nextObect = grid[nextPos.y][nextPos.x];
		
		// If the other end connects to nothing it is a loss
		if (nextObject === null)
			return {outcome:false, message:"Open line. Water is wasted."};
			
		// If an end cannot successfully connect with next object it is a loss 
		if(!currObject.connectsTo(nextObject))
			return {outcome:false, message:"Blocked water passsage."}
		
		// Pass water to the next object 
		currObject.passWater(nextObect);
		
		result = simulate(grid, nextPos);
		
		if (!result.outcome)
			return result;
	}
	
	return result;
}
