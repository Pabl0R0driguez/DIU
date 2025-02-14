 import React, { useState, useContext } from "react";
import "../styles/Menu.css";
import usuario from "../assets/usuario.png";
import login from "../assets/login.png";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";
import desplegar from "../assets/desplegar.png";

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
  const history = useHistory();

  // Maneja casos en que el contexto sea null
  const userContext = useContext(UserContext);
  // Ponemos la interrogación para evitar desestrocuturar un objeto null
  const email = userContext?.email || "Invitado"; // Si no hay usuario, muestra "Invitado"

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div className={`dropdown-1 ${isOpen ? "open" : ""}`}>
      <span className="material-symbols-outlined">
        <img src={usuario} alt="User Icon" style={{ width: "24px", height: "24px" }} />
      </span>
      <h3 className="italic">{email}</h3>
      <button className="desplegable" onClick={() => setIsOpen(!isOpen)}>
        <span className="chevron material-symbols-outlined">
          <img src={desplegar} alt="Login Icon" style={{ width: "24px", height: "24px" }} />
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-1-menu">
          <div className="menu-inner">
            <div className="main-menu">
              {items.map((item) => (
                <MenuButton
                  key={item.name}
                  name={item.displayName || item.name}
                  img={item.img}
                  onClick={() => handleClick(item.path)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};