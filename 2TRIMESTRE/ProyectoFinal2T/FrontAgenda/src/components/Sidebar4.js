import { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link
import logo from "./logo.png";
import React from "react";
import "./styles/sidebars.css";

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Añadir", path: "/add" },
  { name: "Login", path: "/login" }
];

export const Sidebar4 = () => {
  const [active, setActive] = useState(1);

  const goto = (index) => setActive(index);

  return (
    <section className="page sidebar-4-page">
      <aside className="sidebar-4">
        <div className="inner">
          <div className="header">
            <img src={logo} className="logo" alt="logo" />
            <h1>Teams.co</h1>
          </div>
          <nav
            className="menu"
            style={{ "--top": `${active === 0 ? 0 : active * 56}px` }}
          >
            {navItems.map((item, index) => (
              <Link to={item.path} key={item.name} onClick={() => goto(index)}>
                <button
                  className={active === index ? "active" : ""}
                  type="button"
                >
                  <p>{item.name}</p> {/* Solo renderiza el texto dentro de <p> */}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
};
