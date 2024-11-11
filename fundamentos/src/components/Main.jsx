import React, { useEffect, useState } from 'react';
import './Main.css';

const Main = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showInfo, setShowInfo] = useState({
    usuario: false,
    contatos: false,
    empresa: false,
    negociação: false,
  }); // Novo estado para controle dos checkboxes de cada seção

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCheckboxChange = (section) => {
    setShowInfo((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Salvar Token no localStorage
  const handleTokenSubmit = () => {
    localStorage.setItem('token', token);
    alert('Token salvo com sucesso!');
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
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/token/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
            {isDropdownOpen && (
              <ul className="dropdown">
                <li>
                  <label>
                    <input type="checkbox" checked={showInfo.usuario} onChange={() => handleCheckboxChange('usuario')} />
                    Usuário
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" checked={showInfo.contatos} onChange={() => handleCheckboxChange('contatos')} />
                    Contatos
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" checked={showInfo.empresa} onChange={() => handleCheckboxChange('empresa')} />
                    Empresa
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" checked={showInfo.negociação} onChange={() => handleCheckboxChange('negociação')} />
                    Negociação
                  </label>
                </li>
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
        {showInfo.usuario && (
          <div>
            <h2>INFORMAÇÕES DO CLIENTE</h2>
            <p>NOME: {data.name}</p>
            <p>TELEFONE:</p>
            <p>ID: </p>
            <p>EMAIL: </p>
            <br />
            <hr />
          </div>
        )}

        {showInfo.contatos && (
          <div>
            <h2>INFORMAÇÕES DE CONTATOS</h2>
            <p></p>
            <br />
            <hr />

          </div>
        )}

        {showInfo.empresa && (
          <div>
            <h2>INFORMAÇÕES DE EMPRESA</h2>
            <p></p>
            <br />
            <hr />
          </div>
        )}

        {showInfo.negociação && (
          <div>
            <h2>INFORMAÇÕES DE NEGOCIAÇÃO</h2>
            <p></p>
            <br />
            <hr />
          </div>
        )}

        {activeSection === 'token' && (
          <div className="configurar_token">
            <h1>CONFIGURAR O TOKEN</h1>
            <input type="text" placeholder="Digite seu token aqui" value={token} onChange={(e) => setToken(e.target.value)} />
            <button onClick={handleTokenSubmit}>Verificar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
