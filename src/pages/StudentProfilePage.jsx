import { useState } from "react";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    major: "",
    graduationYear: "",
    linkedinUrl: "",
    headline: "",
    skills: ["Python", "SQL"],
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed || profile.skills.includes(trimmed)) return;
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkill("");
  };

  const handleRemoveSkill = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = () => {
    // TODO: POST to backend /api/student/profile and save in MongoDB
    console.log("Saving profile", profile);
    alert("Profile saved (mock). Backend will later store this in MongoDB.");
  };

  return (
    <div>
      <h1>Student Profile</h1>
      <p>Keep this updated so recruiters and mentors can find you.</p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "1.5rem", marginTop: "1rem" }}>
        <div className="card">
          <h3>Basic Information</h3>

          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Major</label>
            <input
              type="text"
              value={profile.major}
              onChange={(e) => handleChange("major", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Graduation Year</label>
            <input
              type="number"
              value={profile.graduationYear}
              onChange={(e) => handleChange("graduationYear", e.target.value)}
            />
          </div>

          <div className="field">
            <label>LinkedIn URL</label>
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile"
              value={profile.linkedinUrl}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Headline / Summary</label>
            <textarea
              rows={3}
              value={profile.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
            />
          </div>

          <button className="primary-btn" onClick={handleSave}>
            Save Profile
          </button>
        </div>

        <div className="card">
          <h3>Skills</h3>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button type="button" onClick={handleAddSkill}>
              Add
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {profile.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "0.25rem 0.5rem",
                  borderRadius: 9999,
                  background: "#e5e7eb",
                }}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
