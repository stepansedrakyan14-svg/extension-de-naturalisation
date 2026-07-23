chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension de Naturalisation installée !");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "STATUS") {
    console.log("Statut :", message.data);
  }
});
