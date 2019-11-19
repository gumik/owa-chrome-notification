var result = new Object();

var popup = document.getElementsByClassName("_3f4oNQyFnPLyIPvRZ8YOOA css-148")[0];
// console.log("popup")
// console.log(popup);
if (popup) {
	// console.log("inside if(popup)")
	var list = popup.getElementsByClassName("ms-FocusZone _14uhEaApptlZqDuQXtldnn")[0];
	var items = list.getElementsByClassName("ms-FocusZone _1MUx-t9H6_UdrA7g3e67PP");
	var notifications = new Array();

	console.log(items);
	for (var i = 0; i < items.length; ++i) {
		var item = items[i];
		var title = item.getElementsByClassName("kH9ik7LgvqNProNCDbGXc")[0].innerText;
		var time = item.getElementsByClassName("_1AyeoY-FsLZS-mbyeklU1N")[0].innerText;
		var timeToStart = item.getElementsByClassName("_3D_9mD1E0PxVYYUhhmiADz")[0].innerText;
		var place = item.getElementsByClassName("_6jukFT2JS2T2nVrY45vp7")[0].innerText;

		var notification = new Object();
		notification.title = title;
		notification.time = time;
		notification.timeToStart = timeToStart;
		notification.overdue = false;
		notifications.push(notification);
	}

	result.notifications = notifications;
}

var nextEventNode = document.evaluate('//*[@data-automation-id="UpNext"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (nextEventNode) {
	nextEventParts = [];
	var treeWalker = document.createTreeWalker(nextEventNode, NodeFilter.SHOW_TEXT, null, false);
	while (treeWalker.nextNode()) {
		var currentNode = treeWalker.currentNode;
		var textContent = currentNode.textContent
		if (currentNode.parentElement.offsetParent !== null && textContent.trim().length > 1 ) {
			nextEventParts.push(treeWalker.currentNode.textContent);
		}
	}
	result.nextEvent = nextEventParts.join(" - ")
}

result;