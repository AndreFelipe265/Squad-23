import React, { useState, useEffect } from "react";
import axios from "axios";

function Main() {
	const [data, setData] = useState({
		contacts: [],
		organizations: [],
		tokenStatus: null,
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState({
		contacts: true,
		organizations: true,
		tokenStatus: true,
	});

	// Função genérica para fazer chamadas de API e atualizar o estado
	const fetchData = async (endpoint, key) => {
		try {
			setError(null); // Limpar o erro antes de cada nova requisição
			setLoading((prevLoading) => ({
				...prevLoading,
				[key]: true,
			})); // Iniciar o estado de carregamento
			const response = await axios.get(
				`http://localhost:5000/api/${endpoint}`
			);
			setData((prevData) => ({
				...prevData,
				[key]: response.data,
			}));
		} catch (err) {
			setError("Erro ao buscar dados");
			console.error(err.message);
		} finally {
			setLoading((prevLoading) => ({
				...prevLoading,
				[key]: false,
			})); // Encerrar o estado de carregamento
		}
	};

	// Carrega os contatos, organizações e verifica o token ao montar o componente
	useEffect(() => {
		fetchData("contacts", "contacts");
		fetchData("organizations", "organizations");
		fetchData("token/check", "tokenStatus"); // Verificação do token
	}, []);

	return (
		<div>
			{error && <p>{error}</p>}
			<h1>Status do Token</h1>
			{loading.tokenStatus ? (
				<p>Verificando token...</p>
			) : (
				<p>{JSON.stringify(data.tokenStatus, null, 2)}</p>
			)}

			<h2>Contatos</h2>
			{loading.contacts ? (
				<p>Carregando contatos...</p>
			) : (
				<ul>
					{Array.isArray(data.contacts) &&
						data.contacts.map((contact, index) => (
							<li key={index}>
								{JSON.stringify(contact, null, 2)}
							</li>
						))}
				</ul>
			)}

			<h2>Organizações</h2>
			{loading.organizations ? (
				<p>Carregando organizações...</p>
			) : (
				<ul>
					{Array.isArray(data.organizations) &&
						data.organizations.map((organization, index) => (
							<li key={index}>
								{JSON.stringify(organization, null, 2)}
							</li>
						))}
				</ul>
			)}

			{/* Botões para recarregar os dados individualmente */}
			<button onClick={() => fetchData("contacts", "contacts")}>
				Recarregar Contatos
			</button>
			<button onClick={() => fetchData("organizations", "organizations")}>
				Recarregar Organizações
			</button>
			<button onClick={() => fetchData("token/check", "tokenStatus")}>
				Recarregar Token
			</button>
		</div>
	);
}

export default Main;
