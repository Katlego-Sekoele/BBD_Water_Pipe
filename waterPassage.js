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

// Checks if two directions are opposite
function oppositeDirections(direction1, direction2)
{
	switch (direction1)
	{
		case Direction.NORTH:
			return Direction.SOUTH === direction2;
		case Direction.SOUTH:
			return Direction.NORTH === direction2;
		case Direction.EAST:
			return Direction.WEST === direction2;
		case Direction.WEST:
			return Direction.EAST === direction2;
		default:
			return true;
	}
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
		this.inGrid_ = GameEntity.getInGrid(kind, faceDirection);
	}
	
	// Checks if water in the object is clean
	get hasCleanWater() {
		if (this.purity_ === PurityLevel.CLEAN)
			return true;
		return false;
	}
	
	get inGrid(){return this.inGrid_;}
	get kind(){return this.kind_;}
	
	// Passes the water to an object 
	passWater(otherObject)
	{
		if (this.kind_ === ObjectType.PURIFIER)
			otherObject.purity = purifyWater(this.purity_);
		else
			otherObject.purity = this.purity_;
	}
	
	// Checks if there is a connection between this and another object, and it is valid
	connectsTo(nextObject)
	{
		for (let out of this.outPos())
		{
			console.log("A position");
			if (out.x === nextObject.position.x && out.y === nextObject.position.y && out.direction === nextObject.inGrid)
			{
				return true;
			}
		}
		
		return false;
	}
	
	// Return the out-end points of an object 
	outPos()
	{
		//outpos for SOURCE
		if (this.kind_ == ObjectType.SOURCE)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}

			//return[{}]
		}
		//outpos for PIPE
		if (this.kind_ === ObjectType.PIPE)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		//TODO: CHECK IF BENDLEFT AND BENDRIGHT PRODUCE THE CORRECT OUTPOS
		else if (this.kind_ == ObjectType.BENDLEFT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.BENDRIGHT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.CHECKPIPE)
		{
			if (this.hasCleanWater === true){
				switch (this.faceDirection_){
					case Direction.NORTH:
						return [{
							y: this.position_.y,
							x: this.position_.x-1,
							direction: this.faceDirection_
						}]
					break;
					case Direction.EAST:
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: this.faceDirection_
						}] 
					break;
					case Direction.SOUTH:
						return [{
							y: this.position_.y,
							x: this.position_.x+1,
							direction: this.faceDirection_
						}]
					break;
					case Direction.WEST:
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}]
					break;
					default:
						//
				}
			}else{
				switch (this.faceDirection_){
					case Direction.NORTH:
						return [{
							y: this.position_.y,
							x: this.position_.x+1,
							direction: this.faceDirection_
						}]
					break;
					case Direction.EAST:
						return [{
							y: this.position_.y-1,
							x: this.position_.x,
							direction: this.faceDirection_
						}] 
					break;
					case Direction.SOUTH:
						return [{
							y: this.position_.y,
							x: this.position_.x-1,
							direction: this.faceDirection_
						}]
					break;
					case Direction.WEST:
						return [{
							y: this.position_.y+1,
							x: this.position_.x,
							direction: this.faceDirection_
						}]
					break;
					default:
						//
				}

			}
		}
		else if (this.kind_ == ObjectType.DOUBLEDUAL)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					},
					{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: Direction.NORTH
					},
					{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: Direction.SOUTH
					}]
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					},
					{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: Direction.NORTH
					},
					{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: Direction.SOUTH
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.DOUBLELEFT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: Direction.NORTH
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: Direction.SOUTH
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.DOUBLERIGHT)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: Direction.EAST
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: Direction.SOUTH
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: Direction.WEST
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: Direction.NORTH
					}]
				break;
				default:
					//
			}
		}
		else if (this.kind_ == ObjectType.PURIFIER)
		{
			switch (this.faceDirection_){
				case Direction.NORTH:
					return [{
						y: this.position_.y-1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.EAST:
					return [{
						y: this.position_.y,
						x: this.position_.x+1,
						direction: this.faceDirection_
					}] 
				break;
				case Direction.SOUTH:
					return [{
						y: this.position_.y+1,
						x: this.position_.x,
						direction: this.faceDirection_
					}]
				break;
				case Direction.WEST:
					return [{
						y: this.position_.y,
						x: this.position_.x-1,
						direction: this.faceDirection_
					}]
				break;
				default:
					//
			}
		}
		//LATER
		else if (this.kind_ == ObjectType.FUNCTIONBLOCK)
		{
			return [{}]
		}
		else if (this.kind_ == ObjectType.FUNCTIONCALL)
		{
			return [{}]
		}
		else if (this.kind_ == ObjectType.FUNCTIONCALL)
		{
			return [{}]
		}
		else {
			console.log("Unrecognised type")
			return [];
		}
			
		
	}
	
	// Decides the direction in which the water will flow into an object
	static getInGrid(type, faceDirection)
	{
		switch (type)
		{
			case ObjectType.PIPE:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.BENDLEFT:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.EAST;
				else if (faceDirection === Direction.SOUTH)
					return Direction.WEST;
				else if (faceDirection === Direction.WEST)
					return Direction.NORTH;
				else if (faceDirection === Direction.EAST)
					return Direction.SOUTH;
			}
				break;
			case ObjectType.BENDRIGHT:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.WEST;
				else if (faceDirection === Direction.SOUTH)
					return Direction.EAST;
				else if (faceDirection === Direction.WEST)
					return Direction.SOUTH;
				else if (faceDirection === Direction.EAST)
					return Direction.NORTH;
			}
				break;
			case ObjectType.CHECKPIPE:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.DOUBLEDUAL:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.DOUBLELEFT:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.DOUBLERIGHT:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
			case ObjectType.PURIFIER:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;

			//Not yet implemented
			case ObjectType.FUNCTIONBLOCK:
			{
				if (faceDirection === Direction.NORTH)
					return null;
				else if (faceDirection === Direction.SOUTH)
					return null;
				else if (faceDirection === Direction.WEST)
					return null;
				else if (faceDirection === Direction.EAST)
					return null;
			}
				break;
			//Not yet implemented
			case ObjectType.FUNCTIONCALL:
			{
				if (faceDirection === Direction.NORTH)
					return null;
				else if (faceDirection === Direction.SOUTH)
					return null;
				else if (faceDirection === Direction.WEST)
					return null;
				else if (faceDirection === Direction.EAST)
					return null;
			}
				break;
			case ObjectType.END:
			{
				if (faceDirection === Direction.NORTH)
					return Direction.NORTH;
				else if (faceDirection === Direction.SOUTH)
					return Direction.SOUTH;
				else if (faceDirection === Direction.WEST)
					return Direction.WEST;
				else if (faceDirection === Direction.EAST)
					return Direction.EAST;
			}
				break;
	}
}
		
	get position () { return this.position_;}
}

