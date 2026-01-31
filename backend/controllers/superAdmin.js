import SuperAdmin from "../models/SuperAdmin.js";

export const getSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findOne({
      superAdminId: req.params.id,
    });

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    res.json(superAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findOneAndUpdate(
      { superAdminId: req.params.id },
      req.body,
      { new: true }
    );

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    res.json(superAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findOneAndDelete({
      superAdminId: req.params.id,
    });

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    res.json({ message: "Super Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSuperAdmins = async (_req, res) => {
  try {
    const superAdmins = await SuperAdmin.find();
    res.json(superAdmins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
