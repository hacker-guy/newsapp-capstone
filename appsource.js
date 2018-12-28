/* Initial loading */
function initLoad() {
	// Load sources
	var jsonObj = "https://newsapi.org/v2/sources?language=en&apiKey=4cdd18177876469f965b824dda3ec945";
	$.getJSON(jsonObj, 
		function(json) {
			if (json != "Nothing found.") {
				if (json.sources.length == 0) {
					$(".sources").append("Nothing to see here :(");
				} else {
					addSources(json);
				}
			}
	});
}

// Add sources
function addSources(json) {
	// Hide loading
	$(".loading").attr('hidden', 'hidden');
	for (var i = 0; i < json.sources.length; i++) {
		// Create the article
		$(".sources").append("<a href=" + json.sources[i].url + "><br>" 
			+ json.sources[i].name + "<br></a>"
		);
	}
}

// When document is ready
$(function() {
	initLoad();
});