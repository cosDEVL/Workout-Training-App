import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import WorkoutEditor from "./WorkoutEditor";
import { useParams } from "react-router";
import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";
import { myFetch } from "../../utils/myFetch";

export default function EditWorkout() {
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);

  const [workoutName, setWorkoutName] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const { workoutID } = useParams();

  useEffect(() => {
    async function getWorkoutData() {
      try {
        const res = await myFetch(`/workouts/${workoutID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (res.status === "success") {
          const { data } = res;

          const newExerciseList = data.exerciseList.map((ex) => {
            const { exerciseRef } = ex;
            return {
              uniqueKey: exerciseRef._id,
              name: exerciseRef.name,
              bodyParts: exerciseRef.bodyParts,
              sets: ex.sets,
              _id: ex._id,
            };
          });
          setWorkoutName(data.workoutName);
          setExerciseList(newExerciseList);
        }
      } catch (error) {
        toastDispatch({
          type: "error",
          payload: {
            message: error.message || "Something went wrong!",
          },
        });
      }
    }

    getWorkoutData();
  }, [authState.token, toastDispatch, workoutID]);

  const patchWorkout = async (body) => {
    return await myFetch(`/workouts/${workoutID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
      body,
    });
  };

  return (
    <>
      <Navbar />
      <div className="workout-edit window main">
        <h1>Edit Workout</h1>
        <WorkoutEditor
          workout={{ workoutName, exerciseList }}
          workoutRequest={patchWorkout}
        />
      </div>
    </>
  );
}
