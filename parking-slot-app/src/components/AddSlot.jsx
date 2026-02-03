import React, { useState } from "react";

function AddSlot({ api, refresh, setMessage, notify }) {
  const [slotNo, setSlotNo] = useState("");
  const [isCovered, setIsCovered] = useState(false);
  const [isEVCharging, setIsEVCharging] = useState(false);

  const addSlot = async () => {
    if (!slotNo) {
      setMessage("Slot number is required");
      notify("Slot number is required");
      return;
    }

    const res = await fetch(`${api}/slots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slotNo: Number(slotNo),
        isCovered,
        isEVCharging,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
    notify(data.message);
    refresh();

    setSlotNo("");
    setIsCovered(false);
    setIsEVCharging(false);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: "16px" }}>Add Parking Slot</h2>

      <input
        type="number"
        placeholder="Slot Number"
        value={slotNo}
        onChange={(e) => setSlotNo(e.target.value)}
      />

      {/* ✅ FIXED CHECKBOX LAYOUT */}
      <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={isCovered}
            onChange={() => setIsCovered(!isCovered)}
          />
          <span>Covered Slot</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={isEVCharging}
            onChange={() => setIsEVCharging(!isEVCharging)}
          />
          <span>EV Charging</span>
        </label>
      </div>

      <button style={{ marginTop: "16px" }} onClick={addSlot}>
        Add Slot
      </button>
    </div>
  );
}

export default AddSlot;
