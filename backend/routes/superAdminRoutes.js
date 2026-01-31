import express from "express";
import {
  getSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
  getAllSuperAdmins,
} from "../controllers/superAdmin.js";

const router = express.Router();

router.get("/", getAllSuperAdmins);
router.get("/:id", getSuperAdmin);
router.put("/:id", updateSuperAdmin);
router.delete("/:id", deleteSuperAdmin);

export default router;
