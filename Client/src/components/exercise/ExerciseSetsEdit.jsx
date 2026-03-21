import { useEffect, useReducer, useState } from "react";
import "./exerciseSetsEdit.css";
import FormInput from "../FormInput";
import SetRow from "./SetRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ExerciseSetsEdit({
  exercise,
  setExerciseSets,
  addExerciseSets,
  removeExerciseSets,
  removeEditExercise,
}) {
  return (
    <div className="sets-edit">
      <div className="header">
        <h4>{exercise.name}</h4>
        <button type="button" className="check" onClick={removeEditExercise}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
      <div className="sets custom-scrollbar">
        <button className="add-set" onClick={() => addExerciseSets()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {exercise.sets &&
          exercise.sets.map((set, i) => (
            <SetRow
              key={set._id}
              index={i}
              set={set}
              exerciseKey={exercise.uniqueKey}
              setExerciseSets={setExerciseSets}
              removeExerciseSets={removeExerciseSets}
            />
          ))}
      </div>
    </div>
  );
}
