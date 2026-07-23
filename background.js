chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({

        status: "Dossier déposé",
        history: [
            {
                date: new Date().toLocaleDateString("fr-FR"),
                status: "Extension installée"
            }
        ]

    });

});


// Vérification périodique

chrome.alarms.create("checkStatus", {

    periodInMinutes: 60

});



chrome.alarms.onAlarm.addListener((alarm) => {


    if (alarm.name === "checkStatus") {


        chrome.storage.local.get(
            ["status"],
            (data) => {


                if (data.status) {


                    chrome.notifications.create({

                        type: "basic",
                        iconUrl: "icons/icon48.png",
                        title: "Suivi Naturalisation ANEF",
                        message:
                        "Votre dossier est actuellement : "
                        + data.status

                    });


                }


            }
        );


    }


});
