// Selecione o elemento do click..
const objeto = document.querySelector("#ListItemsTicket");

objeto.addEventListener("click", () => {
	// Envia uma mensagem para o background para abrir o popup ou ativar uma funcionalidade
	chrome.runtime.sendMessage({ action: "abrirPopup" });
});
