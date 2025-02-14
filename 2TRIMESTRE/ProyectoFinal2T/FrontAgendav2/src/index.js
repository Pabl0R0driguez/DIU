import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "./provider/UserProvider";

ReactDOM.render(
  <UserProvider> {/* Proveedor de Usuario envolviendo la aplicación */}
    <App />
  </UserProvider>,
  document.getElementById("root")
);


serviceWorker.unregister();
