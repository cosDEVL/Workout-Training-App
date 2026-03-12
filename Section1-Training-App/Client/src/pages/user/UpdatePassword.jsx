import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";
import {
  checkConfirmPassword,
  checkPassword,
} from "../../utils/checkFormInputs";
import { myFetch } from "../../utils/myFetch";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
      if (!checkPassword(data.newPassword)) {
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

      if (!checkConfirmPassword(data.newPassword, data.confirmNewPassword)) {
        toastDispatch({
          type: "warning",
          payload: {
            target: "confirmPassword",
            message: "Passwords do not match.",
          },
        });
        return;
      }

      const res = await myFetch("/users/update-password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.status === "success") {
        toastDispatch({
          type: "ok",
          payload: {
            message: "Password updated successfully! Log In Again...",
          },
        });

        authDispatch({
          type: "LOGOUT",
        });

        await myFetch("/users/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
      }
    } catch (error) {
      toastDispatch({
        type: "error",
        payload: {
          message: error.message || "Something went wrong...",
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
            label={"currentPassword"}
            type={"password"}
            value={data.currentPassword}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Current Password
          </FormInput>
          <FormInput
            label={"newPassword"}
            type={"password"}
            value={data.newPassword}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            New Password
          </FormInput>
          <FormInput
            label={"confirmNewPassword"}
            type={"password"}
            value={data.confirmNewPassword}
            handleChange={handleChange}
            errorTarget={toastState.target}
          >
            Confirm New Password
          </FormInput>

          <button type="submit">Update Password</button>
        </form>
      </div>
    </>
  );
}
