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

	//EVENTS
	//mouse move
	window.addEventListener('mousemove', function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	$(window).on('touchmove', function(e){
		// e.preventDefault();
		var x = e.originalEvent.changedTouches[0].clientX;
		var y = e.originalEvent.changedTouches[0].clientY;
		mouse.x = x;
		mouse.y = y;
	});

	//GYRO??
	//http://stackoverflow.com/questions/4378435/how-to-access-accelerometer-gyroscope-data-from-javascript

	//window resize
	window.onresize = function() {
		wolves = [];//reset positions & sizes on resize
		getWolfPreviews();
	};

	//INIT
	getWolfPreviews();

	//WOLF PREVIEWS
	function getWolfPreviews()
	{
		$('img.wolf-preview').each(function(){
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
	}
	
	$('.wolf-parent').hover(function(){
		var child = $(this).parent().parent().find('img.wolf-preview');
		var i = $('img.wolf-preview').index(child);
		wolves[i].isActive = true ;

		AF.start();
	}, function(){
		var child = $(this).parent().parent().find('img.wolf-preview');
		var i = $('img.wolf-preview').index(child);
		wolves[i].isActive = false ;
	});

	function wolfHover(){
		notActive = 0;
		for(var i = 0; i< wolves.length; i++){
			var wolf = wolves[i];
			//is NOT ACTIVE but has rotation values left
			if((!wolf.isActive) && (Math.abs(wolf.rotationY) > .5 || Math.abs(wolf.rotationX) > .5)){

				wolf.rotationX += (0-wolf.rotationX)/15;//set to 0 in 20 frames
				wolf.rotationY += (0-wolf.rotationY)/15;//set to 0 in 20 frames

				wolf.el.style.transform = 'rotateX('+wolf.rotationX+'deg) rotateY('+wolf.rotationY+'deg)';
			}
			// NOT ACTIVE
			else if( !wolf.isActive ) {
				notActive++;
				//if no wolves are active, stop animation frame
				if(notActive == wolves.length){AF.stop();}
			}
			//IS ACTIVE
			else{
				coordY = (((wolf.top-$(document).scrollTop()-mouse.y)/wolf.height)*2)+1;
				coordX = ((mouse.x-wolf.left)/wolf.width*2)-1;
				maxDeg = 25;

				//switched X and Y on purpose
				wolf.rotationY += ((coordX*maxDeg)-wolf.rotationY)/10;
				wolf.rotationX += ((coordY*maxDeg)-wolf.rotationX)/10;

				wolf.el.style.transform = 'rotateX('+wolf.rotationX+'deg) rotateY('+wolf.rotationY+'deg)';
			}
		}
	}

	$('.wolf-parent').click(function(){
		var child = $(this).find('img.wolf-preview');
		var i = $('img.wolf-preview').index(child);


		wolfimage = $(this).parent().parent().find('img.wolf-preview').attr("src");

		var div = document.createElement('div'); div.className = 'full';
		div.style.width = wolves[i].width+'px'; div.style.height = wolves[i].height+'px';
		div.style.left = wolves[i].left+'px'; div.style.top = wolves[i].top-document.body.scrollTop+'px';

		div.style.backgroundImage = 'url('+wolfimage+')';
		div.style.backgroundSize = wolves[i].width+'px, '+wolves[i].height+'px';

		document.body.appendChild(div);
	});

	AF.add('wolfHover', function(){
		wolfHover();
	});	

});//end document ready




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
