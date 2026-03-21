import "./toastMessage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { ToastContext } from "../contextAPI/ToastContext";

export default function ToastMessage() {
  const { toastState, toastDispatch } = useContext(ToastContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      toastDispatch({ type: "toggleMessage" });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [toastDispatch]);

  return (
    <div className={`toast-message ${toastState.type} ${open ? "open" : ""}`}>
      <button
        className="close-toast"
        onClick={() => toastDispatch({ type: "toggleMessage" })}
      >
        <FontAwesomeIcon icon={faX} size="xl" />
      </button>
      <h5>{toastState.type}</h5>
      <p>{toastState.message}</p>
    </div>
  );
}
