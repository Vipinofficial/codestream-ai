
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/submissions
router.post('/', async (req, res) => {
  const { sessionId, content } = req.body;

  if (!sessionId || !content) {
    return res.status(400).json({ message: 'Session ID and content are required' });
  }

  const submission = {
    id: Date.now().toString(),
    sessionId,
    content,
    submitted_at: new Date().toISOString(),
  };

  db.data.submissions.push(submission);
  await db.write();

  res.status(201).json(submission);
});

module.exports = router;
