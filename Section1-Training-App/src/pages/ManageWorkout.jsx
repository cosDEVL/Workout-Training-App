import { useState } from "react";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import ExerciseForm from "../components/CreateWorkout-components/ExerciseForm";
import Exercise from "../components/CreateWorkout-components/Exercise";

import "./manageWorkout.css";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useLocation, useNavigate } from "react-router";

export default function ManageWorkout({ editMode = false }) {
  let navigate = useNavigate();
  const location = useLocation();
  const editWorkout = location.state?.workout;
  let exerciseList;

  if (editWorkout) {
    exerciseList = editWorkout.exerciseList.map((exercise) => {
      return { ...exercise };
    });
  }

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [workoutName, setWorkoutName] = useState(
    editWorkout ? editWorkout.workoutName : "",
  );
  const [exercises, setExercises] = useState(exerciseList ? exerciseList : []);

  function handleAddExercise(newExercise) {
    setExercises((prev) => [...prev, newExercise]);
  }

  function handleDeleteExercise(exerciseId) {
    setExercises((prev) =>
      prev.filter((exercise) => exercise.id !== exerciseId),
    );
  }

  function handleEditExercise(editedExercise) {
    setExercises((prev) =>
      prev.map((exercise) => {
        if (exercise.id === editedExercise.id) {
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
        dateCreation: new Date().toISOString(),
      };

      // console.log(workout);
      let url = `http://localhost:3000/WORKOUT-LIST`;

      if (editMode) url = url.concat(`/${editWorkout.id}`);

      const response = await fetch(url, {
        method: editMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      setWorkoutName("");
      setExercises([]);

      if (editMode) {
        navigate(`/workout/${editWorkout.id}`, {
          state: {
            workout: {
              id: editWorkout.id,
              workoutName,
              exerciseList: exercises,
              dateCreation: workout.dateCreation,
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
                    key={exercise.id}
                    editMode={true}
                    exercise={exercise}
                    id={exercise.id}
                    index={i}
                  >
                    <div className="buttons">
                      <button
                        className="edit"
                        onClick={() => setOpenEditForm(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDeleteExercise(exercise.id)}
                      >
                        Delete
                      </button>
                    </div>
                    {openEditForm && (
                      <ExerciseForm
                        handleExercise={handleEditExercise}
                        editExercise={exercise}
                        closeForm={() => setOpenEditForm(false)}
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
