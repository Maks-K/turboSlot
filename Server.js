function Server (){
    var me = this;

    me.betlevel = keyPad.betLevelSelector.value;
    var stopQueue = [
        {
            reelStopPos : [4,6,7],
            winBetlines : [0],
            win : 200,
            winType : 'smallWin'
        },
        {
            reelStopPos : [5,7,8],
            win : 300,
            winType : 'mediumWin',
            winBetlines : [0, 1]
        },
        {
            reelStopPos : [0,0,0],
            win : 5000,
            winType : 'bigWin',
            winBetlines : [0, 1, 2]
        },
        {
            reelStopPos : [5,6,7],
            win : 0,
            winType : 'noWin',
            winBetlines : []
        }
    ];
    var stopQueueCounter = 0;
    this.onRequest = function (params) {//sends the stopQueueCounter response from the queue and updates counter (to 0, when necessary)
        //SOME MAGIC

/*        me.onResponse(stopQueue[stopQueueCounter]);

        stopQueueCounter++;
        if(stopQueueCounter >= stopQueue.length){
            stopQueueCounter = 0;
        }*/
        me.onResponse(me.generateOutcome());
    };

    this.generateOutcome = function(){
        var resp = {
            reelStopPos : [],
            winBetlines : [],
            win : 0,
            winType : ''
        };

        var outcomesArray = [];

        this.generateReelStopPos = function(config){
            for(var i = 0; i < config.reels.length; i++){
                var reelOutcome = [];
                var reelsetLength = config.reels[i].reelSet.length;
                var randomSym = Math.floor(Math.random()*reelsetLength);

                resp.reelStopPos.push(randomSym);

                reelOutcome.push(randomSym);

                if(reelsetLength - randomSym >= config.reelLength){

                    reelOutcome.push(randomSym + 1, randomSym + 2);

                }else if(reelsetLength - randomSym < config.reelLength){

                    var SYMsToEdge =  reelsetLength - randomSym-1; // symbols till the end of reel counter
                    for(var j = 0; j < config.reelLength-1; j++){

                        if (SYMsToEdge > 0){
                            reelOutcome.push(randomSym + j +1); //adds symbols till the reel ends
                        }
                        if (SYMsToEdge <= 0){
                            reelOutcome.push(Math.abs(SYMsToEdge)); //starts adding from the beginning after the reel ends
                        }
                        SYMsToEdge--;
                    }
                }

                outcomesArray.push(reelOutcome);
            }
        };

        this.generateReelStopPos(CONFIG);
        console.log(resp.reelStopPos);

        this.checkBetlines = function(betlines){
            for(var i = 0; i < betlines.length; i++){
                console.log('Betline ' + i+1 + ' ' + CONFIG.reels[0].reelSet[outcomesArray[0][betlines[i][0]]],
                            CONFIG.reels[1].reelSet[outcomesArray[1][betlines[i][1]]],
                            CONFIG.reels[2].reelSet[outcomesArray[2][betlines[i][2]]]);

                var firstReelPosition = outcomesArray[0][betlines[i][0]],
                    secondReelPosition = outcomesArray[1][betlines[i][1]],
                    thirdReelPosition = outcomesArray[2][betlines[i][2]];

                if( CONFIG.reels[0].reelSet[firstReelPosition]==
                    CONFIG.reels[1].reelSet[secondReelPosition] &&
                        CONFIG.reels[1].reelSet[secondReelPosition] ==
                        CONFIG.reels[2].reelSet[thirdReelPosition]
                ){
                    resp.winBetlines.push(i);
                    resp.win = resp.win + 10 * me.betlevel;
                    console.log('its a winning betline');
                }
            }
            console.log(resp.winBetlines);
            if(resp.win/me.betlevel > 0 && resp.win/me.betlevel <= 10){
                resp.winType = 'smallWin';
            }
            if(resp.win/me.betlevel > 10 && resp.win/me.betlevel <= 20){
                resp.winType = 'mediumWin';
            }
            if(resp.win/me.betlevel > 20){
                resp.winType = 'bigWin';
            }
        };

        this.checkBetlines(CONFIG.betlines);

        return resp;

    };





    me.onBetlevelChanged = function(newBetlevel){
        me.betlevel = newBetlevel;
/*        for (var i = 0; i < stopQueue.length; i++){
            if(me.oldBetlevel){
                stopQueue[i].win = stopQueue[i].win/me.oldBetlevel*me.betlevel;
            }else{
                stopQueue[i].win = stopQueue[i].win*me.betlevel;
            }
        }
        me.oldBetlevel = me.betlevel;*/
    };

     this.onResponse = function(response){

         fireEvent('ServerResponse', response);

     };


    addListener('ServerRequest', me.onRequest);
    addListener('betlevelChanged', me.onBetlevelChanged)
}
