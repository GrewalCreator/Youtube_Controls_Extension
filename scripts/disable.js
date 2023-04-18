// Code to Disable Controls
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

(async function disableControls(){
    // Avoid Duplicating Style
        for(let i = 0; i < document.styleSheets.length; i++){
            if(document.styleSheets[i].href === "../view/css/disable.css"){
                return;
            }
        }

        chrome.tabs.query({active: true, currentWindow: true}, async function () {
            await chrome.scripting.insertCSS({
                target: {tabId: getCurrentTab().id},
                files: ["../view/css/disable.css"]
            }).then(() => console.log("CSS Successfully Injected"))
                .catch(() => console.error("Error Injecting CSS"));
        });


}
)();
