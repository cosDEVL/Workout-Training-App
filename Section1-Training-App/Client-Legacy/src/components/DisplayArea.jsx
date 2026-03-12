import React from "react";
import "./displayArea.css";

export default function DisplayArea({ children }) {
  return (
    <div className="display-area">
      <div className="on-camera">{children}</div>
    </div>
  );
}
