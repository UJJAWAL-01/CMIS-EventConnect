import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ROLES = ["Student", "Judge", "Instructor", "Admin"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [extraFields, setExtraFields] = useState({
    studentId: "",
    organization: "",
    title: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      fullName,
      email,
      password,
      role,
      ...extraFields,
    };

    // TODO: POST to /auth/register in your backend, then redirect to login or dashboard.
    console.log("REGISTER", payload);

    navigate("/login");
  };

  const handleExtraChange = (field, value) => {
    setExtraFields((prev) => ({ ...prev, [field]: value }));
  };

  const isStudent = role === "Student";
  const isJudge = role === "Judge";
  const isInstructor = role === "Instructor";
  const isAdmin = role === "Admin";

  return (
    <div className="auth-shell">
      <div className="auth-card">
        {/* Left: form */}
        <section className="auth-main">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 className="auth-title">Create your CMIS account</h1>
            <p className="auth-subtitle">
              Register as a student, judge, instructor, or admin with role‑based
              access.
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="First Last"
              />
            </div>

            <div className="field">
              <label>Texas A&amp;M Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="netid@tamu.edu"
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

            {/* Role‑specific fields */}
            {isStudent && (
              <div className="field">
                <label>Student UIN / ID</label>
                <input
                  type="text"
                  value={extraFields.studentId}
                  onChange={(e) => handleExtraChange("studentId", e.target.value)}
                  placeholder="Optional campus ID"
                />
              </div>
            )}

            {(isJudge || isInstructor || isAdmin) && (
              <>
                <div className="field">
                  <label>Organization / Company</label>
                  <input
                    type="text"
                    value={extraFields.organization}
                    onChange={(e) =>
                      handleExtraChange("organization", e.target.value)
                    }
                    placeholder="Company / Department"
                  />
                </div>

                <div className="field">
                  <label>Title / Role</label>
                  <input
                    type="text"
                    value={extraFields.title}
                    onChange={(e) => handleExtraChange("title", e.target.value)}
                    placeholder="e.g., Judge, Faculty, Program Coordinator"
                  />
                </div>
              </>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(0,1fr))",
                gap: "0.75rem",
                marginTop: "0.75rem",
              }}
            >
              <div className="field" style={{ marginTop: 0 }}>
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                />
              </div>

              <div className="field" style={{ marginTop: 0 }}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re‑enter password"
                />
              </div>
            </div>

            <button className="primary-btn" type="submit">
              Create account
            </button>
          </form>

          <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
            Already registered?{" "}
            <Link className="link-text" to="/login">
              Log in
            </Link>
          </p>
        </section>

        {/* Right: TAMU branding */}
        <aside className="auth-aside">
          <div>
            <div className="auth-tamu-badge">
              <span>ATM</span>
              <span>Center for MIS Studies</span>
            </div>
            <h2 style={{ marginTop: "1.5rem", fontSize: "1.5rem", fontWeight: 700 }}>
              Role‑aware access for CMIS.
            </h2>
            <p style={{ marginTop: "0.75rem", fontSize: "0.95rem", maxWidth: 360 }}>
              Students manage profiles and resumes, judges evaluate teams,
              instructors coordinate courses, and admins see the full picture.
            </p>
          </div>
          <div style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            Secure role‑based access will later be enforced via your Node API and
            MongoDB user records.
          </div>
        </aside>
      </div>
    </div>
  );
}
