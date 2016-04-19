function DefaultSelector(params) {
    var me = this;
    this.rootContainer = null;
    this.numberBackGround = null;
    this.decreaseValueButton = null;
    this.increaseValueButton = null;
    this.selectorValue = null;
    this.bar = null;
    this.selectorTitle = null;

    this.x = params.x;
    this.y = params.y;
    this.min = params.min;
    this.max = params.max;
    this.width = params.width;
    this.height = params.height;
    this.step = params.step;
    this.value = params.defaultValue;
    this.title = params.title;
    this.oneStepValue = (me.width * 0.8)/(me.max + me.step - me.min);
    this.barWidth = (me.width * 0.8) *  (me.value + me.step - me.min) / (me.max + me.step - me.min);

    this.selectorType = params.type;

    this.init = function (mainContainer) {
        console.log(this.oneStepValue)
        var rootContainer = new PIXI.Container(),
            decreaseValueButton = new DefaultButton(
                {
                    textureActive : 'resources/decreaseValueButton.png',
                    textureNotActive : 'resources/decreaseValueButtonNotActive.png',
                    width : me.width / 4,
                    height : me.height,
                    x : me.width / 8,
                    y : me.height / 2,
                    type : 'decreaseValueButton'
                }
            ),
            increaseValueButton = new DefaultButton(
                {
                    textureActive : 'resources/increaseValueButton.png',
                    textureNotActive : 'resources/increaseValueButtonNotActive.png',
                    width : me.width / 4,
                    height : me.height,
                    x : me.width * 7 / 8,
                    y : me.height / 2,
                    type : 'increaseValueButton'
                }
            ),
        //numberBackGround = new PIXI.Sprite.fromImage( 'resources/bg.png'),
            selectorValue = new PIXI.Text(me.value),
            title = new PIXI.Text(me.title),
            bar = new SelectorBar(me.width * 0.1, me.height + 10, me.width * 0.8, 6, me.barWidth, me.min, me.max, me.step, me.selectorType);

        bar.onBarClick = me.onBarClick;

        fireEvent(me.selectorType + 'Changed', me.value);

        increaseValueButton.onMouseClickCallback = me.increaseSelectorValue;
        decreaseValueButton.onMouseClickCallback = me.decreaseSelectorValue;
        rootContainer.position.set(me.x, me.y);

        selectorValue.position.set(me.width / 2, me.height / 2);
        selectorValue.anchor.x = 0.5;
        selectorValue.anchor.y = 0.5;

        title.position.set(me.width / 2, -me.height*0.4);
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        title.style.font = 'bold 25px Arial';


        /*numberBackGround.width = me.width;
         numberBackGround.height = me.height;*/


        //rootContainer.addChild(numberBackGround);
        decreaseValueButton.init(rootContainer);
        increaseValueButton.init(rootContainer);
        bar.init(rootContainer);
        rootContainer.addChild(selectorValue, title);
        mainContainer.addChild(rootContainer);



        me.rootContainer = rootContainer;
        me.increaseValueButton = increaseValueButton;
        me.decreaseValueButton = decreaseValueButton;
        me.selectorValue = selectorValue;
        //this.numberBackGround = numberBackGround;
        me.bar = bar;
        me.selectorTitle = title;


        me.checkEnabled();
    };

    this.checkEnabled = function () {

        if (me.value == me.max) {
            me.increaseValueButton.setDisabledState();
            me.decreaseValueButton.setEnabledState();
        }
        else if (me.value == me.min){
            me.decreaseValueButton.setDisabledState();
            me.increaseValueButton.setEnabledState();
        } else {
            me.increaseValueButton.setEnabledState();
            me.decreaseValueButton.setEnabledState();
        }

    };

    this.setBarWidth = function () {
        me.barWidth = (me.width * 0.8) * (me.value + me.step - me.min) / (me.max + me.step - me.min)*10/10;
        me.bar.update(me.barWidth);
    };

    this.increaseSelectorValue = function () {
        me.setNewValue((me.value*10 + me.step*10)/10);

    };

    this.decreaseSelectorValue = function () {
        me.setNewValue((me.value*10 - me.step*10)/10);
    };

    this.setNewValue = function(newValue){
        me.value = newValue;
        if(newValue > me.max){
            me.value = me.max;
        }
        if(newValue < me.min){
            me.value = me.min;
        }
        me.selectorValue.text = me.value;
        fireEvent(me.selectorType + 'Changed', me.value);
        me.checkEnabled();
        me.setBarWidth();
    };

    this.onBarClicked = function(params){
        if(me.selectorType == params.selectorType){
            me.setNewValue(params.newValue);
            console.log(params.newValue)
        }
    };

    addListener('BarClicked', me.onBarClicked);
}
