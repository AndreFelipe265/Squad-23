document.addEventListener('click', function(e) {
	// Verifica se o alvo do clique ou algum de seus ancestrais possui a classe 'ticketBorder'
	if (e.target.closest('.ticketBorder')) {
	  // Envia uma mensagem para o background script para abrir o painel lateral
	  chrome.runtime.sendMessage({ action: "sidePanel" }, (response) => {
		if (response && response.status === "success") {
		  console.log("Painel lateral aberto com sucesso!");
		} else {
		  console.error("Erro ao abrir o painel lateral:", response ? response.message : "Sem resposta");
		}
	  });
	}
  });
  