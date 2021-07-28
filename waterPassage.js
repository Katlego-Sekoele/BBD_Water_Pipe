const ObjectType = {
	REGULAR_PIPE: 1,
}

class gameEntity
{
	constructor(purity, kind)
	{
		this.purityLevel = -1; // -1 means there is no water in the object
		this.kind = kind;
	}
	
	function hasWater() {return this.purity === -1;}
	function getWaterPurity() {return this.purity;}
	function getKind() {return this.kind;}
}
