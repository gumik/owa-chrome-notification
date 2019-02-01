var buttons = document.getElementsByClassName("ms-Button-label label-43");

for (var i = 0; i < buttons.length; ++i) {
    button = buttons[i];
    if (button.innerText == "Dismiss all") {
        // console.log("found button, clicking");
        button.click();
    }
}
