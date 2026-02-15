import express from "express";
import {
  getMCQQuestions,
  createMCQQuestion,
  deleteMCQQuestion,
  getCodingQuestions,
  getCodingQuestionById,
  createCodingQuestion,
  deleteCodingQuestion,
  getMCQQuestionById,
  updateMCQQuestion,
  updateCodingQuestion,
} from "../controllers/questionsController.js";

const router = express.Router();

// MCQ
router.get("/mcq", getMCQQuestions);
router.get("/mcq/:id", getMCQQuestionById);
router.post("/mcq", createMCQQuestion);
router.put("/mcq/:id", updateMCQQuestion);
router.delete("/mcq/:id", deleteMCQQuestion);

// Coding
router.get("/coding", getCodingQuestions);
router.get("/coding/:id", getCodingQuestionById);
router.post("/coding", createCodingQuestion);
router.put("/coding/:id", updateCodingQuestion);
router.delete("/coding/:id", deleteCodingQuestion);

export default router;
