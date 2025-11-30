import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ROLES = ["Student", "Judge", "Instructor", "Admin"];

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call backend /auth/login with { email, password, role }
    // and store token + role in localStorage/context.
    console.log("LOGIN", { email, role });

    // For now, route by role:
    if (role === "Student") navigate("/student");
    if (role === "Judge") navigate("/judge");
    if (role === "Instructor") navigate("/instructor");
    if (role === "Admin") navigate("/admin");
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        {/* Left: form */}
        <section className="auth-main">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 className="auth-title">Log in to CMIS EventConnect</h1>
            <p className="auth-subtitle">
              Texas A&amp;M CMIS engagement portal for students, judges, instructors,
              and admins.
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Texas A&amp;M Email</label>
              <input
                type="email"
                required
                placeholder="netid@tamu.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Role</label>
              <div className="role-pill-group">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`role-pill ${r === role ? "active" : ""}`}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button className="primary-btn" type="submit">
              Continue
            </button>
          </form>

          <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
            New to the portal?{" "}
            <Link className="link-text" to="/register">
              Create an account
            </Link>
          </p>
        </section>

        {/* Right: TAMU branding */}
        <aside className="auth-aside">
          <div>
            <div className="auth-tamu-badge">
              <span>ATM</span>
              <span>Texas A&amp;M · CMIS</span>
            </div>
            <h2 style={{ marginTop: "1.5rem", fontSize: "1.6rem", fontWeight: 700 }}>
              Where Aggies meet industry.
            </h2>
            <p style={{ marginTop: "0.75rem", fontSize: "0.95rem", maxWidth: 340 }}>
              Manage case competitions, mentoring, and recruiting in a single,
              student‑friendly experience.
            </p>
          </div>
          <div style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            Powered by MIS students · CMIS • Texas A&amp;M University.
          </div>
        </aside>
      </div>
    </div>
  );
}
