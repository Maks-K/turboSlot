function Reel(reelNumber, reelStrip, xOffset, stopPosition) {
    var me = this;
    this.rootContainer = null;
    this.reelStrip = reelStrip;
    this.width = 232;
    this.x = xOffset;
    this.SymHeight = this.width / 1.29;
    this.y = -reelStrip.length * this.SymHeight;
    this.step = 50;
    this.stepInit = 50;
    this.stopY = 0;
    this.reelNumber = reelNumber;
    this.state = 'stopped';


    //this.distToSym = Math.abs(( this.y ).toFixed( 0 ) - this.stopY);


    addListener('reelSpinStart', function (params) {
            if (params == me.reelNumber) {
                me.state = 'moving';
                //console.log(me.state, this.y)
            }
        }
    );
    addListener('reelSpinStop', function (params) {
            if (params.reelNumber == me.reelNumber) {

                me.stopPosition = params.stopSym;
                this.firstSymStopPositionY = -(me.reelStrip.length * me.SymHeight).toFixed(0);
    			this.symStopPositionY = -((me.reelStrip.length - me.stopPosition) * me.SymHeight).toFixed(0);

                //TODO - refactor / done as much as possible + comments added where needed
                if (me.stopPosition == me.reelStrip.length) { //condition of triggering the very virst symbol on the reel
                    me.stopY = this.firstSymStopPositionY;
                } else {
                    me.stopY = this.symStopPositionY;
                }
                //console.log('reelnumber '+me.reelNumber+'  stop position' + me.stopPosition+'  stop y ' +me.stopY)
                me.state = 'stopping';

            }
        }
    );

    //addListener('reelSpinStop', function(params){
    //		if (params == me.reelNumber){
    //			me.state = 'stopped';
    //			spinModule.stoppedReels.push(me.state);
    //			spinModule.allReelsStopped();
    //			me.step = me.stepInit;
    //		}
    //	}
    //);
};

Reel.prototype.init = function (mainContainer) {
    console.log(this.stopPosition);
    var rootContainer = new PIXI.Container(),
        reelSetReal = new ReelSet(0, this.reelStrip, this.width, this.SymHeight),
        reelSetFake = new ReelSet(-this.y, this.reelStrip, this.width, this.SymHeight);
    reelSetReal.init(rootContainer);
    reelSetFake.init(rootContainer);

    rootContainer.position.x = this.x;
    rootContainer.position.y = this.y;

    mainContainer.addChild(rootContainer);

    this.rootContainer = rootContainer;
    this.reelSetReal = reelSetReal;
    this.reelSetFake = reelSetFake;

};

Reel.prototype.drawNewPosition = function () {
    this.rootContainer.position.y = this.y;
};

Reel.prototype.update = function () {
    if (this.state == 'stopped') {
        return true;
    }


    if (this.state == 'stopping') {

    	this.distToSym = Math.abs(( this.y ).toFixed(0) - this.stopY); //finding the distance between current y and y of needed symbol
        
        if ((this.y).toFixed(0) == this.stopY) {	// once the distanation symbol is reached,
        
            this.state = 'stopped';			//the reel is stopped
            this.step = this.stepInit;		//the step value is restored to initial value and th function execution stops
        
            return true;					
        }
        if (this.distToSym < this.step) {	// in case the distance to needed symbol is less then the initial step,
            this.step = this.distToSym;		// the step value is changed to be equal to this distance, for the animation not to 'pass by'
        }
    }
    if (this.state === 'moving') {
        console.log(this.y, this.reelNumber)
    }
    if (this.y + this.step < 0) { 
        this.y = this.y + this.step
    } else {
        this.y = -this.reelStrip.length * this.SymHeight; //initial position, number of symbols multiplied by the symbol height
    }
    this.drawNewPosition();
};
 
