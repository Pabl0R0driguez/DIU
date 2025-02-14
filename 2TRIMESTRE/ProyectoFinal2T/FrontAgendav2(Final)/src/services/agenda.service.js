import http from "../http-common";

class AgendaDataService {
  getAllPersonas() {
    return http.get("/agenda");
  }

  getPersona(id) {
    return http.get(`/agenda/${id}`);
  }

  createPersona(data) {
    return http.post("/agenda", data);
  }

  updatePersona(id, data) {
    return http.put(`/agenda/${id}`, data);
  }

  deletePersona(id) {
    return http.delete(`/agenda/${id}`);
  }

  deleteAllPersonas() {
    return http.delete(`/agenda`);
  }

 // findByTitle(title) {
 //   return http.get(`/tutorials?title=${title}`);
 // }

 
 findByNombre(nombre) {
     return http.get(`/agenda/nombre/${nombre}`);
   }
}

export default new AgendaDataService();