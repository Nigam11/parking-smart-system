import React, { useState } from "react";

function ParkVehicle({ api, refresh, setMessage, notify }) {
  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);
  const [removeSlotNo, setRemoveSlotNo] = useState("");

  const parkVehicle = async () => {
    const res = await fetch(`${api}/park`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ needsEV, needsCover }),
    });

    const data = await res.json();
    setMessage(data.message);
    notify(data.message);
    refresh();
  };

  const removeVehicle = async () => {
    if (!removeSlotNo) {
      setMessage("Slot number required for removal");
      notify("Slot number required for removal");
      return;
    }

    const res = await fetch(`${api}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotNo: Number(removeSlotNo) }),
    });

    const data = await res.json();
    setMessage(data.message);
    notify(data.message);
    refresh();
    setRemoveSlotNo("");
  };

  return (
    <div className="card">
      <h2>Park / Remove Vehicle</h2>

      {/* ✅ FIXED CHECKBOX LAYOUT */}
      <div className="checkbox-group">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={needsEV}
            onChange={() => setNeedsEV(!needsEV)}
          />
          <span>Needs EV Charging</span>
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={needsCover}
            onChange={() => setNeedsCover(!needsCover)}
          />
          <span>Needs Covered Slot</span>
        </label>
      </div>

      <button onClick={parkVehicle}>Park Vehicle</button>

      <hr />

      <input
        type="number"
        placeholder="Slot Number to Remove"
        value={removeSlotNo}
        onChange={(e) => setRemoveSlotNo(e.target.value)}
      />

      <button onClick={removeVehicle}>Remove Vehicle</button>
    </div>
  );
}

export default ParkVehicle;
