import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router";
import { act, useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./contextAPI/AuthContext";
import Cookies from "js-cookie";
import { useReducer } from "react";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import ResetForgotPassword from "./pages/user/ResetForgotPassword";
import ForgotPassword from "./pages/user/ForgotPassword";
import Homepage from "./pages/Homepage";
import { ThemeContext } from "./contextAPI/ThemeContext";
import { ToastContext } from "./contextAPI/ToastContext";
import ToastMessage from "./components/ToastMessage";
import UpdateProfile from "./pages/user/UpdateProfile";
import UpdatePassword from "./pages/user/UpdatePassword";

function App() {
  const initialAuthStatus = document.cookie.includes("accessToken")
    ? { isAuth: true, token: Cookies.get("accessToken") }
    : { isAuth: false, token: null };

  const initialToastStatus = useMemo(() => {
    return {
      status: false,
      target: null,
      type: null,
      message: null,
    };
  }, []);

  const toastReducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case "ok":
          return {
            ...state,
            status: true,
            type: action.type,
            message: action.payload.message,
          };
        case "warning":
          return {
            ...state,
            status: true,
            type: action.type,
            target: action.payload.target,
            message: action.payload.message,
          };
        case "error":
          return {
            status: true,
            type: "error",
            message: action.payload.message,
          };
        case "toggleMessage":
          return initialToastStatus;
        default:
          return state;
      }
    },
    [initialToastStatus],
  );

  const authReducer = useCallback((state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isAuth: true,
          token: action.payload.token,
        };
      case "LOGOUT":
        return {
          ...state,
          isAuth: false,
          token: null,
        };
      default:
        return state;
    }
  }, []);

  const [toastState, toastDispatch] = useReducer(
    toastReducer,
    initialToastStatus,
  );

  const [authState, authDispatch] = useReducer(authReducer, initialAuthStatus);
  const authStatus = authState.isAuth && authState.token ? true : false;

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || "on",
  );
  localStorage.setItem("darkMode", darkMode);
  const toggleTheme = () => {
    setDarkMode((mode) => (mode === "on" ? "off" : "on"));
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode === "on" ? "dark" : "light",
    );
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ToastContext.Provider value={{ toastState, toastDispatch }}>
        <AuthContext.Provider value={{ authState, authDispatch }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={authStatus ? <Profile /> : <Navigate to="/login" />}
              />

              <Route
                path="/profile/update-profile"
                element={
                  authStatus ? <UpdateProfile /> : <Navigate to="/login" />
                }
              />

              <Route
                path="/profile/update-password"
                element={
                  authStatus ? <UpdatePassword /> : <Navigate to="/login" />
                }
              />

              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetForgotPassword />}
              />

              {/* <Route
            path="/workout/main"
            element={authStatus ? <WorkoutMainPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/workout/create"
            element={authStatus ? <WorkoutCreatePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/workout/details/:workoutID"
            element={authStatus ? <WorkoutDetailsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/workout/edit/:workoutID"
            element={authStatus ? <WorkoutEditPage /> : <Navigate to="/login" />}
          /> */}
            </Routes>
          </BrowserRouter>
          {toastState.status === true && <ToastMessage />}
        </AuthContext.Provider>
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
