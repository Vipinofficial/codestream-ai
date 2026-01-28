import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all challenges
router.get("/", protect, (req, res) => {
  // Return empty array for now - in production this would fetch from DB
  res.json([]);
});

// Create a challenge
router.post("/", protect, (req, res) => {
  // In production, this would save to DB
  const challenge = {
    id: `ch_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(challenge);
});

export default router;

