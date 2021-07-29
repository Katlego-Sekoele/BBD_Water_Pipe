/*
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
*/


var LEVELS = {
	numberOFLevels:1,
	"1":{
		SOURCE:{y:2,x:4},
		END:{y:7,x:6},
		WATER_PURITY_LEVEL:1,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:5},
			{type:ObjectType.BENDRIGHT,quantity:10},
			{type:ObjectType.BENDLEFT,quantity:10},
		]
	},
	"2":{
	
	},
	"3":{
	
	}
}
