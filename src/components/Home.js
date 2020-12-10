import React from 'react'
import BookService from '../services/BookService'

import { Link } from 'react-router-dom';


class Home extends React.Component {

  state = {
    books: []
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
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }

  addToMyWishes = (book) => {
    const userID = this.props.isLogged._id
    const userName = this.props.isLogged.username
    this.service.addWish(book, userID, userName)
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
  }

  renderAllBooks = () => {
    return this.state.books.map((book, index) => {
      if (book.borrowedUser === ''){
      return (
        <div class="col card-container" key={index}>
          <div class="card h-100">
            <img src={book.imageUrl} class="card-img-top" alt={book.title} />
            <div class="card-body">
              <button onClick={() => this.addToMyWishes(book)}>I wish</button>
              <h5 class="card-title">{book.title}</h5>
              <p class="card-text">{book.owner.city} </p>
              <div class="card-footer">
                <small> User: <Link class="nav-item nav-link" to={`/publicProfile/${book.owner._id}`}> {book.owner.username}</Link></small>
              </div>
            </div>
          </div>

        </div> 
      )
    } else {
      return
    }
    })
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        {/* <h3>{this.props.isLogged.username && `Welcome, ${this.props.isLogged.username}`}</h3> */}

        <br />
        <br />

        {this.state.books.length === 0
          ? this.renderSpinner()
          :
          <div class="container">
            <div class="row row-cols-2 row-cols-md-4 g-4">
              {this.renderAllBooks()}
            </div>
          </div>

        }

      </div>
    )
  }

}

export default Home