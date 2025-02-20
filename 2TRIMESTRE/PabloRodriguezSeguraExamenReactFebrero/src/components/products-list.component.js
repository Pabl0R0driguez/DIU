import React, { useState, useEffect, useContext } from "react";
import ProductDataService from "../services/product.service"; // Asegúrate de que el nombre del archivo sea correcto
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container, ProgressBar, Table, Form } from "react-bootstrap";
import "../styles/tutorials.styles.css"; // Considera renombrar este archivo si ya no es específico de tutoriales
import { ProgressContext } from "../context/ProgressContext";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const { progress, setProgress } = useContext(ProgressContext);
   const [product, setProduct] = useState({
      stock:0
    });


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
  
// Barra de progreso con stock
  const updateProgress = (productsData) => {
    const maxProducts = 10; 
    const currentProgress = (productsData.length / maxProducts) * 100;
    const newProgress = Math.min(currentProgress, 100);
    setProgress(newProgress);
  };
 

/* const updateProgress = (productsData) => {
  const totalStock = productsData.reduce((sum, product) => sum + product.stock, 0); // Suma el stock total de todos los productos
  const maxStock = 1000; // Puedes ajustar este valor según tus necesidades (esto representaría el máximo de stock que deseas como 100%)
  const currentProgress = (totalStock / maxStock) * 100; // Calcula el progreso como un porcentaje
  const newProgress = Math.min(currentProgress, 100); // Asegura que el progreso no pase del 100%
  setProgress(newProgress);
}; */


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


                      {/* Si el producto está activo se puede comprar , sino saldrá como desabilitado el botón */}
                      {currentProduct.active  ? (
                          <Link to={`/comprar/${currentProduct.id}`} className="btn btn-warning btn-lg w-100">
                          Comprar
                          </Link>
                      ) : ( <button className="btn btn-warning btn-lg w-100" disabled>
                        Comprar
                      </button>)}
                     
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
