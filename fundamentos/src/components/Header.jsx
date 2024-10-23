import React, { useState } from 'react';
import logo from '../assets/jetsales.png';
import './Header.css';

const Header = () => {


  return (
    <div>
      <header>
        <img src={logo} alt="JETSALES" />
      </header>
    </div>
  );
};

export default Header;
