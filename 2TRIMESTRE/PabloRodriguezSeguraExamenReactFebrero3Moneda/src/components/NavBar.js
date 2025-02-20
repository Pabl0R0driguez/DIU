import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProgressContext } from "../context/ProgressContext";

const NavBar = () => {
  const { progress } = useContext(ProgressContext);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <Link to="/" className="navbar-brand">
        Tutoriales
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Tutorials
          </Link>
        </li>
        <li className="nav-item">
          {progress === 100 ? (
           ""
          ) : (
            <Link to="/add" className="nav-link">
              Add
            </Link>
          )}
        </li>
      </div>
    </nav>
  );
};

export default NavBar;
