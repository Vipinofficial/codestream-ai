import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Upload,
  Filter,
  Send,
  Loader2,
} from "lucide-react";
import api from "@/services/api/api";

interface Test {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
  questions: string[];
  level: string;
  candidates: number;
  product?: string;
  testCategory?: string;
  testTemplate?: string;
  createdAt: string;
}

const TestList: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/tests");
      setTests(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch tests error:", err);
      setError("Failed to load tests.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = async () => {
    if (selected.length === 0) return;

    if (!window.confirm("Delete selected tests?")) return;

    try {
      setDeleting(true);
      await api.post("/tests/bulk-delete", { ids: selected });
      setTests((prev) => prev.filter((t) => !selected.includes(t._id)));
      setSelected([]);
    } catch (err) {
      console.error("Bulk delete error:", err);
      alert("Failed to delete tests.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-500">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading tests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 font-medium">{error}</div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Tests
        </h2>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {/* Secondary Actions Group */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <Filter size={16} />
              Select Filter
            </button>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <Upload size={16} />
              Import (QTI)
            </button>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <Send size={16} />
              Quick Assign
            </button>
          </div>

          {/* Primary Action */}
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200">
            <Plus size={16} />
            Add Test
          </button>

          {/* Danger Action */}
          <button
            disabled={selected.length === 0 || deleting}
            onClick={handleBulkDelete}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Trash2 size={16} />
            )}
            Delete
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === tests.length && tests.length > 0}
                  onChange={(e) =>
                    setSelected(e.target.checked ? tests.map((t) => t._id) : [])
                  }
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Test Name
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                Start Date
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                End Date
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                Questions
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                Level
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                Candidates
              </th>
              <th className="px-6 py-3 text-xs text-slate-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {tests.length > 0 ? (
              tests.map((test) => (
                <tr key={test._id}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(test._id)}
                      onChange={() => toggleSelect(test._id)}
                    />
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {test.name}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {new Date(test.startDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {new Date(test.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        test.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {test.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {test.questions?.length || 0}
                  </td>

                  <td className="px-6 py-4 text-sm">{test.level}</td>

                  <td className="px-6 py-4 text-sm">{test.candidates || 0}</td>

                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-10 text-slate-500">
                  No tests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedTestId && (
        <>
          <AssignTestModal
            testId={selectedTestId.toString()}
            testName={selectedTestName}
            isOpen={showAssignModal}
            onClose={() => setShowAssignModal(false)}
            onAssign={handleAssignment}
          />
          <EmailSendModal
            testId={selectedTestId.toString()}
            testName={selectedTestName}
            recipients={mockCandidates}
            isOpen={showEmailModal}
            onClose={() => setShowEmailModal(false)}
            onSend={handleSendEmails}
          />
        </>
      )}
    </div>
  );
};

export default TestList;
