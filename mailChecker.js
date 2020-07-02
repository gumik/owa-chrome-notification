var result = new Object();
result.debug = [];

var popups = document.evaluate('//*[@data-storybook="reminder"]', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var popup = popups.iterateNext();
// console.log("popup")

var notifications = new Array();
while (popup) {
	result.debug.push("Popup detected");
	// console.log("inside if(popup)")
	var title       = popup.childNodes[0].childNodes[1].childNodes[0].childNodes[0].textContent
	var timeToStart = popup.childNodes[0].childNodes[1].childNodes[0].childNodes[1].textContent
	var time        = popup.childNodes[0].childNodes[1].childNodes[1].childNodes[0].textContent

	var notification = new Object();
	notification.title = title;
	notification.time = time;
	notification.timeToStart = timeToStart;
	notification.overdue = false;
	notifications.push(notification);


	popup = popups.iterateNext()
}

if (notifications.length > 0) {
	result.notifications = notifications;
} else {
	result.debug.push("No popup detected");
}

var nextEventNode = document.evaluate('//button[@data-automation-id="UpNext"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (nextEventNode) {
	result.debug.push("Next event node found");

	var nextEventSubNodes = nextEventNode.childNodes[0].childNodes[0].children;
	result.nextEvents = new Array();
	for (let nextEventSubNode of nextEventSubNodes) {
		nextEventParts = [];
		var treeWalker = document.createTreeWalker(nextEventSubNode.lastChild, NodeFilter.SHOW_TEXT, null, false);
		while (treeWalker.nextNode()) {
			var currentNode = treeWalker.currentNode;
			var textContent = currentNode.textContent
			if (currentNode.parentElement.offsetParent !== null && textContent.trim().length > 1 ) {
				nextEventParts.push(treeWalker.currentNode.textContent);
			}
		}
		result.debug.push("Event: " + nextEventParts.join(", "));
		var nextEvent = new Object();
		nextEvent.name = nextEventParts[0];
		nextEvent.time = nextEventParts[1];
		nextEvent.place = nextEventParts[2];
		result.nextEvents.push(nextEvent)
	}
} else {
	result.debug.push("No next event node found");
}

result;