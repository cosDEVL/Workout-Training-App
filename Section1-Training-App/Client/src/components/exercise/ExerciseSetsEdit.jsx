import { useEffect, useReducer, useState } from "react";
import "./exerciseSetsEdit.css";
import FormInput from "../FormInput";
import SetRow from "./SetRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

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
        <button type="button" className="close" onClick={removeEditExercise}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="sets custom-scrollbar">
        <button className="add-set" onClick={() => addExerciseSets()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {exercise.sets &&
          exercise.sets.map((set, i) => (
            <SetRow
              key={set.setID}
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
