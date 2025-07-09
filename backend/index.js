const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        });
        return;
    }

    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({ msg: "Todo Created Successfully!" });
    } catch (err) {
        res.json({ msg: "Could not create a Todo. Please try again." });
    }
});

app.get("/todos", async function (req, res) {
    try {
        const todos = await todo.find();
        res.json({ todos });
    } catch (err) {
        res.json({ msg: "Could not find your Todos." });
    }
});

// ✅ Delete todo when marked
app.delete("/todo/:id", async function (req, res) {
    const id = req.params.id;
    try {
        await todo.deleteOne({ _id: id });
        res.json({ msg: "Todo deleted successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete todo" });
    }
});

app.listen(3000);
