function BetLineIndicators(link1, link2, width, height, config) {
    var me = this;
    this.rootContainer = null;

    this.link1 = link1;
    this.link2 = link2;
    this.width = width;
    this.height = height;
    this.config = config;
    this.allIndicators = [];
    this.allTexts = [];

    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            i,
            betlineIndicatorButton,
            textOnButton;

        for (i = 0; i < this.config.length; i++) {

            betlineIndicatorButton = new Button(me.link1, me.link1, me.width, me.height, me.config[i].x, me.config[i].y, i);
            textOnButton = new PIXI.Text(me.config[i].betIndicatorNumber);

            textOnButton.position.x = me.config[i].x;
            textOnButton.position.y = me.config[i].y;
            textOnButton.anchor.set(0.5);

            betlineIndicatorButton.onMouseHoverCallback = showBetline(i);

            betlineIndicatorButton.init(rootContainer);
            me.allIndicators.push(betlineIndicatorButton);
            me.allTexts.push(textOnButton);
            rootContainer.addChild(textOnButton);
        }

        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;


        function showBetline(betlineNum){

            return function () {
                //console.log(betlineNum);
                fireEvent('showBetline', betlineNum);
            }
        }



    };
}

