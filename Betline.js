function Betline(x, y, link, betlineNumber){
    var me = this;
    this.rootContainer = null;
    this.betlineTexture = null;
    this.x = x;
    this.y = y;
    this.link = link;
    this.betlineNumber = betlineNumber;


}
Betline.prototype.init = function ( mainContainer ) {
    var rootContainer = new PIXI.Container(),
        betlineTexture = new PIXI.Sprite.fromImage(this.link);

    rootContainer.position.x = this.x;
    rootContainer.position.y = this.y;
    rootContainer.visible = false;

    rootContainer.addChild(betlineTexture);
    mainContainer.addChild(rootContainer);

    this.rootContainer = rootContainer;
    this.betlineTexture = betlineTexture;

};

Betline.prototype.show = function(){
    this.rootContainer.visible = true;
};

Betline.prototype.hide = function(){
    this.rootContainer.visible = false;
}

