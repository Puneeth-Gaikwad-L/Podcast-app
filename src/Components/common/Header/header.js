import React, { useContext } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/button";
import { ThemeContext } from "../../../Context/ThemeContext";
function Header() {

  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }

  return <div className="navbar">
    <div className="gradient"></div>
    <div className="links">
      <NavLink to="/">SignUp</NavLink>
      <NavLink to="/podcasts">Podcasts</NavLink>
      <NavLink to="/CreatePodcast">Start A Podcast</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <Button onClick={toggleTheme} text={"theme"} style={{ width: "fit-content", padding: "5px 5px" }} />
    </div>
  </div>;
}

export default Header;
