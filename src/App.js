import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import SignUp from './components/SignUp';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';
import Exchanges from './components/Exchanges';

import { Link, Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';



class App extends React.Component {

	state = {
		isLogged: {},
		newUser: { username: '', password: '', city: '', contact: '' },
		loggingUser: { username: '', password: '' },
		errMessageSignup: '',
		errMessageLogin: ''
	}

	service = new UserService();

	//SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
		this.service.signup(this.state.newUser.username, this.state.newUser.password, this.state.newUser.city, this.state.newUser.contact)
			.then((result) => {
				this.setState({ errMessageSignup: result.message })
				this.checkIfLoggedIn()
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
			.then((result) => {
				this.setState({ errMessageLogin: result.message })
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
			.then(() => {
				this.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log(err)
			})

	}

	//Render page:

	componentDidMount() {
		this.checkIfLoggedIn();
	}

	render() {
		return (
			<div className="App">
				<nav class="navbar navbar-expand-sm navbar-dark fixed-top nav-bar-styles">

					<Link class="navbar-brand" to="/">
						<img src="./images/bookBrand.png" alt="BookBrand"></img>
						<span>BookExchange</span>
					</Link>

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
						aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarCollapse">
						<div class="navbar-nav mr-auto">

							{this.state.isLogged.username && <Link class="nav-link" to="/profile">Profile</Link>}

							{this.state.isLogged.username && <Link class="nav-link" to="/exchanges">Exchanges</Link>}

						</div>
						<div class="navbar-nav ml-auto">

							{!this.state.isLogged.username && <Link class="nav-item nav-link" to="/signup">Sign Up</Link>}


							{!this.state.isLogged.username && <Link class="nav-item nav-link" to="/login">Log In</Link>}

							{this.state.isLogged.username && <span class="nav-item-welcome">Welcome, {this.state.isLogged.username}</span>}

							{this.state.isLogged.username && <Link class="nav-item nav-link" onClick={() => this.logOut()}>Log Out</Link>}

						</div>
					</div>
				</nav>

				<Route exact path="/" render={() => <Home logOut={this.logOut} isLogged={this.state.isLogged} />} />

				<Route
					path="/signup"
					render={() => (
						!this.state.isLogged.username
						?<SignUp 
							submitSignUp={this.submitSignUp}
							errMessage={this.state.errMessageSignup} 
							newUser={this.state.newUser} 
							changeHandlerSignUp={this.changeHandlerSignUp} />
						: <Redirect to='/profile' />
					)}
				/>


				<Route
					path="/login"
					render={() => (
						!this.state.isLogged.username
							? <LogIn
								submitLogIn={this.submitLogIn}
								loggingUser={this.state.loggingUser}
								changeHandlerLogIn={this.changeHandlerLogIn}
								errMessage={this.state.errMessageLogin}
							/>
							: <Redirect to='/profile' />
					)}
				/>

				<Route
					path="/profile"
					render={() => (
						this.state.isLogged.username
							? <Profile
								isLogged={this.state.isLogged}
							/>
							: <Redirect to='/' />
					)}
				/>

				<Route
					path="/publicProfile/:id"
					render={(props) => {
						return (
							this.state.isLogged.username
								? <PublicProfile {...props} isLogged={this.state.isLogged} />
								: <Redirect to='/login' />
						)
					}}
				/>

				<Route
					path="/exchanges"
					render={() => (
						this.state.isLogged.username
							? <Exchanges
								isLogged={this.state.isLogged}
							/>
							: <Redirect to='/' />
					)}
				/>

			</div>
		);
	}
}

export default App;
