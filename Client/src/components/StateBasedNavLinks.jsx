import React, { useContext } from "react";
import { AuthContext } from "../contextAPI/AuthContext";
import { NavLink } from "react-router";

export default function StateBasedNavLinks() {
  const { authState, authDispatch } = useContext(AuthContext);
  return (
    <>
      {authState.isAuth && authState.token ? (
        <>
          <NavLink to="/workout/main">My Workouts</NavLink>
          <NavLink to="/profile">My Profile</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Log-In</NavLink>
          <NavLink to="/signup">Sign-Up</NavLink>
        </>
      )}
    </>
  );
}
