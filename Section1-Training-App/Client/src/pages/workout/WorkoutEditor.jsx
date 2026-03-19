import "./styles/workout-editor.css";
import { useContext, useEffect, useState } from "react";

import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";

import DbExerciseList from "../../components/exercise/DbExerciseList";

import { myFetch } from "../../utils/myFetch";
import { useNavigate } from "react-router";
import ExerciseEdit from "../../components/workout/ExerciseEdit";
import WorkoutEdit from "../../components/workout/WorkoutEdit";

export default function WorkoutEditor({ workout, workoutRequest }) {
  const navigate = useNavigate();

  const { toastState, toastDispatch } = useContext(ToastContext);

  const [workoutName, setWorkoutName] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExerciseKey, setSelectedExerciseKey] = useState(null);

  useEffect(() => {
    if (workout) {
      setWorkoutName(workout.workoutName);
      setExerciseList(workout.exerciseList);
    }
  }, [workout, workout?.workoutName, workout?.exerciseList]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const workoutObj = JSON.stringify({
        workoutName: workoutName,
        exerciseList: exerciseList.map((ex) => {
          return {
            exerciseRef: ex._id,
            sets: ex.sets.map((set) => {
              return {
                reps: set.reps,
                weight: set.weight,
              };
            }),
          };
        }),
      });

      const res = await workoutRequest(workoutObj);
      if (res.status === "success") {
        toastDispatch({
          type: "ok",
          payload: {
            message: res.message,
          },
        });
        navigate("/workout/main");
      } else {
        toastDispatch({
          type: "warning",
          payload: {
            message: res.message,
          },
        });
      }
    } catch (error) {
      toastDispatch({
        type: "error",
        payload: {
          message: error.message || "Something went wrong!",
        },
      });
    }
  };

  return (
    <div className="workout-editor">
      <WorkoutEdit
        handleSubmit={handleSubmit}
        workoutStates={{ workoutName, exerciseList, selectedExerciseKey }}
        setWorkoutName={setWorkoutName}
        setExerciseList={setExerciseList}
        setExerciseKey={setSelectedExerciseKey}
      />
      <ExerciseEdit
        exerciseList={exerciseList}
        setExerciseList={setExerciseList}
        exerciseKey={selectedExerciseKey}
        setExerciseKey={setSelectedExerciseKey}
      />
      <DbExerciseList handleAddExercise={handleAddExercise} />
    </div>
  );
}
