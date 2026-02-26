import { useState } from "react";
import Set from "./Set";
import ExerciseForm from "./ExerciseForm";

import { useSortable } from "@dnd-kit/react/sortable";

import "./exercise.css";

export default function Exercise({
  editMode = false,
  exercise,
  id = undefined,
  index = undefined,
  children,
}) {
  const { ref } = useSortable({ id, index });

  const [editForm, setEditForm] = useState(false);

  const reps = exercise.sets.map((set) => set.reps).join(" - ");
  const weight = exercise.sets.map((set) => `${set.weight}kg`).join(" - ");

  return (
    <div className="exercise" ref={editMode ? ref : null}>
      <div className="exercise-info">
        <span className="name">{exercise.exerciseRef.name}</span>
        <p className="num-sets">{exercise.sets.length} Sets:</p>
        <div className="exercise-sets">
          <p className="reps">{reps}</p>
          <p className="weight">{weight}</p>
          {/* {exercise.sets.map((set) => (
            <Set set={set} key={set.setId} />
          ))} */}
        </div>
      </div>
      {children}
    </div>
  );
}
