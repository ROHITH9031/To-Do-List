import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning(
        "Please enter a task title first!"
      );

      return;
    }

    try {
      setLoading(true);

      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      await fetchTasks();

      toast.success(
        "Task added successfully! 🚀"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="task-form-container">
      <div className="task-form-header">
        <div>
          <p className="section-label">
            CREATE A TASK
          </p>

          <h2>What needs to be done?</h2>
        </div>

        <div className="form-header-icon">
          +
        </div>
      </div>

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <div className="task-input-wrapper">
          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <textarea
          placeholder="Add a description (optional)"
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
          {loading
            ? "Adding Task..."
            : "+ Add Task"}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;