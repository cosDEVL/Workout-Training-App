import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExerciseSetsEdit from "../exercise/ExerciseSetsEdit";

export default function ExerciseEdit({
  exerciseList,
  setExerciseList,
  exerciseKey,
  setExerciseKey,
}) {
  console.log(exerciseList);
  const editExercise = exerciseList.find((ex) => ex.uniqueKey === exerciseKey);

  const handleAddExerciseSets = () => {
    setExerciseList((prevList) =>
      prevList.map((ex) =>
        ex.uniqueKey === exerciseKey
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
        ex.uniqueKey === exerciseKey
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
    <div className="exercise-edit">
      {exerciseKey && editExercise ? (
        <ExerciseSetsEdit
          exercise={editExercise}
          setExerciseSets={handleSetExerciseSets}
          addExerciseSets={handleAddExerciseSets}
          removeExerciseSets={handleRemoveExerciseSets}
          removeEditExercise={() => setExerciseKey(null)}
        />
      ) : (
        <div className="no-selected-exercise">
          <span className="icon">
            <FontAwesomeIcon icon={faCircleInfo} />
          </span>
          <span className="tip">Select a workout to view the preview</span>
        </div>
      )}
    </div>
  );
}
