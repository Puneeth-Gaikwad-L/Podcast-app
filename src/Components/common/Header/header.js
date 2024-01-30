import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
function Header() {
  return <div className="navbar">
    <div className="gradient"></div>
    <div className="links">
      <NavLink to="/">SignUp</NavLink>
      <NavLink to="/podcasts">Podcasts</NavLink>
      <NavLink to="/CreatePodcast">Start A Podcast</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  </div>;
}

export default Header;
