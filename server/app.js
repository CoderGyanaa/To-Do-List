const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// API Endpoints
app.get("/tasks", (req, res) => {
    db.getAllTasks((tasks) => res.json(tasks));
});

app.post("/tasks", (req, res) => {
    const { description } = req.body;
    const createdAt = new Date().toISOString();  // Store creation date and time
    db.addTask(description, createdAt, (result) => res.json(result));
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    db.deleteTask(id, (result) => res.json(result));
});

app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    const updatedAt = new Date().toISOString();  // Store the update date and time

    db.editTask(id, description, updatedAt, (result) => res.json(result));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
