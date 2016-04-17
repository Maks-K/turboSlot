function SpinButtonModule(){
	var me = this;
	this.spinButton = null;

	this.init = function(mainStage){
		var spinButton = new DefaultButton ('resources/BTN_Spin.png', 'resources/BTN_Spin_d.png', 98, 98, 873, 268, 'spinButton')
		spinButton.init(stage);

		spinButton.onMouseClickCallback = function () {
			me.onSpinButtonClick();

		};

		me.spinButton = spinButton;
	};

	this.onSpinButtonClick = function () {
		fireEvent('spinButtonClick');
	};

	this.onQuickStopped = function(){
		me.spinButton.enabled = false;
	};
	
	this.onAllReelsStopped = function(){
		me.spinButton.setState('up');
		me.spinButton.enabled = true;
		me.spinButton.setEnabledState();
	};

	addListener('quickStopped', me.onQuickStopped);
	addListener('allReelsStopped', me.onAllReelsStopped);
}
