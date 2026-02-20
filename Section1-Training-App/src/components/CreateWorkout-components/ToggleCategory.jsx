export default function ToggleCategory({ categoryName, isChecked, onToggle }) {
  return (
    <div className="toggle-category">
      <input
        type="checkbox"
        name={categoryName}
        id={categoryName}
        checked={isChecked}
        onChange={onToggle}
      />
      <label htmlFor={categoryName} className={isChecked ? "checked" : ""}>
        {categoryName}
      </label>
    </div>
  );
}
