var screenWidth = 960,
	screenHeight = 536;
var renderer = PIXI.autoDetectRenderer( screenWidth, screenHeight ),
	stage = new PIXI.Container();
document.body.appendChild( renderer.view );

var background = new Background('resources/bg.png', screenWidth, screenHeight, 0, 0)
background.init(stage);
var spinButtonModule = new SpinButtonModule();
spinButtonModule.init(stage);
/*var button1 = new Button('resources/BTN_Spin.png', 'resources/BTN_Spin_d.png', 115, 115, 273, 268, 'anotherButton')
button1.init(stage);*/


var elements = [];
var toUpdate = [];
for ( var j = 0; j < reels.length; j++ ){
	var reel = new Reel( j, reels[j].reelSet, reels[j].xOffset);
	reel.init( stage );
	elements.push( reel );
	toUpdate.push( reel );
};


var spinModule = new SpinModule(reels);
var server = new Server();

var winSituationsModule = new WinSituationsModule();
winSituationsModule.init(stage);

var winModule = new WinModule(screenWidth/2, screenHeight/2);
winModule.init(stage);

animate();
function animate(){
	for( var i = 0; i < toUpdate.length; i++ ){
		toUpdate[i].update();
	};
	renderer.render( stage );
	requestAnimationFrame( animate );
};

