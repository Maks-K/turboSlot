function BetIndicators (link1, link2, width, height, x, y){
    var me = this;
    this.rootContainer = null;
    this.texture = null;
    this.text = null;
    this.link1 = link1;
    this.link2 = link2;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.text = text;


}

BetIndicators.prototype.init = function(mainContainer){
    var rootContainer = new PIXI.Container(),
        betline1IndicatorButton = new Button(this.link1, this.link1, this.width, this.height, this.x, this.y, 'betlineIndicator'), //create many buttons and texts her
        betline2IndicatorButton = new Button(this.link1, this.link1, this.width, this.height, this.x, this.y, 'betlineIndicator'), //create many buttons and texts her
        betline3IndicatorButton = new Button(this.link1, this.link1, this.width, this.height, this.x, this.y, 'betlineIndicator'), //create many buttons and texts her
        textOnButton1 = new PIXI.Text(this.text),
        textOnButton2 = new PIXI.Text(this.text),
        textOnButton3 = new PIXI.Text(this.text);

    rootContainer.position.x = this.x;
    rootContainer.position.y = this.y;

    textOnButton.position.x = 0;
    textOnButton.position.y = 0;
    textOnButton.anchor.x = 0.5;
    textOnButton.anchor.y = 0.5;

    betline1IndicatorButton.onMouseHoverCallback = function(){  // do the same for all the buttons with for
        //fireEvent('showBetline', 1);
    };


    betline1IndicatorButton.onMouseUnHoverCallback = function(){
        //fireEvent('hideBetline', 1);
    };

    rootContainer.addChild(betline1IndicatorButton, betline2IndicatorButton, betline3IndicatorButton);
    mainContainer.addChild(rootContainer);

};

