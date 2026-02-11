import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { 
  getMCQQuestions, createMCQQuestion, deleteMCQQuestion,
  getCodingQuestions, getCodingQuestionById, createCodingQuestion, deleteCodingQuestion
} from '../controllers/questionsController.js';

const router = express.Router();

// MCQ Questions Routes
router.get('/mcq', getMCQQuestions);
router.post('/mcq', protect, createMCQQuestion);
router.delete('/mcq/:id', protect, deleteMCQQuestion);

// Coding Questions Routes
router.get('/coding', getCodingQuestions);
router.get('/coding/:id', getCodingQuestionById);
router.post('/coding', protect, createCodingQuestion);
router.delete('/coding/:id', protect, deleteCodingQuestion);

export default router;

