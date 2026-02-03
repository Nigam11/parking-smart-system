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
      <h2>Add Parking Slot</h2>

      <input
        type="text"
        placeholder="Slot Number"
        value={slotNo}
        onChange={(e) => setSlotNo(e.target.value)}
      />

      {/* ✅ CHECKBOX GROUP */}
      <div className="checkbox-group">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isCovered}
            onChange={() => setIsCovered(!isCovered)}
          />
          <span>Covered Slot</span>
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isEVCharging}
            onChange={() => setIsEVCharging(!isEVCharging)}
          />
          <span>EV Charging</span>
        </label>
      </div>

      <button onClick={addSlot} disabled={!slotNo}>
        Add Slot
      </button>
    </div>
  );
}

export default AddSlot;
