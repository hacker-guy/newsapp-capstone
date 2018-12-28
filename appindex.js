
const INIT_N = 10;
const handler =  _.throttle(checkScroll, 500);
var page = 1, countrycode = "";
var listener = false;

function checkScroll() {
	if($(window).scrollTop() + $(window).height() >= $(document).height()*0.85) {
	   	/* Update content when scrolling */
	   	page += 1;
	  	aLoad();
	}
}

function aLoad() {
	var jsonObj = ''
	console.log(countrycode);
	console.log(page);
	jsonObj = "https://newsapi.org/v2/top-headlines?country=" + countrycode + "&pagesize=10&page=" + page + "&apiKey=4cdd18177876469f965b824dda3ec945";
	$.getJSON(jsonObj, 
		function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				if (json.articles.length == 0) {
					if (listener == true) {
						window.removeEventListener("scroll", handler);
						listener = false;
						$(".articles").append("<br>That's all folks!");
					}
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
	var hrefloc = $(location).attr('href');
	var pageon = hrefloc.substr(hrefloc.lastIndexOf('/') + 1);
	window.addEventListener("scroll", handler);
	listener = true;
	if (pageon == "index.html") {
		countrycode = "au";
		aLoad();
	} else if (pageon == "country.html") {
	 	$('.dropbtn').bind('click', function() {
	 		$(".articles").html("")
	 		if (listener == false) {
	 			window.addEventListener("scroll", handler);
	 			listener = true;
	 		}
	 		page = 1;
	 		countrycode = $('select').children("option:selected").val();
			aLoad()});
	}
});