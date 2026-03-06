import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/NavBar-Components/Navbar";
import DisplayArea from "../../components/DisplayArea";
import FormLabel from "../../components/User-components/FormLabel";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router";

export default function Signup() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (authState) navigate("/user");
  }, [authState, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (!username || !email || !password || !confirmPassword)
        throw Error("Must complete all the field to complete the operation");

      const formBody = { username, email, password, confirmPassword };

      const response = await fetch(`${apiUrl}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
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
        <div className="signup-page">
          <form onSubmit={handleSignUp}>
            <FormLabel
              inputType={"username"}
              value={username}
              setValue={setUsername}
            />
            <FormLabel inputType={"email"} value={email} setValue={setEmail} />
            <FormLabel
              inputType={"password"}
              value={password}
              setValue={setPassword}
            />
            <FormLabel
              inputType={"confirmPassword"}
              value={confirmPassword}
              setValue={setConfirmPassword}
            />

            <button type="submit" className="signup">
              Signup
            </button>
          </form>
        </div>
      </DisplayArea>
    </>
  );
}
