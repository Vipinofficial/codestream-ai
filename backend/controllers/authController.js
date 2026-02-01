import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RecruiterProfile from "../models/Recruiter.js";
import CandidateProfile from "../models/Candidate.js";
import AdminProfile from "../models/Admin.js";
import SuperAdminProfile from "../models/SuperAdmin.js";
import Recruiter from "../models/Recruiter.js";

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
        profile = await Recruiter.findOne({user:user._id});
        break;

      case "CANDIDATE":
        profile = await Candidate.findOne({user:user._id});
        break;

      case "ADMIN":
        profile = await Admin.findOne({user:user._id});
        break;

      case "SUPER_ADMIN":
        profile = await SuperAdmin.findOne({user:user._id});
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
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.id).lean();

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
console.log("profile",profile)

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
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};
