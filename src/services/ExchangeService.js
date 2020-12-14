  
import axios from "axios";


class ExchangeService {

  constructor() {
    let service = axios.create({
      baseURL: "https://project-book-exchange.herokuapp.com/",
      withCredentials: true
    });

    this.service = service;
  }

    moveBorrowedBooks = (book, profile) => {
        return this.service.post("/moveBorrowed", {book, profile})
        .then(response => response.data)
    }

    viewExchanges = (userID) => {
      return this.service.post("/viewExchanges", {userID})
      .then(response => response.data)
    }

}

export default ExchangeService;