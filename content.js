function recupererANEF() {

    const texte = document.body.innerText;


    if (!texte.includes("Demande d'accès à la Nationalité Française")) {
        return;
    }


    let statut = "Inconnu";


    const correspondances = [
        "Examen des pièces en cours",
        "Demande de complément",
        "Instruction",
        "Entretien",
        "Décision favorable",
        "Décision défavorable",
        "Naturalisation accordée"
    ];


    for (const mot of correspondances) {

        if (texte.includes(mot)) {
            statut = mot;
            break;
        }

    }


    chrome.runtime.sendMessage({

        type: "ANEF_STATUS",

        data: {
            statut: statut,
            date: new Date().toLocaleString("fr-FR")
        }

    });


}


setTimeout(recupererANEF, 3000);
