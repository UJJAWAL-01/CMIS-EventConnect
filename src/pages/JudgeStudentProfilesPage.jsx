import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JudgeStudentProfilesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("");

  // TODO: Fetch from backend /api/students (filtered by assigned judge)
  const mockStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@tamu.edu",
      uinr: "427001234",
      teamName: "The Strategists",
      eventId: 1,
      eventName: "Case Competition 2025",
      registrationDate: "Nov 28, 2025",
      submissionStatus: "submitted",
      score: null,
      status: "pending_feedback"
    },
    {
      id: 2,
      name: "Jordan Smith",
      email: "jordan.s@tamu.edu",
      uinr: "427005678",
      teamName: "Market Mavens",
      eventId: 1,
      eventName: "Case Competition 2025",
      registrationDate: "Nov 27, 2025",
      submissionStatus: "submitted",
      score: 85,
      status: "feedback_given"
    },
    {
      id: 3,
      name: "Casey Brown",
      email: "casey.b@tamu.edu",
      uinr: "427009012",
      teamName: "Innovation Lab",
      eventId: 2,
      eventName: "Business Plan Competition",
      registrationDate: "Nov 25, 2025",
      submissionStatus: "not_submitted",
      score: null,
      status: "registered"
    }
  ];

  const events = [...new Set(mockStudents.map(s => ({ id: s.eventId, name: s.eventName })))];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterEvent || student.eventId === parseInt(filterEvent);
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending_feedback: { bg: "#fef3c7", color: "#92400e", text: "Pending Feedback" },
      feedback_given: { bg: "#ecfdf5", color: "#15803d", text: "Feedback Given" },
      registered: { bg: "#dbeafe", color: "#1e40af", text: "Registered" }
    };
    const style = styles[status] || styles.registered;
    return <span style={{ background: style.bg, color: style.color, padding: "0.375rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.8rem", fontWeight: 600 }}>{style.text}</span>;
  };

  const getSubmissionBadge = (status) => {
    return status === "submitted" 
      ? <span style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: 600 }}>✓ Submitted</span>
      : <span style={{ color: "#ef4444", fontSize: "0.9rem", fontWeight: 600 }}>○ Pending</span>;
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          Student Profiles
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Review your assigned students' details and manage scoring
        </p>
      </header>

      {/* Search & Filter */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)", fontSize: "0.875rem" }}>
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name, email, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e5e7eb",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              boxSizing: "border-box"
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)", fontSize: "0.875rem" }}>
            Filter by Event
          </label>
          <select
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e5e7eb",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              boxSizing: "border-box"
            }}
          >
            <option value="">All Events</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {filteredStudents.map(student => (
          <div key={student.id} className="card" style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ margin: 0, marginBottom: "0.25rem", fontSize: "1.125rem", fontWeight: 700 }}>
                  {student.name}
                </h3>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
                  {student.email}
                </p>
              </div>
              {getStatusBadge(student.status)}
            </div>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb", marginBottom: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.875rem" }}>
                <div>
                  <div style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>UINR</div>
                  <div style={{ fontWeight: 600 }}>{student.uinr}</div>
                </div>
                <div>
                  <div style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>Team</div>
                  <div style={{ fontWeight: 600 }}>{student.teamName}</div>
                </div>
                <div>
                  <div style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>Event</div>
                  <div style={{ fontWeight: 600 }}>{student.eventName}</div>
                </div>
                <div>
                  <div style={{ color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>Registered</div>
                  <div style={{ fontWeight: 600 }}>{student.registrationDate}</div>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)" }}>Submission</span>
                {getSubmissionBadge(student.submissionStatus)}
              </div>
              {student.score !== null && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)" }}>Score</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-maroon)" }}>{student.score}/40</span>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate(`/judge/score/${student.id}`, { state: { student } })}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {student.status === "feedback_given" ? "View Feedback" : "Score & Feedback"}
            </button>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "3rem 1rem",
          background: "var(--color-bg-secondary)",
          borderRadius: "0.625rem",
          color: "var(--color-text-secondary)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📭</div>
          <p>No students found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
