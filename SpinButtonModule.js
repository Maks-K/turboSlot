function SpinButtonModule(){
	var me = this;
	this.spinButton = null;

	this.init = function(mainStage){
		var spinButton = new Button ('resources/BTN_Spin.png', 'resources/BTN_Spin_d.png', 115, 115, 873, 268, 'spinButton')
		spinButton.init(stage);
		me.spinButton = spinButton;
	}



	this.onQuickStopped = function(){
		me.spinButton.setState('disabled');
		fireEvent('buttonStateChange', me.spinButton.buttonType)
	};
	
	this.onAllReelsStopped = function(){
		me.spinButton.setState('up');
		fireEvent('buttonStateChange', me.spinButton.buttonType)
	};

	addListener('quickStopped', me.onQuickStopped);
	addListener('allReelsStopped', me.onAllReelsStopped);
}