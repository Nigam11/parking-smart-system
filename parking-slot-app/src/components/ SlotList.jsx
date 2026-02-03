import React from "react";

function SlotList({ slots }) {
  return (
    <div className="card">
      <h2 style={{ marginBottom: "14px" }}>All Parking Slots</h2>

      {slots.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.7)" }}>
          No slots available.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Slot No</th>
                <th>Covered</th>
                <th>EV Charging</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.slotNo}>
                  <td>{slot.slotNo}</td>
                  <td>{slot.isCovered ? "Yes" : "No"}</td>
                  <td>{slot.isEVCharging ? "Yes" : "No"}</td>
                  <td>
                    <span
                      className={
                        slot.isOccupied
                          ? "status-box occupied"
                          : "status-box free"
                      }
                    >
                      {slot.isOccupied ? "Occupied" : "Free"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SlotList;
