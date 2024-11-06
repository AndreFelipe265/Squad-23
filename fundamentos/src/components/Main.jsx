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
  const [showInfo, setShowInfo] = useState({
    usuario: false,
    financeiro: false,
    vendas: false,
    marketing: false,
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
                    <input type="checkbox" checked={showInfo.financeiro} onChange={() => handleCheckboxChange('financeiro')} />
                    Financeiro
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" checked={showInfo.vendas} onChange={() => handleCheckboxChange('vendas')} />
                    Vendas
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" checked={showInfo.marketing} onChange={() => handleCheckboxChange('marketing')} />
                    Marketing
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
            <h1>INFORMAÇÕES DO CLIENTE</h1>
            <p>NOME: {data.name}</p>
          </div>
        )}

        {showInfo.financeiro && (
          <div>
            <h2>Seção Financeiro</h2>
            <p>Informações financeiras.</p>
          </div>
        )}

        {showInfo.vendas && (
          <div>
            <h2>Seção Vendas</h2>
            <p>Informações sobre vendas.</p>
          </div>
        )}

        {showInfo.marketing && (
          <div>
            <h2>Seção Marketing</h2>
            <p>Estratégias de marketing.</p>
          </div>
        )}

        {activeSection === 'token' && (
          <div className="configurar_token">
            <h1>CONFIGURAR O TOKEN</h1>
            <input type="text" placeholder="Digite seu token aqui" />
            <input type="submit" value="Verificar" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
