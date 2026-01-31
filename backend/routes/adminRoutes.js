import express from "express";
import {
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
} from "../controllers/admin.js";


const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
