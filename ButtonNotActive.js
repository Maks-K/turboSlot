function ButtonNotActive(link, width, height, x, y){
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
		rootContainer.visible = false;
		
		texture.interactive = false;

		texture.height = me.height;
        texture.width = me.width;
        texture.anchor.x = 0.5;
        texture.anchor.y = 0.5;

		rootContainer.addChild(texture);
		mainContainer.addChild(rootContainer);

		this.rootContainer = rootContainer;
		this.texture = texture;
	};

	this.onQuickStopped = function(){

		me.rootContainer.visible = true;

	};
	
	this.onAllReelsStopped = function(){

		me.rootContainer.visible = true;

	};

	this.update = function(){};

	addListener('quickStopped', me.onQuickStopped);
	addListener('allReelsStopped', me.onAllReelsStopped);

};


