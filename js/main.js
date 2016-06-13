$(document).ready(function(){

	var wolves = [] ;

	var mouse = {
		x:0,
		y:0
	}

	var lastMouse = {
		x:0,
		y:0
	}
	var on  = false;
	var target;

	window.addEventListener('mousemove', function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		lastMouse.x += (mouse.x - lastMouse.x)/10;
		lastMouse.y += (mouse.y - lastMouse.y)/10;
	});


	$('img.wolfpreview').each(function(){
		var el = $(this);
		var offset = el.offset();
		var width = el.width();
		var height = el.height();
		var obj = {
			el: this,
			top: offset.top,
			left: offset.left,
			width:width,
			height:height,
			rotationX:0,
			rotationY:0,
			isActive: false
		}
		wolves.push(obj);
	});


	$('img.wolfpreview').hover(function(){
		var i = $('img.wolfpreview').index(this);
		wolves[i].isActive = true ;
		AF.start();
	}, function(){
		var i = $('img.wolfpreview').index(this);
		wolves[i].isActive = false ;
	});


	function wolfHover(){
		for(var i = 0; i< wolves.length; i++){
			var wolf = wolves[i];
			//is not active but has rotation values left
			if((!wolf.isActive) && (wolf.rotationY != 0 || wolf.rotationX != 0)){

				wolf.rotationX += (0-wolf.rotationX)/10;//set to 0 in 10 frames
				wolf.rotationY += (0-wolf.rotationY)/10;//set to 0 in 10 frames

				//wolf.el.style.transform = 'rotateX('+wolf.rotationX+'deg) rotateY('+wolf.rotationY+'deg)';
			}
			// not active
			else if( !wolf.isActive ) continue 
			// it is active and should be rotating with mouse
		else{
			coordY = (((wolf.top-$(document).scrollTop()-mouse.y)/wolf.height)*2)+1;
			coordX = ((lastMouse.x-wolf.left)/wolf.width*2)-1;
			maxDeg = 70;

			//switched X and Y on purpose
			wolf.rotationY = ((coordX*maxDeg)-wolf.rotationX)/10;
			wolf.rotationX = ((coordY*maxDeg)-wolf.rotationY)/10;

			console.log('x:'+coordX);
			wolf.el.style.transform = 'rotateX('+wolf.rotationX+'deg) rotateY('+wolf.rotationY+'deg)';
		}
		if(!wolf.isActive){
			AF.stop();
		}
	}

}

AF.add('wolfHover', function(){
	wolfHover();
});	

});






////ANIMATION FRAME ////
var queue = [];
var stopList = {};
var fn =   
window.requestAnimationFrame        ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame    ||
window.oRequestAnimationFrame       ||
window.msRequestAnimationFrame     ||
function(/* function */ callback, /* DOMElement */ element){
	window.setTimeout(callback, 1000 / 10);
};

var AF =  {
	stopped:true,
	animStopped: function (name){
		if(typeof name == 'undefined') return undefined;
		if(typeof stopList[name] == 'undefined') return undefined;
		return stopList[name];
	},
	add: function(name, callback){
		var theAnim = {
			name:name,
			callback:callback,
			stopped:false
		};
		stopList[name] = true;
		queue.push(theAnim);
	},
	remove: function(name){
		for(var i=0; i<queue.length; i++){
			if(queue[i].name === name){
				queue.splice(i,1);
			}
		}
		delete stopList[name];
	},
	anim: function(){
		var scope = this;
		if(!this.stopped){
			var callback;
			for(var i=0; i<queue.length; i++){
				if(!queue[i].stopped){
					callback = queue[i].callback;
					callback();
				}
			}
			fn(function(){
				scope.anim();
			});
		}
	},
	start: function(name){
		if(typeof name !== 'undefined'){
			stopList[name] = false;
			for(var i=0; i<queue.length; i++){
				if(queue[i].name === name){
					queue[i].stopped = false;
				}
			}
		}
		if(this.stopped){
			this.stopped = false;
			this.anim();
		}
	},
	stop: function(name){
		if(typeof name === 'undefined'){
			this.stopped = true;
		}else{
			var stillAnims = false;
			stopList[name] = true;
			for(var i=0; i<queue.length; i++){
				if(queue[i].name === name){
					queue[i].stopped = true;
				}
				if(!queue[i].stopped) stillAnims = true;
			}
			if(!stillAnims) this.stopped = true;
		}
	},
	clearQueue:function(stop){
		queue = [];
		if(stop){
			this.stopped = true;
		}
	}
};
