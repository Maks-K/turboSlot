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
                this.firstSymStopPositionY = -(me.reelStrip.length * me.SymHeight)//.toFixed(0);
                this.symStopPositionY = -((me.reelStrip.length - me.stopPosition) * me.SymHeight)//.toFixed(0);

                //TODO - refactor / done as much as possible + comments added where needed
                if (me.stopPosition == me.reelStrip.length) { //condition of triggering the very first symbol on the reel
                    me.stopY = this.firstSymStopPositionY;
                } else {
                    me.stopY = this.symStopPositionY;
                }

                me.state = 'stopping';

            }
        }
    );



};

Reel.prototype.init = function (mainContainer) {
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
    var distToSym = 0;

    if (this.state == 'stopped') {
        return true;
    }

    if (this.state == 'stopping') {

        distToSym = this.stopY - this.y; //finding the distance between current y and y of needed symbol
        if (distToSym >= 0 && distToSym < this.step) {	// once the distanation symbol is reached,

            this.state = 'stopped';
            this.y += distToSym;

            fireEvent('reelSpinStopped', this.reelNumber); //the reel is stopped and the step value is restored to initial value and th function execution stops

        } else {
            this.y += this.step;
        }
    }

    if (this.state == 'moving') {

        this.y += this.step

    }


    if (this.y >= 0) {

        this.y = -this.reelStrip.length * this.SymHeight; //initial position, number of symbols multiplied by the symbol height

    }
    this.drawNewPosition();
};
 
