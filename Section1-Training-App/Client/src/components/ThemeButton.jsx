import "./themeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../contextAPI/ThemeContext";

export default function ThemeButton() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={toggleTheme}
      className={`theme-button ${darkMode === "on" ? "dark" : "light"}`}
    >
      <FontAwesomeIcon icon={faMoon} />
      <FontAwesomeIcon icon={faSun} />
    </div>
  );
}
