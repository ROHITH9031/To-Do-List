import { useState } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>

      {message && (
        <p className="error-message">
          {message}
        </p>
      )}

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Add description (optional)"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          type="submit"
          className="add-task-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "+ Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;