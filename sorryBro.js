function SorryBro(x, y, width, height){
    var me = this;
    this.rootContiner = null;
    this.background = null;
    this.grayArea = null;
    this.title = null;
    this.content = null;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.button = null;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            background = new PIXI.Graphics(),
            grayArea = new PIXI.Graphics(),
            title = new PIXI.Text('OUT OF MONEY'),
            stillGotMoneyText = new PIXI.Text('Reduce your bet or deposit more money to continue playing'),
            noMoneyLeftText = new PIXI.Text('No money at all, only f5 will help here :/'),
            OKButton = new DefaultButton (
                {
                    textureActive : 'resources/numberHolder.png',
                    textureNotActive : 'resources/numberHolder.png',
                    width : 70,
                    height :50,
                    x : 200,
                    y : 250,
                    type : 'OkButton',
                    text : 'OK'
                }
            );

        rootContainer.position.set(me.x, me.y);
        rootContainer.visible = false;

        title.position.set(me.width/2, 35);
        title.anchor.set(0.5, 0.5);

        stillGotMoneyText.position.set(me.width/2, me.height/2);
        stillGotMoneyText.anchor.set(0.5, 0.5);
        stillGotMoneyText.style.font = 'bold 25px Arial';
        stillGotMoneyText.style.wordWrap = true;
        stillGotMoneyText.style.align = 'center';
        stillGotMoneyText.style.wordWrapWidth = me.width - me.width * 0.1;

        noMoneyLeftText.position.set(me.width/2, me.height/2);
        noMoneyLeftText.anchor.set(0.5, 0.5);
        noMoneyLeftText.style.font = 'bold 30px Arial';
        noMoneyLeftText.style.wordWrap = true;
        noMoneyLeftText.style.align = 'center';
        noMoneyLeftText.style.wordWrapWidth = me.width - me.width * 0.1;

        grayArea.beginFill(0x444444);
        grayArea.drawRect(-me.x, -me.y, screenWidth, screenHeight);
        grayArea.alpha = 0.5;
        grayArea.endFill();

        background.beginFill(0x444444);
        background.lineStyle(5, 0x999999);
        background.drawRoundedRect(0, 0, me.width, me.height,15);
        background.endFill();

        rootContainer.addChild(grayArea, background, title, stillGotMoneyText, noMoneyLeftText);

        OKButton.init(rootContainer);
        OKButton.setTextParams('bold 25px Arial', 'black', 'white', 2, false);
        OKButton.showTitle();
        OKButton.onMouseClickCallback = me.hide;

        mainContainer.addChild(rootContainer);

        me.button = OKButton;
        me.rootContainer = rootContainer;
        me.grayArea = grayArea;
        me.noMoneyLeftText = noMoneyLeftText;
        me.stillGotMoneyText = stillGotMoneyText;

    };

    me.show = function(balance){
        me.rootContainer.visible = true;
        if(balance > keyPad.betLevelSelector.min * keyPad.coinValueSelector.min * CONFIG.betlines.length){
            console.log(balance, keyPad.betLevelSelector.min * keyPad.coinValueSelector.min * CONFIG.betlines.length);
            me.noMoneyLeftText.visible = false;
            me.stillGotMoneyText.visible = true;
        }else{
            me.noMoneyLeftText.visible = true;
            me.stillGotMoneyText.visible = false;
        }
    };

    me.hide = function(){
        me.rootContainer.visible = false;
    };

    addListener('lowBalance', me.show);
}
