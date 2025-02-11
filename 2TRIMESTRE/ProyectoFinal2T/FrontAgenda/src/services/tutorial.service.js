import http from "../http-common";

class TutorialDataService {
  getAllTutorials() {
    return http.get("/tutorials");
  }

  getTutorial(id) {
    return http.get(`/tutorials/${id}`);
  }

  createTutorial(data) {
    return http.post("/tutorials", data);
  }

  updateTutorial(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  deleteTutorial(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAllTutorial() {
    return http.delete(`/tutorials`);
  }

 // findByTitle(title) {
 //   return http.get(`/tutorials?title=${title}`);
 // }

 
 findByTitle(title) {
     return http.get(`/tutorials/title/${title}`);
   }
}

export default new TutorialDataService();