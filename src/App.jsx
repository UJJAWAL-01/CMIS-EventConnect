import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentResumesPage from "./pages/StudentResumesPage";
import StudentApplicationsPage from "./pages/StudentApplicationsPage";
import StudentEventRegistrationPage from "./pages/StudentEventRegistrationPage";
import JudgeDashboard from "./pages/JudgeDashboard";
import JudgeStudentProfilesPage from "./pages/JudgeStudentProfilesPage";
import JudgeCasesPage from "./pages/JudgeCasesPage";
import JudgeScoringPage from "./pages/JudgeScoringPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  // Auth state - will be replaced with real context API + backend
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem("userRole") || "student";
  });

  const token = localStorage.getItem('auth_token');
  const firstName = useMemo(() => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const name = payload?.name || payload?.username || '';
      const first = String(name).split(' ')[0];
      return first || null;
    } catch (e) {
      return null;
    }
  }, [token]);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole.toLowerCase());
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", userRole.toLowerCase());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("student");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    try { localStorage.removeItem('auth_token'); } catch (_) {}
  };

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // Logged in - show role-based dashboard
  return (
    <Router>
      <Routes>
        {/* Student routes */}
        <Route
          path="/student/*"
          element={role === "student" ? <Layout role={role} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="resumes" element={<StudentResumesPage />} />
          <Route path="applications" element={<StudentApplicationsPage />} />
          <Route path="events" element={<StudentEventRegistrationPage />} />
        </Route>

        {/* Judge routes */}
        <Route
          path="/judge/*"
          element={role === "judge" ? <Layout role={role} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<JudgeDashboard />} />
          <Route path="student-profiles" element={<JudgeStudentProfilesPage />} />
          <Route path="cases" element={<JudgeCasesPage />} />
          <Route path="score/:studentId" element={<JudgeScoringPage />} />
        </Route>

        {/* Instructor routes */}
        <Route
          path="/instructor/*"
          element={role === "instructor" ? <Layout role={role} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<InstructorDashboard />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={role === "admin" ? <Layout role={role} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Public auth routes */}
        <Route path="/login" element={<Navigate to={`/${role}`} replace />} />
        <Route path="/register" element={<Navigate to={`/${role}`} replace />} />

        {/* Default redirect based on role */}
        <Route path="*" element={<Navigate to={`/${role}`} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
