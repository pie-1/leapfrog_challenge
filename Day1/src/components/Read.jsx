

const Read = ({todos,settodos}) => {
    const DeleteHandler = (id) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id); // Filter out the todo with the specified id
        settodos(filteredTodos);  // Update the state with the filtered list of todos
    }
  return (
    <div className="w-1/2">
        <h1 className="text-6xl font-light text-pink-400 mb-10">
            Pending <span className="text-white">Todos</span>
        </h1>

        <div className="space-y-4">
            {todos.length > 0 ? (
            todos.map((todo) => (
                <div
                key={todo.id}
                className="
                    bg-[#0d1a33]
                    p-5
                    flex
                    justify-between
                    items-center
                "
                >
                <span className="text-xl text-gray-200">
                    {todo.title}
                </span>

                <button
                    onClick={() => DeleteHandler(todo.id)}
                    className="
                    text-red-400
                    hover:text-red-500
                    transition
                    "
                >
                    Delete
                </button>
                </div>
            ))
            ) : (
            <p className="text-gray-400">No pending tasks</p>
            )}
        </div>
        </div>
    );

}

export default Read