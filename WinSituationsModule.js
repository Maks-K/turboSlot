function WinSituationsModule(){
    var me = this;
    this.betlines = [];
    this.betlinesIndicators = [];
    this.betline1 = null;
    this.betline2 = null;
    this.betline3 = null;
    this.betline1Indicator = null;
    this.betline2Indicator = null;
    this.betline3Indicator = null;
    this.betline1Num = null;
    this.betline2Num = null;
    this.betline3Num = null;

    this.latestResponse = {};

    this.init = function(mainContainer){
        var betline1 = new Betline(45,90,'resources/Bet_Line.png'),
            betline2 = new Betline(45,270,'resources/Bet_Line.png'),
            betline3 = new Betline(45,450,'resources/Bet_Line.png'),
            betline1Indicator = new Button('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 15, 15, 45, 97, 'betlineIndicator'),
            betline2Indicator = new Button('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 15, 15, 45,277, 'betline2Indicator'),
            betline3Indicator = new Button('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 15, 15, 45,457, 'betline3Indicator');

        betline1.init(mainContainer);
        betline2.init(mainContainer);
        betline3.init(mainContainer);
        betline1Indicator.init(mainContainer);
        betline2Indicator.init(mainContainer);
        betline3Indicator.init(mainContainer);

        me.betline1 = betline1;
        me.betline2 = betline2;
        me.betline3 = betline3;
        me.betline1Indicator = betline1Indicator;
        me.betline2Indicator = betline2Indicator;
        me.betline3Indicator = betline3Indicator;
        me.betlines.push(betline1, betline2, betline3);
        me.betlinesIndicators.push(betline1Indicator, betline2Indicator, betline3Indicator);


        this.onMouseClickCallback = function(){
            console.log('test');
        };

    };

    me.betIndicatorHovered = function(buttonType){
        for (var i = 0; i < me.betlinesIndicators.length; i++){
            if(me.betlinesIndicators[i].buttonType == buttonType){
                me.betlines[i].show();
            }
        }
    };

    me.betIndicatorUnHovered = function(buttonType){
        for (var i = 0; i < me.betlinesIndicators.length; i++){
            if(me.betlinesIndicators[i].buttonType == buttonType){
                me.betlines[i].hide();
            }
        }
    };

    me.onServerResponse = function(response){
        me.latestResponse = response;
    };

    me.onAllReelsStopped = function(){
        for(var i = 0; i < me.latestResponse.winBetlines.length; i++){
            if(me.latestResponse.winBetlines[i]){
                me.betlines[i].show();
            }
        }
    };
    me.onReelSpinStart = function(){
        for(var i = 0; i < me.betlines.length; i++){
            me.betlines[i].hide();
        };
    };

    addListener('buttonHovered', me.betIndicatorHovered);
    addListener('buttonUnHovered', me.betIndicatorUnHovered);
    addListener('ServerResponse', me.onServerResponse);
    addListener('allReelsStopped', me.onAllReelsStopped);
    addListener ('reelSpinStart', me.onReelSpinStart);
}