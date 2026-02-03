import React from "react";

function OutputPanel({ message }) {
  return (
    <div className="card">
      <h2 style={{ marginBottom: "12px" }}>System Output</h2>

      <div
        style={{
          padding: "14px 16px",
          borderRadius: "12px",
          background: message
            ? "rgba(0, 198, 255, 0.12)"
            : "rgba(255, 255, 255, 0.06)",

          /* 🔥 THE REAL FIX */
          color: message
            ? "var(--text-main)"   // auto adapts to theme
            : "var(--text-muted)",

          fontSize: "0.95rem",
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {message || "No action performed yet."}
      </div>
    </div>
  );
}

export default OutputPanel;
