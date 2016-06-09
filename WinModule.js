function WinModule (x, y){
	var me = this;

	this.rootContainer = null;
	this.smallWinPresentation = null;
	this.mediumWinPresentation = null;
	this.bigWinPresentation = null;
	this.winPresentationText = null;

	this.x = x;
	this.y = y;

	this.latestResponse = {};
	this.init = function(mainContainer){

		var rootContainer = new PIXI.Container(),
			smallWinPresentation = new PIXI.Graphics(),
			mediumWinPresentation = new PIXI.Graphics(),
			bigWinPresentation = new PIXI.Graphics(),
			winPresentationText = new PIXI.Text('test');

		rootContainer.position.x = me.x;
		rootContainer.position.y = me.y;

		smallWinPresentation.visible = false;
		smallWinPresentation.beginFill(0x99FFFF);
		smallWinPresentation.drawRoundedRect(-225, -100, 450, 200, 30);
		smallWinPresentation.drawRoundedRect(-100, -50, 200, 100, 30);
		smallWinPresentation.endFill;

		mediumWinPresentation.visible = false;
		mediumWinPresentation.beginFill(0x99FF00);
		mediumWinPresentation.drawRoundedRect(-225, -100, 450, 200, 30);
		mediumWinPresentation.endFill;

		bigWinPresentation.visible = false;
		bigWinPresentation.beginFill(0x330099);
		bigWinPresentation.drawRoundedRect(-225, -100, 450, 200, 30);
		bigWinPresentation.endFill;

		winPresentationText.visible = false;
		winPresentationText.position.x = 0;
		winPresentationText.position.y = 0;
		winPresentationText.anchor.x = 0.5;
		winPresentationText.anchor.y = 0.5;

		rootContainer.addChild(smallWinPresentation, mediumWinPresentation, bigWinPresentation, winPresentationText);
		mainContainer.addChild(rootContainer);

		me.rootContainer = rootContainer;
		me.smallWinPresentation = smallWinPresentation;
		me.mediumWinPresentation = mediumWinPresentation;
		me.bigWinPresentation = bigWinPresentation;
		me.winPresentationText = winPresentationText;
	};

	this.onServerResponse = function(response){
		me.latestResponse = response
	};

	this.displayWin = function(wintype, font, fontColor, strokeColor, strokeThickness, dropShadow){
		me[wintype].visible = true;
		me.winPresentationText.text = me.latestResponse.win;
		me.winPresentationText.visible = true;
		me.winPresentationText.style.font = font;
		me.winPresentationText.style.fill = fontColor;
		me.winPresentationText.style.stroke = strokeColor;
		me.winPresentationText.style.strokeThickness = strokeThickness;
		me.winPresentationText.style.dropShadow = dropShadow;
	};
	
	this.onAllReelsStopped = function(){
		if(me.latestResponse.winType == 'smallWin'){

			me.displayWin('smallWinPresentation', 'bold 40px Arial', 'black', 'purple', 2, false);

		}
		else if(me.latestResponse.winType == 'mediumWin'){
			
			me.displayWin('mediumWinPresentation', 'bold 80px Arial', 'white', 'green', 2, true);

		}
		else if(me.latestResponse.winType == 'bigWin'){
			
			me.displayWin('bigWinPresentation', 'bold 120px Arial', 0, 'yellow', 2, true);

		}
		me.stopTimerId = setTimeout(function () {
            console.log('setTimeout STOP');
			me.winPresentationFinished();
        },5000);
	};

	this.winPresentationFinished = function(){

		fireEvent('winPresentationFinished');
		fireEvent('hideAllBetlineSituations');

		me.hideWinBanners();
	};

	this.hideWinBanners = function () {
		clearTimeout(me.stopTimerId);
		me.smallWinPresentation.visible = false;
		me.mediumWinPresentation.visible = false;
		me.bigWinPresentation.visible = false;
		me.winPresentationText.visible = false;
	};

	this.onReelSpinStart = function(){
		me.hideWinBanners();
	};

addListener('ServerResponse', me.onServerResponse);
addListener('allReelsStopped', me.onAllReelsStopped);
addListener('autoPlayRoundFinished', me.onAllReelsStopped);
addListener ('reelSpinStart', me.onReelSpinStart);
}