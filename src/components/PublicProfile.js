import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/publicProfile.css';

import UserService from '../services/UserService'
import ExchangeService from '../services/ExchangeService'
import BookService from '../services/BookService'


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
        .then((result)=>{
            console.log (result)
            this.rerender()
        })
        .catch((err)=>console.log(err))
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
                <div>
                    <h2> {this.state.userProfile.username} profile </h2>
                    <span>{this.state.userProfile.city}</span>
                </div>

                <br/>

                <h2>Published</h2>
                <div class="container">
                    <div class="row row-cols-2 row-cols-md-4 g-4">
                        {this.state.userProfile.myBooks.map((book, index) => {
                            if (book.borrowedUser === ''){
                              return (
                                <div class="col card-container" key={index}>
                                    <div class="card h-100">
                                        <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                                        <div class="card-body">
                                            <h5 class="card-title">{book.title}</h5>
                                            <p class="card-text">{book.author}</p>

                                            {(this.state.message === book._id) &&
              <p class="errMessageWish">it's already on your list!</p>  
              }

{(this.state.message._id === book._id) &&
              <p class="messageAddedWish">Added to your list</p>  
              }


                                            <button class="btn" type="button" onClick={() => this.addToMyWishes(book)}>I wish</button>

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

                <h2>Want your book</h2>
                <div class="container">
                    <div class="row row-cols-2 row-cols-md-4 g-4">
                        {this.state.userProfile.wishList.map((book, index) => {
                            if (this.props.isLogged.username === book.owner_name && (book.borrowedUser === '')){
                            return (
                                <div class="col card-container" key={index}>
                                    <div class="card h-100">
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