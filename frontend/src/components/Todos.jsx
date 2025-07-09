const Todos = ({ todos, onMark }) => {
    return (
        <div>
            {todos.map((todo, index) => (
                <div className="todo" key={index}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => onMark(todo._id)}>
                        Mark
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Todos;
