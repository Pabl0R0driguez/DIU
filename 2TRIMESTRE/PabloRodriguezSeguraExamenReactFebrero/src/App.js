import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductsList from "./components/products-list.component"; // Cambié el nombre del componente a ProductsList
import AddProduct from "./components/add-product.component"; // Cambié el nombre del componente a AddProduct
import EditProduct from "./components/edit-product.component"; // Cambié el nombre del componente a EditProduct
import ComprarProducto from "./components/comprar-podructo"; // Cambié el nombre del componente a EditProduct
import NavBar from "./components/NavBar";
import { ProgressProvider } from "./context/ProgressContext";

function App() {
  return (
    <ProgressProvider>
      <Router>
        <NavBar />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={ProductsList} /> {/* Cambié TutorialsList a ProductsList */}
            <Route path="/add" component={AddProduct} /> {/* Cambié AddTutorial a AddProduct */}
            <Route path="/products/:id" component={EditProduct} /> {/* Cambié EditTutorial a EditProduct */}
          </Switch>
          <Route path="/comprar/:id" component={ComprarProducto} /> {/* Cambié EditTutorial a EditProduct */}

        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
