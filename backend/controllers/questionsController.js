import MCQQuestion from '../models/MCQQuestion.js';
import CodingQuestion from '../models/CodingQuestion.js';

/* ================= MCQ QUESTIONS ================= */

// Get all MCQ questions
export const getMCQQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await MCQQuestion.find(filter)
      .select('-__v')
      .sort({ createdAt: -1 });
    
    res.json(questions);
  } catch (error) {
    console.error('GetMCQ error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create MCQ question
export const createMCQQuestion = async (req, res) => {
  try {
    const { question, options, category, difficulty, explanation, points } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: 'Question and at least 2 options are required' });
    }

    const mcqQuestion = await MCQQuestion.create({
      question,
      options,
      category,
      difficulty,
      explanation,
      points,
      createdBy: req.user?.id,
    });

    res.status(201).json(mcqQuestion);
  } catch (error) {
    console.error('CreateMCQ error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete MCQ question
export const deleteMCQQuestion = async (req, res) => {
  try {
    const question = await MCQQuestion.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CODING QUESTIONS ================= */

// Get all coding questions
export const getCodingQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await CodingQuestion.find(filter)
      .select('-testCases.expectedOutput') // Hide expected outputs
      .select('-testCases.isHidden')
      .sort({ createdAt: -1 });
    
    res.json(questions);
  } catch (error) {
    console.error('GetCoding error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get coding question with all details (for testing)
export const getCodingQuestionById = async (req, res) => {
  try {
    const question = await CodingQuestion.findById(req.params.id)
      .select('-__v');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create coding question
export const createCodingQuestion = async (req, res) => {
  try {
    const { 
      title, description, category, difficulty, 
      constraints, starterCode, testCases, timeLimit, points, tags 
    } = req.body;

    if (!title || !description || !category || !testCases || testCases.length === 0) {
      return res.status(400).json({ message: 'Title, description, category, and test cases are required' });
    }

    const codingQuestion = await CodingQuestion.create({
      title,
      description,
      category,
      difficulty,
      constraints,
      starterCode,
      testCases,
      timeLimit,
      points,
      tags,
      createdBy: req.user?.id,
    });

    res.status(201).json(codingQuestion);
  } catch (error) {
    console.error('CreateCoding error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete coding question
export const deleteCodingQuestion = async (req, res) => {
  try {
    const question = await CodingQuestion.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

