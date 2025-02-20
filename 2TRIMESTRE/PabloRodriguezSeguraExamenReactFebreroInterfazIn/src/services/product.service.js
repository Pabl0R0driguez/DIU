import http from "../http-common";

class ProductDataService {
  // Obtener todos los productos
  getAll() {
    return http.get("/products");
  }

  // Obtener un producto por su ID
  get(id) {
    return http.get(`/products/${id}`);
  }

  // Crear un nuevo producto
  create(data) {
    return http.post("/products", data);
  }

  // Actualizar un producto existente
  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  // Eliminar un producto por su ID
  delete(id) {
    return http.delete(`/products/${id}`);
  }
}

export default new ProductDataService();
