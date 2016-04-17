function DefaultSelector(x, y, min, max, width, height, defaultValue, selectorType){
    var me = this;
    this.rootContainer = null;
    this.numberBackGround = null;
    this.decreaseValueButton = null;
    this.increaseValueButton = null;
    this.selectorValue = null;
    this.bar = null;

    this.x = x;
    this.y = y;
    this.min = min;
    this.max = max;
    this.width = width;
    this.height = height;
    this.step = 1;
    this.number = defaultValue;
    this.barWidth = (me.width*0.8)*me.number/me.max;

    this.selectorType = selectorType;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            decreaseValueButton = new DefaultButton('resources/decreaseValueButton.png', 'resources/decreaseValueButtonNotActive.png', me.width/4, me.height, me.width/8, me.height/2, 'decreaseValueButton'),
            increaseValueButton = new DefaultButton('resources/increaseValueButton.png', 'resources/increaseValueButtonNotActive.png', me.width/4, me.height, me.width*7/8, me.height/2, 'increaseValueButton'),
            //numberBackGround = new PIXI.Sprite.fromImage( 'resources/bg.png'),
            selectorValue = new PIXI.Text(me.number),
            bar = new SelectorBar(me.width*0.1, me.height + 10, me.width*0.8, 6, me.barWidth);
            fireEvent(me.selectorType + 'Changed', me.number);

            increaseValueButton.onMouseClickCallback = me.increaseSelectorValue;
            decreaseValueButton.onMouseClickCallback = me.decreaseSelectorValue;
            rootContainer.position.set(me.x, me.y);
        selectorValue.position.set(me.width/2, me.height/2);
        selectorValue.anchor.x = 0.5;
        selectorValue.anchor.y = 0.5;

        /*numberBackGround.width = me.width;
        numberBackGround.height = me.height;*/



        //rootContainer.addChild(numberBackGround);
        decreaseValueButton.init(rootContainer);
        increaseValueButton.init(rootContainer);
        bar.init(rootContainer);
        rootContainer.addChild(selectorValue);
        mainContainer.addChild(rootContainer);

        if(me.number <= me.min){
            decreaseValueButton.setDisabledState()
        }else if(me.number >= me.max){
            increaseValueButton.setDisabledState()
        }

        this.rootContainer = rootContainer;
        this.increaseValueButton = increaseValueButton;
        this.decreaseValueButton = decreaseValueButton;
        this.selectorValue = selectorValue;
        //this.numberBackGround = numberBackGround;
        this.bar = bar;
    };

    this.checkEnabled = function(){
        if(me.number >= me.max){

            me.increaseValueButton.setDisabledState();
            me.decreaseValueButton.setEnabledState();

        }else if(me.number < me.max && me.number > me.min){

            me.increaseValueButton.setEnabledState();
            me.decreaseValueButton.setEnabledState();

        }else if(me.number <= me.min){

            me.increaseValueButton.setEnabledState();
            me.decreaseValueButton.setDisabledState();

        };
    };

    this.setBarWidth = function(){
        me.barWidth = (me.width*0.8)*me.number/me.max;
    };

    this.increaseSelectorValue = function(){
        me.number = me.number+ me.step;
        me.selectorValue.text = me.number;
        me.setBarWidth();
        me.bar.update(me.barWidth);
        fireEvent(me.selectorType + 'Changed', me.number);
        me.checkEnabled();
    };

    this.decreaseSelectorValue = function(){
        me.number = me.number - me.step;
        me.selectorValue.text = me.number;
        me.setBarWidth();
        me.bar.update(me.barWidth);
        fireEvent(me.selectorType + 'Changed', me.number);
        me.checkEnabled();
    }
};
