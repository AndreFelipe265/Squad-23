// abrir painel quando clicar no icone
const GOOGLE_ORIGIN = "https://www.google.com";

chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));

// Ouve as mensagens enviadas pelo content script
chrome.runtime.onMessage.addListener((message, sender) => {
	if (message.action === "abrirPopup") {
		// Abre o painel lateral (side panel)
		chrome.sidePanel.open({ tabId: sender.tab.id });
	} else {
		console.log("Erro!");
	}
});
