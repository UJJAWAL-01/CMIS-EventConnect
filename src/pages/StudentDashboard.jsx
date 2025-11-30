export default function StudentDashboard() {
  // later: fetch these from backend /api/student/summary
  const profileCompletion = 70;
  const resumeCount = 2;
  const applications = {
    applied: 3,
    interviewing: 1,
    offer: 0,
    rejected: 1,
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome back! Here is a quick overview of your career activity.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem", marginTop: "1rem" }}>
        <div className="card">
          <h3>Profile Completion</h3>
          <p>{profileCompletion}% complete</p>
          <div style={{ background: "#e5e7eb", borderRadius: 9999, overflow: "hidden" }}>
            <div
              style={{
                width: `${profileCompletion}%`,
                background: "#111827",
                height: 8,
              }}
            />
          </div>
        </div>

        <div className="card">
          <h3>Resume Versions</h3>
          <p>{resumeCount} uploaded</p>
        </div>

        <div className="card">
          <h3>Job Applications</h3>
          <ul>
            <li>Applied: {applications.applied}</li>
            <li>Interviewing: {applications.interviewing}</li>
            <li>Offers: {applications.offer}</li>
            <li>Rejected: {applications.rejected}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
