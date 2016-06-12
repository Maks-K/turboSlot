var screenWidth = 960,
	screenHeight = 666;
var renderer = PIXI.autoDetectRenderer( screenWidth, screenHeight ),
	stage = new PIXI.Container();
document.body.appendChild( renderer.view );

var background = new Background('resources/bg.png', screenWidth, 536, 0, 0);
background.init(stage);
var spinButtonModule = new SpinButtonModule();
spinButtonModule.init(stage);
/*var button1 = new Button('resources/BTN_Spin.png', 'resources/BTN_Spin_d.png', 115, 115, 273, 268, 'anotherButton')
button1.init(stage);*/


var elements = [];
var toUpdate = [];
for ( var j = 0; j < CONFIG.reels.length; j++ ){
	var reel = new Reel( j, CONFIG.reels[j].reelSet, CONFIG.reels[j].xOffset);
	reel.init( stage );
	elements.push( reel );
	toUpdate.push( reel );
};


var spinModule = new SpinModule(CONFIG.reels);
var keyPad = new KeyPad(0, 536, 960, 130);
keyPad.init(stage);
var server = new Server();
var betlines = new Betlines(CONFIG.betlinesCoords, 'resources/Bet_Line.png');
betlines.init(stage);
var betlineIndicators = new BetLineIndicators('resources/betlineIndicator.png', 'resources/betlineIndicator.png', 30, 30, CONFIG.betlineIndicators);
betlineIndicators.init(stage);

var winSituationsModule = new WinSituationsModule();
winSituationsModule.init(stage);

var winModule = new WinModule(screenWidth/2, screenHeight/2);
winModule.init(stage);

var payTable = new PayTable({
	x 	   : 60,
	y 	   : 10,
	width  : 770,
	height : 490,
	backGroundColor : 0x632980,
	pages  : [
		// page 1
		[{
			type : 'img',
			x : 80,
			y: 30,
			content : 'resources/SYM1.png',
			width : 200,
			height : 156
		},{
			type : 'text',
			x : 300,
			y: 30,
			content : 'We gonna chung, go to hizzle quizzle, shizzle my nizzle crocodizzle. Duis nizzle pimpin. Ma nizzle rutrum shizzle my nizzle crocodizzle ante',
			width : 350,
			height : 50
		},{
			type : 'text',
			x : 80,
			y: 250,
			content : 'Pimpin\' tellizzle mah nizzle, pulvinizzle sheezy, condimentizzle eget, vehicula yo mamma, dizzle. Rizzle sizzle leo bizzle sem hendrerizzle mattis',
			width : 350,
			height : 50
		},{
			type : 'img',
			x : 450,
			y: 250,
			content : 'resources/SYM2.png',
			width : 200,
			height : 156
		}],
		// page 2
		[{
			type : 'text',
			x : 80,
			y: 30,
			content : 'Integer nizzle gangsta. Phasellus sempizzle, fo shizzle that\'s the shizzle fo shizzle congue, velit erat convallis brizzle, vel gangster mah nizzle shizznit vizzle sizzle',
			width : 350,
			height : 50
		},{
			type : 'img',
			x : 450,
			y: 30,
			content : 'resources/SYM3.png',
			width : 200,
			height : 156
		},{
			type : 'img',
			x : 70,
			y: 250,
			content : 'resources/SYM4.png',
			width : 200,
			height : 156
		},{
			type : 'text',
			x : 300,
			y: 250,
			content : 'Crizzle mofo shut the shizzle up dope. Vestibulizzle urna quizzle, rhoncizzle a, lacinia check out this, check out this bow wow wow, bling bling',
			width : 350,
			height : 50
		}],
			// page 3
		[{
			type : 'img',
			x : 80,
			y: 30,
			content : 'resources/SYM5.png',
			width : 200,
			height : 156
		},{
			type : 'text',
			x : 300,
			y: 30,
			content : 'Crackalackin ipsum dolizzle fizzle the bizzle, consectetuer adipiscing elizzle. Sizzle crackalackin shizzlin dizzle, aliquet volutpizzle, suscipit quizzle, fo shizzle vizzle',
			width : 350,
			height : 50
		},{
			type : 'text',
			x : 80,
			y: 250,
			content : 'Owned ante nibh, suscipizzle uhuh ... yih!, vestibulum daahng dawg, phat cool, pimpin\'. Mauris owned mauris. Sizzle non magna phat amet risizzle iaculizzle owned',
			width : 350,
			height : 50
		},{
			type : 'img',
			x : 450,
			y: 250,
			content : 'resources/SYM6.png',
			width : 200,
			height : 156
		}]
	]
});
payTable.init(stage);

var gamerules = new GameRules({
	x 	   : 60,
	y 	   : 10,
	width  : 770,
	height : 490,
	backGroundColor : 0x632330,
	pages  : [
		// page 1
		[{
			type : 'text',
			x : 130,
			y: 30,
			content : 'WHERE BROOKLYN AT, WHERE BROOKLYN AT \n WHERE BROOKLYN AT, WHERE BROOKLYN AT\nWe gonna do it like this\nAnytime you\'re ready, check it\nI got seven Mack 11\'s, about eight 38\'s\nNine 9\'s, ten mack tens, the s***ts never ends\nYou can\'t touch my riches\n Even if you had MC Hammer and them 357 b****es',
			width : 560,
			height : 50
		}],
		// page 2
		[{
			type : 'text',
			x : 130,
			y: 30,
			content : 'Biggie Smalls; the millionare, the mansion, the yacht \nThe two weed spots, the two hot glocks\nThat\'s how I got the weed spot\nI shot dread in the head, took the bread and the lamb spread\nLittle Gotti got the shotty to your body\nSo don\'t resist, or you might miss Christmas\nI tote guns, I make number runs',
			width : 560,
			height : 50
		}],
		// page 3
		[{
			type : 'text',
			x : 130,
			y: 30,
			content : 'I give mc\'s the runs drippin\nwhen I throw my clip in the AK, I slay from far away\nEverybody hit the D-E-C-K\nMy slow flow\'s remarkable, peace to Matteo\nNow we smoke weed like Tony Montana sniffed the yeyo',
			width : 560,
			height : 50
		}],
		// page 4
		[{
			type : 'text',
			x : 130,
			y: 30,
			content : 'That\'s crazy blunts, mad L\'s\nMy voice excels from the avenue to jail cells\nOh my God, I\'m droppin s***t like a pigeon\nI hope you\'re listenin, smackin babies at they christening',
			width : 560,
			height : 50
		}]
	]
});
gamerules.init(stage);

var sorryBro = new SorryBro(240, 150, 400, 300);
sorryBro.init(stage);

var autoPlay = new AutoPlay(520, 285, 400, 250);
autoPlay.init(stage);

animate();
function animate(){
	for( var i = 0; i < toUpdate.length; i++ ){
		toUpdate[i].update();
	};
	renderer.render( stage );
	requestAnimationFrame( animate );
};

