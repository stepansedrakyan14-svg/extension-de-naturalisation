chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Naturalisation installée.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "STATUS_UPDATE") {

        chrome.storage.local.get(["lastStatus"], (result) => {

            const oldStatus = result.lastStatus;

            if (oldStatus !== message.status) {

                chrome.storage.local.set({
                    lastStatus: message.status
                });

                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icons/icon128.png",
                    title: "Naturalisation",
                    message: "Nouveau statut : " + message.status
                });

            }

        });

    }

});