// Checks if water from the given point reaches to the end CLEAN in all passages that connects the given point to the end
function simulate(grid, currPos)
{	console.log("Function runs", currPos);
	currObject = grid[currPos.y][currPos.x];
	console.log("CURRENT OBJECT IS ",currObject);
	// Checking if we have reached the destination
	// If it is the end, we return true if the water if clean and false otherwise
	if (currObject.kind === ObjectType.END)
	{
		console.log("line 671 runs");
		if (currObject.hasCleanWater)
			return {outcome:true, message:"Clean water is supplied."}
		else
			return {outcome:false, message:"Dirty water is supplied."}
	}
	
	// Otherwise if it is not the end we try move to the next position(s) connected to by the current object
	const connectedPos = currObject.outPos();
	
	let result; 
	for (let i = 0; i < connectedPos.length; i++)
	{ console.log("looking for connections");
		const nextPos = connectedPos[i];
		const nextObject = grid[nextPos.y][nextPos.x];
		
		// If the other end connects to nothing it is a loss
		if (nextObject === null)
			return {outcome:false, message:"Open line. Water is wasted."};
			
		// If an end cannot successfully connect with next object it is a loss 
		if(!currObject.connectsTo(nextObject))
			return {outcome:false, message:"Blocked water passsage."}
		
		// Pass water to the next object 
		currObject.passWater(nextObject);
		
		result = simulate(grid, nextPos);
		
		if (!result.outcome)
			return result;
	}
	
	return result;
}
