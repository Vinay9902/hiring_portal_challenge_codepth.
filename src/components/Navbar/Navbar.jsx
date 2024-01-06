import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='h-20 flex items-center w-full text-white'>
      <div className='text-3xl pl-20 font-bold'>WeHire.</div>
      {/* <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul> */}

    </div>
  )
}

export default Navbar
