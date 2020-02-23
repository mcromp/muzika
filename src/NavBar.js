import React from "react";
import { NavLink } from "react-router-dom";

const NavBarBtn = ({ link, name }) => (
  <NavLink exact to={link} className="link" activeClassName="linkSelected">
    {name}
  </NavLink>
);

const NavBar = () => (
  <div className="navbar">
    <span className="logo">MuziKa!</span>
    <div className="linkContainer">
      <NavBarBtn link="/" name="Game" />
      <NavBarBtn link="/howtoplay" name="How to Play" />
      <NavBarBtn link="/about" name="About" />
    </div>
  </div>
);

export default NavBar;
