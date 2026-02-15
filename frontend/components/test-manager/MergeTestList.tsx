import React, { useEffect, useState, useCallback } from "react";
import { Trash2, Loader2 } from "lucide-react";
import api from "@/services/api/api";

interface MergedTest {
  _id: string;
  name: string;
  mergedBy: string;
  questions: string[];
  createdAt: string;
}

const MergeTestList: React.FC = () => {
  const [tests, setTests] = useState<MergedTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMergedTests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/tests/merged");
      setTests(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Fetch merged tests error:", err);
      setError("Failed to load merged tests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMergedTests();
  }, [fetchMergedTests]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this merged test?"))
      return;

    try {
      setDeletingId(id);
      await api.delete(`/tests/merged/${id}`);
      setTests((prev) => prev.filter((test) => test._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete test.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-500">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading merged tests...
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
              Test Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              Merge By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              No. of Questions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              Merge Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
              Delete
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {tests.length > 0 ? (
            tests.map((test, index) => (
              <tr key={test._id}>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {index + 1}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {test.name}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {test.mergedBy}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {test.questions?.length || 0}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {new Date(test.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    disabled={deletingId === test._id}
                    onClick={() => handleDelete(test._id)}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    {deletingId === test._id ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-slate-500 dark:text-slate-400"
              >
                No merged tests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MergeTestList;