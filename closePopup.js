var popup = document.getElementsByClassName("o365cs-notifications-notificationPopupArea")[0];

if (popup) {
    var dismissButton = popup.getElementsByClassName("o365cs-notifications-reminders-dismissAll")[0];

    if (dismissButton) {
        dismissButton.click()
    }
}
