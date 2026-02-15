import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import recruiterRouter from './routes/recruiterRoutes.js';
import questionsRouter from './routes/questions.js';
import testRouter from './routes/testRoute.js';
import categoryRouter from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/recruiter", recruiterRouter);
app.use('/api/questions', questionsRouter);
app.use("/api/tests", testRouter);
app.use("/api/test-categories", categoryRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Codestream AI Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;

