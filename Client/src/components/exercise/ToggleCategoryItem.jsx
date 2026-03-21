import React from "react";

export default function ToggleCategoryItem({
  categoryName,
  isChecked,
  handleToggle,
}) {
  return (
    <div className="filter-item">
      <input
        type="checkbox"
        name={categoryName}
        id={categoryName}
        checked={isChecked}
        onChange={handleToggle}
      />
      <label htmlFor={categoryName} className={isChecked ? "checked" : ""}>
        {categoryName}
      </label>
    </div>
  );
}
