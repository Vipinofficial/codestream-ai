// models/CandidateProfile.js
import mongoose from 'mongoose';

const candidateProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePicture: String,
    candidateId: String,
    phoneNumber: String,
    resumeLink: String,
    otherLinks: [String],
    tags: [String],
    status: {
      type: String,
      enum: ['APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED'],
      default: 'APPLIED',
    },
    aiResumeParsedData: Object,
  },
  { timestamps: true }
);

export default mongoose.model('CandidateProfile', candidateProfileSchema);
