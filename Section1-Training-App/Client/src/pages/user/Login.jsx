import "./styles/userForm.css";
import Navbar from "../../components/Navbar";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import FormInput from "../../components/FormInput";
import { checkEmail, checkPassword } from "../../utils/checkFormInputs";
import { myFetch } from "../../utils/myFetch";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contextAPI/AuthContext";
import { ToastContext } from "../../contextAPI/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const { authState, authDispatch } = useContext(AuthContext);
  const { toastState, toastDispatch } = useContext(ToastContext);

  const [data, setData] = useState({
    email: "",
    password: "",
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

      const res = await myFetch("/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const cookieToken = Cookies.get("accessToken");

      if (res.status === "success" && cookieToken) {
        toastDispatch({
          type: "ok",
          payload: {
            message: "Log-In successful!",
          },
        });
        authDispatch({
          type: "LOGIN",
          payload: { token: cookieToken },
        });
        navigate("/profile");
      } else {
        throw Error("ciao");
      }
    } catch (error) {
      console.log(error);
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

          <button type="submit">Log-In</button>
        </form>

        <span className="forgot-password nav-span">
          <NavLink to="/forgot-password">Forgot Password?</NavLink>
        </span>
      </div>
    </>
  );
}
