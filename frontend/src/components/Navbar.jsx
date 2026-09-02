import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.info("You have been logged out successfully 👋");

    setTimeout(() => {
      navigate("/login");
    }, 400);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <div className="logo-icon">✓</div>

          <div>
            <h2>TaskFlow</h2>
            <span>Stay organized</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="user-text">
              <span>Welcome back</span>
              <strong>{user?.name || "User"}</strong>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;