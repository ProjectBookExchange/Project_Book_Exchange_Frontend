import React from 'react'
import BookService from '../services/BookService'

class Profile extends React.Component {

    state = {
        books: [],
        newBook: {
            title: '',
            image: '',
            owner: this.props.isLogged._id
        }
    }

    service = new BookService()

    userID = this.props.isLogged._id

    addBook = (event) => {
        event.preventDefault()
        this.service.addToMyBooks(this.state.newBook.title, this.state.newBook.image, this.state.newBook.owner)
            .then((result) => console.log(result))
            .catch((err) => console.log(err))
    }

    changeHandlerAddBook(_eventTarget) {
        this.setState({ newBook: { ...this.state.newBook, [_eventTarget.name]: _eventTarget.value } })

        // const aNewBook = {...this.state.newBook}
        // this.setState({books: {...this.state.books, aNewBook}})
    }

    componentDidMount() {
        this.service.getMyBooks(this.props.isLogged._id)
            .then((result) => {
                return result.myBooks
            })
            .then((myBooks) => {
                this.setState({ books: myBooks })
            })
            .catch((err) => console.log(err))
    }

    renderMyBooks() {
        return this.state.books.map((book, index) => {
            return (
                <div key={index}>
                    <p>{book.title}</p>
                </div>
            )
        })
    }

    renderSpinner = () => {
        return (
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Welcome, {this.props.isLogged.username}, this is your profile page</h2>

                <h3>Add a Book</h3>

                <form>

                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        onChange={(event) => this.changeHandlerAddBook(event.target)}
                    />

                    <label htmlFor="image">Image: </label>
                    <input
                        type="text"
                        name="image"
                        onChange={(event) => this.changeHandlerAddBook(event.target)}
                    />

                    <button onClick={this.addBook} type="submit">Añadir libro</button>

                </form>

                <div>
                    <h3>Mis libros</h3>
                    {/* {this.renderMyBooks()} */}
                    {/* {this.state.books.map((book)=>{
                    return <p>{book.title}</p>
                })} */}
                    {this.state.books.length === 0 ? this.renderSpinner() : this.renderMyBooks()}
                </div>

            </div>
        )
    }
}

export default Profile