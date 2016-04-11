function Betlines( betlinesConfig, link) {
    var me = this;
    this.rootContainer = null;
    this.betlines = [];
    this.betline1Texture = null;
    this.betline2Texture = null;
    this.betline3Texture = null;
    this.link = link;
    this.betlinesConfig = betlinesConfig;

    this.onShowBetline = function (betlineNum) {
        console.log(me.betlines[betlineNum]);
        console.log(me.betlines[betlineNum].visible);
        me.betlines[betlineNum].visible = true;
    };

    this.onHideBetline = function (betlineNum) {
        me.betlines[betlineNum].visible = true;
    };


      this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            betline1Texture = new PIXI.Sprite.fromImage(me.link), //create many textures here
            betline2Texture = new PIXI.Sprite.fromImage(me.link),
            betline3Texture = new PIXI.Sprite.fromImage(me.link);

        me.betlines.push(betline1Texture, betline2Texture, betline3Texture);

        rootContainer.position.x = 0;
        rootContainer.position.y = 0;

        for (var i = 0; i < me.betlines.length; i++) {
            me.betlines[i].x = me.betlinesConfig[i].x;
            me.betlines[i].y = me.betlinesConfig[i].y;
            me.betlines[i].visible = false;
        }
        ;

        rootContainer.addChild(betline1Texture, betline2Texture, betline3Texture);
        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
        this.betline1Texture = betline1Texture;
        this.betline2Texture = betline2Texture;
        this.betline3Texture = betline3Texture;


    };
    addListener('showBetline', me.onShowBetline);
    addListener('hideBetline', me.onHideBetline);
}


