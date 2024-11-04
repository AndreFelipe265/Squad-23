const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const url = 'https://crm.rdstation.com/api/v1/token/check?token=6709bdde82747300196dadec';

app.use(cors());

// Função genérica para requisições
async function fetchData(url, res) {
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${process.env.RD_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
		res.json(response.data);
	} catch (error) {
		console.error("Erro ao fazer a requisição:", error.message);
		res.status(500).json({
			error: "Erro ao buscar dados da API da RD Station",
		});
	}
}

// Endpoints usando a função genérica
app.get("/api/token/check", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/token/check?token=6709bdde82747300196dadec";
	fetchData(url, res);
});


app.get("/api/contacts", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/contacts?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

app.get("/api/organizations", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/organizations?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
