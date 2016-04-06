function Button(link1, link2, width, height, x, y){
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

	this.init = function(mainContainer){
		var rootContainer = new PIXI.Container(),
			texture = new PIXI.Sprite.fromImage( me.link1 ),
			textureNotActive = new PIXI.Sprite.fromImage( me.link2 );
		rootContainer.position.x = me.x;
		rootContainer.position.y = me.y;
		
		texture.interactive = true;
		texture.visible = true;
		texture.on('mousedown', me.onSpinButtonClick);

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

	this.onQuickStopped = function(){

		me.texture.interactive = false;
		me.texture.visible = false;
		me.textureNotActive.visible = true;

	};
	
	this.onAllReelsStopped = function(){

		me.texture.interactive = true;
		me.texture.visible = true;
		me.textureNotActive.visible = false;

	};

	this.onSpinButtonClick = function(){

		if(me.texture.interactive){

			fireEvent('SpinButtonClick');

		};

	};

	this.update = function(){
		
	};

	addListener('quickStopped', me.onQuickStopped);
	addListener('allReelsStopped', me.onAllReelsStopped);

};


