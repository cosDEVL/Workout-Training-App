import React, { useContext } from "react";

import NavButtons from "../components/NavButtons";
import "./homepage.css";
import { AuthContext } from "../AuthContext";

export default function Homepage() {
  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  return (
    <div className="homepage">
      <header>
        <h1>Training App</h1>
      </header>
      <div className="nav-buttons">
        {authState ? (
          <>
            <NavButtons path={"/workout-list"} text={"Workout List"} />
            <NavButtons
              path={"/create-workout"}
              text={"Create a new Workout"}
            />
            <NavButtons path={"/user"} text={"Profile"} />
          </>
        ) : (
          <>
            <NavButtons path={"/login"} text={"Login"} />
            <NavButtons path={"/signup"} text={"Signup"} />
          </>
        )}
      </div>
    </div>
  );
}
