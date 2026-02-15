import React, { useEffect, useState, useCallback } from "react";
import { Edit, Loader2 } from "lucide-react";
import api from "@/services/api/api";

interface Category {
  _id: string;
  name: string;
  testCount: number;
  createdAt?: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/test-categories");
      setCategories(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch categories error:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-500">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              S.No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              Category Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              Test Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category._id}>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {index + 1}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {category.testCount ?? 0}
                </td>

                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={() => {
                      console.log("Edit category:", category._id);
                      // You can later open modal here
                    }}
                  >
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-10 text-slate-500 dark:text-slate-400"
              >
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;