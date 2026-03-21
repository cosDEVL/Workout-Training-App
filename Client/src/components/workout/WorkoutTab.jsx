import "./workoutTab.css";

export default function WorkoutTab({ workout, selected, handleSelect }) {
  return (
    <div
      className={`workout-tab ${selected ? "selected" : ""}`}
      onClick={() => handleSelect(workout)}
    >
      <span className="name logo">{workout.workoutName}</span>
      <span className="num-exercises">
        {workout.exerciseList.length} Exercises
      </span>
      <span className="date-creation">
        Date created: {workout.createdAt.split("T")[0]}
      </span>
    </div>
  );
}
