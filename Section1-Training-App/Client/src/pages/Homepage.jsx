import "./homepage.css";
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contextAPI/AuthContext";
import StateBasedNavLinks from "../components/StateBasedNavLinks";

export default function Homepage() {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="homepage main window">
        <div className="presentation">
          <h1>
            Welcome to <span className="logo">SyncFit</span>
          </h1>
          <h3>Your gym flow, synchronized.</h3>
          <p>
            A minimal, intuitive app to log your gym sessions. Create tailored
            workout plans, record your performance on the go, and never lose
            track of a single set.
          </p>
        </div>
        <div className="nav-menu">
          <StateBasedNavLinks />
        </div>
      </div>
    </>
  );
}
