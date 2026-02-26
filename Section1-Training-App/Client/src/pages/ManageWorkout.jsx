import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import ExerciseForm from "../components/CreateWorkout-components/ExerciseForm";

import "./manageWorkout.css";

import { useLocation, useNavigate, useParams } from "react-router";
import AddedExerciseList from "../components/CreateWorkout-components/AddedExerciseList";

export default function ManageWorkout({ editMode = false }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();

  const { workoutID } = useParams();
  const { state } = useLocation();
  const [editWorkout, setEditWorkout] = useState(state?.workout || null);

  const [openAddForm, setOpenAddForm] = useState(false);
  const [workoutName, setWorkoutName] = useState(
    editWorkout?.workoutName || "",
  );

  const [exercises, setExercises] = useState(
    editWorkout?.exerciseList.map((exercise) => new Object({ ...exercise })) ||
      [],
  );

  // useCallback to store function reference between each re-render
  const fetchWorkout = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/workouts/${workoutID}`);
      const json = await response.json();

      return json.data;
    } catch (error) {
      console.log(error);
      navigate("/workout-list");
    }
  }, [apiUrl, workoutID, navigate]);

  // useEffect to execute fetchWorkout and setting initial data if needed
  useEffect(() => {
    async function setWorkoutData() {
      const workoutData = await fetchWorkout();

      setEditWorkout(workoutData);
      setWorkoutName(workoutData.workoutName);
      setExercises(
        workoutData.exerciseList.map((exercise) => {
          return { ...exercise };
        }),
      );
    }

    if (editMode && !editWorkout) {
      setWorkoutData();
    }
  }, [editMode, editWorkout, workoutID, navigate, apiUrl, fetchWorkout]);

  // function to send workout data based on the method
  async function sendWorkout(method, url, body) {
    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (exercises.length === 0) {
      alert("Add at least one exercise to be able to save the workout.");
      return;
    }

    try {
      let url = `${apiUrl}/api/v1/workouts`;

      const workout = JSON.stringify({
        workoutName,
        exerciseList: exercises,
      });

      if (editMode) {
        // Update Workout
        sendWorkout("PATCH", url.concat(`/${editWorkout._id}`), workout);
      } else {
        // Send new Workout
        sendWorkout("POST", url, workout);
      }

      setWorkoutName("");
      setExercises([]);

      if (editMode) {
        navigate(`/workout/${editWorkout._id}`);
      } else {
        navigate("/workout-list");
      }
    } catch (error) {
      console.log(error);
    }

    return;
  }

  function handleAddExercise(newExercise) {
    setExercises((prev) => [...prev, newExercise]);
  }

  return (
    <>
      <Navbar />
      <DisplayArea>
        <div className="create-workout">
          <form className="workout-submit" onSubmit={handleSubmit}>
            <input
              type="text"
              name="workout-name"
              id="workout-name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              required
            />
            <button id="submit-workout" type="submit">
              Save
            </button>
          </form>
          <div className="exercise-list">
            <div className="add-exercise">
              <button onClick={() => setOpenAddForm(true)}>Add Exercise</button>
            </div>

            {openAddForm && (
              <ExerciseForm
                handleExercise={handleAddExercise}
                closeForm={() => setOpenAddForm(false)}
              />
            )}

            <AddedExerciseList
              exercises={exercises}
              setExercises={setExercises}
            />
          </div>
        </div>
      </DisplayArea>
    </>
  );
}
