import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RecruiterProfile from "../models/Recruiter.js";
import CandidateProfile from "../models/Candidate.js";
import AdminProfile from "../models/Admin.js";
import SuperAdminProfile from "../models/SuperAdmin.js";
import Recruiter from "../models/Recruiter.js";
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "codestream-ai-secret-key";

/* Generate JWT */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    /* 🔥 HYBRID PROFILE CREATION */
    switch (role) {
      case "RECRUITER":
        await RecruiterProfile.create({
          user: user._id,
          recruiterId: `REC-${Date.now()}`,
        });
        break;

      case "CANDIDATE":
        await CandidateProfile.create({
          user: user._id,
          candidateId: `CAN-${Date.now()}`,
        });
        break;

      case "ADMIN":
        await AdminProfile.create({
          user: user._id,
        });
        break;

      case "SUPERADMIN":
        await SuperAdminProfile.create({
          user: user._id,
        });
        break;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= LOGIN ================= */

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    // 1️⃣ Authenticate user
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Load role-specific profile
    let profile = null;

    switch (user.role) {
      case "RECRUITER":
        profile = await RecruiterProfile.findOne({ user: user._id });
        break;

      case "CANDIDATE":
        profile = await CandidateProfile.findOne({user:user._id});
        break;

      case "ADMIN":
        profile = await AdminProfile.findOne({ user: user._id });
        break;

      case "SUPERADMIN":
      case "SUPER_ADMIN":
        profile = await SuperAdminProfile.findOne({user:user._id});
        break;

      default:
        break;
    }

    // 3️⃣ Generate token
    const token = generateToken(user);

    console.log("Login successful",profile)
    // 4️⃣ Unified response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
        recruiterId: profile?.recruiterId,
      },
      profile, // role-specific data
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token missing' });

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const user = await User.findById(decoded.id).lean();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  let profile = null;

  switch (user.role) {
    case "RECRUITER":
      profile = await RecruiterProfile.findOne({ user: user._id });
      break;
    case "CANDIDATE":
      profile = await CandidateProfile.findOne({ user: user._id });
      break;
    case "ADMIN":
      profile = await AdminProfile.findOne({ user: user._id });
      break;
    case "SUPERADMIN":
      profile = await SuperAdminProfile.findOne({ user: user._id });
      break;
  }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        recruiterId: profile?.recruiterId,
      },
      profile,
    });
  } catch (err) {
    console.error('getMyProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};
