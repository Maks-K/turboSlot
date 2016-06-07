function Gamerules(x, y, width, height){
    var me = this;
    this.rootContainer = null;
    this.page1 = null;
    this.page2 = null;
    this.page3 = null;
    this.backGround = null;
    this.gamerulesLeftSelector = null;
    this.gamerulesRightSelector = null;
    this.page1Indicator = null;
    this.page2Indicator = null;
    this.page3Indicator = null;
    this.page4Indicator = null;
    this.page1Text = null;
    this.page2Text = null;
    this.page3Text = null;
    this.page4Text = null;
    this.texts = [];
    this.pages = [];
    this.pageIndicators = [];


    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            page1 = new PIXI.Container(),
            page2 = new PIXI.Container(),
            page3 = new PIXI.Container(),
            page4 = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            page1Text = new PIXI.Text('test'),
            page2Text = new PIXI.Text('test'),
            page3Text = new PIXI.Text('test'),
            page4Text = new PIXI.Text('test'),
            gamerulesLeftSelector = new DefaultButton(
                {
                    textureActive : 'resources/leftSelector.png',
                    textureNotActive : 'resources/leftSelector.png',
                    width : 70,
                    height :70,
                    x : 40,
                    y : 268,
                    type : 'gamerulesLeftSelector'
                }
            ),
            gamerulesRightSelector = new DefaultButton(
                {
                    textureActive : 'resources/rightSelector.png',
                    textureNotActive : 'resources/rightSelector.png',
                    width : 70,
                    height :70,
                    x : 730,
                    y : 268,
                    type : 'paytableRightSelector'
                }
            ),
            page1Indicator = new DefaultButton(
                {
                    textureActive : 'resources/pageIndicatorActive.png',
                    textureNotActive : 'resources/pageIndicatorNotActive.png',
                    width : 15,
                    height :15,
                    x : 325,
                    y : 475,
                    type : '1'
                }
            ),
            page2Indicator = new DefaultButton(
                {
                    textureActive : 'resources/pageIndicatorActive.png',
                    textureNotActive : 'resources/pageIndicatorNotActive.png',
                    width : 15,
                    height :15,
                    x : 375,
                    y : 475,
                    type : '2'
                }
            ),
            page3Indicator = new DefaultButton(
                {
                    textureActive : 'resources/pageIndicatorActive.png',
                    textureNotActive : 'resources/pageIndicatorNotActive.png',
                    width : 15,
                    height :15,
                    x : 425,
                    y : 475,
                    type : '3'
                }
            ),
            page4Indicator = new DefaultButton(
                {
                    textureActive : 'resources/pageIndicatorActive.png',
                    textureNotActive : 'resources/pageIndicatorNotActive.png',
                    width : 15,
                    height :15,
                    x : 475,
                    y : 475,
                    type : '4'
                }
            );


        rootContainer.position.set(me.x, me.y);
        rootContainer.visible = false;

        backGround.beginFill(0x632330);
        backGround.lineStyle(5, 0xFF1111);
        backGround.drawRoundedRect(0, 0, me.width, me.height, 45);
        backGround.endFill();

        me.texts.push(page1Text, page2Text, page3Text, page4Text);

        page1Text.position.set(130, 30);
        page1Text.text = 'WHERE BROOKLYN AT, WHERE BROOKLYN AT \n WHERE BROOKLYN AT, WHERE BROOKLYN AT\nWe gonna do it like this\nAnytime you\'re ready, check it\nI got seven Mack 11\'s, about eight 38\'s\nNine 9\'s, ten mack tens, the s***ts never ends\nYou can\'t touch my riches\n Even if you had MC Hammer and them 357 b****es';

        page2Text.position.set(130, 30);
        page2Text.text = 'Biggie Smalls; the millionare, the mansion, the yacht \nThe two weed spots, the two hot glocks\nThat\'s how I got the weed spot\nI shot dread in the head, took the bread and the lamb spread\nLittle Gotti got the shotty to your body\nSo don\'t resist, or you might miss Christmas\nI tote guns, I make number runs';

        page3Text.position.set(130, 30);
        page3Text.text = 'I give mc\'s the runs drippin\nwhen I throw my clip in the AK, I slay from far away\nEverybody hit the D-E-C-K\nMy slow flow\'s remarkable, peace to Matteo\nNow we smoke weed like Tony Montana sniffed the yeyo';
        page4Text.position.set(130, 30);
        page4Text.text = 'That\'s crazy blunts, mad L\'s\nMy voice excels from the avenue to jail cells\nOh my God, I\'m droppin s***t like a pigeon\nI hope you\'re listenin, smackin babies at they christening';


        for (var i = 0; i < me.texts.length; i++){
            me.texts[i].style.wordWrap = true;
            me.texts[i].style.wordWrapWidth = 560;
        }


        page1.addChild(page1Text);
        page2.addChild(page2Text);
        page3.addChild(page3Text);
        page4.addChild(page4Text);
        page2.visible = false;
        page3.visible = false;
        page4.visible = false;



        rootContainer.addChild(backGround, page1, page2, page3, page4);
        me.pages.push(page1, page2, page3, page4);
        me.pageIndicators.push(page1Indicator, page2Indicator, page3Indicator, page4Indicator);

        gamerulesLeftSelector.init(rootContainer);
        gamerulesRightSelector.init(rootContainer);

        for (var j = 0; j < me.pageIndicators.length; j++){
            me.pageIndicators[j].init(rootContainer);
            me.pageIndicators[j].onMouseClickCallback = me.onPageIndicatorClick.bind(this, j);
        }
        page1Indicator.setDisabledState();

        mainContainer.addChild(rootContainer);

        gamerulesLeftSelector.onMouseClickCallback = me.onLeftSelectorButtonClick;
        gamerulesRightSelector.onMouseClickCallback = me.onRightSelectorButtonClick;

        me.rootContainer = rootContainer;
        me.page1 = page1;
        me.page2= page2;
        me.page3= page3;
        me.page4= page4;
        me.backGround = backGround;


        me.page1Text = page1Text;
        me.page2Text = page2Text;
        me.page3Text = page3Text;
        me.page4Text = page4Text;

        me.gamerulesLeftSelector = gamerulesLeftSelector;
        me.gamerulesRightSelector = gamerulesRightSelector;

        me.page1Indicator = page1Indicator;
        me.page2Indicator = page2Indicator;
        me.page3Indicator = page3Indicator;
    };

    me.onGamerulesButtonButtonClick = function(){
        if(!me.rootContainer.visible){
            me.rootContainer.visible = true;
        } else if(me.rootContainer.visible){
            me.rootContainer.visible = false;
        }
    };

    me.onLeftSelectorButtonClick = function(){
        for(var i  = 0; i < me.pages.length; i++){
            if(me.pages[i].visible == true){
                me.pages[i].visible = false;
                me.pageIndicators[i].setEnabledState()
                if(i == 0){
                    me.pages[me.pages.length-1].visible = true;
                    me.pageIndicators[me.pages.length-1].setDisabledState()
                }else{
                    me.pages[i-1].visible = true;
                    me.pageIndicators[me.pages.length-1].setDisabledState()
                }
                return true;
            }
        }
    };

    me.onRightSelectorButtonClick = function(){
        for(var i  = 0; i < me.pages.length; i++){
            if(me.pages[i].visible == true){
                me.pages[i].visible = false;
                me.pageIndicators[i].setEnabledState()
                if(i == me.pages.length-1){
                    me.pages[0].visible = true;
                    me.pageIndicators[0].setDisabledState()
                }else{
                    me.pages[i+1].visible = true;
                    me.pageIndicators[i+1].setDisabledState()
                }
                return true;
            }
        }
    };
    me.onPageIndicatorClick = function(index){
        for(var i  = 0; i < me.pages.length; i++) {
            if(me.pageIndicators[i].buttonType == index + 1){
                me.pages[i].visible = true;
                me.pageIndicators[i].setDisabledState()
            }else{
                me.pages[i].visible = false;
                me.pageIndicators[i].setEnabledState()
            }
        }
    };
    me.hide = function(){
        me.rootContainer.visible = false;
    };

    addListener('gamerulesButtonButtonClick', me.onGamerulesButtonButtonClick);
    addListener('paytableButtonClick', me.hide);
    addListener('spinButtonClick', me.hide);
}
