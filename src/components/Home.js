import React from 'react'
import BookService from '../services/BookService'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/home.css';

import { Link } from 'react-router-dom';


class Home extends React.Component {

  state = {
    books: [],
    searchedBooks: [],
    message: [],
  }

  service = new BookService()

  componentDidMount() {

    this.service.getAllBooks()
      .then((result) => {
        return result
      })
      .then((allBooks) => {
        this.setState({ books: allBooks })
      })
      .catch((err) => console.log(err))
  }

  renderSpinner = () => {
    return (
      <div className="spinnerDiv" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }

  addToMyWishes = (book) => {
    const userID = this.props.isLogged._id
    const userName = this.props.isLogged.username
    this.service.addWish(book, userID, userName)
      .then((result) => {
        console.log(result)
        this.setState({ message: result })
       
      })
      .catch((err) => console.log(err))
  }

  searchBook = (event) => {
    event.preventDefault();
    this.service.searchBooks(this.state.searchedBooks.owner_city, this.state.searchedBooks.title)
      .then((result) => {
        return result
      })
      .then((searched) => {
        this.setState({ books: searched })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeInputsSearch = (_eventTarget) => {
    this.setState({ searchedBooks: { ...this.state.searchedBooks, [_eventTarget.name]: _eventTarget.value } });

  }

  renderAllBooks = () => {
    return this.state.books.map((book, index) => {
      if (book.borrowedUser === '') {
        return (
          <div className="card-container" class="col" key={index}>
            <div class="card">
              <img src={book.imageUrl} class="card-img-top" alt={book.title}/>
              <div class="card-body">
                <h6 class="card-title">{book.title}</h6>
                <p class="card-text">{book.author}</p>

              {(this.state.message === book._id) &&
              <p class="errMessageWish">it's already on your list!</p>  
              }

{(this.state.message._id === book._id) &&
              <p class="messageAddedWish">Added to your list</p>  
              }

                {/* <p class="errMessageWish">{this.state.message}</p> */}

                {this.props.isLogged.username
                  ? <button class="btn" type="button" onClick={() => this.addToMyWishes(book)}>I wish</button>
                  : <Link to="/login" type="button" class="btn">I wish</Link>
                }

                <div class="card-footer">

                  <small><Link class="nav-item nav-link" to={`/publicProfile/${book.owner._id}`}>User: {book.owner.username}</Link>
                    <img id="locationIcon" src="./images/locationIcon.png" alt="locationIcon" /> {book.owner_city}
                  </small>
                </div>
              </div>
            </div>

          </div>
        )
      } else {
        return '';
      }
    })
  }

  render() {
    return (
      <div className="home-page">

        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-5">BookExchange</h1>
            <p>No compras ni vendas, intercambia libros con otros usuarios amantes de la lectura</p>

            <form class="container search-bar text-left" onSubmit={this.searchBook}>
              <div class="row align-items-center">
                <div class="col-sm-4 col-md-5">
                  <label htmlFor="city">City:</label>
                  <input class="form-control me-2" type="search" placeholder="e.g. Barcelona" name="owner_city" onChange={(event) => this.changeInputsSearch(event.target)} />
                </div>

                <div class="col-sm-4 col-md-5">
                  <label htmlFor="title">Title:</label>
                  <input class="form-control me-2" type="search" placeholder="e.g. El Hobbit" name="title" onChange={(event) => this.changeInputsSearch(event.target)} />
                </div>

                <div class="col-sm-4 col-md-2 align-self-end">
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </div>
              </div>

            </form>
          </div>
        </div>


        <br />
        <br />

        {this.state.books.length === 0
          ? this.renderSpinner()
          :
          <div className="renderBooks" class="container">
            {/* <div class="row row-cols-2 row-cols-md-4 g-4"> */}
            <div class="row row-cols-2 row-cols-md-5 g-4">

              {this.renderAllBooks()}
            </div>
          </div>

        }

      </div>
    )
  }

}

export default Home