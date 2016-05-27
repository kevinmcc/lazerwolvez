lazerObj = {
	
	'bang-bang-wolf': {
		image:'url/path/to/image.gif',
		audio:'url/path/to/audio-loop.mp3'
	}
	
}



for(var prop in lazerObj){
	var url = prop;

	var image = lazerObj[prop].image;
	var audio = lazerObj[prop].audio;


	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}