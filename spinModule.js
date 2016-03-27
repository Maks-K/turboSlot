function SpinModule (reels){
	this.reels = reels;
	this.spinStart = function(){
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
	}
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
		for(var j = 0; j < elements.length; j++){
			if (elements[j].state == 'stopping' && (j == 0 || elements[j-1].state == 'stopped')){
				//var distToSym = Math.abs(( elements[j].y ).toFixed( 0 ) - elements[j].stopY);
				if((elements[j].y).toFixed(0) == elements[j].stopY){
						fireEvent('reelSpinStop', elements[j].reelNumber)
						console.log('reelnNm ='+j+elements[j].state);
						continue;
				}
				if ( Math.abs(( elements[j].y ).toFixed( 0 ) - elements[j].stopY) < elements[j].step){
					elements[j].step = Math.abs(( elements[j].y ).toFixed( 0 ) - elements[j].stopY);
				};
			}
		};
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