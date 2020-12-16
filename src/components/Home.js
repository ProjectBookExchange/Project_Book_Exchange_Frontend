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
        this.setState({ message: result })

      })
      .catch((err) => console.log(err))
  }

  searchBook = (event) => {
    event.preventDefault();
    this.service.searchBooks(this.state.searchedBooks.owner_city, this.state.searchedBooks.title)
      .then((result) => {
        console.log(result)
        return result
      })
      .then((searched) => {
        this.setState({ books: searched })
        console.log(searched)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeInputsSearch = (_eventTarget) => {
    this.setState({ searchedBooks: { ...this.state.searchedBooks, [_eventTarget.name]: _eventTarget.value } });

  }

  renderAllBooks = () => {
    if(this.state.books === false){
      return <div class="container">No results found</div>
    }else{
      return this.state.books.map((book, index) => {
        return (
          <div className="card-container" class="col" key={index}>
            <div class="card">
              <img src={book.imageUrl} class="card-img-top" alt={book.title} />
              <div class="card-body">
                <div class="card-text text-right">
                  {this.props.isLogged.username
                    ? <Link class="button-noBack" data-toggle="tooltip" data-placement="top" data-html="true" title="Add to my wish list" onClick={() => this.addToMyWishes(book)}>
                      <div class="heart"></div>
                    </Link>

                    : <Link to="/login" class="button-noBack" data-toggle="tooltip" data-placement="top" data-html="true" title="Log in to added">
                      <div class="heart"></div>
                    </Link>
                  }
                </div>
                {(this.state.message === book._id) &&
                  <p class="errMessageWish">it's already on your list!</p>
                }

                {(this.state.message._id === book._id) &&
                  <p class="messageAddedWish">Added to your list</p>
                }
                <h6 class="card-title">{book.title}</h6>

                <p class="card-text">{book.author}</p>

                <div class="card-footer">

                  <small><Link class="nav-item nav-link" to={`/publicProfile/${book.owner._id}`}>User: {book.owner.username}</Link>
                    <img id="locationIcon" src="./images/locationIcon.png" alt="locationIcon" /> {book.owner_city}
                  </small>
                </div>
              </div>
            </div>

          </div>
        )
      
    })
    }
    
  }

  render() {
    return (
      <div className="home-page">

        {!this.props.isLogged.username

          ?
          <div class="container jumbo">
            <div class="row align-items-center">
              <div class="col-sm-2 col-md-5 jumb-text">

              <div>
                  <h2>BookExchange</h2>
                  <p> Get in touch with other readers and exchange your books with them</p>
                </div>

              <div>
               <button class="btn"><Link to="/signup">Sign Up</Link></button>
               <br/><br/>
               <small>Do you already have an account?</small> <Link to="/login" class="login-btn">Log in</Link>

              </div>
                
              </div>

              <div class="col-sm-2 col-md-7 jumb-image">
                <img src="./images/fondo.jpg" alt="fondo" />
              </div>
            </div>
          </div>

          : ''

        }

        <div class="container">
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

              <div class="col-sm-4 col-md-2 align-self-end search-div">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </div>
            </div>

          </form>
        </div>

        <br />

        {this.state.books.length === 0
          ? this.renderSpinner()
          :
          <div className="renderBooks" class="container">
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