import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">CMIS EventConnect</div>
        <div className="user-info">Student Portal</div>
      </header>
      <div className="app-body">
        <nav className="sidebar">
          <NavLink to="/student" end className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/student/profile" className="nav-link">
            Profile
          </NavLink>
          <NavLink to="/student/resumes" className="nav-link">
            Resumes
          </NavLink>
          <NavLink to="/student/applications" className="nav-link">
            Job Applications
          </NavLink>
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
