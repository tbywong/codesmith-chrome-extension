var request = new XMLHttpRequest();


request.open('GET', 'http://api.themoviedb.org/3/movie/now_playing?api_key=0fdbb8fb91fc7d7557228fd3d1fcaa52');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {

	// console.log(typeof response);

	if (this.readyState === 4) {
		var data = JSON.parse(this.responseText);
		var resultsArr = data.results;
		var titlesStr = "";


		for (var i = 0; i < resultsArr.length; i ++) {
			var title = '<div class="titles"><br>' + resultsArr[i].title + '</div>';
			var image = '<img src="https://image.tmdb.org/t/p/w185' + resultsArr[i].poster_path + "'>";
			var overview = '<div class="overview">' + resultsArr[i].overview + '</div>';

			var together = "<div class='movie-container'><center>" + image + title + overview + "</div>";
			titlesStr += together;
		}


		console.log(together);
		$(document).ready(function(){
			var $titles = $(`<div class="main-container"'${titlesStr}</div>`);
			$( "body" ).append( $titles );
		});
	}


};

//https://image.tmdb.org/t/p/w185/k1QUCjNAkfRpWfm1dVJGUmVHzGv.jpg
// https://image.tmdb.org/t/p/w185/cgxEscv6TQRK6a514FwuJOjcqQ5.jpg

// console.log('Status:', this.status);
// console.log('Headers:', this.getAllResponseHeaders());
// console.log('Body:', this.responseText);

request.send();
