var agent;

$(document).ready(function(){

	var wolves = [] ;
	var wrappers = [];

	var triggerDistance;
	var triggerOffset;
	var laxAmount = 0;
	var wolfSelected = false;
	var activeIndex;

	var mouse = {
		x:0,
		y:0
	};
	var lastMouse = {
		x:0,
		y:0
	};

	var scrollVal = agent.isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;

	var windowWidth = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var windowHeight = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;




	///////////////////////// INITIAL
	getWrappers();
	getWolves();
	wolfHover();
	getTriggerDistance();
	activeWrapper();





	///////////////////////// EVENTS 
	//mouse move
	window.addEventListener('mousemove', function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	$(window).on('touchmove', function(e){
		var x = e.originalEvent.changedTouches[0].clientX;
		var y = e.originalEvent.changedTouches[0].clientY;
		mouse.x = x;
		mouse.y = y;
	});

	window.onscroll = function(e) {
		wolfSelected ? disableScroll() : enableScroll();
		activeWrapper();
		wolfTitle();

		scrollVal = agent.isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;
		var wrapperNumber = Math.floor(scrollVal/triggerDistance);
		console.log(wrapperNumber)
	};

	//window resize
	window.onresize = function() {
		getTriggerDistance();
		wolves = [];//reset positions & sizes on resize
		getWolves();
		activeWrapper();
		wolfHover();
	};






	///////////////////////// SHARING URL LINKS 

	var elem = '#' + window.location.hash.replace('#', '');
	console.log(elem)
	if(elem && elem != '#') {
		var top = $(elem).offset().top;
		window.scrollTo(0, top);

		scrollVal = agent.isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;
		var wrapperNumber = Math.floor(scrollVal/triggerDistance);
		wolfTitle();
	}






	///////////////////////// WRAPPERS 
	//set Wrappers to Fixed
	function getTriggerDistance()
	{
		triggerDistance = document.getElementsByClassName('grid')[0].getElementsByTagName('li')[0].offsetHeight;
		triggerOffset = document.getElementsByClassName('grid')[0].getElementsByTagName('li')[0].offsetTop;
	}

	function getWrappers()
	{
		$('.wrapper').each(function(){
			var el = $(this);
			var offset = el.offset();
			var height = el.height();

			var obj = {
				el: this,
				top: offset.top,
				height: height,
				isActive: false
			};
			wrappers.push(obj);
		});
	}

	function activeWrapper()
	{
		scrollVal = agent.isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;
		var wrapperNumber = Math.floor((scrollVal+5)/triggerDistance)-1;
		if(wrapperNumber > -1) wrappers[wrapperNumber].isActive = true; activeIndex = wrapperNumber;

		if(wolfSelected) return;

		for(var i = 0; i< wrappers.length; i++){
			if(wrapperNumber < 0 || wrapperNumber >= wrappers.length)//at TOP or BOTTOM of page
			{
				wrappers[i].el.classList.remove("fixed");
				wrappers[i].el.classList.add("hidden");
				wolves[i].isActive = false;

				$('.about').removeClass('hidden');
				$('.about').addClass('fixed');
			}
			else if(i != wrapperNumber)
			{
				wrappers[i].isActive = false; 
				wolves[i].isActive = false;

				wrappers[i].el.classList.add("hidden");
				wrappers[i].el.classList.remove("fixed");
			} 
			else if(wrappers[i].isActive)
			{
				wrappers[i].el.classList.remove("hidden");
				wrappers[i].el.classList.add("fixed");
				wolves[i].isActive = true;
				$('.about').removeClass('fixed');
				$('.about').addClass('hidden');

				AF.start();
			}
		}
	}






	///////////////////////// WOLVES
	function getWolves()
	{
		$('.wolfparent').each(function(){
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
				translateZ: -200,
				translateY: 0,
				isActive: false
			};
			wolves.push(obj);
		});
	}

	function wolfHover(){
		notActive = 0;
		for(var i = 0; i< wolves.length; i++){
			var wolf = wolves[i];
			// NOT ACTIVE
			if( !wolf.isActive && ((Math.abs(wolf.rotationY)) < .01 || (Math.abs(wolf.rotationX)) < .01))  {
				notActive++;
				if(!wolfSelected) wolf.el.style.transform = 'translateZ(-200px)';
				if(notActive == wolves.length){AF.stop();}
			}
			//is NOT ACTIVE but has rotation values left
			else if(!wolf.isActive && ((Math.abs(wolf.rotationY) > .5) || (Math.abs(wolf.rotationX) > .5)) || wolfSelected){

				wolf.rotationX += (0-wolf.rotationX)/15;//set to 0 in 15 frames
				wolf.rotationY += (0-wolf.rotationY)/15;//set to 0 in 15 frames
				wolf.translateY += (0-wolf.translateY)/15;//set to 0 in 15 frames

				if(wolfSelected){
					wolf.translateZ += (0-wolf.translateZ)/10; 
					wolf.translateY += (0-wolf.translateY)/10;
				}

				wolf.el.style.transform =  'translateZ('+Math.round(wolf.translateZ)+'px) rotateX('+Math.round(wolf.rotationX)+'deg) rotateY('+Math.round(wolf.rotationY)+'deg) translateY('+Math.round(wolf.translateY)+'px)';
			}
			//IS ACTIVE
			else{
				//OLD: scroll based transform
				// coordY = (((wolf.top-$(document).scrollTop()-mouse.y)/wolf.height)*2)+1;
				// coordX = ((mouse.x-wolf.left)/wolf.width*2)-1;
				coordY = (mouse.y/windowHeight)*2-1;
				coordX = (mouse.x/windowWidth)*2-1;

				maxDeg = 15;

				//switched X and Y on purpose
				wolf.rotationY += ((coordX*maxDeg)-wolf.rotationY)/10;
				wolf.rotationX += ((coordY*maxDeg)-wolf.rotationX)/10;
				wolf.translateY += ((laxAmount*-1)-wolf.translateY)/15;

				wolf.el.style.transform = 'translateZ(-200px) rotateX('+wolf.rotationX+'deg) rotateY('+wolf.rotationY+'deg) translateY('+wolf.translateY+'px)';
			}
		}
	}


	AF.add('wolfHover', function(){
		wolfHover();
	});






	///////////////////////// PARALLAX
	function wolfTitle(){
		if(wolfSelected) return;
		//how far scrolled in the active wrapper? from 0 to 1
		var distanceInWrapper = ((scrollVal)%triggerDistance)/triggerDistance;
		var max = window.innerHeight*-.03;
		
		laxAmount += ((max*distanceInWrapper)-laxAmount)/20;

		$('.fixed > a > .wolftitle').each(function(){
			$(this).css("transform","translateY("+($(this).height()/-2.8+laxAmount)+"px)");
		});
		$('.hidden > a > .wolftitle').each(function(){
			$(this).css("transform","translateY("+($(this).height()/-2.8)+"px)");
		});
	}
	AF.add('wolfTitle', function(){
		wolfTitle();
	});






	///////////////////////// CLICK FULL
	$('.wrapper a').click(function(e) {
		e.preventDefault();

		if($(this).parent().hasClass('full'))
		{
			console.log('do something');
		}
		else{

			var parent = document.getElementsByClassName('wolfparent')[activeIndex];
			var wolfgif = document.getElementsByClassName('wolfgif')[activeIndex];
			var title = document.getElementsByClassName('wolftitle')[activeIndex];
			var music = document.getElementsByClassName('wolfmusic')[activeIndex];

			title.style.opacity = '0';
			music.style.opacity = '0';


			//wait for title and music to fade
			setTimeout(function() 
			{
				title.style.display = 'none';
				music.style.display = 'none';

				parent.style.opacity = '0';
				wolfgif.style.opacity = '1';
				parent.style.opacity = '1';

				parent.style.width = '100vw';
				parent.style.height = '100vh';
				parent.classList.add('full');

				wolfSelected = true;
				AF.add('fullScreen', function(){
					fullScreen();
				});
				fullScreen();
			}, 500);


		}

		function fullScreen(){
			console.log('were live');

			var full = document.getElementsByClassName('full')[0];
			if(mouse.x > windowWidth/2){
				full.classList.remove('leftarrow');
				full.classList.add('rightarrow');

				
			}
			else{
				full.classList.add('leftarrow');
				full.classList.remove('rightarrow');

				
			}
		}

	});

});





