function DefaultSelector(x, y, min, max, width, height, defaultValue, selectorType) {
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
    this.barWidth = (me.width * 0.8) * me.number / me.max;

    this.selectorType = selectorType;

    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            decreaseValueButton = new DefaultButton('resources/decreaseValueButton.png', 'resources/decreaseValueButtonNotActive.png', me.width / 4, me.height, me.width / 8, me.height / 2, 'decreaseValueButton'),
            increaseValueButton = new DefaultButton('resources/increaseValueButton.png', 'resources/increaseValueButtonNotActive.png', me.width / 4, me.height, me.width * 7 / 8, me.height / 2, 'increaseValueButton'),
        //numberBackGround = new PIXI.Sprite.fromImage( 'resources/bg.png'),
            selectorValue = new PIXI.Text(me.number),
            bar = new SelectorBar(me.width * 0.1, me.height + 10, me.width * 0.8, 6, me.barWidth);
        fireEvent(me.selectorType + 'Changed', me.number);

        increaseValueButton.onMouseClickCallback = me.increaseSelectorValue;
        decreaseValueButton.onMouseClickCallback = me.decreaseSelectorValue;
        rootContainer.position.set(me.x, me.y);

        selectorValue.position.set(me.width / 2, me.height / 2);
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



        this.rootContainer = rootContainer;
        this.increaseValueButton = increaseValueButton;
        this.decreaseValueButton = decreaseValueButton;
        this.selectorValue = selectorValue;
        //this.numberBackGround = numberBackGround;
        this.bar = bar;

        me.checkEnabled();
    };

    this.checkEnabled = function () {

        if (me.number == me.max) {
            me.increaseValueButton.setDisabledState();
            me.decreaseValueButton.setEnabledState();
        }
        else if (me.number == me.min){
            me.decreaseValueButton.setDisabledState();
            me.increaseValueButton.setEnabledState();
        } else {
            me.increaseValueButton.setEnabledState();
            me.decreaseValueButton.setEnabledState();
        }

    };

    this.setBarWidth = function () {
        me.barWidth = (me.width * 0.8) * me.number / me.max;
        me.bar.update(me.barWidth);
    };

    this.increaseSelectorValue = function () {
        me.setNewNumber(me.number + me.step);

    };

    this.decreaseSelectorValue = function () {
        me.setNewNumber(me.number - me.step);
    };

    this.setNewNumber = function(newNumber){
        me.number = newNumber;
        if(newNumber > me.max){
            me.number = me.max;
        }
        if(newNumber < me.min){
            me.number = me.min;
        }
        me.selectorValue.text = me.number;
        fireEvent(me.selectorType + 'Changed', me.number);
        me.checkEnabled();
        me.setBarWidth();

    };

}
