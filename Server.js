function Server (){
    var me = this;

    me.betlevel = 5;
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

        me.onResponse(stopQueue[stopQueueCounter]);

        stopQueueCounter++;
        if(stopQueueCounter >= stopQueue.length){
            stopQueueCounter = 0;
        }
        me.generateOutcome();
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
                        console.log(SYMsToEdge);
                        SYMsToEdge--;
                    }
                };

                outcomesArray.push(reelOutcome);
                console.log(outcomesArray);
            }
        };

        this.generateReelStopPos(CONFIG);
        console.log(resp.reelStopPos);

        return resp;

    };





    me.onBetlevelChanged = function(newBetlevel){
        me.betlevel = newBetlevel;
        for (var i = 0; i < stopQueue.length; i++){
            if(me.oldBetlevel){
                stopQueue[i].win = stopQueue[i].win/me.oldBetlevel*me.betlevel;
            }else{
                stopQueue[i].win = stopQueue[i].win*me.betlevel;
            }
        }
        me.oldBetlevel = me.betlevel;
    };

     this.onResponse = function(response){

         fireEvent('ServerResponse', response);

     };


    addListener('ServerRequest', me.onRequest);
    addListener('betlevelChanged', me.onBetlevelChanged)
}
