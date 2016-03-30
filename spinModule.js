function SpinModule (reels){
	this.reels = reels;

	this.reelsState = [ 'stopped','stopped','stopped'];

	this.spinStart = function(){
		setTimeout(function(){
			fireEvent('reelSpinStart', 0);
			me.reelsState[0] = 'spin';
		} , 50);

		setTimeout(function(){
			fireEvent('reelSpinStart', 1);
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

	//TODO: make some functionality - prevent code duplication

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






/*var spinModule = {
			   spinStart : function(){
							setTimeout(function(){
								fireEvent('reelSpinStart', 0);
							} , 50);

							setTimeout(function(){
								fireEvent('reelSpinStart', 1);
							} , 550);

							setTimeout(function(){
								fireEvent('reelSpinStart', 2);
							} , 950);

							setTimeout(function(){
								
								
								setTimeout(function(){
									fireEvent('reelSpinStopping', 0);
								} , 50);
								
								setTimeout(function(){
									fireEvent('reelSpinStopping', 1);
								} , 750);
								
								setTimeout(function(){
									fireEvent('reelSpinStopping', 2);
								} , 1250);
								
							} , 1000);
						},
	   stoppedReels : [],
	allReelsStopped : function(){
							var counter = 0;
							for (var i = 0; i < spinModule.stoppedReels.length; i++){
								counter = counter + 1;
							}
							if (counter == reels.length){
								fireEvent('allReelsStopped', 0);
								counter = 0;
								spinModule.stoppedReels.length = 0;
							}
						}
};
*/