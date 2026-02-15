import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mergedBy: {
      type: String,
      required: true,
      trim: true,
    },

    // Can reference both MCQ & Coding
    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "questions.questionType",
        },
        questionType: {
          type: String,
          required: true,
          enum: ["MCQQuestion", "CodingQuestion"],
        },
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);