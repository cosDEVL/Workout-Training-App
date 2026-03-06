import { useContext, useState, useEffect } from "react";
import Navbar from "../NavBar-Components/Navbar";
import DisplayArea from "../DisplayArea";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../AuthContext";

export default function ResetForgotPassword() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (authState) navigate("/");
  }, [authState, navigate]);

  const { resetToken } = useParams();
  const [passwordManaging, setPasswordManaging] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (event) => {
    setPasswordManaging({
      ...passwordManaging,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { newPassword, confirmNewPassword } = passwordManaging;

      const response = await fetch(
        `${apiUrl}/api/v1/users/reset-password/${resetToken}`,
        {
          headers: {
            Authorization: `Bearer ${authContext.state.token}`,
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({
            newPassword,
            confirmNewPassword,
          }),
          credentials: "include",
        },
      );

      if (response.ok) {
        authContext.dispatch({ type: "LOGOUT" });
        navigate("/");
      } else throw Error("Something is wrong!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <DisplayArea>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="new-password"
                onChange={handleChange}
                value={passwordManaging.newPassword}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirm-password"
                onChange={handleChange}
                value={passwordManaging.confirmNewPassword}
                required
              />
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      </DisplayArea>
    </>
  );
}
