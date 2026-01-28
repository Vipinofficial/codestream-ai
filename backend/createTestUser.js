/**
 * Script to create test users or seed the database
 * Usage: node createTestUser.js <email> <password> <role>
 * 
 * Example: node createTestUser.js admin@test.com password123 admin
 * Example: node createTestUser.js recruiter@test.com password123 recruiter
 * Example: node createTestUser.js candidate@test.com password123 candidate
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Define User Schema inline (to avoid import issues)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["candidate", "recruiter", "admin"],
    default: "candidate",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function createUser(email, password, role = "candidate") {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`⚠️  User with email ${email} already exists`);
      const update = await User.findByIdAndUpdate(
        existingUser._id,
        { role, password: await bcrypt.hash(password, 10) },
        { new: true }
      );
      console.log("✅ User role and password updated");
      console.log(`   Email: ${email}`);
      console.log(`   Role: ${role}`);
      process.exit(0);
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    console.log("✅ User created successfully!");
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   ID: ${user._id}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run with command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node createTestUser.js <email> <password> [role]");
  console.log("Roles: candidate, recruiter, admin (default: candidate)");
  process.exit(1);
}

createUser(args[0], args[1], args[2] || "candidate");

