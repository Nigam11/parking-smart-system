import React from "react";

function SlotList({ slots }) {
  return (
    <div className="card">
      <h2>All Parking Slots</h2>

      {slots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
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
                <td>{slot.isOccupied ? "Occupied" : "Free"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SlotList;
