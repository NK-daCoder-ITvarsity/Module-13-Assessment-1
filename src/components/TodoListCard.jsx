const TodoCard = ({ task, onDelete, onEdit }) => {
    return (
      <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border-l-2 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{task.description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onEdit(task)}
            className="text-sm px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
};

export { TodoCard }
  