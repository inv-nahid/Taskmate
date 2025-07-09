import { useState } from "react";

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                onClick={() => {
                    fetch("http://localhost:3000/todo", {
                        method: "POST",
                        body: JSON.stringify({
                            title,
                            description,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(async (res) => {
                        await res.json();
                        alert("Todo added!");
                        window.location.reload(); // Optional: refresh to fetch new todos
                    });
                }}
            >
                Add
            </button>
        </div>
    );
};

export default CreateTodo;
