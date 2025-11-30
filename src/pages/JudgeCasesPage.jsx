import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JudgeCasesPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("");

  // TODO: Fetch from backend /api/cases (assigned to judge)
  const mockCases = [
    {
      id: 1,
      title: "Case Competition 2025 - Market Entry Strategy",
      company: "TechCorp Inc.",
      date: "Dec 5, 2025",
      status: "active",
      teamsAssigned: 12,
      teamsSubmitted: 8,
      teamsScored: 3,
      description: "Students compete to develop market entry strategies for a real company"
    },
    {
      id: 2,
      title: "Business Plan Competition",
      company: "StartUp Accelerator",
      date: "Dec 12, 2025",
      status: "upcoming",
      teamsAssigned: 8,
      teamsSubmitted: 0,
      teamsScored: 0,
      description: "Create a comprehensive business plan for a new venture"
    },
    {
      id: 3,
      title: "Fall Consulting Challenge",
      company: "Global Consulting Group",
      date: "Nov 15, 2025",
      status: "completed",
      teamsAssigned: 10,
      teamsSubmitted: 10,
      teamsScored: 10,
      description: "Analyze a complex business problem and present solutions"
    }
  ];

  const statuses = ["active", "upcoming", "completed"];
  
  const filteredCases = mockCases.filter(c => !filterStatus || c.status === filterStatus);

  const getStatusBadge = (status) => {
    const styles = {
      active: { bg: "#ecfdf5", color: "#15803d", text: "🟢 Active" },
      upcoming: { bg: "#fef3c7", color: "#92400e", text: "🔵 Upcoming" },
      completed: { bg: "#f3f4f6", color: "#6b7280", text: "⚫ Completed" }
    };
    const style = styles[status] || styles.upcoming;
    return <span style={{ background: style.bg, color: style.color, padding: "0.375rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.8rem", fontWeight: 600 }}>{style.text}</span>;
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          Case Competitions
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Manage and score assigned cases
        </p>
      </header>

      {/* Filter */}
      <div style={{ marginBottom: "2rem" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-text)" }}>
          Filter by Status
        </label>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setFilterStatus("")}
            style={{
              padding: "0.625rem 1.25rem",
              background: !filterStatus ? "var(--color-maroon)" : "white",
              color: !filterStatus ? "white" : "var(--color-text)",
              border: "2px solid #e5e7eb",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            All
          </button>
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: "0.625rem 1.25rem",
                background: filterStatus === status ? "var(--color-maroon)" : "white",
                color: filterStatus === status ? "white" : "var(--color-text)",
                border: "2px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                textTransform: "capitalize"
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {filteredCases.map(caseItem => (
          <div key={caseItem.id} className="card" style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ margin: 0, marginBottom: "0.25rem", fontSize: "1.125rem", fontWeight: 700 }}>
                  {caseItem.title}
                </h3>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
                  {caseItem.company}
                </p>
              </div>
              {getStatusBadge(caseItem.status)}
            </div>

            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "1rem", lineHeight: 1.5 }}>
              {caseItem.description}
            </p>

            <div style={{
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
              marginBottom: "1rem"
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                <div style={{ textAlign: "center", padding: "0.75rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-maroon)" }}>
                    {caseItem.teamsAssigned}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 600, marginTop: "0.25rem" }}>
                    Teams
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "0.75rem", background: "#fef3c7", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#92400e" }}>
                    {caseItem.teamsSubmitted}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#92400e", fontWeight: 600, marginTop: "0.25rem" }}>
                    Submitted
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "0.75rem", background: "#ecfdf5", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#15803d" }}>
                    {caseItem.teamsScored}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 600, marginTop: "0.25rem" }}>
                    Scored
                  </div>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb", marginBottom: "1rem", fontSize: "0.875rem" }}>
              <div style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                📅 {caseItem.date}
              </div>
              <div style={{
                width: "100%",
                height: "6px",
                background: "#e5e7eb",
                borderRadius: "3px",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${(caseItem.teamsScored / caseItem.teamsAssigned) * 100}%`,
                  background: "linear-gradient(90deg, var(--color-maroon), #7a1d1d)"
                }} />
              </div>
              <div style={{ marginTop: "0.5rem", color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                Progress: {caseItem.teamsScored} of {caseItem.teamsAssigned} teams scored
              </div>
            </div>

            <button
              onClick={() => navigate(`/judge/students`, { state: { caseId: caseItem.id } })}
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
              View Teams →
            </button>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "3rem 1rem",
          background: "var(--color-bg-secondary)",
          borderRadius: "0.625rem",
          color: "var(--color-text-secondary)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📭</div>
          <p>No cases found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
