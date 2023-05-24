let toggleButton = document.getElementById("toggle-switch");

document.getElementById("toggle").addEventListener('change', function(){
    chrome.runtime.sendMessage({action: "executeToggleFunction"})
        .then(r => {
            console.log("Message From popup.js Successfully Executed")
        })
        .catch(() => console.error("Failed To Send Message From popup.js"));
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "getState") {
            console.log(toggleButton.style.backgroundColor.toString());
            sendResponse(toggleButton.style.backgroundColor.toString());
            return true;
        }
    }
);

chrome.runtime.onMessage.addListener((async function (request, sender, sendResponse) {
    if (request.action === "toggleSuccess") {
        let buttonColor = toggleButton.style.backgroundColor;

        buttonColor = (buttonColor === "red") ? "green" : "red";

        toggleButton.style.backgroundColor = buttonColor;
    }
}))
