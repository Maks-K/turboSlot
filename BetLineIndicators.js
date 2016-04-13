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
            betlineIndicatorButton.onMouseHoverCallback = showBetline(i);
            betlineIndicatorButton.onMouseUnHoverCallback = hideBetline(i);
            betlineIndicatorButton.init(rootContainer);
            betlineIndicatorButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
            //me.allIndicators.push(betlineIndicatorButton);
        }

        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;


        function showBetline(betlineNum){

            return function () {
                fireEvent('showBetline', betlineNum);
            }
        }

        function hideBetline(betlineNum){

            return function () {
                fireEvent('hideBetline', betlineNum);
            }
        }
    };
}

