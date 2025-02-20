import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Importar componentes de Bootstrap
import ProductDataService from '../services/product.service'; // Asegúrate de que la ruta sea correcta
import '../styles/add-edit.css'; // Importar estilos personalizados
import { useHistory } from 'react-router-dom'; // Importar useNavigate de React Router


function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: 0.0,
    active: false
  });

  const history = useHistory(); // Inicializar useNavigate


  const agregarProducto = (e) => {
    e.preventDefault(); // Evitar recargar la página
    ProductDataService.create(product)
      .then(response => {
        // Si el producto se guarda correctamente
        console.log('Producto agregado:', response.data);
        history.push("/");
      })
      .catch(e => {
        console.error('Error al agregar producto:', e);
      });
  };

  const setName = (e) => {
    setProduct({ ...product, name: e.target.value }); // Usar spread operator para actualizar el estado
  };

  const setBrand = (e) => {
    setProduct({ ...product, brand: e.target.value });
  };

  const setPrice = (e) => {
    setProduct({ ...product, price: parseFloat(e.target.value) }); // Convertir el precio a un número
  };

  const setStock = (e) => {
    setProduct({ ...product, stock: e.target.value });
  };

  const setActive = (e) => {
    setProduct({ ...product, active: e.target.checked });
  };



  return (
    <Container fluid className="full-width-container mt-4">
      <Row>
        <Col md={12} className="mb-4">
          <h1 className="mb-4 text-center">Añadir Producto</h1>

          <Form onSubmit={agregarProducto} className="w-100">
            <Row>
              <Col md={8} className="mx-auto">
                {/* Nombre */}
                <Form.Group controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del producto"
                    value={product.name}
                    onChange={setName}
                    className="form-control-lg"
                  />
                </Form.Group>

                {/* Marca */}
                <Form.Group controlId="formBrand" className="mt-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Marca del producto"
                    value={product.brand}
                    onChange={setBrand}
                    className="form-control-lg"
                  />
                </Form.Group>

                {/* Precio */}
                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Precio del producto"
                    value={product.price}
                    onChange={setPrice}
                    className="form-control-lg"
                    step="0.01" // Permitir ingresar decimales
                  />
                </Form.Group>

                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Precio del producto"
                    value={product.stock}
                    onChange={setStock}
                    className="form-control-lg"
                    step="0.01" // Permitir ingresar decimales
                  />
                </Form.Group>

                {/* Activo */}
                <Form.Group controlId="formActive" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Activo"
                    checked={product.active}
                    onChange={setActive}
                    className="form-check-lg"
                  />
                </Form.Group>

                {/* Botón de añadir */}
                <Button className="mt-4 w-100" variant="primary" type="submit" size="lg">
                  Añadir Producto
                </Button>
                
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
