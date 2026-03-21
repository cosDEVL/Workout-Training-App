import { faGripVertical, faL } from "@fortawesome/free-solid-svg-icons";
import "./exerciseTab.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExerciseTab({
  exerciseName,
  exerciseBodyParts,
  selectable = false,
  exercise,
  sets = null,
  handleAction,

  onDragStart = null,
  onDragEnter = null,
  onDragEnd = null,
  children,
}) {
  const [isDraggable, setIsDraggable] = useState(
    onDragStart !== null && onDragEnter !== null && onDragEnd !== null
      ? false
      : null,
  );

  const mouseDown = () => {
    setIsDraggable(true);
  };

  const mouseUp = () => {
    setIsDraggable(false);
  };

  const dragEnd = () => {
    setIsDraggable(false);
    onDragEnd();
  };

  if (selectable) {
    return (
      <button className="exercise-tab" onClick={() => handleAction(exercise)}>
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
        {children}
      </button>
    );
  } else {
    return (
      <div
        className={`exercise-tab ${isDraggable ? "dragging" : ""}`}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={dragEnd}
      >
        <div className="info">
          {isDraggable !== null && (
            <button type="button" className="drag-drop">
              <FontAwesomeIcon
                icon={faGripVertical}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
              />
            </button>
          )}
          <div className="container">
            <h4 className="exercise-name">
              {sets ? `${sets.length} x ${exerciseName}` : `${exerciseName}`}
            </h4>
            <div className="group-focus">
              {exerciseBodyParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
            </div>
          </div>
        </div>
        {children ? <div className="manage-btns">{children}</div> : <></>}
      </div>
    );
  }
}
