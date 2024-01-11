import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Header() {
  return <div className="navbar">
    <div className="links">
      <Link to="/">SignUp</Link>
      <Link to="/">Podcasts</Link>
      <Link to="/">Start A Podcast</Link>
      <Link to="/">Profile</Link>
    </div>
  </div>;
}

export default Header;
