loop = new SeamlessLoop();

var audio  = document.createElement("audio");

if(true) {
  // loop.addUri("loops/sample.wav", 4890, "sound1");
}

function soundsLoaded() 
{
  // loop.start("sound1");
};


$('.grid-item').hover(
	function(e){
		var music = $(this).attr('data-music'),
			time = $(this).attr('data-time');
		// loop.addUri("loops/"+music, time, "sound1");
		console.log('music: '+music+' // time: '+time);
	 	// loop.start("sound1");
	 },	
	 function(e){ console.log('stop'); }
);


// $('.grid-item').mouseleave(function(){
// 	loop.stop();
// });


loop.callback(soundsLoaded);

$("body").click(function(){
  loop.stop();
});


// ---

$('#sharemenu').hover( // menu items
    function(e){ $(this).addClass('show'); },
    function(e){ $(this).removeClass('show'); }
);

// ---


//testing 


// var $poster = $('.poster'),
//   $shine = $('.shine'),
//   $layer = $('div[class*="layer-"]'),
//   w = $(window).width(), //window width
//   h = $(window).height(); //window height

// $(window).on('mousemove', function(e) {
//   var offsetX = 0.5 - e.pageX / w, //cursor position X
//     offsetY = 0.5 - e.pageY / h, //cursor position Y
//     dy = e.pageY - h / 2, //@h/2 = center of poster
//     dx = e.pageX - w / 2, //@w/2 = center of poster
//     theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
//     angle = theta * 180 / Math.PI - 90, //convert rad in degrees
//     offsetPoster = $poster.data('offset'),
//     transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

//   //get angle between 0-360
//   if (angle < 0) {
//     angle = angle + 360;
//   }

//   //gradient angle and opacity
//   $shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

//   //poster transform
//   $poster.css('transform', transformPoster);

//   //parallax foreach layer
//   $layer.each(function() {
//     var $this = $(this),
//       offsetLayer = $this.data('offset') || 0,
//       transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

//     $this.css('transform', transformLayer);
//   });

// });