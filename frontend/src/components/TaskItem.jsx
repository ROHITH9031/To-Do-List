import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function TaskItem({ task, fetchTasks }) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] =
    useState(task.title);

  const [description, setDescription] =
    useState(task.description || "");

  const [loading, setLoading] =
    useState(false);

  const toggleCompleted = async () => {
    try {
      setLoading(true);

      await API.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      await fetchTasks();

      if (!task.completed) {
        toast.success(
          "Task completed! 🎉 Great job!"
        );
      } else {
        toast.info(
          "Task moved back to active."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      await API.delete(
        `/tasks/${task._id}`
      );

      await fetchTasks();

      toast.success(
        "Task deleted successfully! 🗑️"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning(
        "Task title cannot be empty!"
      );

      return;
    }

    try {
      setLoading(true);

      await API.put(`/tasks/${task._id}`, {
        title,
        description,
      });

      setEditing(false);

      await fetchTasks();

      toast.success(
        "Task updated successfully! ✨"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    } finally {
      setLoading(false);
    }
  };

  if (editing) {
    return (
      <div className="task-item editing-task">
        <form onSubmit={updateTask}>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <div className="task-actions">
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setEditing(false)
              }
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <article
      className={`task-item ${
        task.completed
          ? "completed"
          : ""
      }`}
    >
      <div className="task-content">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleted}
            disabled={loading}
          />

          <span className="checkmark"></span>
        </label>

        <div className="task-text">
          <h3>{task.title}</h3>

          {task.description && (
            <p>{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => setEditing(true)}
          disabled={loading}
          title="Edit task"
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={deleteTask}
          disabled={loading}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </article>
  );
}

export default TaskItem;