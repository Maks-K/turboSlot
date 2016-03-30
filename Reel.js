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
            }
        }
    );

    addListener('reelSpinStop', function (params) {
            if (params.reelNumber == me.reelNumber) {

                me.stopPosition = params.stopSym;
                //TODO - refactor
                if (me.stopPosition == me.reelStrip.length) {
                    me.stopY = -(me.reelStrip.length * me.SymHeight).toFixed(0)
                } else {
                    me.stopY = -((me.reelStrip.length - me.stopPosition) * me.SymHeight).toFixed(0);
                }

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
        reelSetFake,
        reelSetReal = new ReelSet(0, this.reelStrip, this.width, this.SymHeight);
    reelSetReal.init(rootContainer);

    reelSetFake = new ReelSet(-this.y, this.reelStrip, this.width, this.SymHeight);
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


        //this.distToSym = Math.abs(( this.y ).toFixed(0) - this.stopY);
        //if ((this.y).toFixed(0) == this.stopY) {
        //
        //    fireEvent('reelSpinStopped', this.reelNumber);
        //
        //    return true;
        //}
        //if (this.distToSym < this.step) {
        //    this.step = this.distToSym;
        //}
    }

    if (this.y + this.step < 0) {
        this.y = this.y + this.step
    } else {
        this.y = -this.reelStrip.length * this.SymHeight;
    }
    this.drawNewPosition();
};