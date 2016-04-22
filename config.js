var firstReel = {
	reelSet : ['SYM1', 'SYM6', 'SYM2', 'SYM3', 'SYM4', 'SYM5'],
	xOffset : 70
},
	secondReel = {
	reelSet : ['SYM1', 'SYM6', 'SYM2', 'SYM4', 'SYM1', 'SYM6', 'SYM5', 'SYM4'],
	xOffset : 82+230
},
	thirdReel = {
	reelSet : ['SYM1', 'SYM6', 'SYM2', 'SYM3', 'SYM2', 'SYM1', 'SYM3', 'SYM4', 'SYM5'],
	xOffset : 324+230
},
	fourthReel = {
	reelSet : ['SYM3', 'SYM4', 'SYM1', 'SYM2', 'SYM5', 'SYM6', 'SYM3', 'SYM4', 'SYM5'],
	xOffset : 480
},
	fifthReel = {
	reelSet : ['SYM4', 'SYM5', 'SYM6', 'SYM2', 'SYM1', 'SYM3'],
	xOffset : 640
};


var CONFIG = {
	reels : [firstReel, secondReel, thirdReel/*, fourthReel, fifthReel*/],
	betlineIndicators : [
		{ x : 45, y : 97, betIndicatorNumber : '1'},
		{ x : 45, y : 277, betIndicatorNumber : '2'},
		{ x : 45, y : 457, betIndicatorNumber : '3'}
	],
	betlinesCoords : [
		{ x : 45, y : 90},
		{ x : 45, y : 270},
		{ x : 45, y : 450}
	],
	betlines : [ [0,0,0], [1,1,1], [2,2,2]  ]
};