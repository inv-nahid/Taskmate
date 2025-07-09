import { useState, useEffect } from "react";
import Todos from "./components/Todos";
import CreateTodo from "./components/CreateTodo";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="container">
      <h1 className="heading">TaskMate - Your Todo Companion ✅</h1>
      <p className="about">
        TaskMate helps you stay productive by tracking your daily tasks.
        Add, manage, and delete your todos with a simple and clean interface.
      </p>

      <h2>Add Todo</h2>
      <CreateTodo />
      <h2>Your Todos</h2>
      <Todos todos={todos} onMark={handleDelete} />
    </div>
  );
};

export default App;
