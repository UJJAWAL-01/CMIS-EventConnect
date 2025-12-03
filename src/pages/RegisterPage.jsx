import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const ROLES = ["Student", "Judge", "Instructor", "Admin"];

// Password strength calculation
const calculatePasswordStrength = (pwd) => {
  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (pwd.length >= 12) strength++;
  if (/[a-z]/.test(pwd)) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
  return Math.min(strength, 5);
};

const getPasswordStrengthLabel = (strength) => {
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  return labels[strength] || "Unknown";
};

const getPasswordStrengthColor = (strength) => {
  const colors = ["#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e", "#16a34a"];
  return colors[strength] || "#6b7280";
};

export default function RegisterPage({ onRegister }) {
  const [role, setRole] = useState("Student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const [extraFields, setExtraFields] = useState({
    studentId: "",
    organization: "",
    title: "",
  });

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    return password ? calculatePasswordStrength(password) : -1;
  }, [password]);

  // Password requirements check
  const passwordRequirements = useMemo(() => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  }), [password]);

  // Email validation - accept any valid email
  const validateEmailDomain = (emailValue, selectedRole) => {
    return true; // Accept any valid email format
  };

  // Check if all requirements are met
  const allRequirementsMet = Object.values(passwordRequirements).every(req => req);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsValidating(true);

    // Validation
    if (!fullName || !email || !password || !confirm) {
      setError("Please fill in all required fields.");
      setIsValidating(false);
      return;
    }

    // Name validation
    if (fullName.trim().length < 3) {
      setError("Please enter your full name (at least 3 characters).");
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

    // Password strength validation
    if (passwordStrength < 2) {
      setError("Password is too weak. Please use a stronger password.");
      setIsValidating(false);
      return;
    }

    // Check all requirements
    if (!allRequirementsMet) {
      setError("Password must meet all requirements shown below.");
      setIsValidating(false);
      return;
    }

    // Passwords match
    if (password !== confirm) {
      setError("Passwords do not match.");
      setIsValidating(false);
      return;
    }

    // Role-specific field validation
    if (role === "Student" && !extraFields.studentId.trim()) {
      setError("Student ID is required for student accounts.");
      setIsValidating(false);
      return;
    }

    if (["Judge", "Instructor"].includes(role) && !extraFields.organization.trim()) {
      setError("Organization/Company is required for this role.");
      setIsValidating(false);
      return;
    }

    if (["Judge", "Instructor"].includes(role) && !extraFields.title.trim()) {
      setError("Title/Role is required for this role.");
      setIsValidating(false);
      return;
    }

    // Call backend registration API
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email.toLowerCase(),
          password,
          role: role.toLowerCase(),
          name: fullName.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(`Account created successfully! Welcome, ${fullName.split(" ")[0]}!`);
      
      // Auto-login after successful registration
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.toLowerCase(), password })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        localStorage.setItem('auth_token', loginData.token);
        if (onRegister) {
          onRegister(role);
        }
      } else {
        // Registration succeeded but login failed - user can manually login
        setTimeout(() => {
          if (onRegister) onRegister(role);
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleExtraChange = (field, value) => {
    setExtraFields((prev) => ({ ...prev, [field]: value }));
  };

  const isStudent = role === "Student";
  const isJudge = role === "Judge";
  const isInstructor = role === "Instructor";
  // const isAdmin = role === "Admin";

  const getEmailPlaceholder = () => {
    return "your.email@example.com";
  };

  const getEmailHint = () => {
    return "This will be your username for login";
  };

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
        maxWidth: "550px",
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
          <div style={{ fontSize: "3.5rem", marginBottom: "0.75rem" }}>📝</div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            margin: 0,
            marginBottom: "0.5rem"
          }}>
            Create Account
          </h1>
          <p style={{
            fontSize: "1rem",
            opacity: 0.95,
            margin: 0
          }}>
            Join CMIS EventConnect
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: "2rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {error && (
              <div style={{
                background: "#fee",
                border: "1px solid #fca",
                borderRadius: "0.625rem",
                padding: "1rem",
                display: "flex",
                gap: "0.75rem"
              }}>
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                <div>
                  <strong style={{ color: "#b91c1c" }}>Error</strong>
                  <p style={{ marginTop: "0.25rem", marginBottom: 0, fontSize: "0.9rem", color: "#7f1d1d" }}>
                    {error}
                  </p>
                </div>
              </div>
            )}

            {success && (
              <div style={{
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                borderRadius: "0.625rem",
                padding: "1rem",
                display: "flex",
                gap: "0.75rem"
              }}>
                <span style={{ fontSize: "1.2rem" }}>✅</span>
                <div>
                  <strong style={{ color: "#15803d" }}>Success!</strong>
                  <p style={{ marginTop: "0.25rem", marginBottom: 0, fontSize: "0.9rem", color: "#166534" }}>
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--color-text)",
                fontSize: "0.9375rem"
              }}>Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="First Last"
                disabled={isValidating}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: fullName && fullName.trim().length >= 3 ? "2px solid var(--color-success)" : "2px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  background: fullName && fullName.trim().length >= 3 ? "rgba(16, 185, 129, 0.02)" : "white",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
              />
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
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder={getEmailPlaceholder()}
                disabled={isValidating}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: error && email ? "2px solid #ef4444" : email && validateEmailDomain(email, role) ? "2px solid var(--color-success)" : "2px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  background: email && validateEmailDomain(email, role) ? "rgba(16, 185, 129, 0.02)" : "white",
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

            {/* Role-Specific Fields */}
            {isStudent && (
              <div>
                <label style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "var(--color-text)",
                  fontSize: "0.9375rem"
                }}>Student UIN / ID</label>
                <input
                  type="text"
                  value={extraFields.studentId}
                  onChange={(e) => {
                    handleExtraChange("studentId", e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g., 123456789"
                  disabled={isValidating}
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    border: extraFields.studentId.trim() ? "2px solid var(--color-success)" : "2px solid #e5e7eb",
                    borderRadius: "0.625rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    background: extraFields.studentId.trim() ? "rgba(16, 185, 129, 0.02)" : "white",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit"
                  }}
                />
              </div>
            )}

            {(isJudge || isInstructor) && (
              <>
                <div>
                  <label style={{
                    display: "block",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "var(--color-text)",
                    fontSize: "0.9375rem"
                  }}>Organization / Company</label>
                  <input
                    type="text"
                    value={extraFields.organization}
                    onChange={(e) => {
                      handleExtraChange("organization", e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Company / Department Name"
                    disabled={isValidating}
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      border: extraFields.organization.trim() ? "2px solid var(--color-success)" : "2px solid #e5e7eb",
                      borderRadius: "0.625rem",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                      background: extraFields.organization.trim() ? "rgba(16, 185, 129, 0.02)" : "white",
                      transition: "all 0.2s ease",
                      fontFamily: "inherit"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "var(--color-text)",
                    fontSize: "0.9375rem"
                  }}>Title / Role</label>
                  <input
                    type="text"
                    value={extraFields.title}
                    onChange={(e) => {
                      handleExtraChange("title", e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="e.g., Senior Manager, Professor"
                    disabled={isValidating}
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      border: extraFields.title.trim() ? "2px solid var(--color-success)" : "2px solid #e5e7eb",
                      borderRadius: "0.625rem",
                      fontSize: "1rem",
                      boxSizing: "border-box",
                      background: extraFields.title.trim() ? "rgba(16, 185, 129, 0.02)" : "white",
                      transition: "all 0.2s ease",
                      fontFamily: "inherit"
                    }}
                  />
                </div>
              </>
            )}

            {/* Password Field */}
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
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="••••••••"
                disabled={isValidating}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
              />
              
              {password && (
                <div style={{ marginTop: "0.75rem" }}>
                  {/* Password Strength Meter */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem"
                  }}>
                    <div style={{
                      flex: 1,
                      height: "0.5rem",
                      background: "#e5e7eb",
                      borderRadius: "9999px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${((passwordStrength + 1) / 6) * 100}%`,
                        background: getPasswordStrengthColor(passwordStrength),
                        transition: "width 0.3s ease"
                      }} />
                    </div>
                    <span style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: getPasswordStrengthColor(passwordStrength),
                      minWidth: "80px"
                    }}>
                      {getPasswordStrengthLabel(passwordStrength)}
                    </span>
                  </div>

                  {/* Requirements Checklist */}
                  <div style={{
                    background: "#f9fafb",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.8125rem"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem"
                    }}>
                      <span style={{ color: passwordRequirements.length ? "#10b981" : "#d1d5db" }}>
                        {passwordRequirements.length ? "✓" : "○"}
                      </span>
                      <span>At least 8 characters</span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem"
                    }}>
                      <span style={{ color: passwordRequirements.uppercase ? "#10b981" : "#d1d5db" }}>
                        {passwordRequirements.uppercase ? "✓" : "○"}
                      </span>
                      <span>Uppercase letter (A-Z)</span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem"
                    }}>
                      <span style={{ color: passwordRequirements.lowercase ? "#10b981" : "#d1d5db" }}>
                        {passwordRequirements.lowercase ? "✓" : "○"}
                      </span>
                      <span>Lowercase letter (a-z)</span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem"
                    }}>
                      <span style={{ color: passwordRequirements.number ? "#10b981" : "#d1d5db" }}>
                        {passwordRequirements.number ? "✓" : "○"}
                      </span>
                      <span>Number (0-9)</span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <span style={{ color: passwordRequirements.special ? "#10b981" : "#d1d5db" }}>
                        {passwordRequirements.special ? "✓" : "○"}
                      </span>
                      <span>Special character (!@#$)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--color-text)",
                fontSize: "0.9375rem"
              }}>Confirm Password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  if (error) setError("");
                }}
                placeholder="••••••••"
                disabled={isValidating}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: confirm && password === confirm ? "2px solid var(--color-success)" : confirm && password !== confirm ? "2px solid #ef4444" : "2px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  background: confirm && password === confirm ? "rgba(16, 185, 129, 0.02)" : "white",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
              />
              {confirm && password !== confirm && (
                <small style={{ color: "#ef4444", fontSize: "0.8125rem", display: "block", marginTop: "0.375rem" }}>
                  Passwords do not match
                </small>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isValidating || !fullName || !email || !password || !allRequirementsMet || !confirm}
              style={{
                padding: "0.9375rem",
                background: isValidating || !fullName || !email || !password || !allRequirementsMet || !confirm 
                  ? "#d1d5db" 
                  : "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
                color: "white",
                border: "none",
                borderRadius: "0.625rem",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: isValidating || !fullName || !email || !password || !allRequirementsMet || !confirm ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                marginTop: "0.5rem"
              }}
            >
              {isValidating ? "🔐 Creating Account..." : "Create Account"}
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
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)"
            }}>
              Already have an account?{" "}
              <Link to="/login" style={{
                color: "var(--color-maroon)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid var(--color-maroon)"
              }}>
                Sign in
              </Link>
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
          <span>Your password is hashed and encrypted</span>
        </div>
      </div>
    </div>
  );
}
