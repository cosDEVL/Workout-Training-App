import { useEffect, useState } from "react";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import ExerciseForm from "../components/CreateWorkout-components/ExerciseForm";
import Exercise from "../components/CreateWorkout-components/Exercise";

import "./manageWorkout.css";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useLocation, useNavigate, useParams } from "react-router";

export default function ManageWorkout({ editMode = false }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();
  const { workoutID } = useParams();

  const { state } = useLocation();
  // const editWorkout = location.state?.workout;

  const [editWorkout, setEditWorkout] = useState(state?.workout || null);

  const exerciseList = editWorkout?.exerciseList.map((exercise) => {
    return { ...exercise };
  });

  const [openAddForm, setOpenAddForm] = useState(false);
  // const [openEditForm, setOpenEditForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [workoutName, setWorkoutName] = useState(
    editWorkout ? editWorkout.workoutName : "",
  );

  const [exercises, setExercises] = useState(exerciseList ? exerciseList : []);

  useEffect(() => {
    if (editMode && !editWorkout) {
      async function fetchEditWorkout() {
        try {
          const response = await fetch(
            `${apiUrl}/api/v1/workouts/${workoutID}`,
          );
          const json = await response.json();

          setEditWorkout(json.data[0]);
          setWorkoutName(json.data[0].workoutName);
          setExercises(
            json.data[0].exerciseList.map((exercise) => {
              return { ...exercise };
            }),
          );
        } catch (error) {
          console.log(error);
          navigate("/workout-list");
        }
      }

      fetchEditWorkout();
    }
  }, [editMode, editWorkout, workoutID, navigate, apiUrl]);

  function handleAddExercise(newExercise) {
    setExercises((prev) => [...prev, newExercise]);
  }

  function handleDeleteExercise(exerciseId) {
    setExercises((prev) =>
      prev.filter((exercise) => exercise._id !== exerciseId),
    );
  }
  console.log(exercises);

  function handleEditExercise(editedExercise) {
    setExercises((prev) =>
      prev.map((exercise) => {
        console.log(editedExercise, exercise);
        if (exercise._id === editedExercise._id) {
          return editedExercise;
        }
        return exercise;
      }),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (exercises.length === 0) {
      alert("Add at least one exercise to be able to save the workout.");
      return;
    }

    try {
      const workout = {
        workoutName,
        exerciseList: exercises,
      };

      // console.log(workout);
      let url = `${apiUrl}/api/v1/workouts`;

      console.log(workout);
      if (editMode) url = url.concat(`/${editWorkout._id}`);

      const response = await fetch(url, {
        method: editMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      console.log(response);

      setWorkoutName("");
      setExercises([]);

      if (editMode) {
        navigate(`/workout/${editWorkout._id}`, {
          state: {
            workout: {
              _id: editWorkout._id,
              workoutName,
              exerciseList: exercises,
            },
          },
        });
      } else {
        navigate("/workout-list");
      }
    } catch (error) {
      console.log(error);
    }

    return;
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
            <DragDropProvider
              onDragEnd={(event) => {
                setExercises((prev) => move(prev, event));
              }}
            >
              <div className="added-exercise">
                {exercises.map((exercise, i) => (
                  <Exercise
                    key={exercises.length + i}
                    editMode={true}
                    exercise={exercise}
                    id={exercise._id}
                    index={i}
                  >
                    <div className="buttons">
                      <button
                        className="edit"
                        onClick={() => setEditingExercise(exercise._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDeleteExercise(exercise._id)}
                      >
                        Delete
                      </button>
                    </div>
                    {editingExercise === exercise._id && (
                      <ExerciseForm
                        handleExercise={handleEditExercise}
                        editExercise={exercise}
                        closeForm={() => setEditingExercise(null)}
                      />
                    )}
                  </Exercise>
                ))}
              </div>
            </DragDropProvider>
          </div>
        </div>
      </DisplayArea>
    </>
  );
}
