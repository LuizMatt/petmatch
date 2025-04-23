import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <a href="#" className="header-logo">
        PetMatch
      </a>

      <nav className="navbar">
        <a href="#" className="nav-link">
          Adotar
        </a>
        <a href="#" className="nav-link">
          Doações
        </a>
        <a href="#" className="nav-link">
          Sobre nós
        </a>
        <a href="#" className="nav-link">
          Contato
        </a>
        <a href="#">
          <button>Entrar</button>
        </a>
        <a href="#">
          <button>Cadastrar</button>
        </a>
      </nav>
    </div>
  );
};

export default Header;
