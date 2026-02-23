import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import Exercise from "../components/CreateWorkout-components/Exercise";

import "./workoutDetails.css";

export default function WorkoutDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { workoutID } = useParams();
  console.log(workoutID);

  const [workout, setWorkout] = useState(state?.workout || null);
  const [isLoading, setIsLoading] = useState(workout ? false : true);
  console.log(workout);

  useEffect(() => {
    if (!workout) {
      async function fetchWorkout() {
        try {
          const response = await fetch(
            `http://localhost:3000/WORKOUT-LIST/${workoutID}`,
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
  }, [workout, workoutID, navigate]);

  function handleNavigateEdit() {
    navigate(`/edit-workout/${workout.id}`, {
      state: {
        workout,
      },
    });
  }

  async function handleDeleteWorkout() {
    if (!confirm("Do you want to delete the workout?")) return;
    try {
      await fetch(`http://localhost:3000/WORKOUT-LIST/${workout.id}`, {
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
                  <Exercise key={exercise.id} exercise={exercise} />
                ))}
              </div>
            </div>
          </div>
        )}
      </DisplayArea>
    </>
  );
}
