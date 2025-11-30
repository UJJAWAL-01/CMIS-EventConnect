export default function InstructorDashboard() {
  // TODO: Fetch from backend /api/instructor/dashboard
  const instructorData = {
    name: "Dr. Robert Wilson",
    totalClasses: 3,
    totalStudents: 87,
    upcomingAssignments: 12,
    avgStudentGrade: 8.4,
    classes: [
      { id: 1, code: "ISTM 622", name: "Case Competition Workshop", students: 24, section: "501", avg: 8.7 },
      { id: 2, code: "ISTM 451", name: "MIS Systems Analysis", students: 32, section: "502", avg: 8.2 },
      { id: 3, code: "ISTM 303", name: "Business Data Analytics", students: 31, section: "503", avg: 8.5 }
    ],
    recentSubmissions: [
      { id: 1, studentName: "Alex Johnson", assignment: "Case Analysis Report", class: "ISTM 622", date: "Nov 29", status: "submitted" },
      { id: 2, studentName: "Maria Chen", assignment: "Data Project", class: "ISTM 451", date: "Nov 28", status: "needs-review" },
      { id: 3, studentName: "Jordan Smith", assignment: "Business Plan", class: "ISTM 622", date: "Nov 27", status: "submitted" }
    ],
    upcomingEvents: [
      { id: 1, date: "Dec 5, 2025", event: "Case Competition 2025", role: "Coordinator" },
      { id: 2, date: "Dec 10, 2025", event: "Career Fair", role: "Faculty Advisor" }
    ]
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          Welcome, {instructorData.name.split(" ")[1]} 👨‍🏫
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Manage your classes, students, and academic activities
        </p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{instructorData.totalClasses}</div>
            <div className="stat-card-label">My Classes</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              Total active classes
            </div>
          </div>
          <div className="stat-card-icon">📚</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{instructorData.totalStudents}</div>
            <div className="stat-card-label">Total Students</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              Across all sections
            </div>
          </div>
          <div className="stat-card-icon">👥</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{instructorData.upcomingAssignments}</div>
            <div className="stat-card-label">Pending Submissions</div>
            <div style={{ marginTop: "0.75rem" }}>
              <span className="badge badge-warning">Review Needed</span>
            </div>
          </div>
          <div className="stat-card-icon">📋</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{instructorData.avgStudentGrade.toFixed(1)}</div>
            <div className="stat-card-label">Average Grade</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-success)" }}>
              Out of 10.0
            </div>
          </div>
          <div className="stat-card-icon">⭐</div>
        </div>
      </div>

      {/* Classes Overview */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>📚 My Classes</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "linear-gradient(90deg, var(--color-maroon) 0%, #7a1d1d 100%)", color: "white" }}>
                <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Course Code</th>
                <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Course Name</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Students</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Section</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Avg Grade</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {instructorData.classes.map((cls, idx) => (
                <tr key={cls.id} style={{ borderBottom: "1px solid var(--color-border)", background: idx % 2 === 0 ? "transparent" : "var(--color-bg-secondary)" }}>
                  <td style={{ padding: "1rem", fontWeight: 600, color: "var(--color-maroon)" }}>{cls.code}</td>
                  <td style={{ padding: "1rem", fontWeight: 500 }}>{cls.name}</td>
                  <td style={{ padding: "1rem", textAlign: "center", color: "var(--color-text-secondary)" }}>{cls.students}</td>
                  <td style={{ padding: "1rem", textAlign: "center", color: "var(--color-text-secondary)" }}>{cls.section}</td>
                  <td style={{ padding: "1rem", textAlign: "center", fontWeight: 600, color: "var(--color-success)" }}>{cls.avg.toFixed(1)}</td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <button className="tertiary-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", marginTop: 0 }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        {/* Recent Submissions */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>📤 Recent Submissions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {instructorData.recentSubmissions.map(submission => (
              <div key={submission.id} style={{ padding: "0.875rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem", borderLeft: "3px solid var(--color-maroon)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{submission.studentName}</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{submission.assignment}</div>
                  </div>
                  <span className={`badge badge-${submission.status === 'needs-review' ? 'warning' : 'success'}`}>
                    {submission.status === 'needs-review' ? 'Review' : 'Submitted'}
                  </span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                  {submission.class} • {submission.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>📅 Upcoming Events</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {instructorData.upcomingEvents.map(event => (
              <div key={event.id} style={{ padding: "0.875rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem", borderLeft: "3px solid var(--color-info)" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{event.event}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                  {event.date}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-info)", fontWeight: 500 }}>
                  Role: {event.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>⚡ Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          <button className="secondary-btn" style={{ width: "100%", marginTop: 0 }}>
            📝 Create Assignment
          </button>
          <button className="secondary-btn" style={{ width: "100%", marginTop: 0 }}>
            📊 View Grades
          </button>
          <button className="secondary-btn" style={{ width: "100%", marginTop: 0 }}>
            👥 Student Roster
          </button>
          <button className="secondary-btn" style={{ width: "100%", marginTop: 0 }}>
            📧 Message Class
          </button>
        </div>
      </div>
    </div>
  );
}
