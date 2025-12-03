import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // Get user name from JWT
  const userName = useMemo(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return 'Student';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.name || payload?.username?.split('@')[0] || 'Student';
    } catch (e) {
      return 'Student';
    }
  }, []);

  // TODO: Fetch from backend /api/student/summary
  const studentData = {
    name: userName,
    profileCompletion: 70,
    resumeCount: 2,
    applications: {
      applied: 3,
      interviewing: 1,
      offer: 0,
      rejected: 1,
    },
    upcomingEvents: [
      { id: 1, title: "Case Competition 2025", date: "Dec 5", time: "9:00 AM" },
      { id: 2, title: "Networking Mixer", date: "Dec 10", time: "6:00 PM" }
    ],
    recentActivity: [
      { id: 1, action: "Submitted application to Exabyte", date: "Nov 28" },
      { id: 2, action: "Updated profile", date: "Nov 25" }
    ]
  };

  const getProfileBadge = (completion) => {
    if (completion >= 90) return "Almost Complete!";
    if (completion >= 75) return "Well Done";
    if (completion >= 50) return "Good Progress";
    return "Get Started";
  };

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          Welcome back, {studentData.name.split(" ")[0]}! 👋
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Here's your career progress and upcoming opportunities
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        {/* Profile Completion Card */}
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{studentData.profileCompletion}%</div>
            <div className="stat-card-label">Profile Completion</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-success)", fontWeight: 600 }}>
              {getProfileBadge(studentData.profileCompletion)}
            </div>
          </div>
          <div className="stat-card-icon">📋</div>
        </div>

        {/* Resume Versions Card */}
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{studentData.resumeCount}</div>
            <div className="stat-card-label">Resume Versions</div>
            <div style={{ marginTop: "0.75rem" }}>
              <span className="badge badge-primary">Active</span>
            </div>
          </div>
          <div className="stat-card-icon">📄</div>
        </div>

        {/* Applications Card */}
        <div className="stat-card">
          <div className="stat-card-content">
            <div className="stat-card-value">{studentData.applications.applied + studentData.applications.interviewing}</div>
            <div className="stat-card-label">Active Applications</div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              {studentData.applications.interviewing} in interviews
            </div>
          </div>
          <div className="stat-card-icon">✉️</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        {/* Application Status */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Application Status</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-maroon)", marginBottom: "0.25rem" }}>
                {studentData.applications.applied}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>Applied</div>
            </div>
            <div style={{ padding: "1rem", background: "var(--color-info-light)", borderRadius: "0.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-info)", marginBottom: "0.25rem" }}>
                {studentData.applications.interviewing}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-info)", fontWeight: 500 }}>Interviewing</div>
            </div>
            <div style={{ padding: "1rem", background: "var(--color-success-light)", borderRadius: "0.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-success)", marginBottom: "0.25rem" }}>
                {studentData.applications.offer}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-success)", fontWeight: 500 }}>Offers</div>
            </div>
            <div style={{ padding: "1rem", background: "var(--color-error-light)", borderRadius: "0.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-error)", marginBottom: "0.25rem" }}>
                {studentData.applications.rejected}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-error)", fontWeight: 500 }}>Rejected</div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>📅 Upcoming Events</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {studentData.upcomingEvents.map(event => (
              <div key={event.id} style={{ padding: "1rem", background: "var(--color-bg-secondary)", borderRadius: "0.5rem", borderLeft: "3px solid var(--color-maroon)" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{event.title}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  {event.date} • {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          <button 
            className="secondary-btn" 
            style={{ width: "100%", marginTop: 0 }}
            onClick={() => navigate("/student/profile")}
          >
            📝 Update Profile
          </button>
          <button 
            className="secondary-btn" 
            style={{ width: "100%", marginTop: 0 }}
            onClick={() => navigate("/student/resumes")}
          >
            📤 Upload Resume
          </button>
          <button 
            className="secondary-btn" 
            style={{ width: "100%", marginTop: 0 }}
            onClick={() => navigate("/student/events")}
          >
            🎯 Browse Events
          </button>
          <button 
            className="secondary-btn" 
            style={{ width: "100%", marginTop: 0 }}
            onClick={() => navigate("/student/mentors")}
          >
            👥 Find Mentors
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>📊 Recent Activity</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {studentData.recentActivity.map(activity => (
            <div key={activity.id} style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "var(--color-text-secondary)" }}>{activity.action}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>{activity.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
