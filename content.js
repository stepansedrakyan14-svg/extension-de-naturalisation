console.log("Content Script chargé.");

function detecterStatut() {
  // À adapter lorsque nous connaîtrons la structure du portail
  const page = document.body.innerText;

  if (page.includes("en cours d'instruction")) {
    return "En cours d'instruction";
  }

  if (page.includes("Décision favorable")) {
    return "Décision favorable";
  }

  return "Statut inconnu";
}

const statut = detecterStatut();

chrome.runtime.sendMessage({
  type: "STATUS",
  data: statut
});
