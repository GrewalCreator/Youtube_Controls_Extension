async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function injectCSS(css, currentTab){
    await chrome.scripting.insertCSS({
        target: {tabId: currentTab.id},
        files: [`./view/css/disable.css`]
    })
        .then(r => console.log("Successfully Injected CSS: " + r))
        .catch(err => console.log("Error Injecting CSS " + err));
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "contextMenu",
        "title": "Context Menu",
        "contexts": ["selection"]
    });
});


//Listener For When The Toggle Switch State is Changed
chrome.runtime.onMessage.addListener((async function (request, sender, sendResponse) {
    if (request.action === "executeToggleFunction") {
        const currentTab = await getCurrentTab();
        // send message get state
        try {
            const isEnabled = (await chrome.runtime.sendMessage({action: "getState"})) === "green";

            // if disabled, -> enable and inject
            if (!isEnabled) {

                await injectCSS("enable", currentTab);
            }
            // else -> disable and inject
            else {
                await injectCSS("disable", currentTab);
            }

            // send message toggle success
            await chrome.runtime.sendMessage({action: "toggleSuccess"});
        }catch(err){
            console.error("Toggle Error: " + err)
        }

    }
}))

