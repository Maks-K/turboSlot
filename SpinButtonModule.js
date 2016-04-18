function SpinButtonModule(){
	var me = this;
	this.spinButton = null;

	this.init = function(mainStage){
		var spinButton = new DefaultButton (
			{
				textureActive : 'resources/BTN_Spin.png',
				textureNotActive : 'resources/BTN_Spin_d.png',
				width : 98,
				height :98,
				x : 873,
				y : 268,
				type : 'spinButton'
			}
		);
		spinButton.init(mainStage);

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
