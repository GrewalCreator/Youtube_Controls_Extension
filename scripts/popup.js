
document.getElementById("toggle").addEventListener('change', function(){
    chrome.runtime.sendMessage({action: "executeToggleFunction"})
        .then(r => {
            console.log("Message From popup.js Successfully Executed")
        })
        .catch(() => console.error("Failed To Send Message From popup.js"));
});



