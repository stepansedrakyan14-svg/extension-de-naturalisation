function chargerStatut(){

    chrome.storage.local.get(["lastStatus"], function(result){

        document.getElementById("status").textContent =
            result.lastStatus || "Aucun statut détecté";

    });

}

document.getElementById("refresh").addEventListener("click", chargerStatut);

chargerStatut();
