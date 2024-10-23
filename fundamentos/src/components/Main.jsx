import React,{ useEffect, useState } from 'react'

//css
import './Main.css'

const Main = () => {
  const [activeSection, setActiveSection] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [organizations, setOrganizations] = useState([])
  const [deals, setDeals] = useState([])


  

  


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
    fetch('http://localhost:5000/api/deals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao listar negociações: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setDeals(data.deals || []); 
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

  //JETSALES

  
  //PROGRAMAÇÃO
  return (
    <div>
      <main>
      <nav>
        <ul className="menu">
          <li className="menu-item">
            <button onClick={() => setActiveSection('departamento')}>DEPARTAMENTO</button>
          </li>
          <li className="menu-item">
            <button onClick={() => setActiveSection('informacoes')}>INFORMAÇÕES</button>
          </li>
          <li className="menu-item">
            <button onClick={() => setActiveSection('configuracoes')}>CONFIGURAÇÕES</button>
          </li>
        </ul>
      </nav>
      {/* Exibição condicional das seções */}
      <div className="content">
        {activeSection === 'departamento' && (
          <div>
            <h2>Seção Departamento</h2>
            <p>financeiro.</p>
          </div>
        )}

        {activeSection === 'informacoes' && (
          <div>
            <p>NOME: {data.name}</p>
            <p>EMAIL: {data.email}</p>
          </div>
        )}

        {activeSection === 'configuracoes' && (
          <div>
            <h2>Seção Configurações</h2>
            <p>CONFIGURAR TOKEN</p>
            <input type="text" />
          </div>
        )}
      </div>
      </main>
    </div>
  )
}

export default Main
