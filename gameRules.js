function GameRules(config){
    var me = this;
    this.rootContainer = null;
    this.backGround = null;
    this.paytableLeftSelector = null;
    this.paytableRightSelector = null;
    this.pagesContainers = [];
    this.pages = config.pages;
    this.pageIndicators = [];

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;

    this.indicatorsNum = this.pages.length;
    this.indicatorsWidth = 15;
    this.indicatorsOffset = 50;
    this.firstPageIndicatorOffsetX = (this.width - ((this.indicatorsNum - 1) * this.indicatorsOffset))/2;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            paytableLeftSelector = new DefaultButton(
                {
                    textureActive : 'resources/leftSelector.png',
                    textureNotActive : 'resources/leftSelector.png',
                    width : 70,
                    height :70,
                    x : 40,
                    y : 268,
                    type : 'paytableLeftSelector'
                }
            ),
            paytableRightSelector = new DefaultButton(
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
            i,
            j;
        for(i = 0; i < this.pages.length; i++){
            var container = new PIXI.Container();
            this.pagesContainers.push(container);

            var pageIndicator = new DefaultButton(
                {
                    textureActive : 'resources/pageIndicatorActive.png',
                    textureNotActive : 'resources/pageIndicatorNotActive.png',
                    width : this.indicatorsWidth,
                    height :15,
                    x : this.firstPageIndicatorOffsetX + i * this.indicatorsOffset,
                    y : 475,
                    type : i
                }
            );
            me.pageIndicators.push(pageIndicator);

            for(j = 0; j < this.pages[i].length; j++){
                if(this.pages[i][j].type == "img"){

                    var img = new PIXI.Sprite.fromImage(this.pages[i][j].content);
                    img.position.set(this.pages[i][j].x, this.pages[i][j].y);
                    img.width = this.pages[i][j].width;
                    img.height = this.pages[i][j].height;
                    this.pagesContainers[i].addChild(img);
                    console.log('imgAdded')

                } else if(this.pages[i][j].type == "text"){

                    var text  = new PIXI.Text(this.pages[i][j].content);
                    text.position.set(this.pages[i][j].x, this.pages[i][j].y);
                    text.style.wordWrap = true;
                    text.style.wordWrapWidth = this.pages[i][j].width;
                    text.style.align = 'center';
                    this.pagesContainers[i].addChild(text);
                }
            }
        }
        rootContainer.position.set(me.x, me.y);
        rootContainer.visible = false;

        backGround.beginFill(config.backGroundColor);
        backGround.lineStyle(5, 0xFF0000);
        backGround.drawRoundedRect(0, 0, me.width, me.height, 45);
        backGround.endFill();

        rootContainer.addChild(backGround);

        paytableLeftSelector.init(rootContainer);
        paytableRightSelector.init(rootContainer);

        for (j = 0; j < me.pageIndicators.length; j++){
            me.pageIndicators[j].init(rootContainer);
            me.pageIndicators[j].onMouseClickCallback = me.onPageIndicatorClick.bind(this, j);
        }

        me.pageIndicators[0].setDisabledState();

        for(i = 0; i < this.pages.length; i++){
            rootContainer.addChild(this.pagesContainers[i]);
            if(i !== 0){
                this.pagesContainers[i].visible = false
            }
        }

        mainContainer.addChild(rootContainer);

        paytableLeftSelector.onMouseClickCallback = me.onLeftSelectorButtonClick;
        paytableRightSelector.onMouseClickCallback = me.onRightSelectorButtonClick;

        me.rootContainer = rootContainer;

        me.backGround = backGround;

        me.paytableLeftSelector = paytableLeftSelector;
        me.paytableRightSelector = paytableRightSelector;

    };

    me.onGamerulesButtonClick = function(){
        if(!me.rootContainer.visible){
            me.rootContainer.visible = true;
        } else if(me.rootContainer.visible){
            me.rootContainer.visible = false;
        }
    };


    me.hide = function(){
        me.rootContainer.visible = false;
    };

    me.onLeftSelectorButtonClick = function(){
        for(var i  = 0; i < me.pages.length; i++){
            if(me.pagesContainers[i].visible == true){
                me.pagesContainers[i].visible = false;
                me.pageIndicators[i].setEnabledState();
                if(i == 0){
                    me.pagesContainers[me.pagesContainers.length-1].visible = true;
                    me.pageIndicators[me.pagesContainers.length-1].setDisabledState()
                }else{
                    me.pagesContainers[i-1].visible = true;
                    me.pageIndicators[i-1].setDisabledState()
                }
                return true;
            }
        }
    };
    me.onRightSelectorButtonClick = function(){
        for(var i  = 0; i < me.pages.length; i++){
            if(me.pagesContainers[i].visible == true){
                me.pagesContainers[i].visible = false;
                me.pageIndicators[i].setEnabledState();
                if(i == me.pagesContainers.length-1){
                    me.pagesContainers[0].visible = true;
                    me.pageIndicators[0].setDisabledState()
                }else{
                    me.pagesContainers[i+1].visible = true;
                    me.pageIndicators[i+1].setDisabledState()
                }
                return true;
            }
        }
    };
    me.onPageIndicatorClick = function(index){
        for(var i  = 0; i < me.pagesContainers.length; i++) {
            if(me.pageIndicators[i].buttonType == index){
                me.pagesContainers[i].visible = true;
                me.pageIndicators[i].setDisabledState()
            }else{
                me.pagesContainers[i].visible = false;
                me.pageIndicators[i].setEnabledState()
            }
        }
    };

    addListener('gamerulesButtonClick', me.onGamerulesButtonClick);
    addListener('paytableButtonClick', me.hide);
    addListener('spinButtonClick', me.hide);
    addListener('autoPlayStarted', me.hide);
}
