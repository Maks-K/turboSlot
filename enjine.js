var renderer = PIXI.autoDetectRenderer( 960, 536 ),
	stage = new PIXI.Container();
document.body.appendChild( renderer.view );

var background = new Background('resources/bg.png', 960, 536, 0, 0)
background.init(stage);
var button = new Button('resources/BTN_Spin.png', 115, 115, 873, 268)
button.init(stage);

/*var outcome = [Math.floor(Math.random()*firstReel.reelSet.length+1), 
			   Math.floor(Math.random()*secondReel.reelSet.length+1), 
			   Math.floor(Math.random()*thirdReel.reelSet.length+1)];*/
var elements = [];
var toUpdate = [];
for ( var j = 0; j < reels.length; j++ ){
	var reel = new Reel( j, reels[j].reelSet, reels[j].xOffset);
	reel.init( stage );
	elements.push( reel );
	toUpdate.push( reel );
};


var spinModule = new SpinModule(reels);
toUpdate.push(spinModule);

animate();
function animate(){
	for( var i = 0; i < toUpdate.length; i++ ){
		toUpdate[i].update();
	};
	renderer.render( stage );
	requestAnimationFrame( animate );
};

