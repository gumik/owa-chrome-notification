
chrome.tabs.query({"url": "*://*.outlook.office.com/*"}, function(tabs) {
	chrome.tabs.executeScript(tabs[0].id, {"file": "mailChecker.js"}, function(results){
		var statusElement = document.getElementById('status');
		var result = results[0];
		if (result) {
	  		if (result.nextEvent) {
	  			statusElement.textContent = result.nextEvent;
	  		} else {
	  			statusElement.textContent = "No next events";
	  		}
	  	} else {
	  		statusElement.textContent = "No result";
	  	}
	});
});
