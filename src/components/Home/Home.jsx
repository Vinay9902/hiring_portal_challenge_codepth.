import React from 'react'
import { Link } from "react-router-dom";

function Home(props) {
    return (
        <div>
        <h2 className='text-xl'>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
        <div>
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        <br />
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
      </div>

      <br />
      <br />
      <br />


    </div>
  )
}

export default Home
