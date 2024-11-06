import React,{ useEffect, useState } from 'react'

//css
import './Main.css'

const Main = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [organizations, setOrganizations] = useState([])
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticket,setTicket] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  //JETSALES
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch('http://localhost:5000/ticket');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setTicket(data.ticket);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, []);



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
    <nav>
    <ul className="menu">
      <li className="menu-item">
        <button onClick={toggleDropdown}>INFORMAÇÕES</button>
        {isDropdownOpen && ( // Exibe o dropdown se estiver aberto
          <ul className="dropdown">
            <li onClick={() => {setActiveSection('usuario'); setIsDropdownOpen(false); }}>Usuario</li>
            <li onClick={() => { setActiveSection('financeiro'); setIsDropdownOpen(false); }}>Financeiro</li>
            <li onClick={() => { setActiveSection('vendas'); setIsDropdownOpen(false); }}>Vendas</li>
            <li onClick={() => { setActiveSection('marketing'); setIsDropdownOpen(false); }}>Marketing</li>
          </ul>
        )}
      </li>
      <li className="menu-item">
        <button onClick={() => { setActiveSection('token'); setIsDropdownOpen(false); }}>TOKEN</button>
      </li>
    </ul>
  </nav>

  {/* Exibição condicional das seções */}
  <div className="content">
    
  {activeSection === 'usuario' && (
      <div>
        <h1>INFORMAÇÕES DO CLIENTE</h1>
        <p>NOME: {data.name}</p>
        <br />
        <hr />
      </div>
    )}


    {activeSection === 'financeiro' && (
      <div>
        <h1>Seção Financeiro</h1>
        <p>Informações financeiras.</p>
        <br />
        <hr />
      </div>
    )}

    {activeSection === 'vendas' && (
      <div>
        <h1>Seção Vendas</h1>
        <p>Informações sobre vendas.</p>
        <br />
        <hr />
      </div>
    )}
  
    {activeSection === 'marketing' && (
      <div>
        <h1>Seção Marketing</h1>
        <p>Estratégias de marketing.</p>
        <br />
        <hr />
      </div>
    )}

    {activeSection === 'informacoes' && (
      <div>
        <h1>Seção Informações</h1>
        <p>nossa que informacoes</p>
        <br />
        <hr />
      </div>
    )}

    {activeSection === 'token' && (
      <div className='configurar_token'>
        <h1>CONFIGURAR O TOKEN</h1>
        <input type="text" placeholder='Digite seu token aqui' />
        <input type="submit" value="Verificar" />
      </div>
    )}
  </div>
    </div>
  )
}

export default Main
