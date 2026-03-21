import "./set.css";

export default function SetInput({
  label,

  value,
  handleChange,
  handleBlur,
  children,
}) {
  return (
    <div className="set-input">
      <label htmlFor={label}>{children}</label>
      <input
        type="number"
        name={label}
        id={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
