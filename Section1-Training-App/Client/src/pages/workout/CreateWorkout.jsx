import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { myFetch } from "../../utils/myFetch";
import "./styles/workout-editor.css";
import WorkoutEditor from "./WorkoutEditor";
import { AuthContext } from "../../contextAPI/AuthContext";

export default function CreateWorkout() {
  const { authState, authDispatch } = useContext(AuthContext);

  const postWorkout = async (body) => {
    return await myFetch("/workouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
      body,
    });
  };

  return (
    <>
      <Navbar />
      <div className="manage-workout window main ">
        <WorkoutEditor workoutRequest={postWorkout} />
      </div>
    </>
  );
}
