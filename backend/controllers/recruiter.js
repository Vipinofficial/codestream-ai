import Recruiter from "../models/Recruiter.js";
import User from "../models/User.js";

export const getRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({
      recruiterId: req.params.id,
    }).populate("user", "name email role"); 

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecruiter = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    // 1️⃣ Find recruiter
    const recruiter = await Recruiter.findOne({
      recruiterId: req.params.id,
    });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // 2️⃣ Update Recruiter fields (if any)
    if (status) recruiter.status = status;

    await recruiter.save();

    // 3️⃣ Update linked User document
    if (name || email) {
      await User.findByIdAndUpdate(recruiter.user, {
        ...(name && { name }),
        ...(email && { email }),
      });
    }

    // 4️⃣ Return populated result
    const updatedRecruiter = await Recruiter.findById(
      recruiter._id
    ).populate("user");

    res.json(updatedRecruiter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOneAndDelete({
      recruiterId: req.params.id,
    });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
