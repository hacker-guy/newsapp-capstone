const INIT_N = 10;
var page = 1;

$(document).ready(function() { 
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   	/* Update content when scrolling */
	   	page += 1;
	   	aLoad();
	   }
	});
});

function aLoad() {
	// var hrefloc = $(location).attr('href');
	// var page = hrefloc.substr(hrefloc.lastIndexOf('/') + 1);
	var jsonObj = ''
	// if (page == "index.html") {
	jsonObj = "https://newsapi.org/v2/top-headlines?country=au&pagesize=10&page=" + page + "&apiKey=4cdd18177876469f965b824dda3ec945";
	// } else if (page == "source.html") {
	// 	jsonObj = "https://newsapi.org/v2/sources?apiKey=4cdd18177876469f965b824dda3ec945";
	// } else if (page == "category.html") {

	$.getJSON(jsonObj, 
		function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				if (json.articles.length == 0) {
					$(".articles").append("<br><center>Nothing to see here :(</center>");
				}
				addArticles(INIT_N, json);
			}
	});
}

function addArticles(n, json) {
	console.log(page);
	console.log(n);
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
		console.log("done");
	}
}

$(function() {
	aLoad();
});