// models/SuperAdminProfile.js
import mongoose from 'mongoose';

const superAdminProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePhoto: String,
    position: String,
    phoneNumber: String,
    accountStatus: {
      type: String,
      enum: ['ACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

export default mongoose.model('SuperAdminProfile', superAdminProfileSchema);
