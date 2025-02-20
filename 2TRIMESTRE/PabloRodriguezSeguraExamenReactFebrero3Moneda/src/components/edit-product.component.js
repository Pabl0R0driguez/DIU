import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Importar react-bootstrap
import ProductDataService from '../services/product.service'; // Asegúrate de que la ruta sea correcta
import { useHistory } from 'react-router-dom'; // Usamos useHistory para redirigir
import '../styles/add-edit.css'; // Importar estilos personalizados

function EditProduct() {
    const id = window.location.pathname.split('/')[2]; // Obtener ID del producto desde la URL
    const history = useHistory();

    const [product, setProduct] = useState({
        id: id,
        name: '',
        brand: '',
        price: 0.0,
        active: false,
    });

    // Cargar todos los productos y buscar el producto específico cuando se monta el componente
    useEffect(() => {
        ProductDataService.getAll() // Obtén todos los productos
            .then(response => {
                const productToEdit = response.data.find(prod => prod.id === id); // Encuentra el producto por ID
                if (productToEdit) {
                    setProduct(productToEdit); // Establece el producto encontrado en el estado
                } else {
                    console.error(`Producto con ID ${id} no encontrado.`);
                }
            })
            .catch(err => {
                console.error('Error al cargar los productos:', err);
            });
    }, [id]);

    // Manejar la edición del producto
    const editProduct = (e) => {
        e.preventDefault();
        ProductDataService.update(id, product)
            .then(() => {
                history.push('/'); // Redirigir a la lista de productos
            })
            .catch(err => {
                console.error('Error al actualizar el producto:', err);
            });
    };

    // Handlers para actualizar el estado
    const setName = (e) => {
        setProduct({ ...product, name: e.target.value });
    };

    const setBrand = (e) => {
        setProduct({ ...product, brand: e.target.value });
    };

    const setPrice = (e) => {
        setProduct({ ...product, price: parseFloat(e.target.value) });
    };

    const setStock = (e) => {
        setProduct({ ...product, stock: e.target.value });
      };

    const setActive = (e) => {
        setProduct({ ...product, active: e.target.checked });
    };

    return (
        <Container className="full-width-container mt-4">
            <Row>
                <Col md={12} className="mb-4">
                    <h1 className="mb-4 text-center">Editar Producto</h1>

                    <Form onSubmit={editProduct} className="w-100">
                        <Row>
                            <Col md={8} className="mx-auto">
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

                                <Form.Group controlId="formPrice" className="mt-3">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Precio del producto"
                                        value={product.price}
                                        onChange={setPrice}
                                        className="form-control-lg"
                                        step="0.01" // Permite ingresar decimales
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
                                        step="0.01" // Permite ingresar decimales
                                    />
                                </Form.Group>



                                <Form.Group controlId="formActive" className="mt-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Activo"
                                        checked={product.active}
                                        onChange={setActive}
                                        className="form-check-lg"
                                    />
                                </Form.Group>

                                <Button className="mt-4 w-100" variant="primary" type="submit" size="lg">
                                    Actualizar Producto
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProduct;
