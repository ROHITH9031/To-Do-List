import { useEffect, useState } from "react";

import API from "../services/api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState("all");
const [error, setError] = useState("");

const fetchTasks = async () => {
try {
setLoading(true);
setError("");


  const response = await API.get("/tasks");

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

const filteredTasks = tasks.filter((task) => {
if (filter === "completed") {
return task.completed;
}


if (filter === "pending") {
  return !task.completed;
}

return true;


});

const completedTasks = tasks.filter(
(task) => task.completed
).length;

const pendingTasks =
tasks.length - completedTasks;

return ( <div className="app-container"> <Navbar />


  <main className="dashboard">
    {/* Header */}
    <section className="dashboard-header">
      <div>
        <p className="dashboard-greeting">
          👋 Welcome back!
        </p>

        <h1>Make today productive.</h1>

        <p>
          Stay organized and turn your goals
          into achievements.
        </p>
      </div>

      <div className="header-badge">
        ✨ Focus Mode
      </div>
    </section>

    {/* Statistics */}
    <section className="stats-container">
      <div className="stat-card total-card">
        <div className="stat-icon">📋</div>

        <div>
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>
      </div>

      <div className="stat-card pending-card">
        <div className="stat-icon">⏳</div>

        <div>
          <h3>In Progress</h3>
          <p>{pendingTasks}</p>
        </div>
      </div>

      <div className="stat-card completed-card">
        <div className="stat-icon">🎉</div>

        <div>
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
      </div>
    </section>

    {/* Add Task */}
    <TaskForm fetchTasks={fetchTasks} />

    {/* Tasks Header and Filters */}
    <section className="tasks-section">
      <div className="tasks-section-header">
        <div>
          <h2>Your Tasks</h2>

          <p>
            {filteredTasks.length} task
            {filteredTasks.length !== 1 ? "s" : ""} showing
          </p>
        </div>

        <div className="filter-container">
          <button
            className={
              filter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={
              filter === "pending"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("pending")}
          >
            Active
          </button>

          <button
            className={
              filter === "completed"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>

          <p>Loading your tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>

          <h3>No tasks found!</h3>

          <p>
            Add a new task and start making progress.
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
    </section>
  </main>

  {/* Footer */}
  <Footer />
</div>


);
}

export default Dashboard;
