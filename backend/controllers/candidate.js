import Candidate from "../models/Candidate.js";

export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({
      candidateId: req.params.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findOneAndUpdate(
      { candidateId: req.params.id },
      req.body,
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findOneAndDelete({
      candidateId: req.params.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCandidates = async (_req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
