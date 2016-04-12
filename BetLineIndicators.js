function BetLineIndicators (link1, link2, width, height, config) {
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
        var rootContainer = new PIXI.Container();
            for (var i = 0; i < this.config.length; i++){
            var betlineIndicatorButton = new Button(me.link1, me.link1, me.width, me.height, me.config[i].x, me.config[i].y, i),
            textOnButton = new PIXI.Text(me.config[i].betIndicatorNumber);
                textOnButton.position.x = me.config[i].x;
                textOnButton.position.y = me.config[i].y;
                textOnButton.anchor.x = 0.5;
                textOnButton.anchor.y = 0.5;
            betlineIndicatorButton.init(rootContainer);
            me.allIndicators.push(betlineIndicatorButton);
            me.allTexts.push(textOnButton);
        };


        rootContainer.position.x = 0;
        rootContainer.position.y = 0;

        console.log('test');
        for (var j = 0; j < me.allTexts.length; j++){
            rootContainer.addChild(me.allTexts[j]);
        }
        mainContainer.addChild(rootContainer);



        me.rootContainer = rootContainer;


/*        for (var k = 0; k < me.allIndicators.length; k++){  //what da hell?
            me.allIndicators[k].onMouseHoverCallback = function(){
                fireEvent('showBetline', k);
            };
            me.allIndicators[k].onMouseUnHoverCallback = function(){
                fireEvent('hideBetline', k);
            };
        }*/

        me.allIndicators[0].onMouseHoverCallback = function(){
                fireEvent('showBetline', 0);
        };
        me.allIndicators[1].onMouseHoverCallback = function(){
            fireEvent('showBetline', 1);
        };
        me.allIndicators[2].onMouseHoverCallback = function(){
            fireEvent('showBetline', 2);
        };

        me.allIndicators[0].onMouseUnHoverCallback = function(){
            fireEvent('hideBetline', 0);
        };
        me.allIndicators[1].onMouseUnHoverCallback = function(){
            fireEvent('hideBetline', 1);
        };
        me.allIndicators[2].onMouseUnHoverCallback = function(){
            fireEvent('hideBetline', 2);
        };


    };
}

