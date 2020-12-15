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
        userData: {
            name: '',
            city: '',
            contact: ''
        },
        temporalUserData: {city: '', contact: ''},
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
            .then(() => {
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
                this.setState({userData: {...this.state.userData, name: this.props.isLogged.username, city: this.props.isLogged.city, contact: this.props.isLogged.contact}})
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
                this.setState({ newBook: { ...this.state.newBook, imageUrl: '' } })
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
                        <div class="card">
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

    submitCityData = e => {
        e.preventDefault();
        this.serviceUser.editCity(this.state.temporalUserData, this.userID)
            .then((newCity)=>{
                this.setState({userData: { ...this.state.userData, city: newCity.city}})
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChangeCity = e => {
        const {name, value} = e.target;
        this.setState({ temporalUserData: { ...this.state.temporalUserData, [name]: value } })
    }

    render() {
        return (
            <div>
                <div class="container text-left profile-data">
                    <h2 class="text-left profile-name">Welcome, {this.state.userData.name}</h2>
                    <hr />
                    <div class="row row-cols-1 row-cols-md-3 g-3">

                        <div class="col">
                            <h5>Your user data</h5>
                            <div class="data-div">
                                <p><b>City:</b> {this.state.userData.city}</p>
                                <p><b>Contact:</b> {this.state.userData.contact}</p>
                            </div>

                            <form onSubmit={e => this.submitCityData(e)}> 
                                <div class="column align-items-center">
                                    <div class="col text-left">
                                        <label htmlFor="city">City: </label>
                                        <input type="text" name="city" placeholder={this.state.userData.city} onChange={e => this.handleChangeCity(e)} 
                                        />
                                        <button class="btn btn-light" type="submit">Save</button>
                                    </div>
                                </div>
                            </form>

                            {/* <form>
                                <div class="column align-items-center">
                                    <div class="col text-left">
                                        <label htmlFor="contact">Contact: </label>
                                        <input type="text" name="contact" value={this.props.isLogged.contact} 
                                        />
                                        <button class="btn btn-light" type="submit">Save</button>
                                    </div>
                                </div>
                            </form> */}


                        </div>

                        <div class="col">
                            <h5>Your lists</h5>
                            <ul class="list-group your-lists">
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
                            <button class="btn" type="button" onClick={() => this.showAddBook()}> Upload book</button>
                            {this.state.showForm &&

                                <form onSubmit={e => this.handleSubmit(e)} class="form-create-book">

                                    <div class="column align-items-center">

                                        <div class="col text-left">
                                            <label htmlFor="title">Title: </label>
                                            <input type="text" name="title" onChange={e => this.handleChange(e)}
                                            /><br />

                                            <label htmlFor="author">Author: </label>
                                            <input type="text" name="author" onChange={e => this.handleChange(e)}
                                            /><br />

                                            <label htmlFor="imageUrl">Image: </label>
                                            <input id="input-file" type="file" onChange={e => this.handleFileUpload(e)}
                                            />
                                        </div>
                                        <div class="col text-center button-div">
                                            {this.state.newBook.imageUrl

                                                ? <button class="btn btn-light" type="submit">Añadir libro</button>
                                                : <button class="btn btn-light" type="submit" disabled>Añadir libro</button>

                                            }

                                        </div>

                                    </div>
                                </form>

                            }
                        </div>
                    </div>
                </div>

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