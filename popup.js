const statusSelect = document.getElementById("status");
const saveButton = document.getElementById("save");
const historyList = document.getElementById("history");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");


const steps = {
    "Dossier déposé": 15,
    "Recevabilité": 30,
    "Instruction": 50,
    "Entretien": 70,
    "Décision préfectorale": 90,
    "Naturalisation acceptée": 100
};


// Charger les données sauvegardées

chrome.storage.local.get(
    ["status", "history"],
    (data) => {

        if (data.status) {
            statusSelect.value = data.status;
            updateProgress(data.status);
        }


        if (data.history) {
            displayHistory(data.history);
        }

    }
);


// Enregistrer un nouveau statut

saveButton.addEventListener(
    "click",
    () => {

        const newStatus = statusSelect.value;

        const date = new Date().toLocaleDateString("fr-FR");


        chrome.storage.local.get(
            ["history"],
            (data) => {


                let history = data.history || [];


                history.unshift({

                    date: date,
                    status: newStatus

                });


                chrome.storage.local.set({

                    status: newStatus,
                    history: history

                });


                displayHistory(history);

                updateProgress(newStatus);


            }
        );


    }
);


// Mise à jour de la barre

function updateProgress(status){

    const value = steps[status] || 0;

    progressBar.style.width = value + "%";

    progressText.textContent = value + "%";

}


// Affichage historique

function displayHistory(history){

    historyList.innerHTML = "";


    history.forEach(item => {


        const li = document.createElement("li");

        li.textContent =
        item.date + " - " + item.status;


        historyList.appendChild(li);


    });

}
// Réception automatique du statut depuis ANEF

chrome.runtime.onMessage.addListener(
    (message) => {

        if(message.type === "STATUS_UPDATE") {

            const newStatus = message.status;

            const date = new Date().toLocaleDateString("fr-FR");


            chrome.storage.local.get(
                ["history"],
                (data) => {

                    let history = data.history || [];


                    // éviter les doublons
                    if(history.length === 0 || history[0].status !== newStatus){

                        history.unshift({
                            date: date,
                            status: newStatus
                        });

                    }


                    chrome.storage.local.set({

                        status: newStatus,
                        history: history

                    });


                    statusSelect.value = newStatus;

                    updateProgress(newStatus);

                    displayHistory(history);

                }
            );

        }

    }
);
chrome.runtime.onMessage.addListener(
    (message) => {

        if(message.type === "STATUS_UPDATE") {

            const newStatus = message.status;

            const date = new Date().toLocaleDateString("fr-FR");

            ...
        }
    }
);
