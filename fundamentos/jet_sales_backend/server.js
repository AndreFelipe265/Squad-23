const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// variavel com a url
const url =
	"https://crm.rdstation.com/api/v1/token/check?token=6709bdde82747300196dadec";

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

// Endpoint Contatos
app.get("/api/contacts", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/contacts?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Endpoint Organizations
app.get("/api/organizations", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/organizations?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Deals
app.get("/api/deals", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/deals?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Products
app.get("/api/products", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/products?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Custom Fields
app.get("/api/custom_fields", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/custom_fields?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Sales Funnel
app.get("/api/deal_pipelines", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/deal_pipelines?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Etapas do funil de vendas
app.get("/api/deal_stages", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/deal_stages?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Tasks
app.get("/api/tasks", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/tasks?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Notes
app.get("/api/activities", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/activities?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Users
app.get("/api/users", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/users?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Teams
app.get("/api/teams", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/teams?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Sources
app.get("/api/deal_sources", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/deal_sources?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Campaigns
app.get("/api/campaigns", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/campaigns?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Reason the reason for the loss
app.get("/api/deal_lost_reasons", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/deal_lost_reasons?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Webhooks
app.get("/api/webhooks", (req, res) => {
	const url =
		"https://crm.rdstation.com/api/v1/webhooks?token=6709bdde82747300196dadec";
	fetchData(url, res);
});

// Porta que está rodando
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
