import React, { useState, useEffect, useContext } from "react";
import ProductDataService from "../services/product.service"; // Asegúrate de que el nombre del archivo sea correcto
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container, ProgressBar, Table } from "react-bootstrap";
import "../styles/tutorials.styles.css"; // Considera renombrar este archivo si ya no es específico de tutoriales
import { ProgressContext } from "../context/ProgressContext";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const { progress, setProgress } = useContext(ProgressContext);

  useEffect(() => {
    retrieveProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then((response) => {
        console.log("Productos recibidos:", response.data); // Verifica la respuesta aquí
        setProducts(response.data);
        updateProgress(response.data);
      })
      .catch((e) => {
        console.log("Error al recuperar productos:", e);
      });
  };
  

  const updateProgress = (productsData) => {
    const maxProducts = 10; // Puedes ajustar este valor según tus necesidades
    const currentProgress = (productsData.length / maxProducts) * 100;
    const newProgress = Math.min(currentProgress, 100);
    setProgress(newProgress);
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  const removeProduct = (product) => {
    if (!product) return;
    ProductDataService.delete(product.id)
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.error("Error al eliminar el producto:", e);
      });
  };

  const searchTitleFunc = () => {
    ProductDataService.findByTitle(searchTitle)
      .then((response) => {
        setProducts(response.data);
        updateProgress(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <Container fluid className="contenedor" style={{ marginTop: "70px" }}>
      <Row className="mb-4">
        <Col md={12}>
          <h4 className="text-center">Progreso de Productos</h4>
          <ProgressBar animated now={progress} label={`${Math.round(progress)}%`} />
        </Col>
      </Row>

      <Row>
      
        {/* Fila de lista de productos y detalles */}
        <Col md={12} className="mb-4">
          <Row>
            {/* Columna de la tabla de productos */}
            <Col md={7}>
              <h4 className="mb-4">Lista de Productos</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr
                        key={index}
                        onClick={() => setActiveProduct(product, index)}
                        style={{ cursor: "pointer" }}
                        className={index === currentIndex ? "table-primary" : ""}
                      >
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.price.toFixed(2)} €</td> 
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Button
                variant="danger"
                className="mt-4 w-100"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProduct(products[currentIndex]);
                }}
                disabled={currentIndex === -1}
              >
                Eliminar
              </Button>
            </Col>

            <Col md={5}>
              {currentProduct ? (
                <>
                  <h2>Detalles del Producto</h2>
                  <Card>
                    <Card.Body>
                      <Card.Title>{currentProduct.name}</Card.Title>
                      <Card.Text>
                        <strong>Marca:</strong> {currentProduct.brand}
                      </Card.Text>
                      <Card.Text>
                        <strong>Precio:</strong> {currentProduct.price.toFixed(2)} €
                      </Card.Text>
                      <Card.Text>
                        <strong>Estado:</strong> {currentProduct.active ? "Activo" : "Inactivo"}
                      </Card.Text>
                      <Card.Text>
                        <strong>Stock:</strong> {currentProduct.stock}
                      </Card.Text>
                      <Link to={`/products/${currentProduct.id}`} className="btn btn-warning btn-lg w-100">
                        Editar
                      </Link>
                      <Link to={`/comprar/${currentProduct.id}`} className="btn btn-warning btn-lg w-100">
                        Comprar
                      </Link>
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <h6>Selecciona un producto para mostrar la información</h6>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsList;
