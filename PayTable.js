function PayTable(x, y, width, height){
    var me = this;
    this.rootContainer = null;
    this.backGround = null;
    this.sym1Image = null;
    this.sym1Explanation = null;
    this.sym2Image = null;
    this.sym2Explanation = null;
    this.paytableLeftSelector = null;
    this.paytableRightSelector = null;


    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            sym1Image = new PIXI.Sprite.fromImage('resources/SYM1.png'),
            sym2Image = new PIXI.Sprite.fromImage('resources/SYM2.png'),
            sym1Explanation = new PIXI.Text('test'),
            sym2Explanation = new PIXI.Text('test'),
            paytableLeftSelector = new DefaultButton(
                {
                    textureActive : 'resources/paytableLeftSelector.png',
                    textureNotActive : 'resources/paytableLeftSelector.png',
                    width : 70,
                    height :70,
                    x : 40,
                    y : 268,
                    type : 'paytableLeftSelector'
                }
            ),
            paytableRightSelector = new DefaultButton(
                {
                    textureActive : 'resources/paytableRightSelector.png',
                    textureNotActive : 'resources/paytableRightSelector.png',
                    width : 70,
                    height :70,
                    x : 730,
                    y : 268,
                    type : 'paytableRightSelector'
                }
            );


        rootContainer.position.set(me.x, me.y);
        rootContainer.visible = false;

        backGround.beginFill(0x632980);
        backGround.lineStyle(5, 0xFF0000);
        backGround.drawRoundedRect(0, 0, me.width, me.height, 45);
        backGround.endFill();

        sym1Image.position.set(70,30);
        sym2Image.position.set(70,250);

        sym1Explanation.position.set(330, 30);
        sym1Explanation.text = 'We gonna chung, go to hizzle quizzle, shizzle my nizzle crocodizzle. Duis nizzle pimpin\'. Ma nizzle rutrum shizzle my nizzle crocodizzle ante';
        sym1Explanation.style.wordWrap = true;
        sym1Explanation.style.wordWrapWidth = 400;


        sym2Explanation.position.set(330, 250);
        sym2Explanation.text = 'Pimpin\' tellizzle mah nizzle, pulvinizzle sheezy, condimentizzle eget, vehicula yo mamma, dizzle. Rizzle sizzle leo bizzle sem hendrerizzle mattis';
        sym2Explanation.style.wordWrap = true;
        sym2Explanation.style.wordWrapWidth = 400;


        rootContainer.addChild(backGround, sym1Image, sym1Explanation, sym2Image, sym2Explanation);

        paytableLeftSelector.init(rootContainer);
        paytableRightSelector.init(rootContainer);
        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
        this.backGround = backGround;
        this.sym1Image = sym1Image;
        this.sym2Image = sym1Image;
        this.sym1Explanation = sym1Explanation;
        this.sym2Explanation = sym1Explanation;
        this.sym2Explanation = sym1Explanation;
        this.paytableLeftSelector = paytableLeftSelector;
        this.paytableRightSelector = paytableRightSelector;
    };

    me.onPaytableButtonClick = function(){
        if(!me.rootContainer.visible){
            me.rootContainer.visible = true;
        } else if(me.rootContainer.visible){
            me.rootContainer.visible = false;
        }
    };

    addListener('paytableButtonClick', me.onPaytableButtonClick);
}
