import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/NavBar-Components/Navbar";
import DisplayArea from "../../components/DisplayArea";
import { useNavigate } from "react-router";

import WorkoutTab from "../../components/WorkoutList-Components/WorkoutTab";
import "./workoutList.css";
import { AuthContext } from "../../AuthContext";

export default function WorkoutList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const authState =
    authContext.state.isAuthenticated && authContext.state.token ? true : false;

  useEffect(() => {
    if (!authState) navigate("/");
  }, [authState, navigate]);

  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/workouts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authContext.state.token}`,
          },
          credentials: "include",
        });
        const json = await response.json();
        console.log(response);
        setWorkoutList(json.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchWorkout();
  }, [apiUrl, authContext.state.token]);

  function newWorkout() {
    navigate("/create-workout");
  }

  async function handleDeleteWorkout(idWorkout) {
    try {
      if (confirm("Want to delete this workout?")) {
        await fetch(`${apiUrl}/api/v1/workouts/${idWorkout}`, {
          method: "DELETE",
        });

        setWorkoutList((prev) =>
          prev.filter((workout) => workout._id !== idWorkout),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <DisplayArea>
        <div className="workout-list">
          <h1 className="page-title">Workout List</h1>
          <div className="list-info">
            <p className="num-workouts">
              <span>Num results:</span> {workoutList.length}
            </p>
            <button className="create-workout-btn" onClick={newWorkout}>
              New Workout
            </button>
          </div>
          <div className="workouts-created">
            {workoutList.map((workout) => (
              <WorkoutTab
                workout={workout}
                handleDelete={handleDeleteWorkout}
                key={workout._id}
              />
            ))}
          </div>
        </div>
      </DisplayArea>
    </>
  );
}
