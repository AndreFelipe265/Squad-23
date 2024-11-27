import React, { useEffect, useState } from 'react';
import './Main.css';

const Main = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [organizations, setOrganizations] = useState(null);
  const [users, setUsers] = useState(null);
  const [deal, setDeal] = useState(null)
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [tokenRD, setTokenRD] = useState(localStorage.getItem('tokenRD') || '');
  const [showInfo, setShowInfo] = useState({
    usuario: false,
    contatos: false,
    empresa: false,
    negociação: false,
  }); // Novo estado para controle dos checkboxes de cada seção

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (section) => {
    setShowInfo((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Salvar Token da RD
  const handleTokenSubmit = () => {
    localStorage.setItem('tokenRD', tokenRD);
    alert('Token da RD salvo com sucesso!');
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
          throw new Error('Erro ao buscar ticket');
        }
        const data = await response.json();
        setTicket(data);
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
    const tokenRD = localStorage.getItem('tokenRD');
    fetch('http://localhost:5000/api/token/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenRD}`
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
    const tokenRD = localStorage.getItem('tokenRD');
    fetch('http://localhost:5000/api/contacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenRD}`
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

  //negociação
  useEffect(() => {
    const tokenRD = localStorage.getItem('tokenRD');
    fetch('http://localhost:5000/api/deals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenRD}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao listar contatos: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setDeal(data.deals || []); 
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  //EMPRESA
  useEffect(() => {
    const tokenRD = localStorage.getItem('tokenRD');
    fetch('http://localhost:5000/api/organizations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenRD}`
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
    <div className='TICKET_ID'>
      {ticket && (
        <div key={ticket.id} className='USER_ID'>
          <p>USER ID: {ticket.user.id}</p>
          {/* Renderize outras informações do ticket aqui */}
        </div>
      )}
  
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
  
      <div className="content">
        {showInfo.usuario && ticket && (
          <div>
            <h2>Informações de Usuário</h2>
            <div>
              <p><strong>ID do Contato:</strong> {ticket.contact.id}</p>
              <p><strong>Nome:</strong> {ticket.contact.name}</p>
              <p><strong>Número:</strong> {ticket.contact.number}</p>
              <p><strong>Canal:</strong> {ticket.contact.channel || 'Não informado'}</p>
              <p><strong>Nome do contato:</strong> {ticket.contact.firstConnectionModel.name}</p>
              <p><strong>Status:</strong> {ticket.contact.firstConnectionModel.status || 'Não informado'}</p>
              <p><strong>Email:</strong> {ticket.contact.email || 'Não informado'}</p>
            </div>
          </div>
        )}
  
        {showInfo.contatos && contacts && (
          <div>
            <h2>INFORMAÇÕES DE CONTATOS</h2>
            {contacts.map((contact) => (
              <div key={contact.id}>
                <p><strong>Nome:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email || 'Não informado'}</p>
                <p><strong>Telefone:</strong> {contact.phone || 'Não informado'}</p>
                <p><strong>Empresa:</strong> {contact.company || 'Não informado'}</p>
              </div>
            ))}
          </div>
        )}
  
        {showInfo.empresa && organizations && (
          <div>
            <h2>INFORMAÇÕES DA EMPRESA</h2>
            {organizations.map((org) => (
              <div key={org.id}>
                <p><strong>Nome:</strong> {org.name}</p>
                <p><strong>Website:</strong> {org.website || 'Não informado'}</p>
                <p><strong>Email:</strong> {org.email || 'Não informado'}</p>
                <p><strong>Telefone:</strong> {org.phone || 'Não informado'}</p>
              </div>
            ))}
          </div>
        )}
  
        {showInfo.negociação && deal && (
        <div>
          <h2>INFORMAÇÕES DE NEGOCIAÇÃO</h2>
          {deal.map((d) => (
            <div key={d.id}>
              <p><strong>ID do Deal:</strong> {d.id || 'Não informado'}</p>
              <p><strong>Título:</strong> {d.name || 'Não informado'}</p>
              <p><strong>Valor:</strong> {d.value || 'Não informado'}</p>
              <p><strong>Status:</strong> {d.status || 'Não informado'}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
  
        {activeSection === 'token' && (
          <div className="configurar_token">
            <h1>CONFIGURAR O TOKEN</h1>
            <input type="text" placeholder="Digite seu token aqui" value={tokenRD} onChange={(e) => setTokenRD(e.target.value)} />
            <button onClick={handleTokenSubmit}>Verificar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
