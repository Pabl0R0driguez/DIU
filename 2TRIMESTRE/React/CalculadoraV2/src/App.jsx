// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Esta línea importa Bootstrap
import Calculadora from "./components/Calculadora"; // Asegúrate de que la ruta sea correcta

function App() {
    return (
        <div className="App">
            <Calculadora />
        </div>
    );
}

export default App;
