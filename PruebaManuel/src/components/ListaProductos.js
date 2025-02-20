import React, { useState, useEffect, useContext } from "react";
import ProductoDataService from "../services/producto.service";
import { Link } from "react-router-dom";
import { Form, Button, Card, Col, Row, Container, ProgressBar, Table } from "react-bootstrap";
import "../styles/tutorials.styles.css";
import { ContactContext } from "../providers/ContactContext";

const ContactosList = () => {
  const [productos, setContactos] = useState([]); // Lista de productos
  const [productoSeleccionado, setCurrentProducto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [buscarNombre, setBuscarNombre] = useState(""); // Valor de búsqueda
  const [progreso, setProgreso] = useState(0);

  // use context
  const { numeroProductos } = useContext(ContactContext);
  const { setNumeroProductos } = useContext(ContactContext);
  const { productosMaximo } = useContext(ContactContext);

  useEffect(() => {
    retrieveContactos();
  }, []);

  // Obtener los productos desde el servicio y actualizar el estado global
  const retrieveContactos = () => {
    ProductoDataService.findAll()
      .then((response) => {
        setContactos(response.data);
        actualizarProgreso(response.data.length);
        setNumeroProductos(response.data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const actualizarProgreso = (contactCount) => {
    const progresoActual = (contactCount / productosMaximo) * 100;
    setProgreso(Math.min(progresoActual, 100));
  };

  const onchangeNombre = (e) => {
    setBuscarNombre(e.target.value);
  };

  // Filtrar los productos por nombre 
  const productosFiltrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(buscarNombre.toLowerCase())
  );

  const setActiveProducto = (contacto, index) => {
    setCurrentProducto(contacto);
    setCurrentIndex(index);
  };

  const removeContacto = () => {
    if (!productoSeleccionado) return;

    ProductoDataService.delete(productoSeleccionado.id)
      .then(() => {
        retrieveContactos(); // Recargar la lista después de eliminar
        setCurrentIndex(-1);
      })
      .catch((e) => {
        console.error("Error al eliminar el contacto:", e);
      });
  };

  return (
    <>
      {/* Barra de Progreso */}
      <Container fluid className="contenedor">
        <Row className="mb-4">
          <Col md={12}>
            <h4 className="text-center">Progreso de Productos</h4>
            <ProgressBar
              animated
              now={progreso}
              label={`${Math.round(progreso)}%`}
            />
          </Col>
        </Row>

        <Row>
          {/* Fila de búsqueda */}
          <Col md={12} className="mb-4">
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre"
                    value={buscarNombre}
                    onChange={onchangeNombre}
                    className="form-control-lg"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Col>

          {/* Lista de Contactos */}
          <Col md={12} className="mb-4">
            <Row>
              <Col md={5}>
                <h4 className="mb-4">Lista de Productos</h4>
                <Table className="table table-striped table-borderless table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados &&
                      productosFiltrados.map((contacto, index) => (
                        <tr
                          key={index}
                          onClick={() => setActiveProducto(contacto, index)}
                        >
                          <td>{contacto.name}</td>
                          <td>{contacto.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>

                <Button
                  variant="danger"
                  className="mt-4 w-100"
                  size="lg"
                  onClick={removeContacto}
                >
                  Eliminar
                </Button>
              </Col>

              {/* Detalles del Contacto */}
              <Col md={7}>
                <h4 className="mb-4">Detalles del Producto</h4>
                {productoSeleccionado ? (
                  <Card>
                    <Card.Body>
                      <Card.Title>{productoSeleccionado.name}</Card.Title>
                      <Card.Text>
                        <strong>Stock:</strong> {productoSeleccionado.stock}
                      </Card.Text>
                      <Card.Text>
                        <strong>Marca:</strong> {productoSeleccionado.brand}
                      </Card.Text>
                      <Card.Text>
                        <strong>Precio:</strong> {productoSeleccionado.price}
                      </Card.Text>
                      <Card.Text>
                        <strong>Activo:</strong> {productoSeleccionado.active ? "Sí" : "No"}
                      </Card.Text>
                      <Link
                        to={`/contactos/${productoSeleccionado.id}`}
                        className="btn btn-warning btn-lg w-100"
                      >
                        Editar
                      </Link>
                    </Card.Body>
                  </Card>
                ) : (
                  <h6>Selecciona un producto para mostrar la información</h6>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactosList;
