function Button(link1, link2, width, height, x, y, buttonType) {
    var me = this;
    this.rootContainer = null;
    this.texture = null;
    this.textureNotActive = null;
    this.link1 = link1;
    this.link2 = link2;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.buttonType = buttonType;
    this.state = 'up';
    this.enabled = true;

    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            texture = new PIXI.Sprite.fromImage(me.link1),
            textureNotActive = new PIXI.Sprite.fromImage(me.link2);
        rootContainer.position.x = me.x;
        rootContainer.position.y = me.y;

        rootContainer.interactive = true;
        rootContainer.on('mousedown', me.onButtonDown);
        rootContainer.on('mouseover', me.onButtonHover);
        rootContainer.on('mouseout', me.onButtonUnHover);
        rootContainer.on('mouseup', me.onButtonUp);


        texture.anchor.x = 0.5;
        texture.anchor.y = 0.5;

        textureNotActive.visible = false;
        textureNotActive.anchor.x = 0.5;
        textureNotActive.anchor.y = 0.5;

        rootContainer.addChild(texture, textureNotActive);
        mainContainer.addChild(rootContainer);

        this.rootContainer = rootContainer;
        this.texture = texture;
        this.textureNotActive = textureNotActive;
    };


    this.onButtonDown = function () {
        me.setState('down');//fireEvent for sounds (for all states)
        me.texture.scale.set(1.1);
    };

    this.onButtonUp = function () {
        if(me.enabled){
            me.setState('up');
            me.texture.scale.set(1);
            me.setEnabledState();
            me.onMouseClickCallback();
        }
        if (!me.enabled){
            console.log('condition works');
            me.texture.visible = false;
            me.textureNotActive.visible = true;
        };
    };

    this.onButtonHover = function () {
        if(me.enabled){
            me.setState('hover');
            me.texture.alpha = 0.7;
            //fireEvent('buttonHovered', me.buttonType);
            me.onMouseHoverCallback();
        }
    };

    this.onButtonUnHover = function () {
        if(me.enabled){
            me.setState('up');
            me.texture.alpha = 1;
            me.texture.scale.set(1);
            //fireEvent('buttonUnHovered', me.buttonType);
            me.onMouseUnHoverCallback();
        }
    };

    this.onMouseHoverCallback = function(){};
    this.onMouseUnHoverCallback = function(){};

    this.onMouseClickCallback = function(){};

    this.setEnabledState = function(){
        me.texture.visible = true;
        me.textureNotActive.visible = false;
    };

    this.setState = function (newState) {
        me.state = newState;
    };



}


