import axios from "axios";

export default axios.create({
baseURL: "http://proyectofinaldiuprs-env.eba-hrpih8jm.us-east-1.elasticbeanstalk.com:8099/api/v1/",
 // baseURL: "http://localhost:8099/api/v1/",
headers: {
    "Content-type": "application/json"
  }
}); 
