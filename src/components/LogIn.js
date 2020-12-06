import React from 'react'

const LogIn = (props)=>{
  // const {submitLogIn, loggingUser, changeHandlerLogIn} = props
  return(
    <div>
      <h2>Log In</h2>
      <form onSubmit={props.submitLogIn}>

        <label htmlFor="username">Username: </label>
        <input 
          type="text" 
          name="username" 
          value={props.loggingUser.username} 
          onChange={(event)=>props.changeHandlerLogIn(event.target)}
        />

        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          name="password" 
          value={props.loggingUser.password} 
          onChange={(event)=>props.changeHandlerLogIn(event.target)}
        />

        <button type="submit">Log In</button>

      </form>
    </div>
  )
}

export default LogIn