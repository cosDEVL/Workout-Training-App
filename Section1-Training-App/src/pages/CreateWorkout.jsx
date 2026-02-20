import { useState } from "react";
import Navbar from "../components/NavBar-Components/Navbar";
import DisplayArea from "../components/DisplayArea";
import ExerciseForm from "../components/CreateWorkout-components/ExerciseForm";
import Exercise from "../components/CreateWorkout-components/Exercise";

import "./createWorkout.css";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

export default function CreateWorkout() {
  const [openForm, setOpenForm] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);

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
        dateCreation: Date.now(),
      };

      const response = await fetch(`http://localhost:3000/WORKOUT-LIST`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      console.log(response);

      setWorkoutName("");
      setExercises([]);
    } catch (error) {
      console.log(error);
    }

    return;
  }

  console.log(exercises);

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
              <button onClick={() => setOpenForm(true)}>Add Exercise</button>
            </div>
            {openForm && (
              <ExerciseForm
                handleExercise={handleAddExercise}
                closeForm={() => setOpenForm(false)}
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
                    exercise={exercise}
                    handleDelete={handleDeleteExercise}
                    handleEdit={handleEditExercise}
                    key={exercise.id}
                    id={exercise.id}
                    index={i}
                  />
                ))}
              </div>
            </DragDropProvider>
          </div>
        </div>
      </DisplayArea>
    </>
  );
}
