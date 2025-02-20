import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ProductoDataService from "../services/producto.service";
import { useHistory } from "react-router-dom";
import "../styles/add-edit.css";

function EditProducto() {
  const id = window.location.pathname.split("/")[2]; // Obtener el ID de la URL
  const history = useHistory();

  const [producto, setProducto] = useState({
    id: id,
    name: "",
    brand: "",
    stock: "",
    price: "",
    active: false,
  });

  // Cargar todos los productos cuando se monta el componente
  useEffect(() => {
    ProductoDataService.findAll()  // Usamos findAll para obtener todos los productos
      .then((response) => {
        // Buscar el producto que coincida con el id
        const productoEncontrado = response.data.find((p) => p.id === id);
        if (productoEncontrado) {
          setProducto(productoEncontrado);  // Si se encuentra, lo seteamos en el estado
        }
      })
      .catch((err) => console.log(err));
  }, [id]);  // Se vuelve a ejecutar si cambia el ID

  // Manejar la edición del producto
  const editTutorial = (e) => {
    e.preventDefault();
    ProductoDataService.update(id, producto)  // Actualizamos el producto
      .then(() => {
        history.push("/products");  // Redirigir a la lista de productos
      })
      .catch((err) => console.log(err));
  };

  // Actualizar campos del estado
  const setNombre = (e) => {
    setProducto({ ...producto, name: e.target.value });
  };

  const setMarca = (e) => {
    setProducto({ ...producto, brand: e.target.value });
  };

  const setStock = (e) => {
    setProducto({ ...producto, stock: e.target.value });
  };

  const setPrecio = (e) => {
    setProducto({ ...producto, price: e.target.value });
  };

  const setActivo = (e) => {
    setProducto({ ...producto, active: e.target.checked });
  };

  return (
    <Container className="full-width-container mt-4">
      <Row>
        <Col md={12} className="mb-4">
          <h1 className="mb-4 text-center">Editar Producto</h1>

          <Form onSubmit={editTutorial} className="w-100">
            <Row>
              <Col md={8} className="mx-auto">
                {/* Campos del formulario */}
                <Form.Group controlId="formTitle">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    value={producto.name}
                    onChange={setNombre}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Stock"
                    value={producto.stock}
                    onChange={setStock}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group controlId="formBrand" className="mt-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Marca"
                    value={producto.brand}
                    onChange={setMarca}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Precio"
                    value={producto.price}
                    onChange={setPrecio}
                    className="form-control-lg"
                  />
                </Form.Group>

                {/* Checkbox para el campo "active" */}
                <Form.Group controlId="formActive" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Activo"
                    className="form-check-lg"
                    onChange={setActivo}
                    checked={producto.active}
                  />
                </Form.Group>

                {/* Botón de actualizar */}
                <Button
                  className="mt-4 w-100"
                  variant="primary"
                  type="submit"
                  size="lg"
                >
                  Actualizar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProducto;
