import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TutorialsList from "./components/tutorials-list.component";
import AddTutorial from "./components/add-tutorial.component";
import EditTutorial from "./components/edit-tutorial.component";
import NavBar from "./components/NavBar";
import { ProgressProvider } from "./context/ProgressContext";

function App() {
  return (
    <ProgressProvider>
      <Router>
        <NavBar />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={EditTutorial} />
          </Switch>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
