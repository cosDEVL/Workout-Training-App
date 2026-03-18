import "./styles/workout-create.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FormInput from "../../components/FormInput";
import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFloppyDisk,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import DbExerciseList from "../../components/exercise/DbExerciseList";
import ExerciseTab from "../../components/exercise/ExerciseTab";
import ExerciseSetsEdit from "../../components/exercise/ExerciseSetsEdit";

export default function WorkoutCreate() {
  const { authState, authDispatch } = useContext(AuthContext);
  const { toastState, toastDispatch } = useContext(ToastContext);

  const [workoutName, setWorkoutName] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExerciseKey, setSelectedExerciseKey] = useState(null);
  const editExercise = exerciseList.find(
    (ex) => ex.uniqueKey === selectedExerciseKey,
  );

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

  const handleAddExercise = (exercise) => {
    const newExerciseObj = {
      uniqueKey: crypto.randomUUID(),
      _id: exercise._id,
      name: exercise.name,
      exerciseType: exercise.exerciseType,
      bodyParts: exercise.bodyParts,
      equipments: exercise.equipments,
      sets: [],
    };
    setExerciseList((prev) => [...prev, newExerciseObj]);
    setSelectedExerciseKey(newExerciseObj.uniqueKey);
  };

  const handleRemoveExercise = (exercise) => {
    setExerciseList((prevList) => {
      return prevList.filter((ex) => ex.uniqueKey !== exercise.uniqueKey);
    });

    if (editExercise?.uniqueKey === exercise.uniqueKey)
      setSelectedExerciseKey(null);
  };

  const handleAddExerciseSets = () => {
    setExerciseList((prevList) =>
      prevList.map((ex) =>
        ex.uniqueKey === selectedExerciseKey
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                { setID: crypto.randomUUID(), reps: "", weight: "" },
              ],
            }
          : ex,
      ),
    );
  };

  const handleRemoveExerciseSets = (setIndex) => {
    setExerciseList((prevList) =>
      prevList.map((ex) =>
        ex.uniqueKey === selectedExerciseKey
          ? {
              ...ex,
              sets: ex.sets.filter((_, idx) => idx !== setIndex),
            }
          : ex,
      ),
    );
  };

  const handleSetExerciseSets = (e, exerciseKey, setIndex) => {
    const fieldName = e.target.name.split("-")[0];
    const value = e.target.value;

    setExerciseList((prevList) =>
      prevList.map((ex) =>
        ex.uniqueKey === exerciseKey
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) =>
                idx === setIndex
                  ? {
                      ...set,
                      [fieldName]: value,
                    }
                  : set,
              ),
            }
          : ex,
      ),
    );
  };

  return (
    <>
      <Navbar />
      <div className="workout-create window main">
        <h2>Create a Workout</h2>
        <div className="container">
          <div className="workout-edit">
            <form>
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
              <button className="add-exercise">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              {exerciseList &&
                exerciseList.map((exercise, i) => (
                  <ExerciseTab
                    key={exercise.uniqueKey}
                    exerciseName={exercise.name}
                    exerciseBodyParts={exercise.bodyParts}
                    exercise={exercise}
                    onDragStart={(e) => dragStart(e, i)}
                    onDragEnter={(e) => dragEnter(e, i)}
                    onDragEnd={dragEnd}
                  >
                    <button
                      className="edit"
                      onClick={() => setSelectedExerciseKey(exercise.uniqueKey)}
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
          <div className="exercise-edit">
            {selectedExerciseKey && editExercise ? (
              <ExerciseSetsEdit
                exercise={editExercise}
                setExerciseSets={handleSetExerciseSets}
                addExerciseSets={handleAddExerciseSets}
                removeExerciseSets={handleRemoveExerciseSets}
                removeEditExercise={() => setSelectedExerciseKey(null)}
              />
            ) : (
              <div className="no-selected-exercise">
                <span className="icon">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </span>
                <span className="tip">
                  Select a workout to view the preview
                </span>
              </div>
            )}
          </div>
          <DbExerciseList handleAddExercise={handleAddExercise} />
        </div>
      </div>
    </>
  );
}
