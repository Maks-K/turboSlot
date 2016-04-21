function PayTable(x, y, width, height){
    var me = this;
    this.rootContainer = null;
    this.backGround = null;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            backGround = new PIXI.Graphics();

        rootContainer.position.set(me.x, me.y);
        rootContainer.visible = false;

        backGround.beginFill(0x632980);
        backGround.lineStyle(5, 0xFF0000);
        backGround.drawRoundedRect(0, 0, me.width, me.height, 45);
        //backGround.lineStyle(5, 100, 0.1);
        backGround.endFill();

        rootContainer.addChild(backGround);
        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
        this.backGround = backGround;
    };

    me.onPaytableButtonClick = function(){
        if(!me.rootContainer.visible){
            me.rootContainer.visible = true;
        } else if(me.rootContainer.visible){
            me.rootContainer.visible = false;
        }
    }

    addListener('paytableButtonClick', me.onPaytableButtonClick);
}
