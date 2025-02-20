import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ContactProvider  from "./providers/ContactContext"; // Importamos el Provider

ReactDOM.render(
  <BrowserRouter>
    <ContactProvider> {/* Envolvemos la App con el contexto */}
      <App />
    </ContactProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
