function SelectorBar(x, y, width, height, lightBarWidth, min, max, step, selectorType){
    var me = this;
    this.rootContainer = null;
    this.greyBar = null;
    this.lightBar = null;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lightBarWidth = lightBarWidth;
    this.min = min;
    this.max = max;
    this.step = step;
    this.selectorType = selectorType;
    this.stepsNumber = (me.max - me.min)/me.step;
    this.oneStepValue = me.width /me.stepsNumber;
    this.state = 'up';

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
            var test = Number(event.data.getLocalPosition(greyBar).x);
            var number = ((me.min*10 - me.step*10)/10 + Number((test / me.oneStepValue).toFixed(0)));
            //me.onBarClick(number);
            me.state = 'down';
            console.log(me.state);
            fireEvent('BarClicked', {
                selectorType : me.selectorType,
                newValue : (number * 10 * me.step * 10 + me.step * 100)/100
            });
        });
        greyBar.on('mousemove', function(event){
            if(me.state == 'down'){
                var test = Number(event.data.getLocalPosition(greyBar).x);
                var number = ((me.min*10 - me.step*10)/10 + Number((test / me.oneStepValue).toFixed(0)));
                console.log(me.state);
                fireEvent('BarClicked', {
                    selectorType : me.selectorType,
                    newValue : (number * 10 * me.step * 10 + me.step * 100)/100
                });
            }
        });

        window.addEventListener('mouseup', function(event){
            me.state = 'up';
            //console.log('root'+me.state);
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
    };
    this.onBarClick = function(number){};
}
