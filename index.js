const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // built-in body parser

// In-memory store
let tasks = [];
let nextId = 1;

// Allowed status
const validstatus = ["pending", "in-progress", "completed"];

//  GET /tasks 
app.get("/tasks", (req, res) => {
  let result = tasks;

  // filter by status
  if (req.query.status) {
    if (!validstatus.includes(req.query.status)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }
    result = result.filter((t) => t.status === req.query.status);
  }

  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    page,
    limit,
    total: result.length,
    tasks: paginated,
  });
});

//  GET /tasks/:id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

//  POST /tasks
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }
  if (!validstatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const newTask = {
    id: nextId++,
    title,
    description,
    status,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/id
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, status } = req.body;

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  if (description !== undefined && description.trim() === "") {
    return res.status(400).json({ error: "Description cannot be empty" });
  }
  if (status !== undefined && !validstatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  res.json(task);
});

// DELETE /tasks/id
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});


app.listen(port, () => {
  console.log(`Task API running at http://localhost:${port}`);
});
