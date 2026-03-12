import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext";
import Navbar from "../NavBar-Components/Navbar";
import DisplayArea from "../DisplayArea";

export default function ForgotPassword() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (authState) navigate("/");
  }, [authState, navigate]);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <DisplayArea>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button type="submit">Request Link</button>
          </form>
        </div>
      </DisplayArea>
    </>
  );
}
