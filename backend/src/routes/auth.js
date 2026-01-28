import express from 'express';
import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'codestream-ai-secret-key-change-in-production';

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate role
  const validRoles = ['candidate', 'recruiter', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be candidate, recruiter, or admin' });
  }

  await db.read();
  const existingUser = db.data.users.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.data.users.push(newUser);
  await db.write();

  // Generate JWT token
  const token = generateToken(newUser);

  // Don't return password in response
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ 
    message: 'User registered successfully', 
    token,
    user: userWithoutPassword 
  });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  await db.read();
  const user = db.data.users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = generateToken(user);

  // Don't return password in response
  const { password: _, ...userWithoutPassword } = user;
  res.json({ 
    message: 'Login successful', 
    token,
    user: userWithoutPassword 
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // In a stateless JWT auth, logout is handled client-side
  res.json({ message: 'Logged out successfully' });
});

// GET /api/auth/me - Get current user from token
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    await db.read();
    const user = db.data.users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
});

// Export for middleware use
export { JWT_SECRET };

export default router;

