import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className='navbar'>
      <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/topics" className="navbar-item">
        Topics
        </Link>
      </nav>
    </>
  )
}

export default Header
