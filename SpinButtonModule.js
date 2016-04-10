function SpinButtonModule(){
	var me = this;
	this.spinButton = null;

	this.init = function(mainStage){
		var spinButton = new Button ('resources/BTN_Spin.png', 'resources/BTN_Spin_d.png', 115, 115, 873, 268, 'spinButton')
		spinButton.init(stage);

		spinButton.onMouseClickCallback = function () {
			me.onSpinButtonClick();

		};

		me.spinButton = spinButton;
	}

	this.onSpinButtonClick = function () {
		fireEvent('spinButtonClick');
	};

	this.onQuickStopped = function(){
		me.spinButton.setState('disabled');
	};
	
	this.onAllReelsStopped = function(){
		me.spinButton.setState('up');
	};

	addListener('quickStopped', me.onQuickStopped);
	addListener('allReelsStopped', me.onAllReelsStopped);
}
