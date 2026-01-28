
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/challenges
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.challenges);
});

// POST /api/challenges
router.post('/', async (req, res) => {
  const newChallenge = req.body;

  if (!newChallenge.title || !newChallenge.description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const challenge = {
    id: Date.now().toString(),
    ...newChallenge,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.data.challenges.push(challenge);
  await db.write();

  res.status(201).json(challenge);
});

module.exports = router;
