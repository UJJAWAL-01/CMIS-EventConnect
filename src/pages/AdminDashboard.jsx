export default function AdminDashboard() {
  // TODO: Fetch from backend /api/admin/dashboard
  const adminData = {
    name: "System Administrator",
    activeUsers: 342,
    registeredEvents: 28,
    caseCompetitions: 5,
    systemHealth: 98.5,
    metrics: [
      { id: 1, label: "Active Users", value: 342, icon: "👥", trend: "+12%" },
      { id: 2, label: "Registered Events", value: 28, icon: "📅", trend: "+5%" },
      { id: 3, label: "Case Competitions", value: 5, icon: "🏆", trend: "Active" },
      { id: 4, label: "System Health", value: "98.5%", icon: "⚙️", trend: "Excellent" }
    ],
    recentActivity: [
      { id: 1, timestamp: "2025-11-30 14:32", user: "Sarah Martinez", action: "Registered for Case Competition 2025", type: "registration" },
      { id: 2, timestamp: "2025-11-30 13:15", user: "Dr. David Gomillion", action: "Updated competition rubric", type: "update" },
      { id: 3, timestamp: "2025-11-30 12:45", user: "James Chen", action: "Uploaded resume", type: "upload" },
      { id: 4, timestamp: "2025-11-30 11:20", user: "Lisa Hernandez (Exabyte)", action: "Accessed student resumes", type: "access" }
    ],
    recentUsers: [
      { id: 1, name: "Alex Johnson", role: "Student", email: "alex.j@tamu.edu", status: "active", joined: "Nov 15" },
      { id: 2, name: "Dr. David Gomillion", role: "Instructor", email: "dgomillion@tamu.edu", status: "active", joined: "Sep 1" },
      { id: 3, name: "John Smith", role: "Judge", email: "jsmith@exabyte.com", status: "active", joined: "Oct 20" },
      { id: 4, name: "Maria Rodriguez", role: "Student", email: "maria.r@tamu.edu", status: "inactive", joined: "Nov 1" }
    ]
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          System Dashboard
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Platform overview, user management, and analytics
        </p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {adminData.metrics.map(metric => (
          <div key={metric.id} className="stat-card">
            <div className="stat-card-content">
              <div className="stat-card-value">{metric.value}</div>
              <div className="stat-card-label">{metric.label}</div>
              <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-success)", fontWeight: 600 }}>
                {metric.trend}
              </div>
            </div>
            <div className="stat-card-icon">{metric.icon}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>📊 Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {adminData.recentActivity.map(activity => (
              <div key={activity.id} style={{ padding: "0.875rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem", borderLeft: "3px solid var(--color-maroon)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{activity.user}</div>
                  <span className="badge badge-info">{activity.type}</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                  {activity.action}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>⚡ Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button className="primary-btn" style={{ width: "100%", marginTop: 0, justifyContent: "center" }}>
              👤 Add User
            </button>
            <button className="secondary-btn" style={{ width: "100%", marginTop: 0, justifyContent: "center" }}>
              📈 Generate Report
            </button>
            <button className="secondary-btn" style={{ width: "100%", marginTop: 0, justifyContent: "center" }}>
              🔐 Manage Permissions
            </button>
            <button className="secondary-btn" style={{ width: "100%", marginTop: 0, justifyContent: "center" }}>
              ⚙️ System Settings
            </button>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>👥 User Management</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "linear-gradient(90deg, var(--color-maroon) 0%, #7a1d1d 100%)", color: "white" }}>
                <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Name</th>
                <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Email</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Role</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Joined</th>
                <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.recentUsers.map((user, idx) => (
                <tr key={user.id} style={{ borderBottom: "1px solid var(--color-border)", background: idx % 2 === 0 ? "transparent" : "var(--color-bg-secondary)" }}>
                  <td style={{ padding: "1rem", fontWeight: 500 }}>{user.name}</td>
                  <td style={{ padding: "1rem", color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>{user.email}</td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <span className="badge badge-primary">{user.role}</span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <span className={`badge badge-${user.status === 'active' ? 'success' : 'warning'}`}>
                      {user.status === 'active' ? '✓ Active' : '⏸ Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    {user.joined}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <button className="tertiary-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", marginTop: 0 }}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>🔧 System Status</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem" }}>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", fontWeight: 600 }}>
              API Status
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "0.75rem", height: "0.75rem", background: "var(--color-success)", borderRadius: "50%" }}></span>
              <span style={{ fontWeight: 500, color: "var(--color-success)" }}>Operational</span>
            </div>
          </div>

          <div style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem" }}>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", fontWeight: 600 }}>
              Database Status
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "0.75rem", height: "0.75rem", background: "var(--color-success)", borderRadius: "50%" }}></span>
              <span style={{ fontWeight: 500, color: "var(--color-success)" }}>Connected</span>
            </div>
          </div>

          <div style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem" }}>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", fontWeight: 600 }}>
              Uptime
            </div>
            <div style={{ fontWeight: 600, color: "var(--color-maroon)", fontSize: "1.125rem" }}>
              99.8%
            </div>
          </div>

          <div style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem" }}>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", fontWeight: 600 }}>
              Last Backup
            </div>
            <div style={{ fontWeight: 500, color: "var(--color-text-secondary)" }}>
              2 hours ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
