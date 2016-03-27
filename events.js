var events = {
	spinStart 		 : [],
	reelSpinStart    : [],
	reelSpinStop 	 : [],
	reelSpinStopping : [],
	allReelsStopped  : []
};
function addListener(event, functionCallback){
	events[event].push(functionCallback);
};

function fireEvent(event, params){
	console.error(event, params);

	for(var i = 0; i < events[event].length; i++){
		events[event][i](params);
	}
};

addListener ('spinStart', function(params){
		spinModule.spinStart();
	}
)

addListener ('spinStart', function(params){
		spinStart.play();
	}
)

addListener ( 'allReelsStopped', function( params ){
		allReelsStopSound.play();
	}
);

addListener ( 'reelSpinStop', function( params ){
		reelStopSound.currentTime = 0;
		reelStopSound.play();
	}
)

