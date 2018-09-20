const INIT_N = 10;

$(document).ready(function() { 
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   	/* Update content when scrolling */
	   }
	});
});

function initLoad() {
	$.getJSON("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4cdd18177876469f965b824dda3ec945", 
		function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				$(".articles").html("");
				if (json.articles.length == 0) {
					$(".articles").html("Nothing to see here :(");
				}
				addArticles(INIT_N, json);
			}
	});
}

function addArticles(n, json) {
	for (var i = 0; i < json.articles.length && i < n; i++) {
		 // Loading the description of the article 
		var descr = '';
		if (json.articles[i].description != null) {
			descr = "<span class=\"adescr\">" + json.articles[i].description + "</span>";
		}
		// Loading the picture of the article
		var pict = '';
		if (json.articles[i].urlToImage != null) {
			pict = "<img class=\"apict\" src=\"" + json.articles[i].urlToImage + "\">";
		}
		// Create the article
		$(".articles").append("<a href=\"" + json.articles[i].url +
			"\" class=\"aArticle\"><div class=\"newsstory\">" + 
			"<span class=\"atitle\">" + 
			json.articles[i].title + 
			"</span>" +
			pict +
			descr + 
			"<div class = \"asource\">" + 
			json.articles[i].source.name + 
			"</div></div></a>"
		);
	}
}

$(function() {
	initLoad();
});