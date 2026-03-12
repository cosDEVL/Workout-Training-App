import "./navbar.css";
import React from "react";
import { AuthContext } from "../contextAPI/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import StateBasedNavLinks from "./StateBasedNavLinks";
import { ThemeContext } from "../contextAPI/ThemeContext";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setHamburgerMenu(false);
    }

    window.addEventListener("resize", onResize);
  }, []);

  return (
    <div className="navbar">
      <div className="inner">
        <div className="logo">
          <NavLink to="/">SyncFit</NavLink>
        </div>
        <div className="nav-links wide">
          <StateBasedNavLinks />
          <ThemeButton />
        </div>
        <div className="nav-links small">
          <span
            htmlFor="hamburger-menu"
            onClick={() => setHamburgerMenu(!hamburgerMenu)}
          >
            <div
              className={`hamburger-icon ${hamburgerMenu ? "open" : ""}`}
            ></div>
          </span>
        </div>
      </div>
      <div className={`hamburger-menu ${hamburgerMenu ? "open" : ""}`}>
        <StateBasedNavLinks />
        <ThemeButton />
      </div>
    </div>
  );
}