////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////






///////////////////////// ANIMATION FRAME
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


///////////////////////// AGENT

navigator.sayswho = (function() {
	var N = navigator.appName,
	ua = navigator.userAgent,
	tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) M[2] = tem[1];
	M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
	return M;
})();

var platform = 'unknown',
browser = navigator.sayswho[0],
browserVersion = navigator.sayswho[1],
device;

browser = browser.toLowerCase();

if (navigator.appVersion.indexOf("Win") != -1) platform = "windows";
if (navigator.appVersion.indexOf("Mac") != -1) platform = "mac";
if (navigator.appVersion.indexOf("X11") != -1) platform = "unix";
if (navigator.appVersion.indexOf("Linux") != -1) platform = "linux";
if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
	platform = 'ios';
}
if (navigator.appVersion.indexOf("Android") != -1) platform = "android";

function isIE() {
	return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null)));
};

if (isIE()) {
     // $('html').addClass('internet-explorer');

   }

   device = (platform === 'ios' || platform === 'android') ? true : false;

   agent = {
   	isDevice: function() {
   		return device;
   	},
   	isMobile: function() {
   		var w = $(window).width();
   		var h = $(window).height();
   		if (device) {
   			var portrait = (h > w) ? true : false;
   			if (portrait && w < 480 || !portrait && w < 768) return true;
   			else return false;
   		} else return false;
   	},
   	isTablet: function() {
   		var scope = this;
   		if (device && !scope.isMobile()) return true;
   		else return false;
   	},
   	isChrome: function() {
   		var chrome = (browser === 'chrome') ? true : false;
   		return chrome;
   	},
   	isSafari: function() {
   		var safari = (browser === 'safari') ? true : false;
   		return safari;
   	},
   	isFirefox: function() {
   		var ff = (browser === 'firefox') ? true : false;
   		return ff;
   	},

   	isIe: function() {
   		return isIE();
   	},

   	isAndroid: function(){
   		return platform === 'android';
   	}
   };



///////////////////////// DISABLE SCROLL

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
  if (window.addEventListener) // older FF
  	window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.onmousewheel = document.onmousewheel = null; 
	window.onwheel = null; 
	window.ontouchmove = null;  
	document.onkeydown = null;  
}