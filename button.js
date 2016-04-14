function DefaultButton(link1, link2, width, height, x, y, buttonType, text) {
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
    this.buttonLabel = text;
    this.textOnButton = null;
    this.state = 'up';
    this.enabled = true;


    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            texture = new PIXI.Sprite.fromImage(me.link1),
            textureNotActive = new PIXI.Sprite.fromImage(me.link2),
            textOnButton;
        if(me.buttonLabel){
            textOnButton = new PIXI.Text(me.buttonLabel);
            textOnButton.anchor.set(0.5);
            textOnButton.visible = false;
        }

        rootContainer.position.set(me.x, me.y);

        rootContainer.interactive = true;
        rootContainer.on('mousedown', me.onButtonDown);
        rootContainer.on('mouseover', me.onButtonHover);
        rootContainer.on('mouseout', me.onButtonUnHover);
        rootContainer.on('mouseup', me.onButtonUp);


        texture.anchor.set(0.5);

        textureNotActive.visible = false;
        textureNotActive.anchor.set(0.5);

        rootContainer.addChild(texture, textureNotActive);

        if(textOnButton){
            rootContainer.addChild(textOnButton);
            me.textOnButton = textOnButton;
            me.setTextParams('bold 40px Arial', 'black', 'purple', 2, false);
        }

        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;
        me.texture = texture;
        me.textureNotActive = textureNotActive;

    };

    this.setTextParams = function(font, fontColor, strokeColor, strokeThickness, dropShadow){
        me.textOnButton.style.font = font;
        me.textOnButton.style.fill = fontColor;
        me.textOnButton.style.stroke = strokeColor;
        me.textOnButton.style.strokeThickness = strokeThickness;
        me.textOnButton.style.dropShadow = dropShadow;
    };

    this.onButtonDown = function () {
        me.setState('down');//fireEvent for sounds (for all states)
        me.texture.scale.set(1.1);

    };

    this.onButtonUp = function () {
        if(me.enabled && me.state == 'down'){
            me.setState('up');
            me.texture.scale.set(1);
            me.setEnabledState();
            me.onMouseClickCallback();
        }
        if (!me.enabled){
            me.texture.visible = false;
            me.textureNotActive.visible = true;
        }
        console.log(me.state);
    };

    this.onButtonHover = function () {
        if(me.enabled){
            me.setState('hover');
            me.texture.alpha = 0.7;
            me.onMouseHoverCallback();
        }
        console.log(me.state);
    };

    this.onButtonUnHover = function () {
            me.setState('up');
            me.texture.alpha = 1;
            me.texture.scale.set(1);
            //fireEvent('buttonUnHovered', me.buttonType);
            me.onMouseUnHoverCallback();
        console.log(me.state);
    };

    this.onMouseHoverCallback = function(){};
    this.onMouseUnHoverCallback = function(){};
    this.onMouseClickCallback = function(){};

    this.showTitle = function(){
        me.textOnButton.visible = true;
    };
    this.hideTitle = function(){
        me.textOnButton.visible = false;
    };

    this.setEnabledState = function(){
        me.texture.visible = true;
        me.textureNotActive.visible = false;
    };

    this.setState = function (newState) {
        me.state = newState;
    };
}


