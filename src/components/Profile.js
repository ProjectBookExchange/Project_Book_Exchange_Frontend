import React from 'react'
import BookService from '../services/BookService'
import ExchangeService from '../services/ExchangeService';
import UserService from '../services/UserService';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/profile.css';

import { Link } from 'react-router-dom';


class Profile extends React.Component {

    state = {
        books: [],
        myWishes: [],
        newBook: {
            title: '',
            author: '',
            imageUrl: '',
            owner: this.props.isLogged._id,
            owner_name: this.props.isLogged.username,
            owner_city: this.props.isLogged.city
        },
        showForm: false,
        showMyBooks: true,
        showMyWishes: false
    }

    service = new BookService()
    serviceExchange = new ExchangeService()
    serviceUser = new UserService()

    userID = this.props.isLogged._id

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ newBook: { ...this.state.newBook, [name]: value } })
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.service.handleUpload(uploadData)
            .then(response => {
                return this.setState({ newBook: { ...this.state.newBook, imageUrl: response.secure_url } });
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.service.saveNewThing(this.state.newBook)
            .then(res => {
                // console.log('added: ', res);
                this.rerender()
                this.setState({ showForm: false })
                // here you would redirect to some other page 
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    componentDidMount() {
        this.service.getMyBooks(this.props.isLogged._id)
            .then((result) => {
                return result.myBooks
            })
            .then((myBooks) => {
                this.setState({ books: myBooks })
                this.getMyWishes()
            })
            .catch((err) => console.log(err))
    }

    rerender() {
        this.service.getMyBooks(this.props.isLogged._id)
            .then((result) => {
                return result.myBooks
            })
            .then((myBooks) => {
                this.setState({ books: myBooks })
                this.getMyWishes()
            })
            .catch((err) => console.log(err))
    }

    getMyWishes() {
        this.service.viewMyWishes(this.props.isLogged._id)
            .then((result) => {
                return result
            })
            .then((wishesData) => {
                this.setState({ myWishes: wishesData })
            })
            .catch((err) => console.log(err))
    }

    removeMyBook(book) {
        this.service.deleteMyBook(book)
            .then(() => {
                this.rerender()
            })
            .catch((err) => console.log(err))
    }

    removeMyWishBook(book) {
        this.service.deleteMyWishBook(book, this.userID)
            .then(() => {
                this.rerender()
            })
            .catch((err) => console.log(err))
    }

    renderMyBooks() {
        return this.state.books.map((book, index) => {
            if (book.borrowedUser === '') {
                return (
                    <div key={index} class="col card-container">
                        <div class="card">
                            <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                            <div class="card-body">
                                <h5 class="card-title">{book.title}</h5>
                                <p class="card-text">{book.author}</p>
                                <button onClick={() => this.removeMyBook(book)} class="btn btn-delete">Remove</button>
                                <div class="card-footer">
                                    <small class="text-muted">Interested:</small><br />
                                    {book.interestedUsers.map((user, index) => {
                                        return (
                                            <small class="text-muted"><Link to={`/publicProfile/${user.interestedUserID}`}>
                                                {user.interestedUserName}
                                            </Link>, </small>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            } else {
                return ''
            }

        })
    }

    renderMyWishes() {
        return this.state.myWishes.map((book, index) => {
            if (book.borrowedUser === '') {
                return (
                    <div key={index} class="col card-container">
                        <div class="card h-100">
                            <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                            <div class="card-body">
                                <h5 class="card-title">{book.title}</h5>
                                <p class="card-text">{book.author}</p>
                                <button onClick={() => this.removeMyWishBook(book)} class="btn btn-delete">Remove</button>
                                <div class="card-footer">
                                    <small class="text-muted">User:
                                <Link to={`/publicProfile/${book.owner}`}>
                                            {book.owner_name}
                                        </Link>

                                    </small>

                                </div>
                            </div>
                        </div>
                    </div>
                )

            } else {
                return ''
            }

        })
    }

    showAddBook() {
        this.state.showForm
            ? this.setState({ showForm: false })
            : this.setState({ showForm: true })
    }

    showMyBooks() {
        this.setState({ showMyBooks: true, showMyWishes: false })
    }

    showMyWishes() {
        this.setState({ showMyBooks: false, showMyWishes: true })
    }

    render() {
        return (
            <div>
                <div class="container text-left profile-data">
                    <h3 class="text-left">{this.props.isLogged.username}</h3>
                    <div class="row justify-content-around">
                        <div class="col">

                            <p>City: {this.props.isLogged.city}</p>
                            <p>Contact: {this.props.isLogged.contact}</p>
                        </div>

                        <div class="col">
                            <p>Your lists</p>

                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">

                                    <Link onClick={() => this.showMyBooks()} class="nav-link active" aria-current="page">My Books</Link>

                                    <span class="badge badge-primary badge-pill">{this.state.books.length}</span>

                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">

                                    <Link onClick={() => this.showMyWishes()} class="nav-link">My wishes</Link>

                                    <span class="badge badge-primary badge-pill">{this.state.myWishes.length}</span>

                                </li>
                            </ul>

                        </div>

                        <div class="col">
                            <button class="btn" type="button" onClick={() => this.showAddBook()}> Add new Book</button>
                        </div>
                    </div>
                </div>

                {this.state.showForm &&

                    <form onSubmit={e => this.handleSubmit(e)} class="container form-create-book">

                        <div class="row align-items-center">

                            <div class="col-3">
                                <h5>New book</h5>
                            </div>

                            <div class="col-7 text-left">
                                <label htmlFor="title">Title: </label>
                                <input type="text" name="title" onChange={e => this.handleChange(e)}
                                /><br />

                                <label htmlFor="author">Author: </label>
                                <input type="text" name="author" onChange={e => this.handleChange(e)}
                                /><br />

                                <label htmlFor="imageUrl">Adjuntar imagen: </label>
                                <input type="file" onChange={e => this.handleFileUpload(e)}
                                />
                            </div>

                            <div class="col-2">

                                {this.state.newBook.imageUrl

                                    ? <button class="btn btn-light" type="submit">Añadir libro</button>
                                    : <button class="btn btn-light" type="submit" disabled>Añadir libro</button>

                                }
                            </div>
                        </div>
                    </form>

                }

                {/* <br />

                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button onClick={() => this.showMyBooks()} class="nav-link active" aria-current="page">My Books</button>
                    </li>
                    <li class="nav-item">
                        <button onClick={() => this.showMyWishes()} class="nav-link">My wishes</button>
                    </li>
                </ul>
                <br /> */}

                {this.state.showMyBooks &&
                    <div>
                        {this.state.books.length === 0
                            ? ''
                            :
                            <div class="container">
                                <div class="row row-cols-2 row-cols-md-5 g-4">
                                    {this.renderMyBooks()}
                                </div>
                            </div>
                        }
                    </div>
                }

                {this.state.showMyWishes &&
                    <div>
                        {this.state.myWishes.length === 0
                            ? ''
                            :
                            <div class="container">
                                <div class="row row-cols-2 row-cols-md-5 g-4">
                                    {this.renderMyWishes()}
                                </div>
                            </div>
                        }
                    </div>
                }

            </div>
        )
    }
}

export default Profile