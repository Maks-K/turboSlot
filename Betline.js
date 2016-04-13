function Betlines( betlinesConfig, link) {
    var me = this;
    this.rootContainer = null;
    this.betlines = [];
    this.link = link;
    this.betlinesConfig = betlinesConfig;

     this.init = function (mainContainer) {
         console.log('instance created');
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
        };

        rootContainer.addChild(betline1Texture, betline2Texture, betline3Texture);
        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
    };

    this.onShowBetline = function (betlineNum) {
        me.betlines[betlineNum].visible = true;
    };

    this.onHideBetline = function (betlineNum) {
        me.betlines[betlineNum].visible = false;
    };
    this.onHideAllBetlines = function () {
        for (var j = 0; j < me.betlines.length; j++){
            me.betlines[j].visible = false;
        }
    };


    addListener('showBetline', me.onShowBetline);
    addListener('hideBetline', me.onHideBetline);
    addListener('hideAllBetlines', me.onHideAllBetlines);
}


