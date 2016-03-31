function SpinModule (reels){
	this.reels = reels;
	var me = this;

	this.reelsState = [ 'stopped','stopped','stopped'];

	addListener('reelSpinStopped', function(params){
		me.reelsState[params] = 'stopped'
		console.log(me.reelsState);
	});

	this.reelSpinStart = function(reelNumber, delay){
		setTimeout(function(){
			fireEvent('reelSpinStart', reelNumber);
			me.reelsState[reelNumber] = 'spin';
		}, delay)
	};

	this.reelSpinStop = function(reelNumber, stopSym, delay){
		fireEvent('reelSpinStop', {
			reelNumber : reelNumber,
			stopSym    : stopSym
		}, delay)
	};

	this.spinStart = function(){
		me.reelSpinStart(0, 50);
		me.reelSpinStart(1, 550);
		me.reelSpinStart(2, 950);
		setTimeout(function(){
			me.reelSpinStop(0, 4, 50);
			me.reelSpinStop(1, 4, 740);
			me.reelSpinStop(2, 5, 1250)
		}, 3000)
	}
	//TODO: make some functionality - prevent code duplication / done


/*	this.allReelsStopped = function(){
		var counter = 0;
		for (var i = 0; i < spinModule.stoppedReels.length; i++){
			counter = counter + 1;
		}
		if (counter == reels.length){
			fireEvent('allReelsStopped', 0);
			counter = 0;
			spinModule.stoppedReels.length = 0;
		}
	};*/

	this.update = function(){

	}
}

