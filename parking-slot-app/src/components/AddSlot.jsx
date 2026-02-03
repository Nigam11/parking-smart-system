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
        slotNo,
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
        type="text"
        placeholder="Slot Number (e.g. A1, 101)"
        value={slotNo}
        onChange={(e) => setSlotNo(e.target.value)}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "1px" }}>
          <input
            type="checkbox"
            checked={isCovered}
            onChange={() => setIsCovered(!isCovered)}
          />
          Covered Slot
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "1px" }}>
          <input
            type="checkbox"
            checked={isEVCharging}
            onChange={() => setIsEVCharging(!isEVCharging)}
          />
          EV Charging Available
        </label>
      </div>

      <button onClick={addSlot} disabled={!slotNo}>
        Add Slot
      </button>
    </div>
  );
}

export default AddSlot;
