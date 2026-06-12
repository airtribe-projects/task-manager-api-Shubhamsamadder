const taskData = require("../task.json");
const { validateTask } = require("../validators/taskValidator");

// In-memory storage
let tasks = taskData.tasks || [];

/**
 * GET /tasks -- fetch all tasks, with optional filtering by completion status and sorting by creation date
 */
const getAllTasks = (req, res) => {
  let result = [...tasks];

  const { completed } = req.query;
  const { sort } = req.query;

  if (completed !== undefined) {
    result = result.filter(
      (task) =>
        task.completed ===
        (completed === "true")
    );
  }
//sort by asc or desc
  if (sort === "asc") {
  result.sort(
    (a, b) =>
      new Date(a.createdAt || 0) -
      new Date(b.createdAt || 0)
  );
}

if (sort === "desc") {
  result.sort(
    (a, b) =>
      new Date(b.createdAt || 0) -
      new Date(a.createdAt || 0)
  );
  res.status(200).json(result);
};
}
/**
 * GET /tasks/:id -- fetch a single task by ID
 */
const getTaskById = (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.status(200).json(task);
};

/**
 * POST /tasks -- create a new task
 */
const createTask = (req, res) => {
  const validation = validateTask(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: validation.message,
    });
  }

  const newTask = {
  id: tasks.length
    ? tasks[tasks.length - 1].id + 1
    : 1,
  title: req.body.title,
  description: req.body.description,
  completed: req.body.completed,
  priority: req.body.priority || "medium",
  createdAt: new Date().toISOString(),
};

  tasks.push(newTask);

  res.status(201).json(newTask);
};

/**
 * PUT /tasks/:id -- update an existing task
 */
const updateTask = (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(
    (task) => task.id === id
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const validation = validateTask(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: validation.message,
    });
  }

  tasks[taskIndex] = {
    id,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };

  res.status(200).json(tasks[taskIndex]);
};

/**
 * DELETE /tasks/:id -- delete an existing task
 */
const deleteTask = (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex(
    (task) => task.id === id
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const deletedTask = tasks[taskIndex];

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask,
  });
};

//Optional: Get tasks by priority level
const getTasksByPriority = (req, res) => {
  const { level } = req.params;

  const validLevels = [
    "low",
    "medium",
    "high",
  ];

  if (!validLevels.includes(level)) {
    return res.status(400).json({
      error: "Invalid priority level",
    });
  }

  const filteredTasks = tasks.filter(
    (task) => task.priority === level
  );

  res.status(200).json(filteredTasks);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority
};