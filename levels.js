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
	numberOFLevels:3,
	"1":{
		SOURCE:{y:2,x:4},
		END:{y:6,x:6},
		WATER_PURITY_LEVEL:0,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:5},
			{type:ObjectType.BENDRIGHT,quantity:2},
			{type:ObjectType.BENDLEFT,quantity:2},
		]
	},
	"2":{
		SOURCE:{y:5,x:5},
		END:{y:9,x:8},
		WATER_PURITY_LEVEL:2,
		IMMOVABLES:[
			{type:ObjectType.CHECKPIPE, y: 5, x:6, direction: Direction.EAST}
		],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:2},
			{type:ObjectType.PIPE,quantity:5},
			{type:ObjectType.BENDRIGHT,quantity:4},
			{type:ObjectType.BENDLEFT,quantity:4},
		]
	
	},
	"3":{
		SOURCE:{y:7,x:7},
		END:{y:8,x:11},
		WATER_PURITY_LEVEL:3,
		IMMOVABLES:[
			{type:ObjectType.CHECKPIPE, y: 7, x:10, direction: Direction.WEST}
		],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:1},
			{type:ObjectType.PIPE,quantity:10},
			{type:ObjectType.BENDRIGHT,quantity:6},
			{type:ObjectType.BENDLEFT,quantity:6},
			{type:ObjectType.DOUBLELEFT,quantity:1},
			{type:ObjectType.DOUBLERIGHT,quantity:1},
			{type:ObjectType.DOUBLEDUAL,quantity:1},
		]
	
	}
}
