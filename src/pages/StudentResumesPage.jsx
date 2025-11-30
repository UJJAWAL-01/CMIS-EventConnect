import { useState } from "react";

export default function StudentResumesPage() {
  const [resumes, setResumes] = useState([
    { id: 1, name: "Resume_Analytics.pdf", uploadedAt: "2025-11-20", isDefault: true },
    { id: 2, name: "Resume_Cloud.pdf", uploadedAt: "2025-10-15", isDefault: false },
  ]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newResume = {
      id: Date.now(),
      name: file.name,
      uploadedAt: new Date().toISOString().slice(0, 10),
      isDefault: resumes.length === 0,
    };
    // TODO: upload file to backend / storage, store URL in MongoDB
    setResumes((prev) => [newResume, ...prev]);
  };

  const setAsDefault = (id) => {
    setResumes((prev) =>
      prev.map((r) => ({
        ...r,
        isDefault: r.id === id,
      }))
    );
  };

  return (
    <div>
      <h1>Resumes</h1>
      <p>Manage multiple versions of your resume and choose a default for recruiters.</p>

      <div className="card" style={{ marginTop: "1rem" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label>Upload new resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
          <thead>
            <tr>
              <th align="left">File Name</th>
              <th align="left">Uploaded</th>
              <th align="left">Default</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume) => (
              <tr key={resume.id}>
                <td>{resume.name}</td>
                <td>{resume.uploadedAt}</td>
                <td>{resume.isDefault ? "Yes" : "No"}</td>
                <td>
                  {!resume.isDefault && (
                    <button type="button" onClick={() => setAsDefault(resume.id)}>
                      Set as default
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {resumes.length === 0 && (
              <tr>
                <td colSpan={4}>No resumes uploaded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
