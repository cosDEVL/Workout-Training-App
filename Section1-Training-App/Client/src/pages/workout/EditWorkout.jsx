import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import WorkoutEditor from "./WorkoutEditor";
import { useParams } from "react-router";
import { ToastContext } from "../../contextAPI/ToastContext";
import { AuthContext } from "../../contextAPI/AuthContext";
import { myFetch } from "../../utils/myFetch";
import { GlobalLoadingContext } from "../../contextAPI/GlobalLoadingContext";

export default function EditWorkout() {
  const { toastState, toastDispatch } = useContext(ToastContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const { globalLoading, setGlobalLoading } = useContext(GlobalLoadingContext);

  const [workoutName, setWorkoutName] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const { workoutID } = useParams();

  useEffect(() => {
    async function getWorkoutData() {
      setGlobalLoading(true);
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
              uniqueKey: crypto.randomUUID(),
              name: exerciseRef.name,
              bodyParts: exerciseRef.bodyParts,
              sets: ex.sets,
              _id: exerciseRef._id,
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
      } finally {
        setGlobalLoading(false);
      }
    }

    getWorkoutData();
  }, [authState.token, toastDispatch, workoutID, setGlobalLoading]);

  const patchWorkout = async (body) => {
    return await myFetch(`/workouts/${workoutID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
      body,
    });
  };

  if (globalLoading || !workoutName) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="manage-workout window main">
        <WorkoutEditor
          workout={{ workoutName, exerciseList }}
          workoutRequest={patchWorkout}
        />
      </div>
    </>
  );
}
