// models/AdminProfile.js
import mongoose from 'mongoose';

const adminProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePhoto: String,
    organizationName: String,
    phoneNumber: String,
    role: {
      type: String,
      enum: ['SCHOOL_ADMIN', 'COLLEGE_ADMIN'],
    },
    accountStatus: {
      type: String,
      enum: ['ACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

export default mongoose.model('AdminProfile', adminProfileSchema);
