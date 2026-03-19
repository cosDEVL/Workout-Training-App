import "./styles/workout-main.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextAPI/AuthContext";
import { ToastContext } from "../../contextAPI/ToastContext";
import { myFetch } from "../../utils/myFetch";
import WorkoutTab from "../../components/workout/WorkoutTab";
import ExerciseTab from "../../components/exercise/ExerciseTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function WorkoutMain() {
  const navigate = useNavigate();
  const { authState, authDispatch } = useContext(AuthContext);
  const { toastState, toastDispatch } = useContext(ToastContext);

  const [workoutList, setWorkoutList] = useState([]);
  const [workoutSelected, setWorkoutSelected] = useState(null);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const res = await myFetch("/workouts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (res.status === "success") {
          setWorkoutList(() => [...res.data]);
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

    getWorkouts();
  }, [toastDispatch, authState.token]);

  const handleSelectWorkout = (workout) => {
    setWorkoutSelected(workout);
  };

  const handleClosePreview = () => {
    if (window.innerWidth <= 768) {
      document.querySelector(".workout-preview").classList.add("closing");

      setTimeout(() => {
        setWorkoutSelected(null);
      }, 250);
    } else setWorkoutSelected(null);
  };

  const handleDeleteWorkout = async (workoutID) => {
    if (!confirm("Are you sure do you want to delete the workout?")) return;
    try {
      const res = await myFetch(`/workouts/${workoutID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (res.status === "success") {
        setWorkoutList((prev) => {
          return prev.filter((pervList) => pervList._id !== workoutID);
        });

        setWorkoutSelected(null);

        toastDispatch({
          type: "ok",
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
    <>
      <Navbar />
      <div className="workout-main window main">
        <h2>My Workouts</h2>
        <div className="container">
          <div className="workout-list custom-scrollbar">
            <div
              className="workout-tab add-workout-btn"
              onClick={() => navigate("/workout/create")}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="tip">New Workout</span>
            </div>
            {workoutList.map((el) => (
              <WorkoutTab
                key={el._id}
                workout={el}
                selected={workoutSelected?._id === el._id}
                handleSelect={handleSelectWorkout}
              />
            ))}
          </div>

          {workoutSelected ? (
            <div className="workout-preview">
              <div className="header">
                <h3>{workoutSelected.workoutName}</h3>
                <div className="workout-manage-btns">
                  <button
                    className="edit"
                    onClick={() =>
                      navigate(`/workout/details/${workoutSelected._id}`)
                    }
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteWorkout(workoutSelected._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button className="close" onClick={handleClosePreview}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </div>
              <div className="exercise-list custom-scrollbar">
                {workoutSelected.exerciseList.map((exercise, i) => (
                  <ExerciseTab
                    key={i}
                    exerciseName={exercise.exerciseRef.name}
                    exerciseBodyParts={exercise.exerciseRef.bodyParts}
                    sets={exercise.sets}
                  ></ExerciseTab>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-selected-workout">
              <span className="icon">
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
              <span className="tip">Select a workout to view the preview</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
