  
import axios from "axios";


class UserService {

  constructor() {
    let service = axios.create({
      baseURL: "https://project-book-exchange.herokuapp.com/",
      withCredentials: true
    });


    this.service = service;
  }

  signup = (username, password, city, contact) => {
    return this.service.post("/signup", {username, password, city, contact})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post("/login", {username, password})
    .then(response => response.data)
  }

  loggedin = () =>{
    return this.service.get("/loggedin")
    .then(response => response.data)
  }

  logout = () =>{
    return this.service.post("/logout", {})
    .then(response => response.data)
  }

  viewPublicProfile = (userID)=>{
    return this.service.post(`/publicProfile/${userID}`, {userID})
    .then(response => response.data)
  }
}

export default UserService;