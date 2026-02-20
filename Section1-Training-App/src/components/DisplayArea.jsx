import React from "react";
import "./displayArea.css";

export default function DisplayArea({ children }) {
  return (
    <div className="display-area">
      <div className="on-camera">
        {/* questo span e' stato inserito per far si che questo div non venga ignorato dal DOM */}
        <span style={{ visibility: "hidden" }}>'</span>
        {children}
      </div>
    </div>
  );
}
