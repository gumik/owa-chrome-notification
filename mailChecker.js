var result = new Object();

var popup = document.getElementsByClassName("o365cs-notifications-notificationPopupArea")[0];
// console.log(popup);
if (popup) {
	if (!popup.getAttribute("style").includes("display: none")) {
		var list = popup.getElementsByClassName("o365cs-notifications-reminders-listPanel")[0];
		var items = list.getElementsByClassName("o365cs-notifications-reminders-container");
		var notifications = new Array();

		// console.log(items);
		for (var i = 0; i < items.length; ++i) {
			var item = items[i];
			var title = item.getElementsByClassName("o365cs-notifications-reminders-title")[0].innerText;
			var time = item.getElementsByClassName("o365cs-notifications-reminders-timeDuration")[0].innerText;
			var timeToStart = item.getElementsByClassName("o365cs-notifications-toastReminders-timeToStartValue")[0].innerText
							+ " "
			                + item.getElementsByClassName("o365cs-notifications-reminders-timeToStartUnit")[0].innerText;
			var overdue = !item.getElementsByClassName("o365cs-notifications-toastReminders-overdue")[0].getAttribute("style").includes("display: none");

			var notification = new Object();
			notification.title = title;
			notification.time = time;
			notification.timeToStart = timeToStart;
			notification.overdue = overdue;
			notifications.push(notification);
		}

		result.notifications = notifications;
	}
}

var nextEventNode = document.getElementsByClassName("_n_x1")[0];
if (nextEventNode) {
	nextEventParts = [];
	var treeWalker = document.createTreeWalker(nextEventNode, NodeFilter.SHOW_TEXT, null, false);
	while (treeWalker.nextNode()) {
		var currentNode = treeWalker.currentNode;
		var textContent = currentNode.textContent
		if (currentNode.parentElement.offsetParent !== null && textContent.trim() != "") {
			nextEventParts.push(treeWalker.currentNode.textContent);
		}
	}
	result.nextEvent = nextEventParts.join(" ")
}

result;