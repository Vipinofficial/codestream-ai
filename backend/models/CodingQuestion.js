import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
});

const codingQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['javascript', 'python', 'java', 'cpp', 'sql', 'data-structures', 'algorithms'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    constraints: {
      type: String,
    },
    starterCode: {
      type: String,
      default: '',
    },
    testCases: [testCaseSchema],
    timeLimit: {
      type: Number,
      default: 30, // minutes
    },
    points: {
      type: Number,
      default: 100,
    },
    tags: [{
      type: String,
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('CodingQuestion', codingQuestionSchema);

