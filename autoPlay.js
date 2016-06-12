function AutoPlay (x, y, width, height){
    var me = this;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rootContainer = null;
    this.notStartedContainer = null;
    this.startedContainer = null;
    this.background = null;
    this.title = null;
    this.button10 = null;
    this.button50 = null;
    this.button100 = null;
    this.roundsCounter = null;
    this.roundsCounterBackground = null;
    this.activeAutoplayTitle = null;
    this.stopButton = null;
    this.buttons = [];


    this.init = function (mainContainer){
        var rootContainer = new PIXI.Container(),
            notStartedContainer = new PIXI.Container(),
            startedContainer = new PIXI.Container(),
            background = new PIXI.Graphics(),
            title = new PIXI.Text('AUTOPLAY OPTIONS'),
            button10 = new DefaultButton(
                {
                    textureActive : 'resources/numberHolder.png',
                    textureNotActive : 'resources/numberHolder.png',
                    width : 75,
                    height :75,
                    x : 100,
                    y : 150,
                    type : '3',
                    text : '3'
                }
            ),
            button50 = new DefaultButton(
                {
                    textureActive : 'resources/numberHolder.png',
                    textureNotActive : 'resources/numberHolder.png',
                    width : 75,
                    height :75,
                    x : 200,
                    y : 150,
                    type : '5',
                    text : '5'
                }
            ),
            button100 = new DefaultButton(
                {
                    textureActive : 'resources/numberHolder.png',
                    textureNotActive : 'resources/numberHolder.png',
                    width : 75,
                    height :75,
                    x : 300,
                    y : 150,
                    type : '100',
                    text : '100'
                }
            ),
            roundsCounter = new PIXI.Text('test'),
            roundsCounterBackground = new PIXI.Graphics(),
            activeAutoplayTitle = new PIXI.Text('ROUNDS LEFT:'),
            stopButton = new DefaultButton(
                {
                    textureActive : 'resources/numberHolder.png',
                    textureNotActive : 'resources/numberHolder.png',
                    width : 125,
                    height :75,
                    x : 325,
                    y : 200,
                    type : 'STOP',
                    text : 'STOP'
                }
            );

        rootContainer.position.set(this.x, this.y);
        rootContainer.visible = false;


        background.beginFill(0x444444);
        background.lineStyle(5, 0x999999);
        background.drawRoundedRect(0, 0, me.width, me.height,15);
        background.endFill();

        title.position.set(this.width/2, 35);
        title.anchor.set(0.5);
        title.style.fill = 'white';

        notStartedContainer.addChild(title);

        this.buttons.push(button10, button50, button100);
        for(var i = 0; i < this.buttons.length; i++){
            this.buttons[i].init(notStartedContainer);
            this.buttons[i].showTitle();
            this.buttons[i].onMouseClickCallback = me.onAutoplayOptionSelected.bind(this.buttons[i]);
        }

        rootContainer.addChild(background, notStartedContainer);

        roundsCounter.position.set(200, 115);
        roundsCounter.anchor.set(0.5, 0.5);
        roundsCounter.style.fill = 'white';
        roundsCounterBackground.beginFill(0x111111);
        roundsCounterBackground.drawRect(150, 75, 100, 75);
        roundsCounterBackground.endFill();
        activeAutoplayTitle.position.set(this.width/2, 35);
        activeAutoplayTitle.anchor.set(0.5);
        activeAutoplayTitle.style.fill = 'white';
        startedContainer.addChild(roundsCounterBackground, roundsCounter, activeAutoplayTitle);
        stopButton.init(startedContainer);
        stopButton.onMouseClickCallback = me.onStopButtonClick;
        stopButton.setTextParams('bold 30px Arial', 'black', 'purple', 0, false);
        stopButton.showTitle();


       startedContainer.visible = false;

        rootContainer.addChild(startedContainer);

        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
        this.background = background;
        this.title = title;
        this.button10 = button10;
        this.button50 = button50;
        this.button100 = button100;
        this.notStartedContainer = notStartedContainer;
        this.startedContainer = startedContainer;
        this.roundsCounter = roundsCounter;
        this.roundsCounterBackground = roundsCounterBackground;
        this.activeAutoplayTitle = activeAutoplayTitle;
        this.stopButton = stopButton;
    };

    me.onAutoPlayButtonClick = function(){
        if(!me.rootContainer.visible){
            me.rootContainer.visible = true;
        } else if(me.rootContainer.visible){
            me.rootContainer.visible = false;
        }
    };

    me.onAutoplayOptionSelected = function(){
        var counter = +this.buttonType;
        console.log(counter);
        fireEvent('autoPlayStarted', counter);
        me.showActiveAutoplay(counter-1);
    };

    me.showActiveAutoplay = function(number){
        me.roundsCounter.text = number;
        me.notStartedContainer.visible = false;
        me.startedContainer.visible = true;
    };
    me.hideActiveAutoplay = function(){
        me.roundsCounter.text = 0;
        me.notStartedContainer.visible = true;
        me.startedContainer.visible = false;
    };

    me.onStopButtonClick = function(){
        fireEvent('stopButtonClicked');
        me.hideActiveAutoplay();
    };

    addListener('autoPlayButtonClick', me.onAutoPlayButtonClick);
    addListener('autoPlayRoundStarted', me.showActiveAutoplay);
    addListener('autoPlayComplete', me.hideActiveAutoplay)
}
