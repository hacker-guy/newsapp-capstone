
// Contants
const PAGE_N = 5;
const HANDLER =  _.throttle(checkScroll, 500);
// Globals
var page = 1, countrycode = "";
var listener = false, loading = true, finished = false;

// Scroll checking
function checkScroll() {
	if($(window).scrollTop() + $(window).height() >= $(document).height()*0.85 && finished != true) {
		$(".loading").removeAttr('hidden');
	   	/* Update content when scrolling */
	   	page += 1;
	  	aLoad();
	}
}

// Loading article function
function aLoad() {
	// News API JSON
	var jsonObj = ''
	jsonObj = "https://newsapi.org/v2/top-headlines?country=" + countrycode + "&pagesize=" + PAGE_N +"&page=" + page + "&apiKey=4cdd18177876469f965b824dda3ec945";
	$.getJSON(jsonObj, 
		function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				if (json.articles.length == 0) {
					// Check if window is listening
					if (listener == true) {
						// Wrap it all up
						finished = true;
						window.removeEventListener("scroll", HANDLER);
						listener = false;
						// Hide loading
						$(".loading").attr('hidden', 'hidden');
						$(".articles").append("<br><center><b>There doesn't seem to be anything here.<b></center>");
					}
				} else {
					// Add them in
					addArticles(json);
				}
			}
	});
}

function addArticles(json) {
	$(".loading").attr('hidden', 'hidden');
	for (var i = 0; i < json.articles.length; i++) {
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

// When document is ready
$(function() {
	// What page you on?
	var hrefloc = $(location).attr('href');
	var pageon = hrefloc.substr(hrefloc.lastIndexOf('/') + 1);
	window.addEventListener("scroll", HANDLER);
	listener = true;
	if (pageon == "index.html") {
		// AUS is default buddy
		countrycode = "au";
		aLoad();
	// Check for country page
	} else if (pageon == "country.html") {
		// Add button listener
	 	$('.dropbtn').bind('click', function() {
	 		$(".loading").removeAttr('hidden');
	 		// Add scroll listener if last time it ended
	 		if (listener == false) {
	 			window.addEventListener("scroll", HANDLER);
	 			listener = true;
	 			// We back on it
	 			finished = false;
	 		}
	 		// start over
	 		$(".articles").html("")
	 		page = 1;
	 		// get that country
	 		countrycode = $('select').children("option:selected").val();
			aLoad()});
	}
});