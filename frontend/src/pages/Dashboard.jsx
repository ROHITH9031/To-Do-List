import { useEffect, useState } from "react";

import API from "../services/api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const [error, setError] =
    useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        "/tasks"
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) => {
      if (filter === "completed") {
        return task.completed;
      }

      if (filter === "pending") {
        return !task.completed;
      }

      return true;
    }
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  return (
    <div className="app-container">
      <Navbar />

      <main className="dashboard">
        <section className="dashboard-header">
          <h1>My Tasks</h1>

          <p>
            Stay organized and get things done.
          </p>
        </section>

        {/* Statistics */}
        <section className="stats-container">
          <div className="stat-card">
            <h3>Total</h3>
            <p>{tasks.length}</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>
        </section>

        {/* Add Task */}
        <TaskForm
          fetchTasks={fetchTasks}
        />

        {/* Filters */}
        <div className="filter-container">
          <button
            className={
              filter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            className={
              filter === "pending"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setFilter("pending")
            }
          >
            Pending
          </button>

          <button
            className={
              filter === "completed"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <p className="loading-text">
            Loading tasks...
          </p>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>

            <p>
              Add a new task to get started!
            </p>
          </div>
        ) : (
          <section className="task-list">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                fetchTasks={fetchTasks}
              />
            ))}
          </section>
        )}
      </main>
      return (
      <div className="app-container">
        <Navbar />

        <main className="dashboard">
          {/* All your existing dashboard content */}
        </main>

        <Footer />
      </div>
      );
    </div>
  );
}

export default Dashboard;