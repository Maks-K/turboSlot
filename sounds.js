var allReelsStopSound = new Audio('resources/allReelsStopSound.mp3'),
	reelStopSound = new Audio('resources/reelStopSound.mp3'),
	spinStart = new Audio('resources/spinStart.mp3'),
	buttonHoverSound = new Audio('resources/hover.mp3'),
	quickStopSound = new Audio('resources/quickStop.mp3');


addListener ('spinButtonClick', function(params){
		if(spinModule.nextAction == 'spinStart'){
			spinStart.play();
		}else if(spinModule.nextAction == 'quickStop'){
			quickStopSound.play();
		}
	}
);

addListener ('buttonHovered', function(params) {
		var buttonHoverSoundClone = buttonHoverSound.cloneNode();
		buttonHoverSoundClone.play();
	}
);

addListener ( 'allReelsStopped', function( params ){
	var allReelsStopSoundClone = allReelsStopSound.cloneNode();
	allReelsStopSoundClone.play();
	}
);

addListener ( 'reelSpinStopped', function( params ){
		var reelStopSoundClone = reelStopSound.cloneNode();
		reelStopSoundClone.play();
		//reelStopSound.play();
	}
);
