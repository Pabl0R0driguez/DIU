import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Importa Link correctamente
import { ContactContext } from "../providers/ContactContext";


function Navbar() {
  // use context
  const {numeroProductos} = useContext(ContactContext);
  const {setNumeroProductos} = useContext(ContactContext);

  const {productosMaximo} = useContext(ContactContext);

  console.log(numeroProductos);

  return (
    <nav className="navbar navbar-expand navbar-light bg-info">
      <Link to="/contactos" className="navbar-brand">Productos</Link>

      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/products" className="nav-link">Lista de Productos</Link>
        </li>
        {numeroProductos < productosMaximo && (
          <li className="nav-item">
            <Link to="/add" className="nav-link">Añadir</Link>
          </li>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
