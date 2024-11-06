import React, { useState, useEffect } from "react";
import axios from "axios";

// Dicionário com cada requisição
function Main() {
	const [data, setData] = useState({
		contacts: [],
		organizations: [],
		deals: [],
		products: [],
		custom_fields: [],
		deal_pipelines: [],
		deal_stages: [],
		tasks: [],
		activities: [],
		users: [],
		teams: [],
		deal_sources: [],
		campaigns: [],
		deal_lost_reasons: [],
		webhooks: [],
		tokenStatus: null,
	});

	// Função genérica para fazer chamadas de API e atualizar o estado
	const fetchData = async (endpoint, key) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/${endpoint}`
			);
			setData((prevData) => ({
				...prevData,
				[key]: response.data,
			}));
		} catch (err) {
			console.error(`Erro ao buscar dados de ${key}: ${err.message}`);
		}
	};

	// Carrega os contatos, organizações e verifica o token ao montar o componente
	useEffect(() => {
		fetchData("contacts", "contacts");
		fetchData("organizations", "organizations");
		fetchData("deals", "deals");
		fetchData("products", "products");
		fetchData("custom_fields", "custom_fields");
		fetchData("deal_pipelines", "deal_pipelines");
		fetchData("deal_stages", "deal_stages");
		fetchData("tasks", "tasks");
		fetchData("deal_sources", "deal_sources");
		fetchData("campaigns", "campaigns");
		fetchData("deal_lost_reasons", "deal_lost_reasons");
		fetchData("webhooks", "webhooks");
		fetchData("token/check", "tokenStatus"); // Verificação do token
	}, []);

	// Retorna a parte do frontend
	return (
		<div>
			<main>
				{/* Teste para mostrar os dados de cada endpoint */}
				<h1>Dados dos Endpoints</h1>
				<div>
					{Object.keys(data).map((key) => (
						<div key={key}>
							<h2>{key}</h2>
							{Array.isArray(data[key]) ? (
								data[key].length > 0 ? (
									<ul>
										{data[key].map((item, index) => (
											<li key={index}>
												{JSON.stringify(item)}
											</li>
										))}
									</ul>
								) : (
									<p>Nenhum dado disponível.</p>
								)
							) : (
								<p>
									{data[key]
										? JSON.stringify(data[key])
										: "Nenhum dado disponível."}
								</p>
							)}
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default Main;
