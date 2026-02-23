import { useState, useEffect } from "react";
import ToggleCategory from "./ToggleCategory";

import "./selectExercise.css";

const BODY_PARTS = [
  "FullBody",
  "Chest",
  "Back",
  "Shoulders",
  "Forearms",
  "Biceps",
  "Triceps",
  "Hamstrings",
  "Quadriceps",
  "Calves",
  "Hips",
];
const EQUIPMENTS = [
  "Assisted",
  "Band",
  "Barbell",
  "Olympic Barbell",
  "Dumbbell",
  "Body Weight",
  "Ez Barbell",
  "Kettlebell",
  "Trap Bar",
  "Leverage Machine",
  "Sled Machine",
  "Smith Machine",
];
const EXERCISE_TYPES = [
  "Strength",
  "Weightlifting",
  "Cardio",
  "Aerobic",
  "Stretching",
];

export default function SelectExercise({ onHandleSelect, onHandleCloseMenu }) {
  const [exerciseList, setExerciseList] = useState([]);

  const [queryName, setQueryName] = useState("");
  const [queryBodyParts, setQueryBodyParts] = useState([]);
  const [queryEquipments, setQueryEquipments] = useState([]);
  const [queryExerciseTypes, setQueryExerciseTypes] = useState([]);

  const [filterMenu, setFilterMenu] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const waitFetch = setTimeout(async function fetchExercises() {
      try {
        //Proprieta' interessate: name, equipments, bodyParts, exerciseType, imageUrl
        const url = new URL(
          `https://exercisedbv2.ascendapi.com/api/v1/exercises`,
        );
        url.searchParams.append("limit", "25");

        if (queryName) url.searchParams.append("name", queryName);
        if (queryBodyParts.length > 0)
          url.searchParams.append("bodyParts", queryBodyParts.join(","));
        if (queryEquipments.length > 0)
          url.searchParams.append("equipments", queryEquipments.join(","));
        if (queryExerciseTypes.length > 0)
          url.searchParams.append("exerciseType", queryExerciseTypes.join(","));

        const res = await fetch(url.toString(), { signal: controller.signal });

        console.log(url);

        const results = await res.json();
        setExerciseList(results.data);
      } catch (error) {
        console.log(error);
      }
    }, 300);

    return function () {
      controller.abort();
      clearTimeout(waitFetch);
    };
  }, [queryName, queryBodyParts, queryEquipments, queryExerciseTypes]);

  function handleToggleCategory(setQuery, categoryName) {
    setQuery((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName);
      }

      return [...prev, categoryName];
    });
  }

  function resetFilter() {
    setQueryBodyParts([]);
    setQueryEquipments([]);
    setQueryExerciseTypes([]);
  }

  return (
    <div className="select-exercise">
      <div className="search-exercise">
        <input
          type="text"
          id="search-name"
          name="search-name"
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
        />
        <button
          className="filter-options"
          onClick={() => setFilterMenu((prev) => !prev)}
        >
          Filter
        </button>
        {filterMenu && (
          <div className="filter-menu">
            <p className="category-name">Body Parts</p>
            <div className="category-list">
              {BODY_PARTS.map((el) => (
                <ToggleCategory
                  key={el}
                  categoryName={el}
                  isChecked={queryBodyParts.includes(el)}
                  onToggle={() => handleToggleCategory(setQueryBodyParts, el)}
                />
              ))}
            </div>
            <p className="category-name">Equipments</p>
            <div className="category-list">
              {EQUIPMENTS.map((el) => (
                <ToggleCategory
                  key={el}
                  categoryName={el}
                  isChecked={queryEquipments.includes(el)}
                  onToggle={() => handleToggleCategory(setQueryEquipments, el)}
                />
              ))}
            </div>
            <p className="category-name">Exercise Types</p>
            <div className="category-list">
              {EXERCISE_TYPES.map((el) => (
                <ToggleCategory
                  key={el}
                  categoryName={el}
                  isChecked={queryExerciseTypes.includes(el)}
                  onToggle={() =>
                    handleToggleCategory(setQueryExerciseTypes, el)
                  }
                />
              ))}
            </div>
            <div className="filter-buttons">
              <button onClick={resetFilter}>Reset</button>
              <button onClick={() => setFilterMenu(false)}>
                Show Results ({exerciseList.length})
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="search-results">
        {exerciseList.map((exercise) => (
          <div
            key={exercise.exerciseId}
            className="selectable-exercise"
            onClick={() => onHandleSelect(exercise.name)}
          >
            <img src={exercise.imageUrl} alt={`${exercise.name}`} />
            <div className="info">
              <p className="name">{exercise.name}</p>
              <p className="body-parts">{exercise.bodyParts.join(" ")}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="close-menu" onClick={onHandleCloseMenu}>
        Close
      </button>
    </div>
  );
}
