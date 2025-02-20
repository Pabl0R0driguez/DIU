import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductsList from "./components/products-list.component"; // Cambié el nombre del componente a ProductsList
import AddProduct from "./components/add-product.component"; // Cambié el nombre del componente a AddProduct
import EditProduct from "./components/edit-product.component"; // Cambié el nombre del componente a EditProduct
import { ProgressProvider } from "./context/ProgressContext";

function App() {
  return (
    <ProgressProvider>
      <Router>
       
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={ProductsList} /> {/* Cambié TutorialsList a ProductsList */}
            <Route path="/add" component={AddProduct} /> {/* Cambié AddTutorial a AddProduct */}
            <Route path="/edit" component={EditProduct} /> {/* Cambié AddTutorial a AddProduct */}
            <Route path="/products/:id" component={EditProduct} /> {/* Cambié EditTutorial a EditProduct */}
          </Switch>

        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
