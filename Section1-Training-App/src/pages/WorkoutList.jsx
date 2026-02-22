import { useState, useEffect } from "react";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import { useNavigate } from "react-router";

import "./workoutList.css";
import WorkoutTab from "../components/WorkoutList-Components/WorkoutTab";

export default function WorkoutList() {
  let navigate = useNavigate();

  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch(`http://localhost:3000/WORKOUT-LIST`);
        const data = await response.json();
        setWorkoutList(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchWorkout();
  }, []);

  function newWorkout() {
    navigate("/create-workout");
  }

  async function handleDeleteWorkout(idWorkout) {
    try {
      await fetch(`http://localhost:3000/WORKOUT-LIST/${idWorkout}`, {
        method: "DELETE",
      });

      setWorkoutList((prev) =>
        prev.filter((workout) => workout.id !== idWorkout),
      );
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
                key={workout.id}
              />
            ))}
          </div>
        </div>
      </DisplayArea>
    </>
  );
}
