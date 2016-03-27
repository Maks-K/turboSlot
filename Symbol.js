function Symbol( width, height, sym, symbolIndex ){
	var me = this;
	this.rootContainer = null;
	this.texture = null;

	this.width = width;
	this.height = height;
	this.y = this.height*symbolIndex;
	this.sym = 'resources/'+ sym + '.png'
};

Symbol.prototype.init = function( mainContainer ){
	var rootContainer = new PIXI.Container(),
		texture = new PIXI.Sprite.fromImage( this.sym )

		rootContainer.position.y = this.y;

		texture.width = this.width;
		texture.height = this.height;

		rootContainer.addChild( texture );
		mainContainer.addChild( rootContainer );

		this.rootContainer = rootContainer;
		this.texture = texture;
};