$(document).ready(function() {

	var html = "",
    $homepage = $('#lazerhome');
    $aboutpage = $('#grid-container'),
    url = window.location.href; 



    function strTemplate(audio, image, title, copy){
    	var str = '<a href="index.html#';
			str+= image.slice(0, -4);
			str+= '" class="grid-item" data-music="';
    		str+= audio;
    		str+= '" data-time="4890" style="background-image: url(images/';
    		str+= image;
    		str+= ');"><div class="content"><h2>';
    		str+= title;
    		str+= '</h2><h3>';
    		str+= copy;
    		str+= '</h3></div></a>';
    	return str;
    }

    if ($aboutpage.length){

		// Loop content in the about page
		for(var i = 0; i < lazerArray.length; i++){	
			
			var image = lazerArray[i].image;
			var audio = lazerArray[i].audio;
			var title = lazerArray[i].title;
			var copy = lazerArray[i].copy;

			html += strTemplate(audio, image, title, copy);
		}

		$('#grid-container').html(html);
	}


    if ($homepage.length){
        // determine how many objects then do a random order

		var newArray = lazerArray.slice(0);
		var lastArrayItem = newArray.pop();
		newArray.sort(function() {return 0.5 - Math.random()});
		newArray.push(lastArrayItem);
		var position = 0;



        if(window.location.hash) {
		  // # exists
			$('#lazerhome').css('background-image', 'url(images/' + window.location.hash.slice(1) + '.gif');
		  console.log(window.location.hash);
		} else {
			// if there is no # condition in the url bar
			$('#lazerhome').css('background-image', 'url(images/' + lastArrayItem.image);
		}

        
        $('#lazerhome').click(function(){
        	// add url of object
        	// var number = Math.floor(Math.random() * newArray.length); 
        	
        	history.pushState(null, newArray[position].title, '#'+position);

    		// Change the background and music out
    		$('#lazerhome').css('background-image', 'url(images/' + newArray[position].image);
    		position ++;

    		if(position == newArray.length) position =0;

        });


    }


});