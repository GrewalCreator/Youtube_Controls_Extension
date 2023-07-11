let currState = 1;
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function injectCSS(change){
    const currentTab = await getCurrentTab();

    await chrome.scripting.insertCSS({
        target: {tabId: currentTab.id},
        files: [`./view/css/${change}.css`]
    })
        .then(r => {
            //chrome.runtime.sendMessage({action: "toggleSuccess"})
            console.log("Successfully Injected CSS: " + r)
        })
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



        let change;
        if(currState === 0){
            change = "enable";
            currState = 1;
        }else{
            currState = 0;
            change = "disable"
        }

        await injectCSS(change)



    }
}))

