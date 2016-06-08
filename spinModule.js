function SpinModule(reels) {
    this.reels = reels;
    var me = this;
    var isAutoPlay = false;
    var autoplaySpinsLeft = 0;

    this.reelsState = ['stopped', 'stopped', 'stopped'];
    this.lastResponse = {};

    this.stopTimerId = 0;

    this.reelSpinStart = function (reelNumber) {
            fireEvent('reelSpinStart', reelNumber);
            me.reelsState[reelNumber] = 'spin';
    };

    this.reelSpinStop = function (reelNumber, stopSym) {

        me.reelsState[reelNumber] = 'stopping';

        fireEvent('reelSpinStop', {
            reelNumber: reelNumber,
            stopSym: stopSym
        });
    };

    this.checkAllReelsState = function(state){
        var stopsCounter = 0;
        for (var i = 0; i < me.reelsState.length; i++){
            if(me.reelsState[i] == state){
                stopsCounter++;
            }
        }

        return stopsCounter == me.reelsState.length;

    };


    this.isQuickStop = false;
    //this.isStopping = true;


    this.spinStart = function () {


        me.reelSpinStart(0);
        me.reelSpinStart(1);
        me.reelSpinStart(2);
        me.stopTimerId = setTimeout(function () {
            //console.log('setTimeout STOP');
            if(!me.isQuickStop){
                me.reelSpinStop(0, me.lastResponse.reelStopPos[0], 0);
            //    me.isStopping = true;
            }
        }, 3000);
    };

    this.onReelSpinStopped = function (reelNum) {
        me.reelsState[reelNum] = 'stopped';

        if(me.checkAllReelsState('stopped')){
            fireEvent('allReelsStopped');
            if(isAutoPlay){
                me.autoplayAnotherRound();
            }
        } else {

            fireEvent('reelSpinStop', {
                reelNumber: reelNum + 1,
                stopSym: me.lastResponse.reelStopPos[reelNum + 1]
            });

        }

        //console.log(me.reelsState);
    };
    this.nextAction = 'spinStart';
    this.onSpinButtonClick = function () {
        if (me.checkAllReelsState('stopped')){
            me.isQuickStop = false;
            fireEvent('ServerRequest', {action : 'spin'});
            me.spinStart();
            me.nextAction = 'quickStop';
        } else {

            if (me.reelsState[0] == 'spin'){
                clearTimeout(me.stopTimerId);
                me.isQuickStop = true;
                me.reelSpinStop(0, me.lastResponse.reelStopPos[0], 0);
                fireEvent('quickStopped');
                me.nextAction = 'spinStart';
            }

        }
    };

    this.onAutoplayStarted = function(spinsNum){
        if (me.checkAllReelsState('stopped')){
            isAutoPlay = true;
            autoplaySpinsLeft = spinsNum;
            fireEvent('ServerRequest', {action : 'spin'});
            me.spinStart();
            autoplaySpinsLeft--;
            console.log(autoplaySpinsLeft);
        }
    };

    this.autoplayAnotherRound = function(){
        if (me.checkAllReelsState('stopped') && autoplaySpinsLeft > 0){
            fireEvent('ServerRequest', {action : 'spin'});
            me.spinStart();
            autoplaySpinsLeft--;
            isAutoPlay = false;
            console.log(autoplaySpinsLeft);
        }
    };

    this.onServerResponse = function (response) {
          me.lastResponse = response;
    };

    addListener('reelSpinStopped', me.onReelSpinStopped);

    addListener ('spinButtonClick', me.onSpinButtonClick);

    addListener ('ServerResponse', me.onServerResponse);

    addListener('autoPlayStarted', me.onAutoplayStarted)

}

