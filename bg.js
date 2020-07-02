
var notificationId = "owa-reminder-notification";
var reminder = false;
var owaTab = null;

function closeNotification(msg) {
	// document.body.innerText = msg;
	reminder = false;
	chrome.notifications.clear(notificationId);
}

function sendData(data) {
	var http = new XMLHttpRequest();
	var url = "http://localhost:8000/set";
	var params = "key=owa&value=" + encodeURIComponent(data);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send(params);
}

function sendEmptyEventData(msg) {
	sendData("<" + msg + ">");
}

function handleNotificationClick(id, buttonId) {
	if (id == notificationId && owaTab) {
		chrome.tabs.executeScript(owaTab, {"file": "closePopup.js"});
	}
}

function showNotification(notifications) {
	// document.body.innerText = JSON.stringify(notifications);
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
	requireInteraction: true,
    //buttons: [{title: "Dismiss"}]
	};

	if (!reminder) {
		chrome.notifications.create(notificationId, options);
	} else {
		chrome.notifications.update(notificationId, options);
	}
}

function handleMailCheckerResult(results) {
	if (results && results.length != 0 && results[0]) {

		var result = results[0];
		document.body.innerText = result.debug.join("<br>\n");
		if (result.notifications) {
			showNotification(result.notifications);
		} else {
			closeNotification("No notifications");
		}

		if (result.nextEvents) {
			nextEventsStr = new Array();
			for (let nextEvent of result.nextEvents) {
				var name = nextEvent.name;
				if (name.length > 20) {
					name = name.substr(0, 17) + "..."
				}
				var time = nextEvent.time;
				if (time[time.length-1] == ",") {
					time = time.substr(0, time.length-1);
				}
				nextEventsStr.push(name + " (" + time + ")");
			}
			sendData(nextEventsStr.join(" | "));
		} else {
			sendEmptyEventData("No next event data");
		}
	} else {
		document.body.innerText = "No response from executeScript";
		closeNotification("No response from executeScript");
		sendEmptyEventData("No response from executeScript");
	}
}

function handleTabsResult(tabs) {
	if (tabs.length > 0) {
		owaTab = tabs[0].id;
		// document.body.innerText = owaTab.title;
		chrome.tabs.executeScript(owaTab, {"file": "mailChecker.js"}, handleMailCheckerResult);
	} else {
		owaTab = null;
		document.body.innerText = "No response from executeScript";
		closeNotification("No Outlook website open");
		sendEmptyEventData("No Outlook website open");
	}
}

function checkReminders() {
	chrome.tabs.query({"url": "*://outlook.office.com/mail/*"}, handleTabsResult);
}

// console.log("add notification");
chrome.notifications.onButtonClicked.addListener(handleNotificationClick);
setInterval(checkReminders, 10000);
