import React from 'react'
import UserService from '../services/UserService'

class PublicProfile extends React.Component {

    state = {
        userProfile: []
    }

    service = new UserService()

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

    renderPublicProfile = () => {
        return (
            <div className="user-profile">
                <div>
                    <h2> {this.state.userProfile.username} profile </h2>
                    <span>{this.state.userProfile.city}</span>
                </div>

                <br/>

                <div class="container">
                    <div class="row row-cols-2 row-cols-md-4 g-4">
                        {this.state.userProfile.myBooks.map((book, index) => {
                            return (
                                <div class="col card-container" key={index}>
                                    <div class="card h-100">
                                        <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                                        <div class="card-body">
                                            <h5 class="card-title">{book.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
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