import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import Exercise from "./Exercise";
import ExerciseForm from "./ExerciseForm";
import ManageButtons from "../common/ManageButtons";

export default function AddedExerciseList({ exercises, setExercises }) {
  const [editingExercise, setEditingExercise] = useState(null);

  function handleDeleteExercise(index) {
    setExercises((prev) =>
      prev.filter((exercise) => exercises.indexOf(exercise) !== index),
    );
  }

  function handleEditExercise(editedExercise) {
    setExercises((prev) =>
      prev.map((exercise) => {
        if (exercise._id === editedExercise._id) {
          return editedExercise;
        }
        return exercise;
      }),
    );
  }

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        setExercises((prev) => move(prev, event));
      }}
    >
      <div className="added-exercise">
        {exercises.map((exercise, i) => (
          <Exercise
            key={crypto.randomUUID()}
            editMode={true}
            exercise={exercise}
            id={crypto.randomUUID()}
            index={i}
          >
            {editingExercise === exercises.indexOf(exercise) && (
              <ExerciseForm
                handleExercise={handleEditExercise}
                editExercise={exercise}
                closeForm={() => setEditingExercise(null)}
              />
            )}
            <ManageButtons
              handleEdit={setEditingExercise}
              handleDelete={handleDeleteExercise}
              exerciseIndex={i}
            />
            {/* <div className="buttons">
              <button className="edit" onClick={() => setEditingExercise(i)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDeleteExercise(i)}
              >
                Delete
              </button>
            </div> */}
          </Exercise>
        ))}
      </div>
    </DragDropProvider>
  );
}
