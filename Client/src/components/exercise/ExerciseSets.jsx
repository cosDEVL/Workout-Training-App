import "./exerciseSets.css";

export default function ExerciseSets({ sets }) {
  return (
    <div className="exercise-sets">
      {sets.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Set</th>
              <th>Reps</th>
              <th>Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((set, i) => (
              <tr key={set._id}>
                <td>{i + 1}</td>
                <td>{set.reps}</td>
                <td>{set.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="no-sets">Sets not specified</span>
      )}
    </div>
  );
}
