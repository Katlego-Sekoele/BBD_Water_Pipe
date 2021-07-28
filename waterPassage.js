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
	
	hasWater() {
		if (this.purity === 0)
			return false;
		return true;
	}
	getWaterPurity() {return this.purity;}
	getKind() {return this.kind;}
}
