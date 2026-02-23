import React from "react";

import NavButtons from "../components/NavButtons";
import "./homepage.css";

export default function Homepage() {
  return (
    <div className="homepage">
      <header>
        <h1>Training App</h1>
      </header>
      <div className="nav-buttons">
        <NavButtons path={"/workout-list"} text={"Workout List"} />
        <NavButtons path={"/create-workout"} text={"Create a new Workout"} />
      </div>
    </div>
  );
}
