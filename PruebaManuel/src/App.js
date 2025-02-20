import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TutorialsList from "./components/ListaProductos";
import AddTutorial from "./components/AddProduct";
import EditTutorial from "./components/EditProducto";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <Route exact path={["/products"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/products/:id" component={EditTutorial} />
        </div>
       
      </div>
    );
  }
}

export default App;
