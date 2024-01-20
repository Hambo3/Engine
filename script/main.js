
//https://javascript.info/class-inheritance
//https://dev.to/nitdgplug/learn-javascript-through-a-game-1beh
//https://www.minifier.org/

var fps = 60;

var rf = (function(){
  return window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(cb){
          window.setTimeout(cb, 1000 / fps);
      };
})();

var IsTouchDevice = window.ontouchstart !== undefined;


var lastTime;
var now;
var dt = 0;
var slowMo = 1;
var step = 1 / fps;
var sStep = slowMo * step;

var GAME;
var GFX, SFX;
var MAP;
var AUDIO;

var DEBUG;
var TEXT;





var ctx;//
/*****************************/
function Start(canvasBody)
{	
	
	// Create the canvas
	var canvas = document.createElement("canvas");
	if(canvas.getContext)
	{
		ctx = canvas.getContext("2d");
		canvas.width = (DEF.map.size.screen.width * DEF.map.size.tile.width);
		canvas.height = (DEF.map.size.screen.height * DEF.map.size.tile.height);

		var b = document.getElementById(canvasBody);
    	b.appendChild(canvas);

		SPRITES = new SpritePreProcessor(DEF.file, DEF.sprite, preInit);

		MAP = new MapManger(ctx, DEF.map);

		//offscreen renderer
		GFX = new Render(MAP.osCanvas.ctx);	

		SFX = new Render(MAP.screenCtx, DEF.map.size.screen.width* DEF.map.size.tile.width, 
			DEF.map.size.screen.height* DEF.map.size.tile.height);	

		DEBUG = new DebugEdit(MAP.screenCtx, 400, 600 ,'#fff', 5);
		Input.Init(canvas, IsTouchDevice, SFX,['#555','#999'],1);
	}
}


function preInit(){
	MAP.Init();
	init();
}

function init()
{  
  var now = timestamp();	
	lastTime = now;

	GAME = new Game();
	GAME.Init();
	
	FixedLoop();  
}

function SlowMo(mo){
	sStep = mo * step;
}

function FixedLoop(){
	if(Input.IsSingle('KeyY') ) {
		slowMo+=1;
		SlowMo(slowMo);		
	}
	else if(Input.IsSingle('KeyT') ) {
		if(slowMo-1 > 0){
			slowMo-=1;
			SlowMo(slowMo);
		}
	}

	if(Input.IsDown('x','X') ) {
		MAP.Zoom(0.01);
	}
	else if(Input.IsDown('z','Z') ) {
		MAP.Zoom(-0.01);	
	}
	now = timestamp();
	dt = dt + Math.min(1, (now - lastTime) / 1000);
	while (dt > sStep) {
	  dt = dt - sStep;
	  update(step);
	}

	render();
				
	lastTime = now;
	rf(FixedLoop);
}

function timestamp() {
	var wp = window.performance;
	return wp && wp.now ? wp.now() : new Date().getTime();
}

// Update game objects
function update(dt) {
	GAME.Update(dt);
};

function render() {
	GAME.Render();

	DEBUG.Render(true,true);
};

onkeydown = function(e)
{
	e.preventDefault();
    Input.Pressed(e, true);
};

onkeyup = function(e)  {
	e.preventDefault();
    Input.Pressed(e, false);
    Input.Released(e, true);
};

onblur = function(e)  {
	e.preventDefault();
    Input.pressedKeys = {};
};

window.onload = function() {
	Start("canvasBody");
}

