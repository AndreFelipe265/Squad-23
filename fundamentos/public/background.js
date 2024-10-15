// abrir painel quando clicar no icone
const GOOGLE_ORIGIN = 'https://www.google.com';


chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


 