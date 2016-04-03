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
        me.reelsState[reelNumber] = 'stopping';

            console.log('me.isSpinning = ' +me.isSpinning)
            console.log('me.isStopping = ' +me.isStopping)

        fireEvent('reelSpinStop', {
            reelNumber: reelNumber,
            stopSym: stopSym
        }, delay);
    };

    this.allReelsStoppedTrigger = function(){
        var stopsCounter = 0;
        for (var i = 0; i < me.reelsState.length; i++){
            if(me.reelsState[i] == 'stopped'){
                stopsCounter++
            };
        }
        if (stopsCounter == me.reelsState.length) {
            me.isSpinning = false;
            fireEvent('allReelsStopped');
            stopsCounter = 0;
        }
    }


    this.isSpinning = false;
    this.isStopping = true;

    this.spinStart = function () {
        me.isSpinning = true;
        me.isStopping = false;

        me.reelSpinStart(0, 50);
        me.reelSpinStart(1, 550);
        me.reelSpinStart(2, 950);
        setTimeout(function () {
            if(!me.isStopping){
                me.reelSpinStop(0, me.lastResponse.reelStopPos[0], 0);
                me.isStopping = true;
            }
        }, 10000)
    };

    this.onReelSpinStopped = function (params) {
        me.reelsState[params] = 'stopped';

        fireEvent('reelSpinStop', {
            reelNumber: params + 1,
            stopSym: me.lastResponse.reelStopPos[params + 1]
        });

        //TODO make counter of 'stop's ! done in me.allReelsStoppedTrigger
        me.allReelsStoppedTrigger();
        console.log(me.reelsState);
    };

    this.onSpinButtonClick = function () {
        //console.log('Before is spinning ='+me.isSpinning+'\n'+'is stopping =' +me.isStopping);
        if (!me.isSpinning){
            fireEvent('ServerRequest', {action : 'spin'});
            me.spinStart();
            me.isSpinning = true;
            //console.log('me.isSpinning = ' +me.isSpinning+' the spin is starting')
        }else if(!me.isStopping && me.reelsState[0] == 'spin'){
            me.reelSpinStop(0, me.lastResponse.reelStopPos[0], 0);
            me.isStopping = true;
            //console.log('me.isStopping = ' +me.isStopping)
        }
        //console.log('After is spinning ='+me.isSpinning+'\n'+'is stopping =' +me.isStopping);
    };

    this.onServerResponse = function (response) {
          me.lastResponse = response;
    };

    addListener('reelSpinStopped', me.onReelSpinStopped);

    addListener ('SpinButtonClick', me.onSpinButtonClick);

    addListener ('ServerResponse', me.onServerResponse);
}

