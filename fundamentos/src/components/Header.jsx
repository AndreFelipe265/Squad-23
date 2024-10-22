import React, { useState } from 'react';
import logo from '../assets/jetsales.png';
import './Header.css';

const Header = () => {
  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState('');

  return (
    <div>
      <header>
        <img src={logo} alt="JETSALES" />
      </header>
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
            <h2>Seção Informações</h2>
            <p>nossa que informacoes</p>
          </div>
        )}

        {activeSection === 'configuracoes' && (
          <div>
            <h2>Seção Configurações</h2>
            <p>config.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
