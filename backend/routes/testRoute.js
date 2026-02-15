import express from "express";
import {
  getMergedTests,
  deleteMergedTest,
  getAllTests,
  deleteTest,
  bulkDeleteTests,
} from "../controllers/testController.js";

const testRouter = express.Router();

testRouter.get("/", getAllTests);
testRouter.delete("/:id", deleteTest);
testRouter.post("/bulk-delete", bulkDeleteTests);
testRouter.get("/merged", getMergedTests);
testRouter.delete("/merged/:id", deleteMergedTest);

export default testRouter;
