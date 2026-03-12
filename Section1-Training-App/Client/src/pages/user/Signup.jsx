import "./styles/userForm.css";
import React, { useCallback, useContext, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";

import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
} from "../../utils/checkFormInputs";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contextAPI/AuthContext";
import { myFetch } from "../../utils/myFetch";
import { ToastContext } from "../../contextAPI/ToastContext";

export default function Signup() {
  const navigate = useNavigate();
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!checkEmail(data.email)) {
        toastDispatch({
          type: "warning",
          payload: {
            target: "email",
            message: "Enter a valid email address!",
          },
        });
        return;
      }
      if (!checkPassword(data.password)) {
        toastDispatch({
          type: "warning",
          payload: {
            target: "password",
            message:
              "Password must be between 8 and 16 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*_=+-)",
          },
        });
        return;
      }

      if (!checkConfirmPassword(data.password, data.confirmPassword)) {
        toastDispatch({
          type: "warning",
          payload: {
            target: "confirmPassword",
            message: "Passwords do not match.",
          },
        });
        return;
      }

      const res = await myFetch("/users/signup", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const cookieToken = document.cookie.startsWith("accessToken")
        ? document.cookie.split("=")[1]
        : null;

      if (res?.status === "success" && cookieToken) {
        toastDispatch({
          type: "ok",
          payload: {
            message: "Sign-Up successful!",
          },
        });
        authDispatch({
          type: "LOGIN",
          payload: { token: cookieToken },
        });
        navigate("/profile");
      } else {
        throw Error();
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
      <div className="user-form main window">
        <h2>
          Log-In to <span className="logo">SyncFit</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label={"username"}
            type={"username"}
            value={data.username}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Username
          </FormInput>
          <FormInput
            label={"email"}
            type={"email"}
            value={data.email}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Email
          </FormInput>
          <FormInput
            label={"password"}
            type={"password"}
            value={data.password}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Password
          </FormInput>

          <FormInput
            label={"confirmPassword"}
            type={"password"}
            value={data.confirmPassword}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Confirm Password
          </FormInput>

          <button type="submit">Log-In</button>
        </form>
      </div>
    </>
  );
}
