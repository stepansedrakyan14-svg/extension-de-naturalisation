function lireStatut() {

    const texte = document.body.innerText;

    const statuts = [
        "Examen des pièces en cours",
        "Demande de complément",
        "En cours d'instruction",
        "Entretien",
        "Décision favorable",
        "Décision défavorable",
        "Décret publié",
        "Naturalisation accordée"
    ];

    for (const statut of statuts) {

        if (texte.includes(statut)) {

            chrome.runtime.sendMessage({
                type: "STATUS_UPDATE",
                status: statut
            });

            console.log("Statut détecté :", statut);

            return;
        }

    }

    console.log("Aucun statut détecté");

}


window.addEventListener("load", () => {

    setTimeout(lireStatut, 3000);

});
