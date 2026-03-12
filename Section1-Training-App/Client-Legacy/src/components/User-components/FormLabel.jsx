import React from "react";

export default function FormLabel({ inputType, value, setValue }) {
  return (
    <div className="label">
      <label htmlFor={inputType}>{inputType}</label>
      <input
        type={inputType}
        name={inputType}
        id={inputType}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
}
