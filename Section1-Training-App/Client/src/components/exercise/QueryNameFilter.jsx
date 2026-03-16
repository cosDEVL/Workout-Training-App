import { useState } from "react";
import "./queryNameFilter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ToggleCategoryItem from "./ToggleCategoryItem";

const BODY_PARTS = [
  "Full Body",
  "Chest",
  "Back",
  "Lower Back",
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
  "Dumbbell",
  "Body Weight",
  "Ez Barbell",
  "Kettlebell",
  "Trap Bar",
  "Machine",
  "Smith Machine",
];
const EXERCISE_TYPES = [
  "Strength",
  "Weightlifting",
  "Cardio",
  "Aerobic",
  "Stretching",
];

export default function QueryNameFilter({ queryFilter, handleToggle }) {
  const [filterMenu, toggleFilterMenu] = useState(false);

  return (
    <div className="filter-query">
      <button
        className={`toggle-filter-menu ${filterMenu ? "open" : ""}`}
        onClick={() => toggleFilterMenu((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>
      {filterMenu && (
        <div className="filter-menu">
          <div className="category body-parts">
            <p>Body Parts</p>
            {BODY_PARTS.map((el) => (
              <ToggleCategoryItem
                key={el}
                categoryName={el}
                isChecked={queryFilter["bodyParts"].includes(el)}
                handleToggle={() => handleToggle("bodyParts", el)}
              />
            ))}
          </div>
          <div className="category equipments">
            <p>Equipments</p>
            {EQUIPMENTS.map((el) => (
              <ToggleCategoryItem
                key={el}
                categoryName={el}
                isChecked={queryFilter["equipments"].includes(el)}
                handleToggle={() => handleToggle("equipments", el)}
              />
            ))}
          </div>
          <div className="category exercise-types">
            <p>Exercise Types</p>
            {EXERCISE_TYPES.map((el) => (
              <ToggleCategoryItem
                key={el}
                categoryName={el}
                isChecked={queryFilter["exerciseTypes"].includes(el)}
                handleToggle={() => handleToggle("exerciseTypes", el)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
