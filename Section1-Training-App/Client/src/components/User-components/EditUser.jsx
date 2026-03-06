import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext";
import Navbar from "../NavBar-Components/Navbar";
import DisplayArea from "../DisplayArea";

export default function EditUser() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (!authState) navigate("/");
  }, [authState, navigate]);

  const [data, setData] = useState({
    username: "",
    email: "",
  });

  const handleEdit = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email } = data;

      const response = await fetch(`${apiUrl}/api/v1/users/update-self`, {
        headers: {
          Authorization: `Bearer ${authContext.state.token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ username, email }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/user");
      } else {
        throw Error("Something went wrong!");
      }
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleEdit}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleEdit}
              />
            </div>

            <button type="submit">Change Info</button>
          </form>
        </div>
      </DisplayArea>
    </>
  );
}
