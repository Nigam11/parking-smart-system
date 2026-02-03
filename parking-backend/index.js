const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARE
   ========================= */

// ✅ Enable CORS for Vercel frontend
app.use(
  cors({
    origin: "*", // production + local both allowed
  })
);

app.use(express.json());

/* =========================
   In-memory parking slots
   ========================= */
let slots = [];

/* =========================
   GET: View All Slots
   ========================= */
app.get("/slots", (req, res) => {
  res.json(slots);
});

/* =========================
   POST: Add Parking Slot
   ========================= */
app.post("/slots", (req, res) => {
  const { slotNo, isCovered, isEVCharging } = req.body;

  if (slotNo === undefined) {
    return res.status(400).json({ message: "Slot number is required" });
  }

  if (slots.find((s) => s.slotNo === Number(slotNo))) {
    return res.status(400).json({ message: "Slot already exists" });
  }

  const newSlot = {
    slotNo: Number(slotNo),
    isCovered: Boolean(isCovered),
    isEVCharging: Boolean(isEVCharging),
    isOccupied: false,
  };

  slots.push(newSlot);
  slots.sort((a, b) => a.slotNo - b.slotNo);

  res.json({ message: `Slot ${slotNo} added successfully.` });
});

/* =========================
   POST: Park Vehicle
   ========================= */
app.post("/park", (req, res) => {
  const { needsEV, needsCover } = req.body;

  const slot = slots.find(
    (s) =>
      !s.isOccupied &&
      (!needsEV || s.isEVCharging) &&
      (!needsCover || s.isCovered)
  );

  if (!slot) {
    return res.json({ message: "No slot available" });
  }

  slot.isOccupied = true;

  res.json({
    message: `Vehicle parked at Slot ${slot.slotNo}`,
  });
});

/* =========================
   POST: Remove Vehicle
   ========================= */
app.post("/remove", (req, res) => {
  const { slotNo } = req.body;

  const slot = slots.find((s) => s.slotNo === Number(slotNo));

  if (!slot || !slot.isOccupied) {
    return res.json({ message: "Invalid slot or already free" });
  }

  slot.isOccupied = false;

  res.json({
    message: `Vehicle removed from Slot ${slotNo}`,
  });
});

/* =========================
   Server Start (IMPORTANT)
   ========================= */
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
