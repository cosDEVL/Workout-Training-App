import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import Exercise from "../components/CreateWorkout-components/Exercise";

import "./workoutDetails.css";
import ManageButtons from "../components/common/ManageButtons";

export default function WorkoutDetails() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { workoutID } = useParams();

  const [workout, setWorkout] = useState(state?.workout || null);

  const [isLoading, setIsLoading] = useState(workout ? false : true);

  const getWorkout = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/workouts/${workoutID}`);
      const json = await response.json();

      return json.data;
    } catch (error) {
      console.log(error);
      navigate("/workout-list");
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, navigate, workoutID]);

  useEffect(() => {
    if (!workout) {
      async function fetchWorkout() {
        const workoutData = await getWorkout();

        setWorkout(workoutData);
      }
      fetchWorkout();
    }
  }, [workout, getWorkout]);

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
              <ManageButtons
                handleEdit={handleNavigateEdit}
                handleDelete={handleDeleteWorkout}
              />
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
