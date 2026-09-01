import { useState } from "react";
import API from "../services/api";

function TaskItem({ task, fetchTasks }) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.title);

  const [description, setDescription] =
    useState(task.description || "");

  const [loading, setLoading] = useState(false);

  const toggleCompleted = async () => {
    try {
      setLoading(true);

      await API.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      alert(
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

      fetchTasks();
    } catch (error) {
      alert(
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
      alert("Task title cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await API.put(`/tasks/${task._id}`, {
        title,
        description,
      });

      setEditing(false);

      fetchTasks();
    } catch (error) {
      alert(
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
              Save
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setEditing(false)
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`task-item ${
        task.completed ? "completed" : ""
      }`}
    >
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompleted}
          disabled={loading}
        />

        <div>
          <h3>{task.title}</h3>

          {task.description && (
            <p>{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() =>
            setEditing(true)
          }
          disabled={loading}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={deleteTask}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;