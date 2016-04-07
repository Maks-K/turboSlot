function Button(link1, link2, width, height, x, y, buttonType){
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

	this.init = function(mainContainer){
		var rootContainer = new PIXI.Container(),
			texture = new PIXI.Sprite.fromImage( me.link1 ),
			textureNotActive = new PIXI.Sprite.fromImage( me.link2 );
		rootContainer.position.x = me.x;
		rootContainer.position.y = me.y;
		
		texture.interactive = true;
		texture.visible = true;
		texture.on('mousedown', me.onButtonClick);
		texture.on('mouseover', me.onButtonHover);
		texture.on('mouseout', me.onButtonUnHover); // reverts mouseover


		texture.height = me.height;
        texture.width = me.width;
        texture.anchor.x = 0.5;
        texture.anchor.y = 0.5;

        textureNotActive.visible = false;
        textureNotActive.height = me.height;
        textureNotActive.width = me.width;
        textureNotActive.anchor.x = 0.5;
        textureNotActive.anchor.y = 0.5;

		rootContainer.addChild(texture, textureNotActive);
		mainContainer.addChild(rootContainer);

		this.rootContainer = rootContainer;
		this.texture = texture;
		this.textureNotActive = textureNotActive;
	};


	this.onButtonClick = function(){

			fireEvent(me.buttonType+'Click');

	};

	this.update = function(){};

	this.setState = function (newState) {

		me.state = newState;

	};

	me.onStateChange = function(buttonType){
		if(me.buttonType == buttonType){
			if(me.state == 'disabled'){
				me.texture.interactive = false;
				me.texture.visible = false;
				me.textureNotActive.visible = true;
			} 
			if(me.state == 'up'){
				me.texture.interactive = true;
				me.texture.visible = true;
				me.textureNotActive.visible = false;
			}
			if(me.state == 'hovered'){
				me.texture.alpha = 0.7;
			}
			if(me.state == 'unHovered'){
				me.texture.alpha = 1;
			}
		}
	}

	this.onButtonHover = function(){

		me.setState('hovered');
		fireEvent('buttonStateChange', me.buttonType);

	};

	this.onButtonUnHover = function(){

		me.setState('unHovered');
		fireEvent('buttonStateChange', me.buttonType);

	};

	addListener('buttonStateChange', me.onStateChange);

};


