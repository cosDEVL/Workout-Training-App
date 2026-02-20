import React from "react";
import { NavLink } from "react-router";
import "./navbar.css";
import NavButtons from "../NavButtons";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <span>Workout training app</span>
      </div>
      <div className="nav-buttons">
        <NavButtons path={"/"} text={"Home"} />
        <NavButtons path={"/workout-list"} text={"Workouts list"} />
        <NavButtons path={"/create-workout"} text={"New Workout"} />
      </div>
    </div>
  );
}
