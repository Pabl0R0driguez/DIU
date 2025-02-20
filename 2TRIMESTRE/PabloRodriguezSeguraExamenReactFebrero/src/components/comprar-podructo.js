import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Importar react-bootstrap
import ProductDataService from '../services/product.service'; // Asegúrate de que la ruta sea correcta
import { useHistory } from 'react-router-dom'; // Usamos useHistory para redirigir
import '../styles/add-edit.css'; // Importar estilos personalizados

function ComprarProducto() {
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
                history.push('/products'); // Redirigir a la lista de productos
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

    const setActive = (e) => {
        setProduct({ ...product, active: e.target.checked });
    };

    return (
        <Container className="full-width-container mt-4">
            <Row>
                <Col md={12} className="mb-4">
                    <h1 className="mb-4 text-center">Comprar Producto</h1>

                    <Form onSubmit={editProduct} className="w-100">
                        <Row>
                            <Col md={8} className="mx-auto">
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre del producto"
                                        value={product.name}
                                        readOnly
                                        className="form-control-lg"
                                    />
                                </Form.Group>

            
                               
                            <Form.Group controlId="formStock" className="mt-3">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Número de stock"
                                    value={product.stock}
                                    onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                                    className="form-control-lg"
                                />
                            </Form.Group>

                            
                                <Button className="mt-4 w-100" variant="primary" type="submit" size="lg">
                                    Comprar Producto
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ComprarProducto;
