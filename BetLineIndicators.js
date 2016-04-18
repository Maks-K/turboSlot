function BetLineIndicators(link1, link2, width, height, config) {
    var me = this;
    this.rootContainer = null;

    this.link1 = link1;
    this.link2 = link2;
    this.width = width;
    this.height = height;
    this.config = config;
    this.betlinesIndicators = [];

    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            i,
            betlineIndicatorButton;

        for (i = 0; i < this.config.length; i++) {

            betlineIndicatorButton = new DefaultButton(
                {
                    textureActive : me.link1,
                    textureNotActive :  me.link1,
                    width : me.width,
                    height :me.height,
                    x : me.config[i].x,
                    y : me.config[i].y,
                    type : i,
                    text : me.config[i].betIndicatorNumber
                }
             );
            betlineIndicatorButton.onMouseHoverCallback = me.showBetline;
            betlineIndicatorButton.onMouseUnHoverCallback = me.hideBetline;
            betlineIndicatorButton.init(rootContainer);
            betlineIndicatorButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
            betlineIndicatorButton.hideTitle();
            betlineIndicatorButton.betlineNum = i;
            me.betlinesIndicators.push(betlineIndicatorButton);
        }



        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;

    };

    this.test = function () { //auxiliary function to show context
      //console.log(this);
    };

    this.showBetline = function(){
        this.showTitle(); // will be executed from the betlineIndicatorButton context

        me.test(); // will be executed from the BetLineIndicators context, since me. is defined here already

        //console.log(this);

        fireEvent('showBetline', this.betlineNum);
    };

    this.hideBetline = function(){
        this.hideTitle();
        fireEvent('hideBetline', this.betlineNum);
    };

    this.onShowBetlineSituation = function(betlineNum) {
        me.betlinesIndicators[betlineNum].showTitle();
        fireEvent('showBetline', betlineNum);
    };

    this.onHideAllBetlineSituations = function () {
        for (var i = 0; i < me.betlinesIndicators.length; i++){
            me.betlinesIndicators[i].hideTitle();
            fireEvent('hideBetline', i);
        }
    };

    addListener('showBetlineSituation', me.onShowBetlineSituation);
    addListener('hideAllBetlineSituations', me.onHideAllBetlineSituations);
}

