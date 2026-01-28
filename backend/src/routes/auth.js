
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  await db.read();
  const existingUser = db.data.users.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // In a real app, you'd hash the password
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // Store hashed password instead
    role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.data.users.push(newUser);
  await db.write();

  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    await db.read();
    const user = db.data.users.find(u => u.email === email);

    if (!user || user.password !== password) { // In a real app, you'd compare hashed passwords
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a real app, you'd return a JWT
    res.json({ message: 'Login successful', user });
});


module.exports = router;
