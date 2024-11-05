import React, { useState, useEffect } from "react";
import axios from "axios";

function Main() {
	const [data, setData] = useState({
		contacts: [],
		organizations: [],
		deals: [],
		products: [],
		custom_fields: [],
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
		fetchData("token/check", "tokenStatus"); // Verificação do token
	}, []);

	return (
		<div>
			<main></main>
		</div>
	);
}

export default Main;
