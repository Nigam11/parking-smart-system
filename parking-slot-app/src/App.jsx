import React, { useEffect, useState } from "react";
import AddSlot from "./components/AddSlot";
import ParkVehicle from "./components/ParkVehicle";
import SlotList from "./components/SlotList";
import OutputPanel from "./components/OutputPanel";

// ✅ LIVE BACKEND URL (production-ready)
const API_URL = "https://parking-smart-system-backend.onrender.com";

function App() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API_BASE}/slots`);
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error("Error fetching slots:", err);
      showToast("Backend not reachable");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="container">
      {/* CENTER POPUP */}
      {toast && (
        <div className="toast">
          <div className="toast-box">{toast}</div>
        </div>
      )}

      <header style={{ position: "relative", marginBottom: "40px" }}>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ position: "absolute", right: 0, top: 0, width: "auto" }}
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

        <h1>Smart Parking Lot System</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
          Manage parking slots and vehicles efficiently
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        <AddSlot
          api={API_BASE}
          refresh={fetchSlots}
          setMessage={setMessage}
          notify={showToast}
        />

        <ParkVehicle
          api={API_BASE}
          refresh={fetchSlots}
          setMessage={setMessage}
          notify={showToast}
        />
      </div>

      <SlotList slots={slots} />

      <OutputPanel message={message} theme={theme} />
    </div>
  );
}

export default App;
