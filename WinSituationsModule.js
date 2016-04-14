function WinSituationsModule(){
    var me = this;
    this.latestResponse = {};

    this.init = function(mainContainer){};

    me.onServerResponse = function(response){
        me.latestResponse = response;
    };

    me.onAllReelsStopped = function(){    // shows winning betlines depending on the win outcome
        for(var i = 0; i < me.latestResponse.winBetlines.length; i++){
           console.log(me.latestResponse.winBetlines[i]);// --//--
           fireEvent('showBetline', me.latestResponse.winBetlines[i]);
           fireEvent('showBetlineIndicatorNumber', me.latestResponse.winBetlines[i]);
        }
    };

    me.onReelSpinStart = function(){    // hides all the betlines when the new spin starts
        fireEvent('hideAllBetlines');
        fireEvent('hideAllBetlineIndicators');
    };

    addListener('ServerResponse', me.onServerResponse);
    addListener('allReelsStopped', me.onAllReelsStopped);
    addListener ('reelSpinStart', me.onReelSpinStart);
}