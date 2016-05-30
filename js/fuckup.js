$(document).ready(function() {

	var html = "",
    $homepage = $('#lazerhome');
    $aboutpage = $('#grid-container'),
    url = window.location.href; 



    function strTemplate(audio, image,title, copy){
    	var str = '<div class="grid-item" data-music="';
    		str+= audio;
    		str+= '" data-time="4890" style="background-image: url(images/';
    		str+= image;
    		str+= ');"><div class="content"><h2>';
    		str+= title;
    		str+= '</h2><h3>';
    		str+= copy;
    		str+= '</h3></div></div>';
    	return str;
    }

    if ($aboutpage.length){

		// for(var prop in lazerObj){
			// Loop content in the about page
		for(var i = 0; i < lazerArray.length; i++){	
			
			var image = lazerArray[i].image;
			var audio = lazerArray[i].audio;
			var title = lazerArray[i].title;
			var copy = lazerArray[i].copy;

			html += strTemplate(audio, image,title, copy);
		}

		$('#grid-container').html(html);
	}


    if ($homepage.length){
        // determine how many objects then do a random order

		var newArray = lazerArray.slice(0);
		var lastArrayItem = newArray.pop();
		// newArray.sort(function() {return 0.5 - Math.random()});

		var arrayNums = [];

		for(var i = 0; i < newArray.length; i++){
			arrayNums.push(i);
		};

		arrayNums.sort(function() {return 0.5 - Math.random()});
		arrayNums.sort(function() {return 0.5 - Math.random()});
		arrayNums.sort(function() {return 0.5 - Math.random()});

		arrayNums.push(lazerArray.length-1);
		console.log(arrayNums);

        // console.log(numofobj);


        var arrayCookie = getCookie("lazerArray");
    	var positionCookie = getCookie("position");

	    if (!arrayCookie) {
	        // do cookie doesn't exist stuff;
	        var cookie = arrayNums.join('-');
	        document.cookie = 'position=0';
	        document.cookie = 'lazerArray='+cookie;
	    }


        $('#lazerhome').css('background-image', 'url(images/' + lastArrayItem.image);
        
        $('#lazerhome').click(function(){

		  
	        arrayCookie = arrayCookie.split('-');
	        var num = parseInt(positionCookie);
	        num ++;
	        if(num >= arrayCookie.length) num = 0;
	        document.cookie = 'position='+num;
		    

	        // Pause

        	window.history.pushState(null, lazerArray[num].title, '#'+num);


    		// Change the background and music out
    		$('#lazerhome').css('background-image', 'url(images/' + newArray[num].image);

        });


    }


    function getCookie(name){
    	var cookie = document.cookie;
    	var splitCookie = cookie.split(';');

    	for(var i = 0; i < splitCookie.length; i++){
    		var str = splitCookie[i];
    		str = str.replace(' ', '');
    		var cookieArray = str.split('=');
    		console.log(cookieArray);
    		if(cookieArray[0] == name) return cookieArray[1];
    	}

    	return false;
    }

	// function doSomething() {
	//     var myCookie = getCookie("MyCookie");

	//     if (myCookie == null) {
	//         // do cookie doesn't exist stuff;
	//     }
	//     else {
	//         // do cookie exists stuff
	//     }
	// }

});