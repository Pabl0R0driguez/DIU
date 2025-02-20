import React, { useState, useEffect, useContext } from "react";
import ProductDataService from "../services/product.service"; 
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container, ProgressBar, Table, Form } from "react-bootstrap";
import { ProgressContext } from "../context/ProgressContext";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const { progress, setProgress } = useContext(ProgressContext);
  const [quantity, setQuantity] = useState(0); // Estado para la cantidad de compra
  const [isBuyingEnabled, setIsBuyingEnabled] = useState(false); // Estado para habilitar el botón de compra

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then((response) => {
        console.log("Productos recibidos:", response.data);
        setProducts(response.data);
        updateProgress(response.data);
      })
      .catch((e) => {
        console.log("Error al recuperar productos:", e);
      });
  };

  const updateProgress = (productsData) => {
    const maxProducts = 10; 
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
    setQuantity(0); // Resetear cantidad al seleccionar un producto
    setIsBuyingEnabled(false); // Deshabilitar compra inicialmente
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

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchTitleFunc = () => {
    ProductDataService.getAll()
      .then((response) => {
        const filteredProducts = response.data.filter((product) =>
          product.name.toLowerCase().includes(searchTitle.toLowerCase())
        );
        setProducts(filteredProducts);
        updateProgress(filteredProducts);
      })
      .catch((e) => {
        console.log("Error en la búsqueda:", e);
      });
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(0, e.target.value); // Asegurarse de que el valor no sea negativo
    setQuantity(value);

    // Verificar si la cantidad solicitada no excede el stock disponible
    if (value > currentProduct.stock) {
      setIsBuyingEnabled(false);
    } else {
      setIsBuyingEnabled(true);
    }
  };

  const comprarProducto = (e) => {
    e.preventDefault();

    if (quantity <= 0) {
      alert("La cantidad debe ser mayor a 0");
      return;
    }

    if (quantity > currentProduct.stock) {
      alert("No hay suficiente stock disponible");
      return;
    }

    const nuevoStock = currentProduct.stock - quantity;

    ProductDataService.update(currentProduct.id, { ...currentProduct, stock: nuevoStock })
      .then(() => {
        alert(`Compra realizada con éxito: ${quantity} unidades de ${currentProduct.name}`);
        refreshList(); // Recargar lista de productos
      })
      .catch((err) => {
        console.error('Error al actualizar el stock:', err);
      });
  };

  return (
    <Container fluid className="contenedor" style={{ marginTop: "70px" }}>
      <Form className="mb-3">
        <Row className="align-items-center">
          <Col md={9} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Button
              variant="primary"
              className="w-100"
              onClick={searchTitleFunc}
            >
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mb-4">
        <Col md={12}>
          <h4 className="text-center">Progreso de Productos</h4>
          <ProgressBar animated now={progress} label={`${Math.round(progress)}%`} />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <Row>
            <Col md={7}>
              <h4 className="mb-4">Lista de Productos</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Stock</th>
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
                        <td>{product.stock}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>

            <Col md={5}>
              <Row className="mb-4 d-flex justify-content-between">
                {/* Botones de eliminar, añadir y editar */}
                <Col xs={4}>
                  <Button
                    variant="danger"
                    className="w-100"
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
                <Col xs={4}>
                  <Link to="/add">
                    <Button variant="success" className="w-100" size="lg">
                      Añadir
                    </Button>
                  </Link>
                </Col>
                <Col xs={4}>
                  {currentProduct && (
                    <Link to={`/products/${currentProduct.id}`}>
                      <Button variant="warning" className="w-100" size="lg">
                        Editar
                      </Button>
                    </Link>
                  )}
                </Col>
              </Row>

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

                      {/* Campo de cantidad */}
                      <div className="mb-3">
                        <label htmlFor="quantity">Cantidad:</label>
                        <input
                          type="number"
                          id="quantity"
                          value={quantity}
                          onChange={handleQuantityChange}
                          min="1"
                          max={currentProduct.stock}
                          className="form-control"
                          disabled={!currentProduct.active}
                        />
                      </div>

                      {/* Botón de compra */}
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={comprarProducto}
                        disabled={!isBuyingEnabled || !currentProduct.active}
                      >
                        Comprar
                      </Button>
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
