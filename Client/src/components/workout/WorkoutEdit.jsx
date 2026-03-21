import React, { useContext, useState } from "react";
import { ToastContext } from "../../contextAPI/ToastContext";
import {
  faFloppyDisk,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExerciseTab from "../exercise/ExerciseTab";
import FormInput from "../FormInput";

export default function WorkoutEdit({
  handleSubmit,
  workoutStates,
  setWorkoutName,
  setExerciseList,
  exerciseKey,
  setExerciseKey,
  openExerciseMenu,
}) {
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { workoutName, exerciseList, selectedExerciseKey } = workoutStates;

  const [dragIndex, setDragIndex] = useState(null);

  const dragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.dropEffect = "move";
  };

  const dragEnter = (e, index) => {
    if (dragIndex === null || dragIndex === index) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    setExerciseList((prevList) => {
      const newList = [...prevList];
      const element = newList.splice(dragIndex, 1)[0];
      newList.splice(index, 0, element);
      return newList;
    });

    setDragIndex(index);
  };

  const dragEnd = () => {
    setDragIndex(null);
  };

  const handleRemoveExercise = (exercise) => {
    setExerciseList((prevList) => {
      return prevList.filter((ex) => ex.uniqueKey !== exercise.uniqueKey);
    });

    if (selectedExerciseKey === exercise.uniqueKey) setExerciseKey(null);
  };

  return (
    <div className={`workout-edit ${exerciseKey ? "editing" : ""}`}>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"workout-name"}
          type={"text"}
          value={workoutName}
          handleChange={(e) => setWorkoutName(e.target.value)}
          errorTarget={toastState.target}
        ></FormInput>
        <button type="submit">
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </form>
      <div className="exercise-list custom-scrollbar">
        <button className="add-exercise" onClick={openExerciseMenu}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {exerciseList &&
          exerciseList.map((exercise, i) => (
            <ExerciseTab
              key={exercise.uniqueKey}
              exerciseName={exercise.name}
              exerciseBodyParts={exercise.bodyParts}
              exercise={exercise}
              sets={exercise.sets}
              onDragStart={(e) => dragStart(e, i)}
              onDragEnter={(e) => dragEnter(e, i)}
              onDragEnd={dragEnd}
            >
              <button
                className="edit"
                onClick={() => setExerciseKey(exercise.uniqueKey)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                className="delete"
                onClick={() => handleRemoveExercise(exercise)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </ExerciseTab>
          ))}
      </div>
    </div>
  );
}
