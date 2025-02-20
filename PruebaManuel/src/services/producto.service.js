import http from "../http-common";

class ProductoDataService {
  findAll() {
    return http.get("/products");
  }

  create(data) {
    console.log(data);
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

}

export default new ProductoDataService();