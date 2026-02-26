import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import Exercise from "../components/CreateWorkout-components/Exercise";

import "./workoutDetails.css";

export default function WorkoutDetails() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { workoutID } = useParams();

  const [workout, setWorkout] = useState(state?.workout || null);
  console.log(workout);
  const [isLoading, setIsLoading] = useState(workout ? false : true);

  useEffect(() => {
    if (!workout) {
      async function fetchWorkout() {
        try {
          const response = await fetch(
            `${apiUrl}/api/v1/workouts/${workoutID}`,
          );
          const data = await response.json();

          setWorkout(data);
        } catch (error) {
          console.log(error);
          navigate("/workout-list");
        } finally {
          setIsLoading(false);
        }
      }
      fetchWorkout();
    }
  }, [workout, workoutID, navigate, apiUrl]);

  function handleNavigateEdit() {
    navigate(`/edit-workout/${workout._id}`, {
      state: {
        workout,
      },
    });
  }

  async function handleDeleteWorkout() {
    if (!confirm("Do you want to delete the workout?")) return;
    try {
      await fetch(`${apiUrl}/api/v1/workouts/${workout._id}`, {
        method: "DELETE",
      });

      navigate("/workout-list");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <DisplayArea>
        {isLoading ? (
          <div className="loading-data">
            <h1>Loading workout...</h1>
          </div>
        ) : (
          <div className="workout-details">
            <div className="workout-menu">
              <p className="name">{workout.workoutName}</p>
              <div className="buttons">
                <button className="delete" onClick={handleDeleteWorkout}>
                  Delete
                </button>
                <button className="edit" onClick={handleNavigateEdit}>
                  Edit
                </button>
              </div>
            </div>
            <div className="workout-exercises">
              <p className="num-exercises">
                <span>Num Exercises: </span>
                {workout.exerciseList.length}
              </p>
              <div className="list">
                {workout.exerciseList.map((exercise, i) => (
                  <Exercise
                    key={exercise._id || workout.exerciseList.length + i}
                    exercise={exercise}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </DisplayArea>
    </>
  );
}
