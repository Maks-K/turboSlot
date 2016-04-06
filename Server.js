function Server (){
    var me = this;

    var stopQueue = [
        {
            reelStopPos : [1,2,3],
            win : 200,
            winType : 'smallWin'
        },
        {
            reelStopPos : [2,3,4],
            win : 300,
            winType : 'mediumWin'
        },
        {
            reelStopPos : [4,5,6],
            win : 5000,
            winType : 'bigWin'
        },
        {
            reelStopPos : [5,6,7],
            win : 0,
            winType : 'noWin'
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
