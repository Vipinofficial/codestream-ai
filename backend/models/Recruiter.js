// models/RecruiterProfile.js
import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePicture: String,
    designation: String,
    companyName: String,
    phoneNumber: String,
    recruiterId: String,
    status: {
      type: String,
      enum: ['ACTIVE', 'RESTRICTED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

export default mongoose.model('RecruiterProfile', recruiterProfileSchema);
