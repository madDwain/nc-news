import React from "react";
import Login from "./login";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/topics" className="navbar-item">
          Topics
        </Link>
        <Link to="/login" className="navbar-item">
          Login
        </Link>
      </nav>
    </>
  );
};

export default Header;
