import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router";
import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";
import { myFetch } from "../../utils/myFetch";
import { checkEmail } from "../../utils/checkFormInputs";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!checkEmail(userData.email)) {
        toastDispatch({
          type: "warning",
          payload: {
            target: "email",
            message: "Enter a valid email address!",
          },
        });
        return;
      }

      const res = await myFetch("/users/update-self", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(userData),
      });

      if (res.status === "success") {
        toastDispatch({
          type: "ok",
          payload: {
            message: "Data updated successfully!",
          },
        });

        navigate("/profile");
      }
    } catch (error) {
      toastDispatch({
        type: "error",
        payload: {
          message: error.message || "Something went wrong! Try again later...",
        },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="user-form window main">
        <h2>Update Profile Info</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label={"username"}
            type={"text"}
            value={userData.username}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Username
          </FormInput>
          <FormInput
            label={"email"}
            type={"email"}
            value={userData.email}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Email
          </FormInput>
          <button type="submit">Change Info</button>
        </form>
      </div>
    </>
  );
}
