import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

function Navbar() {
  return (
    <nav>
      <div className="nav-inner">
        <div className="logo">
          <img
            src="https://preview.colorlib.com/theme/course/images/logo.png"
            alt=""
          />
          <h1>COURSE</h1>
        </div>
        <ul className="nav-texts">
          <li>
            <NavLink to={"/"} className="nav-link">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about"} className="nav-link">
              ABOUT US
            </NavLink>
          </li>
          <li>
            <NavLink to={"/basket"} className="nav-link">
              BASKET
            </NavLink>
          </li>
          <li>
            <NavLink to={"/wishlist"} className="nav-link">
              WISHLIST
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"} className="nav-link">
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add"} className="nav-link">
              ADD PAGE
            </NavLink>
          </li>
        </ul>
        <div className="call">
          <i className="fa-solid fa-phone"></i>
          <span>+994 505798656</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
