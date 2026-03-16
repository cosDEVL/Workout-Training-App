import "./styles/workout-create.css";
import { useContext, useState } from "react";
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

export default function WorkoutCreate() {
  const { authState, authDispatch } = useContext(AuthContext);
  const { toastState, toastDispatch } = useContext(ToastContext);

  const [workoutName, setWorkoutName] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [editExercise, setEditExercise] = useState(null);

  const [dragIndex, setDragIndex] = useState(null);

  const dragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.dropEffect = "move";
    e.target.style.cursor = "grab";
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
    setEditExercise(newExerciseObj);
  };

  const handleRemoveExercise = (exercise) => {
    setExerciseList((prevList) => {
      return prevList.filter((ex) => ex.uniqueKey !== exercise.uniqueKey);
    });

    if (editExercise.uniqueKey === exercise.uniqueKey) setEditExercise(null);
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
                    draggable={true}
                    dragging={dragIndex === i}
                    onDragStart={(e) => dragStart(e, i)}
                    onDragEnter={(e) => dragEnter(e, i)}
                    onDragEnd={dragEnd}
                  >
                    <button
                      className="edit"
                      onClick={() => setEditExercise(exercise)}
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
            {editExercise ? (
              <>{editExercise.name}</>
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
