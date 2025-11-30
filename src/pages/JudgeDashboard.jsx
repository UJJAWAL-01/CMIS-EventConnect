export default function JudgeDashboard() {
  // TODO: Fetch from backend /api/judge/assignments
  const judgeData = {
    name: "Sarah Martinez",
    totalCases: 12,
    completedScoring: 8,
    pendingReview: 4,
    averageScore: 8.2,
    assignments: [
      { id: 1, caseTitle: "Supply Chain Optimization", teams: 5, scored: 5, status: "completed" },
      { id: 2, caseTitle: "Digital Transformation", teams: 6, scored: 3, status: "in-progress" },
      { id: 3, caseTitle: "Sustainability Initiative", teams: 4, scored: 0, status: "pending" }
    ],
    recentScores: [
      { id: 1, teamName: "Team Alpha", case: "Supply Chain", score: 8.5, date: "Nov 29" },
      { id: 2, teamName: "Team Beta", case: "Digital Trans", score: 7.9, date: "Nov 28" }
    ]
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          Judging Dashboard
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Manage case competitions and team scoring
        </p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{judgeData.totalCases}</div>
            <div className="stat-card-label">Total Cases Assigned</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              Across all competitions
            </div>
          </div>
          <div className="stat-card-icon">📋</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{judgeData.completedScoring}</div>
            <div className="stat-card-label">Completed Scoring</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-success)", fontWeight: 600 }}>
              {Math.round((judgeData.completedScoring / judgeData.totalCases) * 100)}% Complete
            </div>
          </div>
          <div className="stat-card-icon">✅</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{judgeData.pendingReview}</div>
            <div className="stat-card-label">Pending Review</div>
            <div style={{ marginTop: "0.75rem" }}>
              <span className="badge badge-warning">Action Required</span>
            </div>
          </div>
          <div className="stat-card-icon">⏳</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{judgeData.averageScore.toFixed(1)}</div>
            <div className="stat-card-label">Average Team Score</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-info)" }}>
              Out of 10.0
            </div>
          </div>
          <div className="stat-card-icon">⭐</div>
        </div>
      </div>

      {/* Case Assignments */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>📁 Case Assignments</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "linear-gradient(90deg, var(--color-maroon) 0%, #7a1d1d 100%)", color: "white" }}>
                <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Case Title</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Teams</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Scored</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {judgeData.assignments.map((assignment, idx) => (
                <tr key={assignment.id} style={{ borderBottom: "1px solid var(--color-border)", background: idx % 2 === 0 ? "transparent" : "var(--color-bg-secondary)" }}>
                  <td style={{ padding: "1rem", fontWeight: 500 }}>{assignment.caseTitle}</td>
                  <td style={{ padding: "1rem", textAlign: "center", color: "var(--color-text-secondary)" }}>{assignment.teams}</td>
                  <td style={{ padding: "1rem", textAlign: "center", color: "var(--color-text-secondary)" }}>{assignment.scored}/{assignment.teams}</td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <span className={`badge badge-${assignment.status === 'completed' ? 'success' : assignment.status === 'in-progress' ? 'info' : 'warning'}`}>
                      {assignment.status === 'completed' ? '✓ Completed' : assignment.status === 'in-progress' ? '⏳ In Progress' : '⏰ Pending'}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <button className="tertiary-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", marginTop: 0 }}>
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Scores */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>🎯 Recent Scores</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {judgeData.recentScores.map(score => (
            <div key={score.id} style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem", borderLeft: "3px solid var(--color-maroon)" }}>
              <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{score.teamName}</div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                {score.case}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-maroon)" }}>{score.score}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{score.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
