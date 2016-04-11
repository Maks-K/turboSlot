function Betlines( betlinesConfig,link){
    var me = this;
    this.rootContainer = null;
    this.betlines = [];
    this.link = link;

    this.onShowBetline = function(betlineNum){
        me.betlines[betlineNum].visible=true;
    };

    this.onShowBetline = function(betlineNum){
        me.betlines[betlineNum].visible=true;
    };


    addListener('showBetline', me.onShowBetline);
    addListener('showBetline', me.onShowBetline)



}
Betlines.prototype.init = function ( mainContainer ) {
    var rootContainer = new PIXI.Container(),
        betlineTexture = new PIXI.Sprite.fromImage(this.link); //create many texture here

    rootContainer.position.x = this.x;
    rootContainer.position.y = this.y;
    rootContainer.visible = false;

    rootContainer.addChild(betlineTexture);
    mainContainer.addChild(rootContainer);

    this.rootContainer = rootContainer;
    this.betlineTexture = betlineTexture;

};


