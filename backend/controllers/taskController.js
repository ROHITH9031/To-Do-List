const mongoose = require("mongoose");
const Task = require("../models/Task");

// =====================
// CREATE TASK
// =====================
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// GET ALL TASKS
// =====================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// UPDATE TASK
// =====================
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check whether task ID is valid
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOne({
      _id: taskId,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you are not authorized",
      });
    }

    const { title, description, completed } = req.body;

    // Update title
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Task title cannot be empty",
        });
      }

      task.title = title.trim();
    }

    // Update description
    if (description !== undefined) {
      task.description = description.trim();
    }

    // Update completed status
    if (completed !== undefined) {
      task.completed = completed;
    }

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update Task Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// DELETE TASK
// =====================
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check whether task ID is valid
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you are not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedTask: task,
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};