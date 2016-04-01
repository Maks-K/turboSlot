function Server (){
    var me = this;

    var stopQueue = [

    ];

    this.onRequest = function (params) {

        //SOME MAGIC

        me.onResponse({
            reelStopPos : [1,2,3],
            win : 200,
            winType : 'smallWin'
        });

    };

     this.onResponse = function(response){

         fireEvent('ServerResponse', response);

     };


    addListener('ServerRequest', me.onRequest);
}