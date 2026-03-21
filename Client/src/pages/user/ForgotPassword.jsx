import { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";
import { NavLink } from "react-router";
import { myFetch } from "../../utils/myFetch";
import { checkEmail } from "../../utils/checkFormInputs";
import { ToastContext } from "../../contextAPI/ToastContext";
import { GlobalLoadingContext } from "../../contextAPI/GlobalLoadingContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { toastState, toastDispatch } = useContext(ToastContext);
  const { globalLoading, setGlobalLoading } = useContext(GlobalLoadingContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setGlobalLoading(true);
      if (!checkEmail(email)) {
        toastDispatch({
          type: "warning",
          payload: {
            target: "email",
            message: "Enter a valid email address!",
          },
        });
        return;
      }

      const res = await myFetch("/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.status === "success") {
        toastDispatch({
          type: "ok",
          payload: {
            message:
              "Request sent! If your email is registered, you will receive an email with the reset link.",
          },
        });
        setEmail("");
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
      <div className="forgot-password user-form main window">
        <h2>Forgot Password?</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label={"email"}
            type={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          >
            Email
          </FormInput>

          <button type="submit">Reset Password</button>
        </form>
        <span className="back-to-login nav-span">
          <NavLink to="/login">Back to Login</NavLink>
        </span>
      </div>
    </>
  );
}
