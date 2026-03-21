import "./loading.css";

export default function Loading({ global }) {
  return (
    <div className={`loader ${global ? "global" : ""}`}>
      <div className="loading-icon"></div>
    </div>
  );
}
