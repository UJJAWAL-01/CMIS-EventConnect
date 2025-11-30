import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage({ onLogin }) {
    const ROLES = ["Student", "Judge", "Instructor", "Admin"];
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  // Email validation for organizational members
  const validateEmailDomain = (emailValue, selectedRole) => {
    const tamuPattern = /@tamu\.edu$/;
    if (["Student", "Instructor", "Admin"].includes(selectedRole)) {
      return tamuPattern.test(emailValue);
    }
    return true; // Judges don't need @tamu.edu
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsValidating(true);

    // Validation
    if (!email || !password) {
      setError("Please enter email and password.");
      setIsValidating(false);
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setIsValidating(false);
      return;
    }

    // Domain validation for organization members
    if (!validateEmailDomain(email, role)) {
      setError(`${role}s must use a valid Texas A&M email (@tamu.edu).`);
      setIsValidating(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("LOGIN", { email, role, timestamp: new Date().toISOString() });
    
    if (onLogin) {
  onLogin(role.toLowerCase());
}
    setIsValidating(false);
  };

  const getEmailPlaceholder = () => {
    if (["Student", "Instructor", "Admin"].includes(role)) {
      return "netid@tamu.edu";
    }
    return "judge@example.com";
  };

  const getEmailHint = () => {
    if (["Student", "Instructor", "Admin"].includes(role)) {
      return "Must be a valid Texas A&M email";
    }
    return "Any email address";
  };

  const isEmailValid = email && validateEmailDomain(email, role);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        background: "white",
        borderRadius: "1rem",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
          padding: "2.5rem 2rem",
          color: "white",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.75rem" }}>🎓</div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            margin: "0 0 0.5rem 0",
            letterSpacing: "-0.5px"
          }}>CMIS EventConnect</h1>
          <p style={{
            fontSize: "0.9rem",
            opacity: 0.9,
            margin: 0,
            fontWeight: 500
          }}>Texas A&M's Premier Event Platform</p>
        </div>

        {/* Form Container */}
        <div style={{ padding: "2rem" }}>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "var(--color-text)"
          }}>Login</h2>
          <p style={{
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1.75rem"
          }}>Sign in to your account to continue</p>

          {/* Error Alert */}
          {error && (
            <div style={{
              padding: "0.875rem",
              background: "#fee",
              border: "1px solid #fcc",
              borderRadius: "0.5rem",
              color: "var(--color-error)",
              fontSize: "0.875rem",
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
              marginBottom: "1.5rem"
            }}>
              <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Role Selection */}
            <div>
              <label style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "var(--color-text)",
                fontSize: "0.9375rem"
              }}>Select Your Role</label>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem"
              }}>
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    disabled={isValidating}
                    style={{
                      padding: "0.875rem",
                      border: role === r ? "2px solid var(--color-maroon)" : "2px solid #e5e7eb",
                      background: role === r ? "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)" : "white",
                      color: role === r ? "white" : "var(--color-text)",
                      borderRadius: "0.625rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: isValidating ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      opacity: isValidating ? 0.7 : 1
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--color-text)",
                fontSize: "0.9375rem"
              }}>Email Address</label>
              <input
                type="email"
                placeholder={getEmailPlaceholder()}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                disabled={isValidating}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: isEmailValid ? "2px solid var(--color-success)" : "2px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  background: isEmailValid ? "rgba(16, 185, 129, 0.02)" : "white",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
              />
              <small style={{
                display: "block",
                color: "var(--color-text-secondary)",
                marginTop: "0.375rem",
                fontSize: "0.8125rem"
              }}>
                {getEmailHint()}
              </small>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--color-text)",
                fontSize: "0.9375rem"
              }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={isValidating}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  transition: "border 0.2s ease",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isValidating || !email || !password || !isEmailValid}
              style={{
                padding: "0.9375rem",
                background: isValidating || !email || !password || !isEmailValid 
                  ? "#d1d5db" 
                  : "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
                color: "white",
                border: "none",
                borderRadius: "0.625rem",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: isValidating || !email || !password || !isEmailValid ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                marginTop: "0.5rem"
              }}
            >
              {isValidating ? "🔐 Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            marginTop: "1.75rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid #e5e7eb",
            textAlign: "center"
          }}>
            <p style={{
              margin: "0.5rem 0",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)"
            }}>
              Don't have an account?{" "}
              <Link to="/register" style={{
                color: "var(--color-maroon)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid var(--color-maroon)"
              }}>
                Create one
              </Link>
            </p>
            <p style={{
              margin: "0.75rem 0 0 0",
              fontSize: "0.8125rem"
            }}>
              <a href="#" style={{
                color: "var(--color-maroon)",
                textDecoration: "none"
              }}>
                Forgot your password?
              </a>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div style={{
          background: "#f9fafb",
          padding: "1rem 2rem",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.8125rem",
          color: "var(--color-text-secondary)"
        }}>
          <span>🔒</span>
          <span>Your data is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
}

