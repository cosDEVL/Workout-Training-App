import { useState } from "react";
import SelectExercise from "./SelectExercise";

import "./exerciseForm.css";

export default function ExerciseForm({
  handleExercise,
  editExercise = undefined,
  closeForm,
}) {
  const [menuStatus, setMenuStatus] = useState(!editExercise);

  const [exerciseRef, setExerciseRef] = useState(
    editExercise ? editExercise.exerciseRef : null,
  );
  const [sets, setSets] = useState(
    editExercise ? editExercise.sets : [{ reps: "", weight: "" }],
  );

  function handleSelect(exercise) {
    setExerciseRef(exercise);
    setMenuStatus(false);
  }

  function handleAddSet() {
    setSets((prev) => [...prev, { reps: "", weight: "" }]);
  }

  function handleChange(focus, index, value) {
    const newSets = sets.map((set, i) => {
      if (i === index) {
        return { ...set, [focus]: Number(value) };
      } else return set;
    });

    setSets(newSets);
  }

  console.log(sets);

  function handleRemoveSet(index) {
    const newSets = sets.filter((set) => sets.indexOf(set) !== index);
    setSets(newSets);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const exerciseData = {
      _id: editExercise ? editExercise._id : null,
      exerciseRef: editExercise ? editExercise.exerciseRef : exerciseRef,
      sets,
    };

    handleExercise(
      editExercise
        ? exerciseData
        : {
            exerciseRef: exerciseData.exerciseRef,
            sets: exerciseData.sets.map((set) => {
              return { reps: set.reps, weight: set.weight ? set.weight : 0 };
            }),
          },
    );
    closeForm();

    if (!editExercise) {
      setExerciseRef(null);
      setSets([{ _id: crypto.randomUUID(), reps: "", weight: "" }]);
    }
  }

  return (
    <div className="modulo-backdrop">
      <div className="exercise-modulo">
        <div className="modulo">
          <div style={{ display: menuStatus ? "block" : "none" }}>
            <SelectExercise
              onHandleSelect={handleSelect}
              onHandleCloseMenu={() => setMenuStatus(false)}
            />
          </div>
          {!menuStatus &&
            (!exerciseRef ? (
              <p className="no-exercise-selected">
                Open the Exercise List and select one
              </p>
            ) : (
              <form className="exercise-submit" onSubmit={handleSubmit}>
                <div className="exercise-selected">
                  <p className="name">{exerciseRef.name}</p>
                  <button className="submit" type="submit">
                    {!editExercise ? `Add Exercise` : `Edit Exercise`}
                  </button>
                </div>
                <button
                  type="button"
                  className="add-set"
                  onClick={handleAddSet}
                >
                  Add Set
                </button>
                <div className="sets-list">
                  {sets.map((set, i) => (
                    <div className="set" key={set?._id || sets.length + i + 1}>
                      <div>
                        <label
                          htmlFor={`reps-${set?._id || sets.length + i + 1}`}
                        >
                          Reps
                        </label>
                        <input
                          type="number"
                          name="reps"
                          id={`reps-${set?._id || sets.length + i + 1}`}
                          value={set.reps}
                          onChange={(e) =>
                            handleChange("reps", i, e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`weight-${set?._id || sets.length + i + 1}`}
                        >
                          Weight
                        </label>
                        <input
                          type="number"
                          name="weight"
                          id={`weight-${set?._id || sets.length + i + 1}`}
                          value={set.weight}
                          onChange={(e) =>
                            handleChange("weight", i, e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="remove-set"
                        onClick={() => handleRemoveSet(i)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </form>
            ))}
        </div>
        {!menuStatus && (
          <div className="modulo-buttons">
            <button
              type="button"
              className="set-exercise"
              onClick={() => setMenuStatus(true)}
            >
              {!exerciseRef ? `Open Exercise List` : `Change Exercise`}
            </button>
            <button className="close-form" onClick={closeForm}>
              close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
