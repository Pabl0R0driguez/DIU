import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TutorialsList from "./components/tutorials-list.component";
import AddTutorial from "./components/add-tutorial.component";
import EditTutorial from "./components/edit-tutorial.component";
import SignIn from "./components/login";
import { Sidebar4 } from "./components/MenuButton";


function App() {
  // Define los enlaces y componentes
  const routes = [
    { name: "Inicio", path: "/", component: TutorialsList },
    { name: "Añadir", path: "/add", component: AddTutorial },
    { name: "Login", path: "/login", component: SignIn }
  ];

  return (
    <div>
      <Sidebar4 routes={routes} />

        <Switch>
          {routes.map((route) => (
            <Route
              key={route.name}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
    </div>
  );
}

export default App;
