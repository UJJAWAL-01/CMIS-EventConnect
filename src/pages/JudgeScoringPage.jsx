import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function JudgeScoringPage() {
  const { studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student || {};

  const [scores, setScores] = useState({
    strategy: 0,
    analysis: 0,
    presentation: 0,
    teamwork: 0
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // TODO: Fetch from backend /api/students/:studentId/submission
  const mockSubmission = {
    fileName: "Team_Presentation.pdf",
    uploadedAt: "Dec 3, 2025, 2:45 PM",
    submissionUrl: "#"
  };

  // Rubric criteria with descriptions
  const rubric = {
    strategy: {
      label: "Strategy & Approach",
      max: 10,
      description: "Quality of strategic thinking and problem-solving approach",
      levels: [
        { score: 10, text: "Excellent - Innovative and well-thought-out strategy" },
        { score: 8, text: "Good - Solid strategy with minor gaps" },
        { score: 6, text: "Adequate - Basic strategy with some issues" },
        { score: 4, text: "Needs Work - Unclear or flawed strategy" },
        { score: 0, text: "Incomplete - No clear strategy" }
      ]
    },
    analysis: {
      label: "Market Analysis & Research",
      max: 10,
      description: "Depth and accuracy of research and data analysis",
      levels: [
        { score: 10, text: "Excellent - Comprehensive research with strong insights" },
        { score: 8, text: "Good - Solid research with useful analysis" },
        { score: 6, text: "Adequate - Basic research present" },
        { score: 4, text: "Needs Work - Limited or superficial analysis" },
        { score: 0, text: "Incomplete - Minimal or no research" }
      ]
    },
    presentation: {
      label: "Presentation Quality",
      max: 10,
      description: "Clarity, organization, and delivery of presentation",
      levels: [
        { score: 10, text: "Excellent - Clear, engaging, well-organized" },
        { score: 8, text: "Good - Generally clear and well-presented" },
        { score: 6, text: "Adequate - Understandable but could be clearer" },
        { score: 4, text: "Needs Work - Difficult to follow" },
        { score: 0, text: "Incomplete - Very poorly presented" }
      ]
    },
    teamwork: {
      label: "Team Collaboration & Communication",
      max: 10,
      description: "Evidence of team cooperation and communication",
      levels: [
        { score: 10, text: "Excellent - Strong collaboration evident" },
        { score: 8, text: "Good - Good team coordination" },
        { score: 6, text: "Adequate - Basic teamwork present" },
        { score: 4, text: "Needs Work - Limited collaboration" },
        { score: 0, text: "Incomplete - No evidence of teamwork" }
      ]
    }
  };

  const handleScoreChange = (criterion, value) => {
    setScores(prev => ({ ...prev, [criterion]: parseInt(value) }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = Object.values(rubric).reduce((a, b) => a + b.max, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert("Please provide feedback before submitting.");
      return;
    }

    setIsSubmitting(true);
    // TODO: POST to /api/scoring with { studentId, scores, feedback, totalScore }
    console.log("Submitting scores:", { studentId, scores, feedback, totalScore });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
        <div className="card" style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
          <h2 style={{ color: "#15803d", margin: 0, marginBottom: "0.5rem" }}>Scoring Submitted</h2>
          <p style={{ color: "#166534", marginBottom: "2rem" }}>
            Your evaluation for {student.name} has been recorded. The student will receive this feedback shortly.
          </p>
          <button
            onClick={() => navigate("/judge/students")}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #eeeff5 100%)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>
          Score {student.name || "Student"}'s Submission
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "1rem" }}>
          Team: {student.teamName || "N/A"}
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
        {/* Submission Info */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>📤 Submission Details</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontWeight: 600, marginBottom: "0.25rem" }}>
                File Name
              </div>
              <div style={{ fontWeight: 600 }}>{mockSubmission.fileName}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontWeight: 600, marginBottom: "0.25rem" }}>
                Submitted
              </div>
              <div style={{ fontWeight: 600 }}>{mockSubmission.uploadedAt}</div>
            </div>
            <a
              href={mockSubmission.submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.75rem",
                background: "var(--color-bg-secondary)",
                color: "var(--color-maroon)",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
            >
              📥 Download Submission
            </a>
          </div>
        </div>

        {/* Score Summary */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>📊 Score Summary</h3>
          <div style={{
            padding: "1.5rem",
            background: "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
            borderRadius: "0.625rem",
            color: "white",
            textAlign: "center",
            marginBottom: "1rem"
          }}>
            <div style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              {totalScore}/{maxScore}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>
              Total Score
            </div>
          </div>
          <div style={{
            width: "100%",
            height: "12px",
            background: "#e5e7eb",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "1rem"
          }}>
            <div style={{
              height: "100%",
              width: `${(totalScore / maxScore) * 100}%`,
              background: "linear-gradient(90deg, var(--color-maroon), #7a1d1d)",
              transition: "width 0.3s ease"
            }} />
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", textAlign: "center" }}>
            {totalScore >= 32 ? "✓ Excellent" : totalScore >= 24 ? "Good" : totalScore >= 16 ? "Adequate" : "Needs Improvement"}
          </div>
        </div>
      </div>

      {/* Scoring Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>🎯 Rubric Scoring</h3>

          {Object.entries(rubric).map(([criterion, data]) => (
            <div key={criterion} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--color-text)" }}>
                  {data.label}
                </div>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  {data.description}
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                {data.levels.map(level => (
                  <label
                    key={level.score}
                    style={{
                      padding: "0.75rem",
                      border: scores[criterion] === level.score ? "2px solid var(--color-maroon)" : "2px solid #e5e7eb",
                      background: scores[criterion] === level.score ? "#f9fafb" : "white",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "center"
                    }}
                  >
                    <input
                      type="radio"
                      name={criterion}
                      value={level.score}
                      checked={scores[criterion] === level.score}
                      onChange={() => handleScoreChange(criterion, level.score)}
                      style={{ display: "none" }}
                    />
                    <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-maroon)", marginBottom: "0.25rem" }}>
                      {level.score}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                      pts
                    </div>
                  </label>
                ))}
              </div>

              {scores[criterion] > 0 && (
                <div style={{
                  padding: "0.75rem",
                  background: "var(--color-bg-secondary)",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)"
                }}>
                  {data.levels.find(l => l.score === scores[criterion])?.text}
                </div>
              )}
            </div>
          ))}

          {/* Feedback */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              fontSize: "1.125rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              color: "var(--color-text)"
            }}>
              💬 Detailed Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback for the student. Include strengths, areas for improvement, and specific recommendations..."
              style={{
                width: "100%",
                padding: "1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "0.625rem",
                fontSize: "1rem",
                fontFamily: "inherit",
                minHeight: "200px",
                boxSizing: "border-box",
                resize: "vertical"
              }}
            />
            <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
              {feedback.length} / 1000 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="submit"
              disabled={isSubmitting || totalScore === 0}
              style={{
                flex: 1,
                padding: "0.9375rem",
                background: totalScore === 0 ? "#d1d5db" : "linear-gradient(135deg, var(--color-maroon) 0%, #7a1d1d 100%)",
                color: "white",
                border: "none",
                borderRadius: "0.625rem",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: totalScore === 0 ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Scoring & Feedback"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/judge/students")}
              style={{
                padding: "0.9375rem 1.5rem",
                background: "white",
                color: "var(--color-maroon)",
                border: "2px solid var(--color-maroon)",
                borderRadius: "0.625rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
