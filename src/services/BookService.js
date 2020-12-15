  
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
      // console.log('file in service: ', theFile)
      return this.service.post('/uploadFile', theFile)
        .then(res => {
          console.log(res.data)
          return res.data  
        })
        .catch(this.errorHandler);
    }
   
  saveNewThing (newThing) {
      // console.log('new thing is: ', newThing)
      return this.service.post('/myBooks', newThing)
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