import express from 'express';
import db from '../db.js';

const router = express.Router();

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

export default router;

