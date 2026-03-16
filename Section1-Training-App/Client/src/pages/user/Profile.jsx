import "./styles/profile.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { ToastContext } from "../../contextAPI/ToastContext";
import { myFetch } from "../../utils/myFetch";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await myFetch("/users/userData", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (res.status === "success") {
          setUserData({
            username: res.data.username,
            email: res.data.email,
          });
        }
      } catch (error) {
        toastDispatch({
          type: "error",
          payload: {
            message: error.message || "Something went wrong!",
          },
        });
      }
    }

    getUserData();
  }, [toastDispatch, authState.token]);

  const handleLogout = async () => {
    if (!confirm("Are you sure? Do you want to Delete the account?")) return;
    await myFetch("/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    });
    authDispatch({
      type: "LOGOUT",
    });
    toastDispatch({
      type: "ok",
      payload: {
        message: "Logout successful!",
      },
    });
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? Do you want to Logout?")) return;

    await myFetch("/users/delete-self", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    });

    authDispatch({
      type: "LOGOUT",
    });
    toastDispatch({
      type: "ok",
      payload: {
        message: "Account Deleted!",
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="profile main window">
        <h2>
          <span className="logo">SyncFit</span> Profile
        </h2>
        <div className="details">
          <div className="info">
            <section>
              <h3>Username</h3>
              <p>{userData.username}</p>
            </section>

            <section>
              <h3>Email</h3>
              <p>{userData.email}</p>
            </section>
          </div>
        </div>
        <div className="manage-profile">
          <button
            className="change-info"
            onClick={() => navigate("/profile/update-profile")}
          >
            Change User Info
          </button>
          <button
            className="change-password"
            onClick={() => navigate("/profile/update-password")}
          >
            Change User Password
          </button>
          <button className="logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        <button className="delete-account" onClick={handleDeleteAccount}>
          Delete Account <span className="logo">SyncFit</span>
        </button>
      </div>
    </>
  );
}
