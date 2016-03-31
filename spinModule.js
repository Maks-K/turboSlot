function SpinModule (reels){
	this.reels = reels;
	var me = this;

	this.reelsState = [ 'stopped','stopped','stopped'];

	addListener('reelSpinStopped', function(params){
		me.reelsState[params] = 'stopped'
		fireEvent('reelSpinStop', {
			reelNumber : params+1,
			stopSym    : 3
		})
		if (params == me.reelsState.length - 1){
			fireEvent('allReelsStopped', 0);
		}
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
			/*me.reelSpinStop(1, 4, 740);
			me.reelSpinStop(2, 5, 1250)*/
		}, 3000)
	}
	//TODO: make some functionality - prevent code duplication / done

	this.update = function(){

	}
}

