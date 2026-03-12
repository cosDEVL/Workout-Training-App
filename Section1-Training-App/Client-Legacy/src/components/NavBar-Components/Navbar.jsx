import { useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import "./navbar.css";
import NavButtons from "../NavButtons";
import { AuthContext } from "../../AuthContext";
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  const handleLogout = () => {
    authContext.dispatch({ type: "LOGOUT" });
    Cookies.remove("accessToken");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <span>Workout training app</span>
      </div>
      <div className="nav-buttons">
        <NavButtons path={"/"} text={"Home"} />
        {authState ? (
          <>
            <NavButtons path={"/user"} text={"Profile"} />
            <button onClick={handleLogout} className="logout-user">
              Logout
            </button>
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
