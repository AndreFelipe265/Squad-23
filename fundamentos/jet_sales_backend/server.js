
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const urlTOKEN = 'https://crm.rdstation.com/api/v1/token/check?token=6709bdde82747300196dadec';
const urlCONTATOS = 'https://crm.rdstation.com/api/v1/contacts?token=6709bdde82747300196dadec'
const urlEMPRESA = 'https://crm.rdstation.com/api/v1/organizations?token=6709bdde82747300196dadec'
const urlNEGOCIAÇÃO = 'https://crm.rdstation.com/api/v1/deals?token=6709bdde82747300196dadec'

//Token Rd station
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const tokenRD = req.headers['authorization'];
  if (tokenRD) {
    req.tokenRD = tokenRD.replace('Bearer ', ''); 
  }
  next();
});

//TOKEN E TICKET JETSALES
let token_jetsales = ''
let ticket_jetsales = ''

app.post('/api/enviarToken', async (req, res) => {

  const { token } = req.body;
  token_jetsales = token
  
  if (!token) {
    return res.status(400).json({ status: 'error', message: 'Token não enviado!' });
  }})

app.post('/api/enviarTicket', async (req, res) => {

    const { ticket } = req.body;
    ticket_jetsales = ticket
    console.log("Ticket recebido no back-end:", ticket_jetsales);
    
    if (!ticket) {
      return res.status(400).json({ status: 'error', message: 'Ticket não enviado!' });
    }})




//JETSAES
app.get('/users',async (req, res)=>{
  try {
    const response = await fetch("https://chatapi.jetsalesbrasil.com/users/?pageNumber=1&hasMore=true", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "authorization": `Bearer ${token_jetsales}` 
      },
      method: "GET"
    });
    const data = await response.json()
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da API da JETSALES' });
  }
});


app.get('/ticket', async (req, res) => {
  try {
    const response = await fetch(`https://chatapi.jetsalesbrasil.com/tickets/${ticket_jetsales}?id=${ticket_jetsales}`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "authorization": `Bearer ${token_jetsales}` 
      },
      method: "GET"
    });
    const data = await response.json();
    console.log("Dados do ticket recebidos da API:", data); // Exibe a resposta da API de Jetsales
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados da API da JETSALES:", error);
    res.status(500).json({ error: 'Erro ao buscar dados da API da JETSALES' });
  }
});

//TOKEN
app.get('/api/token/check', async (req, res) => {
  try {
    const response = await axios.get(urlTOKEN, {
      headers: {
        'Authorization': `Bearer ${req.tokenRD}`,
        'Content-Type': 'application/json',
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API da RD Station' });
  }
});

//CONTATOS
app.get('/api/contacts', async (req, res) => {
  try {
    const response = await axios.get(urlCONTATOS, {
      headers: {
        'Authorization': `Bearer ${req.tokenRD}`,
        'Content-Type': 'application/json',
      }
    });

 
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API da RD Station' });
  }
});

//EMPRESA

app.get('/api/organizations', async (req, res) => {
  try {
    const response = await axios.get(urlEMPRESA, {
      headers: {
        'Authorization': `Bearer ${req.tokenRD}`,
        'Content-Type': 'application/json',
      }
    });

 
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API da RD Station' });
  }
});

//NEGOCIAÇÃO

app.get('/api/deals', async (req, res) => {
  try {
    const response = await axios.get(urlNEGOCIAÇÃO, {
      headers: {
        'Authorization': `Bearer ${req.tokenRD}`,
        'Content-Type': 'application/json',
      }
    });

 
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API da RD Station' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
