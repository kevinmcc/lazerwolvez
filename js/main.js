$(document).ready(function(){
//expand wolf on index page
$('a[href="javascript:openwolf();"').click(function(){
	wolf = $(this).parent().find('.wolfgif');
	alert(wolf.prop('tagName'));

	offset = $(wolf).offset();
	width = $(wolf).width();
	height = $(wolf).height();

	bg = $(wolf).css('background');
	$('body').prepend('<a href="#"><div class="full"></div></a>');

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

num = 1;
$('body').on('click','.full', function(){
	num = (num%6)+1;
	//$('.full').css({"width": "100px"})
	$('.full').css({"background": "url('./images/"+num+".gif')"})
});

$('a[href="#home"]').click(function(){
	target = $('.grid').find('.wolfgif');

	$('.full').animate({
		left: target.offset().left,
		top: target.offset().top-$(window).scrollTop(),
		width: target.width(),
		height: target.height(),
	}, 400,function(){
		$('.full').remove();
	});
});

});