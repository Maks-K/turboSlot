function ValuesHolder(x, y, width, height, value, title){
    var me = this;
    this.rootContainer = null;
    this.title = null;
    this.valueText = null;
    this.titleText = null;
    this.backGround = null;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.value = value;
    this.title = title;

    this.init = function(mainContainer){
        var rootContainer = new PIXI.Container(),
            backGround = new PIXI.Graphics(),
            title = new PIXI.Text(me.title),
            value = new PIXI.Text(me.value);

        rootContainer.position.set(me.x, me.y);

        backGround.beginFill(0x99FFFF);
        backGround.drawRoundedRect(0, 0, me.width, me.height, 10);
        backGround.endFill();

        title.position.set(me.width/2, -me.height/2);
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        title.style.font = 'bold 25px Arial';

        value.position.set(me.width/2, me.height/2);
        value.anchor.x = 0.5;
        value.anchor.y = 0.5;
        value.style.font = 'bold 25px Arial';

        rootContainer.addChild(backGround, title, value);
        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;
        me.backGround = backGround;
        me.title = title;
        me.valueText = value;
    };

    this.updateValue = function(newValue, action){
        if(action == 'add'){
            console.log(+me.valueText.text, newValue);
            me.valueText.text = ((+me.valueText.text + newValue).toFixed(1)*100)/100
        }
        if(action == 'replace'){
            me.valueText.text = Math.floor(newValue);
        }
    }
}
