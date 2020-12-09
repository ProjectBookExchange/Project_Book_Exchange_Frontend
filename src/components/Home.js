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
  return this.state.books.map((book, index)=>{
    return(
      <div key={index} className="all-books-list">
            <p>{book.title}</p>
            <img src={book.image_path} alt={book.image_name}/>
            <p>{book.owner.city}</p>
            <p>{book.owner.username}</p>
      </div>

    )
  })
}

render(){
    return (
    <div>
      <h2>Home</h2>
      <h3>{this.props.isLogged.username && `Welcome, ${this.props.isLogged.username}`}</h3>
      {this.props.isLogged.username && <button onClick={() => this.props.logOut()}>Log Out</button>}

      {this.state.books.length === 0 ? this.renderSpinner() : this.renderAllBooks()}

    </div>
  )
}

}

export default Home