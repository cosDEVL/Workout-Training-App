export default function Set({ set }) {
  return (
    <div className="set">
      <div className="reps">
        <p className="label">Sets: </p>
        <span>{set.reps}</span>
      </div>
      <div
        className="weight"
        style={{ display: set.weight ? "block" : "none" }}
      >
        <p className="label">Weight: </p>
        <span>{set.weight}</span>
      </div>
    </div>
  );
}
