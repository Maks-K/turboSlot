function AutoPlay (x, y, width, height){
    var me = this;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rootContainer = null;
    this.background = null;
    this.title = null;
    this.button10 = null;
    this.button50 = null;
    this.button100 = null;
    this.buttons = [];


    this.init = function (mainContainer){
        var rootContainer = new PIXI.Container(),
            buttonsContainer = new PIXI.Container(),
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
                    type : '7',
                    text : '7'
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

        rootContainer.addChild(background, title);

        this.buttons.push(button10, button50, button100);
        for(var i = 0; i < this.buttons.length; i++){
            this.buttons[i].init(rootContainer);
            this.buttons[i].showTitle();
            this.buttons[i].onMouseClickCallback = me.onAutoplayOptionSelected.bind(this.buttons[i]);
        }

        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
        this.background = background;
        this.title = title;
        this.button10 = button10;
        this.button50 = button50;
        this.button100 = button100;
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
    };

    addListener('autoPlayButtonClick', me.onAutoPlayButtonClick)
}
