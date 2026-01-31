import Recruiter from "../models/Recruiter.js";

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
    const recruiter = await Recruiter.findOneAndUpdate(
      { recruiterId: req.params.id },
      req.body,
      { new: true }
    );

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter);
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
