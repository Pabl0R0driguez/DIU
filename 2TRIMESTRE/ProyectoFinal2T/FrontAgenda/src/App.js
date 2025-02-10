import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TutorialsList from "./components/tutorials-list.component";
import AddTutorial from "./components/add-tutorial.component";
import EditTutorial from "./components/edit-tutorial.component";
import Login  from "./components/login";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            Tutoriales
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login 
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
          {/*El en switch se renderizarán todas los compoentes cuta URL coicidan con la activa*/}
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} /> 
         <Route path="/tutorials/:id" component={EditTutorial} /> 
         <Route path="/login" component={Login} /> 


          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
