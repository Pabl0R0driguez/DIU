const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa CORS
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

// Usar las rutas de productos
app.use('/api/v1/products', productRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
