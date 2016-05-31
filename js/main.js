//expand wolf on index page
$('.wolfgif').click(function(){
	offset = $(this).offset();
	width = $(this).width();
	height = $(this).height();

	bg = $(this).css('background');
	$('body').prepend('<div class="full"></div>');

	$('.full').css({"background": bg});
	$('.full').css({"width": "500px", "height": "500px"});
	$('.full').css({"top": offset.top-$(window).scrollTop()});//scrollTop allows negative
	$('.full').css({"left": offset.left});
	$('.full').css({"width": width});
	$('.full').css({"height": height});

	$('.full').animate({
		left: 0,
		top: 0,
		width: "100vw",
		height: "100vh",
		backgroundSize: "15%",
	}, 400);
});

function randomHue(){
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
 }

$('.wolfgif').hover(
	function(){
		//something
},
	function(){
		//something
	}
);