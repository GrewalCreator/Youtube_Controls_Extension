chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "contextMenu",
        "title": "Context Menu",
        "contexts": ["selection"]
    });
});


//Listener For When The Toggle Switch State is Changed


