import { useState } from "react";

const EMPTY_APP = {
  company: "",
  role: "",
  status: "Applied",
  appliedDate: "",
};

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState([
    { id: 1, company: "Exabyte", role: "Data Analyst Intern", status: "Interviewing", appliedDate: "2025-11-10" },
    { id: 2, company: "Valero", role: "MIS Intern", status: "Applied", appliedDate: "2025-11-25" },
  ]);

  const [form, setForm] = useState(EMPTY_APP);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.company || !form.role) return;

    const newItem = {
      id: Date.now(),
      ...form,
      appliedDate: form.appliedDate || new Date().toISOString().slice(0, 10),
    };

    // TODO: POST to backend /api/student/applications
    setApplications((prev) => [newItem, ...prev]);
    setForm(EMPTY_APP);
  };

  return (
    <div>
      <h1>Job Applications</h1>
      <p>Track where you have applied and your current status with each employer.</p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,2fr)", gap: "1.25rem", marginTop: "1rem" }}>
        <form className="card" onSubmit={handleAdd}>
          <h3>Add Application</h3>
          <div className="field">
            <label>Company</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Role / Position</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="field">
            <label>Applied Date</label>
            <input
              type="date"
              value={form.appliedDate}
              onChange={(e) => handleChange("appliedDate", e.target.value)}
            />
          </div>
          <button className="primary-btn" type="submit">
            Save Application
          </button>
        </form>

        <div className="card">
          <h3>Your Applications</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
            <thead>
              <tr>
                <th align="left">Company</th>
                <th align="left">Role</th>
                <th align="left">Status</th>
                <th align="left">Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>{app.status}</td>
                  <td>{app.appliedDate}</td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={4}>No applications yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
