function PayTable(x, y, width, height){
    var me = this;
    this.rootContainer = null;
    this.page1 = null;
    this.page2 = null;
    this.page3 = null;
    this.backGround = null;
    this.paytableLeftSelector = null;
    this.paytableRightSelector = null;
    this.sym1Image = null;
    this.sym1Explanation = null;
    this.sym2Image = null;
    this.sym2Explanation = null;
    this.sym3Image = null;
    this.sym3Explanation = null;
    this.sym4Image = null;
    this.sym4Explanation = null;
    this.texts = [];
    this.pages = [];


    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            page1 = new PIXI.Container(),
            page2 = new PIXI.Container(),
            page3 = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            sym1Image = new PIXI.Sprite.fromImage('resources/SYM1.png'),
            sym2Image = new PIXI.Sprite.fromImage('resources/SYM2.png'),
            sym3Image = new PIXI.Sprite.fromImage('resources/SYM3.png'),
            sym4Image = new PIXI.Sprite.fromImage('resources/SYM4.png'),
            sym5Image = new PIXI.Sprite.fromImage('resources/SYM5.png'),
            sym6Image = new PIXI.Sprite.fromImage('resources/SYM6.png'),
            sym1Explanation = new PIXI.Text('test'),
            sym2Explanation = new PIXI.Text('test'),
            sym3Explanation = new PIXI.Text('test'),
            sym4Explanation = new PIXI.Text('test'),
            sym5Explanation = new PIXI.Text('test'),
            sym6Explanation = new PIXI.Text('test'),
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
        sym3Image.position.set(70,30);
        sym4Image.position.set(70,250);
        sym5Image.position.set(70,30);
        sym6Image.position.set(70,250);

        me.texts.push(sym1Explanation, sym2Explanation, sym3Explanation, sym4Explanation, sym5Explanation, sym6Explanation);

        sym1Explanation.position.set(330, 30);
        sym1Explanation.text = 'We gonna chung, go to hizzle quizzle, shizzle my nizzle crocodizzle. Duis nizzle pimpin\'. Ma nizzle rutrum shizzle my nizzle crocodizzle ante';

        sym2Explanation.position.set(330, 250);
        sym2Explanation.text = 'Pimpin\' tellizzle mah nizzle, pulvinizzle sheezy, condimentizzle eget, vehicula yo mamma, dizzle. Rizzle sizzle leo bizzle sem hendrerizzle mattis';

        sym3Explanation.position.set(330, 30);
        sym3Explanation.text = 'Integer nizzle gangsta. Phasellus sempizzle, fo shizzle that\'s the shizzle fo shizzle congue, velit erat convallis brizzle, vel gangster mah nizzle shizznit vizzle sizzle';

        sym4Explanation.position.set(330, 250);
        sym4Explanation.text = 'Crizzle mofo shut the shizzle up dope. Vestibulizzle urna quizzle, rhoncizzle a, lacinia check out this, check out this bow wow wow, bling bling';

        sym5Explanation.position.set(330, 30);
        sym5Explanation.text = 'Crackalackin ipsum dolizzle fizzle the bizzle, consectetuer adipiscing elizzle. Sizzle crackalackin shizzlin dizzle, aliquet volutpizzle, suscipit quizzle, fo shizzle vizzle, my shizz';

        sym6Explanation.position.set(330, 250);
        sym6Explanation.text = 'Owned ante nibh, suscipizzle uhuh ... yih!, vestibulum daahng dawg, phat cool, pimpin\'. Mauris owned mauris. Sizzle non magna phat amet risizzle iaculizzle owned.';


        for (var i = 0; i < me.texts.length; i++){
            me.texts[i].style.wordWrap = true;
            me.texts[i].style.wordWrapWidth = 400;
        }


        page1.addChild(sym1Image, sym1Explanation, sym2Image, sym2Explanation);
        page2.addChild(sym3Image, sym3Explanation, sym4Image, sym4Explanation);
        page3.addChild(sym5Image, sym5Explanation, sym6Image, sym6Explanation);
        page2.visible = false;
        page3.visible = false;



        rootContainer.addChild(backGround, page1, page2, page3);
        me.pages.push(page1, page2, page3);

        paytableLeftSelector.init(rootContainer);
        paytableRightSelector.init(rootContainer);
        mainContainer.addChild(rootContainer);

        paytableLeftSelector.onMouseClickCallback = me.onLeftSelectorButtonClick;
        paytableRightSelector.onMouseClickCallback = me.onRightSelectorButtonClick;


        me.rootContainer = rootContainer;
        me.page1 = page1;
        me.page2= page2;
        me.page3= page3;
        me.backGround = backGround;

        me.sym1Image = sym1Image;
        me.sym2Image = sym2Image;
        me.sym1Explanation = sym1Explanation;
        me.sym2Explanation = sym2Explanation;

        me.sym3Image = sym3Image;
        me.sym4Image = sym4Image;
        me.sym3Explanation = sym3Explanation;
        me.sym4Explanation = sym4Explanation;

        me.sym5Image = sym5Image;
        me.sym6Image = sym6Image;
        me.sym5Explanation = sym6Explanation;
        me.sym6Explanation = sym6Explanation;

        me.paytableLeftSelector = paytableLeftSelector;
        me.paytableRightSelector = paytableRightSelector;
    };

    me.onPaytableButtonClick = function(){
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
              if(i == 0){
                  me.pages[me.pages.length-1].visible = true;
              }else{
                  me.pages[i-1].visible = true;
              }
              return true;
          }
      }
    };

    me.onRightSelectorButtonClick = function(){
        for(var i  = 0; i < me.pages.length; i++){
            if(me.pages[i].visible == true){
                me.pages[i].visible = false;
                if(i == me.pages.length-1){
                    me.pages[0].visible = true;
                }else{
                    me.pages[i+1].visible = true;
                }
                return true;
            }
        }
    };
    me.hide = function(){
        me.rootContainer.visible = false;
    };

    addListener('paytableButtonClick', me.onPaytableButtonClick);
    addListener('spinButtonClick', me.hide);
}
