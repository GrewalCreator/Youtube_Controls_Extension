/*
// Code to Disable Controls

async function toggleControls(css){
    // Avoid Duplicating Style
        /!*for(let i = 0; i < document.styleSheets.length; i++){
            if(document.styleSheets[i].href === `../view/css/${css}.css`){
                return;
            }
        }*!/



    try {
        const currentTab = await chrome.runtime.sendMessage({action:"getCurrentTab"});
        //const currentTab = await getCurrentTab();

        if(currentTab === undefined){
            console.error("Tab Undefined");
            return;
        }

        await chrome.scripting.insertCSS({
            target: {tabId: currentTab.id},
            files: [`./view/css/${css}.css`]
        });
        console.log("CSS Successfully Injected");
    } catch (error) {
        console.error("Error Injecting CSS: ", error);
    }



}*/
