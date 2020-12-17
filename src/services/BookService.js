  
import axios from "axios";


class BookService {

  constructor() {
    let service = axios.create({
      baseURL: "https://project-book-exchange.herokuapp.com/",
      withCredentials: true
    });

    this.service = service;
  }

  getAllBooks = () => {
    return this.service.post("/allBooks")
    .then(response => response.data)
  }

  searchBooks = (city, title) => {
    return this.service.post("/showSearchedBooks", {city, title})
    .then(response => response.data)
  }

  getMyBooks = (owner) => {
    return this.service.post("/showMyBooks", {owner})
    .then(response => response.data)
  }

  addWish = (book, userID, userName) => {
    return this.service.post("/addWish", {book, userID, userName})
    .then(response => response.data)
  }

  viewMyWishes = (userID) => {
    return this.service.post("/viewWishes", {userID})
    .then(response => response.data)
  }

  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, {userID})
    .then(response => response.data)
  }

  errorHandler = (err) => {
    throw err;
  };
  
  handleUpload (theFile) {
      return this.service.post('/uploadFile', theFile)
        .then(res => res.data)
        .catch(this.errorHandler);
    }
   
  saveNewBook (newBook) {
      return this.service.post('/myBooks', newBook)
        .then(res => res.data)
        .catch(this.errorHandler);
    }

  deleteMyBook (book) {
    return this.service.post("/removeMyBook", {book})
    .then(response => response.data)
  }

  deleteMyWishBook(book, userID) {
    return this.service.post("/removeMyWishBook", {book, userID})
    .then(response => response.data)
  }

}

export default BookService;