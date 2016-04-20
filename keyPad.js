function KeyPad(x, y, width, height){
    var me = this;
    this.rootContainer = null;
    this.backGround = null;
    this.coins = null;
    this.cash = null;
    this.paytableButton = null;
    this.gamerulesButton = null;
    this.maxBetButton = null;
    this.autoPlayButton = null;
    this.betLevelSelector = null;
    this.coinValueSelector = null;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            coins = new ValuesHolder(820,30,120,25,'100','coins'),
            cash = new ValuesHolder(820,90,120,25,'200','cash'),
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
            maxBetButton = new DefaultButton (
                {
                    textureActive : 'resources/squareButton.png',
                    textureNotActive : 'resources/squareButton.png',
                    width : 160,
                    height :70,
                    x : 550,
                    y : 70,
                    type : 'maxBetButton',
                    text : 'MAX BET'
                }
            ),
            autoPlayButton = new DefaultButton (
                {
                    textureActive : 'resources/squareButton.png',
                    textureNotActive : 'resources/squareButton.png',
                    width : 160,
                    height :70,
                    x : 720,
                    y : 70,
                    type : 'autoPlayButton',
                    text : 'AUTO PLAY'
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
        maxBetButton.init(rootContainer);
        autoPlayButton.init(rootContainer);
        coins.init(rootContainer);
        cash.init(rootContainer);
        betLevelSelector.init(rootContainer);
        coinValueSelector.init(rootContainer);

        paytableButton.textOnButton.visible = true;
        paytableButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
        gamerulesButton.textOnButton.visible = true;
        gamerulesButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
        maxBetButton.textOnButton.visible = true;
        maxBetButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);
        autoPlayButton.textOnButton.visible = true;
        autoPlayButton.setTextParams('bold 25px Arial', 'yellow', 'purple', 2, false);

        maxBetButton.condition = 'notPressed';
        maxBetButton.onMouseClickCallback = this.onMaxBetButtonClick;


            mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;
        me.backGround = backGround;
        me.coins = coins;
        me.cash = cash;
        me.paytableButton = paytableButton;
        me.gamerulesButton = gamerulesButton;
        me.betLevelSelector = betLevelSelector;
        me.coinValueSelector = coinValueSelector;
        me.maxBetButton = maxBetButton;
        me.autoPlayButton = autoPlayButton;
    }

    this.onMaxBetButtonClick = function(){
        if(this.condition == 'notPressed'){
            this.condition = 'pressed';
            me.betLevelSelector.setNewValue(me.betLevelSelector.max)
            betlineIndicators.onShowAllBetlineSituations();
        }else if(this.condition == 'pressed'){
            this.condition = 'notPressed';
            fireEvent('spinButtonClick');
        }
    }
}
