import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/NavBar-Components/Navbar";
import DisplayArea from "../../components/DisplayArea";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router";

export default function User() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (!authState) navigate("/");
  }, [authState, navigate]);

  const [userInfo, setUserInfo] = useState({
    username: null,
    email: null,
  });

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/users/userData`, {
          headers: {
            Authorization: `Bearer ${authContext.state.token}`,
          },
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();

        setUserInfo({
          username: json.data.username,
          email: json.data.email,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [apiUrl, authContext.state.token]);

  const handleDisableAccount = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/users/delete-self`, {
        headers: {
          Authorization: `Bearer ${authContext.state.token}`,
        },
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        authContext.dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <DisplayArea>
        <div className="user-profile">
          <div className="info">
            <div className="username">
              <h2>Username</h2>
              <p>{userInfo.username}</p>
            </div>
            <div className="email">
              <h2>Email</h2>
              <p>{userInfo.email}</p>
            </div>
          </div>
          <div className="user-manage">
            <button
              className="edit-user"
              onClick={() => navigate("/user/edit-user")}
            >
              Edit User info
            </button>
            <button
              className="change-password"
              onClick={() => navigate("/user/change-password")}
            >
              Change User password
            </button>
            <button className="disable-account" onClick={handleDisableAccount}>
              Disable Account
            </button>
          </div>
        </div>
      </DisplayArea>
    </>
  );
}
