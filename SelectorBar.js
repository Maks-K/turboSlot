function SelectorBar(x, y, width, height, lightBarWidth){
    var me = this;
    this.rootContainer = null;
    this.greyBar = null;
    this.lightBar = null;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lightBarWidth = lightBarWidth;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            greyBar = new PIXI.Graphics(),
            lightBar = new PIXI.Graphics();

        rootContainer.position.set(me.x, me.y);

        greyBar.beginFill(0x99FFFF);
        greyBar.drawRect(0,0,me.width, me.height);
        greyBar.endFill();

        greyBar.interactive = true;
        greyBar.on('mousedown', function(event){
            console.log(event.data.getLocalPosition(greyBar));
        });

        lightBar.beginFill(0xFF9900);
        lightBar.drawRect(0,0,me.lightBarWidth, me.height);
        lightBar.endFill();

        rootContainer.addChild(greyBar, lightBar);
        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;
        me.greyBar = greyBar;
        me.lightBar = lightBar;
    };

    this.update = function(newLightBarWidth){
        me.lightBar.clear();
        me.lightBar.beginFill(0xFF9900);
        me.lightBar.drawRect(0, 0, newLightBarWidth, me.height);
        me.lightBar.endFill();
    }
}
