$(document).ready(function() { 
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   	/* Update content when scrolling */
	   }
	});
});

function initLoad() {
	var jsonObj = "https://newsapi.org/v2/sources?language=en&apiKey=4cdd18177876469f965b824dda3ec945";
	$.getJSON(jsonObj, 
		function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				$(".sources").html("");
				if (json.sources.length == 0) {
					$(".sources").append("Nothing to see here :(");
				}
				addSources(json);
			}
	});
}

function addSources(json) {
	for (var i = 0; i < json.sources.length; i++) {
		// Create the article
		$(".sources").append("<a href=" + json.sources[i].url + "><br>" 
			+ json.sources[i].name + "<br></a>"
		);
	}
}

$(function() {
	initLoad();
});