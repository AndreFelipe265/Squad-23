import React from 'react'
import logo from '../assets/jetsales.png'

//css
import './Header.css'

const Header = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="JETSALES" />
      </header>
      <nav>
        <ul>
          <li><button>DEPARTAMENTO</button></li>
          <li><button>INFORMAÇÕES</button></li>
          <li><button>CONFIGURAÇÕES</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header

