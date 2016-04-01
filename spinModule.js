function SpinModule(reels) {
    this.reels = reels;
    var me = this;

    this.reelsState = ['stopped', 'stopped', 'stopped'];
    this.lastResponse = {};

    this.reelSpinStart = function (reelNumber, delay) {
        setTimeout(function () {
            fireEvent('reelSpinStart', reelNumber);
            me.reelsState[reelNumber] = 'spin';
        }, delay);
    };

    this.reelSpinStop = function (reelNumber, stopSym, delay) {
        me.reelsState[params] = 'stopping';

        fireEvent('reelSpinStop', {
            reelNumber: reelNumber,
            stopSym: me.lastResponse.reelStopPos[reelNumber]
        }, delay);
    };



    this.spinStart = function () {
        me.reelSpinStart(0, 50);
        me.reelSpinStart(1, 550);
        me.reelSpinStart(2, 950);
        setTimeout(function () {
            me.reelSpinStop(0, 4, 50);
            /*me.reelSpinStop(1, 4, 740);
             me.reelSpinStop(2, 5, 1250)*/
        }, 3000)
    };

    this.onReelSpinStopped = function (params) {
        me.reelsState[params] = 'stopped';

        fireEvent('reelSpinStop', {
            reelNumber: params + 1,
            stopSym: 3
        });

        //TODO make counter of 'stop's !
        if (params == me.reelsState.length - 1) {
            fireEvent('allReelsStopped', 0);
        }

        console.log(me.reelsState);
    };

    this.onSpinButtonClick = function () {

        me.spinStart();

        fireEvent('ServerRequest', {action : 'spin'});

    };

    this.onServerResponse = function (response) {
          me.lastResponse = response;
        console.error('SERVERRESPONSE');
    };

    addListener('reelSpinStopped', me.onReelSpinStopped);

    addListener ('SpinButtonClick', me.onSpinButtonClick);

    addListener ('ServerResponse', me.onServerResponse);
}

