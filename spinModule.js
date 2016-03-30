function SpinModule (reels){
	this.reels = reels;
	var me = this;

	this.reelsState = [ 'stopped','stopped','stopped'];

	this.ReelSpinStart = function(reelNumber, delay){
		setTimeout(function(){
			fireEvent('reelSpinStart', reelNumber);
			me[reelNumber] = 'spin';
		}, delay)
	};

	this.reelSpinStop = function(reelNumber, stopSym, delay){
		fireEvent('reelSpinStop', {
			reelNumber : reelNumber,
			stopSym    : stopSym
		}, delay)
	};

	this.spinStart = function(){
		me.ReelSpinStart(0, 50);
		me.ReelSpinStart(1, 550);
		me.ReelSpinStart(2, 950);
		setTimeout(function(){
			me.reelSpinStop(0, 4, 50);
			me.reelSpinStop(1, 4, 740);
			me.reelSpinStop(2, 5, 1250)
		}, 3000)
	}

/*	reelsStatethis.spinStart = function(){
		setTimeout(function(){
			fireEvent('reelSpinStart', 0);
			me.reelsState[0] = 'spin';
		} , 50);

		setTimeout(function(){
			fireEvent('reelSpinStart', 1);
			me.reelsState[0] = 'spin';
		} , 550);

		setTimeout(function(){
			fireEvent('reelSpinStart', 2);
		} , 950);

		setTimeout(function(){
			
			
			setTimeout(function(){
				fireEvent('reelSpinStop', {
					reelNumber : 0,
					stopSym : 4
				});
			} , 50);
			
			setTimeout(function(){
				fireEvent('reelSpinStop', {
					reelNumber : 1,
					stopSym : 4
				});
			} , 750);
			
			setTimeout(function(){
				fireEvent('reelSpinStop', {
					reelNumber : 2,
					stopSym : 4
				});
			} , 1250);
			
		} , 3000);
	};
*/
	//TODO: make some functionality - prevent code duplication / done

	this.stoppedReels = [];

	this.allReelsStopped = function(){
		var counter = 0;
		for (var i = 0; i < spinModule.stoppedReels.length; i++){
			counter = counter + 1;
		}
		if (counter == reels.length){
			fireEvent('allReelsStopped', 0);
			counter = 0;
			spinModule.stoppedReels.length = 0;
		}
	};

	this.update = function(){

	}
}

