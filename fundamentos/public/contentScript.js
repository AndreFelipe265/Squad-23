document.addEventListener('click', function(e) {
	if (e.target.closest('.ticketBorder')) {
	  chrome.runtime.sendMessage({ action: "sidePanel" }, (response) => {
		if (response && response.status === "success") {
		  console.log("Painel lateral aberto com sucesso!");
		  const tokenJetSales = localStorage.getItem('token')

		} else {
		  console.error("Erro ao abrir o painel lateral:", response ? response.message : "Sem resposta");
		}
	  });
	}
  });document.addEventListener('click', function(e) {

    if (e.target.closest('.ticketBorder')) {

        chrome.runtime.sendMessage({ action: "sidePanel" }, (response) => {
            if (response && response.status === "success") {

              //TOKEN JETSALES

              let tokenJetSales = localStorage.getItem('token');
              tokenJetSales = tokenJetSales.replace(/^"|"$/g, '');
				      console.log(tokenJetSales)
                
                
                if (tokenJetSales) {
                    
                    fetch('http://localhost:5000/api/enviarToken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: tokenJetSales
                        })
                    })
                    .then(response => response.json()) 
                    .then(data => {
                    })
                    .catch(error => {
                    });
                }
            }
        });
    }
});

  
  