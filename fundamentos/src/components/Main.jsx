import React,{ useEffect, useState } from 'react'

//css

import './Main.css'

const Main = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/token/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      setError(error);
    });
  }, []);

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <main>
            <h1>INFORMAÇÕES:</h1>
            <p>NOME: {data.name}</p>
            <p>EMAIL: {data.email}</p>
      </main>
    </div>
  )
}

export default Main
