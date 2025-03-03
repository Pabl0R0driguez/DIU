import axios from "axios";

export default axios.create({
baseURL: "http://proyectodiuprs-env.eba-xgtf4utg.us-east-1.elasticbeanstalk.com:8099/api/v1/agenda",
// baseURL: "http://localhost:8099/api/v1/",
headers: {
    "Content-type": "application/json"
  }
}); 
