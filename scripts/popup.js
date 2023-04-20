let toggleButton = document.getElementById("toggle-switch");

document.getElementById("toggle-switch").addEventListener('click', function(){
    chrome.runtime.sendMessage({action: "executeToggleFunction"})
        .then(r => {
            console.log("Message From popup.js Successfully Executed")
        })
        .catch(() => console.error("Failed To Send Message From popup.js"));
});



chrome.runtime.onMessage.addListener((async function (request, sender, sendResponse) {
    if (request.action === "getState") {
        return toggleButton.style.backgroundColor;
    }
}))

chrome.runtime.onMessage.addListener((async function (request, sender, sendResponse) {
    if (request.action === "toggleSuccess") {
        let buttonColor = toggleButton.style.backgroundColor;

        buttonColor === "red" ? buttonColor = "green" : buttonColor = "red";

        toggleButton.style.backgroundColor = buttonColor;
    }
}))
