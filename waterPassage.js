const ObjectType = {
	SOURCE: 0,
	REGULAR_PIPE: 1,
}

class gameEntity
{
	constructor(kind, purity)
	{
		this.kind = kind;
		this.purity = purity; 
	}
	
	function hasWater() {
		if (this.purity === 0)
			return false;
		return true;
	}
	function getWaterPurity() {return this.purity;}
	function getKind() {return this.kind;}
}
