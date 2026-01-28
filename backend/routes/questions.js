import express from 'express';
import { 
  getMCQQuestions, createMCQQuestion, deleteMCQQuestion,
  getCodingQuestions, getCodingQuestionById, createCodingQuestion, deleteCodingQuestion
} from '../controllers/questionsController.js';

const router = express.Router();

// MCQ Questions Routes
router.get('/mcq', getMCQQuestions);
router.post('/mcq', createMCQQuestion);
router.delete('/mcq/:id', deleteMCQQuestion);

// Coding Questions Routes
router.get('/coding', getCodingQuestions);
router.get('/coding/:id', getCodingQuestionById);
router.post('/coding', createCodingQuestion);
router.delete('/coding/:id', deleteCodingQuestion);

export default router;

