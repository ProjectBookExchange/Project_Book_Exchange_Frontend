import React from 'react'

const LogIn = (props)=>{
  // const {submitLogIn, loggingUser, changeHandlerLogIn} = props
  return(
    <div>

      <form onSubmit={props.submitLogIn} class="form-sign-log-in">

        <img class="mb-4" src="./images/bookBrand.png" alt="bookBrand" width="100"/>

        <h1 class="h3 mb-3 fw-normal">Please Log In</h1>

        <label class="visually-hidden" htmlFor="username"/>
        <input 
          type="text"
          class="form-control" 
          name="username" 
          value={props.loggingUser.username}
          placeholder="Username"
          onChange={(event)=>props.changeHandlerLogIn(event.target)}
        />

        <label class="visually-hidden" htmlFor="password"/>
        <input 
          type="password"
          class="form-control" 
          name="password" 
          value={props.loggingUser.password} 
          placeholder="Password"
          onChange={(event)=>props.changeHandlerLogIn(event.target)}
        />

        <button class="w-100 btn btn-lg" type="submit">Log In</button>

        <p class="mt-5 mb-3 text-muted"><i>Para viajar lejos, no hay mejor nave que un libro – Emily Dickinson</i></p>
        <img src="./images/bookGif.gif" alt="bookGif" width="100%"/>
      </form>
      {/* <p>{props.errMessage} </p> */}
    </div>
  )
}

export default LogIn