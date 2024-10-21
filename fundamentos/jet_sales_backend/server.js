
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const urlTOKEN = 'https://crm.rdstation.com/api/v1/token/check?token=6709bdde82747300196dadec';
const urlCONTATOS = 'https://crm.rdstation.com/api/v1/contacts?token=6709bdde82747300196dadec'
const urlEMPRESA = 'https://crm.rdstation.com/api/v1/organizations?token=6709bdde82747300196dadec'

app.use(cors());

//TOKEN
app.get('/api/token/check', async (req, res) => {
  try {
    const response = await axios.get(urlTOKEN, {
      headers: {
        'Authorization': `Bearer ${process.env.RD_TOKEN}`,
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
        'Authorization': `Bearer ${process.env.RD_TOKEN}`,
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
        'Authorization': `Bearer ${process.env.RD_TOKEN}`,
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