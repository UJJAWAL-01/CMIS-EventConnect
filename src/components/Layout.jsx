import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout({ role = "student", onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  // Role-specific navigation
  const navItems = {
    student: [
      { label: "Dashboard", path: "/student" },
      { label: "Profile", path: "/student/profile" },
      { label: "Resumes", path: "/student/resumes" },
      { label: "Applications", path: "/student/applications" },
    ],
    judge: [
      { label: "Dashboard", path: "/judge" },
      { label: "Cases", path: "/judge/cases" },
      { label: "Scoring", path: "/judge/scoring" },
    ],
    instructor: [
      { label: "Dashboard", path: "/instructor" },
      { label: "Class Management", path: "/instructor/classes" },
      { label: "Competitions", path: "/instructor/competitions" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Users", path: "/admin/users" },
      { label: "Analytics", path: "/admin/analytics" },
      { label: "Settings", path: "/admin/settings" },
    ],
  };

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const currentNavItems = navItems[role] || navItems.student;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">CMIS EventConnect</div>
        <div className="user-info">
          <span className="role-badge">{roleLabel}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className="app-body">
        <nav className="sidebar">
          {currentNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/` + role}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
