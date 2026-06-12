function validateTask(task) {
  const { title, description, completed, priority } = task;

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    return {
      valid: false,
      message: "Title is required and cannot be empty",
    };
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return {
      valid: false,
      message: "Description is required and cannot be empty",
    };
  }

  if (typeof completed !== "boolean") {
    return {
      valid: false,
      message: "Completed must be a boolean value",
    };
  }

  const validPriorities = ["low", "medium", "high"];

  if (
    priority !== undefined &&
    !validPriorities.includes(priority)
  ) {
    return {
      valid: false,
      message: "Priority must be low, medium or high",
    };
  }

  return {
    valid: true,
  };
}

module.exports = {
  validateTask,
};