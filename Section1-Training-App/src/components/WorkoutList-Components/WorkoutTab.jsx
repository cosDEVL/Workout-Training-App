import { useNavigate } from "react-router";
import "./workout.css";

export default function WorkoutTab({ workout, handleDelete }) {
  let navigate = useNavigate();

  function handleNavigateWorkout(workoutID) {
    navigate(`/workout/${workoutID}`, {
      state: {
        workout,
      },
    });
  }

  return (
    <div className="workout">
      <div className="main">
        <div className="info">
          <p className="name">{workout.workoutName}</p>
          <p className="num-exercise">
            <span>Num Exercises:</span> {workout.exerciseList.length}
          </p>
        </div>
        <div className="date-creation">
          <p>Created in: {workout.dateCreation.toString().split("T")[0]}</p>
        </div>
      </div>
      <div className="delete-workout">
        <button onClick={() => handleNavigateWorkout(workout.id)}>Open</button>
      </div>
    </div>
  );
}
