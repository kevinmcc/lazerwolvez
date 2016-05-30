lazerObj = {
	
	'url1': {
		image:'1.gif',
		audio:'loop/sound1.wav'
	},

	'url2': {
		image:'2.gif',
		audio:'loop/sound2.wav'
	},

	'url3': {
		image:'3.gif',
		audio:'loop/sound3.wav'
	},

	'url4': {
		image:'4.gif',
		audio:'loop/sound4.wav'
	}
	
}

var html = "";

for(var prop in lazerObj){
	var url = prop;
	var image = lazerObj[prop].image;
	var audio = lazerObj[prop].audio;

	html += '<div class="grid-item" data-music="sound1.wav" data-time="4890" style="background-image: url(images/'+image+');"><div class="content"><h2>'+audio+'</h2><h3>Music: was this</h3></div></div>';

	$('#grid-container').html(html);

}
