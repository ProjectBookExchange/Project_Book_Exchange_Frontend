import React from 'react'
import BookService from '../services/BookService'


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

  renderAllBooks = () => {
    return this.state.books.map((book, index) => {
      return (
        <div class="col card-container" key={index}>
          <div class="card h-100">
            <img src={book.imageUrl} class="card-img-top" alt={book.title} />
            <div class="card-body">
              <h5 class="card-title">{book.title}</h5>
              <p class="card-text">{book.owner.city} </p>
              <div class="card-footer">
                <small class="text-muted">{book.owner.username}</small>
              </div>
            </div>
          </div>
        </div>
      )
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