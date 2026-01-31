import express from "express";
import {
  getRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getAllRecruiters,
} from "../controllers/recruiter.js"


const recruiterRouter = express.Router();

recruiterRouter.get("/", getAllRecruiters);
recruiterRouter.get("/:id", getRecruiter);
recruiterRouter.put("/:id", updateRecruiter);
recruiterRouter.delete("/:id", deleteRecruiter);

export default recruiterRouter;
