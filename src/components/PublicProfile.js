import React from 'react'
import UserService from '../services/UserService'
import ExchangeService from '../services/ExchangeService'

// import { Link, Redirect } from 'react-router-dom';


class PublicProfile extends React.Component {

    state = {
        userProfile: []
    }

    service = new UserService()
    serviceExchange = new ExchangeService()

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
            console.log(result)
        //    <Redirect to="/exchanges"/>
        })
        .catch((err)=>console.log(err))
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