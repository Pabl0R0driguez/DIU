import { useState } from "react";
import React from 'react';
import desplegar from "../assets/desplegar.png";  // Actualiza la ruta
import menu from "../assets/menu.png";  // Actualiza la ruta

import "../styles/Menu.css";


// Componente que representa el botón del menú de logout
const MenuLogOut = ({ name, onClick }) => {

  return (
    <button onClick={onClick}>
      <span className="material-symbols-outlined">{name}</span>
      {name}
      <span className="chevron material-symbols-outlined">
        <img src={desplegar} className="logo" alt="desplegar" />
      </span>
    </button>
  );
};

// Componente que representa el botón del menú
const MenuButton = ({ menu, onClick }) => {

      return (
        <button onClick={onClick}>
          <span className="material-symbols-outlined">{menu}</span>
          {menu}
          <span className="chevron material-symbols-outlined">
            <img src={menu} className="logo" alt="desplegar" />
          </span>
        </button>
      );
    };

// Componente principal del menú desplegable
export const Dropdown1 = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado de apertura/cierre del menú

  const handleClick = () => {
    setIsOpen(!isOpen); // Alterna el estado de abierto/cerrado
  };

     
      
  

  return (
      
    <div className={`dropdown-1 ${isOpen ? "open" : ""}`}>
      {/* Botón principal (Joe Harrison) que abre el menú */}
      <button onClick={handleClick}>
        <span className="material-symbols-outlined"> </span>
        Joe Harrison
        <span className="chevron material-symbols-outlined">
          <img src={desplegar} className="logo" alt="logo" />
        </span>
      </button>

      {/* Menú desplegable solo visible cuando isOpen es true */}
      {isOpen && (
        <div className="dropdown-1-menu">
          <div className="menu-inner">
            <div className="main-menu">
              {/* Solo se muestra 'Desconectar' cuando el menú está abierto */}
              <MenuLogOut
                key="desconectar"
                name="Desconectar"
                onClick={() => {
                  console.log('Desconectando...'); // Acción al hacer clic en 'Desconectar'
                  setIsOpen(false); // Cierra el menú cuando se hace clic en 'Desconectar'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


