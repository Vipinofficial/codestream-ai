import express from "express";
import { getTestCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getTestCategories);

export default categoryRouter;