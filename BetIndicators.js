function BetIndicators (link1, link2, width, height, x, y, text){
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

BetIndicator.prototype.init = function(mainContainer){
    var rootContainer = new PIXI.Container(),
        betline1IndicatorButton = new Button(this.link1, this.link1, this.width, this.height, this.x, this.y, 'betlineIndicator'), //create many buttons and texts her
        textOnButton = new PIXI.Text(this.text);

    rootContainer.position.x = this.x;
    rootContainer.position.y = this.y;

    textOnButton.position.x = 0;
    textOnButton.position.y = 0;
    textOnButton.anchor.x = 0.5;
    textOnButton.anchor.y = 0.5;

    betline1IndicatorButton.onMouseHoverCallback = function(){  // do the same for all the buttons with for
        fireEvent('showBetline', 1);
    };


    betline1IndicatorButton.onMouseUnHoverCallback = function(){
        fireEvent('hideBetline', 1);
    };

    rootContainer.addChild(button, textOnButton);
    mainContainer.addChild(rootContainer);

}
/*

BetIndicator.prototype.onHover = function(params){

};

BetIndicator.prototype.onUnHover = function(params){

};*/
