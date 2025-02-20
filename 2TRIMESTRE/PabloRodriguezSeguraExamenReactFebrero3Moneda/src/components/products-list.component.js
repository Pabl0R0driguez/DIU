import React, { useState, useEffect, useContext } from "react";
import ProductDataService from "../services/product.service"; 
import { Button, Card, Col, Row, Container, Table, Form } from "react-bootstrap";
import { ProgressContext } from "../context/ProgressContext";
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { progress, setProgress } = useContext(ProgressContext);
  const [convertedPrice, setConvertedPrice] = useState(null);

  const exchangeRate = 1.10; // 1 EUR = 1.10 USD (ejemplo)

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then((response) => {
        setProducts(response.data);
        updateProgress(response.data);
      })
      .catch((e) => {
        console.error("Error al recuperar productos:", e);
      });
  };

  const updateProgress = (productsData) => {
    const maxProducts = 10;
    setProgress(Math.min((productsData.length / maxProducts) * 100, 100));
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
    setConvertedPrice(null); // Resetear conversión al cambiar de producto
  };

  const convertCurrency = () => {
    if (!currentProduct || currentProduct.isConverted) return;
    
    const priceInUSD = currentProduct.price * exchangeRate;
    setConvertedPrice(priceInUSD.toFixed(2));

    // Actualizar el producto seleccionado con el nuevo precio en USD
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === currentProduct.id 
          ? { ...p, priceInUSD: priceInUSD, isConverted: true } 
          : p
      )
    );
  };

  const addProduct = () => {
    // Aquí va la lógica para añadir un producto (probablemente una llamada a la API)
    console.log("Añadir producto");
  };

  const editProduct = () => {
    if (!currentProduct) return;
    // Aquí va la lógica para editar un producto (probablemente una llamada a la API)
    console.log("Editar producto", currentProduct);
  };

  const deleteProduct = () => {
    if (!currentProduct) return;
    // Aquí va la lógica para eliminar un producto (probablemente una llamada a la API)
    console.log("Eliminar producto", currentProduct);
    // También se debería actualizar el estado de los productos
    setProducts(products.filter((product) => product.id !== currentProduct.id));
    setCurrentProduct(null);
  };

  return (
    <Container fluid style={{ marginTop: "70px" }}>
      <Row>
        <Col md={7}>
          <h4 className="mb-4">Lista de Productos</h4>
          <div className="mb-3">
            {/* Enlace para añadir producto */}
            <Link to={`/add`}>
              <Button variant="success" onClick={addProduct}>Añadir Producto</Button>
            </Link>

            {/* Enlace para editar producto, solo si hay un producto seleccionado */}
            {currentProduct && (
              <Link to={`/edit/${currentProduct.id}`}>
                <Button variant="warning" onClick={editProduct} className="ml-2">Editar Producto</Button>
              </Link>
            )}

            {currentProduct && (
                <Button variant="danger" onClick={deleteProduct} className="ml-2">Eliminar Producto</Button>
            )}
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio ({convertedPrice ? "USD" : "EUR"})</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  onClick={() => setActiveProduct(product, index)}
                  style={{ cursor: "pointer" }}
                  className={index === currentIndex ? "table-primary" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.priceInUSD ? product.priceInUSD.toFixed(2) : product.price.toFixed(2)} {product.priceInUSD ? "USD" : "€"}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={5}>
          {currentProduct ? (
            <>
              <h4>Detalles del Producto</h4>
              <Card>
                <Card.Body>
                  <Card.Title>{currentProduct.name}</Card.Title>
                  <Card.Text>
                    <strong>Marca:</strong> {currentProduct.brand}
                  </Card.Text>
                  <Card.Text>
                    <strong>Precio:</strong> {convertedPrice ? `${convertedPrice} USD` : `${currentProduct.price.toFixed(2)} €`}
                  </Card.Text>
                  <Card.Text>
                    <strong>Stock:</strong> {currentProduct.stock}
                  </Card.Text>

                  {/* Conversor de Moneda dentro del detalle del producto */}
                  <Form.Group className="mt-3">
                    <Button 
                      variant="primary" 
                      onClick={convertCurrency} 
                      disabled={currentProduct.isConverted}
                    >
                      Convertir a USD
                    </Button>
                  </Form.Group>

                  {convertedPrice && (
                    <div className="mt-3">
                      <h5>Precio convertido:</h5>
                      <p>{convertedPrice} USD</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <h6>Selecciona un producto para ver los detalles</h6>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsList;
