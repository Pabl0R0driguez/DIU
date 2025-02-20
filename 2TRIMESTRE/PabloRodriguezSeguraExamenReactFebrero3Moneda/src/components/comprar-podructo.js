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
        stock: 0,   // Asegurar que el stock inicie en 0
        active: false,
    });

    const [cantidadCompra, setCantidadCompra] = useState(0); // Estado para la cantidad de stock a comprar

    // Cargar todos los productos y buscar el producto específico cuando se monta el componente
    useEffect(() => {
        ProductDataService.getAll()
            .then(response => {
                const productToEdit = response.data.find(prod => prod.id === id);
                if (productToEdit) {
                    setProduct(productToEdit);
                } else {
                    console.error(`Producto con ID ${id} no encontrado.`);
                }
            })
            .catch(err => {
                console.error('Error al cargar los productos:', err);
            });
    }, [id]);

    // Manejar la compra del producto (restar stock)
    const comprarProducto = (e) => {
        e.preventDefault();

        if (cantidadCompra <= 0) {
            alert("La cantidad debe ser mayor a 0");
            return;
        }

        if (cantidadCompra > product.stock) {
            alert("No hay suficiente stock disponible");
            return;
        }

        const nuevoStock = product.stock - cantidadCompra;

        ProductDataService.update(id, { ...product, stock: nuevoStock })
            .then(() => {
                history.push('/'); 
            })
            .catch(err => {
                console.error('Error al actualizar el stock:', err);
            });
    };

    return (
        <Container className="full-width-container mt-4">
            <Row>
                <Col md={12} className="mb-4">
                    <h1 className="mb-4 text-center">Comprar Producto</h1>

                    <Form onSubmit={comprarProducto} className="w-100">
                        <Row>
                            <Col md={8} className="mx-auto">
                                {/* Nombre solo lectura */}
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

                                {/* Stock actual (solo lectura) */}
                                <Form.Group controlId="formStockActual" className="mt-3">
                                    <Form.Label>Stock disponible</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={product.stock}
                                        readOnly
                                        className="form-control-lg"
                                    />
                                </Form.Group>

                                {/* Cantidad a comprar */}
                                <Form.Group controlId="formCantidadCompra" className="mt-3">
                                    <Form.Label>Cantidad a comprar</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese cantidad"
                                        value={cantidadCompra}
                                        onChange={(e) => setCantidadCompra(parseInt(e.target.value) || 0)}
                                        className="form-control-lg"
                                    />
                                </Form.Group>

                                {/* Botón de comprar */}
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
