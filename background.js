chrome.runtime.onMessage.addListener(
    (message) => {

        if (message.type === "ANEF_STATUS") {

            chrome.storage.local.get(
                ["history"],
                (data) => {

                    let history = data.history || [];

                    const nouveau = {
                        date: message.data.date,
                        status: message.data.statut
                    };


                    // éviter les doublons
                    if (
                        history.length === 0 ||
                        history[0].status !== nouveau.status
                    ) {

                        history.unshift(nouveau);

                    }


                    chrome.storage.local.set({

                        status: nouveau.status,
                        lastCheck: nouveau.date,
                        history: history

                    });


                    console.log(
                        "ANEF détecté :",
                        nouveau.status
                    );

                }
            );

        }

    }
);
