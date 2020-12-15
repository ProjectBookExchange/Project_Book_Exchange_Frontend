import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/publicProfile.css';

import UserService from '../services/UserService'
import ExchangeService from '../services/ExchangeService'
import BookService from '../services/BookService'

import { Link } from 'react-router-dom';
// import $ from 'jquery';
// import Popper from 'popper.js';


class PublicProfile extends React.Component {

    state = {
        userProfile: [],
        message: []
    }

    service = new UserService()
    serviceExchange = new ExchangeService()
    serviceBook = new BookService()

    componentDidMount() {
        this.service.viewPublicProfile(this.props.match.params.id)
            .then((result) => {
                return result
            })
            .then((userData) => {
                this.setState({ userProfile: userData })
            })
            .catch((err) => console.log(err))
    }

    moveBorrowed = (book, profile) => {
        this.serviceExchange.moveBorrowedBooks(book, profile)
            .then((result) => {
                console.log(result)
                this.rerender()
            })
            .catch((err) => console.log(err))
    }

    addToMyWishes = (book) => {
        const userID = this.props.isLogged._id
        const userName = this.props.isLogged.username
        this.serviceBook.addWish(book, userID, userName)
            .then((result) => {
                this.setState({ message: result })
            })
            .catch((err) => console.log(err))
    }

    rerender() {
        this.service.viewPublicProfile(this.props.match.params.id)
            .then((result) => {
                return result
            })
            .then((userData) => {
                this.setState({ userProfile: userData })
            })
            .catch((err) => console.log(err))
    }

    renderPublicProfile = () => {
        return (


            <div className="user-profile">
                <div class="container text-left userdata-containter">

                    <h2> {this.state.userProfile.username} profile </h2>

                    <div class="data-div">
                        <p><b>City:</b> {this.state.userProfile.city}</p>
                        <p><b>Contact:</b> {this.state.userProfile.contact}</p>
                    </div>
                </div>

                <div class="container">
                    <h4 class="header-interested"> Books of interest</h4>
                    <div class="row row-cols-2 row-cols-md-5 g-4 divInterest">
                        {this.state.userProfile.wishList.map((book, index) => {
                            if (this.props.isLogged.username === book.owner_name && (book.borrowedUser === '')) {
                                return (
                                    <div class="col card-container" key={index}>
                                        <div class="card">
                                            <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                                            <div class="card-body">
                                                <h5 class="card-title">{book.title}</h5>
                                                <p class="card-text">{book.author}</p>
                                                <button class="btn" type="button" onClick={() => this.moveBorrowed(book, this.state.userProfile)}>Lend</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return ''
                            }
                        })}
                    </div>
                </div>

                <h4>Books published</h4>
                <div class="container">
                    <div class="row row-cols-2 row-cols-md-5 g-4 divInterest">
                        {this.state.userProfile.myBooks.map((book, index) => {
                            if (book.borrowedUser === '') {
                                return (
                                    <div class="col card-container" key={index}>
                                        <div class="card h-100">
                                            <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                                            <div class="card-body">
                                                <div class="card-text text-right">
                                                        <Link class="button-noBack" data-toggle="tooltip" data-placement="top" data-html="true" title="Add to my wish list" onClick={() => this.addToMyWishes(book)}>
                                                            <div class="heart"></div>
                                                        </Link>
                                                </div>
                                                {(this.state.message === book._id) &&
                                                    <p class="errMessageWish">it's already on your list!</p>}

                                                {(this.state.message._id === book._id) &&
                                                    <p class="messageAddedWish">Added to your list</p>}

                                                <h5 class="card-title">{book.title}</h5>
                                                <p class="card-text">{book.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return ''
                            }
                        })}
                    </div>
                </div>



            </div>
        )
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
            <div className="public-profile">
                {this.state.userProfile.length === 0
                    ? this.renderSpinner()
                    : this.renderPublicProfile()
                }
            </div>
        )
    }
}

export default PublicProfile