function DefaultButton(params) {
    var me = this;
    this.rootContainer = null;
    this.texture = null;
    this.textureNotActive = null;
    this.link1 = params.textureActive;
    this.link2 = params.textureNotActive;
    this.width = params.width;
    this.height = params.height;
    this.x = params.x;
    this.y = params.y;
    this.buttonType = params.type;
    this.buttonLabel = params.text;
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
        texture.width = me.width;
        texture.height = me.height;
        textureNotActive.width = texture.width;
        textureNotActive.height = texture.height;


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
        me.texture.width = me.texture.width * 1.1;
        me.texture.height = me.texture.height * 1.1;

    };

    this.onButtonUp = function () {
        if(me.enabled && me.state == 'down'){
            me.setState('up');
            //me.texture.scale.set(1);
            me.texture.width = me.width;
            me.texture.height = me.height;
            me.setEnabledState();
            me.onMouseClickCallback();
        }
        if (!me.enabled){
            me.texture.visible = false;
            me.textureNotActive.visible = true;
        }
    };

    this.onButtonHover = function () {
        if(me.enabled){
            me.setState('hover');
            me.texture.alpha = 0.7;
            me.onMouseHoverCallback();
        }
    };

    this.onButtonUnHover = function () {
            me.setState('up');
            me.texture.alpha = 1;
            //me.texture.scale.set(1);
            me.texture.width = me.width;
            me.texture.height = me.height;
            //fireEvent('buttonUnHovered', me.buttonType);
            me.onMouseUnHoverCallback();
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
        me.enabled = true;
        me.texture.visible = true;
        me.textureNotActive.visible = false;
    };

    this.setDisabledState = function(){
        me.enabled = false;
        me.texture.visible = false;
        me.textureNotActive.visible = true;
    };

    this.setState = function (newState) {
        me.state = newState;
    };
}


