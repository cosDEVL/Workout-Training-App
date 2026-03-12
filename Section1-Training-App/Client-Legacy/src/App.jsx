import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
// import CreateWorkout from "./pages/ManageWorkout";
import { AuthContext } from "./AuthContext";
import ManageWorkout from "./pages/workout-pages/ManageWorkout";
import WorkoutList from "./pages/workout-pages/WorkoutList";
import WorkoutDetails from "./pages/workout-pages/WorkoutDetails";
import Signup from "./pages/user-pages/Signup";
import Login from "./pages/user-pages/Login";
import User from "./pages/user-pages/User";
import { useReducer } from "react";
import Cookies from "js-cookie";
import EditUser from "./components/User-components/EditUser";
import ChangePassword from "./components/User-components/ChangePassword";
import ResetForgotPassword from "./components/User-components/ResetForgotPassword";
import ForgotPassword from "./components/User-components/ForgotPassword";

function App() {
  const initialState = document.cookie.includes("accessToken")
    ? { isAuthenticated: true, token: Cookies.get("accessToken") }
    : { isAuthenticated: false, token: null };

  function reducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token,
        };
      case "LOGOUT":
        return {
          ...state,
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />

          <Route path="/user/edit-user" element={<EditUser />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password/:resetToken"
            element={<ResetForgotPassword />}
          />

          <Route path="/" element={<Homepage />} />
          {/* <Route
          path="/create-workout"
          element={<CreateWorkout editMode={true} />}
        /> */}
          <Route path="/create-workout" element={<ManageWorkout />} />
          <Route
            path="/edit-workout/:workoutID"
            element={<ManageWorkout editMode={true} />}
          />
          <Route path="/workout-list" element={<WorkoutList />} />
          <Route path="/workout/:workoutID" element={<WorkoutDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
