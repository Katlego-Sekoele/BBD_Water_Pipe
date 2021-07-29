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
		IMMOVABLES:[
			{type:ObjectType.CHECKPIPE, y: 2, x:5, direction: Direction.EAST}
		],
		MOVABLES:[
			{type:ObjectType.PIPE,quantity:10},
			{type:ObjectType.BENDRIGHT,quantity:10},
			{type:ObjectType.BENDLEFT,quantity:10},
			{type:ObjectType.DOUBLELEFT,quantity:3},
			{type:ObjectType.DOUBLERIGHT,quantity:3},
			{type:ObjectType.DOUBLEDUAL,quantity:5},
			{type: ObjectType.PURIFIER, quantity: 2}
		]
	},
	"2":{
		SOURCE:{y:2,x:4},
		END:{y:9,x:8},
		WATER_PURITY_LEVEL:1,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:2},
			{type:ObjectType.CHECKPIPE,quantity:3},
			{type:ObjectType.PIPE,quantity:10},
			{type:ObjectType.BENDRIGHT,quantity:15},
			{type:ObjectType.BENDLEFT,quantity:15},
			{type:ObjectType.BENDLEFT,quantity:15},
			{type:ObjectType.DOUBLELEFT,quantity:5},
			{type:ObjectType.DOUBLERIGHT,quantity:5},
			{type:ObjectType.DOUBLEDUAL,quantity:5}
			
		]
	
	},
	"3":{
		SOURCE:{y:2,x:4},
		END:{y:11,x:11},
		WATER_PURITY_LEVEL:3,
		IMMOVABLES:[],
		MOVABLES:[
			{type:ObjectType.PURIFIER,quantity:4},
			{type:ObjectType.CHECKPIPE,quantity:5},
			{type:ObjectType.PIPE,quantity:30},
			{type:ObjectType.BENDRIGHT,quantity:20},
			{type:ObjectType.BENDLEFT,quantity:20},
			{type:ObjectType.DOUBLELEFT,quantity:10},
			{type:ObjectType.DOUBLERIGHT,quantity:10},
			{type:ObjectType.DOUBLEDUAL,quantity:10},
		]
	
	}
}
