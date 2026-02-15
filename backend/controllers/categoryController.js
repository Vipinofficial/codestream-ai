import Category from "../models/Category.js";
import mongoose from "mongoose";

/**
 * GET /api/test-categories
 */
export const getTestCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $lookup: {
          from: "tests",
          localField: "_id",
          foreignField: "category",
          as: "tests",
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          testCount: {
            $size: {
              $filter: {
                input: "$tests",
                as: "test",
                cond: { $eq: ["$$test.isDeleted", false] },
              },
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.error("GetCategories error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};