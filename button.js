function DefaultButton(link1, link2, width, height, x, y, buttonType, textOnButton) {
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
    this.buttonLabel = textOnButton;
    this.textOnButton = null;
    this.state = 'up';
    this.enabled = true;

    /*this.buttonLabel.style.font = null;
    this.buttonLabel.style.fill = null;
    this.buttonLabel.style.stroke = null;
    this.buttonLabel.style.strokeThickness = strokeThickness;
    this.buttonLabel.style.dropShadow = dropShadow;*/



    this.init = function (mainContainer) {
        var rootContainer = new PIXI.Container(),
            texture = new PIXI.Sprite.fromImage(me.link1),
            textureNotActive = new PIXI.Sprite.fromImage(me.link2),
            textOnButton;
        if(me.buttonLabel){
            textOnButton = new PIXI.Text(me.buttonLabel);
        }else{
            textOnButton = new PIXI.Text('');
        }


        rootContainer.position.set(me.x, me.y);

        rootContainer.interactive = true;
        rootContainer.on('mousedown', me.onButtonDown);
        rootContainer.on('mouseover', me.onButtonHover);
        rootContainer.on('mouseout', me.onButtonUnHover);
        rootContainer.on('mouseup', me.onButtonUp);


        texture.anchor.set(0.5);
        textOnButton.anchor.set(0.5);
        textOnButton.visible = false;

        textureNotActive.visible = false;
        textureNotActive.anchor.set(0.5);

        rootContainer.addChild(texture, textureNotActive, textOnButton);
        mainContainer.addChild(rootContainer);

        me.rootContainer = rootContainer;
        me.texture = texture;
        me.textureNotActive = textureNotActive;
        me.textOnButton = textOnButton;

        me.setTextParams('bold 40px Arial', 'black', 'purple', 2, false);
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
        if(me.enabled){
            me.setState('up');
            me.texture.scale.set(1);
            me.setEnabledState();
            me.onMouseClickCallback();
        }
        if (!me.enabled){
            me.texture.visible = false;
            me.textureNotActive.visible = true;
        };
    };

    this.onButtonHover = function () {
        if(me.enabled){
            me.setState('hover');
            me.texture.alpha = 0.7;
            me.textOnButton.visible = true;
            //fireEvent('buttonHovered', me.buttonType);
            me.onMouseHoverCallback();
        }
    };

    this.onButtonUnHover = function () {
        if(me.enabled){
            me.setState('up');
            me.texture.alpha = 1;
            me.texture.scale.set(1);
            me.textOnButton.visible = false;
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


