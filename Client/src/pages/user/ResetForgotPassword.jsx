import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";
import ToastMessage from "../../components/ToastMessage";
import {
  checkConfirmPassword,
  checkPassword,
} from "../../utils/checkFormInputs";
import { myFetch } from "../../utils/myFetch";
import { useNavigate, useParams } from "react-router";
import { ToastContext } from "../../contextAPI/ToastContext";
import { GlobalLoadingContext } from "../../contextAPI/GlobalLoadingContext";

export default function ResetForgotPassword() {
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const { toastState, toastDispatch } = useContext(ToastContext);
  const { globalLoading, setGlobalLoading } = useContext(GlobalLoadingContext);

  const [data, setData] = useState({
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
      setGlobalLoading(true);
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

      const res = await myFetch(`/users/reset-password/${resetToken}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (res.status === "success") {
        toastDispatch({
          type: "ok",
          payload: {
            message: "Password Reset went successfull!",
          },
        });

        setTimeout(() => navigate("/login"), 5000);
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
      <div className="reset-password user-form main window">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </>
  );
}
