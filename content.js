function lireStatut() {

    const texte = document.body.innerText;

    const statuts = [
        "Dossier reçu",
        "Dossier enregistré",
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

            return;
        }

    }

}

window.addEventListener("load", () => {

    setTimeout(lireStatut, 3000);

});
