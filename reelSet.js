function ReelSet(y, reelStrip, width, symHeight ){
	var me = this;
	this.rootContainer = null;
	this.texture = null;
	this.y = y;
	this.reelStrip = reelStrip;
	this.width = width;
	this.symHeight = symHeight;

	this.update = function(){};
};

ReelSet.prototype.init = function( mainContainer ){
	var rootContainer = new PIXI.Container();
	for( var i = 0; i < this.reelStrip.length; i++){
		var symbol = new Symbol( this.width, this.symHeight, this.reelStrip[i], i);
			symbol.init( rootContainer );
	};
	rootContainer.position.y = this.y;
	mainContainer.addChild( rootContainer );
	this.symbol = symbol;
	this.rootContainer = rootContainer;
};