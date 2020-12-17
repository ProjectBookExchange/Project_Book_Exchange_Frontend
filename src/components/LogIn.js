import React from 'react'
import '../styles/formSignLog.css';

const LogIn = (props) => {

  return (
    <div>

      <form onSubmit={props.submitLogIn} class="form-sign-log-in">

        <img class="mb-4" src="./images/bookBrand.png" alt="bookBrand" width="100" />

        <h1 class="h3 mb-3 fw-normal">Please Log In</h1>

        <input
          type="text"
          class="form-control"
          name="username"
          value={props.loggingUser.username}
          placeholder="Username"
          onChange={(event) => props.changeHandlerLogIn(event.target)}
        />

        <input
          type="password"
          class="form-control"
          name="password"
          value={props.loggingUser.password}
          placeholder="Password"
          onChange={(event) => props.changeHandlerLogIn(event.target)}
        />

        <p class="errMessage">{props.errMessage} </p>
        <button class="w-100 btn btn-lg" type="submit">Log In</button>

      </form>

    </div>
  )
}

export default LogIn