import React,{ useEffect, useState } from 'react'

//css
import './Main.css'

const Main = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [organizations, setOrganizations] = useState([])

  //TOKEN
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


  //CONTATOS
  useEffect(() => {
    fetch('http://localhost:5000/api/contacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao listar contatos: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setContacts(data.contacts || []); 
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  //EMPRESA
  useEffect(() => {
    fetch('http://localhost:5000/api/organizations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao listar empresas: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setOrganizations(data.organizations || []); 
      })
      .catch(error => {
        setError(error);
      });
  }, []);
  
  // DEAL
  useEffect(() => {
    fetch('http://localhost:5000/api/organizations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao listar empresas: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setOrganizations(data.organizations || []); 
      })
      .catch(error => {
        setError(error);
      });
  }, []);


//CONDIÇÃO DE ERRO
  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  if (!data) {
    return <div>Carregando...</div>;
  }

  
  //PROGRAMAÇÃO
  return (
    <div>
      <main>
     
      </main>
    </div>
  )
}

export default Main
