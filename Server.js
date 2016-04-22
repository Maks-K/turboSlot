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

    };

    this.generateOutcome = function(){
        var resp = {
            reelStopPos : [],
            winBetlines : [],
            win : 0,
            winType : ''
        };



        ///////


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
