function BetLineIndicators(link1, link2, width, height, config) {
    var me = this;
    this.rootContainer = null;

    this.link1 = link1;
    this.link2 = link2;
    this.width = width;
    this.height = height;
    this.config = config;
/*    this.allIndicators = [];
    this.allTexts = [];*/

    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            i,
            betlineIndicatorButton;

        for (i = 0; i < this.config.length; i++) {

            betlineIndicatorButton = new DefaultButton(me.link1, me.link1, me.width, me.height, me.config[i].x, me.config[i].y, i, me.config[i].betIndicatorNumber);
            betlineIndicatorButton.onMouseHoverCallback = me.showBetline;
            betlineIndicatorButton.onMouseUnHoverCallback = me.hideBetline;
            betlineIndicatorButton.init(rootContainer);
            betlineIndicatorButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
            betlineIndicatorButton.hideTitle();
            betlineIndicatorButton.betlineNum = i;
        }



        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;

    };

    this.test = function () { //auxiliary function to show context
      console.log(this);
    };

    this.showBetline = function(){
        this.showTitle(); // will be executed from the betlineIndicatorButton context

        me.test(); // will be executed from the BetLineIndicators context, since me. is defined here already

        console.log(this.betlineNum);

        fireEvent('showBetline', this.betlineNum);
    };

    this.hideBetline = function(){
        this.hideTitle();
        fireEvent('hideBetline', this.betlineNum);
    };



}

