import React, { useState } from "react";
import "../styles/Menu.css";
import usuario from "../assets/usuario.png";
import login from "../assets/login.png";

import desplegar from "../assets/desplegar.png";
import { useHistory } from "react-router-dom"; // Importa useHistory

const MenuButton = ({ name, img, onClick }) => {
  return (
    <button onClick={onClick}>
      {img && <img src={img} alt={name} style={{ width: "24px", height: "24px" }} />}
      {name}
    </button>
  );
};


export const Dropdown1 = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory(); // Crea una instancia de useHistory

  // Manejar clic para redirigir
  const handleClick = (path) => {
    history.push(path); // Navega a la ruta proporcionada
  };

  return (
    <div className={`dropdown-1 ${isOpen ? "open" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <span className="material-symbols-outlined">
          <img src={usuario} alt="User Icon" style={{ width: "24px", height: "24px" }} />
        </span>
        Pablo
        <span className="chevron material-symbols-outlined">
          <img src={desplegar} alt="Login Icon" style={{ width: "24px", height: "24px" }} />
        </span>
      </button>


      <div className="dropdown-1-menu">
        <div className="menu-inner">
          <div className="main-menu">
            {items.map((item) => (
              <MenuButton
                key={item.name}
                name={item.displayName || item.name}
                img={item.img}
                onClick={() => handleClick(item.path)} // Llama a handleClick con la ruta
              />
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};
