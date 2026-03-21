import "./set.css";
import { useEffect, useState } from "react";
import SetInput from "./SetInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SetRow({
  set,
  index,
  exerciseKey,
  setExerciseSets,
  removeExerciseSets,
}) {
  const [localReps, setLocalReps] = useState(set.reps);
  const [localWeight, setLocalWeight] = useState(set.weight);

  useEffect(() => {
    setLocalReps(set.reps);
    setLocalWeight(set.weight);
  }, [set]);

  return (
    <div className="set">
      <div className="inputs">
        <SetInput
          label={`reps-${index}`}
          value={localReps}
          handleChange={(e) => setLocalReps(e.target.value)}
          handleBlur={(e) => setExerciseSets(e, exerciseKey, index)}
        >
          Reps
        </SetInput>
        <SetInput
          label={`weight-${index}`}
          value={localWeight}
          handleChange={(e) => setLocalWeight(e.target.value)}
          handleBlur={(e) => setExerciseSets(e, exerciseKey, index)}
        >
          Weight
        </SetInput>
        <button
          className="remove-set"
          onClick={() => removeExerciseSets(index)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
