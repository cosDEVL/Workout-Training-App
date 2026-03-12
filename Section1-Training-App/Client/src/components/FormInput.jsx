import "./formInput.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function FormInput({
  label,
  type,
  value,
  handleChange,
  errorTarget = null,
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`input ${errorTarget === label ? "error" : ""}`}>
      <input
        type={!showPassword ? type : "text"}
        name={label}
        id={label}
        value={value}
        onChange={handleChange}
        required
      />
      <label htmlFor={label} className={value ? "input-present" : ""}>
        {children}
      </label>
      {type === "password" && (
        <button
          type="button"
          className="show-password"
          onClick={handleShowPassword}
          tabIndex={-1}
        >
          <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} />
        </button>
      )}
    </div>
  );
}
