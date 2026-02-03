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

      <div style={{ marginTop: "12px" }}>
        <label style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={isCovered}
            onChange={() => setIsCovered(!isCovered)}
          />
          Covered Slot
        </label>

        <label style={{ display: "flex", gap: "10px" }}>
          <input
            type="checkbox"
            checked={isEVCharging}
            onChange={() => setIsEVCharging(!isEVCharging)}
          />
          EV Charging
        </label>
      </div>

      <button style={{ marginTop: "16px" }} onClick={addSlot}>
        Add Slot
      </button>
    </div>
  );
}

export default AddSlot;
