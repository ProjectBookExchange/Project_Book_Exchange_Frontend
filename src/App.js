import React from 'react';
import './App.css';

import SignUp from './components/SignUp';
import Home from './components/Home';
// import AllBooks from './components/AllBooks';
// import IndividualManga from './components/IndividualManga';
import LogIn from './components/LogIn';
import Profile from './components/Profile';

import { Link, Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';

import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class App extends React.Component {

	state = {
		isLogged: {},
		newUser: { username: '', password: '' },
		loggingUser: { username: '', password: '' },
	}

	service = new UserService();

	//SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
		this.service.signup(this.state.newUser.username, this.state.newUser.password)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	changeHandlerSignUp = (_eventTarget) => {
		this.setState({ newUser: { ...this.state.newUser, [_eventTarget.name]: _eventTarget.value } });
	};

	//LOGIN CONFIG
	submitLogIn = (event) => {
		event.preventDefault();
		this.service
			.login(this.state.loggingUser.username, this.state.loggingUser.password)
			.then(() => {
				this.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log('Sorry something went wrong on submit.', err);
			});
	};

	changeHandlerLogIn = (_eventTarget) => {
		this.setState({ loggingUser: { ...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value } });
	};

	checkIfLoggedIn = () => {
		this.service.loggedin()
			.then((result) => {
				this.setState({ isLogged: result })
			})
	};

	logOut = () => {
		this.service.logout()
			.then((result) => {
				console.log(result)
				this.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	componentDidMount() {
		this.checkIfLoggedIn();
	}

	render() {
		return (
			<div className="App">

				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<Link class="navbar-brand" to="/">Home</Link>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item active">
							</li>
							<li class="nav-item">
							{!this.state.isLogged.username && <Link class="nav-link" to="/signup">Sign Up</Link>}
							</li>
							<li class="nav-item">
							{!this.state.isLogged.username && <Link class="nav-link" to="/login">Log In</Link>}
							</li>
							<li class="nav-item">
							{this.state.isLogged.username && <Link class="nav-link" to="/profile">Profile</Link>}
							</li>
						</ul>
					</div>
				</nav>

				{/* <Link to="/all-mangas">All Mangas</Link> */}
				{/* <Route exact path="/all-books" component={AllMangas} /> */}

				<Route exact path="/" render={() => <Home logOut={this.logOut} isLogged={this.state.isLogged} />} />
				


				{/* <Route path='/all-mangas/:id' render={(props) => {
          return(
            <IndividualManga {...props} isLogged={this.state.isLogged}/>
          )
        }} /> */}

				<Route
					path="/signup"
					render={() => (
						!this.state.isLogged.username
							? <SignUp submitSignUp={this.submitSignUp} newUser={this.state.newUser} changeHandlerSignUp={this.changeHandlerSignUp} />
							: <Redirect to='/' />
					)}
				/>
				<Route
					path="/login"
					render={() => (
						<LogIn
							submitLogIn={this.submitLogIn}
							loggingUser={this.state.loggingUser}
							changeHandlerLogIn={this.changeHandlerLogIn}
						/>
					)}
				/>
				
				<Route 
					path="/profile" 
					render={()=>(
					<Profile 
						isLogged={this.state.isLogged}
						
					/>
					)}

					/>


			</div>
		);
	}
}

export default App;
