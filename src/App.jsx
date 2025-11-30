import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentResumesPage from "./pages/StudentResumesPage";
import StudentApplicationsPage from "./pages/StudentApplicationsPage";

function App() {
  // TODO: replace with real auth later
  const isLoggedIn = true; 
  const role = "student";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />

        {/* Placeholder: once logged in, redirect based on role */}
        <Route
          path="/student"
          element={
            isLoggedIn ? (
              <div>Student dashboard placeholder</div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/student"
          element={
            isLoggedIn && role === "student" ? (
              <Layout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="resumes" element={<StudentResumesPage />} />
          <Route path="applications" element={<StudentApplicationsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
