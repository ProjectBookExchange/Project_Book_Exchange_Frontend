import React from 'react'
import BookService from '../services/BookService'

class Profile extends React.Component {

    state = {
        books: [],
        myWishes: [],
        newBook: {
            title: '',
            imageUrl: '',
            owner: this.props.isLogged._id,
            owner_name: this.props.isLogged.username
        }
    }

    service = new BookService()

    userID = this.props.isLogged._id

    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ newBook: { ...this.state.newBook, [name]: value } })
        // this.setState({newBook: { [name]: value }});
    }

    
    handleFileUpload = e => {
 
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.service.handleUpload(uploadData)
        .then(response => {
            return this.setState({newBook: {...this.state.newBook, imageUrl: response.secure_url }});
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.service.saveNewThing(this.state.newBook)
        .then(res => {
            console.log('added: ', res);
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

    getMyWishes () {
        this.service.viewMyWishes(this.props.isLogged._id)
        .then((result) => {
            return result
        })
        .then((wishesData) => {
            this.setState({myWishes: wishesData})
        })
        .catch((err) => console.log(err))
    }

    renderMyBooks() {
        return this.state.books.map((book, index) => {
            return (
                <div key={index} class="col card-container">
                    <div class="card h-100">
                        <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                        <div class="card-body">
                            <h5 class="card-title">{book.title}</h5>
                            {/* <p class="card-text">{book.owner.city} </p> */}
                            <div class="card-footer">
            <small class="text-muted">Interested users: {book.interestedUsers}</small>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderMyWishes(){
        return this.state.myWishes.map((book, index) => {
            return (
                <div key={index} class="col card-container">
                    <div class="card h-100">
                        <img src={book.imageUrl} class="card-img-top" alt={book.title} />
                        <div class="card-body">
                            <h5 class="card-title">{book.title}</h5>
                            {/* <p class="card-text">{book.owner.city} </p> */}
                            <div class="card-footer">
            <small class="text-muted">User: {book.owner_name}</small>
                            </div>
                        </div>
                    </div>
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
                <br />
                <form onSubmit={e => this.handleSubmit(e)}>

                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        onChange={e => this.handleChange(e)}
                    />
                    <br />

                    <label htmlFor="imageUrl">Adjuntar imagen: </label>
                    <input
                        type="file"
                        // name="imageUrl"
                        onChange={e => this.handleFileUpload(e)}
                    />

                    {/* <input
                        type="hidden"
                        name="owner"
                        value={this.props.isLogged._id}
                        onChange={e => this.handleFileUpload(e)}
                    /> */}

                    <button type="submit">Añadir libro</button>

                </form>

                <br />

                <div>
                    <h3>Mis libros</h3>
                    {this.state.books.length === 0
                        ? this.renderSpinner()
                        :
                        <div class="container">
                            <div class="row row-cols-2 row-cols-md-3 g-4">
                                {this.renderMyBooks()}
                            </div>
                        </div>
                    }
                </div>

                <div>
                    <h3>My wishes</h3>
                    {this.state.myWishes.length === 0
                        ? this.renderSpinner()
                        :
                        <div class="container">
                            <div class="row row-cols-2 row-cols-md-3 g-4">
                                {this.renderMyWishes()}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Profile