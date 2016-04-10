function Server (){
    var me = this;

    var stopQueue = [
        {
            reelStopPos : [4,6,7],
            win : 200,
            winType : 'smallWin',
            winBetlines : [1]
        },
        {
            reelStopPos : [5,7,8],
            win : 300,
            winType : 'mediumWin',
            winBetlines : [1, 3]
        },
        {
            reelStopPos : [0,0,0],
            win : 5000,
            winType : 'bigWin',
            winBetlines : [1, 2, 3]
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

        stopQueueCounter++
        if(stopQueueCounter >= stopQueue.length){
            stopQueueCounter = 0;
        }

    };

     this.onResponse = function(response){

         fireEvent('ServerResponse', response);

     };


    addListener('ServerRequest', me.onRequest);
}
