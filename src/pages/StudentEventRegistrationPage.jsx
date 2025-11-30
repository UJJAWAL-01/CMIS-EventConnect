import { useState } from "react";
import { useParams } from "react-router-dom";

export default function StudentEventRegistrationPage() {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState("register"); // register, submission, feedback
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState(["", "", ""]);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedJudge, setAssignedJudge] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // TODO: Fetch from backend /api/events/:eventId
  const eventData = {
    id: 1,
    title: "Case Competition 2025 - Market Entry Strategy",
    date: "Dec 5, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Evans Library Room 210",
    description: "Students compete to develop market entry strategies for a real company",
    deadline: "Dec 3, 2025",
    maxTeamSize: 4,
    status: "active"
  };

  // TODO: Fetch from backend /api/event-registrations/:eventId for current student
  const mockFeedback = {
    score: 85,
    rubric: {
      strategy: { score: 8, max: 10 },
      analysis: { score: 8, max: 10 },
      presentation: { score: 9, max: 10 },
      teamwork: { score: 7, max: 10 }
    },
    feedback: "Great market analysis and clear presentation. Could improve team coordination.",
    judge: "Dr. Sarah Chen"
  };

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    if (!teamName || teamMembers.some(m => !m.trim())) {
      alert("Please fill in all team member names");
      return;
    }

    // TODO: POST to /api/event-registrations with { eventId, teamName, teamMembers }
    console.log("Registering team:", { eventId, teamName, teamMembers });
    setIsRegistered(true);
    alert("Team registered successfully! A judge will be assigned shortly.");
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!submissionFile) {
      alert("Please select a file to submit");
      return;
    }

    // TODO: POST to /api/submissions with FormData { eventId, file, teamId }
    console.log("Submitting:", { eventId, file: submissionFile.name });
    setIsSubmitted(true);
    setAssignedJudge({ name: "Dr. Sarah Chen", email: "sarah.chen@tamu.edu" });
    alert("Submission received! Your assigned judge will review it.");
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          {eventData.title}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          📅 {eventData.date} • 🕘 {eventData.time} • 📍 {eventData.location}
        </p>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "2px solid #e5e7eb" }}>
        {["register", "submission", "feedback"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "1rem 1.5rem",
              background: activeTab === tab ? "var(--color-maroon)" : "transparent",
              color: activeTab === tab ? "white" : "var(--color-text-secondary)",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              borderBottom: activeTab === tab ? "none" : "2px solid transparent",
              transition: "all 0.2s ease"
            }}
          >
            {tab === "register" && "👥 Register Team"}
            {tab === "submission" && "📤 Submit Work"}
            {tab === "feedback" && "📊 Feedback"}
          </button>
        ))}
      </div>

      {/* Register Tab */}
      {activeTab === "register" && (
        <div className="card">
          <h2>Register Your Team</h2>
          {isRegistered ? (
            <div style={{
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              borderRadius: "0.625rem",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "#15803d", margin: 0, marginBottom: "0.5rem" }}>Team Registered!</h3>
              <p style={{ color: "#166534", marginBottom: "1rem" }}>
                Your team "{teamName}" has been registered. A judge will be assigned shortly.
              </p>
              {assignedJudge && (
                <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem", marginTop: "1rem" }}>
                  <div style={{ fontSize: "0.9rem", color: "var(--color-text)" }}>
                    <strong>Assigned Judge:</strong> {assignedJudge.name}<br />
                    <strong>Email:</strong> {assignedJudge.email}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleRegisterTeam}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)" }}>
                  Team Name *
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., The Strategists"
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.625rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)" }}>
                  Team Members (up to {eventData.maxTeamSize}) *
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {teamMembers.map((member, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={member}
                      onChange={(e) => {
                        const newMembers = [...teamMembers];
                        newMembers[idx] = e.target.value;
                        setTeamMembers(newMembers);
                      }}
                      placeholder={`Member ${idx + 1} Name`}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        border: "2px solid #e5e7eb",
                        borderRadius: "0.625rem",
                        fontSize: "1rem",
                        boxSizing: "border-box",
                        fontFamily: "inherit"
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{
                background: "#fef3c7",
                border: "1px solid #fbbf24",
                borderRadius: "0.625rem",
                padding: "1rem",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
                color: "#92400e"
              }}>
                ℹ️ Registration Deadline: {eventData.deadline}
              </div>

              <button
                type="submit"
                style={{
                  padding: "0.9375rem 1.5rem",
                  background: "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.625rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Register Team
              </button>
            </form>
          )}
        </div>
      )}

      {/* Submission Tab */}
      {activeTab === "submission" && (
        <div className="card">
          <h2>Submit Your Work</h2>
          {!isRegistered ? (
            <div style={{
              background: "#fee",
              border: "1px solid #fca",
              borderRadius: "0.625rem",
              padding: "1.5rem",
              textAlign: "center",
              color: "#b91c1c"
            }}>
              ⚠️ Please register your team first before submitting work.
            </div>
          ) : isSubmitted ? (
            <div style={{
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              borderRadius: "0.625rem",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📤</div>
              <h3 style={{ color: "#15803d", margin: 0, marginBottom: "0.5rem" }}>Submission Received!</h3>
              <p style={{ color: "#166534", marginBottom: "1rem" }}>
                Your work has been submitted to {assignedJudge?.name}. They will review it and provide feedback.
              </p>
              <div style={{ fontSize: "0.9rem", color: "#166534" }}>
                Expected feedback by: Dec 5, 2025
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitAssignment}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)" }}>
                  Upload Your Submission *
                </label>
                <div style={{
                  border: "2px dashed #e5e7eb",
                  borderRadius: "0.625rem",
                  padding: "2rem",
                  textAlign: "center",
                  background: "#f9fafb",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}>
                  <input
                    type="file"
                    onChange={(e) => setSubmissionFile(e.target.files[0])}
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" style={{ cursor: "pointer", display: "block" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📄</div>
                    <div style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.25rem" }}>
                      {submissionFile ? submissionFile.name : "Click to upload or drag and drop"}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                      PDF, Word, or PowerPoint (max 50MB)
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!submissionFile}
                style={{
                  padding: "0.9375rem 1.5rem",
                  background: submissionFile ? "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)" : "#d1d5db",
                  color: "white",
                  border: "none",
                  borderRadius: "0.625rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: submissionFile ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease"
                }}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === "feedback" && (
        <div className="card">
          <h2>Judge Feedback</h2>
          {!isSubmitted ? (
            <div style={{
              background: "#fef3c7",
              border: "1px solid #fbbf24",
              borderRadius: "0.625rem",
              padding: "1.5rem",
              textAlign: "center",
              color: "#92400e"
            }}>
              ℹ️ Feedback will appear here after you submit your work.
            </div>
          ) : (
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem"
              }}>
                {Object.entries(mockFeedback.rubric).map(([criterion, score]) => (
                  <div key={criterion} style={{
                    padding: "1.5rem",
                    background: "var(--color-bg-secondary)",
                    borderRadius: "0.625rem",
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--color-maroon)",
                      marginBottom: "0.5rem"
                    }}>
                      {score.score}/{score.max}
                    </div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, textTransform: "capitalize" }}>
                      {criterion}
                    </div>
                    <div style={{
                      width: "100%",
                      height: "4px",
                      background: "#e5e7eb",
                      borderRadius: "2px",
                      marginTop: "0.5rem",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${(score.score / score.max) * 100}%`,
                        background: "linear-gradient(90deg, var(--color-maroon), #7a1d1d)"
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "var(--color-bg-secondary)",
                padding: "1.5rem",
                borderRadius: "0.625rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{ fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-text)" }}>
                  📊 Total Score: {mockFeedback.score}/40
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  background: "#e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "1rem"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${(mockFeedback.score / 40) * 100}%`,
                    background: "linear-gradient(90deg, var(--color-maroon), #7a1d1d)"
                  }} />
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  Performance: {mockFeedback.score >= 35 ? "Excellent" : mockFeedback.score >= 28 ? "Good" : "Needs Improvement"}
                </div>
              </div>

              <div style={{
                background: "#f9fafb",
                padding: "1.5rem",
                borderRadius: "0.625rem",
                borderLeft: "4px solid var(--color-maroon)",
                marginBottom: "1.5rem"
              }}>
                <div style={{ fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-text)" }}>
                  💬 Feedback from {mockFeedback.judge}
                </div>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  {mockFeedback.feedback}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
