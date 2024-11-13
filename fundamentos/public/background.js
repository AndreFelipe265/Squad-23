chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sidePanel") {
        chrome.sidePanel.open({ tabId: sender.tab.id })
            .then(() => {
                console.log("Painel lateral aberto com sucesso!");
                sendResponse({ status: "success" });
            })
            .catch((error) => {
                console.error("Erro ao abrir o painel lateral:", error);
                sendResponse({ status: "error", message: error.message });
            });
        return true; // Necessário para permitir a resposta assíncrona
    } else {
        sendResponse({ status: "error", message: "Ação desconhecida" });
    }
});
