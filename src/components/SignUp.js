import React from 'react'
import '../styles/formSignLog.css';

const SignUp = (props) => {

  return (
    <div class="container">

        <form onSubmit={props.submitSignUp} class="form-sign-log-in">

          <img class="mb-4" src="./images/bookBrand.png" alt="bookBrand" width="100" />

          <h1 class="h3 mb-3 fw-normal">Please Sign Up</h1>

          <input
            type="text"
            name="username"
            class="form-control"
            value={props.newUser.username}
            placeholder="Username"
            onChange={(event) => props.changeHandlerSignUp(event.target)}
            required
          />

          <input
            type="text"
            name="city"
            class="form-control"
            value={props.newUser.city}
            placeholder="City"
            onChange={(event) => props.changeHandlerSignUp(event.target)}
            required
          />

          <input
            type="text"
            name="contact"
            class="form-control"
            value={props.newUser.contact}
            placeholder="Contact (e.g. phone number, email)"
            onChange={(event) => props.changeHandlerSignUp(event.target)}
            required
          />

          <input
            type="password"
            class="form-control"
            name="password"
            value={props.newUser.password}
            placeholder="Password"
            onChange={(event) => props.changeHandlerSignUp(event.target)}
            required
          />

          <p class="errMessage">{props.errMessage} </p>

          <button class="w-100 btn btn-lg" type="submit">Sign up</button>

        </form>

    </div>
  )
}

export default SignUp