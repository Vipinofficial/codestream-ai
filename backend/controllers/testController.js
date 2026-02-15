import Test from "../models/Test.js";

/**
 * @desc Get all merged tests
 * @route GET /api/tests/merged
 */

export const getMergedTests = async (req, res) => {
  try {
    const tests = await Test.find({ isDeleted: false })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(tests);
  } catch (error) {
    console.error("GetMergedTests error:", error);
    res.status(500).json({ message: "Failed to fetch merged tests" });
  }
};

/**
 * @desc Delete merged test (soft delete)
 * @route DELETE /api/tests/merged/:id
 */

export const deleteMergedTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id);

    if (!test || test.isDeleted) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Soft delete
    test.isDeleted = true;
    await test.save();

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("DeleteMergedTest error:", error);
    res.status(500).json({ message: "Failed to delete test" });
  }
};


/**
 * GET /api/tests
 */
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({ isDeleted: false })
      .populate("category", "name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(tests);
  } catch (error) {
    console.error("GetAllTests error:", error);
    res.status(500).json({ message: "Failed to fetch tests" });
  }
};

/**
 * DELETE /api/tests/:id
 * Soft delete
 */
export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id);

    if (!test || test.isDeleted) {
      return res.status(404).json({ message: "Test not found" });
    }

    test.isDeleted = true;
    await test.save();

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("DeleteTest error:", error);
    res.status(500).json({ message: "Failed to delete test" });
  }
};

/**
 * POST /api/tests/bulk-delete
 */
export const bulkDeleteTests = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid IDs array" });
    }

    await Test.updateMany(
      { _id: { $in: ids } },
      { $set: { isDeleted: true } }
    );

    res.status(200).json({ message: "Tests deleted successfully" });
  } catch (error) {
    console.error("BulkDelete error:", error);
    res.status(500).json({ message: "Failed to delete tests" });
  }
};