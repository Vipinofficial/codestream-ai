import express from "express";
import {
  getCandidate,
  updateCandidate,
  deleteCandidate,
  getAllCandidates,
} from "../controllers/candidate.js";


const router = express.Router();

router.get("/", getAllCandidates);
router.get("/:id", getCandidate);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

export default router;
