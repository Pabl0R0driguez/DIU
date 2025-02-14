import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "./provider/UserProvider";

ReactDOM.render(
  <UserProvider> 
    <App />
  </UserProvider>,
  document.getElementById("root")
);


serviceWorker.unregister();
