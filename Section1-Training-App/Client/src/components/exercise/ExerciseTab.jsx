import { faL } from "@fortawesome/free-solid-svg-icons";
import "./exerciseTab.css";

export default function ExerciseTab({
  exerciseName,
  exerciseBodyParts,
  selectable = false,
  exercise,
  sets,
  handleAction,
  draggable = false,
  dragging = false,
  onDragStart = null,
  onDragEnter = null,
  onDragEnd = null,
  children,
}) {
  if (selectable) {
    return (
      <button className="exercise-tab" onClick={() => handleAction(exercise)}>
        <h4 className="exercise-name">{exerciseName}</h4>
        <div className="group-focus">
          {exerciseBodyParts.map((part) => (
            <span key={part}>{part}</span>
          ))}
        </div>
      </button>
    );
  } else {
    return (
      <div
        className={`exercise-tab ${dragging ? "dragging" : ""}`}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={onDragEnd}
      >
        <div className="info">
          <h4 className="exercise-name">
            {sets ? `${sets.length} x ${exerciseName}` : `${exerciseName}`}
          </h4>
          <div className="group-focus">
            {exerciseBodyParts.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </div>
        </div>
        {children ? <div className="manage-btns">{children}</div> : <></>}
      </div>
    );
  }
}
