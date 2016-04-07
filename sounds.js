var allReelsStopSound = new Audio('resources/allReelsStopSound.mp3'),
	reelStopSound = new Audio('resources/reelStopSound.mp3'),
	spinStart = new Audio('resources/spinStart.mp3'),
	buttonHoverSound = new Audio('resources/hover.mp3');


addListener ('spinButtonClick', function(params){
		spinStart.play();
	}
);

addListener ('buttonStateChange', function(params){
		//if(params.newState == 'hovered'){
			var buttonHoverSoundClone = buttonHoverSound.cloneNode()
			buttonHoverSoundClone.play();
		//}
	}
);

addListener ( 'allReelsStopped', function( params ){
		allReelsStopSound.play();
	}
);

addListener ( 'reelSpinStopped', function( params ){
		var reelStopSoundClone = reelStopSound.cloneNode();
		reelStopSoundClone.play();
		//reelStopSound.play();
	}
);
