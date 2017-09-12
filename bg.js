
var notificationId = "owa-reminder-notification";
var reminder = false;

function closeNotification(msg) {
	document.body.innerText = msg;
	reminder = false;
	chrome.notifications.clear(notificationId);
}

function showNotification(notifications) {
	document.body.innerText = JSON.stringify(notifications);
	var message = String();

	notifications.forEach(function(notification) {
		var overdue = "";
		if (notification.overdue) {
			overdue = " overdue";
		}
		message += notification.title + "\n" + notification.time
		         + " (" + notification.timeToStart + overdue + ")\n\n";
	});
	message.trimRight();

	var title = "Reminder";
	if (notifications.length > 1) {
		title = "Reminders";
	}

	var options = {
	type: "basic",
	iconUrl: "icon.png",
	title: title,
	message: message,
    requireInteraction: true};

	if (!reminder) {
		chrome.notifications.create(notificationId, options);
	} else {
		chrome.notifications.update(notificationId, options);
	}
}

function handleMailCheckerResult(results) {
	if (results.length !== 0) {

		var result = results[0];
  		if (result.notifications) {
  			showNotification(result.notifications);
  		} else {
  			closeNotification("No notifications");
  		}
	} else {
		closeNotification("No response from executeScript");
	}
}

function handleTabsResult(tabs) {
	if (tabs.length > 0) {
		chrome.tabs.executeScript(tabs[0].id, {"file": "mailChecker.js"}, handleMailCheckerResult);
	} else {
		closeNotification("No Outlook website open");
	}
}

function checkReminders() {
	chrome.tabs.query({"url": "*://*.outlook.office.com/*"}, handleTabsResult);
}

setInterval(checkReminders, 10000);
