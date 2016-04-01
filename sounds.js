var allReelsStopSound = new Audio('resources/allReelsStopSound.mp3'),
	reelStopSound = new Audio('resources/reelStopSound.mp3'),
	spinStart = new Audio('resources/spinStart.mp3');

addListener ('spinStart', function(params){
		spinStart.play();
	}
);

addListener ( 'allReelsStopped', function( params ){
		allReelsStopSound.play();
	}
);

addListener ( 'reelSpinStopped', function( params ){
		var reelStopSoundClone = reelStopSound.cloneNode();
		reelStopSoundClone.play();
	}
);