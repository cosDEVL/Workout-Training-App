import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router";
import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";
import { myFetch } from "../../utils/myFetch";
import { checkEmail } from "../../utils/checkFormInputs";
import { GlobalLoadingContext } from "../../contextAPI/GlobalLoadingContext";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const { globalLoading, setGlobalLoading } = useContext(GlobalLoadingContext);
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
        setGlobalLoading(true);
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
      } finally {
        setGlobalLoading(false);
      }
    }

    getUserData();
  }, [toastDispatch, authState.token, setGlobalLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setGlobalLoading(true);
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
    } finally {
      setGlobalLoading(false);
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
