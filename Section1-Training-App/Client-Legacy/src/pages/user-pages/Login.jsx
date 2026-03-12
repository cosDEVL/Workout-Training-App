import React, { useContext, useEffect } from "react";
import Navbar from "../../components/NavBar-Components/Navbar";
import DisplayArea from "../../components/DisplayArea";
import FormLabel from "../../components/User-components/FormLabel";
import { useState } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (authState) navigate("/user");
  }, [authState, navigate]);

  const userLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password)
        throw Error("Email and Password are required to login");

      const response = await fetch(`${apiUrl}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const cookieToken = document.cookie.startsWith("accessToken")
        ? document.cookie.split("=")[1]
        : null;

      if (response.ok && cookieToken) {
        authContext.dispatch({
          type: "LOGIN",
          payload: { token: cookieToken },
        });
      } else {
        throw Error("Something went wrong with the request. Check cookies.");
      }

      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <DisplayArea>
        <div className="login">
          <form onSubmit={userLogin}>
            <FormLabel inputType={"email"} value={email} setValue={setEmail} />
            <FormLabel
              inputType={"password"}
              value={password}
              setValue={setPassword}
            />
            <button type="submit">Login</button>
          </form>
          <button
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </DisplayArea>
    </>
  );
}
