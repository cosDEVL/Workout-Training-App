export default function ManageButtons({
  handleEdit,
  handleDelete,
  exerciseIndex = undefined,
}) {
  return (
    <div className="buttons">
      <button className="edit" onClick={() => handleEdit(exerciseIndex)}>
        Edit
      </button>
      <button className="delete" onClick={() => handleDelete(exerciseIndex)}>
        Delete
      </button>
    </div>
  );
}
