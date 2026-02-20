import { useState } from "react";
import Set from "./Set";
import ExerciseForm from "./ExerciseForm";

import { useSortable } from "@dnd-kit/react/sortable";

import "./exercise.css";

export default function Exercise({
  exercise,
  handleDelete,
  handleEdit,
  id,
  index,
}) {
  const { ref } = useSortable({ id, index });

  const [editForm, setEditForm] = useState(false);

  const reps = exercise.sets.map((set) => set.reps).join(" - ");
  const weight = exercise.sets.map((set) => `${set.weight}kg`).join(" - ");

  console.log(exercise);

  function handleDragEnd(e) {
    console.log(e);
  }

  return (
    <div className="exercise" ref={ref} onDragEnd={handleDragEnd}>
      <div className="exercise-info">
        <span className="name">{exercise.name}</span>
        <p className="num-sets">{exercise.sets.length} Sets:</p>
        <div className="exercise-sets">
          <p className="reps">{reps}</p>
          <p className="weight">{weight}</p>
          {/* {exercise.sets.map((set) => (
            <Set set={set} key={set.setId} />
          ))} */}
        </div>
      </div>
      <div className="buttons">
        <button className="edit" onClick={() => setEditForm(true)}>
          Edit
        </button>
        <button className="delete" onClick={() => handleDelete(exercise.id)}>
          Delete
        </button>
      </div>
      {editForm && (
        <ExerciseForm
          handleExercise={handleEdit}
          editExercise={exercise}
          closeForm={() => setEditForm(false)}
        />
      )}
    </div>
  );
}
