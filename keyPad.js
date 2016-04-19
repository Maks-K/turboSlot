function KeyPad(x, y, width, height){
    var me = this;
    this.rootContainer = null;
    this.backGround = null;
    this.coins = null;
    this.cash = null;
    this.paytableButton = null;
    this.gamerulesButton = null;
    this.betLevelSelector = null;
    this.coinValueSelector = null;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            coins = new ValuesHolder(500,40,200,60,'100','coins'),
            cash = new ValuesHolder(720,40,200,60,'200','cash'),
            paytableButton = new DefaultButton (
                {
                    textureActive : 'resources/paytableGamerules.png',
                    textureNotActive : 'resources/paytableGamerules.png',
                    width : 40,
                    height :40,
                    x : 50,
                    y : 40,
                    type : 'paytableButton',
                    text : 'P'
                }
            ),
            gamerulesButton = new DefaultButton (
                {
                    textureActive : 'resources/paytableGamerules.png',
                    textureNotActive : 'resources/paytableGamerules.png',
                    width : 40,
                    height :40,
                    x : 50,
                    y : 90,
                    type : 'gamerulesButton',
                    text : 'i'
                }
            ),
            betLevelSelector = new DefaultSelector(
                {
                    x : 100,
                    y : 40,
                    min : -5,
                    max : 10,
                    step : 1,
                    width : 150,
                    height : 50,
                    defaultValue : 6,
                    type : 'betlevel',
                    title : 'LEVEL'
                }
            ),
            coinValueSelector = new DefaultSelector(
                {
                    x : 300,
                    y : 40,
                    min : 0.1,
                    max : 1,
                    step : 0.1,
                    width : 150,
                    height : 50,
                    defaultValue : 0.6,
                    type : 'coinValue',
                    title : 'COIN VALUE'
                }
            );

        rootContainer.position.set(me.x, me.y);

        backGround.beginFill(0xCC99FF);
        backGround.drawRect(0, 0, me.width, me.height);
        backGround.endFill();

        rootContainer.addChild(backGround);
        paytableButton.init(rootContainer);
        gamerulesButton.init(rootContainer);
        coins.init(rootContainer);
        cash.init(rootContainer);
        betLevelSelector.init(rootContainer);
        coinValueSelector.init(rootContainer);

        paytableButton.textOnButton.visible = true;
        paytableButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
        gamerulesButton.textOnButton.visible = true;
        gamerulesButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);

        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;
        me.backGround = backGround;
        me.coins = coins;
        me.cash = cash;
        me.paytableButton = paytableButton;
        me.gamerulesButton = gamerulesButton;
        me.betLevelSelector = betLevelSelector;
        me.coinValueSelector = coinValueSelector;
    }

}
