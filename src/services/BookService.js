  
import axios from "axios";


class BookService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3001",
      withCredentials: true
    });

    this.service = service;
  }

  getAllBooks = () => {
    return this.service.post("/allBooks")
    .then(response => response.data)
  }

 addToMyBooks = (title, image, owner) => {
    return this.service.post("/myBooks", {title, image, owner})
    .then(response => response.data)
  }

  getMyBooks = (owner) => {
    return this.service.post("/showMyBooks", {owner})
    .then(response => response.data)
  }

  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, {userID})
    .then(response => response.data)
  }

}

export default BookService;