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

    this.latestResponse = {};

    this.init = function(mainContainer){
        var betline1 = new Betline(45,90,'resources/Bet_Line.png'),
            betline2 = new Betline(45,270,'resources/Bet_Line.png'),
            betline3 = new Betline(45,450,'resources/Bet_Line.png'),
            betline1Indicator = new BetIndicator('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 15, 15, 45, 97, '1'),
            betline2Indicator = new BetIndicator('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 15, 15, 45,277, '2'),
            betline3Indicator = new BetIndicator('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 15, 15, 45,457, '3');

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

    };

    me.betIndicatorHovered = function(buttonType){     // highlights the selected betline
        for (var i = 0; i < me.betlinesIndicators.length; i++){
            if(me.betlinesIndicators[i].buttonType == buttonType){
                me.betlines[i].show();//fire event "show betline"
            }
        }
    };

    me.betIndicatorUnHovered = function(buttonType){     // hides the selected betline
        for (var i = 0; i < me.betlinesIndicators.length; i++){
            if(me.betlinesIndicators[i].buttonType == buttonType){
                me.betlines[i].hide(); // hide (event)
            }
        }
    };

    me.onServerResponse = function(response){
        me.latestResponse = response;
    };

    me.onAllReelsStopped = function(){    // shows winning betlines depending on the win outcome
        for(var i = 0; i < me.latestResponse.winBetlines.length; i++){
            if(me.latestResponse.winBetlines[i]){
                me.betlines[i].show(); // --//--
            }
        }
    };
    me.onReelSpinStart = function(){    // hides all the betlines when the new spin starts
        for(var i = 0; i < me.betlines.length; i++){
            me.betlines[i].hide(); //--//--
        };
    };

    addListener('buttonHovered', me.betIndicatorHovered);
    addListener('buttonUnHovered', me.betIndicatorUnHovered);
    addListener('ServerResponse', me.onServerResponse);
    addListener('allReelsStopped', me.onAllReelsStopped);
    addListener ('reelSpinStart', me.onReelSpinStart);
}