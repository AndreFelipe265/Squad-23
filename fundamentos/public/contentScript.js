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

              //TICKET JETSALES
              const currentUrl = window.location.href;

              const regex = /atendimento\/(\d+)/;
              const match = currentUrl.match(regex);

              if (match && match[1]) {
                const ticketId = match[1];
                console.log('Ticket ID:', ticketId); 
              } else {
                console.log('Ticket ID não encontrado');
              }

                
                
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

                fetch('http://localhost:5000/api/enviarTicket', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      ticket: ticketId
                  })
              })
              .then(response => response.json()) 
              .then(data => {
              })
              .catch(error => {
              });
            }
        });
    }
});

  
  