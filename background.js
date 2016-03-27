function Background(link, width, height, x, y){
	var me = this;
	this.rootContainer = null;
	this.texture = null;
	this.link = link;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;

	this.init = function(mainContainer){
		var rootContainer = new PIXI.Container(),
			texture = new PIXI.Sprite.fromImage( me.link );
		rootContainer.position.x = me.x;
		rootContainer.position.y = me.y;

		texture.height = me.height;
        texture.width = me.width;

		rootContainer.addChild(texture);
		mainContainer.addChild(rootContainer);

		this.rootContainer = rootContainer;
		this.texture = texture;
	};

	this.update = function(){};

};


